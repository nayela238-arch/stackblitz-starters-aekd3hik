export default function Home() {
  const brand = 'منصة الترجمة'
  const btn = {
    display: 'inline-block',
    padding: '12px 22px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
  } as const

  return (
    <div dir="rtl" style={{ background: '#fff', color: '#111', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #eee' }}>
        <b style={{ fontSize: 20 }}>{brand}</b>
        <a href="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>دخول / تسجيل</a>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 34, marginBottom: 12 }}>محتاج ترجمة؟ هتلاقيها هنا</h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 28 }}>
          انشر طلبك واستقبل عروض من مترجمين، أو جرّب الترجمة الفورية بالذكاء الاصطناعي.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/orders/new" style={{ ...btn, background: '#2563eb', color: '#fff' }}>انشر طلب ترجمة</a>
          <a href="/ai" style={{ ...btn, background: '#f3f4f6', color: '#111' }}>ترجمة فورية AI</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 48, textAlign: 'right' }}>
          <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
            <h3>للعملاء</h3>
            <p style={{ color: '#555' }}>انشر طلبك واختار أنسب عرض من المترجمين.</p>
            <a href="/orders" style={{ color: '#2563eb' }}>شوف الطلبات</a>
          </div>
          <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
            <h3>للمترجمين</h3>
            <p style={{ color: '#555' }}>سجّل كمترجم وقدّم عروضك على الطلبات المفتوحة.</p>
            <a href="/login" style={{ color: '#2563eb' }}>انضم كمترجم</a>
          </div>
          <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
            <h3>ترجمة فورية</h3>
            <p style={{ color: '#555' }}>للنصوص القصيرة، ترجمة آلية بحد يومي مجاني.</p>
            <a href="/ai" style={{ color: '#2563eb' }}>جرّب دلوقتي</a>
          </div>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: 24, color: '#888', fontSize: 13 }}>
        الترجمة الآلية ممكن تحتوي على أخطاء، وللأوراق الرسمية استخدم مترجم بشري.
      </footer>
    </div>
  )
}
