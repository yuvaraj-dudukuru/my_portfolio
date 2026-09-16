# Open Items

Everything waiting on a decision or a value from the site owner, plus every
default chosen on their behalf under the Q5–Q12 delegation.

**Last updated:** 2026-09-17 · **Phase:** 1 complete, review changes applied

> **The Phase 1 review supplied no values.** Every item in the review's
> "Confirmed values" list arrived still bracketed — `[e.g. Lumora Space Private
> Limited]`, `[Private Limited / LLP]`, `[value]`, `[YES … | NO …]`, `[N]`. Per
> the instruction to "leave any still-bracketed item as `{{TOKEN}}`",
> `src/config/legal.js` is unchanged and all 15 placeholders below are still
> outstanding.

Run `npm run check:legal` at any time to print what is outstanding. It also runs
as the last step of `npm run build`, with two levels of enforcement:

| Condition | Local build | Production build |
|---|---|---|
| A raw `{{TOKEN}}` or a personal email/phone reaches a generated HTML file | **FAIL** | **FAIL** |
| One of the 7 deployment-critical values is unset (§1, marked 🚩) | warn | **FAIL** |
| Any other placeholder unset | warn | warn |
| `dist/resume.pdf` contains a personal address | warn | warn |

"Production" means `CI`, `VERCEL`, `NODE_ENV=production`, or `--strict`. Test
the failing path locally with `node scripts/check-placeholders.mjs --strict`.

---

## 1. Values still required (15)

All of these live in `src/config/legal.js`. Each renders on the live site as a
visible, screen-reader-announced marker — `[ registered address — to be
confirmed ]` — never as raw braces, and never as a guess.

| Token | Config path | Used on | Notes |
|---|---|---|---|
| 🚩 `{{LEGAL_ENTITY_NAME}}` | `entity.legalName` | Privacy, Terms, Refund, footer, /contact | Full registered name of Lumora Space. Your example was *"Lumora Space Private Limited"* — **not** used, because it was an example, not a confirmation. |
| `{{ENTITY_TYPE}}` | `entity.type` | Privacy, Terms, /contact | Pvt Ltd / LLP / Partnership. |
| 🚩 `{{ENTITY_REG_NO}}` | `entity.registrationNumber` | Privacy, Terms, footer, /contact | CIN if Pvt Ltd, LLPIN if LLP. |
| 🚩 `{{REGISTERED_ADDRESS}}` | `entity.registeredAddress` | Privacy, Terms, Refund, footer, /contact | Registered office as filed with the MCA. |
| 🚩 `{{GSTIN}}` | `gst.gstin` | Terms, footer, /contact | Registration itself is confirmed; the number is not. |
| 🚩 `{{BUSINESS_EMAIL}}` | `contact.businessEmail` | Everywhere an address appears | **Until this is set, every email affordance on the site is a link to `/contact` instead.** Nothing is broken by leaving it — see §3. |
| 🚩 `{{GRIEVANCE_OFFICER_NAME}}` | `grievanceOfficer.name` | Privacy, Terms, Refund, footer, /contact | Required by DPDP s.13. |
| 🚩 `{{GRIEVANCE_EMAIL}}` | `grievanceOfficer.email` | Privacy, Terms, Refund, footer, /contact | Should be a role address, not a personal one. |
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

### 3.1 OWNER ACTION — `public/resume.pdf` publishes a personal Gmail

**Owner is replacing this file** with a version containing no personal email
address. Until that lands, `npm run check:legal` prints a warning on every build.

The file is linked from the footer, `/about` and the home page, and is directly
downloadable. It contains a personal `@gmail.com` address — a *different* one
from the address that used to be in the HTML. The HTML exposure is fixed; this
one is not, and it is not mine to fix.

When the replacement is dropped in, run `npm run check:legal` — the warning
disappears on its own, no code change needed.

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

---

## 7. Environment changes made during this work (restore these afterwards)

Exactly what was changed, so it can be put back.

### 7.1 `auto-commit.sh` disabled

```
.claude/helpers/auto-commit.sh  →  .claude/helpers/auto-commit.sh.disabled
```

Restore with:

