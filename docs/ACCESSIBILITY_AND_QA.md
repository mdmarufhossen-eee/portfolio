# Accessibility and QA

Target: **WCAG 2.2 Level AA**, plus the automated gates listed at the end.

## Accessibility checklist

**Structure**
- ☐ `lang="en"`, unique `<title>`, one `<h1>`, no skipped heading levels
- ☐ Landmarks: `header`, `nav` (labelled), `main`, `footer`
- ☐ "Skip to content" link is first in tab order and visible on focus
- ☐ Each `section` is labelled by its heading

**Keyboard and focus**
- ☐ Everything reachable and operable by keyboard; logical tab order
- ☐ `:focus-visible` ring ≥ 3:1 contrast, never removed (WCAG 2.4.11/2.4.13)
- ☐ Mobile menu: opens/closes with Enter/Space/Esc, returns focus to the trigger
- ☐ Filters are buttons with `aria-pressed`; results announced via polite live region
- ☐ Targets ≥ 24×24 CSS px minimum (we use 44 px) (WCAG 2.5.8)

**Visual**
- ☐ Contrast: text ≥ 4.5:1, large text/UI ≥ 3:1 in **both** themes
- ☐ Content reflows at 320 px with no horizontal scroll; zoom to 200% / text-spacing OK
- ☐ Colour is never the only signal (errors, active state, filters)
- ☐ `prefers-reduced-motion` disables reveal, smooth scroll and hover transforms

**Content**
- ☐ Alt text on informative images; decorative images `alt=""`
- ☐ Link text is meaningful; external links indicate they open a new tab (if `target="_blank"` is used) and carry `rel="noopener noreferrer"`
- ☐ Icon-only buttons have accessible names (`aria-label`)
- ☐ Theme toggle label states the action ("Switch to dark theme")

**Forms**
- ☐ Visible `<label>` for each field; `autocomplete="name|email"`; `type="email"`
- ☐ Errors identified in text, associated with `aria-describedby`, focus moves to the first invalid field
- ☐ Status messages in `role="status"` / `aria-live="polite"` (errors `role="alert"`)
- ☐ No CAPTCHA that blocks users; honeypot is hidden with CSS **and** `aria-hidden`, `tabindex="-1"`

## Browser and device matrix

| Platform | Browsers |
|---|---|
| Android (mid-range, 360×800) | Chrome, Samsung Internet, Firefox |
| iOS (390×844) | Safari |
| Desktop (Windows/Linux/macOS) | Chrome, Firefox, Edge, Safari (latest 2 versions) |
| Viewports | 320, 360, 768, 1024, 1280, 1920 px; landscape phone |

Also test: Slow 4G throttling, offline (form error path), print preview (optional print stylesheet), forced-colors mode, 200% zoom, dark and light themes.

## Manual test script

1. Load the page with cache cleared; no flash of wrong theme; no console messages.
2. Tab through the whole page; every control shows focus; skip link works.
3. Toggle theme; reload; preference persists. Change OS theme with no saved preference; the page follows.
4. Scroll: sections reveal once; nav highlight tracks the section; with reduced-motion enabled nothing animates.
5. Skills: each chip filters and the count updates; "All" resets.
6. Projects: Web / Hardware / Analysis filters show the right cards; empty state text appears for an empty category; every Live Demo/GitHub link opens correctly.
7. Download CV: file downloads and opens.
8. Contact: submit empty (errors shown), invalid email (error), valid (success message + email received), double-click submit (one message), offline (error message).
9. Disable JavaScript: page content is still readable; the form still posts.
10. Share the URL in a chat/LinkedIn preview: the correct title, description and image appear.

## Automated gates (CI)

| Tool | Gate |
|---|---|
| html-validate | 0 errors |
| Stylelint / ESLint / Prettier | 0 errors |
| pa11y-ci or axe-core (Playwright) | 0 violations on light and dark themes |
| Lighthouse CI (mobile) | Performance, Accessibility, Best Practices, SEO ≥ 0.95 |
| markdown-link-check + internal link/anchor check | 0 broken |
| Guard script | no `TODO(`, no `ID-card`/`nid-` files tracked, no `console.log` in `js/` |

Automated tools catch roughly a third of accessibility issues; the manual script above remains mandatory before each release.

## Release checklist

☐ `npm run check` ☐ Manual script complete ☐ Lighthouse report saved in PR ☐ Content approved by owner ☐ Sitemap `lastmod` updated ☐ Tag the release (`v1.0.0`)
