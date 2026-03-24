export default function HomePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "var(--primary)",
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Meno
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 20,
            marginBottom: 48,
          }}
        >
          בריאות נשים חכמה
        </p>

        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
            padding: "40px 32px",
            marginBottom: 40,
          }}
        >
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              color: "var(--text)",
              marginBottom: 0,
            }}
          >
            אפליקציה לניהול ומעקב אחר בריאות נשים, עם דגש על תקופת
            הפרימנופאוזה והמנופאוזה. מעקב סימפטומים, תובנות מבוססות AI, ויומן
            בריאות אישי.
          </p>
        </div>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 14,
            marginBottom: 24,
          }}
        >
          בקרוב ב-App Store
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            marginTop: 48,
            fontSize: 14,
            color: "var(--text-secondary)",
          }}
        >
          <a href="/terms">תנאי שימוש</a>
          <span>|</span>
          <a href="/privacy">מדיניות פרטיות</a>
        </div>

        <p
          style={{
            marginTop: 48,
            color: "var(--text-secondary)",
            fontSize: 13,
          }}
        >
          &copy; 2026 Meno Health Ltd. כל הזכויות שמורות.
        </p>
      </div>
    </div>
  );
}
