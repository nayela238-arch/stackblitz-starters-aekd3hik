'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS = {
  open: {
    label: 'مفتوح',
    bg: '#dcefdf',
    color: '#2f6b44',
    border: '#b5d6bd',
  },
  in_progress: {
    label: 'قيد التنفيذ',
    bg: '#f6efd9',
    color: '#7a6420',
    border: '#e6d8a8',
  },
  delivered: {
    label: 'تم التسليم',
    bg: '#dde8f3',
    color: '#2a5a8a',
    border: '#b4cde6',
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
      .in('status', ['open', 'in_progress', 'delivered'])
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
            <h1 style={{ margin: 0, color: '#1f2a22', fontSize: 28 }}>
              طلبات الترجمة
            </h1>
            {!loading && !error && (
              <p style={{ margin: '6px 0 0', color: '#6b7d6f', fontSize: 14 }}>
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
              background: '#4f8a62',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 15,
              boxShadow: '0 6px 16px rgba(79, 138, 98, 0.30)',
            }}
          >
            + طلب جديد
          </a>
        </div>

        {loading && <p style={{ color: '#6b7d6f' }}>جاري التحميل...</p>}
        {error && <p style={{ color: '#b04a4a' }}>{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 16px',
              borderRadius: 16,
              border: '1px dashed #b9c9b8',
              color: '#6b7d6f',
            }}
          >
            مفيش طلبات لسه. ابدأ بأول طلب ترجمة.
          </div>
        )}

        <div style={{ display: 'grid', gap: 14 }}>
          {orders.map((o) => {
            const st = STATUS[o.status] || {
              label: o.status,
              bg: '#e3ebe1',
              color: '#4a5d4f',
              border: '#c5d3c4',
            }
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
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: '#1f2a22',
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
