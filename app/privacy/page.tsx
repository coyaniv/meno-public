import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meno - מדיניות פרטיות",
  description: "מדיניות הפרטיות של אפליקציית Meno לבריאות נשים",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div style={container}>
      <h1 style={h1Style}>מדיניות פרטיות</h1>
      <p style={dateLine}>עדכון אחרון: 24 במרץ 2026</p>

      <p>
        מדיניות זו מסבירה כיצד אפליקציית Meno (&ldquo;האפליקציה&rdquo;, &ldquo;השירות&rdquo;),
        המופעלת על ידי מנו הלת&apos; בע&quot;מ (&ldquo;החברה&rdquo;, &ldquo;אנחנו&rdquo;),
        אוספת, משתמשת, שומרת ומשתפת מידע אישי.
      </p>
      <p>
        המסמך מנוסח בלשון נקבה מטעמי נוחות בלבד ומתייחס לכל המינים במידה שווה.
        מדיניות זו מותאמת לדין הישראלי, ובפרט לחוק הגנת הפרטיות, התשמ&quot;א-1981,
        ולתקנות הנלוות.
      </p>

      <h2 style={h2Style}>1. הסכמה ומסירת מידע</h2>
      <p>
        השימוש באפליקציה כרוך במסירת מידע אישי, ובמקרים מסוימים גם מידע רגיש הנוגע
        למצב בריאותי, תסמינים, מחזור, שינה, מצב רוח ותכנים נוספים שתבחרי להזין.
      </p>
      <p>
        מסירת חלק מהמידע נדרשת לצורך פתיחת חשבון, אימות, תפעול האפליקציה ומתן
        השירותים. אם תבחרי שלא למסור מידע מסוים, ייתכן שלא נוכל לספק חלק מהשירותים.
      </p>
      <p>
        כאשר מדובר במידע רגיש, נבקש את הסכמתך באופן מתאים. באפשרותך לחזור בך מהסכמה
        בכל עת, בכפוף לכך שהחזרה לא תשפיע על עיבוד שבוצע לפני מועד החזרה.
      </p>

      <h2 style={h2Style}>2. מידע שאנו אוספות</h2>

      <h3 style={h3Style}>2.1 מידע שאת מוסרת</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <Th>קטגוריה</Th>
            <Th>דוגמאות</Th>
            <Th>מטרה</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>פרטי חשבון</Td>
            <Td>מספר טלפון, שם, מזהה משתמשת, העדפות שפה</Td>
            <Td>פתיחת חשבון, התחברות, אבטחה</Td>
          </tr>
          <tr>
            <Td>פרטים דמוגרפיים</Td>
            <Td>גיל, שלב חיים, נתונים כלליים רלוונטיים</Td>
            <Td>התאמת השירות ותובנות</Td>
          </tr>
          <tr>
            <Td>מידע בריאותי</Td>
            <Td>תסמינים, מחזור, מצב רוח, שינה, שאלונים, יומן, משקל, דופק</Td>
            <Td>מעקב, מגמות, התאמות אישיות, תובנות</Td>
          </tr>
          <tr>
            <Td>תוכן שיחות</Td>
            <Td>שאלות ותשובות ברכיבי AI או צ&apos;אט</Td>
            <Td>מתן תגובה, המשכיות שיחה, שיפור השירות</Td>
          </tr>
          <tr>
            <Td>פניות ותמיכה</Td>
            <Td>תכתובות עם שירות הלקוחות</Td>
            <Td>מתן תמיכה ותיעוד</Td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>2.2 מידע הנאסף אוטומטית</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <Th>קטגוריה</Th>
            <Th>דוגמאות</Th>
            <Th>מטרה</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>מידע טכני</Td>
            <Td>דגם מכשיר, מערכת הפעלה, גרסת אפליקציה</Td>
            <Td>תפעול, אבטחה, תחזוקה</Td>
          </tr>
          <tr>
            <Td>נתוני שימוש</Td>
            <Td>מסכים שנצפו, לחיצות, זמן שימוש</Td>
            <Td>שיפור חוויית משתמש, ניתוח</Td>
          </tr>
          <tr>
            <Td>יומני אבטחה</Td>
            <Td>כתובות IP, מועדי גישה, ניסיונות התחברות</Td>
            <Td>אבטחת מידע, מניעת הונאה</Td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>2.3 מידע מ-Apple Health / HealthKit</h3>
      <p>
        בכפוף להרשאות שתתני במכשירך, האפליקציה עשויה לקרוא נתונים מ-Apple Health
        כגון שינה, צעדים, מחזור, דופק ומשקל. נתוני HealthKit לא ישמשו לפרסום,
        לשיווק או למכירה לצדדים שלישיים.
      </p>

      <h2 style={h2Style}>3. מטרות השימוש במידע</h2>
      <ul>
        <li>פתיחת חשבון, זיהוי ואימות משתמשת.</li>
        <li>מתן השירותים באפליקציה: מעקב, תובנות, יומן, התראות ותזכורות.</li>
        <li>הפעלת רכיבי AI וצ&apos;אט.</li>
        <li>שיפור המוצר, אבטחה, זיהוי תקלות ומניעת שימוש לרעה.</li>
        <li>מענה לפניות ושירות לקוחות.</li>
        <li>עמידה בדרישות דין.</li>
        <li>שליחת הודעות שירותיות ותפעוליות.</li>
        <li>דיוור שיווקי, בהסכמתך ובהתאם לדין בלבד.</li>
      </ul>

      <h2 style={h2Style}>4. שיתוף מידע עם צדדים שלישיים</h2>
      <p>
        <strong>איננו מוכרות מידע אישי.</strong> מידע עשוי להיות מועבר לספקי שירות
        חיצוניים המסייעים לנו בתפעול האפליקציה:
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <Th>סוג ספק</Th>
            <Th>תפקיד</Th>
            <Th>סוג מידע אפשרי</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>תשתית ואחסון</Td>
            <Td>אחסון, גיבוי, אימות</Td>
            <Td>פרטי חשבון, תכנים, מידע בריאותי</Td>
          </tr>
          <tr>
            <Td>עיבוד שפה ובינה מלאכותית</Td>
            <Td>הפקת תשובות AI</Td>
            <Td>תוכן שיחות, שאלות</Td>
          </tr>
          <tr>
            <Td>מדידה וניתוח</Td>
            <Td>ניתוח שימוש ושיפור השירות</Td>
            <Td>אירועי שימוש, נתוני מכשיר</Td>
          </tr>
        </tbody>
      </table>
      <p>
        ספקים אלה מחויבים לסודיות ולאבטחת המידע, ומקבלים גישה רק למידע הדרוש לצורך
        מתן השירות.
      </p>
      <p>
        נוסף לכך, אנו עשויות לחשוף מידע אישי אם נהיה מחויבות לכך לפי דין, צו
        שיפוטי, או לצורך הגנה על זכויות, מניעת תרמית, או במסגרת עסקה תאגידית.
      </p>

      <h2 style={h2Style}>5. העברת מידע מחוץ לישראל</h2>
      <p>
        חלק מספקי השירות שלנו עשויים לעבד מידע מחוץ לישראל. במקרים כאלה, ננקוט
        אמצעים סבירים לוודא שההעברה מותרת ושמקבל המידע מחויב לרמת הגנה הנדרשת לפי
        הדין הישראלי.
      </p>

      <h2 style={h2Style}>6. מידע רגיש ורכיבי AI</h2>
      <p>האפליקציה עשויה לעבד מידע רגיש, ובכלל זה מידע בריאותי. לכן:</p>
      <ul>
        <li>הגישה למידע מוגבלת למי שנדרש לכך בלבד.</li>
        <li>נפעל לצמצום מידע, הרשאות וחשיפה ככל הניתן.</li>
        <li>תוכן שתזיני ברכיבי AI עשוי להיות מועבר לספק חיצוני לצורך הפקת תשובה.</li>
        <li>אין חובה להזין פרטים מזהים שאינם נדרשים, כגון תעודת זהות, מסמכים רפואיים מלאים או פרטי תשלום.</li>
      </ul>

      <h2 style={h2Style}>7. אבטחת מידע</h2>
      <p>
        אנו נוקטות אמצעים סבירים ומקובלים להגנה על המידע, לרבות הצפנת תעבורה,
        ניהול הרשאות גישה, ניטור אירועי אבטחה, גיבוי ובקרת ספקים. עם זאת, אין
        ביכולתנו להבטיח חסינות מוחלטת מפני חדירה או כשל טכנולוגי.
      </p>

      <h2 style={h2Style}>8. שמירת מידע ומחיקתו</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <Th>סוג מידע</Th>
            <Th>משך שמירה</Th>
            <Th>הערות</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>חשבון פעיל</Td>
            <Td>כל עוד החשבון פעיל</Td>
            <Td>נדרש להפעלת השירות</Td>
          </tr>
          <tr>
            <Td>תוכן שיחות AI</Td>
            <Td>עד מחיקת החשבון</Td>
            <Td>ניתן למחיקה ידנית בכל עת</Td>
          </tr>
          <tr>
            <Td>מידע לאחר מחיקת חשבון</Td>
            <Td>עד 30 ימים</Td>
            <Td>מחיקה ממערכות פעילות</Td>
          </tr>
          <tr>
            <Td>גיבויים מוצפנים</Td>
            <Td>עד 90 ימים</Td>
            <Td>בהתאם למדיניות הגיבוי</Td>
          </tr>
        </tbody>
      </table>
      <p>
        כאשר תבקשי למחוק את החשבון, נפעל למחיקת המידע או להפיכתו לבלתי מזהה,
        בכפוף לחובות שמירה החלות עלינו לפי דין.
      </p>

      <h2 style={h2Style}>9. זכויותייך</h2>
      <p>בהתאם לדין הישראלי, עומדות לך הזכויות הבאות:</p>
      <ul>
        <li>עיון במידע אישי המוחזק על אודותייך.</li>
        <li>תיקון מידע שאינו נכון או מעודכן.</li>
        <li>מחיקת מידע, כאשר הדבר אפשרי לפי הדין.</li>
        <li>התנגדות לדיוור ישיר.</li>
        <li>ביטול הסכמה לעיבוד מידע.</li>
      </ul>
      <p>
        בקשות ניתן לשלוח לכתובת{" "}
        <a href="mailto:privacy@menoapp.health">privacy@menoapp.health</a>.
      </p>

      <h2 style={h2Style}>10. הודעות ודיוור</h2>
      <p>
        אנו עשויות לשלוח הודעות שירותיות ותפעוליות הנדרשות להפעלת השירות. הודעות
        שיווקיות יישלחו בהסכמתך בלבד וניתן לבטלן בכל עת. התראות Push ניתנות לכיבוי
        דרך הגדרות המכשיר.
      </p>

      <h2 style={h2Style}>11. קטינות</h2>
      <p>
        האפליקציה מיועדת לבגירות בלבד. איננו אוספות ביודעין מידע מקטינות. אם נודע לך
        כי קטינה מסרה לנו מידע, אנא פני אלינו לטיפול.
      </p>

      <h2 style={h2Style}>12. שינויים במדיניות</h2>
      <p>
        אנו רשאיות לעדכן מדיניות זו מעת לעת. במקרה של שינוי מהותי, נודיע לך באמצעות
        האפליקציה, האתר או דוא&quot;ל. מועד העדכון האחרון מופיע בראש המסמך.
      </p>

      <h2 style={h2Style}>13. יצירת קשר</h2>
      <p>לפניות בנושא פרטיות:</p>
      <ul>
        <li>פרטיות: <a href="mailto:privacy@menoapp.health">privacy@menoapp.health</a></li>
        <li>תמיכה: <a href="mailto:support@menoapp.health">support@menoapp.health</a></li>
      </ul>

      <p style={footerStyle}>
        &copy; 2026 Meno Health Ltd. כל הזכויות שמורות.
      </p>
    </div>
  );
}

