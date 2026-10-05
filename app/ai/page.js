'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AiTranslate() {
  const [text, setText] = useState('')
  const [from, setFrom] = useState('العربية')
  const [to, setTo] = useState('الإنجليزية')
  const [result, setResult] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function translate(e) {
    e.preventDefault()
    setMsg('')
    setResult('')
    setLoading(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setLoading(false)
      return setMsg('سجّل دخول الأول من /login')
    }

    try {
      const res = await fetch('/api/translate-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ text, from, to }),
      })

      if (!res.ok || !res.body) {
        let errMsg = 'حصل خطأ'
        try {
          const data = await res.json()
          errMsg = data.error || errMsg
        } catch (_) {}
        setLoading(false)
        return setMsg(errMsg)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        setResult(full)
      }

      const remaining = res.headers.get('X-Remaining')
      if (remaining !== null) {
        setMsg(`متبقي لك ${remaining} ترجمات مجانية النهاردة`)
      }
      if (!full.trim()) {
        setMsg('حصل خطأ في الترجمة، جرّب بعد شوية')
      }
    } catch (err) {
      console.error(err)
      setMsg('حصل خطأ في الاتصال، جرّب تاني')
    }

    setLoading(false)
  }

  return (
    <main dir="rtl" style={{ maxWidth: 600, margin: '40px auto', padding: 16 }}>
      <h1>ترجمة فورية بالذكاء الاصطناعي</h1>
      <p style={{ fontSize: 13, color: '#666' }}>
        ترجمة آلية، ممكن تحتوي على أخطاء. للأوراق الرسمية والقانونية والطبية استخدم مترجم بشري. لا تكتب بيانات شخصية أو حساسة.
      </p>
      <form onSubmit={translate} style={{ display: 'grid', gap: 12 }}>
        <input value={from} onChange={e => setFrom(e.target.value)} placeholder="من لغة" required />
        <input value={to} onChange={e => setTo(e.target.value)} placeholder="إلى لغة" required />
        <textarea rows={6} value={text} onChange={e => setText(e.target.value)} placeholder="اكتب النص هنا (حتى 1500 حرف)" required />
        <button type="submit" disabled={loading}>{loading ? 'جاري الترجمة...' : 'ترجم'}</button>
      </form>
      {msg && <p>{msg}</p>}
      {result && (
        <div style={{ border: '1px solid #ddd', padding: 12, marginTop: 12, whiteSpace: 'pre-wrap' }}>
          {result}
        </div>
      )}
    </main>
  )
}
