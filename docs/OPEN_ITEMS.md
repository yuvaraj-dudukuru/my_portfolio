# Open Items

Everything waiting on a decision or a value from the site owner, plus every
default chosen on their behalf under the Q5–Q12 delegation.

**Last updated:** 2026-09-17 · **Phase:** 1 complete

Run `npm run check:legal` at any time to print the placeholders still
outstanding. It also runs as the last step of `npm run build`, and **fails the
build** if a raw `{{TOKEN}}` or a personal email address ever reaches a
generated HTML file.

---

## 1. Values still required (15)

All of these live in `src/config/legal.js`. Each renders on the live site as a
visible, screen-reader-announced marker — `[ registered address — to be
confirmed ]` — never as raw braces, and never as a guess.

| Token | Config path | Used on | Notes |
|---|---|---|---|
| `{{LEGAL_ENTITY_NAME}}` | `entity.legalName` | Privacy, Terms, Refund, footer, /contact | Full registered name of Lumora Space. Your example was *"Lumora Space Private Limited"* — **not** used, because it was an example, not a confirmation. |
| `{{ENTITY_TYPE}}` | `entity.type` | Privacy, Terms, /contact | Pvt Ltd / LLP / Partnership. |
| `{{ENTITY_REG_NO}}` | `entity.registrationNumber` | Privacy, Terms, footer, /contact | CIN if Pvt Ltd, LLPIN if LLP. |
| `{{REGISTERED_ADDRESS}}` | `entity.registeredAddress` | Privacy, Terms, Refund, footer, /contact | Registered office as filed with the MCA. |
| `{{GSTIN}}` | `gst.gstin` | Terms, footer, /contact | Registration itself is confirmed; the number is not. |
| `{{BUSINESS_EMAIL}}` | `contact.businessEmail` | Everywhere an address appears | **Until this is set, every email affordance on the site is a link to `/contact` instead.** Nothing is broken by leaving it — see §3. |
| `{{GRIEVANCE_OFFICER_NAME}}` | `grievanceOfficer.name` | Privacy, Terms, Refund, footer, /contact | Required by DPDP s.13. |
| `{{GRIEVANCE_EMAIL}}` | `grievanceOfficer.email` | Privacy, Terms, Refund, footer, /contact | Should be a role address, not a personal one. |
| `{{GRIEVANCE_ACK_DAYS}}` | `grievanceOfficer.acknowledgeDays` | Privacy, Refund | **Recommended: 2 working days.** |
| `{{GRIEVANCE_RESOLVE_DAYS}}` | `grievanceOfficer.resolveDays` | Privacy | **Recommended: 30 days.** |
| `{{RIGHTS_RESPONSE_DAYS}}` | `rightsResponseDays` | Privacy | **Recommended: 30 days.** |
| `{{JURISDICTION_CITY}}` | `jurisdiction.city` | Terms, Refund | **Recommended: Hyderabad** — but this must follow the entity's *registered office*, not where you live, so it is not pre-filled. |
| `{{REFUND_WINDOW_DAYS}}` | `refund.windowDays` | Refund policy (×3) | **Recommended: 7 days.** See §2.1. |
| `{{REFUND_PROCESSING_DAYS}}` | `refund.processingDays` | Refund policy | **Recommended: 7 working days.** |
| `{{CONTACT_RETENTION_MONTHS}}` | `privacy.contactRetentionMonths` | Privacy policy | **Recommended: 24 months.** |

### Also undecided, but not a token

| Item | Config path | Blocking |
|---|---|---|
| **Are ₹4,999 / ₹5,499 / ₹6,999 inclusive or exclusive of GST?** | `gst.pricesIncludeGst` (currently `null`) | **Phase 3 cannot start on pricing without this.** If exclusive, also set `gst.ratePercent` and the GST-inclusive total becomes the primary displayed price, per your instruction. |

---

## 2. Defaults chosen on your behalf (Q5–Q12)

You delegated these. Each is implemented as described; none of them invents a
number — where a number was needed it stayed a token, listed above.

### 2.1 Q5 — Refund policy structure

Written as: full refund more than `{{REFUND_WINDOW_DAYS}}` days before a course
starts; discretionary inside that window with rescheduling offered instead;
after the start, pro-rata on undelivered sessions; **full refund whenever we
cancel or reschedule**, at any point; mentoring refundable per unused session;
non-refundable only for delivered sessions past the halfway point, removal for
a serious conduct breach, and third-party costs you chose to incur. Refunds
return to the original payment method. One free deferral to a later cohort at
the price already paid.

> **If you disagree with any of this, it is prose in
> `src/pages/legal/RefundPolicy.jsx` — say what should change.**

### 2.2 Q6 — EmailJS auto-reply

You did not answer whether an auto-reply template is enabled in the EmailJS
dashboard. The privacy policy currently **does not** claim the site emails
visitors. **Action: check the dashboard.** If an auto-reply is on, tell me and I
will add one sentence to §what-we-collect.

### 2.3 Q7 — Cookie banner (your explicit decision)

