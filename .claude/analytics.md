# Analytics — menoapp.health

Property IDs for this project. No secrets here — credentials live in the shared
service account / skill env files.

## Google Analytics 4

- Measurement ID (in `app/layout.tsx`): `G-2FFG3DVB2K`
- Numeric property ID: `properties/535480918`
- GA account: `Yaniv Projects` (378951479) — shared with the `kuptguide`
  property (517980080).
- Read with the `claude-seo:seo-google` skill / GA4 Data API.

## Google Search Console

- Property: `sc-domain:menoapp.health`
- Query with the `gsc-report` skill:
  ```bash
  node ~/.claude/skills/gsc-report/scripts/gsc-query.mjs 28 50 query sc-domain:menoapp.health
  node ~/.claude/skills/gsc-report/scripts/gsc-query.mjs 28 50 page  sc-domain:menoapp.health
  ```

## PostHog

- Project token: `phc_xcCFopv8wTVd79MM7nPNKpZrvsUcTJoePRT8JbCga2Bi` (public,
  client-side by design — not a secret).
- **Region: EU** (`https://eu.i.posthog.com`). Verified against the token:
  `us.i.posthog.com` rejects it with 401. A wrong region fails silently in the
  browser, so do not change this without re-probing `/decide`.
- Wired in `app/posthog.tsx`, mounted from `app/layout.tsx`.

Configured tighter than PostHog's defaults because this is a health site:

| Setting | Value | Why |
| --- | --- | --- |
| `autocapture` | `false` | `/quiz` is a symptom self-assessment; autocapture would ship answer text as element labels |
| `disable_session_recording` | `true` | a replay of the quiz is a recording of health data |
| `person_profiles` | `identified_only` | article readers do not become stored profiles |
| `capture_pageview` | `false` | replaced by a manual `$pageview` on `usePathname` change, since App Router routes do not reload |
| `sanitize_properties` | allowlist | strips any query param that is not `utm_*` |

Runs on the production domain only, same guard as GA4.

`app/analytics-tracker.tsx` sends every `data-event` click to **both** GA4 and
PostHog. They run side by side deliberately: GA4 holds the history, PostHog is
where the funnel is being rebuilt. Do not remove GA4 until PostHog has enough
history to compare against.

## Mixpanel

Not used on the marketing site. The **mobile apps** do use it — see
`manfuza-ios/.claude/mixpanel.md` for the iOS/Android event schema. That means
web and app currently live in two different tools; unifying them is the point of
adding PostHog here.

## Access

Both Google properties must grant the shared service account:

`calude-test-sa@kupotguide.iam.gserviceaccount.com`

- GA4 → Admin → **Account** Access Management → Viewer (account level, so new
  properties are covered automatically).
- Search Console → Settings → Users and permissions → Full.

## Custom events

Fired by `app/analytics-tracker.tsx`, which forwards any click on an element
carrying `data-event` to `gtag`. Params: `link_url`, plus `question_index` on FAQ
and `store` on store links.

**Careful — most `click_app_store_*` events are NOT store clicks.** They are
`href="#download"` anchors that only scroll the page. They measure intent to
scroll, and must never be summed into the download funnel.

| Event | Target | Real store click? |
| --- | --- | --- |
| `store_click` (`store=ios\|android`) | App Store / Google Play | yes — current build |
| `click_app_store_download_section` | App Store | yes — deployed build, being replaced |
| `click_google_play_download_section` | Google Play | yes — deployed build, being replaced |
| `cta_download_header` / `_article` / `_quiz` | `#download` | no — anchor |
| `click_app_store_hero` / `_doctor` / `_mobile_sticky` | `#download` | no — anchor, deployed build |
| `click_advisor_site` | drzehavi.com | outbound, not a store |
| `click_faq_question` | FAQ accordion | `question_index` param |
| `clinic_lead_submit` | clinician lead form | B2B funnel |
| `doctor_referral_visit` | — | page load carrying a Dr. Zehavi `utm_source` |

The rebuilt landing page renames the two real events to a single `store_click`.
`scripts/attribution/report.mjs` counts old and new names together so the series
does not appear to collapse on deploy day.

## Download attribution

The website is a small share of installs, so GA4 alone cannot answer "where do
downloads come from". `scripts/attribution/` holds the full toolkit — every
credential location, what each store API can and cannot report, and a unified
`node scripts/attribution/report.mjs`. Read `scripts/attribution/README.md`
before touching anything download-related.

## Filtering out non-production traffic

The GA snippet loads on every host, so `localhost` and `meno-public.pages.dev`
pollute the numbers. Always filter reports to `hostName == menoapp.health`, or
add an internal-traffic filter in GA4 Admin → Data Streams → Configure tag
settings → Define internal traffic.
