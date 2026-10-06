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
    background: '#f7faf6',
    borderRadius: 20,
    padding: 26,
    border: '1px solid #d3dfd2',
    boxShadow: '0 6px 20px rgba(63, 90, 70, 0.10)',
  } as const

  const link = { color: '#3f7551', fontWeight: 700 } as const

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(170deg, #eef3ec 0%, #e3ebe1 100%)',
        color: '#2f3b32',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header
        style={{
          background: 'rgba(247, 250, 246, 0.85)',
          borderBottom: '1px solid #d3dfd2',
          padding: '18px 6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: '#1f2a22' }}>
          🌐 منصة الترجمة
        </div>

        <a
          href="/login"
          style={{
            ...button,
            padding: '10px 18px',
            background: '#4f8a62',
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
              'radial-gradient(circle at 50% 0%, rgba(79, 138, 98, 0.18), transparent 60%)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: 999,
              background: '#dcefdf',
              border: '1px solid #b5d6bd',
              color: '#2f6b44',
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
              color: '#1f2a22',
            }}
          >
            ترجمتك،
            <br />
            <span style={{ color: '#4f8a62' }}>بشكل أسهل وأسرع</span>
          </h1>

          <p
            style={{
              maxWidth: 720,
              margin: '0 auto',
              color: '#6b7d6f',
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
                background: '#4f8a62',
                color: '#fff',
                boxShadow: '0 6px 16px rgba(79, 138, 98, 0.30)',
              }}
            >
              📝 اطلب ترجمة
            </a>

            <a
              href="/ai"
              style={{
                ...button,
                background: '#f7faf6',
                color: '#2f3b32',
                border: '1px solid #c5d3c4',
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
              <h2 style={{ color: '#1f2a22' }}>لأصحاب الطلبات</h2>
              <p style={{ color: '#6b7d6f', lineHeight: 1.7 }}>
                انشر طلبك وحدد الميزانية واستقبل عروض المترجمين.
              </p>
              <a href="/orders/new" style={link}>
                ابدأ الآن ←
              </a>
            </div>

            <div style={card}>
              <div style={{ fontSize: 36 }}>💼</div>
              <h2 style={{ color: '#1f2a22' }}>للمترجمين</h2>
              <p style={{ color: '#6b7d6f', lineHeight: 1.7 }}>
                ابحث عن طلبات مناسبة وقدّم عروضك للعملاء.
              </p>
              <a href="/orders" style={link}>
                تصفح الطلبات ←
              </a>
            </div>

            <div style={card}>
              <div style={{ fontSize: 36 }}>⚡</div>
              <h2 style={{ color: '#1f2a22' }}>ترجمة AI</h2>
              <p style={{ color: '#6b7d6f', lineHeight: 1.7 }}>
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
          <h2 style={{ fontSize: 32, marginBottom: 12, color: '#1f2a22' }}>
            ليه تستخدم منصة الترجمة؟
          </h2>

          <p style={{ color: '#6b7d6f', fontSize: 17 }}>
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
              <h3 style={{ color: '#1f2a22' }}>آمنة</h3>
              <p style={{ color: '#6b7d6f' }}>
                ملفاتك وطلباتك محفوظة بأمان.
              </p>
            </div>

            <div style={{ padding: 22 }}>
              <div style={{ fontSize: 30 }}>💬</div>
              <h3 style={{ color: '#1f2a22' }}>عروض متعددة</h3>
              <p style={{ color: '#6b7d6f' }}>
                قارن بين عروض المترجمين واختر الأنسب لك.
              </p>
            </div>

            <div style={{ padding: 22 }}>
              <div style={{ fontSize: 30 }}>📎</div>
              <h3 style={{ color: '#1f2a22' }}>رفع واستلام الملفات</h3>
              <p style={{ color: '#6b7d6f' }}>
                ارفع ملفك الأصلي واستلم الترجمة النهائية من نفس الصفحة.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          borderTop: '1px solid #d3dfd2',
          background: '#f7faf6',
          padding: '24px 6%',
          textAlign: 'center',
          color: '#6b7d6f',
          fontSize: 14,
        }}
      >
        © منصة الترجمة
      </footer>
    </div>
  )
}
