import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const DAILY_LIMIT = 3
const MAX_CHARS = 1500
const MODEL = 'gemini-3.7-flash'
export async function POST(request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) {
    return NextResponse.json({ error: 'سجّل دخول الأول' }, { status: 401 })
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  )
  const { data: userData } = await admin.auth.getUser(token)
  const user = userData?.user
  if (!user) {
    return NextResponse.json({ error: 'جلسة غير صالحة' }, { status: 401 })
  }

  const { text, from, to } = await request.json()
  if (!text || text.length > MAX_CHARS) {
    return NextResponse.json(
      { error: `النص لازم يكون أقل من ${MAX_CHARS} حرف` },
      { status: 400 }
    )
  }

  const today = new Date().toISOString().slice(0, 10)
  const { data: row } = await admin
    .from('ai_usage')
    .select('count')
    .eq('user_id', user.id)
    .eq('used_on', today)
    .maybeSingle()
  const used = row?.count || 0
  if (used >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: 'خلصت ترجماتك المجانية النهاردة', limitReached: true },
      { status: 429 }
    )
  }

  const prompt = `Translate the following text from ${from} to ${to}. Return only the translation, nothing else.\n\n${text}`
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  )
  if (!res.ok) {
    const errText = await res.text()
    console.error('Gemini error', res.status, errText)
    return NextResponse.json(
      { error: 'حصل خطأ في الترجمة، جرّب بعد شوية' },
      { status: 502 }
    )
  }
  const data = await res.json()
  const translation = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

  await admin
    .from('ai_usage')
    .upsert(
      { user_id: user.id, used_on: today, count: used + 1 },
      { onConflict: 'user_id,used_on' }
    )

  return NextResponse.json({
    translation,
    remaining: DAILY_LIMIT - used - 1,
  })
}
