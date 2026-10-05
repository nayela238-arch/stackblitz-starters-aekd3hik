export default function Home() {
  const button = {
    display: 'inline-block',
    padding: '14px 26px',
    borderRadius: 12,
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: 16,
  } as const

  const card = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 26,
    border: '1px solid rgba(148, 163, 184, 0.18)',
    boxShadow: '0 10px 30px rgba(2, 6, 23, 0.35)',
  } as const

  const link = { color: '#60a5fa', fontWeight: 700 } as const

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(160deg, #0b1437 0%, #111c4e 45%, #1e1b4b 100%)',
        color: '#e2e8f0',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header
        style={{
          background: 'rgba(11, 20, 55, 0.7)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
          padding: '18px 6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: '#ffffff' }}>
          🌐 منصة الترجمة
        </div>

        <a
          href="/login"
          style={{
            ...button,
            padding: '10px 18px',
            background: '#2563eb',
            color: '#fff',
            fontSize: 14,
          }}
        >
          دخول
        </a>
      </header>

      <main>
        <section
          style={{
            padding: '90px 6% 80px',
            background:
              'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.28), transparent 60%)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: 999,
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(96, 165, 250, 0.35)',
              color: '#93c5fd',
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            🚀 منصة ترجمة متكاملة
          </div>

          <h1
            style={{
              fontSize: 'clamp(38px, 7vw, 68px)',
              lineHeight: 1.1,
              margin: '0 auto 24px',
              maxWidth: 900,
              fontWeight: 900,
              color: '#ffffff',
            }}
          >
            ترجمتك،
            <br />
            <span style={{ color: '#60a5fa' }}>بشكل أسهل وأسرع</span>
          </h1>

          <p
            style={{
              maxWidth: 720,
              margin: '0 auto',
              color: '#94a3b8',
              fontSize: 19,
              lineHeight: 1.9,
            }}
          >
            اطلب ترجمة احترافية من مترجمين، أو استخدم الذكاء الاصطناعي
            لترجمة النصوص بسرعة.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              flexWrap: 'wrap',
              marginTop: 34,
            }}
          >
            <a
              href="/orders/new"
              style={{
                ...button,
                background: '#2563eb',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.45)',
              }}
            >
              📝 اطلب ترجمة
            </a>

            <a
              href="/ai"
              style={{
                ...button,
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#e2e8f0',
                border: '1px solid rgba(148, 163, 184, 0.35)',
              }}
            >
              🤖 جرّب AI
            </a>
          </div>
        </section>

        <section
          style={{
            maxWidth: 1100,
            margin: '-35px auto 0',
            padding: '0 20px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: 18,
            }}
          >
            <div style={card}>
              <div style={{ fontSize: 36 }}>👤</div>
              <h2 style={{ color: '#ffffff' }}>لأصحاب الطلبات</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                انشر طلبك وحدد الميزانية واستقبل عروض المترجمين.
              </p>
              <a href="/orders/new" style={link}>
                ابدأ الآن ←
              </a>
            </div>

            <div style={card}>
              <div style={{ fontSize: 36 }}>💼</div>
              <h2 style={{ color: '#ffffff' }}>للمترجمين</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                ابحث عن طلبات مناسبة وقدّم عروضك للعملاء.
              </p>
              <a href="/orders" style={link}>
                تصفح الطلبات ←
              </a>
            </div>

            <div style={card}>
              <div style={{ fontSize: 36 }}>⚡</div>
              <h2 style={{ color: '#ffffff' }}>ترجمة AI</h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                ترجمة سريعة للنصوص باستخدام الذكاء الاصطناعي.
              </p>
              <a href="/ai" style={link}>
                جرّب الآن ←
              </a>
            </div>
          </div>
        </section>

        <section
          style={{
            maxWidth: 1000,
            margin: '80px auto',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: 32, marginBottom: 12, color: '#ffffff' }}>
            ليه تستخدم منصة الترجمة؟
          </h2>

          <p style={{ color: '#94a3b8', fontSize: 17 }}>
            كل أدوات الترجمة اللي تحتاجها في مكان واحد.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 18,
              marginTop: 30,
            }}
          >
            <div style={{ padding: 22 }}>
              <div style={{ fontSize: 30 }}>🔒</div>
              <h3 style={{ color: '#ffffff' }}>آمنة</h3>
              <p style={{ color: '#94a3b8' }}>
                ملفاتك وطلباتك محفوظة بأمان.
              </p>
            </div>

            <div style={{ padding: 22 }}>
              <div style={{ fontSize: 30 }}>💬</div>
              <h3 style={{ color: '#ffffff' }}>عروض متعددة</h3>
              <p style={{ color: '#94a3b8' }}>
                قارن بين عروض المترجمين واختر الأنسب لك.
              </p>
            </div>

            <div style={{ padding: 22 }}>
              <div style={{ fontSize: 30 }}>📎</div>
              <h3 style={{ color: '#ffffff' }}>رفع واستلام الملفات</h3>
              <p style={{ color: '#94a3b8' }}>
                ارفع ملفك الأصلي واستلم الترجمة النهائية من نفس الصفحة.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          background: 'rgba(11, 20, 55, 0.7)',
          padding: '24px 6%',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: 14,
        }}
      >
        © منصة الترجمة
      </footer>
    </div>
  )
}
