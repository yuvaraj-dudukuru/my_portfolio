# Compliance, Accessibility & UX Audit — yuvarajdevs.tech

**Audited:** 2026-09-16
**Branch:** `redesign/neo-brutalist-platform` @ `dbef9aa`
**Scope:** every file under `src/`, `public/`, `scripts/`, plus root config, `legacy/`, `assets/`, `.github/`
**Live check:** `https://yuvarajdevs.tech/` was fetched and matches this branch, so findings apply to production, not just to the working tree.

> **Read this first.** This repository is in far better shape than the brief assumed. There are **no analytics, no pixels, no chat widgets, no tracking cookies, no testimonials, no fake urgency, no pre-checked boxes, and no checkout**. Accessibility is already strong: real focus traps, a working skip link, a route live-region, comprehensive `prefers-reduced-motion` handling, and every text/background pair in both themes passes WCAG AA when computed from the actual tokens. The genuine gaps are concentrated in **legal documentation (which does not exist at all)**, **price presentation under Indian e-commerce rules**, **a plain-text personal Gmail in 19 shipped HTML files**, and **no-JS rendering**. Three known issues from the brief are already fixed on this branch (dark `theme-color`, per-route `<head>` tags, styled 404).

---

## 1. Stack summary

| Concern | What is actually there |
|---|---|
| **Language** | JavaScript + JSX. **No TypeScript**, no `tsconfig.json`. Functional components + hooks throughout; no class components. |
| **Framework** | React `18.3.1` (`react`, `react-dom`) |
| **Router** | `react-router-dom` `6.28.0` — `BrowserRouter` in `src/main.jsx:12`, route table in `src/App.jsx:78-109`. Home is eager; all other routes are `React.lazy` + `<Suspense>` (`src/App.jsx:14-25`). |
| **Build tool** | Vite `5.4.11` + `@vitejs/plugin-react` `4.3.3`. `npm run build` = `vite build && node scripts/generate-seo.mjs`. |
| **Prerender** | `scripts/generate-seo.mjs` — post-build Node script that walks the route table and writes **19 static HTML documents** (one per route) with correct `<title>`, description, canonical, OG tags and JSON-LD baked in, plus `sitemap.xml` and `404.html`. **Head only — `<div id="root">` stays empty.** |
| **Styling** | Tailwind CSS `3.4.15`, `darkMode: 'class'`. Every colour resolves through CSS custom properties declared in `src/index.css:19-79`; `tailwind.config.js:26-52` maps them to utilities. PostCSS + autoprefixer. All `borderRadius` values forced to `0` (`tailwind.config.js:14-24`). |
| **Icons** | `lucide-react` `0.460.0`, tree-shaken into the bundle. No icon network requests. |
| **Hosting / deploy** | **Vercel** — `vercel.json` sets the SPA rewrite and three security headers. Live at `https://yuvarajdevs.tech/`. ⚠️ `.github/workflows/deploy.yml` *also* builds and publishes `dist/` to **GitHub Pages** on every push to `main`. Two live deploy targets, one of which is almost certainly stale. |
| **Backend** | **None.** No server, no serverless functions, no database, no API routes, no auth. The site is 100 % static. |
| **Email provider** | **EmailJS** (`@emailjs/browser` `4.4.1`). Dynamically imported *on submit only* (`src/components/ContactForm.jsx:139`), so it is not on the initial critical path. Config from `VITE_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY`, documented in `.env.example`. |
| **Payment provider** | **None in code.** Prices are displayed; the only action is "Enquire and enrol" → `/contact?subject=…`. No cart, no checkout, no gateway, no Razorpay/Stripe/PayU. |
| **Analytics** | **None.** Verified by grep across `src/`, `index.html`, `public/`, `scripts/`: no GA, GTM, `gtag`, `fbq`, Hotjar, Clarity, Plausible, Segment, Calendly, Crisp or Tawk. |
| **Tests** | `npm test` runs `scripts/ssr-smoke.jsx` — renders all 20 routes through `react-dom/server` and fails on render errors or thin output. **Currently: all 20 routes render.** No unit tests. |
| **Lint** | **No ESLint or Prettier config exists.** Two `// eslint-disable-next-line no-console` comments in `ContactForm.jsx` reference a linter that is not installed. *Verification in later phases will therefore be `npm run build` + `npm test`, not lint.* |

---

## 2. Route inventory

Defined in `src/App.jsx:78-109`; metadata in `src/seo/routes.js:23-86`.

| Route | Component | Renders | Prerendered `<head>`? |
|---|---|---|---|
| `/` | `pages/Home.jsx` | 9 stacked sections (Hero, SelectedWork, WhatIBuild, LabsPreview, LearnPreview, WritingPreview, CurrentFocus, AboutPreview, ContactCta) + `IntroCurtain` on first visit of a session | ✅ + Person & WebSite JSON-LD |
| `/work` | `pages/Work.jsx` | 3 case studies, client-side domain filter (`All / AI/ML / Product / Automation`) | ✅ |
| `/work/:slug` | `pages/WorkDetail.jsx` | Full case study ×3 (`career-co-pilot`, `whatsapp-automation`, `lumora-lms`) | ✅ + SoftwareSourceCode + Breadcrumb JSON-LD |
| `/labs` | `pages/Labs.jsx` | 4 experiments | ✅ |
| `/labs/:slug` | `pages/LabDetail.jsx` | Lab write-up ×4 (`dieline-to-3d`, `3d-sofa-configurator`, `verifiable-certificates`, `quantum-computing`) | ✅ |
| `/learn` | `pages/Learn.jsx` | 4 course cards, 2 learning paths, 3 principles, mentoring panel, 6-item FAQ | ✅ |
| `/learn/:slug` | `pages/CourseDetail.jsx` | Course page ×4 with **sticky price + enrol panel** | ✅ + Course/Offer + Breadcrumb JSON-LD |
| `/writing` | `pages/Writing.jsx` | Empty state + planned topics (**0 articles published**) | ✅ |
| `/writing/:slug` | `pages/ArticleDetail.jsx` | Article (no instances today) | ✅ (none generated) |
| `/now` | `pages/Now.jsx` | 4 sections from `data/now.js`, dated `2026-09-16` | ✅ |
| `/about` | `pages/About.jsx` | Bio, roles, capabilities, certifications, portrait, links | ✅ + Person JSON-LD |
| `/contact` | `pages/Contact.jsx` | **The only form on the site** + 4 contact channels | ✅ |
| `/projects` | — | `<Navigate to="/work" replace>` | ❌ (client-only redirect) |
| `/training` | — | `<Navigate to="/learn" replace>` | ❌ |
| `/services` | — | `<Navigate to="/learn" replace>` | ❌ |
| `*` | `pages/NotFound.jsx` | Styled 404 with nav recovery links, `noindex` | ✅ as `dist/404.html` |