Dormant. `src/config/cookies.js` exports `requiresConsentBanner`, computed from
the register itself: it is `false` while every entry is `necessary` or
`preferences`, and flips to `true` automatically the first time an `analytics`
or `marketing` entry is added. `/cookies` is live now and the **Cookie
Settings** footer link exists on every route.

### 2.4 Q8 — Divider contrast

**Left as-is.** `--line-alpha` stays 0.26 (dark) / 0.18 (light). These are
decorative rules, exempt from WCAG 1.4.11, and raising them changes the look of
every divider on the site. To revisit: 0.34 and 0.42 respectively give a clean
3:1.

### 2.5 Q9 — Route focus target

**Kept on `<main>`.** Moving focus to the `<h1>` would skip past the page header
for keyboard users. The route announcement bug (A-3) is a separate Phase 4 fix.

### 2.6 Q10 — Image ownership

Assumed yours, pending confirmation — see §4.

### 2.7 Q11 — `legacy/` SCSS provenance

Unanswered. `legacy/LICENSE` still MIT-licenses that directory in your name. If
any of it came from a purchased or free HTML template, that grant is not yours
to give. **Action: confirm, or narrow the LICENSE to exclude `legacy/assets/`.**

### 2.8 Q12 — GitHub Pages workflow

**Recommendation: delete `.github/workflows/deploy.yml`.** Vercel serves the
live domain; the workflow publishes a second, divergent copy to GitHub Pages on
every push to `main`. Not done yet — deleting a deploy pipeline is your call,
not a default I should take. Scheduled for Phase 6 on your word.

---

## 3. Known exposure still live

### 3.1 `public/resume.pdf` publishes a personal Gmail — **found during Phase 1**

The audit flagged this file as unchecked. It is now checked, and it contains a
personal `@gmail.com` address (a *different* one from the address that was in
the HTML). The file is linked from the footer, `/about` and the home page, and
is directly downloadable.

The HTML exposure is fixed; **this one is not**, because rewriting your résumé
is not my call. `npm run check:legal` now prints a warning about it on every
build so it cannot be forgotten.

**Options:** replace the PDF with one carrying the business address; remove the
address from the résumé entirely and point at `/contact`; or accept it as a
deliberate professional disclosure. Your call.

### 3.2 Unknown-provenance images still in the repo

Deleted as instructed: the four fontsfree.net *"Historia Demo"* font files and
`legacy/assets/img/download.jfif`.

**Not deleted**, because your instruction named the `.jfif` files and the fonts
specifically and these are PNGs:

- `legacy/assets/img/download (1).png`
- `legacy/assets/img/images.png`

Both have browser-default save names, strongly suggesting saved search-result
images of unknown licence. Neither is deployed, both are in the public repo.
**Say the word and they go.**

You said you would purge git history separately — worth doing, since the
deleted files remain in history until you do.

---

## 4. Confirmations needed (no code impact)

| # | Item |
|---|---|
| C-1 | You own `public/images/profile.jpg` and the three project screenshots. |
| C-2 | The real issuer of the **"Python & Data Science"** credential — `src/data/profile.js` currently lists the issuer as the word `"Certified"`, which is not an issuing body. Flagged for a Phase 3 config flag either way. |
| C-3 | Evidence for **"100+ Students taught"** and **"5+ Systems shipped"** — Phase 3 hides both behind a default-off flag, as you instructed. |
| C-4 | Evidence for the **"Most popular"** course badge — same treatment in Phase 3. |

---

## 5. Deferred to later phases (tracked, not forgotten)

| Item | Phase | Note |
|---|---|---|
| Footer **Data Request** link | 5 | Deliberately omitted for now — `/data-request` does not exist yet and linking to a 404 is worse than waiting. The privacy policy currently routes rights requests to `/contact`. |
| **Cookie Settings** opens a preference panel | 2 | Today the footer link goes to `/cookies#your-choices`. It becomes a button when there is something to toggle. |
| Terms §fees promises that *"the tax treatment of a fee is stated alongside the price"* | 3 | **Phase 3 must make this true.** It is currently a forward commitment written against work not yet done. |
| GST-inclusive price display | 3 | Blocked on `gst.pricesIncludeGst`. |
| `docs/CLAIMS_REVIEW.md` | 3 | Created alongside the claim flags. Content already drafted in `docs/AUDIT.md` §7. |
| `docs/LICENSES.md` | 6 | |
| Accessibility fixes A-1 … A-7 | 4 | |
| Prerender + `hydrateRoot` | 6 | Approved (Q13). |
| Self-hosted fonts | 6 | Removes the last third-party request. The privacy policy already describes this as in progress — Phase 6 must finish it or the sentence needs changing. |

---

## 6. Legal review

**Every page under `/privacy`, `/terms`, `/refund-policy` and `/cookies` is a
draft and has not been reviewed by a lawyer.** They carry a "Draft — pending
legal review" banner in development builds, which does not ship to production.

Before these are relied on commercially, have an Indian lawyer review them
against the DPDP Act 2023 and its Rules, the Consumer Protection (E-Commerce)
Rules 2020, and the CCPA Dark Patterns Guidelines 2023 — particularly the
limitation-of-liability clause in the Terms and the non-refundable cases in the
Refund Policy, which are the two places a consumer forum would look first.
