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
    border: '1px solid rgba(148, 163, 184, 0.3)',
    background: 'rgba(15, 23, 42, 0.55)',
    color: '#f1f5f9',
    fontSize: 16,
    fontFamily: 'inherit',
    outline: 'none',
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(160deg, #0b1437 0%, #111c4e 45%, #1e1b4b 100%)',
        color: '#e2e8f0',
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
            color: '#ffffff',
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
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(148, 163, 184, 0.18)',
            boxShadow: '0 10px 30px rgba(2, 6, 23, 0.35)',
          }}
        >
          <h1 style={{ margin: '0 0 18px', color: '#ffffff', fontSize: 26 }}>
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
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#cbd5e1',
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
                background: loading ? '#334155' : '#2563eb',
                color: '#ffffff',
                fontSize: 17,
                fontWeight: 700,
                cursor: loading ? 'default' : 'pointer',
                fontFamily: 'inherit',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(37, 99, 235, 0.4)',
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
                  color: msgError ? '#fca5a5' : '#86efac',
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
            border: '1px solid rgba(148, 163, 184, 0.35)',
            background: 'rgba(255, 255, 255, 0.06)',
            color: '#e2e8f0',
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