**Missing routes that Phase 1 must add:** `/privacy`, `/terms`, `/refund-policy`, `/cookies`, `/data-request` (and `/credits` if attribution turns out to be required).

---

## 3. Data inventory — personal data collected

There is **exactly one** data-collecting surface on the entire site.

### 3.1 Contact form — `src/components/ContactForm.jsx`

| Field | `id` | Required | Purpose | Where it goes | Retention | Necessary? |
|---|---|---|---|---|---|---|
| Name | `name` | Yes (`:103`) | Addressing the reply | EmailJS → owner's mailbox | ❓ Undefined — **open item** | ✅ Yes |
| Email | `email` | Yes (`:104-108`, regex) | The only reply channel | EmailJS → owner's mailbox | ❓ Undefined | ✅ Yes |
| Topic | `subject` | Yes (`:109`) | Routing the enquiry. **Closed list** of 7 options derived from course data (`:11-17`); a `?subject=` URL param is honoured **only if it matches an existing option** (`:90`) — good injection hygiene | EmailJS → owner's mailbox | ❓ Undefined | ✅ Yes |
| Message | `message` | Yes, min 10 chars (`:110-112`) | The enquiry itself | EmailJS → owner's mailbox | ❓ Undefined | ✅ Yes |
| Company | `company` | No — **honeypot** (`:252-257`) | Bot trap. `aria-hidden`, off-screen, `tabIndex={-1}`. Checked at `:121` and the submit is silently abandoned if filled. **Never transmitted.** | Nowhere | n/a | ✅ Yes (and correctly implemented) |

**Data minimisation verdict: nothing to remove.** Four fields, each load-bearing for "reply to a human". No phone, no company, no budget, no "how did you hear about us", no consent-bundled marketing checkbox — because there is no marketing list.

**Logging:** `:169` logs `console.error('[contact] send failed', error)` — the *error*, not the payload. `:153` warns about missing env vars with no user data. ✅ **No personal data is logged anywhere.**

**Processor exposure:** EmailJS necessarily receives all four fields plus the request IP and User-Agent. This must be disclosed in the privacy policy as a processor / cross-border transfer (EmailJS is US-based).

### 3.2 Everything else

| Surface | Personal data? |
|---|---|
| `mailto:` links (Footer, Header sheet, Contact, About) | No — hands off to the user's own mail client |
| `wa.me` link (`profile.whatsappUrl`) | No — user-initiated navigation; WhatsApp then sees the user |
| `public/resume.pdf` | ⚠️ **Publicly downloadable.** Not audited for content — if it contains a phone number, home address or date of birth, that is self-published personal data. **Open item for you to check.** |
| Any API endpoint | None exist |

---

## 4. Third-party SDK / script / embed inventory

| Vendor | What | Where | Purpose | Sets cookies? | Loads before consent? | Recommendation |
|---|---|---|---|---|---|---|
| **Google Fonts** | `fonts.googleapis.com` CSS + `fonts.gstatic.com` WOFF2 | `index.html:44-54` — `preconnect` ×2, `preload`, **render-blocking `<link rel="stylesheet">`** | Inter + JetBrains Mono | **No cookies**, but every visitor's **IP address and User-Agent are transferred to Google before any interaction** | **YES — on first paint, every page** | ⚠️ **Self-host** (Phase 6). Both families are SIL OFL, so self-hosting is licensed. This removes the transfer entirely and is better than gating it behind consent, because the site is unusable without its fonts. |
| **EmailJS** | `api.emailjs.com` | `src/components/ContactForm.jsx:139-150`, dynamic `import()` **inside the submit handler** | Relays the contact form to the owner's mailbox | No first-party cookies | **No** — only after the user clicks "Send message" | ✅ **Keep.** Loading is already consent-by-action. Add an explicit privacy notice + policy link next to the submit button (Phase 2) and name EmailJS as a processor in the policy (Phase 1). |
| **Vercel** | Host | `vercel.json` | Serving | Vercel does not set cookies for static assets by default. Edge request logs contain IPs. | n/a (it *is* the origin) | ✅ Keep. Disclose as hosting processor. |
| **lucide-react** | npm | bundled | Icons | No | n/a — no network | ✅ Keep. ISC licence, list in `LICENSES.md`. |

**Outbound links (navigation only, no embeds):** `github.com/yuvaraj-dudukuru`, `linkedin.com/in/yuvaraj-dudukuru`, `wa.me/916305017247`, `lumora-space-lms.vercel.app`, `3-d-sofa-configurator-omega.vercel.app`, `sivi-quant-labs-build-challenge.vercel.app`, `nownownow.com/about`. All carry `target="_blank" rel="noopener noreferrer"` where external. **Zero `<iframe>` elements site-wide.**

---

## 5. Cookie & storage inventory

| Key | Mechanism | Set by | Value | Duration | Category |
|---|---|---|---|---|---|
| `yd-theme` | `localStorage` | `index.html:62` (pre-paint) and `src/context/ThemeContext.jsx:26` | `'dark'` \| `'light'` | Until cleared | **Preferences / functional** |
| `yuvarajdevs_intro_seen` | `sessionStorage` | `src/components/IntroCurtain.jsx:38` | `'1'` | Tab session | **Preferences / functional** |

