# Security and Privacy

## 1. Identity documents (highest priority)

The project folder currently contains scans of a national ID card and a PDF of the same (`ID-card-front.jpeg`, `ID-card-back.jpeg`, `nid-maruf.pdf`). These contain government identity data and **must never be published, committed or used as site content**. The portfolio needs none of them, and the documentation deliberately does not reproduce anything from them.

Actions (owner confirms; Claude must not delete user files unasked):

1. Move the three files to a private location outside the project, e.g. `mkdir -p ~/private/identity && mv ID-card-* nid-maruf.pdf ~/private/identity/`.
2. Keep the `.gitignore` entries (`ID-card-*`, `nid-*`, `*.nid.*`) as a second line of defence.
3. Do this **before** `git init`. If they were ever committed, deleting them is not enough because git history keeps them; recreate the repo or rewrite history (`git filter-repo`) and treat the ID as exposed (contact the issuing authority if it was public).
4. CI guard: fail the build if tracked files match `id-card|nid` or if any published PDF other than the CV exists.
5. Do not paste ID numbers, date of birth, parents' names or address from the ID anywhere on the site.

## 2. Public contact details

Everything on a public portfolio will be scraped. Decide per item:

| Item | Recommendation |
|---|---|
| Name, university, department, city/country | Show (needed for the purpose) |
| Email `mdmarufhossen995@gmail.com` | Show as a `mailto:` link in the contact section only. Do not repeat in meta/JSON-LD. Spam is the main risk; a Gmail address with its built-in filtering is acceptable |
| Phone `+880 1861197995` | **Default: do not show.** Phone numbers attract spam, scams and SIM-related fraud. If the owner insists, show it only as a `tel:` link in the contact section, never in JSON-LD or meta |
| Home address, date of birth, ID numbers, family info | Never |
| Photo | Fine (owner supplied a professional portrait); strip EXIF/GPS before publishing |

Optional email obfuscation: render the address from two data attributes in JS at runtime (stops naive scrapers; has a no-JS fallback via the form).

## 3. Contact form

- Honeypot field (hidden by CSS, `tabindex="-1"`, `aria-hidden="true"`, `autocomplete="off"`); reject or silently drop submissions where it is filled.
- Formspree spam filtering and domain restriction on.
- Validate client-side for UX only; Formspree validates on the server side.
- No personal data is stored by the site itself. Mention in the page footer or form note that messages are processed by Formspree.
- Avoid putting any secret or API key in the repository; the Formspree ID is public, and that is acceptable.

## 4. Content Security Policy

GitHub Pages cannot set HTTP headers, so use a `<meta http-equiv="Content-Security-Policy">` in `<head>` (note: `frame-ancestors`, `report-uri` and `sandbox` are ignored in meta CSP).

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self';
           script-src 'self';
           style-src 'self';
           img-src 'self' data:;
           font-src 'self';
           connect-src 'self' https://formspree.io;
           form-action https://formspree.io;
           base-uri 'self';
           object-src 'none'">
```

- Consequences: no inline `<script>` (except JSON-LD data) and no inline `<style>` or `style=""` attributes; use classes and CSS custom properties set from JS via `element.style.setProperty` (allowed, as this is CSSOM, not an inline attribute in markup).
- Clickjacking cannot be prevented via meta CSP on Pages; accept the risk or add a small framebuster-free design (no sensitive actions on the site, so the impact is low).
- Re-test the CSP with the browser console after each change; add any new origin deliberately.

## 5. Link and script hygiene

- External links: `rel="noopener noreferrer"` (+ `target="_blank"` only when needed).
- No third-party JS, trackers, embedded iframes or CDN-hosted assets (fonts, icons, libraries are self-hosted).
- Dependencies are dev-only; run `npm audit` and keep Dependabot enabled for `npm` and `github-actions`.
- No `eval`, no `document.write`, no `innerHTML` with data.
- Use `textContent`/DOM construction for JSON-driven content, so a typo in a JSON file can never inject markup.

## 6. Repository and account

- Enable 2FA on the GitHub account and on the email used for Formspree.
- Protect `main` (require PR + CI) once collaborators exist; for solo use, at least no force-push.
- Add a `SECURITY.md` only if the repo accepts outside reports; not needed initially.
- Don't commit `.env` or editor/OS files (covered by `.gitignore`).

## 7. Privacy notice (footer, one line)

"This site uses no cookies or trackers. Messages sent through the contact form are delivered via Formspree."

(Theme preference is stored in `localStorage` on the visitor's device only and is never transmitted.)
