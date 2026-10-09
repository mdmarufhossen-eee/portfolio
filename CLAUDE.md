# CLAUDE.md — Portfolio of Md. Maruf Hossen

Guidance for Claude Code (and any human contributor) working in this repository. Read this first, then the doc that matches your task (see [Doc map](#doc-map)).

## Project overview

A static, single-page personal portfolio for **Md. Maruf Hossen**, a B.Sc. EEE student at Jamalpur Science & Technology University (JSTU), Bangladesh. It is modelled on the structure of the reference site `https://saidul-islam-portofolio.vercel.app/` (EEE student portfolio). Take the section flow from the reference, not its code or copy. The hero look is fixed by the owner's mock-up `hero-section.jpeg` (dark navy, teal accent). Hosting is GitHub Pages.

Sections, in order: **Home → About & Education → Skills & Achievements → Projects & Research → Contact**. Cross-cutting: dark/light theme, scroll animations, responsive layout, project filtering, SEO/Open Graph.

## Stack (fixed — do not add frameworks)

| Concern | Choice |
|---|---|
| Markup | Semantic HTML5, one `index.html` |
| Styling | Hand-written CSS with custom-property design tokens, no preprocessor |
| Behaviour | Vanilla ES modules (`type="module"`), no bundler, no runtime dependencies |
| Content | JSON in `content/`, rendered by small JS modules (progressive enhancement: key content also present in HTML) |
| Form | Formspree (EmailJS is the fallback) |
| Hosting / CI | GitHub Pages via GitHub Actions |
| Dev tooling only | Node 20+, Prettier, ESLint, Stylelint, html-validate, Lighthouse CI, pa11y/axe |

If a task seems to need a framework or runtime dependency, stop and ask the owner.

## Owner facts (public-safe)

Facts below come from `basic-info.txt`. Canonical copy lives in [docs/CONTENT.md](docs/CONTENT.md).

- Name: Md. Maruf Hossen
- Degree: B.Sc. in Electrical & Electronic Engineering, 2nd year 1st semester, session 2024–present
- Location: Jamalpur, Bangladesh
- Email: mdmarufhossen995@gmail.com
- Phone: see [docs/SECURITY_AND_PRIVACY.md](docs/SECURITY_AND_PRIVACY.md) before showing it publicly
- Vision: "To transform knowledge into practical solutions and contribute to a smarter, more sustainable technological future."

## Hard rules

1. **Never publish, reference, commit, or read the ID documents** (`ID-card-front.jpeg`, `ID-card-back.jpeg`, `nid-maruf.pdf`). They are national ID scans. They are git-ignored and must be moved out of the project folder. Do not copy any data from them into any file.
2. **Never fabricate content.** No invented projects, certificates, awards, publications, metrics, GitHub/LinkedIn URLs or job history. Missing facts are `TODO(owner)` markers in `content/*.json` and `docs/CONTENT.md`. Placeholders must not render on the live site (the build check fails if `TODO` appears in `index.html` output).
3. **No secrets in the repo.** The Formspree form ID is public by design; nothing else is.
4. **Accessibility is not optional.** WCAG 2.2 AA; every interactive feature works by keyboard and respects `prefers-reduced-motion`.
5. **No inline JS or inline styles** in HTML (a strict CSP depends on this).

## Directory layout

```
portfolio/
├── index.html
├── 404.html
├── assets/
│   ├── img/            # optimised images (WebP/AVIF + JPEG fallback)
│   ├── icons/          # favicon set, social icons (SVG)
│   └── cv/             # Maruf-Hossen-CV.pdf (owner supplies)
├── css/
│   ├── tokens.css      # colours, type, spacing, motion (light + dark)
│   ├── base.css        # reset, typography, focus styles
│   ├── layout.css      # container, grid, section rhythm
│   ├── components.css  # nav, buttons, cards, badges, chips, form
│   └── utilities.css
├── js/
│   ├── main.js         # entry point, wires modules
│   ├── theme.js        # dark/light toggle + persistence
│   ├── nav.js          # mobile menu, active-section highlight
│   ├── filter.js       # project + skill filtering
│   ├── reveal.js       # IntersectionObserver scroll animations
│   ├── render.js       # JSON → DOM for projects/skills/achievements
│   └── form.js         # Formspree submit, validation, status messages
├── content/            # projects.json, skills.json, achievements.json, research.json
├── docs/               # see Doc map
├── .github/workflows/  # deploy.yml, ci.yml
├── sitemap.xml, robots.txt, manifest.webmanifest
├── CLAUDE.md, IMPLEMENTATION.md, README.md
└── .gitignore, .editorconfig, package.json (dev tooling only)
```

Full rationale: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Keep `basic-info.txt` as the owner's original brief. Do not edit it.

## Commands

```bash
npm install              # dev tooling only
npm run dev              # npx serve . -l 3000
npm run check            # dependency-free guards: TODO markers, inline JS/CSS, broken local links, JSON validity, ID-file guard
npm run images           # regenerate optimised images/icons (python3 + Pillow)
# planned (IMPLEMENTATION.md P0/P8): lint, format, lh, a11y
```

Owner settings (form endpoint, GitHub/LinkedIn, CV path) live in `js/config.js`.

## Conventions

- **HTML:** one `<h1>`; each section is `<section id aria-labelledby>`; landmarks `header/nav/main/footer`; images have meaningful `alt` (decorative → `alt=""`), explicit `width`/`height`, `loading="lazy"` except the hero image.
- **CSS:** all colours, spacing, radii and durations come from tokens in `tokens.css`; never hard-code a hex in components. Mobile-first `min-width` media queries. BEM-style class names (`.card`, `.card__title`, `.card--featured`). Dark theme is `[data-theme="dark"]` on `<html>`, with `prefers-color-scheme` as the default.
- **JS:** ES modules, `const`/`let`, no globals, no `innerHTML` with unescaped data (use `textContent`/DOM APIs or the escape helper in `render.js`). Each module exports `init()`; failures in one module must not break the others.
- **Naming:** files kebab-case, JSON keys camelCase, CSS custom properties `--color-*`, `--space-*`, `--radius-*`, `--font-*`, `--ease-*`, `--dur-*`.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `chore:`). One concern per commit.
- **Comments:** only where the reason isn't obvious from the code.

## Definition of done (every change)

- [ ] `npm run check` passes
- [ ] Works at 360, 768, 1280 and 1920 px widths, in light and dark theme
- [ ] Keyboard-only walkthrough works, with visible focus
- [ ] Lighthouse (mobile) ≥ 95 in Performance, Accessibility, Best Practices, SEO
- [ ] No console errors or warnings
- [ ] Docs updated if behaviour, structure or content schema changed

## Doc map

| Need | Read |
|---|---|
| Build order and acceptance criteria | [IMPLEMENTATION.md](IMPLEMENTATION.md) |
| Code structure, module contracts | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Colours, type, components, breakpoints | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) |
| All copy, JSON schemas, owner TODOs | [docs/CONTENT.md](docs/CONTENT.md) |
| Meta tags, images, performance budgets | [docs/SEO_AND_PERFORMANCE.md](docs/SEO_AND_PERFORMANCE.md) |
| A11y checklist, test matrix | [docs/ACCESSIBILITY_AND_QA.md](docs/ACCESSIBILITY_AND_QA.md) |
| Deploying to GitHub Pages, Formspree | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| Privacy, ID documents, form security | [docs/SECURITY_AND_PRIVACY.md](docs/SECURITY_AND_PRIVACY.md) |

## Working with the owner

The owner is a student building a professional first portfolio. Explain non-obvious choices briefly, ask before adding anything that needs their personal data, and list what they still need to supply after each phase.
