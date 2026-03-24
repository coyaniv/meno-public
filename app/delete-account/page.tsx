import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meno - מחיקת חשבון",
  description: "הסבר על מחיקת חשבון ונתונים באפליקציית Meno",
  robots: { index: true, follow: true },
};

export default function DeleteAccountPage() {
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
      <h1 style={{ fontSize: 22 }}>מחיקת חשבון - Meno</h1>

      <p>
        באפשרותך למחוק את חשבונך ואת כל המידע המשויך אליו ישירות מתוך
        האפליקציה.
      </p>

      <h2 style={{ fontSize: 22 }}>כיצד למחוק את החשבון</h2>
      <ol>
        <li>פתחי את אפליקציית Meno</li>
        <li>עברי למסך הפרופיל (הגדרות)</li>
        <li>לחצי על &ldquo;מחיקת חשבון&rdquo;</li>
        <li>אשרי את המחיקה</li>
      </ol>

      <h2 style={{ fontSize: 22 }}>אילו נתונים נמחקים</h2>
      <p>
        מחיקת החשבון מוחקת את <strong>כל</strong> המידע שלך לצמיתות, כולל:
      </p>
      <ul>
        <li>פרטי החשבון (שם, מספר טלפון)</li>
        <li>יומן בריאות, סימפטומים ונתוני מעקב</li>
        <li>שיחות עם העוזרת (AI)</li>
        <li>תוצאות שאלונים ותובנות</li>
        <li>כל מידע אחר שהזנת באפליקציה</li>
      </ul>

      <h2 style={{ fontSize: 22 }}>תוך כמה זמן</h2>
      <p>המחיקה מתבצעת באופן מיידי. לאחר המחיקה לא ניתן לשחזר את המידע.</p>

      <h2 style={{ fontSize: 22 }}>צריכה עזרה?</h2>
      <p>
        אם אינך מצליחה למחוק את החשבון דרך האפליקציה, ניתן לפנות אלינו בכתובת{" "}
        <a href="mailto:support@menoapp.health">support@menoapp.health</a>{" "}
        ונטפל בבקשתך.
      </p>

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
