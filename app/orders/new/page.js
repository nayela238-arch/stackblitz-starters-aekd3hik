'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function NewOrder() {
  const [f, setF] = useState({
    title: '', source_lang: 'العربية', target_lang: 'الإنجليزية',
    word_count: '', budget: '', deadline: '', notes: '',
  })
  const [msg, setMsg] = useState('')
  const set = k => e => setF({ ...f, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return setMsg('لازم تسجّل دخول الأول من /login')
    const { error } = await supabase.from('orders').insert({
      ...f,
      client_id: user.id,
      word_count: f.word_count ? Number(f.word_count) : null,
      budget: f.budget ? Number(f.budget) : null,
      deadline: f.deadline || null,
    })
    setMsg(error ? error.message : 'تم نشر الطلب ✅')
  }

  return (
    <main dir="rtl" style={{ maxWidth: 500, margin: '40px auto', padding: 16 }}>
      <h1>طلب ترجمة جديد</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder="عنوان الطلب" value={f.title} onChange={set('title')} required />
        <input placeholder="من لغة" value={f.source_lang} onChange={set('source_lang')} required />
        <input placeholder="إلى لغة" value={f.target_lang} onChange={set('target_lang')} required />
        <input type="number" placeholder="عدد الكلمات (تقريبي)" value={f.word_count} onChange={set('word_count')} />
        <input type="number" placeholder="الميزانية" value={f.budget} onChange={set('budget')} />
        <input type="date" value={f.deadline} onChange={set('deadline')} />
        <textarea placeholder="ملاحظات" value={f.notes} onChange={set('notes')} />
        <button type="submit">نشر الطلب</button>
        {msg && <p>{msg}</p>}
      </form>
    </main>
  )
}
