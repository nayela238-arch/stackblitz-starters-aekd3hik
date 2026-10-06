'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

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
}

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
  const [fileUrl, setFileUrl] = useState(null)
  const [translatedFileUrl, setTranslatedFileUrl] = useState(null)
  const [translatorFile, setTranslatorFile] = useState(null)
  const [uploadMsg, setUploadMsg] = useState('')

  async function load() {
    const { data: o } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    setOrder(o)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user)

    if (user) {
      const { data: p } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      setRole(p?.role)
    }

    const { data: b } = await supabase
      .from('bids')
      .select('*, profiles(full_name)')
      .eq('order_id', id)

    setBids(b || [])

    if (o?.file_path) {
      const { data, error } = await supabase.storage
        .from('translation-files')
        .createSignedUrl(o.file_path, 3600)

      if (!error) {
        setFileUrl(data?.signedUrl || null)
      }
    }

    if (o?.translator_file_path) {
      const { data, error } = await supabase.storage
        .from('translation-files')
        .createSignedUrl(o.translator_file_path, 3600)

      if (!error) {
        setTranslatedFileUrl(data?.signedUrl || null)
      }
    }
  }

  useEffect(() => {
    if (id) load()
  }, [id])

  async function sendBid(e) {
    e.preventDefault()

    const { error } = await supabase.from('bids').insert({
      order_id: id,
      translator_id: user.id,
      price: Number(price),
      days: Number(days),
      message,
    })

    setMsg(
      error
        ? 'مينفعش عرضين لنفس الطلب أو حصل خطأ'
        : 'تم إرسال عرضك ✅'
    )

    load()
  }

  async function accept(b) {
    await supabase
      .from('orders')
      .update({
        translator_id: b.translator_id,
        status: 'in_progress',
      })
      .eq('id', id)

    load()
  }

  async function uploadTranslatorFile() {
    if (!translatorFile || !user) {
      setUploadMsg('اختار ملف الترجمة الأول')
      return
    }

    setUploadMsg('جاري رفع الملف...')

    const fileName = `${user.id}/${id}/translated-${Date.now()}-${translatorFile.name}`

    const { error: uploadError } = await supabase.storage
      .from('translation-files')
      .upload(fileName, translatorFile)

    if (uploadError) {
      setUploadMsg(
        'حصل خطأ أثناء رفع الملف: ' + uploadError.message
      )
      return
    }

    const { error: updateError } = await supabase
      .from('orders')
      .update({
        translator_file_path: fileName,
      })
      .eq('id', id)

    if (updateError) {
      setUploadMsg(
        'تم رفع الملف لكن حصل خطأ في حفظه: ' +
          updateError.message
      )
      return
    }

    setUploadMsg('تم رفع ملف الترجمة بنجاح ✅')
    setTranslatorFile(null)
    load()
  }

  const page = {
    minHeight: '100vh',
    background: 'linear-gradient(170deg, #eef3ec 0%, #e3ebe1 100%)',
    color: '#2f3b32',
    fontFamily: 'Arial, sans-serif',
    padding: '40px 16px',
  }

  const card = {
    marginTop: 18,
    padding: 20,
    borderRadius: 16,
    background: '#f7faf6',
    border: '1px solid #d3dfd2',
    boxShadow: '0 6px 20px rgba(63, 90, 70, 0.10)',
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

  const primaryButton = {
    padding: '12px 20px',
    borderRadius: 12,
    border: 'none',
    background: '#4f8a62',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 6px 16px rgba(79, 138, 98, 0.30)',
  }

  const linkButton = {
    display: 'inline-block',
    padding: '10px 18px',
    borderRadius: 10,
    background: '#4f8a62',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: 15,
  }

  const cardTitle = { margin: '0 0 12px', color: '#1f2a22', fontSize: 18 }

  const chip = {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 13,
    background: '#e3ebe1',
    color: '#4a5d4f',
  }

  if (!order) {
    return (
      <div dir="rtl" style={page}>
        <p style={{ textAlign: 'center', color: '#6b7d6f' }}>
          جاري التحميل...
        </p>
      </div>
    )
  }

  const isOwner = user?.id === order.client_id
  const isAssignedTranslator =
    user?.id === order.translator_id

  const st = STATUS[order.status] || {
    label: order.status,
    bg: '#e3ebe1',
    color: '#4a5d4f',
    border: '#c5d3c4',
  }

  return (
    <div dir="rtl" style={page}>
      <main style={{ maxWidth: 720, margin: '0 auto' }}>
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

        <div
          style={{
            padding: 24,
            borderRadius: 20,
            background: '#f7faf6',
            border: '1px solid #d3dfd2',
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
            <h1
              style={{
                margin: 0,
                color: '#1f2a22',
                fontSize: 26,
                lineHeight: 1.4,
                wordBreak: 'break-word',
              }}
            >
              {order.title}
            </h1>

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
              {order.source_lang} ← {order.target_lang}
            </span>
            <span style={chip}>الميزانية: {order.budget ?? '-'}</span>
          </div>

          {order.notes && (
            <p
              style={{
                margin: '16px 0 0',
                lineHeight: 1.9,
                color: '#4a5d4f',
                whiteSpace: 'pre-wrap',
              }}
            >
              {order.notes}
            </p>
          )}
        </div>

        {fileUrl && (
          <div style={card}>
