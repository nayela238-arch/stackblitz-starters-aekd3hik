'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS = {
  open: { label: 'مفتوح', bg: '#dcefdf', color: '#2f6b44' },
  in_progress: { label: 'قيد التنفيذ', bg: '#f6efd9', color: '#7a6420' },
  delivered: { label: 'تم التسليم', bg: '#dde8f3', color: '#2a5a8a' },
}

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [noUser, setNoUser] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setNoUser(true)
        setLoading(false)
        return
      }
      setUserId(user.id)

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .or(`client_id.eq.${user.id},translator_id.eq.${user.id}`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('My orders error', error)
        setError('حصل خطأ في تحميل طلباتك')
      }
      setOrders(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const chip = {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 13,
    background: '#e3ebe1',
    color: '#4a5d4f',
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(170deg, #eef3ec 0%, #e3ebe1 100%)',
        color: '#2f3b32',
        fontFamily: 'Arial, sans-serif',
        padding: '40px 16px',
      }}
    >
      <main style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 20px', color: '#1f2a22', fontSize: 28 }}>
          طلباتي
        </h1>

        {loading && <p style={{ color: '#6b7d6f' }}>جاري التحميل...</p>}
        {error && <p style={{ color: '#b04a4a' }}>{error}</p>}

        {noUser && (
          <p>
            <a href="/login" style={{ color: '#3f7551', fontWeight: 700 }}>
              سجّل دخول عشان تشوف طلباتك
            </a>
          </p>
        )}

        {!loading && !noUser && !error && orders.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 16px',
              borderRadius: 16,
              border: '1px dashed #b9c9b8',
              color: '#6b7d6f',
            }}
          >
            لسه مفيش طلبات مرتبطة بحسابك.
          </div>
        )}

        <div style={{ display: 'grid', gap: 14 }}>
          {orders.map((o) => {
            const st = STATUS[o.status] || {
              label: o.status,
              bg: '#e3ebe1',
              color: '#4a5d4f',
            }
            const mine = o.client_id === userId ? 'طلبي' : 'مُعيَّن لي'
            return (
              <a
                key={o.id}
                href={`/orders/${o.id}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  background: '#f7faf6',
                  border: '1px solid #d3dfd2',
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: '0 6px 20px rgba(63, 90, 70, 0.10)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 12,
                  }}
                >
                  <h3 style={{ margin: 0, color: '#1f2a22', fontSize: 19 }}>
                    {o.title}
                  </h3>
                  <span
                    style={{
                      flexShrink: 0,
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 700,
                      background: st.bg,
                      color: st.color,
                    }}
                  >
                    {st.label}
                  </span>
                </div>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}
                >
                  <span style={chip}>{mine}</span>
                  <span style={chip}>
                    {o.source_lang} ← {o.target_lang}
                  </span>
                  <span style={chip}>الميزانية: {o.budget ?? '-'}</span>
                </div>
              </a>
            )
          })}
        </div>
      </main>
    </div>
  )
}
