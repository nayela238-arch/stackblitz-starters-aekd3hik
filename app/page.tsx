export default function Home() {
  const button = {
    display: 'inline-block',
    padding: '14px 26px',
    borderRadius: 12,
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: 16,
  } as const

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        color: '#0f172a',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '18px 6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800 }}>
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
              'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #eef2ff 100%)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: 999,
              background: '#dbeafe',
              color: '#1d4ed8',
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
            }}
          >
            ترجمتك،
            <br />
            <span style={{ color: '#2563eb' }}>بشكل أسهل وأسرع</span>
          </h1>

          <p
            style={{
              maxWidth: 720,
              margin: '0 auto',
              color: '#64748b',
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
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)',
              }}
            >
              📝 اطلب ترجمة
            </a>

            <a
              href="/ai"
              style={{
                ...button,
                background: '#ffffff',
                color: '#0f172a',
                border: '1px solid #d1d5db',
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
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 26,
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
              }}
            >
              <div style={{ fontSize: 36 }}>👤</div>
              <h2>لأصحاب الطلبات</h2>
              <p style={{ color: '#64748b', lineHeight: 1.7 }}>
                انشر طلبك وحدد الميزانية واستقبل عروض المترجمين.
              </p>
              <a
                href="/orders/new"
                style={{ color: '#2563eb', fontWeight: 700 }}
              >
                ابدأ الآن ←
              </a>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 26,
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
              }}
            >
              <div style={{ fontSize: 36 }}>💼</div>
              <h2>للمترجمين</h2>
              <p style={{ color: '#64748b', lineHeight: 1.7 }}>
                ابحث عن طلبات مناسبة وقدّم عروضك للعملاء.
              </p>
              <a
                href="/orders"
                style={{ color: '#2563eb', fontWeight: 700 }}
              >
                تصفح الطلبات ←
              </a>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 26,
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
              }}
            >
              <div style={{ fontSize: 36 }}>⚡</div>
              <h2>ترجمة AI</h2>
              <p style={{ color: '#64748b', lineHeight: 1.7 }}>
                ترجمة سريعة للنصوص باستخدام الذكاء الاصطناعي.
              </p>
              <a
                href="/ai"
                style={{ color: '#2563eb', fontWeight: 700 }}
              >
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
          <h2 style={{ fontSize: 32, marginBottom: 12 }}>
            ليه تستخدم منصة الترجمة؟
          </h2>

          <p style={{ color: '#64748b', fontSize: 17 }}>
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
              <h3>آمنة</h3>
              <p style={{ color: '#64748b' }}>
                ملفاتك وطلباتك محفوظة بأمان.
              </p>
            </div>

            <div style={{ padding: 22 }}>
              <div style={{
