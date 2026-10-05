'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const LANGS = [
  'العربية',
  'الإنجليزية',
  'الفرنسية',
  'الألمانية',
  'الإسبانية',
  'الإيطالية',
  'التركية',
  'الروسية',
]

const MAX_CHARS = 1500

export default function AiTranslate() {
  const [text, setText] = useState('')
  const [from, setFrom] = useState('العربية')
  const [to, setTo] = useState('الإنجليزية')
  const [result, setResult] = useState('')
  const [msg, setMsg] = useState('')
  const [msgError, setMsgError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  function showMsg(value, isError = false) {
    setMsg(value)
    setMsgError(isError)
  }

  function swap() {
    setFrom(to)
    setTo(from)
    if (result) {
      setText(result)
      setResult('')
    }
  }

  function clearAll() {
    setText('')
    setResult('')
    showMsg('')
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (_) {
      showMsg('مقدرتش أنسخ، انسخ الترجمة يدويًا', true)
    }
  }

  async function translate(e) {
    e.preventDefault()
    showMsg('')
    setResult('')
    setCopied(false)
    setLoading(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setLoading(false)
      return showMsg('سجّل دخول الأول من /login', true)
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
        return showMsg(errMsg, true)
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

      if (!full.trim()) {
        showMsg('حصل خطأ في الترجمة، جرّب بعد شوية', true)
      } else {
        const remaining = res.headers.get('X-Remaining')
        if (remaining !== null) {
          showMsg(`متبقي لك ${remaining} ترجمات مجانية النهاردة`)
        }
      }
    } catch (err) {
      console.error(err)
      showMsg('حصل خطأ في الاتصال، جرّب تاني', true)
    }

    setLoading(false)
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

  const smallButton = {
    padding: '8px 14px',
    borderRadius: 10,
    border: '1px solid rgba(148, 163, 184, 0.35)',
    background: 'rgba(255, 255, 255, 0.06)',
    color: '#e2e8f0',
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: 'inherit',
  }

  const label = { fontSize: 13, color: '#94a3b8', marginBottom: 6, display: 'block' }

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
      }}
    >
      <main style={{ maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ margin: 0, color: '#ffffff', fontSize: 28 }}>
          ترجمة فورية بالذكاء الاصطناعي
        </h1>

        <div
          style={{
            marginTop: 14,
            padding: '10px 14px',
            borderRadius: 12,
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fcd34d',
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          ترجمة آلية، ممكن تحتوي على أخطاء. للأوراق الرسمية والقانونية والطبية
          استخدم مترجم بشري. لا تكتب بيانات شخصية أو حساسة.
        </div>

        <form
          onSubmit={translate}
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 20,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(148, 163, 184, 0.18)',
            boxShadow: '0 10px 30px rgba(2, 6, 23, 0.35)',
            display: 'grid',
            gap: 16,
          }}
        >
          <datalist id="langs">
            {LANGS.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 10,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={label}>من</span>
              <input
                list="langs"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="من لغة"
                required
                style={field}
              />
            </div>

            <button
              type="button"
              onClick={swap}
              aria-label="عكس اللغتين"
              style={{ ...smallButton, padding: '12px 14px', fontSize: 18 }}
            >
              ⇄
            </button>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={label}>إلى</span>
              <input
                list="langs"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="إلى لغة"
                required
                style={field}
              />
            </div>
          </div>

          <div>
            <textarea
              rows={6}
              maxLength={MAX_CHARS}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="اكتب النص هنا"
              required
              style={{ ...field, resize: 'vertical', lineHeight: 1.7 }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <span style={{ fontSize: 13, color: '#94a3b8' }}>
                {text.length} / {MAX_CHARS}
              </span>
              {text && (
                <button type="button" onClick={clearAll} style={smallButton}>
                  مسح
                </button>
              )}
            </div>
          </div>

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
            {loading ? 'جاري الترجمة...' : 'ترجم'}
          </button>
        </form>

        {msg && (
          <p
            style={{
              margin: '14px 4px 0',
              fontSize: 14,
              color: msgError ? '#fca5a5' : '#94a3b8',
            }}
          >
            {msg}
          </p>
        )}

        {result && (
          <div
            style={{
              marginTop: 16,
              padding: 20,
              borderRadius: 20,
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(96, 165, 250, 0.35)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 14, color: '#93c5fd', fontWeight: 700 }}>
                الترجمة
              </span>
              <button type="button" onClick={copyResult} style={smallButton}>
                {copied ? 'تم النسخ' : 'نسخ'}
              </button>
            </div>
            <div
              dir="auto"
              style={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.9,
                fontSize: 18,
                color: '#ffffff',
              }}
            >
              {result}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