**Cookies set by this site: none.** No `document.cookie` anywhere. No IndexedDB. No analytics or marketing storage of any kind.

> **Important decision for Phase 2.** Under both DPDP and GDPR/ePrivacy, storage that is *strictly necessary or purely functional and user-initiated* (a remembered theme, a "you have seen the intro" flag) does **not** require prior consent. **Today this site does not legally need a cookie banner.** The brief asks for one, and I will build the full `ConsentProvider` + banner + `loadScriptIfConsented()` infrastructure regardless — but whether the banner *displays* today, or stays dormant until the first analytics/marketing script is added, is your call. See Question **Q7**.

---

## 6. Dark pattern scan

Searched for: countdown timers, fake scarcity, pre-checked boxes, confirm-shaming, hidden fees, drip pricing, forced account creation, hard-to-find cancel/unsubscribe, disguised ads, forced continuity, nagging, basket sneaking, subscription traps.

### Found

| # | Severity | File:line | What | Why it matters |
|---|---|---|---|---|
| **DP-1** | **P0** | `src/data/courses.js:22`, `:79`, `:134` | `price: { display: '₹4,999', note: 'Starting price' }` — rendered in `CourseCard.jsx:68-77` and `CourseDetail.jsx:208-214`. The price **does not state whether GST is included**, and **"Starting price" signals the final price may be higher without saying by how much or why.** | **Consumer Protection (E-Commerce) Rules 2020, r. 4(3) & 5(3)** require the total price of goods/services **with a breakdown of all mandatory charges**. **CCPA Dark Patterns Guidelines 2023** lists *drip pricing* as a named dark pattern. Whether GST applies depends on registration status (**Q3**). Fix in Phase 3: state the tax position explicitly and either drop "Starting price" or say exactly what raises it. |
| **DP-2** | **P1** | `src/components/cards/CourseCard.jsx:35` | `<StatusBadge tone="accent">Most popular</StatusBadge>`, shown when `course.featured` is set — currently only on **AI & Data Science Foundations** (`courses.js:75`). | Unverified social proof. There is no enrolment data in the repo to support "most popular". CCPA Guidelines treat fabricated popularity signals as misleading. **Not deleted** — flagged for your decision in `CLAIMS_REVIEW.md`. |
| **DP-3** | **Info** | `src/components/IntroCurtain.jsx` | Full-screen interstitial on the first `/` visit per session, with `Enter` and `Skip intro` buttons. | **Not a dark pattern.** "Skip intro" is present, visible and keyboard-reachable; Escape dismisses; it never appears on deep links; it is `sessionStorage`-scoped, not permanent. Noted only because interstitials are a known ranking/UX consideration on mobile. No action proposed. |

### Explicitly clean

- ❌ No countdown timers, "only X seats left", "N people viewing", or expiry pressure anywhere.
- ❌ **No checkboxes exist on the site at all**, so nothing is pre-checked.
- ❌ No confirm-shaming. The closest copy is the opposite of it — `CourseDetail.jsx:242-243`: *"No payment, no waitlist theatre"* and *"Enquiring is not committing."*
- ❌ No forced account creation — there are no accounts.
- ❌ No hidden fees at checkout — there is no checkout.
- ❌ No forced continuity, auto-renewal or subscription.
- ❌ No disguised ads or sponsored content.
- ❌ No unsubscribe friction — there is no mailing list.
- ✅ Unavailable things are marked unavailable: `status: 'planned'` renders "In development" with **no price and no enrolment path** (`courses.js:194` → `CourseCard.jsx:36-39`, `:75-77`); learning-path stages without a course render "Planned" (`Learn.jsx:115-119`); `Writing.jsx` ships an honest empty state instead of filler.

---

## 7. Claims & reviews scan

**There are no testimonials, no reviews, no star ratings, no client logos and no "placed at" claims anywhere in the repository.** `src/seo/schema.js:5-10` documents a deliberate policy of emitting no `review`, `aggregateRating` or `interactionStatistic` markup. That policy is honoured in the code.

What does need evidence:

| # | File:line | Claim | Evidence in repo? | Status |
|---|---|---|---|---|
| **C-1** | `src/data/profile.js:47` | **"100+ Students taught"** — *"Across 1:1 and cohort sessions"*. Rendered on `/` (`AboutPreview.jsx:46-54`). | ❌ None | **NEEDS SOURCE** |
| **C-2** | `src/data/profile.js:48` | **"5+ Systems shipped"** — *"Deployed and in use or demoable"* | ⚠️ Partial. The site shows 3 case studies + 4 labs, of which `dieline-to-3d` and `3d-sofa-configurator` have live URLs. That arithmetic reaches 5, but "5+" is not derived from anything in code. | **NEEDS CONFIRMATION** |
| **C-3** | `src/data/profile.js:49` | "3 Disciplines" | ✅ Self-descriptive and matches `capabilities.js` | OK |
| **C-4** | `src/data/profile.js:41` | Credential **"Python & Data Science"**, issuer: **`'Certified'`** | ❌ *"Certified"* is not an issuing body. Rendered as an issuer on `/about` (`About.jsx:98`). | **NEEDS CONFIRMATION** — name the real issuer or remove |
| **C-5** | `src/data/profile.js:39-40` | CS50 (Harvard), Inbound Marketing (HubSpot Academy) | ❌ No certificate links | **NEEDS SOURCE** (low risk — both are verifiable publicly; adding credential URLs would settle it) |
| **C-6** | `src/data/profile.js:33-35` + `Hero.jsx:69-71` | Roles: **Founder, Lumora Space** (current) · **Founder, Progressis 2** (current) · **COO, Fraylon Technologies** (**Past**) | ⚠️ **Conflicts with the brief**, which describes you as *"Co-Founder & COO, Fraylon Technologies LLP"* in the present tense. | **NEEDS CONFIRMATION — blocking for Phase 1.** The legal entity that sells the courses must be named correctly in the Terms, Refund Policy and footer. See **Q1**. |
| **C-7** | `src/components/cards/CourseCard.jsx:35` | **"Most popular"** badge | ❌ None | **NEEDS SOURCE** (= DP-2) |
| **C-8** | `src/seo/schema.js:41-44` | JSON-LD `worksFor: { name: 'Lumora Space' }` published to search engines | ⚠️ Same entity question as C-6 | **NEEDS CONFIRMATION** |
| **C-9** | `src/data/work.js` `results[]` | e.g. *"Deployed and running at lumora-space-lms.vercel.app"* | ✅ Live URLs present and linked; `work.js:1-8` documents a no-invented-metrics rule that the data honours | OK |
| **C-10** | `src/data/courses.js:264` | *"A project you built and can explain, reviewed with you. **Not a certificate of attendance.**"* | ✅ Explicitly disclaims certification | OK — good |

