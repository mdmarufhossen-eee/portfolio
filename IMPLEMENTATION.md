# IMPLEMENTATION.md — Build plan

Work phases in order. Each phase ends with its acceptance criteria met and a commit. Conventions are in [CLAUDE.md](CLAUDE.md); structure is in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Current status

Built (v1): scaffold, tokens/base CSS, all five sections, theme toggle, scroll reveal, skill and project filters, contact form (mailto fallback until a Formspree ID is set), SEO/OG meta, JSON-LD, favicon set, optimised images, `scripts/check.mjs`, Pages deploy workflow. Verified by screenshots (390 px and 1280 px, dark theme) and `npm run check`.

Not done yet:
- Lighthouse / axe runs, light-theme visual pass, 768 px and 1920 px review, real-device test
- Owner inputs: GitHub and LinkedIn URLs, CV, real projects, achievements, Formspree ID (set in `js/config.js` or `content/*.json`; empty values hide the UI)
- ID documents still in this folder (git-ignored, excluded from deploy); owner to move them
- ESLint/Stylelint/Prettier/html-validate/Lighthouse CI wiring (the dependency-free `npm run check` stands in for now)
- `git init`, GitHub repo creation, enabling Pages
- Fonts use the system stack; self-hosted Inter/JetBrains Mono is optional polish

