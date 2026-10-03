'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function OrderPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [bids, setBids] = useState([])
  const [price, setPrice] = useState('')
  const [days, setDays] = useState('')
  const [message, setMessage] = useState('')
  const [msg, setMsg] = useState('')

  async function load() {
    const { data: o } = await supabase.from('orders').select('*').eq('id', id).single()
    setOrder(o)
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (user) {
      const { data: p } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      setRole(p?.role)
    }
    const { data: b } = await supabase
      .from('bids').select('*, profiles(full_name)').eq('order_id', id)
    setBids(b || [])
  }

  useEffect(() => { load() }, [id])

  async function sendBid(e) {
    e.preventDefault()
    const { error } = await supabase.from('bids').insert({
      order_id: id, translator_id: user.id,
      price: Number(price), days: Number(days), message,
    })
    setMsg(error ? 'مينفعش عرضين لنفس الطلب أو حصل خطأ' : 'تم إرسال عرضك ✅')
    load()
  }

  async function accept(b) {
    await supabase.from('orders')
      .update({ translator_id: b.translator_id, status: 'in_progress' })
      .eq('id', id)
    load()
  }

  if (!order) return <p dir="rtl">جاري التحميل...</p>
  const isOwner = user?.id === order.client_id

  return (
    <main dir="rtl" style={{ maxWidth: 700, margin: '40px auto', padding: 16 }}>
      <h1>{order.title}</h1>
      <p>{order.source_lang} ← {order.target_lang}</p>
      <p>الميزانية: {order.budget ?? '-'} | الحالة: <b>{order.status}</b></p>
      <p>{order.notes}</p>

      {!user && <p><a href="/login">سجّل دخول عشان تقدّم عرض</a></p>}

      {role === 'translator' && order.status === 'open' && (
        <form onSubmit={sendBid} style={{ display: 'grid', gap: 10, marginTop: 24 }}>
          <h3>قدّم عرضك</h3>
          <input type="number" placeholder="السعر" value={price} onChange={e => setPrice(e.target.value)} required />
          <input type="number" placeholder="عدد الأيام" value={days} onChange={e => setDays(e.target.value)} required />
          <textarea placeholder="رسالة للعميل" value={message} onChange={e => setMessage(e.target.value)} />
          <button type="submit">إرسال العرض</button>
          {msg && <p>{msg}</p>}
        </form>
      )}

      {(isOwner || role === 'translator') && (
        <section style={{ marginTop: 24 }}>
          <h3>العروض ({bids.length})</h3>
          {bids.map(b => (
            <div key={b.id} style={{ border: '1px solid #ddd', padding: 12, margin: '10px 0' }}>
              <b>{b.profiles?.full_name}</b>
              <p>السعر: {b.price} | المدة: {b.days} يوم</p>
              <p>{b.message}</p>
              {isOwner && order.status === 'open' && (
                <button onClick={() => accept(b)}>قبول العرض</button>
              )}
              {order.translator_id === b.translator_id && <b>✅ العرض المقبول</b>}
            </div>
          ))}
        </section>
      )}
    </main>
  )
}