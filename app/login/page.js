'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('client')
  const [msg, setMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    const { error } = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: fullName, role } },
        })
    setMsg(error ? error.message : 'تم بنجاح ✅')
  }

  return (
    <main dir="rtl" style={{ maxWidth: 400, margin: '60px auto', padding: 16 }}>
      <h1>{mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        {mode === 'signup' && (
          <>
            <input placeholder="الاسم" value={fullName} onChange={e => setFullName(e.target.value)} required />
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="client">أنا عميل</option>
              <option value="translator">أنا مترجم</option>
            </select>
          </>
        )}
        <input type="email" placeholder="الإيميل" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="الباسورد" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
        <button type="submit">{mode === 'login' ? 'دخول' : 'تسجيل'}</button>
        {msg && <p>{msg}</p>}
      </form>
      <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ marginTop: 12 }}>
        {mode === 'login' ? 'معنديش حساب' : 'عندي حساب'}
      </button>
    </main>
  )
}