**Nothing will be deleted.** C-1, C-2, C-4, C-5 and C-7 go into `docs/CLAIMS_REVIEW.md` behind a `showUnverifiedClaims` config flag in Phase 3.

---

## 8. Accessibility audit — WCAG 2.2 AA

### 8.1 Images

| File:line | `alt` | Verdict |
|---|---|---|
| `components/home/AboutPreview.jsx:37` | `` `${profile.name}, portrait` `` → *"Yuvaraj Dudukuru, portrait"* | ✅ Present; reword to *"Portrait of Yuvaraj Dudukuru"* per brief (**P2**) |
| `pages/About.jsx:121` | same | ✅ Same |
| `pages/CourseDetail.jsx:161` | same | ✅ Same |
| `pages/WorkDetail.jsx:194` | *(see file)* | ✅ Present |

All four carry `width`/`height` (no CLS), `loading="lazy"`, `decoding="async"`. **Every decorative icon is correctly `aria-hidden="true"`** — verified across all `lucide-react` usages. **No missing `alt`, no `alt="image of…"`, no unmarked decorative images.** ✅

### 8.2 Colour contrast — computed from the actual tokens in `src/index.css`

Ratios below were computed with the WCAG relative-luminance formula against the real token values, not estimated.

**Text (AA needs 4.5:1; large text 3:1) — every pair passes in both themes:**

| Pair | Dark | Light |
|---|---|---|
| `ink` on `bg` | **19.80:1** | **21.00:1** |
| `muted` on `bg` / `bg-subtle` / `surface-hover` | 10.65 / 10.08 / 8.97 | 10.86 / 9.95 / 9.95 |
| `faint` on `bg` (this is `.label`, 11 px — held to 4.5:1) | **6.69:1** | **6.90:1** |
| `faint` on `surface-hover` (worst case) | **5.64:1** | **6.32:1** |
| `accent-text` on `bg` | 15.52 | 9.11 |
| `cyan-text` on `bg` | 12.87 | 8.15 |
| `positive` / `critical` on `surface` | 10.57 / 7.30 | 6.66 / 6.83 |
| `accent-ink` on `accent` fill (buttons) | 15.52 | 16.46 |
| `cyan-ink` on `cyan` fill | 12.87 | 13.65 |
| `bg` text on `ink` fill (inverted hero bar) | 19.80 | 21.00 |

**Non-text / UI (1.4.11 needs 3:1):**

| Component | Dark | Light | Verdict |
|---|---|---|---|
| `hard` 2px structural border on `bg` | **19.80:1** | **21.00:1** | ✅ |
| Focus ring (`:focus-visible`, 3px `--c-text`, 2px offset) on `bg` | **19.80:1** | **21.00:1** | ✅ Comfortably clears |
| `accent` yellow fill vs page background | 15.52:1 | **1.28:1** | ✅ **Not a failure** — every accent fill is wrapped in a 2px `border-hard` (`Button.jsx:9`, `Header.jsx:83`), and *that* border is the 21:1 boundary. The design already anticipates this (`index.css:65-67`, `tailwind.config.js:41-43`). |
| `line` 1px divider (`--c-line` @ `--line-alpha`) | **2.23:1** | **1.53:1** | ⚠️ **Informational.** Used for low-emphasis rules (`.rule`, `divide-line`) that separate content, not controls. Decorative dividers are outside 1.4.11. **If you want them to clear 3:1 anyway:** set `--line-alpha` to `0.34` (dark → 3.01:1) and `0.42` (light → 3.03:1). That is a visual change to the whole site, so it is your call (**Q8**). |

**Conclusion: no contrast failures requiring a token change.** This is unusual and worth saying plainly.

### 8.3 Keyboard & focus

**Working correctly:**

- ✅ **Zero** `div`/`span` elements with click handlers. Every interactive element is a real `<button>`, `<a>` or `<Link>` (verified by grep).
- ✅ Skip link — `src/App.jsx:51-56`, first in DOM, `sr-only` until `:focus`, targets `#main`.
- ✅ Global focus ring — `index.css:114-117`, 3px solid, 2px offset, uses `--c-text` (not the accent) specifically so a yellow ring never disappears on a yellow button. The comment at `:109-113` shows this was reasoned about.
- ✅ Mobile nav — focus trap, Escape-to-close, focus returned to the trigger, scroll lock, panel unmounted when closed so nothing is focusable behind it (`Header.jsx:22-56`, `:132`).
- ✅ Intro curtain — `role="dialog" aria-modal="true" aria-labelledby`, focus trap, Escape, focus handed to `#main` on dismiss (`IntroCurtain.jsx:64-118`).
- ✅ Filter chips — real `<button>` with `aria-pressed`, wrapped in `role="group"` with `aria-label` (`Work.jsx:36-56`, `Writing.jsx:41-62`).
- ✅ FAQ uses native `<details>/<summary>` (`Learn.jsx:179-193`).
- ✅ Touch targets: `Button` `md`/`lg` are 44 px+; `sm` is 40 px — clears WCAG 2.2 **2.5.8** (24 px min).

**Gaps:**

