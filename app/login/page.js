'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('client')
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [msg, setMsg] = useState('')
  const [msgError, setMsgError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    setMsgError(false)

    if (mode === 'signup' && !ageConfirmed) {
      setMsg('يجب تأكيد أنك 18 عامًا أو أكثر، أو لديك موافقة ولي الأمر.')
      setMsgError(true)
      return
    }

    setLoading(true)

    const { error } = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role,
              age_confirmed: ageConfirmed,
            },
          },
        })

    setLoading(false)
    setMsg(error ? error.message : 'تم بنجاح ✅')
    setMsgError(Boolean(error))
  }

  const field = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid #c5d3c4',
    background: '#fbfdfa',
    color: '#2f3b32',
    fontSize: 16,
    fontFamily: 'inherit',
    outline: 'none',
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <main style={{ width: '100%', maxWidth: 420 }}>
        <a
          href="/"
          style={{
            display: 'block',
            textAlign: 'center',
            marginBottom: 20,
            color: '#1f2a22',
            fontSize: 22,
            fontWeight: 800,
            textDecoration: 'none',
          }}
        >
          🌐 منصة الترجمة
        </a>

        <div
          style={{
            padding: 24,
            borderRadius: 20,
            background: '#f7faf6',
            border: '1px solid #d3dfd2',
            boxShadow: '0 6px 20px rgba(63, 90, 70, 0.10)',
          }}
        >
          <h1 style={{ margin: '0 0 18px', color: '#1f2a22', fontSize: 26 }}>
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </h1>

          <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
            {mode === 'signup' && (
              <>
                <input
                  placeholder="الاسم"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  style={field}
                />

                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  style={field}
                >
                  <option value="client">أنا عميل</option>
                  <option value="translator">أنا مترجم</option>
                </select>

                <label
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    padding: 12,
                    borderRadius: 12,
                    background: '#eef3ec',
                    border: '1px solid #d3dfd2',
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#4a5d4f',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={e => setAgeConfirmed(e.target.checked)}
                    style={{ marginTop: 5 }}
                  />

                  <span>
                    أؤكد أن عمري 18 عامًا أو أكثر، أو لدي موافقة ولي الأمر على استخدام المنصة.
                  </span>
                </label>
              </>
            )}

            <input
              type="email"
              placeholder="الإيميل"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={field}
            />

            <input
              type="password"
              placeholder="الباسورد"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              style={field}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 20px',
                borderRadius: 12,
                border: 'none',
                background: loading ? '#a9bdae' : '#4f8a62',
                color: '#ffffff',
                fontSize: 17,
                fontWeight: 700,
                cursor: loading ? 'default' : 'pointer',
                fontFamily: 'inherit',
                boxShadow: loading ? 'none' : '0 6px 16px rgba(79, 138, 98, 0.30)',
              }}
            >
              {loading ? 'جاري التنفيذ...' : mode === 'login' ? 'دخول' : 'تسجيل'}
            </button>

            {msg && (
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: msgError ? '#b04a4a' : '#3f7551',
                }}
              >
                {msg}
              </p>
            )}
          </form>
        </div>

        <button
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login')
            setMsg('')
            setMsgError(false)
          }}
          style={{
            display: 'block',
            width: '100%',
            marginTop: 16,
            padding: '12px 16px',
            borderRadius: 12,
            border: '1px solid #c5d3c4',
            background: '#eef3ec',
            color: '#2f3b32',
            fontSize: 15,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {mode === 'login' ? 'معنديش حساب' : 'عندي حساب'}
        </button>
      </main>
    </div>
  )
}
