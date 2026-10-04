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
                                                          const res = await fetch('/api/translate', {
                                                                method: 'POST',
                                                                      headers: {
                                                                              'Content-Type': 'application/json',
                                                                                      Authorization: `Bearer ${session.access_token}`,
                                                                                            },
                                                                                                  body: JSON.stringify({ text, from, to }),
                                                                                                      })
                                                                                                          const data = await res.json()
                                                                                                              setLoading(false)
                                                                                                                  if (!res.ok) return setMsg(data.error || 'حصل خطأ')
                                                                                                                      setResult(data.translation)
                                                                                                                          setMsg(`متبقي لك ${data.remaining} ترجمات مجانية النهاردة`)
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