| # | Severity | File:line | Issue |
|---|---|---|---|
| **A-1** | **P1** | `src/components/ContactForm.jsx:178-195` | On success the form is **replaced** by a `role="status"` panel. Focus is **not moved** — the keyboard user was on the submit button, which no longer exists, so focus drops to `<body>`. Fix: focus the success panel (`tabIndex={-1}` + `.focus()`). |
| **A-2** | **P1** | `src/context/ToastContext.jsx:35` | Toasts auto-dismiss after **6 s** (`duration = 6000`). The *error* toast contains the fallback email address (`ContactForm.jsx:173`) — a screen-reader or slow reader can lose the recovery path. **WCAG 2.2.1 Timing Adjustable.** Fix: `duration: 0` (persistent) for `tone: 'error'`. |
| **A-3** | **P1** | `src/components/layout/RouteManager.jsx:40` | The route announcement reads `document.title` after a **fixed 120 ms** `setTimeout`. `<Seo>` lives inside a `React.lazy` page, so on a slow network the chunk has not resolved yet and **the previous page's title is announced**. Fix: observe the `<title>` node with a `MutationObserver`, or announce from the route table instead of the DOM. |
| **A-4** | **P1** | `src/index.css` (global) | **WCAG 2.2 2.4.11 Focus Not Obscured (Minimum).** The header is `fixed` at 64 px (`Header.jsx:70`). Tabbing to a link that sits just under the header edge can leave the focus ring partly covered. Fix: add `scroll-padding-top: 5rem` to `html`. One line, no visual cost. |
| **A-5** | **P2** | `src/components/layout/Header.jsx:132-173` | The focus trap wraps only when focus is already *inside* the panel. If focus is on the header trigger (which stays outside the panel), Tab reaches background content. Low impact — the trigger is visible above the sheet — but `inert` on `.app-shell` while open would close it properly. |
| **A-6** | **P2** | `src/App.jsx:72` + `RouteManager.jsx:35-36` | Route change moves focus to `<main tabIndex={-1} className="focus:outline-none">` rather than to the page `<h1>`, as the brief asks. Focusing the `main` landmark is defensible (arguably better — it does not skip the page header), but it is a deviation and `focus:outline-none` suppresses the indicator. **Your call** (**Q9**). |
| **A-7** | **P2** | `src/components/ContactForm.jsx:101-115` | Validation errors are correctly linked via `aria-describedby` and announced on focus, but there is **no error summary live region**. Adding one would announce "3 problems" before focus moves. Enhancement, not a failure. |

### 8.4 SPA specifics

| Requirement | Status |
|---|---|
| `<title>` updates on route change | ✅ `src/seo/Seo.jsx:62` |
| Focus moves on navigation | ✅ to `<main>` (`RouteManager.jsx:35-36`) — see **A-6** |
| Route change announced | ✅ `aria-live="polite" aria-atomic="true"` region (`RouteManager.jsx:44-51`) — **timing bug A-3** |
| Scroll restored to top | ✅ `:31`, `behavior: 'auto'`, with hash-anchor handling at `:20-27` |
| Suspense fallback | ✅ `aria-busy="true"` + `sr-only` "Loading page" (`App.jsx:35-38`) |

### 8.5 Structure, landmarks, forms, motion

- ✅ **Landmarks:** `<header>` (`Header.jsx:70`), `<nav aria-label="Primary">`, `<main id="main">` (`App.jsx:72`), `<footer>` + `<nav aria-label="Footer">` (`Footer.jsx:19`, `:34`). Toast viewport is `role="region" aria-label="Notifications"`.
- ✅ **Heading hierarchy:** exactly one `<h1>` per route. `sr-only` `<h2>`s are deliberately inserted where card `<h3>`s would otherwise skip a level (`Work.jsx:64`, `Writing.jsx:65`, `Learn.jsx:55`) — with comments explaining why.
- ✅ **Forms:** every field has a real `<label htmlFor>` (`ContactForm.jsx:44`); errors are wired through `aria-describedby` + `aria-invalid` (`:36-37`); first invalid field is focused on failed submit (`:125-127`); the form is `aria-labelledby` its own `<h2>`.
- ✅ **`prefers-reduced-motion`:** global override killing all animation, transition and smooth scroll (`index.css:294-318`), plus JS-level checks in `Reveal.jsx:4-6` and `IntroCurtain.jsx:10-15`. `.reveal` starts *visible* and is only hidden when JS + motion are both available (`index.css:232-234`) — so no-JS users never get invisible content. This is exemplary.
- ✅ **`<html lang="en">`** present (`index.html:2`).
- ✅ **Colour is never the only channel:** `StatusBadge.jsx:10-13` and `Header.jsx:58-60` both document this; the active nav item is a filled block with a border, not just a tint.

---

## 9. Email audit

| Question | Answer |
|---|---|
| Transactional email code? | One path only: `ContactForm.jsx:140-150` → `emailjs.send(...)` → an email **to the site owner**. The visitor is not emailed by the site. |
| Marketing / newsletter code? | **None.** No list, no signup, no campaign code, no ESP beyond EmailJS relay. |
| Unsubscribe links? | n/a — nothing to unsubscribe from. |
| `List-Unsubscribe` / `List-Unsubscribe-Post` headers? | n/a — the site does not compose email headers; EmailJS does. |
| Suppression list? | n/a |

**Phase 5 unsubscribe work is therefore not applicable and will not be built.** Per the brief, the requirement is recorded here instead:

