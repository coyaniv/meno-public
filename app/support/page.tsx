import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meno - תמיכה",
  description: "מרכז התמיכה של Meno - נשמח לעזור בכל שאלה",
  robots: { index: true, follow: true },
};

export default function SupportPage() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        color: "#333",
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
        direction: "rtl",
        fontSize: 18,
      }}
    >
      <h1 style={{ fontSize: 28 }}>מרכז תמיכה</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>
        נשמח לעזור לך בכל שאלה או בעיה
      </p>

      <div
        style={{
          background: "#5C3D6E",
          borderRadius: 16,
          padding: "32px 28px",
          color: "white",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>צריכה עזרה?</h2>
        <p style={{ opacity: 0.85, marginBottom: 20, fontSize: 16 }}>
          צוות התמיכה שלנו כאן בשבילך. שלחי לנו מייל ונחזור אלייך בהקדם.
        </p>
        <a
          href="mailto:support@menoapp.health"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "white",
            color: "#5C3D6E",
            borderRadius: 10,
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          support@menoapp.health
        </a>
      </div>

      <h2 style={{ fontSize: 22, marginBottom: 20 }}>שאלות נפוצות</h2>

      <div
        style={{
          background: "#f9f9f9",
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 16,
        }}
      >
        <h3 style={{ fontSize: 17, marginBottom: 6 }}>איך יוצרים חשבון?</h3>
        <p style={{ color: "#666", fontSize: 15, lineHeight: 1.8 }}>
          הורידי את Meno מחנות האפליקציות, הזיני את מספר הטלפון שלך וקבלי קוד
          אימות ב-SMS. זה הכל!
        </p>
      </div>

      <div
        style={{
          background: "#f9f9f9",
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 16,
        }}
      >
        <h3 style={{ fontSize: 17, marginBottom: 6 }}>
          האם המידע שלי מוגן?
        </h3>
        <p style={{ color: "#666", fontSize: 15, lineHeight: 1.8 }}>
          בהחלט. כל הנתונים שלך מוצפנים ומאובטחים. אנחנו לא מוכרות ולא משתפות
          מידע אישי עם צדדים שלישיים. קראי עוד ב
          <a href="/privacy" style={{ color: "#5C3D6E" }}>
            מדיניות הפרטיות
          </a>{" "}
          שלנו.
        </p>
      </div>

      <div
        style={{
          background: "#f9f9f9",
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 16,
        }}
      >
        <h3 style={{ fontSize: 17, marginBottom: 6 }}>
          איך מוחקים את החשבון?
        </h3>
        <p style={{ color: "#666", fontSize: 15, lineHeight: 1.8 }}>
          ניתן למחוק את החשבון דרך מסך הפרופיל באפליקציה, או לפנות אלינו במייל
          ונטפל בבקשה תוך 48 שעות.
        </p>
      </div>

      <div
        style={{
          background: "#f9f9f9",
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 16,
        }}
      >
        <h3 style={{ fontSize: 17, marginBottom: 6 }}>
          האפליקציה מחליפה ייעוץ רפואי?
        </h3>
        <p style={{ color: "#666", fontSize: 15, lineHeight: 1.8 }}>
          לא. Meno מספקת מידע כללי וליווי אישי, אך אינה מחליפה ייעוץ רפואי
          מקצועי. בכל שאלה רפואית, יש לפנות לרופאה.
        </p>
      </div>

      <p
        style={{
          marginTop: 60,
          paddingTop: 24,
          borderTop: "1px solid #ddd",
          color: "#888",
          fontSize: 14,
        }}
      >
        &copy; 2026 Meno Health Ltd. כל הזכויות שמורות.
      </p>
    </div>
  );
}
