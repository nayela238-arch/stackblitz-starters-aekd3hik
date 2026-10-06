'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '../lib/supabase'

const LINKS = [
  { href: '/orders', label: 'الطلبات' },
  { href: '/ai', label: 'ترجمة AI' },
  { href: '/my-orders', label: 'طلباتي' },
  { href: '/orders/new', label: 'طلب جديد' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, s) => setSession(s)
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (pathname === '/' || pathname === '/login') return null

  const linkStyle = (href) => ({
    padding: '8px 12px',
    borderRadius: 10,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 700,
    color: pathname === href ? '#1f2a22' : '#4a5d4f',
    background: pathname === href ? '#dcefdf' : 'transparent',
  })

  const authButton = {
    padding: '8px 14px',
    borderRadius: 10,
    border: '1px solid #c5d3c4',
    background: '#eef3ec',
    color: '#2f3b32',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'none',
  }

  return (
    <nav
      dir="rtl"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(247, 250, 246, 0.92)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid #d3dfd2',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/"
            style={{
              fontWeight: 800,
              fontSize: 17,
              color: '#1f2a22',
              textDecoration: 'none',
              marginInlineEnd: 10,
            }}
          >
            🌐 منصة الترجمة
          </a>

          {LINKS.map((l) => (
            <a key={l.href} href={l.href} style={linkStyle(l.href)}>
              {l.label}
            </a>
          ))}
        </div>

        {ready &&
          (session ? (
            <button type="button" onClick={logout} style={authButton}>
              تسجيل الخروج
            </button>
          ) : (
            <a href="/login" style={authButton}>
              دخول
            </a>
          ))}
      </div>
    </nav>
  )
}