> **If a newsletter or cohort mailing list is ever added**, it must ship with: a visible unsubscribe link in every non-transactional footer; `List-Unsubscribe` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click` headers; a tokenised no-login unsubscribe endpoint (signed with a secret from `.env`) that confirms on a page; and a suppression list checked before every send. That requires a backend, which does not exist today.

⚠️ **Open item (Q6):** if an **auto-reply template is enabled in the EmailJS dashboard**, the site *does* send mail to visitors. That is transactional (a reply to their own enquiry) and exempt from unsubscribe requirements, but it must be disclosed in the privacy policy. I cannot see the dashboard from the repo.

**The `/data-request` page from Phase 5 *is* in scope** and will be built — it posts through the existing EmailJS mechanism, since there is no backend to store request records.

---

## 10. Asset licensing inventory

### Fonts

| Font | Source | Licence | Attribution? | Action |
|---|---|---|---|---|
| **Inter** (400–900 variable) | Google Fonts CDN (`index.html:48`) | **SIL OFL 1.1** | Not required | Self-host in Phase 6 — licence permits it; keep `OFL.txt` in `public/fonts/LICENSES/` |
| **JetBrains Mono** (400, 500) | Google Fonts CDN | **SIL OFL 1.1** | Not required | Same |
| **"The Historia Demo"** — `assets/fonts/fontsfree-net-thehistoriademo-webfont.{woff,woff2}` **and** `legacy/assets/fonts/…` (4 files, both tracked in git) | `fontsfree.net` — declared at `legacy/assets/scss/fonts/_fonts.scss:1-5` | ⚠️ **UNKNOWN, and the filename says "demo".** Fonts redistributed by fontsfree.net are frequently demo/personal-use-only builds with no commercial licence. | Unknown | ⚠️ **P1-legal.** Not deployed (not under `public/`, not referenced by the Vite app) **but it is published in a public GitHub repository, which is redistribution.** Recommend deleting all four files from the repo. |

### Images & icons

| Asset | Source | Licence | Action |
|---|---|---|---|
| `public/images/profile.jpg` | Presumed own photograph | ❓ | **Confirm** it is your own (Q10) |
| `public/images/career-copilot.png`, `realtime-chat.jfif`, `whatsapp-automation.png` | Presumed own screenshots | ❓ | **Confirm** — screenshots of your own apps are fine |
| `public/favicon.svg` | Hand-authored SVG, `YD` monogram | Own work ✅ | Note: uses `#EBB24A` amber, **not** the brand yellow `#FFE500` |
| `public/resume.pdf` | Own | ✅ | See §3.2 — check what personal data it publishes |
| `assets/img/IMG_20210217_173633899-min.jpg`, `assets/img/seo-img.png` | Old site | ❓ | Not deployed; in repo. Confirm or delete |
| `legacy/assets/img/download (1).png`, `download.jfif`, `images.png` | ⚠️ Filenames are browser defaults for **saved search-result images** | ⚠️ **UNKNOWN — assume third-party** | **P1-legal.** Not deployed; **in a public repo.** Recommend deletion. |
| `lucide-react` icons | npm | **ISC** | ✅ Permissive. List in `LICENSES.md`; no attribution required |
| `legacy/assets/css/styles.min.css` + `legacy/assets/scss/**` | Old site stylesheet | ⚠️ `legacy/LICENSE` is **MIT © 2025 Dudukuru Yuvaraj** — but if the SCSS originated in a purchased or free HTML template, that MIT grant is not yours to give | **Confirm** (Q11) |

---

## 11. SEO / UX quick wins

