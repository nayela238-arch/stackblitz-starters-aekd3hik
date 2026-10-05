'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_LABELS = {
  open: 'مفتوح',
  in_progress: 'قيد التنفيذ',
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

  return (
    <main dir="rtl" style={{ maxWidth: 800, margin: '40px auto', padding: 16 }}>
      <h1>طلبات الترجمة</h1>
      <a href="/orders/new">+ طلب جديد</a>
      {loading && <p>جاري التحميل...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!loading && !error && orders.length === 0 && <p>مفيش طلبات لسه.</p>}
      {orders.map(o => (
        <div key={o.id} style={{ border: '1px solid #ddd', padding: 12, margin: '12px 0' }}>
          <h3><a href={`/orders/${o.id}`}>{o.title}</a></h3>
          <p>{o.source_lang} ← {o.target_lang} | الميزانية: {o.budget ?? '-'}</p>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            الحالة: {STATUS_LABELS[o.status] || o.status}
          </p>
        </div>
      ))}
    </main>
  )
}
