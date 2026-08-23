/**
 * Symptom items for the Hebrew self-assessment.
 *
 * IMPORTANT — licensing: these items are written for Meno and are NOT a
 * translation of the Greene Climacteric Scale or the Menopause Rating Scale.
 * Both are published instruments that require permission (My Menopause Centre
 * states its GCS use is "reproduced with permission"). If we ever want to claim
 * a validated score, we license one of them properly. Until then this is an
 * organiser, not a validated scale — the copy must never imply otherwise.
 *
 * Every item and every red flag needs Dr. Zehavi's sign-off before launch.
 */

export type Category = "vasomotor" | "sleep" | "mood" | "cognitive" | "physical" | "urogenital";

export const CATEGORY_LABELS: Record<Category, string> = {
  vasomotor: "ויסות חום",
  sleep: "שינה",
  mood: "מצב רוח",
  cognitive: "ריכוז וזיכרון",
  physical: "גופני",
  urogenital: "אורוגניטלי",
};

export type SymptomItem = {
  id: string;
  q: string;
  category: Category;
  /** Shown under the question — safety-netting, always paired with the symptom. */
  note?: string;
};

export const AGE_OPTIONS = [
  { id: "under_40", label: "מתחת ל-40" },
  { id: "40_44", label: "40–44" },
  { id: "45_49", label: "45–49" },
  { id: "50_54", label: "50–54" },
  { id: "55_plus", label: "55 ומעלה" },
  { id: "skip", label: "מעדיפה לא לענות" },
] as const;

export type AgeId = (typeof AGE_OPTIONS)[number]["id"];

export const SEVERITY = [
  { value: 0, label: "בכלל לא" },
  { value: 1, label: "קצת" },
  { value: 2, label: "בינוני" },
  { value: 3, label: "חזק" },
] as const;

export const SYMPTOMS: SymptomItem[] = [
  { id: "hot_flashes", q: "גלי חום", category: "vasomotor" },
  { id: "night_sweats", q: "הזעות לילה", category: "vasomotor" },
  { id: "sleep", q: "קושי להירדם או יקיצות בלילה", category: "sleep" },
  { id: "fatigue", q: "עייפות שלא משתפרת אחרי מנוחה", category: "sleep" },
  {
    id: "low_mood",
    q: "דכדוך, עצב או תחושת ריקנות",
    category: "mood",
    note: "אם התחושה מלווה במחשבות על פגיעה עצמית — אל תחכי לביקור מתוכנן. פני לרופא/ה.",
  },
  { id: "irritability", q: "עצבנות, חוסר סבלנות או התפרצויות", category: "mood" },
  {
    id: "anxiety",
    q: "חרדה או התקפי חרדה",
    category: "mood",
    note: "אם החרדה מפריעה לתפקוד היומיומי — כדאי להתייעץ עם רופא/ה גם ללא קשר לגיל המעבר.",
  },
  { id: "brain_fog", q: "ערפול מוחי — קושי בריכוז, שכחה או קושי במציאת מילים", category: "cognitive" },
  { id: "concentration", q: "קושי להתמיד במשימה או לעקוב אחרי שיחה", category: "cognitive" },
  { id: "joints", q: "כאבי מפרקים או שרירים", category: "physical" },
  { id: "weight", q: "עלייה במשקל או שינוי בצורת הגוף", category: "physical" },
  {
    id: "headaches",
    q: "כאבי ראש",
    category: "physical",
    note: "כאב ראש חד ופתאומי, או כזה שמלווה בחום, בהקאות או בנוקשות בצוואר — פני לבדיקה דחופה.",
  },
  {
    id: "palpitations",
    q: "דפיקות לב מהירות או חזקות",
    category: "physical",
    note: "אם מלווה בכאב בחזה, בקוצר נשימה או בסחרחורת — פני לבדיקה דחופה.",
  },
  { id: "vaginal_dryness", q: "יובש בנרתיק או אי-נוחות ביחסים", category: "urogenital" },
  { id: "bladder", q: "דליפת שתן או דחיפות במתן שתן", category: "urogenital" },
  { id: "libido", q: "ירידה בחשק המיני", category: "urogenital" },
];

