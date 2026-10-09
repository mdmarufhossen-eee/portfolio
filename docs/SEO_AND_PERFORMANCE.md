# SEO and Performance

## Metadata (in `<head>` of `index.html`)

```html
<title>Md. Maruf Hossen — EEE Student at JSTU</title>
<meta name="description" content="Portfolio of Md. Maruf Hossen, EEE undergraduate at Jamalpur Science &amp; Technology University: projects, skills and contact.">
<link rel="canonical" href="https://<username>.github.io/">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)">

<meta property="og:type" content="website">
<meta property="og:title" content="Md. Maruf Hossen — EEE Student">
<meta property="og:description" content="Projects, skills and contact for an EEE undergraduate at JSTU.">
<meta property="og:url" content="https://<username>.github.io/">
<meta property="og:image" content="https://<username>.github.io/assets/img/og-1200x630.jpg">
<meta property="og:image:alt" content="Md. Maruf Hossen, EEE student portfolio">
<meta name="twitter:card" content="summary_large_image">
```

- Open Graph image: 1200×630, < 300 KB, JPEG/PNG (not WebP, since some crawlers reject it), absolute URL, text readable at thumbnail size.
- The placeholder `<username>` is replaced during P9. Until then, relative OG URLs do not work, so do the social-preview test only after deployment.
- Test with Facebook Sharing Debugger, LinkedIn Post Inspector, and X/Twitter card validator (re-scrape after changes).

## Favicon and manifest

- `assets/icons/favicon.svg` (monogram "MH", supports dark mode via `prefers-color-scheme` inside the SVG), `favicon.ico` (32×32), `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png`.
- `manifest.webmanifest`: `name`, `short_name`, `icons`, `theme_color`, `background_color`, `display: "browser"`.

## Structured data

JSON-LD `Person`, as an inline `<script type="application/ld+json">` block. This is the one permitted inline script: data blocks are never executed, so it does not conflict with a strict `script-src`.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Md. Maruf Hossen",
  "url": "https://<username>.github.io/",
  "image": "https://<username>.github.io/assets/img/maruf-800.jpg",
  "jobTitle": "Electrical & Electronic Engineering Student",
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Jamalpur Science & Technology University" },
  "address": { "@type": "PostalAddress", "addressLocality": "Jamalpur", "addressCountry": "BD" },
  "sameAs": ["<github url>", "<linkedin url>"]
}
```

Include only fields the owner has approved (omit `email`/`telephone` by default). Omit `sameAs` entries that don't exist.

## Crawl files

- `robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://<username>.github.io/sitemap.xml`.
- `sitemap.xml`: the root URL with `<lastmod>` (update on release).
- `404.html`: branded, links home.

## On-page SEO

- One `<h1>` (the name). Section titles are `<h2>`; cards `<h3>`.
- Descriptive link text ("View source on GitHub", not "click here").
- Meaningful `alt` text on all content images.
- `lang="en"` on `<html>`. If a Bangla version is ever added, use `hreflang`.

## Images

Source `maruf-image.jpeg` is 477×606 (≈ 77 KB).

| Output | Size | Use |
|---|---|---|
| `maruf-320.{avif,webp,jpg}` | 320 w | mobile hero |
| `maruf-477.{avif,webp,jpg}` | 477 w (native max) | desktop hero |
| `og-1200x630.jpg` | 1200×630 | social card |

- Generate with `sharp-cli` or Squoosh, as a documented one-off script in `scripts/images.mjs`. Never upscale the portrait; ask for a larger original if a bigger hero is wanted.
- Use `<picture>` with AVIF → WebP → JPEG, `width`/`height`, `fetchpriority="high"` on the hero image, `decoding="async"`.
- Project images: 400/800 px wide WebP, ≤ 80 KB, `loading="lazy"`.
- Strip EXIF metadata (including GPS) from every published image.

## Performance budgets

| Metric | Budget |
|---|---|
| Lighthouse Performance (mobile) | ≥ 95 |
| LCP | < 2.0 s (4G, mid-range phone) |
| CLS | < 0.05 |
| INP / TBT | < 200 ms / < 150 ms |
| HTML + CSS + JS transferred (gzip) | ≤ 100 KB |
| Fonts | ≤ 2 families, WOFF2, subset to Latin (+ Bengali only if used) |
| Third-party requests | 0 (except Formspree on submit) |
| Requests on first load | ≤ 25 |

Tactics: critical CSS is small enough to load as-is (no inlining needed); `preload` the primary font and hero image; `defer`/module scripts; avoid layout shifts with explicit dimensions and `font-display: swap` plus `size-adjust` fallback metrics. GitHub Pages does not let you set `Cache-Control`, so rely on its default caching and add a `?v=` query string to CSS/JS URLs on each release.

Enforce via `lighthouserc.json` assertions (`categories:performance ≥ 0.95`, `resource-summary:script:size`, etc.) in CI.

## Analytics

None by default (privacy and speed). If the owner wants visit counts later, use a cookieless option (Plausible/GoatCounter) and update the CSP and privacy notes.
