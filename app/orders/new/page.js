'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function NewOrder() {
  const [f, setF] = useState({
    title: '',
    source_lang: 'العربية',
    target_lang: 'الإنجليزية',
    word_count: '',
    budget: '',
    deadline: '',
    notes: '',
  })

  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')
  const [msgError, setMsgError] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = k => e => setF({ ...f, [k]: e.target.value })

  function fail(text) {
    setMsg(text)
    setMsgError(true)
    setLoading(false)
  }

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    setMsgError(false)
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return fail('لازم تسجّل دخول الأول من /login')
    }

    let filePath = null

    if (file) {
      const fileName = `${user.id}/${Date.now()}-${file.name}`

      const { error: uploadError } = await supabase.storage
        .from('translation-files')
        .upload(fileName, file)

      if (uploadError) {
        return fail('حصل خطأ أثناء رفع الملف: ' + uploadError.message)
      }

      filePath = fileName
    }

    const { error } = await supabase.from('orders').insert({
      ...f,
      client_id: user.id,
      word_count: f.word_count ? Number(f.word_count) : null,
      budget: f.budget ? Number(f.budget) : null,
      deadline: f.deadline || null,
      file_path: filePath,
    })

    if (error) {
      return fail(error.message)
    }

    setMsg('تم نشر الطلب ورفع الملف بنجاح ✅')
    setMsgError(false)
    setLoading(false)
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

  const label = {
    display: 'block',
    fontSize: 13,
    color: '#6b7d6f',
    marginBottom: 6,
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
      <main style={{ maxWidth: 560, margin: '0 auto' }}>
        <a
          href="/orders"
          style={{
            display: 'inline-block',
            marginBottom: 14,
            color: '#3f7551',
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          → الرجوع للطلبات
        </a>

        <h1 style={{ margin: '0 0 18px', color: '#1f2a22', fontSize: 28 }}>
          طلب ترجمة جديد
        </h1>

        <form
          onSubmit={submit}
          style={{
            padding: 24,
            borderRadius: 20,
            background: '#f7faf6',
            border: '1px solid #d3dfd2',
            boxShadow: '0 6px 20px rgba(63, 90, 70, 0.10)',
            display: 'grid',
            gap: 16,
          }}
        >
          <div>
            <span style={label}>عنوان الطلب</span>
            <input
              placeholder="عنوان الطلب"
              value={f.title}
              onChange={set('title')}
              required
              style={field}
            />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={label}>من لغة</span>
              <input
                placeholder="من لغة"
                value={f.source_lang}
                onChange={set('source_lang')}
                required
                style={field}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={label}>إلى لغة</span>
              <input
                placeholder="إلى لغة"
                value={f.target_lang}
                onChange={set('target_lang')}
                required
                style={field}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={label}>عدد الكلمات (تقريبي)</span>
              <input
                type="number"
                placeholder="عدد الكلمات (تقريبي)"
                value={f.word_count}
                onChange={set('word_count')}
                style={field}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={label}>الميزانية</span>
              <input
                type="number"
                placeholder="الميزانية"
                value={f.budget}
                onChange={set('budget')}
                style={field}
              />
            </div>
          </div>

          <div>
            <span style={label}>موعد التسليم</span>
            <input
              type="date"
              value={f.deadline}
              onChange={set('deadline')}
              style={field}
            />
          </div>

          <div>
            <span style={label}>ملاحظات</span>
            <textarea
              rows={4}
              placeholder="ملاحظات"
              value={f.notes}
              onChange={set('notes')}
              style={{ ...field, resize: 'vertical', lineHeight: 1.7 }}
            />
          </div>

          <label
            style={{
              display: 'block',
              padding: 14,
              borderRadius: 12,
              border: '1px dashed #b9c9b8',
              background: '#eef3ec',
              color: '#4a5d4f',
              fontSize: 14,
            }}
          >
            ملف الترجمة:
            <input
              type="file"
              onChange={e => setFile(e.target.files?.[0] || null)}
              style={{ display: 'block', marginTop: 10, maxWidth: '100%' }}
            />
          </label>
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
            {loading ? 'جاري النشر...' : 'نشر الطلب'}
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
      </main>
    </div>
  )
}