/** The bleeding question — the clinically important branch. */
export const BLEEDING_OPTIONS = [
  { id: "regular", label: "כן — המחזור סדיר, כמו שתמיד היה" },
  { id: "irregular", label: "כן — אבל המחזור השתנה או נעשה לא סדיר" },
  { id: "hormonal_bleed", label: "כן — אני נוטלת הורמונים או אמצעי מניעה שגורמים לדימום סדיר" },
  { id: "stopped", label: "לא — המחזור פשוט הפסיק" },
  { id: "hormonal_stop", label: "לא — אני נוטלת הורמונים או אמצעי מניעה שהפסיקו את הדימום" },
  { id: "hysterectomy", label: "לא — עברתי כריתת רחם או צריבת רירית הרחם" },
  { id: "ovaries", label: "לא — הוסרו לי השחלות" },
  { id: "cancer", label: "לא — המחזור הפסיק בעקבות טיפול אונקולוגי" },
] as const;

export type BleedingId = (typeof BLEEDING_OPTIONS)[number]["id"];

/** Answers that mean the symptom score cannot be read as a menopause signal. */
export const MASKED_BY_HORMONES: BleedingId[] = ["hormonal_bleed", "hormonal_stop"];

/**
 * Red flags. These bypass the score entirely — if any is checked the report
 * leads with "see a clinician", regardless of how mild everything else is.
 */
export const RED_FLAGS = [
  { id: "postmenopausal_bleed", label: "דימום כלשהו אחרי שנה או יותר ללא מחזור" },
  { id: "heavy_bleed", label: "דימום חזק במיוחד — הספגת פד או טמפון בתוך שעה" },
  { id: "post_coital", label: "דימום אחרי יחסי מין" },
  { id: "intermenstrual", label: "דימום בין וסתות" },
  { id: "unexplained_weight", label: "ירידה במשקל שלא הוסברה" },
];

/**
 * Pattern insights — the "these are connected" reveal.
 *
 * This is the part women recognise themselves in, and the reason the summary is
 * worth sending to someone else. Every rule below is a mainstream clinical
 * association, not a diagnosis: the copy always says "often" / "worth raising",
 * never "you have". Needs Dr. Zehavi's sign-off like everything else here.
 */
export type Insight = {
  id: string;
  title: string;
  body: string;
  /** Fires when every listed symptom scored >= 2. */
  requires: string[];
  /** ...and at least this many of them. */
  minMatches: number;
};

export const INSIGHTS: Insight[] = [
  {
    id: "gsm",
    title: "שלושה תסמינים שנראים נפרדים — והם כנראה אחד",
    body:
      "יובש, אי-נוחות ביחסים ותסמינים בדרכי השתן נובעים לרוב מאותו שינוי ברקמה, ויש להם שם: התסמונת הגניטו-אורינרית של גיל המעבר. נשים רבות מטופלות בשלושה מקומות שונים ואף אחד לא מחבר. שווה להעלות אותם יחד, במשפט אחד, בביקור הבא — ובניגוד לגלי חום, זה לא נוטה לעבור מעצמו.",
    requires: ["vaginal_dryness", "bladder", "libido"],
    minMatches: 2,
  },
  {
    id: "vasomotor_cascade",
    title: "ייתכן שהמצב רוח והערפול הם במורד הזרם",
    body:
      "הזעות לילה קוטעות שינה, ושינה קטועה מייצרת בעצמה עצבנות, קושי בריכוז ותחושת ערפול. כשכל אלה מופיעים יחד, לא תמיד מדובר בשלוש בעיות נפרדות — לפעמים טיפול בגלי החום מזיז את כולן. זו שאלה ששווה לשאול את הרופאה במפורש.",
    requires: ["night_sweats", "sleep", "mood", "brain_fog"],
    minMatches: 3,
  },
  {
    id: "joints",
    title: "כאבי המפרקים קשורים לזה יותר משנהוג לחשוב",
    body:
      "כאבי מפרקים ושרירים הם מהתסמינים הכי פחות מזוהים של גיל המעבר, והרבה נשים מייחסות אותם לגיל או לספורט. אם הם הופיעו או החמירו יחד עם שאר התסמינים — זה מידע ששווה לומר לרופאה, כי הוא משנה את התמונה.",
    requires: ["joints"],
    minMatches: 1,
  },
];

/** Names the overall picture instead of just scoring it. */
export function namePattern(top: Category[]): string {
  if (top.length === 0) return "תסמינים קלים בלבד";
  const labels = top.slice(0, 2).map((c) => CATEGORY_LABELS[c]);
  return labels.join(" + ");
}
