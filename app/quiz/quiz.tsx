"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BLEEDING_OPTIONS,
  CATEGORY_LABELS,
  INSIGHTS,
  MASKED_BY_HORMONES,
  RED_FLAGS,
  SEVERITY,
  SYMPTOMS,
  namePattern,
  type BleedingId,
  type Category,
} from "./questions";

type Step = "intro" | "bleeding" | "since" | "flags" | "symptoms" | "impact" | "report";

const SINCE_OPTIONS = [
  { id: "under_12", label: "פחות משנה" },
  { id: "over_12", label: "שנה או יותר" },
  { id: "na", label: "לא רלוונטי / לא זוכרת" },
] as const;

const IMPACT_OPTIONS = [
  { value: 0, label: "כמעט ולא" },
  { value: 1, label: "קצת" },
  { value: 2, label: "משמעותית" },
  { value: 3, label: "מאוד — זה משפיע על היומיום" },
] as const;

const STEPS: Step[] = ["bleeding", "since", "flags", "symptoms", "impact", "report"];

export default function Quiz() {
  const [step, setStep] = useState<Step>("intro");
  const [bleeding, setBleeding] = useState<BleedingId | null>(null);
  const [since, setSince] = useState<string | null>(null);
  const [flags, setFlags] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [impact, setImpact] = useState<number | null>(null);

  const progress =
    step === "intro" ? 0 : Math.round(((STEPS.indexOf(step) + 1) / STEPS.length) * 100);

  const byCategory = useMemo(() => {
    const acc = {} as Record<Category, { score: number; max: number; items: string[] }>;
    for (const s of SYMPTOMS) {
      const v = scores[s.id] ?? 0;
      acc[s.category] ??= { score: 0, max: 0, items: [] };
      acc[s.category].score += v;
      acc[s.category].max += 3;
      if (v >= 2) acc[s.category].items.push(s.q);
    }
    return acc;
  }, [scores]);

  const topCategories = useMemo(
    () =>
      (Object.keys(CATEGORY_LABELS) as Category[])
        .filter((c) => byCategory[c] && byCategory[c].score / byCategory[c].max >= 0.4)
        .sort((a, b) => byCategory[b].score / byCategory[b].max - byCategory[a].score / byCategory[a].max),
    [byCategory]
  );

  const firedInsights = useMemo(
    () =>
      INSIGHTS.filter(
        (ins) => ins.requires.filter((id) => (scores[id] ?? 0) >= 2).length >= ins.minMatches
      ),
    [scores]
  );

  const answered = SYMPTOMS.filter((s) => scores[s.id] !== undefined).length;
  const masked = bleeding !== null && MASKED_BY_HORMONES.includes(bleeding);

  function reset() {
    setStep("intro");
    setBleeding(null);
    setSince(null);
    setFlags([]);
    setScores({});
    setImpact(null);
  }

  return (
    <div className="lp-quiz">
      {step !== "intro" && (
        <div className="lp-quiz-progress" aria-hidden="true">
          <div className="lp-quiz-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {step === "intro" && (
        <section className="lp-quiz-card">
          <h2>מה שאת מרגישה — מסודר לרופאה</h2>
          <p className="lp-quiz-lead">
            שאלון קצר שעוזר לך לארגן את התסמינים שלך לפי קטגוריות, ולראות מה חשוב
            להעלות בביקור הבא. לוקח בערך שלוש דקות.
          </p>
          <div className="lp-quiz-privacy">
            🔒 <strong>התשובות נשארות במכשיר שלך.</strong> אנחנו לא שומרים אותן, לא
            שולחים אותן לשרת ולא מבקשים ממך אימייל.
          </div>
          <p className="lp-quiz-disclaimer">
            השאלון הזה אינו אבחון ואינו מחליף בדיקה רפואית. אין בדיקה אחת — כולל בדיקת
            דם — שקובעת אם את בפרימנופאוזה; האבחנה נשענת על התמונה הקלינית לאורך זמן.
            המטרה כאן היא לארגן את התמונה, לא להכריע אותה.
          </p>
          <button className="lp-btn lp-btn-primary" onClick={() => setStep("bleeding")}>
            להתחיל
          </button>
        </section>
      )}

      {step === "bleeding" && (
        <section className="lp-quiz-card">
          <h2>המחזור שלך</h2>
          <p className="lp-quiz-lead">
            זו השאלה הכי חשובה בשאלון — דפוס הדימום הוא מה שהרופאה מסתכלת עליו קודם.
          </p>
          <fieldset className="lp-quiz-options">
            <legend>יש לך עדיין מחזור או דימום?</legend>
            {BLEEDING_OPTIONS.map((o) => (
              <label key={o.id} className={bleeding === o.id ? "is-selected" : ""}>
                <input
                  type="radio"
                  name="bleeding"
                  checked={bleeding === o.id}
                  onChange={() => setBleeding(o.id)}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </fieldset>
          <Nav
            onNext={() => setStep("since")}
            nextDisabled={!bleeding}
            onBack={() => setStep("intro")}
          />
        </section>
      )}

      {step === "since" && (
        <section className="lp-quiz-card">
          <h2>כמה זמן עבר מהמחזור האחרון?</h2>
          <fieldset className="lp-quiz-options">
            <legend className="lp-visually-hidden">כמה זמן עבר מהמחזור האחרון</legend>
            {SINCE_OPTIONS.map((o) => (
              <label key={o.id} className={since === o.id ? "is-selected" : ""}>
                <input
                  type="radio"
                  name="since"
                  checked={since === o.id}
                  onChange={() => setSince(o.id)}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </fieldset>
          <Nav
            onNext={() => setStep("flags")}
            nextDisabled={!since}
            onBack={() => setStep("bleeding")}
          />
        </section>
      )}

      {step === "flags" && (
        <section className="lp-quiz-card">
          <h2>משהו מאלה קרה לך?</h2>
          <p className="lp-quiz-lead">
            אלה סימנים שדורשים בירור רפואי בפני עצמם — בלי קשר לגיל המעבר. סמני כל מה
            שרלוונטי, או המשיכי אם אף אחד לא.
          </p>
          <fieldset className="lp-quiz-options">
            <legend className="lp-visually-hidden">סימנים שדורשים בירור</legend>
            {RED_FLAGS.map((f) => (
              <label key={f.id} className={flags.includes(f.id) ? "is-selected" : ""}>
                <input
                  type="checkbox"
                  checked={flags.includes(f.id)}
                  onChange={(e) =>
                    setFlags((prev) =>
                      e.target.checked ? [...prev, f.id] : prev.filter((x) => x !== f.id)
                    )
                  }
                />
                <span>{f.label}</span>
              </label>
            ))}
          </fieldset>
          <Nav onNext={() => setStep("symptoms")} onBack={() => setStep("since")} />
        </section>
      )}

      {step === "symptoms" && (
        <section className="lp-quiz-card">
          <h2>התסמינים שלך</h2>
          <p className="lp-quiz-lead">
            עד כמה כל אחד מהם הפריע לך בחודש האחרון? חלק מהתסמינים אינם ייחודיים לגיל
            המעבר — אבל אם הם הופיעו לאחרונה או החמירו, זה מידע חשוב לרופאה.
          </p>

          {SYMPTOMS.map((s) => (
            <div key={s.id} className="lp-quiz-symptom">
              <div className="lp-quiz-symptom-q">{s.q}</div>
              <div className="lp-quiz-scale">
                {SEVERITY.map((sev) => (
                  <label
                    key={sev.value}
                    className={scores[s.id] === sev.value ? "is-selected" : ""}
                  >
                    <input
                      type="radio"
                      name={s.id}
                      checked={scores[s.id] === sev.value}
                      onChange={() => setScores((p) => ({ ...p, [s.id]: sev.value }))}
                    />
                    <span>{sev.label}</span>
                  </label>
                ))}
              </div>
              {s.note && scores[s.id] !== undefined && scores[s.id] > 0 && (
                <p className="lp-quiz-note" role="note">
                  {s.note}
                </p>
              )}
            </div>
          ))}

          <Nav
            onNext={() => setStep("impact")}
            nextDisabled={answered < SYMPTOMS.length}
            nextLabel={
              answered < SYMPTOMS.length
                ? `נותרו ${SYMPTOMS.length - answered} שאלות`
                : "המשך"
            }
            onBack={() => setStep("flags")}
          />
        </section>
      )}

      {step === "impact" && (
        <section className="lp-quiz-card">
          <h2>עד כמה זה משפיע על החיים שלך?</h2>
          <fieldset className="lp-quiz-options">
            <legend className="lp-visually-hidden">השפעה על איכות החיים</legend>
            {IMPACT_OPTIONS.map((o) => (
              <label key={o.value} className={impact === o.value ? "is-selected" : ""}>
                <input
                  type="radio"
                  name="impact"
                  checked={impact === o.value}
                  onChange={() => setImpact(o.value)}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </fieldset>
          <Nav
            onNext={() => setStep("report")}
            nextDisabled={impact === null}
            nextLabel="לצפייה בסיכום"
            onBack={() => setStep("symptoms")}
          />
        </section>
      )}

      {step === "report" && (
        <section className="lp-quiz-card lp-quiz-report">
          <h2>הסיכום שלך</h2>

          <div className="lp-quiz-pattern">
            <span className="lp-quiz-pattern-label">התמונה שלך</span>
            <strong>{namePattern(topCategories)}</strong>
          </div>

          {flags.length > 0 && (
            <div className="lp-quiz-alert" role="alert">
              <strong>כדאי לפנות לרופאה בהקדם — לא לחכות לביקור מתוכנן.</strong>
              <p>סימנת סימנים שמחייבים בירור בפני עצמם:</p>
              <ul>
                {RED_FLAGS.filter((f) => flags.includes(f.id)).map((f) => (
                  <li key={f.id}>{f.label}</li>
                ))}
              </ul>
              <p>
                זה לא אומר שמשהו חמור קורה — זה אומר שצריך לבדוק ולא להסביר את זה מראש
                בגיל המעבר.
              </p>
            </div>
          )}

          {masked && (
            <div className="lp-quiz-caveat" role="note">
              ציינת שאת נוטלת הורמונים או אמצעי מניעה. הם משפיעים על דפוס הדימום, ולכן
              אי אפשר להסיק ממנו על השלב שאת בו. התסמינים למטה עדיין רלוונטיים — אבל
              הפירוש שלהם צריך להיעשות מול הרופאה שרשמה לך את הטיפול.
            </div>
          )}

          {firedInsights.length > 0 && (
            <div className="lp-quiz-insights">
              {firedInsights.map((ins) => (
                <div key={ins.id} className="lp-quiz-insight">
                  <h3>{ins.title}</h3>
                  <p>{ins.body}</p>
                </div>
              ))}
            </div>
          )}

          <h3>התסמינים שלך לפי קטגוריה</h3>
          <div className="lp-quiz-bars">
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => {
              const d = byCategory[c];
              if (!d) return null;
              const pct = Math.round((d.score / d.max) * 100);
              return (
                <div key={c} className="lp-quiz-bar-row">
                  <div className="lp-quiz-bar-label">
                    <span>{CATEGORY_LABELS[c]}</span>
                    <span className="lp-quiz-bar-num">
                      {d.score}/{d.max}
                    </span>
                  </div>
                  <div className="lp-quiz-bar">
                    <div className="lp-quiz-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {impact !== null && impact >= 2 && (
            <p className="lp-quiz-impact">
              ציינת שהתסמינים משפיעים על היומיום שלך באופן משמעותי. זה לא פרט שולי —
              עוצמת ההשפעה על התפקוד היא אחד השיקולים המרכזיים בהחלטה אם ומתי להתחיל
              טיפול, ושווה לומר אותה במפורש ולא רק לתאר תסמינים.
            </p>
          )}

          <ShareBlock pattern={namePattern(topCategories)} />

          <div className="lp-quiz-next">
            <h3>אבל זו נקודה אחת בזמן</h3>
            <p>
              מה שראית עכשיו הוא איך הרגשת <em>היום</em>. וזו בדיוק המגבלה: תסמיני גיל
              המעבר משתנים משבוע לשבוע ולאורך המחזור, ולכן צילום בודד לא אומר אם המצב
              מחמיר, משתפר, או פשוט משתנה סביב משהו שאפשר לזהות.
            </p>
            <p>
              מה שהופך את התמונה הזו למשמעותית הוא <strong>חזרתיות</strong> — אילו
              תסמינים חוזרים, מתי, ומה מחמיר או מקל עליהם. את זה אי אפשר לשחזר מהזיכרון,
              וזה גם מה שמאפשר לרופאה לומר משהו שאי אפשר לומר בביקור בודד.
            </p>
            <p>
              <strong>Meno עושה את זה בדקה ביום</strong> — תיעוד קצר של תסמינים, מחזור,
              שינה ותרופות, שמצטבר לדפוס.
            </p>
            <Link className="lp-btn lp-btn-primary" href="/#download" data-event="cta_download_quiz">
              להתחיל לעקוב
            </Link>
            <p className="lp-quiz-next-hint">
              אחרי כמה שבועות תקבלי את התמונה שהשאלון הזה לא יכול לתת — וסיכום מסודר
              לקראת הביקור הבא.
            </p>
          </div>

          <div className="lp-quiz-actions">
            <button className="lp-quiz-restart" onClick={reset}>
              למלא מחדש
            </button>
          </div>

          <p className="lp-quiz-disclaimer">
            הסיכום הזה הוא ארגון של מה שדיווחת — הוא אינו אבחון, אינו ציון קליני מאומת
            ואינו מחליף בדיקה רפואית.
          </p>
        </section>
      )}
    </div>
  );
}

function ShareBlock({ pattern }: { pattern: string }) {
  const [copied, setCopied] = useState(false);
  const url = "https://menoapp.health/quiz";
  const text = `עשיתי שאלון תסמינים של גיל המעבר והתמונה שיצאה לי: ${pattern}. הוא לא מבקש מייל ולא שומר כלום — אם זה מתאר גם אותך, שווה לך:`;

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "שאלון תסמינים — Meno", text, url });
        return;
      } catch {
        /* dismissed — fall through to copy */
      }
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="lp-quiz-share">
      <h3>את מכירה מישהי שזה מתאר?</h3>
      <p>
        רוב הנשים עוברות את זה בלי לדעת שמה שהן מרגישות קשור — ובלי לדעת מה בכלל
        לשאול. אם השאלון הזה עשה לך סדר, הוא כנראה יעשה סדר גם לחברה.
      </p>
      <div className="lp-quiz-share-actions">
        <a
          className="lp-btn lp-btn-whatsapp"
          href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
          target="_blank"
          rel="noopener"
          data-event="share_quiz_whatsapp"
        >
          שליחה בוואטסאפ
        </a>
        <button className="lp-btn lp-btn-secondary" onClick={share} data-event="share_quiz_other">
          {copied ? "הקישור הועתק ✓" : "שיתוף / העתקת קישור"}
        </button>
      </div>
    </div>
  );
}

function Nav({
  onNext,
  onBack,
  nextDisabled,
  nextLabel = "המשך",
}: {
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="lp-quiz-nav">
      <button className="lp-quiz-back" onClick={onBack}>
        ← חזרה
      </button>
      <button className="lp-btn lp-btn-primary" onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
      </button>
    </div>
  );
}
