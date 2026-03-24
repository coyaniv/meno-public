import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meno - מדיניות פרטיות",
  description: "מדיניות הפרטיות של אפליקציית Meno לבריאות נשים",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1
            style={{
              color: "var(--primary)",
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
            }}
          >
            Meno
          </h1>
          <div style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
            בריאות נשים חכמה
          </div>
        </div>

        <h1
          style={{
            fontSize: 32,
            color: "var(--primary)",
            marginBottom: 8,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          מדיניות פרטיות
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: 14,
            marginBottom: 40,
          }}
        >
          עדכון אחרון: 24 במרץ 2026
        </p>

        {/* Important Notice */}
        <div
          style={{
            background: "var(--success-bg)",
            border: "1px solid #C5D9C7",
            borderRadius: "var(--radius-lg)",
            padding: "20px 24px",
            marginBottom: 32,
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: "var(--success)" }}>פרטיותך חשובה לנו. </strong>
          מדיניות זו מסבירה כיצד אנו אוספים, משתמשים, מאחסנים ומגנים על המידע האישי
          שלך באפליקציית Meno. אנו פועלים בהתאם לחוק הגנת הפרטיות,
          התשמ&quot;א-1981 ותקנותיו, וכן בהתאם להנחיות הרשות להגנת הפרטיות.
        </div>

        {/* Sections */}
        <Section number="1" title="כללי">
          <P>
            1.1. מדיניות פרטיות זו (&ldquo;המדיניות&rdquo;) חלה על אפליקציית Meno
            (&ldquo;האפליקציה&rdquo;), המופעלת על ידי מנו הלת&apos; בע&quot;מ
            (&ldquo;החברה&rdquo;, &ldquo;אנחנו&rdquo;).
          </P>
          <P>
            1.2. מדיניות זו מהווה חלק בלתי נפרד מ
            <a href="/terms" style={{ color: "var(--primary)" }}>
              תנאי השימוש
            </a>{" "}
            של האפליקציה. מונחים שלא הוגדרו במדיניות זו יפורשו בהתאם להגדרתם בתנאי
            השימוש.
          </P>
          <P>
            1.3. בשימוש באפליקציה, את מסכימה לאיסוף ושימוש במידע בהתאם למדיניות זו.
          </P>
        </Section>

        <Section number="2" title="המידע שאנו אוספים">
          <H3>2.1. מידע שאת מוסרת לנו ישירות</H3>
          <DataTable
            headers={["סוג המידע", "פרטים", "מטרה"]}
            rows={[
              [
                "פרטי הרשמה",
                "מספר טלפון נייד, שם פרטי",
                "יצירת חשבון ואימות זהות באמצעות SMS OTP",
              ],
              [
                "פרטים דמוגרפיים",
                "תאריך לידה, גיל",
                "התאמת תוכן ותובנות לשלב החיים שלך",
              ],
              [
                "מידע בריאותי",
                "סימפטומים, מחזור חודשי, מצב רוח, יומן בריאות, תוצאות שאלונים",
                "מעקב בריאותי, הצגת תובנות ודוחות אישיים",
              ],
              [
                "שיחות AI",
                "תוכן השיחות שלך עם העוזרת הבינה המלאכותית",
                "מתן תגובות רלוונטיות והמשכיות שיחה",
              ],
            ]}
          />

          <H3>2.2. מידע הנאסף מ-Apple HealthKit</H3>
          <P>
            בכפוף להרשאותיך המפורשות, האפליקציה עשויה לגשת לנתונים הבאים מ-Apple
            Health:
          </P>
          <UL>
            <li>צעדים יומיים ופעילות גופנית</li>
            <li>דופק לב (קצב לב במנוחה, ממוצע, טווח)</li>
            <li>נתוני שינה (משך ואיכות)</li>
            <li>משקל גוף</li>
            <li>נתוני מחזור חודשי</li>
            <li>נתוני בריאות נוספים בהתאם להרשאות שנתת</li>
          </UL>
          <HighlightBox>
            <strong>חשוב:</strong> נתוני HealthKit לעולם לא ישמשו לפרסום, שיווק, או
            מכירה לצדדים שלישיים, בהתאם לדרישות Apple.
          </HighlightBox>

          <H3>2.3. מידע הנאסף אוטומטית</H3>
          <DataTable
            headers={["סוג המידע", "פרטים", "מטרה"]}
            rows={[
              [
                "מידע טכני",
                "סוג מכשיר, גרסת מערכת הפעלה, גרסת אפליקציה",
                "תמיכה טכנית ואופטימיזציה",
              ],
              [
                "נתוני שימוש",
                "מסכים שצפית בהם, לחיצות, זמן שימוש, תדירות שימוש",
                "שיפור חוויית המשתמשת וניתוח מגמות שימוש",
              ],
              [
                "אירועי אנליטיקס",
                "אירועים אנונימיים המתועדים באמצעות Mixpanel",
                "הבנת דפוסי שימוש ושיפור המוצר",
              ],
            ]}
          />
        </Section>

        <Section number="3" title="כיצד אנו משתמשים במידע">
          <P>3.1. אנו משתמשים במידע שנאסף למטרות הבאות:</P>
          <UL>
            <li>
              <strong>מתן השירות:</strong> הפעלת האפליקציה, ניהול חשבונך, הצגת מעקב
              בריאותי ותובנות אישיות
            </li>
            <li>
              <strong>שיחות AI:</strong> שליחת הודעותיך למערכת הבינה המלאכותית
              (OpenAI) לצורך קבלת תגובות, תוך שמירה על הקשר השיחה
            </li>
            <li>
              <strong>התאמה אישית:</strong> התאמת תוכן, תובנות והמלצות למצבך האישי
            </li>
            <li>
              <strong>תקשורת:</strong> שליחת הודעות הקשורות לשירות, כגון תזכורות,
              עדכונים והתרעות
            </li>
            <li>
              <strong>שיפור השירות:</strong> ניתוח דפוסי שימוש, זיהוי תקלות ופיתוח
              תכונות חדשות
            </li>
            <li>
              <strong>מחקר וסטטיסטיקה:</strong> שימוש בנתונים אנונימיים ומצטברים
              לצורכי מחקר ושיפור
            </li>
            <li>
              <strong>אבטחה:</strong> הגנה מפני שימוש לרעה, הונאה וגישה בלתי מורשית
            </li>
            <li>
              <strong>עמידה בדרישות חוק:</strong> מילוי חובות משפטיות והתאמה לדרישות
              רגולטוריות
            </li>
          </UL>
        </Section>

        <Section number="4" title="שיתוף מידע עם צדדים שלישיים">
          <P>
            4.1. <strong>אנו לא מוכרים את המידע האישי שלך.</strong> אנו משתפים מידע
            עם צדדים שלישיים רק במקרים הבאים:
          </P>

          <H3>4.2. ספקי שירות (מעבדי מידע)</H3>
          <DataTable
            headers={["ספק", "מטרה", "סוג המידע המשותף", "מיקום שרתים"]}
            rows={[
              [
                "Supabase",
                "אחסון נתונים, אימות משתמשות",
                "כל נתוני החשבון והבריאות",
                'ארה"ב / אירופה (AWS)',
              ],
              [
                "OpenAI",
                "עיבוד שיחות AI",
                "תוכן שיחות עם העוזרת",
                'ארה"ב',
              ],
              [
                "Mixpanel",
                "ניתוח שימוש (אנליטיקס)",
                "אירועי שימוש אנונימיים",
                'ארה"ב',
              ],
              [
                "Apple (HealthKit)",
                "קריאת נתוני בריאות",
                "קריאה מקומית בלבד — הנתונים לא נשלחים ל-Apple",
                "מקומי במכשיר",
              ],
            ]}
          />

          <H3>4.3. מקרים נוספים לשיתוף מידע</H3>
          <UL>
            <li>
              <strong>דרישה חוקית:</strong> כאשר נדרש על פי חוק, צו בית משפט, או
              דרישה של רשות מוסמכת
            </li>
            <li>
              <strong>הגנה על זכויות:</strong> לצורך הגנה על זכויותינו, בטיחותנו או
              רכושנו, או של משתמשות אחרות
            </li>
            <li>
              <strong>עסקאות תאגידיות:</strong> במקרה של מיזוג, רכישה או מכירת נכסים,
              בכפוף להודעה מוקדמת
            </li>
            <li>
              <strong>בהסכמתך:</strong> בכל מקרה אחר, רק לאחר קבלת הסכמתך המפורשת
            </li>
          </UL>
        </Section>

        <Section number="5" title='העברת מידע לחו"ל'>
          <P>
            5.1. חלק מספקי השירות שלנו ממוקמים מחוץ לישראל (בעיקר בארה&quot;ב).
            משמעות הדבר היא שמידע אישי עשוי להיות מועבר, מאוחסן ומעובד מחוץ
            לישראל.
          </P>
          <P>
            5.2. אנו נוקטים אמצעים סבירים להבטחת הגנה נאותה על המידע המועבר, לרבות:
          </P>
          <UL>
            <li>
              התקשרות עם ספקים העומדים בתקני אבטחה מקובלים (SOC 2, ISO 27001)
            </li>
            <li>הסכמי עיבוד נתונים (DPA) עם ספקי שירות</li>
            <li>הצפנת נתונים בהעברה (TLS) ובמנוחה (AES-256)</li>
          </UL>
          <P>5.3. בשימוש באפליקציה, את מסכימה להעברת המידע כאמור.</P>
        </Section>

        <Section number="6" title="אבטחת מידע">
          <P>
            6.1. אנו מיישמים אמצעי אבטחה טכניים וארגוניים לשמירה על המידע שלך,
            לרבות:
          </P>
          <UL>
            <li>
              <strong>הצפנה:</strong> כל התקשורת מוצפנת באמצעות TLS 1.2+. נתונים
              רגישים מוצפנים גם באחסון
            </li>
            <li>
              <strong>אימות:</strong> אימות באמצעות קוד OTP חד-פעמי בהודעת SMS, ללא
              סיסמאות מאוחסנות
            </li>
            <li>
              <strong>אחסון מקומי מאובטח:</strong> טוקני אימות נשמרים ב-Keychain של
              Apple, האחסון המאובטח ביותר במכשיר
            </li>
            <li>
              <strong>בקרת גישה:</strong> גישה מוגבלת למידע על בסיס need-to-know
            </li>
            <li>
              <strong>ניטור:</strong> ניטור שוטף לזיהוי גישה חריגה או בלתי מורשית
            </li>
          </UL>
          <P>
            6.2. למרות מאמצינו, אף מערכת אינה חסינה לחלוטין. איננו יכולים להבטיח
            אבטחה מוחלטת של המידע, ואינך אחראית לפריצות אבטחה שאינן תוצאה של
            רשלנותך.
          </P>
          <P>
            6.3. במקרה של אירוע אבטחה שיש בו כדי לפגוע בפרטיותך, נודיע לך ולרשויות
            הרלוונטיות בהתאם לדרישות החוק.
          </P>
        </Section>

        <Section number="7" title="שמירת מידע ומחיקתו">
          <P>
            7.1. אנו שומרים את המידע שלך כל עוד חשבונך פעיל או כנדרש לצורך מתן
            השירות.
          </P>
          <P>7.2. לאחר מחיקת חשבונך:</P>
          <UL>
            <li>מידע אישי מזהה יימחק תוך 30 ימים</li>
            <li>גיבויים מוצפנים יימחקו תוך 90 ימים</li>
            <li>נתונים אנונימיים ומצטברים עשויים להישמר ללא הגבלת זמן</li>
          </UL>
          <P>
            7.3. אנו עשויים לשמור מידע מסוים לתקופה ארוכה יותר כנדרש על פי חוק,
            לצורך יישוב מחלוקות, או לאכיפת הסכמינו.
          </P>
        </Section>

        <Section number="8" title="הזכויות שלך">
          <P>
            8.1. בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981, עומדות לך הזכויות
            הבאות:
          </P>
          <UL>
            <li>
              <strong>זכות עיון:</strong> את זכאית לעיין במידע האישי שלך המוחזק אצלנו
            </li>
            <li>
              <strong>זכות תיקון:</strong> את זכאית לבקש תיקון מידע שגוי או לא
              מעודכן
            </li>
            <li>
              <strong>זכות מחיקה:</strong> את זכאית לבקש מחיקת המידע שלך ומחיקת
              חשבונך
            </li>
            <li>
              <strong>זכות התנגדות:</strong> את זכאית להתנגד לעיבוד מידע למטרות שיווק
              ישיר
            </li>
            <li>
              <strong>ביטול הסכמה:</strong> את רשאית לבטל הסכמתך לאיסוף מידע בכל עת
              (הדבר עשוי להגביל את יכולתנו לספק את השירות)
            </li>
          </UL>
          <P>
            8.2. למימוש זכויותיך, ניתן לפנות אלינו בכתובת:{" "}
            <a
              href="mailto:privacy@menoapp.health"
              style={{ color: "var(--primary)" }}
            >
              privacy@menoapp.health
            </a>
            . נשיב לפנייתך תוך 30 ימים.
          </P>
          <P>8.3. באפשרותך גם:</P>
          <UL>
            <li>לבטל הרשאות HealthKit דרך הגדרות הטלפון</li>
            <li>למחוק את חשבונך דרך מסך הפרופיל באפליקציה</li>
            <li>
              לפנות לרשות להגנת הפרטיות בכל תלונה:{" "}
              <a
                href="https://www.gov.il/he/departments/the_privacy_protection_authority"
                style={{ color: "var(--primary)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                הרשות להגנת הפרטיות
              </a>
            </li>
          </UL>
        </Section>

        <Section number="9" title="מידע בריאותי רגיש">
          <P>
            9.1. אנו מודעים לכך שחלק מהמידע הנאסף באפליקציה מהווה &ldquo;מידע
            רגיש&rdquo; כהגדרתו בחוק הגנת הפרטיות, ובפרט מידע על מצב בריאותך.
          </P>
          <P>9.2. מידע בריאותי רגיש:</P>
          <UL>
            <li>נאסף רק בהסכמתך המפורשת ולמטרות המוגדרות במדיניות זו</li>
            <li>מאובטח באמצעות אמצעי הגנה מוגברים</li>
            <li>נגיש רק לעובדים ולספקים הזקוקים לו לצורך מתן השירות</li>
            <li>לא נחשף לגורמים שאינם מורשים</li>
          </UL>
          <P>
            9.3. שיחות עם מערכת ה-AI עשויות להכיל מידע בריאותי רגיש שמסרת. שיחות
            אלה:
          </P>
          <UL>
            <li>מועברות ל-OpenAI לצורך עיבוד התגובה</li>
            <li>אנו עושים שימוש ב-API של OpenAI שאינו משמש לאימון מודלים</li>
            <li>נשמרות במערכת שלנו לצורך המשכיות השיחה</li>
            <li>ניתנות למחיקה על ידך בכל עת</li>
          </UL>
          <HighlightBox>
            <strong>שימי לב:</strong> אנו ממליצות שלא לשתף מידע רפואי מזהה (כגון
            מספר ת.ז., שמות רופאים, מספרי מרשם) בשיחות עם מערכת ה-AI.
          </HighlightBox>
        </Section>

        <Section number="10" title="עוגיות וטכנולוגיות מעקב">
          <P>
            10.1. האפליקציה משתמשת בטכנולוגיות ניתוח (Mixpanel) לצורך הבנת דפוסי
            שימוש ושיפור השירות.
          </P>
          <P>10.2. מידע שנאסף באמצעות כלי הניתוח כולל:</P>
          <UL>
            <li>אירועי שימוש (פתיחת מסכים, לחיצות על כפתורים)</li>
            <li>זמני שימוש ותדירות</li>
            <li>מידע טכני על המכשיר</li>
          </UL>
          <P>
            10.3. אנו לא משתמשים בעוגיות מעקב של צד שלישי לצורכי פרסום באפליקציה.
          </P>
          <P>
            10.4. באתר האינטרנט שלנו עשויים לשמש עוגיות לצורכי תפקוד ואנליטיקס.
            פרטים נוספים מופיעים בהודעת העוגיות באתר.
          </P>
        </Section>

        <Section number="11" title="פרטיות קטינות">
          <P>
            11.1. האפליקציה אינה מיועדת לשימוש על ידי קטינות מתחת לגיל 18.
          </P>
          <P>
            11.2. איננו אוספים ביודעין מידע אישי מקטינות. אם נודע לנו כי נאסף מידע
            של קטינה, נמחק אותו בהקדם האפשרי.
          </P>
          <P>
            11.3. אם את הורה או אפוטרופסית וגילית כי ילדתך השתמשה באפליקציה, אנא
            פני אלינו ונסיר את המידע.
          </P>
        </Section>

        <Section number="12" title="שינויים במדיניות">
          <P>
            12.1. אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יובאו
            לידיעתך באמצעות:
          </P>
          <UL>
            <li>הודעה באפליקציה</li>
            <li>הודעת SMS או דוא&quot;ל</li>
            <li>פרסום המדיניות המעודכנת באתר</li>
          </UL>
          <P>
            12.2. תאריך העדכון האחרון יופיע בראש המדיניות. המשך השימוש באפליקציה
            לאחר פרסום שינויים מהווה הסכמה למדיניות המעודכנת.
          </P>
          <P>
            12.3. אם השינויים מהותיים ומשנים את אופן עיבוד מידע רגיש, נבקש את
            הסכמתך המפורשת מחדש.
          </P>
        </Section>

        <Section number="13" title="רישום מאגר מידע">
          <P>
            13.1. בהתאם לחוק הגנת הפרטיות ותקנותיו, מאגר המידע של החברה רשום אצל
            רשם מאגרי המידע, כנדרש.
          </P>
          <P>
            13.2. ממונה הגנת הפרטיות של החברה אחראי לפקח על עמידתנו בדרישות החוק.
            לפניות בנושא פרטיות, ניתן לפנות אלינו ישירות.
          </P>
        </Section>

        <Section
          number="14"
          title="זכויות במסגרת ה-GDPR (לתושבות האיחוד האירופי)"
        >
          <P>
            14.1. ככל שאת תושבת מדינה חברה באיחוד האירופי או באזור הכלכלי האירופי
            (EEA), עומדות לך זכויות נוספות מכוח תקנת הגנת הנתונים הכללית (GDPR):
          </P>
          <UL>
            <li>
              <strong>זכות ניידות:</strong> לקבל עותק של המידע שלך בפורמט מובנה
              וקריא-מכונה
            </li>
            <li>
              <strong>זכות הגבלת עיבוד:</strong> לבקש הגבלה זמנית של עיבוד המידע שלך
            </li>
            <li>
              <strong>זכות להישכח:</strong> לבקש מחיקה מלאה של המידע שלך
            </li>
            <li>
              <strong>זכות להגיש תלונה:</strong> לרשות פיקוח מוסמכת במדינת מגוריך
            </li>
          </UL>
          <P>
            14.2. הבסיס החוקי לעיבוד מידע: הסכמה (עבור מידע רגיש), ביצוע חוזה (עבור
            תפעול השירות), אינטרס לגיטימי (עבור שיפור השירות ואבטחה).
          </P>
        </Section>

        <Section number="15" title="יצירת קשר">
          <P>
            לכל שאלה, בקשה או תלונה בנוגע לפרטיותך או למדיניות זו, ניתן לפנות
            אלינו:
          </P>
          <UL>
            <li>
              דוא&quot;ל לנושאי פרטיות:{" "}
              <a
                href="mailto:privacy@menoapp.health"
                style={{ color: "var(--primary)" }}
              >
                privacy@menoapp.health
              </a>
            </li>
            <li>
              דוא&quot;ל כללי:{" "}
              <a
                href="mailto:support@menoapp.health"
                style={{ color: "var(--primary)" }}
              >
                support@menoapp.health
              </a>
            </li>
            <li>
              אתר:{" "}
              <a href="https://menoapp.health" style={{ color: "var(--primary)" }}>
                menoapp.health
              </a>
            </li>
          </UL>
          <P>אנו מתחייבות לטפל בכל פנייה תוך 30 ימים ממועד קבלתה.</P>
        </Section>

        {/* Footer */}
        <div
          style={{
            marginTop: 60,
            paddingTop: 24,
            borderTop: "2px solid var(--border)",
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: 14,
          }}
        >
          &copy; 2026 Meno Health Ltd. כל הזכויות שמורות.
        </div>
      </div>
    </div>
  );
}

