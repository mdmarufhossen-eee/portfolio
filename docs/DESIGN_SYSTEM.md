# Design System

Direction: clean, technical, confident. Dark navy surfaces with a teal accent, as in the owner's hero mock-up (`hero-section.jpeg`: navy card, teal heading and primary button, outlined secondary button, small rounded info chips, a status dot beside a mono eyebrow). Light theme mirrors it with white/slate surfaces and a deeper teal. Structure follows the reference portfolio; the identity is original.

Dark theme is the **primary design target** (matches the mock-up); light theme must be equally polished.

## Colour tokens

Values are starting points; verify each text/background pair with the contrast checker before shipping (targets: body text ≥ 4.5:1, large text and UI borders ≥ 3:1).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-bg` | `#ffffff` | `#0b1220` | page background |
| `--color-surface` | `#f4f6fa` | `#121a2b` | cards, panels |
| `--color-surface-2` | `#e8ecf4` | `#1a2438` | hover, chips |
| `--color-text` | `#0f172a` | `#e6eaf2` | body |
| `--color-text-muted` | `#475569` | `#a3aec2` | secondary text |
| `--color-border` | `#d5dbe7` | `#27324a` | dividers |
| `--color-accent` | `#0f766e` | `#2dd4bf` | headline highlight, links, primary buttons (teal) |
| `--color-accent-fill` | `#0f766e` | `#0f8a7e` | primary button background (white text on it) |
| `--color-accent-contrast` | `#ffffff` | `#ffffff` | text on accent fill |
| `--color-accent-2` | `#4338ca` | `#a5b4fc` | eyebrow label, secondary highlights (soft indigo) |
| `--color-success` | `#15803d` | `#4ade80` | form success |
| `--color-danger` | `#b91c1c` | `#f87171` | form error |
| `--color-focus` | `#0f766e` | `#5eead4` | focus ring (2 px + 2 px offset) |

Never convey meaning by colour alone (errors also get an icon/text).

## Typography

- Families (self-hosted variable WOFF2): **Inter** for UI/body, **JetBrains Mono** for small technical labels/tags. System fallback stack `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Fluid scale with `clamp()`:

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 0.8125rem | tags, captions |
| `--text-sm` | 0.9375rem | secondary |
| `--text-base` | 1rem–1.0625rem | body |
| `--text-lg` | 1.25rem | lead paragraph |
| `--text-xl` | clamp(1.5rem, 1.2rem + 1.2vw, 2rem) | section subheads |
| `--text-2xl` | clamp(2rem, 1.4rem + 2.4vw, 3rem) | section titles |
| `--text-hero` | clamp(2.5rem, 1.6rem + 4vw, 4.25rem) | hero name |

Line height 1.6 body, 1.15–1.25 headings. Max line length 70ch.

## Spacing, radius, elevation

- Spacing (4 px base): `--space-1` 0.25rem, `-2` 0.5, `-3` 0.75, `-4` 1, `-6` 1.5, `-8` 2, `-12` 3, `-16` 4, `-24` 6rem.
- Section vertical padding: `--space-16` mobile, `--space-24` desktop.
- Radius: `--radius-sm` 6px, `--radius-md` 12px, `--radius-lg` 20px, `--radius-pill` 999px.
- Shadow: `--shadow-sm`, `--shadow-md` (soft, low opacity; in dark mode use a border instead of heavy shadow).

## Motion

- Durations: `--dur-fast` 120ms, `--dur-base` 220ms, `--dur-slow` 500ms. Easing: `--ease-out: cubic-bezier(.2,.7,.2,1)`.
- Reveal: translateY(16px) + opacity, once per element.
- Animate only `transform` and `opacity`.
- Under `prefers-reduced-motion: reduce`: no reveal transforms, no smooth scroll, no parallax.

## Breakpoints (mobile-first)

| Name | min-width | Layout |
|---|---|---|
| base | 0 | single column |
| sm | 480px | larger gutters |
| md | 768px | 2-column grids, inline nav |
| lg | 1024px | hero split (text + photo), 3-column cards |
| xl | 1280px | container max 1120px |

Gutter: 16px (base), 24px (md+).

## Components

| Component | Spec |
|---|---|
| **Header/Nav** | Sticky, translucent surface with backdrop blur and bottom border on scroll; height 64px; links underline on hover; active link has accent colour + `aria-current="true"`. Mobile: menu button (44px), full-width sheet. |
| **Buttons** | Primary (accent fill), Secondary (outline), Ghost (icon). Min height 44px, radius `--radius-pill` or `--radius-md` (pick one and keep it); visible focus; disabled state. |
| **Hero card** (from mock-up) | Rounded panel (`--radius-lg`) on `--color-surface`: status dot + mono eyebrow "EEE STUDENT · FUTURE ENGINEER"; name in display weight; teal tagline "Engineering Ideas Into Reality."; one-sentence degree line; two chips ("2nd Year · 1st Semester", "Session 2024–Present"); divider; location with pin icon; buttons **Explore My Journey ↗** (primary, teal) and **Contact Me** (outlined); mono footer label "PERSONAL PORTFOLIO · 2026". Portrait sits beside the card on desktop and above it on mobile. Mock-up decorative script font is **not** adopted; use Inter for legibility. |
| **Hero (layout)** | Left: eyebrow ("EEE Undergraduate"), name, role, short intro, two buttons, social icons. Right: portrait in rounded frame (aspect 4:5) with a subtle accent ring/gradient. Stacks on mobile with portrait first or second (decide in P2; text must reach LCP quickly). |
| **Section header** | Eyebrow label (mono, accent), title, one-line description. |
| **Card** | Surface bg, border, radius-md, padding space-6; hover lifts 2px and brightens border (not on touch). |
| **Project card** | 16:10 image, category label, title, summary (3 lines clamp), tech tag list, action row (Live Demo, GitHub). |
| **Skill badge** | Pill, mono text, icon optional; hover/focus shows tooltip-free inline description below the group (no hover-only information). |
| **Filter chips** | Button group; selected = filled accent; `aria-pressed`; count in a visually-hidden live region. |
| **Timeline** | Vertical line, dots, year labels; collapses to left-aligned list on mobile. |
| **Form** | Visible labels (not placeholder-only), 44px+ inputs, inline error text, success banner. |
| **Footer** | Copyright, quick links, social icons, back-to-top. |

## Iconography and imagery

- Inline SVG icons (GitHub, LinkedIn, Mail, Phone, Download, Sun, Moon, Menu, External-link), 20/24px, `currentColor`, `aria-hidden` when paired with text.
- Photography: use the supplied professional portrait; crop for 4:5 focus on face; no filters.
- Project images: consistent 16:10 crop, ≤ 80 KB each after optimisation.

## Do / Don't

- Do keep one accent colour used sparingly. Don't add gradients on every surface.
- Do use real content. Don't use lorem ipsum or stock "skill percentage" bars.
- Do test both themes at every step. Don't invert colours naively; dark mode uses the dedicated tokens.
