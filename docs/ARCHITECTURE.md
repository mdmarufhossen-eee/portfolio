# Architecture

Static site, no build step. Everything served from the repository root by GitHub Pages.

## Principles

1. **Progressive enhancement.** Core content is in `index.html` and readable with JS off. JS adds filtering, theme toggle, animations and rendering of lists.
2. **Data-driven lists.** Projects, skills, achievements and research live in `content/*.json`; editing content never means editing markup.
3. **Small, isolated modules.** Each JS module exports `init()`, owns one concern, and fails safely.
4. **Tokens over literals.** Every visual value comes from `css/tokens.css`.

## File tree

See [CLAUDE.md](../CLAUDE.md#directory-layout) for the canonical tree.

## CSS layering

Load order in `<head>` (separate files, preloaded/critical-first; total budget in [SEO_AND_PERFORMANCE.md](SEO_AND_PERFORMANCE.md)):

| Layer | File | Contains |
|---|---|---|
| 1 | `tokens.css` | `:root` custom properties; `[data-theme="dark"]` overrides; `@media (prefers-color-scheme: dark)` for `:root:not([data-theme="light"])` |
| 2 | `base.css` | reset, element defaults, focus ring, reduced-motion |
| 3 | `layout.css` | container, sections, grids |
| 4 | `components.css` | one block per component, BEM names |
| 5 | `utilities.css` | `.visually-hidden`, `.stack`, `.text-center` |

Use `@layer reset, tokens, base, layout, components, utilities;` to make precedence explicit.

## JavaScript modules

| Module | Responsibility | Inputs | Notes |
|---|---|---|---|
| `theme-init.js` | Set `data-theme` before first paint | `localStorage`, system preference | Tiny, blocking, in `<head>`; try/catch around storage |
| `main.js` | Entry; imports and calls each `init()` inside try/catch | — | Logs a single warning per failed module |
| `theme.js` | Toggle button, persistence, `theme-color` meta | `#theme-toggle` | `aria-pressed`/label updated |
| `nav.js` | Mobile menu, scroll-spy, Esc/focus trap | `header nav` | IntersectionObserver for active link |
| `render.js` | Fetch JSON, build cards/badges safely | `content/*.json` | Uses DOM APIs, never raw `innerHTML` with data |
| `filter.js` | Category filtering for skills and projects | `[data-filter-group]` | Updates `aria-pressed`, `aria-live` count |
| `reveal.js` | Scroll reveal | `[data-reveal]` | No-op when reduced motion |
| `form.js` | Validation + Formspree submit | `#contact-form` | Status in `aria-live` region |

### Contracts

- A module must not read another module's DOM; shared state goes through `data-*` attributes or custom events (`theme:change`).
- Modules must be idempotent (safe if `init()` is called twice).
- `fetch` of local JSON uses relative URLs so the site works under a repo sub-path.

## Data flow

```
content/*.json ──fetch──► render.js ──► DOM cards ──► filter.js / reveal.js enhance
index.html (static fallback content) ─────────────────────────────────────────┘
```

For SEO, the hero, About, and section headings are static HTML. Lists rendered from JSON are also acceptable to crawlers (Google executes JS) but include a short static summary in each section.

## Hardening and failure handling

- Any `fetch` failure shows a visible, polite message inside the list container ("Projects could not be loaded. Please refresh.") and does not throw.
- `localStorage` access is always wrapped in try/catch.
- No third-party scripts. The only external network call is the Formspree POST.

## Decisions record

| Decision | Reason | Revisit if |
|---|---|---|
| No framework/bundler | Tiny site, zero maintenance, ideal for GitHub Pages | Content pages exceed ~10 or need a blog engine → consider Astro |
| JSON content | Owner edits data, not HTML | A CMS is needed |
| Self-hosted fonts | Privacy, speed, no third-party | — |
| Formspree | No backend, free tier | Volume or privacy needs change |