/* ─── Helper components ─── */

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2
        style={{
          fontSize: 22,
          color: "var(--primary)",
          marginTop: 40,
          marginBottom: 16,
          paddingBottom: 8,
          borderBottom: "2px solid var(--border)",
          fontWeight: 600,
        }}
      >
        {number}. {title}
      </h2>
      {children}
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: 18,
        color: "var(--primary-light)",
        marginTop: 24,
        marginBottom: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: 14, fontSize: 16, lineHeight: 1.8 }}>{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ marginBottom: 14, paddingRight: 24, lineHeight: 1.8 }}>{children}</ul>
  );
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--warning-bg)",
        border: "1px solid #FFECB5",
        borderRadius: "var(--radius-lg)",
        padding: "16px 20px",
        margin: "16px 0",
        fontSize: 15,
        lineHeight: 1.7,
      }}
    >
      {children}
    </div>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div style={{ overflowX: "auto", margin: "16px 0 24px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 15,
        }}
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  background: "rgba(92, 61, 110, 0.08)",
                  color: "var(--primary)",
                  fontWeight: 600,
                  padding: "12px 16px",
                  textAlign: "right",
                  borderBottom: "2px solid var(--border)",
                  fontSize: 13,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid var(--border)",
                    verticalAlign: "top",
                    fontSize: 14,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
