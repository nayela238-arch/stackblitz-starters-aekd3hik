export default function Home() {
  const btn = {
    display: 'inline-block',
    padding: '13px 24px',
    borderRadius: 10,
    textDecoration: 'none',
    fontWeight: 700,
    transition: '0.2s',
  } as const

  return (
    <div
      dir="rtl"
      style={{
        background: '#f8fafc',
        color: '#0f172a',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <b style={{ fontSize: 21 }}>🌐 منصة الترجمة</b>

        <a
          href="/login"
          style={{
            color: '#2563eb',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          دخول / تسجيل
        </a>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '70px 20px' }}>
        <section
          style={{
            textAlign: 'center',
            background: '#ffffff',
            borderRadius: 24,
            padding: '55px 25px',
            boxShadow: '0 10px 35px rgba(15, 23, 42, 0.08)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: '#eff6ff',
              color: '#2563eb',
              padding: '8px 14px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            ترجمة بشرية وذكاء اصطناعي
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 6vw, 52px)',
              lineHeight: 1.2,
              margin: '0 0 18px',
            }}
          >
            ترجمتك تبدأ من هنا
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              color: '#64748b',
              maxWidth: 700,
              margin: '0 auto 30px',
            }}
          >
            انشر طلب الترجمة، استقبل عروض من المترجمين،
            أو استخدم الترجمة الفورية بالذكاء الاصطناعي.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/orders/new"
              style={{
                ...btn,
                background: '#2563eb',
                color: '#fff',
              }}
            >
              انشر طلب ترجمة
            </a>

            <a
              href="/ai"
              style={{
                ...btn,
                background: '#e2e8f0',
                color: '#0f172a',
              }}
            >
              جرّب ترجمة AI
            </a>
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 18,
            marginTop: 28,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 18,
              padding: 24,
            }}
          >
            <div style={{ fontSize: 30 }}>📝</div>
            <h2 style={{ fontSize: 21 }}>لأصحاب الطلبات</h2>
            <p style={{ color: '#64748b', lineHeight: 1.7 }}>
              انشر طلبك وحدد ميزانيتك واستقبل عروض المترجمين.
            </p>
            <a href="/orders/new" style={{ color: '#2563eb', fontWeight: 700 }}>
              ابدأ طلبك ←
            </a>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 18,
              padding: 24,
            }}
          >
            <div style={{ fontSize: 30 }}>👨‍💻</div>
            <h2 style={{ fontSize: 21 }}>للمترجمين</h2>
            <p style={{ color: '#64748b', lineHeight: 1.7 }}>
              تصفح الطلبات المفتوحة وقدّم عروضك للعملاء.
            </p>
            <a href="/orders" style={{ color: '#2563eb', fontWeight: 700 }}>
              شوف الطلبات ←
            </a>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 18,
              padding: 24,
            }}
          >
            <div style={{ fontSize: 30 }}>🤖</div>
            <h2 style={{ fontSize: 21 }}>ترجمة AI</h2>
            <p style={{ color: '#64748b', lineHeight: 1.7 }}>
              ترجم النصوص بسرعة باستخدام الذكاء الاصطناعي.
            </p>
            <a href="/ai" style={{ color: '#2563eb', fontWeight: 700 }}>
              جرّب الآن ←
            </a>
          </div>
        </section>

        <section
          style={{
            marginTop: 28,
            background: '#0f172a',
            color: '#ffffff',
            borderRadius: 20,
            padding: '30px 24px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ marginTop: 0 }}>ترجمة أسهل. أسرع. أوضح.</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            منصة واحدة تجمع بين العملاء والمترجمين والترجمة بالذكاء الاصطناعي.
          </p>
        </section>
      </main>

      <footer
        style={{
          textAlign: 'center',
          padding: '30px 20px',
          color: '#64748b',
          fontSize: 13,
          borderTop: '1px solid #e2e8f0',
          background: '#ffffff',
        }}
      >
        <p>
          الترجمة الآلية ممكن تحتوي على أخطاء، وللأوراق الرسمية استخدم مترجمًا بشريًا.
        </p>

        <div style={{ marginTop: 14 }}>
          <a
            href="/terms"
            style={{ color: '#2563eb', margin: '0 8px' }}
          >
            شروط الاستخدام
          </a>

          <a
            href="/privacy"
            style={{ color: '#2563eb', margin: '0 8px' }}
          >
            سياسة الخصوصية
          </a>
        </div>
      </footer>
    </div>
  )
}
