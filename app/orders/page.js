'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS = {
  open: {
    label: 'مفتوح',
    bg: 'rgba(34, 197, 94, 0.15)',
    color: '#86efac',
    border: 'rgba(34, 197, 94, 0.35)',
  },
  in_progress: {
    label: 'قيد التنفيذ',
    bg: 'rgba(245, 158, 11, 0.15)',
    color: '#fcd34d',
    border: 'rgba(245, 158, 11, 0.35)',
  },
}

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString('ar-EG')
  } catch (_) {
    return ''
  }
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase
      .from('orders')
      .select('*')
      .in('status', ['open', 'in_progress'])
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error('Orders error', error)
          setError('حصل خطأ في تحميل الطلبات')
        }
        setOrders(data || [])
        setLoading(false)
      })
  }, [])

  const chip = {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 13,
    background: 'rgba(148, 163, 184, 0.14)',
    color: '#cbd5e1',
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
      }}
    >
      <main style={{ maxWidth: 800, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            marginBottom: 24,
          }}
        >
          <div>
            <h1 style={{ margin: 0, color: '#ffffff', fontSize: 28 }}>
              طلبات الترجمة
            </h1>
            {!loading && !error && (
              <p style={{ margin: '6px 0 0', color: '#94a3b8', fontSize: 14 }}>
                {orders.length} طلب
              </p>
            )}
          </div>

          <a
            href="/orders/new"
            style={{
              display: 'inline-block',
              padding: '12px 20px',
              borderRadius: 12,
              background: '#2563eb',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 15,
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
            }}
          >
            + طلب جديد
          </a>
        </div>

        {loading && <p style={{ color: '#94a3b8' }}>جاري التحميل...</p>}
        {error && <p style={{ color: '#fca5a5' }}>{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 16px',
              borderRadius: 16,
              border: '1px dashed rgba(148, 163, 184, 0.35)',
              color: '#94a3b8',
            }}
          >
            مفيش طلبات لسه. ابدأ بأول طلب ترجمة.
          </div>
        )}

        <div style={{ display: 'grid', gap: 14 }}>
          {orders.map((o) => {
            const st = STATUS[o.status] || {
              label: o.status,
              bg: 'rgba(148, 163, 184, 0.15)',
              color: '#cbd5e1',
              border: 'rgba(148, 163, 184, 0.35)',
            }
            return (
              <a
                key={o.id}
                href={`/orders/${o.id}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(148, 163, 184, 0.18)',
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: '0 10px 30px rgba(2, 6, 23, 0.35)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: '#ffffff',
                      fontSize: 19,
                      lineHeight: 1.4,
                      wordBreak: 'break-word',
                    }}
                  >
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
                      border: `1px solid ${st.border}`,
                    }}
                  >
                    {st.label}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginTop: 14,
                  }}
                >
                  <span style={chip}>
                    {o.source_lang} ← {o.target_lang}
                  </span>
                  <span style={chip}>الميزانية: {o.budget ?? '-'}</span>
                  {o.created_at && (
                    <span style={chip}>{formatDate(o.created_at)}</span>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </main>
    </div>
  )
}