```bash
git mv .claude/helpers/auto-commit.sh.disabled .claude/helpers/auto-commit.sh
```

Nothing else was touched — no hook entry was removed, because **there was never
one to remove.** See §7.2.

### 7.2 What actually created the junk commits — correction

An earlier report attributed commit `a2835c1 ("001")` to `auto-commit.sh`. That
was an inference from the helper's existence, not evidence, and it was wrong:

- Nothing in `.claude/settings.json` invokes `auto-commit.sh`. Every hook there
  routes to `hook-handler.cjs` or `auto-memory-hook.mjs`.
- `hook-handler.cjs` contains **zero** references to git.
- `"001"` matches none of the helper message formats (`auto-commit.sh` uses
  `"$COMMIT_PREFIX: Auto-commit from Claude Code"`; the checkpoint hooks use
  `"🔖 Checkpoint: …"`).

Renaming the helper is a harmless precaution and was done as instructed, but
**it is probably not the source, and the real source is still unidentified.**
Watch for another commit appearing that neither of us made.

What *is* confirmed: **empty files with names derived from shell fragments keep
appearing in the repo root** — `category.id`, `entry.category`, `footer`, `{,`,
`HTTP`, `ids.indexOf(id)`, `$(git`, `" !m.noindex)"`. Two of them reached a
commit because `git add -A` swept them up. All staging is now done with explicit
paths, never `-A`. If you see more of these, delete them; they are artifacts,
not project files.

---

## 8. Git history purge — commands for you to run at the end

**Do not run these until every phase is finished and reviewed.** They rewrite
history and require a force-push, which is yours to do, not mine.

Requires [`git-filter-repo`](https://github.com/newren/git-filter-repo)
(`pip install git-filter-repo`). Work on a **fresh clone**, which is what
filter-repo expects:

```bash
git clone --no-local <repo-url> portfolio-purge
cd portfolio-purge
```

### 8.1 Remove the files

```bash
git filter-repo --invert-paths \
  --path 'assets/fonts/fontsfree-net-thehistoriademo-webfont.woff' \
  --path 'assets/fonts/fontsfree-net-thehistoriademo-webfont.woff2' \
  --path 'legacy/assets/fonts/fontsfree-net-thehistoriademo-webfont.woff' \
  --path 'legacy/assets/fonts/fontsfree-net-thehistoriademo-webfont.woff2' \
  --path 'legacy/assets/img/download.jfif' \
  --path ' !m.noindex)' \
  --path 'HTTP' \
  --path 'ids.indexOf(id)' \
  --path '$(git' \
  --path 'category.id' \
  --path 'entry.category' \
  --path 'footer' \
  --path '{,'
```

The last six are the shell-artifact files from §7.2. Harmless, but there is no
reason to carry them.

### 8.2 Redact the personal email addresses from all historical file contents

Create `replacements.txt` (this file is a local scratch file — do **not** commit
it, it contains the addresses you are trying to remove):

```
dudukuruyuvaraj55@gmail.com==>REDACTED@example.invalid
dudukuruyuvaraj@gmail.com==>REDACTED@example.invalid
```

Then:

```bash
git filter-repo --replace-text replacements.txt
rm replacements.txt
```

> **Note:** this rewrites *text* files. `public/resume.pdf` is a binary whose
> streams are compressed, so `--replace-text` will not reliably reach the
> address inside it. To purge that, either drop the PDF from history entirely
> (`--invert-paths --path public/resume.pdf`) and re-add the clean replacement
> as a new commit, or accept that old revisions of the PDF still contain it.

### 8.3 Optional — also purge the phone number

The number was never in a committed HTML file, only in `src/data/profile.js`,
which is text, so `--replace-text` does reach it. Add to `replacements.txt`:

```
+91 63050 17247==>REDACTED
https://wa.me/916305017247==>REDACTED
```

### 8.4 Afterwards

```bash
git remote add origin <repo-url>     # filter-repo drops the remote by design
git push --force --all
git push --force --tags
```

Then have anyone with a clone re-clone; their old history will not merge.
Old objects may survive on GitHub until garbage collection — for a hard
guarantee, ask GitHub Support to run `gc`, or recreate the repository.
