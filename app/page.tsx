import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(241, 228, 219, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(210, 202, 223, 0.5)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "12px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <img src="/logo.png" alt="Meno" style={{ height: 36 }} />
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--primary)",
                letterSpacing: -0.5,
              }}
            >
              Meno
            </span>
          </Link>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <a href="#features" className="nav-link">
              מה באפליקציה
            </a>
            <a href="#download" className="nav-link">
              הורדה
            </a>
            <Link href="/privacy" className="nav-link">
              פרטיות
            </Link>
            <Link href="/terms" className="nav-link">
              תנאי שימוש
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 32px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "-20%",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(92, 61, 110, 0.07) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-10%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(233, 30, 140, 0.04) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            maxWidth: 720,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ margin: "0 auto 32px", width: 100, height: 100 }}>
            <img
              src="/logo.png"
              alt="Meno Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div
            style={{
              display: "inline-block",
              padding: "6px 18px",
              background: "rgba(92, 61, 110, 0.1)",
              color: "var(--primary)",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 28,
            }}
          >
            בריאות האישה, בגישה חכמה
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--text)",
              marginBottom: 20,
              letterSpacing: -0.5,
            }}
          >
            הבריאות שלך,
            <br />
            <span style={{ color: "var(--primary)" }}>בידיים שלך</span>
          </h1>
          <p
            style={{
              fontSize: 19,
              color: "var(--text-secondary)",
              maxWidth: 520,
              margin: "0 auto 40px",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            מעקב תסמינים, תובנות מבוססות AI, וליווי אישי לכל שלב בחיים. הכל
            במקום אחד, בעברית, ובשבילך.
          </p>
          <StoreButtons variant="hero" />
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{ padding: "80px 32px 100px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 12,
              color: "var(--text)",
            }}
          >
            הכל במקום אחד
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              fontWeight: 300,
            }}
          >
            הכלים שתצטרכי כדי להבין את הגוף שלך טוב יותר
          </p>
        </div>
        <div className="features-grid">
          <FeatureCard
            icon={
              <path d="M12 20v-6M6 20V10M18 20V4" />
            }
            title="מעקב תסמינים יומי"
            description="תעדי את ההרגשה שלך בקלות ועקבי אחרי דפוסים לאורך זמן."
          />
          <FeatureCard
            icon={
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            }
            title="צ׳אט AI אישי"
            description="שאלי כל שאלה וקבלי תשובות מותאמות אישית בעברית, מבוססות על הנתונים שלך."
          />
          <FeatureCard
            icon={
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            }
            title="סנכרון עם Apple Health"
            description="חיבור אוטומטי לנתוני הבריאות שלך לתמונה מלאה ומדויקת יותר."
          />
          <FeatureCard
            icon={
              <>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </>
            }
            title="מעקב מחזור"
            description="תיעוד קל ומדויק של המחזור החודשי עם תחזיות חכמות."
          />
          <FeatureCard
            icon={
              <>
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </>
            }
            title="יומן אישי"
            description="מרחב פרטי לכתוב, לשתף ולהבין את מה שעוברת."
          />
          <FeatureCard
            icon={
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            }
            title="פרטיות מלאה"
            description="המידע שלך מוגן ומאובטח. אנחנו לא מוכרות ולא משתפות נתונים."
          />
        </div>
      </section>

      {/* CTA */}
      <section id="download" style={{ padding: "80px 32px", textAlign: "center" }}>
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            background: "var(--primary)",
            borderRadius: 28,
            padding: "64px 48px",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-30%",
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(233, 30, 140, 0.15) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40%",
              left: "-20%",
              width: 350,
              height: 350,
              background:
                "radial-gradient(circle, rgba(123, 94, 167, 0.2) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <h2
            style={{
              fontSize: 30,
              fontWeight: 700,
              marginBottom: 14,
              position: "relative",
            }}
          >
            מוכנה להתחיל?
          </h2>
          <p
            style={{
              fontSize: 17,
              opacity: 0.85,
              marginBottom: 36,
              fontWeight: 300,
              position: "relative",
            }}
          >
            הורידי את Meno בחינם והתחילי את המסע לבריאות טובה יותר.
          </p>
          <StoreButtons variant="cta" />
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "48px 32px",
          borderTop: "1px solid var(--border)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              <img src="/logo.png" alt="Meno" style={{ height: 28 }} />
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--primary)",
                }}
              >
                Meno
              </span>
            </Link>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
              &copy; 2026 Meno Health Ltd. כל הזכויות שמורות.
            </p>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <Link href="/privacy" className="footer-link">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="footer-link">
              תנאי שימוש
            </Link>
            <Link href="/delete-account" className="footer-link">
              מחיקת חשבון
            </Link>
            <a href="mailto:hello@menoapp.health" className="footer-link">
              צרי קשר
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function StoreButtons({ variant }: { variant: "hero" | "cta" }) {
  const isCta = variant === "cta";
  return (
    <div
      className="store-buttons"
      style={{ position: "relative" }}
    >
      <a
        href="https://apps.apple.com/app/meno"
        className={isCta ? "store-btn store-btn-cta-primary" : "store-btn store-btn-primary"}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <span className="store-btn-text">
          <span className="store-btn-label">הורידי מ-</span>
          <span className="store-btn-name">App Store</span>
        </span>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=health.meno.app"
        className={isCta ? "store-btn store-btn-cta-secondary" : "store-btn store-btn-secondary"}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.56.69.56 1.19s-.22.92-.56 1.19l-2.11 1.24-2.5-2.5 2.5-2.5 2.11 1.38M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
        </svg>
        <span className="store-btn-text">
          <span className="store-btn-label">הורידי מ-</span>
          <span className="store-btn-name">Google Play</span>
        </span>
      </a>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="#5C3D6E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 8,
          color: "var(--text)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 15,
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        {description}
      </p>
    </div>
  );
}