/* ─── Shared styles ─── */

const container: React.CSSProperties = {
  fontFamily: "'Assistant', Arial, sans-serif",
  lineHeight: 1.7,
  color: "#444",
  maxWidth: 760,
  margin: "0 auto",
  padding: "40px 20px",
  direction: "rtl",
  fontSize: 15,
};

const h1Style: React.CSSProperties = { fontSize: 20, fontWeight: 700, marginBottom: 4 };
const h2Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 32, marginBottom: 8 };
const h3Style: React.CSSProperties = { fontSize: 15, fontWeight: 600, marginTop: 20, marginBottom: 6 };
const dateLine: React.CSSProperties = { color: "#999", fontSize: 13, marginBottom: 32 };
const footerStyle: React.CSSProperties = { marginTop: 48, paddingTop: 20, borderTop: "1px solid #e5e5e5", color: "#999", fontSize: 13 };

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  margin: "12px 0 20px",
  fontSize: 14,
};

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ border: "1px solid #e5e5e5", padding: "10px 14px", textAlign: "right", verticalAlign: "top", background: "#fafafa", fontWeight: 600, fontSize: 13 }}>
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td style={{ border: "1px solid #e5e5e5", padding: "10px 14px", textAlign: "right", verticalAlign: "top", fontSize: 14 }}>
      {children}
    </td>
  );
}
