# Download attribution — keys, capabilities, and the report

Everything needed to answer "where did today's download come from" lives in this
folder. `lib.mjs` is the only file that knows where credentials are; the rest
read from it.

```bash
node report.mjs 30      # the whole picture, all sources
node apple.mjs status   # what the App Store Connect key can do right now
node play.mjs status    # whether Play reporting is wired up
node aso.mjs            # where Meno ranks in Israeli App Store search (~1 min)
```

## Identity

| Thing | Value |
| --- | --- |
| App Store app ID | `6759288559` |
| iOS bundle ID | `com.herahealth.app` |
| Android package | `health.menoapp.android` |
| GA4 property | `properties/535480918` (`G-2FFG3DVB2K`) |
| Search Console | `sc-domain:menoapp.health` |
| iOS repo | `~/Documents/workspace/manfuza-ios` (Android under `meno-android/`) |

## Credentials

| Key | Location | Unlocks | State |
| --- | --- | --- | --- |
| Google service account | `~/Documents/workspace/kupotisrael-agents/secrets/gsc-service-account.json` | GSC + GA4 | working |
| ASC key `2JSB283ATJ` ("Meno Analytics", Admin) | `~/.appstoreconnect/private_keys/AuthKey_2JSB283ATJ.p8` + `issuer_id.txt` | App Analytics reports | working |
| ASC key `R5F372BA7R` ("Meno CLI Upload", App Manager) | same folder | build upload + metadata, via `manfuza-ios/scripts/asc.py` | working |
| Play reports service account | `~/.config/meno/play-service-account.json` | Play install + acquisition CSVs | **not created** |

The Google service account is `calude-test-sa@kupotguide.iam.gserviceaccount.com`.
It is shared with kupotguide — add it as a Viewer on any new GA4 property and as
a Full user on any new Search Console property and these scripts just work.

Two App Store Connect keys, on purpose. `R5F372BA7R` ("Meno CLI Upload",
App Manager) belongs to `manfuza-ios/scripts/asc.py` and only uploads builds and
edits metadata — App Manager is the right ceiling for it and it should stay
there. Analytics reports need Admin, and Apple cannot widen a key after creation
("can't be modified to access more services once created"), so reporting gets
its own Admin key, referenced only by `CONFIG.appleKeyId` here.

## What each source can and cannot tell you

**GA4 + Search Console** measure the website only, and the website is a small
channel. Their honest job in this report is to establish a *ceiling*: the number
of store clicks the site produced is the most downloads it could possibly have
caused. Everything above that ceiling came from somewhere else.

**App Store Connect** splits iOS downloads by Source Type — App Store Search,
App Store Browse, App Referrer, Web Referrer, Institutional Purchase. The report
is `COMMERCE / App Downloads Detailed`, which also carries Campaign and Page
Type columns. `node apple.mjs reports` lists all 156 reports on offer.

The ONGOING request was created on 2026-08-22 (id
`59310926-e549-4137-a036-b7a2cb4a3905`). Apple does **not** backfill, so nothing
before that date will ever exist, and the first daily instance appears within
~48h. Until then `apple.mjs sources` correctly reports "no instances yet".

**Google Play access comes in two separate tracks**, and it is easy to assume
one implies the other. Reading reports needs only a Play Console user invite
with the account-level "View app information and download bulk reports" — no
Google Cloud setup at all. *Writing* the store listing is a different system
entirely: the `androidpublisher` API, which requires a linked Google Cloud
project and the app-level "Manage store presence" permission — a write
permission on the live listing. Read access does not grant any of that.

Note also that Play has **no keywords field**. It indexes the app name, the
short description, and the full description — nothing else. That is why the full
description here runs long while the App Store one stays short: Apple has a
dedicated 100-character keyword field and does not index its description at all.

**Google Play** exports install and store-performance CSVs to a GCS bucket, but
the actual search terms people typed exist only in the Console UI, under
Grow → Store presence → Store listing acquisition → Google Play search. That one
page has to be read by hand. It is also the single most useful page in either
store, because it names the Hebrew keywords driving installs.

**Nothing** can see a woman who was told about the app by her doctor and then
searched the store for it. She is indistinguishable from organic store search.
Only an in-app "how did you hear about us?" separates the two, and with a B2B2C
model built on gynecologist referrals, that is the number worth the most.

## Apple ignores utm_*

`app/shared.ts` used to append `utm_source`/`utm_medium`/`utm_campaign` to the
App Store link. Apple has never read those params — they were inert. Real
web→App Store campaign attribution uses `pt` (provider token) + `ct` (campaign
text), and `ct` alone does nothing without `pt`.

To turn it on: App Store Connect → Analytics → Campaigns → create a campaign,
copy the `pt` value out of the generated link, and paste it into
`APPLE_PROVIDER_TOKEN` in `app/shared.ts`. Until then the App Store link stays
clean and Apple still classifies the traffic as Web Referrer / menoapp.health.

Google Play does read campaign data, but as a single `referrer` param holding a
URL-encoded utm string — not as loose utm_* params. `playStoreLink()` builds it
correctly.

## Event-name change

The rebuilt landing page emits `store_click` with a `store: ios|android` param.
The currently deployed build emits `click_app_store_download_section` /
`click_google_play_download_section`. `report.mjs` counts both, so the series
does not appear to collapse on the day the new build ships.

Note that the other `click_app_store_*` events are `#download` anchors that only
scroll the page. They measure intent, not store clicks, and must never be summed
into the download funnel.
