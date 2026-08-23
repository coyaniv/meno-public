"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { analyticsEnabled } from "../analytics-enabled";

/**
 * The site is a static export, so there is no API route to post to. Set this to
 * a form endpoint (Formspree, Web3Forms, a Cloudflare Pages Function, …) and the
 * form submits over fetch. Leave it empty and the form falls back to opening the
 * user's mail client with everything pre-filled — no lead is silently lost.
 */
const ENDPOINT = "/api/clinic-lead";
const FALLBACK_EMAIL = "clinics@menoapp.health";

const ROLES = [
  "רופאת/רופא נשים",
  "רופאת/רופא משפחה",
  "מרפאת גיל המעבר",
  "אחות",
  "אחר",
];

const VOLUMES = [
  "פחות מ-10 מטופלות בחודש",
  "10–30",
  "30–100",
  "יותר מ-100",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — bots fill hidden fields, humans don't.
    if (data.website) return;
    delete data.website;

    if (!ENDPOINT) {
      const body = Object.entries(data)
        .filter(([, v]) => v)
        .map(([k, v]) => `${LABELS[k] ?? k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
        "Meno — פנייה ממרפאה"
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      if (analyticsEnabled()) {
        window.gtag?.("event", "clinic_lead_submit");
        posthog.capture("clinic_lead_submit");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="lp-lead-done" role="status">
        <h3>תודה — הפנייה נקלטה</h3>
        <p>
          נחזור אלייך בימים הקרובים. אם זה דחוף, אפשר גם ישירות במייל:{" "}
          <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>
        </p>
      </div>
    );
  }

  return (
    <form className="lp-lead-form" onSubmit={onSubmit} noValidate={false}>
      <h3>רוצה לעבוד עם Meno?</h3>
      <p className="lp-lead-intro">
        השאירי פרטים ונחזור אלייך עם גישה לממשק ה-web לרופאה ועם קישור ייעודי
        שתוכלי לשלוח למטופלות.
      </p>

      <div className="lp-lead-grid">
        <label>
          <span>שם מלא *</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>

        <label>
          <span>מרפאה או מקום עבודה</span>
          <input name="clinic" type="text" autoComplete="organization" />
        </label>

        <label>
          <span>תפקיד *</span>
          <select name="role" required defaultValue="">
            <option value="" disabled>
              בחרי תפקיד
            </option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>כמה מטופלות בגיל המעבר את רואה?</span>
          <select name="volume" defaultValue="">
            <option value="">מעדיפה לא לציין</option>
            {VOLUMES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>אימייל *</span>
          <input name="email" type="email" required autoComplete="email" dir="ltr" />
        </label>

        <label>
          <span>טלפון</span>
          <input name="phone" type="tel" autoComplete="tel" dir="ltr" />
        </label>
      </div>

      <label className="lp-lead-full">
        <span>משהו שכדאי שנדע?</span>
        <textarea name="message" rows={3} />
      </label>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="lp-lead-hp"
      />

      <button
        className="lp-btn lp-btn-primary"
        type="submit"
        disabled={status === "sending"}
        data-event="clinic_lead_submit"
      >
        {status === "sending" ? "שולח…" : "שליחת פרטים"}
      </button>

      {status === "error" && (
        <p className="lp-lead-error" role="alert">
          משהו השתבש בשליחה. אפשר לנסות שוב, או לכתוב לנו ישירות ל־
          <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
        </p>
      )}

      <p className="lp-lead-note">
        הפרטים משמשים ליצירת קשר בלבד. אנחנו לא מעבירים אותם לצד שלישי, ואין להם
        שום קשר לנתוני המטופלות שלך.
      </p>
    </form>
  );
}

const LABELS: Record<string, string> = {
  name: "שם",
  clinic: "מרפאה",
  role: "תפקיד",
  volume: "היקף מטופלות",
  email: "אימייל",
  phone: "טלפון",
  message: "הערות",
};