Legend: ☐ to do · **Owner** = needs input from Maruf (tracked in [docs/CONTENT.md](docs/CONTENT.md#owner-todo-list)).

---

## P0 — Safety, scaffold, tooling

**Why first:** protect the ID documents before a repo exists, and make quality checks automatic from the start.

- ☐ Move `ID-card-front.jpeg`, `ID-card-back.jpeg`, `nid-maruf.pdf` out of this folder (e.g. `~/private/`). **Owner** confirms.
- ☐ Add `.gitignore` (ID files, `node_modules`, `.lighthouseci`, OS junk) and `.editorconfig`.
- ☐ `git init`; first commit contains no ID files (`git ls-files | grep -Ei 'id-card|nid'` is empty).
- ☐ Create the directory layout from CLAUDE.md. Move `maruf-image.jpeg` to `assets/img/source/`. Keep `basic-info.txt` untouched.
- ☐ `package.json` with dev dependencies only: prettier, eslint, stylelint (+ standard config), html-validate, @lhci/cli, pa11y-ci, markdown-link-check.
- ☐ Scripts: `dev`, `lint`, `format`, `check`, `lh`, `a11y`. `check` includes a scan that fails if `TODO(` appears in rendered content.
- ☐ `.github/workflows/ci.yml`: install → `npm run check` → Lighthouse CI on PRs.

**Accept:** `npm run check` passes on an empty skeleton; CI is green.

## P1 — Design tokens and base styles

Source: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).

- ☐ `tokens.css`: colour, type scale, spacing, radius, shadow, motion tokens for light and dark.
- ☐ `base.css`: modern reset, fluid typography, `:focus-visible` ring, `prefers-reduced-motion` override, `scroll-behavior: smooth` (disabled under reduced motion), `scroll-margin-top` for the sticky header.
- ☐ `layout.css`: container (max 1120px), section rhythm, 12-col grid helpers.
- ☐ Self-host the fonts (variable WOFF2, `font-display: swap`, preload the primary one). No third-party font CDN.
- ☐ Inline no-flash theme script **as an external file** loaded early (`js/theme-init.js`, a tiny blocking script) so there is no inline JS.

**Accept:** a throwaway kitchen-sink page shows every token in both themes; contrast checks pass.

## P2 — Home (Step 1)

- ☐ Sticky header: logo/monogram "MH", nav links (Home, About, Skills, Projects, Contact), theme toggle, mobile menu button.
- ☐ Hero built from the owner's mock-up `hero-section.jpeg` (see [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) hero card and [docs/CONTENT.md](docs/CONTENT.md#home)): eyebrow, name, teal tagline, chips, location, **Explore My Journey** and **Contact Me**. Original brief items: name, role line ("B.Sc. EEE Student · Jamalpur Science & Technology University"), short intro, career goal / professional identity line, profile photo (optimised, see [docs/SEO_AND_PERFORMANCE.md](docs/SEO_AND_PERFORMANCE.md#images)).
- ☐ Also provide **Download CV** (`assets/cv/…pdf`, `download` attribute) and **Contact Me** (anchors to `#contact`). **Owner** supplies the CV.
- ☐ GitHub and LinkedIn icon links (`rel="noopener noreferrer"`, `aria-label`). **Owner** supplies URLs; hide the icon until a URL exists.
- ☐ Skip link ("Skip to content") as the first focusable element.

**Accept:** hero fits the first viewport at 360 px and 1280 px; LCP element is the hero image or heading; no layout shift.

## P3 — About Me & Education (Step 2)

- ☐ About copy from [docs/CONTENT.md](docs/CONTENT.md#about-me) plus the "My Vision" pull-quote.
- ☐ Info panel: name, university, department, academic level, degree, session, location. Email and phone per the privacy decision.
- ☐ Education timeline: B.Sc. EEE (JSTU, 2024–present) now; **Owner** adds SSC/HSC (or equivalent) institutions, years and results if they want them shown.
- ☐ Academic achievements, career goals, university activities and experiences: render only what the owner supplies; otherwise omit the sub-block (no empty headings).

**Accept:** section reads well without JS; timeline is a semantic ordered list.

## P4 — Skills & Achievements (Step 3)

- ☐ `content/skills.json` with categories **Programming**, **Web Development**, **Engineering Tools** (confirmed: HTML, CSS, MATLAB; others per owner).
- ☐ Interactive skill badges: category filter chips (All / Programming / Web / Engineering Tools) as a plain button group with `aria-pressed`; badge hover/focus reveals a one-line description.
- ☐ Honest proficiency display: levels such as *Learning / Comfortable / Proficient* instead of fake percentage bars.
- ☐ Certifications, awards, achievements as cards (`content/achievements.json`). **Owner** supplies items.
- ☐ Leadership and volunteer experience block. **Owner** supplies items.

**Accept:** filtering is keyboard-operable, announces result count via `aria-live="polite"`, works with JS disabled (all badges visible).

## P5 — Projects & Research (Step 4)

- ☐ `content/projects.json` (schema in [docs/CONTENT.md](docs/CONTENT.md#project-schema)): title, summary, category (`web | hardware | analysis`), image, tech tags, links (live demo, source), year, featured.
- ☐ Project cards: image (with `alt`), description, technology tags, **Live Demo** and **GitHub** buttons (rendered only when the URL exists).
- ☐ Filter bar: **All / Web / Hardware / Analysis** with count and empty-state message.
- ☐ Research & publications list: papers, lab reports (`content/research.json`).
- ☐ Blog / technical articles list (title, date, summary, link). Start as a simple list; no CMS.
- ☐ Starter project ideas for the owner, if they have none yet (label as ideas, never display as done work): MATLAB RLC circuit simulation, Arduino-based sensor monitor, this portfolio itself (genuine, can be shown).

**Accept:** each filter shows only matching cards; no card has a dead link; images are lazy-loaded with dimensions.

## P6 — Contact (Step 5)

- ☐ Email link, phone (per privacy decision), location, social links.
- ☐ Form: name, email, message (+ hidden honeypot field), labels, `autocomplete`, `required`, client validation with inline error text linked via `aria-describedby`.
- ☐ `form.js`: `fetch` POST to the Formspree endpoint (`Accept: application/json`), disabled-while-sending state, success and error messages in an `aria-live` region; works as a normal POST fallback without JS.
- ☐ **Contact Me** submit button; basic client rate limit (no double-submit).
- ☐ **Owner** creates the Formspree form and gives the form ID ([docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#formspree)).

**Accept:** real test message arrives in the owner's inbox; spam honeypot blocks a scripted submit; error path shown when offline.

## P7 — Modern design & interactions (Step 6)

- ☐ `theme.js`: toggle, `localStorage` persistence in try/catch, respects system preference, updates `<meta name="theme-color">`, accessible name reflects current state.
- ☐ `reveal.js`: IntersectionObserver fade/slide-in; content visible by default if JS fails or reduced motion is set.
- ☐ `nav.js`: mobile menu with focus management and Esc to close; active-link highlight while scrolling.
- ☐ Responsive polish at 360 / 768 / 1024 / 1280 / 1920 px; touch targets ≥ 44 px.
- ☐ Subtle hero background (CSS gradient or inline SVG circuit-trace motif that fits EEE); no heavy canvas/WebGL.
- ☐ Footer with copyright year, back-to-top link and social links.

**Accept:** no horizontal scroll at 320 px; animations disabled under `prefers-reduced-motion`; no theme flash on reload.

## P8 — SEO, metadata, audits

Source: [docs/SEO_AND_PERFORMANCE.md](docs/SEO_AND_PERFORMANCE.md), [docs/ACCESSIBILITY_AND_QA.md](docs/ACCESSIBILITY_AND_QA.md).

- ☐ Title, description, canonical, Open Graph and Twitter Card tags, `og:image` (1200×630) generated from brand colours plus the photo.
- ☐ Custom favicon set (SVG + 32 px ICO + 180 px apple-touch + manifest icons), `manifest.webmanifest`.
- ☐ JSON-LD `Person`, `sitemap.xml`, `robots.txt`, `404.html`.
- ☐ Image pipeline run (WebP/AVIF + JPEG, `srcset`).
- ☐ Strict CSP `<meta>` (see [docs/SECURITY_AND_PRIVACY.md](docs/SECURITY_AND_PRIVACY.md)).
- ☐ Run Lighthouse (mobile + desktop), axe/pa11y, validate HTML, test with the social-preview debuggers after deploy.

**Accept:** Lighthouse ≥ 95 in all four categories; zero axe violations; HTML validates.

## P9 — Deploy (Step 7)

Source: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

- ☐ Create GitHub repo (`<username>.github.io` for a root URL, or a named repo with a base-path check).
- ☐ `.github/workflows/deploy.yml` using `actions/configure-pages`, `upload-pages-artifact`, `deploy-pages`.
- ☐ Enable Pages (Source: GitHub Actions); verify HTTPS.
- ☐ Fill the canonical/OG absolute URLs with the real domain; re-run P8 checks against production.
- ☐ Add the live link to the GitHub repo "About" box and the owner's LinkedIn.

**Accept:** production URL loads over HTTPS, form works from the live origin, OG preview renders on a share test.

---

## Requirement coverage (basic-info.txt → tasks)

| Brief item | Phase |
|---|---|
| Step 1: name, picture, intro, career goals, CV + Contact buttons, GitHub/LinkedIn | P2 |
| Step 2: personal info, university/department/qualifications, achievements, activities | P3 |
| Step 3: skills (HTML, CSS, MATLAB…), categories, certifications/awards, leadership/volunteer | P4 |
| Step 4: project cards, tech tags, Live Demo/GitHub, research, blog | P5 |
| Step 5: email/social, form fields, Contact Me button, Formspree/EmailJS | P6 |
| Step 6: dark/light, smooth scroll animations, responsive, interactive badges, project filters, favicon, OG tags | P1, P4, P5, P7, P8 |
| Step 7: HTML/CSS/JS, GitHub, GitHub Pages | P0, P9 |
| About Me text, Address section | P3, P6 |
| Reference portfolio style | P1, P2, P7 |

## Risks

| Risk | Mitigation |
|---|---|
| Owner content not ready | Sections hide when data is empty; ship progressively |
| ID documents leak into repo | P0 first; `.gitignore`; CI grep guard |
| Spam to the public email/phone | Form-first contact, honeypot, optional obfuscation |
| Performance regressions | Lighthouse CI gate and byte budgets |
