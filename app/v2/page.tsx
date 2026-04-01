import Link from "next/link";
import React from "react";

export default function UltraPremiumHomePage() {
  return (
    <div className="up-page">
      <div className="up-mesh-bg" />

      {/* Glass Nav */}
      <nav className="up-nav">
        <div className="up-nav-inner">
          <Link href="/" className="up-nav-logo">
            <span style={{ color: "var(--up-primary)" }}>Meno</span>
            <span style={{ color: "var(--up-accent)" }}>.</span>
          </Link>
          <div className="up-nav-links">
            <Link href="/" className="up-nav-link">
              האתר המקורי
            </Link>
            <Link href="/support" className="up-nav-link">
              תמיכה
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="up-hero">
        <div className="up-hero-content">
          <div className="up-pill">
            <span className="up-pill-dot"></span>
            העיצוב החדש והמתקדם
          </div>
          <h1 className="up-title">
            להבין את הגוף <br/>
            <span style={{ color: "var(--up-accent)" }}>שלך,</span> מחדש.
          </h1>
          <p className="up-subtitle">
            חוויה עתירת טכנולוגיה. תובנות חכמות, מעקב אישי, וליווי אקסלוסיבי לגיל המעבר.
            מעוצב עבור נשים שלא מתפשרות על בריאותן ופרטיותן.
          </p>
          <div className="up-badges">
            <a href="https://apps.apple.com/app/meno" className="up-badge">
              <img src="/badge-appstore.svg" alt="App Store" width="160" height="auto" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=health.meno.app" className="up-badge">
              <img src="/badge-googleplay.svg" alt="Google Play" width="160" height="auto" />
            </a>
          </div>
        </div>

        <div className="up-hero-visual">
          <div className="up-phone-frame">
            <div className="up-phone-screen">
              <img src="/screenshot.png" alt="Meno App Experience" />
            </div>
          </div>
          
          {/* Floating abstract decorative cards behind the phone */}
          <div className="up-glass-card up-float-1">
            <div className="up-glass-card-title">תובנות מהשבוע</div>
            <div className="up-glass-card-value" style={{ color: "var(--up-accent)" }}>+24% שיפור</div>
          </div>
          <div className="up-glass-card up-float-2">
            <div className="up-glass-card-title">רמות אנרגיה</div>
            <div className="up-glass-card-value">מצוין היום</div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="up-section">
        <div className="up-section-header">
          <h2 className="up-section-title">איך זה עובד.</h2>
        </div>
        
        <div className="up-bento">
          {/* Deep Insight Card (Large) */}
          <div className="up-bento-card up-bento-large">
            <div className="up-bento-chart" />
            <div className="up-bento-content">
              <div className="up-bento-icon">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="up-bento-title">תובנות מבוססות נתונים</h3>
              <p className="up-bento-desc">
                המערכת שלנו לומדת את הדפוסים שלך לאורך זמן ויודעת לנבא, להמליץ ולהתאים את עצמה במדויק
                לצרכים השתנים של גופך בגיל המעבר.
              </p>
            </div>
          </div>

          {/* Privacy Card */}
          <div className="up-bento-card">
            <div className="up-bento-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div className="up-bento-content">
              <h3 className="up-bento-title">פרטיות מוחלטת</h3>
              <p className="up-bento-desc">
                המידע האישי והרפואי שלך חסוי, מאובטח ואינו משותף עם צדדים שלישיים ללא אישורך.
              </p>
            </div>
          </div>

          {/* Easy Tracking */}
          <div className="up-bento-card">
            <div className="up-bento-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="up-bento-content">
              <h3 className="up-bento-title">מעקב זורם ונוח</h3>
              <p className="up-bento-desc">
                ממשק נקי וידידותי לתיעוד תסמינים בכמה שניות בכל יום.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="up-footer">
        <Link href="/" className="up-nav-logo" style={{ justifyContent: "center", marginBottom: "32px", fontSize: "32px" }}>
          <span>Meno</span><span style={{ color: "var(--up-accent)" }}>.</span>
        </Link>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "32px" }}>
          <Link href="/privacy" className="up-nav-link">מדיניות פרטיות</Link>
          <Link href="/terms" className="up-nav-link">תנאי שימוש</Link>
          <a href="mailto:hello@menoapp.health" className="up-nav-link">צור קשר</a>
        </div>
        <div style={{ color: "var(--up-secondary)", fontSize: "14px" }}>
          &copy; 2026 Meno Health. עוצב בקפידה.
        </div>
      </footer>
    </div>
  );
}