| # | Severity | Finding |
|---|---|---|
| **S-1** | **P0** | **Personal Gmail in plain text in 19 shipped HTML files.** `index.html:79` — `<noscript>… <a href="mailto:dudukuruyuvaraj55@gmail.com">dudukuruyuvaraj55@gmail.com</a></noscript>`. Because `generate-seo.mjs` copies the template per route, this ships in `dist/index.html`, `dist/work/index.html`, … — **19 documents**, all trivially scrapable. It is also `profile.email` throughout the app (Footer, Header sheet, Contact, About, ContactForm, and the `Person` JSON-LD at `schema.js:26`). |
| **S-2** | **P2** | **No-JS renders nothing.** `<div id="root">` is empty in every prerendered document; only the `<noscript>` sentence renders. **However:** `npm test` proves **all 20 routes already render cleanly through `react-dom/server`**, and `react-dom` is already a dependency. Full prerender is achievable with **zero new dependencies** — see §12 P2-1. |
| **S-3** | **P2** | `twitter:card` is `summary` with a 512×512 image (`index.html:34-39`, `site.js:14-19`). No 1200×630 OG image exists. The `TODO` at `site.js:14` acknowledges this. Note `Seo.jsx:75` also hardcodes `summary` for client-side navigation. |
| **S-4** | ✅ **Already fixed** | Dark `theme-color` — `index.html:7-8` already has both `(prefers-color-scheme: dark)` → `#0A0A0A` and `light` → `#FFFFFF`. **Brief item #4 needs no work.** |
| **S-5** | **P2** | **Favicon set is incomplete.** Only `favicon.svg`. Missing: `favicon.ico` fallback, `apple-touch-icon.png` (180×180), `site.webmanifest` + 192/512 maskable icons. The SVG's amber `#EBB24A` also does not match brand yellow `#FFE500`. |
| **S-6** | ✅ | 404: styled `NotFound.jsx` + static `dist/404.html` + `noindex` — all present. |
| **S-7** | ✅ | `robots.txt` ✓, `sitemap.xml` auto-generated from the same route table the app renders ✓ (19 URLs, priorities, lastmod). Phase 1's new legal routes will be picked up automatically once added to `pageMeta`. |
| **S-8** | **P2** | **Render-blocking third-party font CSS.** `index.html:53-54` is a synchronous `<link rel="stylesheet">` to `fonts.googleapis.com` — two extra DNS+TLS handshakes on the critical path of every page. Self-hosting fixes performance **and** the privacy issue in §4 in one change. |
| **S-9** | **P2** | **No CSP.** `vercel.json` sets `X-Content-Type-Options`, `Referrer-Policy` and `X-Frame-Options` — good baseline — but no `Content-Security-Policy`, `Permissions-Policy` or `Strict-Transport-Security`. |
| **S-10** | **P2** | **`SECURITY.md` is the unedited GitHub template.** It publishes literal placeholder text (*"Use this section to tell people about…"*) and a fabricated version-support table (`5.1.x`, `4.0.x`) for a project that has no such versions. Publicly visible. |
| **S-11** | **P2** | **`README.md` is stale.** Describes the old single-page portfolio ("Hero Section", "Skills Section", "Three featured projects") and points at `yuvaraj-dudukuru.github.io/my_portfolio/` rather than `yuvarajdevs.tech`. |
| **S-12** | **P2** | **Two deploy targets.** `.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on every push to `main`, while Vercel serves the live domain. One is stale; decide which (**Q12**). |
| **S-13** | ✅ | Performance baseline is healthy: main bundle **248 kB / 79 kB gzip**, every route code-split, images all under 40 kB with dimensions + `loading="lazy"`, EmailJS deferred to submit. |

---

## 12. Prioritised plan

### P0 — Legal / blocking

| ID | Item | Files it will touch |
|---|---|---|
| **P0-1** | **`src/config/legal.ts`→`.js`** *(project is JS, not TS)* — single source of truth for entity name, LLPIN, GSTIN, registered address, business email, grievance officer, jurisdiction city, refund window, policy versions & dates | **new** `src/config/legal.js` |
| **P0-2** | **Privacy Policy** `/privacy` — Data Fiduciary identity, the four fields from §3 **and nothing else**, purposes, consent basis, retention, processors (EmailJS, Vercel, Google Fonts until self-hosted), cross-border transfer, cookies summary → `/cookies`, DPDP rights incl. nomination, children's data, security, grievance officer, change log | **new** `src/pages/legal/Privacy.jsx`, `src/components/legal/LegalLayout.jsx`, `src/App.jsx`, `src/seo/routes.js` |
| **P0-3** | **Terms of Service** `/terms` | **new** `src/pages/legal/Terms.jsx` |
| **P0-4** | **Refund & Cancellation Policy** `/refund-policy` | **new** `src/pages/legal/RefundPolicy.jsx` |
| **P0-5** | **Cookie Policy** `/cookies` generated from `src/config/cookies.js` (the same config the banner reads) | **new** `src/config/cookies.js`, `src/pages/legal/Cookies.jsx` |
| **P0-6** | **Business details in the footer** + `/contact`: entity, LLPIN, GSTIN, registered address, grievance officer. Footer links: Privacy · Terms · Refund · Cookies · Cookie Settings · Data Request | `src/components/layout/Footer.jsx`, `src/pages/Contact.jsx` |
| **P0-7** | **S-1 — de-expose the Gmail.** Replace with a business-domain address from config, assembled at runtime (still accessible), `<noscript>` pointing at `/contact` instead of a raw `mailto:` | `index.html`, `src/data/profile.js`, `src/config/legal.js`, `Footer.jsx`, `Header.jsx`, `Contact.jsx`, `About.jsx`, `ContactForm.jsx`, `src/seo/schema.js` |
| **P0-8** | **DP-1 — price presentation.** State the tax position at first display; resolve "Starting price" | `src/data/courses.js`, `src/components/cards/CourseCard.jsx`, `src/pages/CourseDetail.jsx`, `src/seo/schema.js` |
| **P0-9** | **Form consent** — privacy-policy link by the submit button; separate **unchecked** marketing opt-in (only if you want a list at all — **Q5**); no consent bundling | `src/components/ContactForm.jsx` |

### P1 — Accessibility & legal-adjacent

| ID | Item | Files |
|---|---|---|
| **P1-1** | **A-1** focus the success panel after submit | `ContactForm.jsx` |
| **P1-2** | **A-2** error toasts must not auto-dismiss | `ToastContext.jsx`, `ContactForm.jsx` |
| **P1-3** | **A-3** announce the *new* title, not a 120 ms guess | `RouteManager.jsx` |
| **P1-4** | **A-4** `scroll-padding-top` for 2.4.11 | `src/index.css` |
| **P1-5** | **A-5** `inert` background while the mobile sheet is open | `Header.jsx`, `App.jsx` |
| **P1-6** | **DP-2 / C-7** gate "Most popular" behind a config flag | `CourseCard.jsx`, **new** `src/config/claims.js`, `docs/CLAIMS_REVIEW.md` |
| **P1-7** | **C-1/C-2/C-4/C-5** gate unverified stats & credentials behind the same flag | `src/data/profile.js`, `AboutPreview.jsx`, `About.jsx` |
| **P1-8** | **Licensing** — remove the fontsfree "Historia Demo" files and the unknown-provenance `legacy/assets/img/` files | `assets/fonts/*`, `legacy/assets/fonts/*`, `legacy/assets/img/*` |
| **P1-9** | **Cookie consent infrastructure** — `ConsentProvider`, `useConsent()`, `loadScriptIfConsented()`, versioned first-party store, banner with **equal-weight Accept all / Reject all**, granular preferences, `role="dialog"`, keyboard + reduced-motion + contrast compliant | **new** `src/context/ConsentContext.jsx`, `src/components/consent/ConsentBanner.jsx`, `src/components/consent/ConsentPreferences.jsx`, `src/utils/loadScriptIfConsented.js`, `src/config/cookies.js`, `Footer.jsx`, `App.jsx` |
| **P1-10** | **`/data-request`** page + form (access / correction / erasure / withdraw consent / grievance) with stated response timeline, submitting via the existing EmailJS path | **new** `src/pages/DataRequest.jsx`, `App.jsx`, `routes.js` |

### P2 — UX / SEO / polish

| ID | Item | Files |
|---|---|---|
| **P2-1** | **S-2 no-JS rendering.** ⚠️ **Proposal — needs your approval before I touch it.** Extend `scripts/generate-seo.mjs` to `renderToString()` each route into `<div id="root">`, and switch `main.jsx` from `createRoot` to `hydrateRoot` when the root is pre-filled. **Zero new dependencies** — `react-dom/server` ships with `react-dom`, and `scripts/ssr-smoke.jsx` already proves all 20 routes render server-side today. Risks to handle: `IntroCurtain` must stay client-only (it already is), and theme/hydration mismatch must be checked. Alternative (heavier, needs approval): adopt `vite-plugin-ssr`/`react-router` SSR. **I recommend the first.** | `scripts/generate-seo.mjs`, `src/main.jsx` |
| **P2-2** | **S-3** `summary_large_image` + 1200×630 OG image (placeholder path; you supply the design) | `index.html`, `src/data/site.js`, `src/seo/Seo.jsx` |
| **P2-3** | **S-8 / §4** self-host Inter + JetBrains Mono, licences into `public/fonts/LICENSES/` | `index.html`, `src/index.css`, **new** `public/fonts/**` |
| **P2-4** | **S-5** complete favicon set + webmanifest; align to brand yellow | `public/**`, `index.html` |
| **P2-5** | **A-6/A-7** focus target on navigation + form error summary (pending **Q9**) | `RouteManager.jsx`, `ContactForm.jsx` |
| **P2-6** | Portrait `alt` → *"Portrait of Yuvaraj Dudukuru"* | `AboutPreview.jsx`, `About.jsx`, `CourseDetail.jsx`, `WorkDetail.jsx` |
| **P2-7** | **S-9** CSP + `Permissions-Policy` + HSTS | `vercel.json` |
| **P2-8** | **S-10/S-11** rewrite `SECURITY.md`, refresh `README.md` | `SECURITY.md`, `README.md` |
| **P2-9** | **S-12** retire whichever deploy target is stale | `.github/workflows/deploy.yml` |
| **P2-10** | `docs/LICENSES.md` (+ `/credits` only if attribution turns out to be required) | **new** `docs/LICENSES.md` |

---

## 13. Questions for you

Nothing in Phase 1 can be written truthfully until **Q1–Q4** are answered. The rest can be answered as we go.

| # | Question | Why it blocks |
|---|---|---|
| **Q1** | **Which legal entity sells the courses?** The repo says *Founder, Lumora Space* + *Founder, Progressis 2* + *COO, Fraylon Technologies (**Past**)*. Your brief says *Co-Founder & COO, **Fraylon Technologies LLP**, present tense*. Is the seller **Fraylon Technologies LLP**, **Lumora Space**, or **you as a sole proprietor**? | The Terms, Refund Policy and footer must name the actual contracting party. Also resolves **C-6** and the `worksFor` JSON-LD (**C-8**). |
| **Q2** | **LLPIN** (`{{LLPIN}}`) and **registered address** (`{{REGISTERED_ADDRESS}}`) of that entity. | Required in the footer under the E-Commerce Rules. |
| **Q3** | **Is the entity GST-registered?** If yes, the **GSTIN** (`{{GSTIN}}`), and: **are the listed prices ₹4,999 / ₹5,499 / ₹6,999 inclusive or exclusive of GST?** | Drives **DP-1**, the single biggest compliance item. |
| **Q4** | **Grievance Officer name** (`{{GRIEVANCE_OFFICER_NAME}}`) and a **grievance email** (`{{GRIEVANCE_EMAIL}}`) — required by DPDP §13 and the E-Commerce Rules. Also: **business-domain address** to replace the Gmail (e.g. `hello@yuvarajdevs.tech`) — **does it exist yet?** | Blocks **P0-7**. If no domain mailbox exists yet I will wire the config and leave the value as a placeholder. |
| **Q5** | **Refund window** (`{{REFUND_WINDOW_DAYS}}`) and refund rules: is a refund available before the cohort starts? after session 1? never once material is delivered? What about rescheduling? | `courses.js:252` currently says *"No invented refund … policies"* — I will not invent one. |
| **Q6** | **Is an EmailJS auto-reply template enabled?** (Does a visitor who submits the form receive an email?) | Determines whether the site "sends email to data principals" in the privacy policy (§9). |
| **Q7** | **Cookie banner behaviour.** Today the site stores only `yd-theme` and `yuvarajdevs_intro_seen` — both functional, both legally exempt. Do you want the banner **(a) live now** for visible good faith, or **(b) built and dormant**, auto-activating the moment a non-essential category is added to `src/config/cookies.js`? *I recommend (b).* | Shapes Phase 2. |
| **Q8** | **Divider contrast.** `--line-alpha` dividers sit at 2.23:1 (dark) / 1.53:1 (light). They are decorative and exempt, but I can raise them to 0.34 / 0.42 for a clean 3:1. That changes the look of every rule on the site. **Raise, or leave?** | Visual decision, not a compliance one. |
| **Q9** | **Route focus target.** Focus currently moves to `<main>`. The brief asks for the `<h1>`. Keep `<main>` (my recommendation — it does not skip the page heading) or switch? | A-6. |
| **Q10** | **Confirm you own** `public/images/profile.jpg` and the three project screenshots. And should I check `public/resume.pdf` for personal data (phone / address / DOB) that is currently public? | `LICENSES.md` + §3.2. |
| **Q11** | **Did `legacy/assets/scss/**` originate in a third-party HTML template?** `legacy/LICENSE` currently MIT-licenses it under your name. | Licence accuracy. |
| **Q12** | **Retire the GitHub Pages workflow?** Vercel serves the live domain; `.github/workflows/deploy.yml` also publishes on every push to `main`. | S-12. |
| **Q13** | **Approve the Phase 6 prerender approach (P2-1)?** `renderToString` inside the existing `generate-seo.mjs` + `hydrateRoot`. **Zero new dependencies.** | Blocks the no-JS fix. |
| **Q14** | **Add ESLint?** There is none, and two `eslint-disable` comments reference a linter that is not installed. Adding it means **new dev dependencies**, which your rules say I must ask about first. | Determines what "lint passes" means in later phases. |

---

## Verification performed for this phase

```
npm run build   →  ✅ built in 52.65s; 19 prerendered documents + sitemap.xml
npm test        →  ✅ All 20 routes rendered (react-dom/server)
curl https://yuvarajdevs.tech/  →  ✅ live HTML matches this branch
```

Contrast ratios in §8.2 were computed from the token values in `src/index.css:19-79` using the WCAG relative-luminance formula, not estimated by eye.

**Phase 0 ends here. No source files have been modified. Awaiting your approval and answers to Q1–Q4 before starting Phase 1.**
