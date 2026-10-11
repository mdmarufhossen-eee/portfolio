# Content — single source of truth

All copy lives here first, then in `index.html` / `content/*.json`. Source: `basic-info.txt` (owner's brief). Lines marked **TODO(owner)** are unknown and must not be invented.

## Identity

| Field | Value |
|---|---|
| Name | Md. Maruf Hossen |
| Display short | Maruf Hossen |
| Role line | Electrical & Electronic Engineering Student |
| Institution | Jamalpur Science & Technology University (JSTU), Bangladesh |
| Degree | B.Sc. in Electrical & Electronic Engineering |
| Level | 2nd Year, 1st Semester |
| Session | 2024–Present |
| Location | Jamalpur, Bangladesh |
| Email | mdmarufhossen995@gmail.com |
| Phone | +880 1861197995, approved for display as a `tel:` link in the contact section only (see [SECURITY_AND_PRIVACY.md](SECURITY_AND_PRIVACY.md#public-contact-details)) |
| GitHub | TODO(owner) |
| LinkedIn | TODO(owner) |
| Facebook | TODO(owner): profile URL |
| CV file | `cv.pdf` (repository root; owner supplies the PDF) |
| Profile photo | `maruf-image.jpeg` (477×606; upscale not possible, so use at ≤ 477 px wide or ask for a higher-resolution original) |

## Home

Wording follows the owner's hero mock-up (`hero-section.jpeg`):

- **Eyebrow (with status dot):** EEE STUDENT · FUTURE ENGINEER
- **Headline:** Md. Maruf Hossen
- **Tagline (accent colour):** Engineering Ideas Into Reality.
- **Degree line:** B.Sc. in Electrical & Electronic Engineering at Jamalpur Science & Technology University.
- **Chips:** 2nd Year · 1st Semester | Session 2024–Present
- **Location:** Jamalpur, Bangladesh
- **Footer label:** PERSONAL PORTFOLIO · 2026
- **Primary button:** Explore My Journey ↗ (scrolls to #about)
- **Intro (draft, owner to approve):** I'm passionate about electrical engineering, electronics and programming. I turn what I learn into practical solutions through coursework and hands-on projects.
- **Career goal / identity (draft):** Aspiring electrical engineer building a strong foundation in circuits, machines, electronics and MATLAB, and growing toward innovative, sustainable technology.
- **Buttons:** Explore My Journey · Contact Me · Download my CV (secondary; opens and downloads `cv.pdf` from the repository root)
- **Social:** GitHub · LinkedIn

## Hobbies

- **Traveling:** The owner enjoys traveling and exploring places across Bangladesh.
- Places visited: TODO(owner)

## About Me

> Hello! I'm Md. Maruf Hossen, an undergraduate student pursuing a B.Sc. in Electrical & Electronic Engineering (EEE) at Jamalpur Science & Technology University, Bangladesh.
>
> I am passionate about electrical engineering, electronics, programming, and emerging technologies. I enjoy exploring engineering concepts, solving technical problems, and developing practical skills through academic coursework and hands-on projects.
>
> Currently, I am building my foundation in electrical circuits, electrical machines, electronics, MATLAB, and programming while continuously exploring opportunities to learn, innovate, and grow as an engineer.

**My Vision:** To transform knowledge into practical solutions and contribute to a smarter, more sustainable technological future.

Info panel fields: Name · University · Department · Academic level · Degree · Session · Location (· Email · Phone per privacy decision).

## Education

| Period | Institution | Qualification | Notes |
|---|---|---|---|
| 2024–Present | Jamalpur Science & Technology University | B.Sc. in EEE (2nd year, 1st semester) | CGPA: TODO(owner, optional) |
| TODO(owner) | Higher secondary (HSC/equivalent) | TODO | optional |
| TODO(owner) | Secondary (SSC/equivalent) | TODO | optional |

Also optional, from the owner: academic achievements (scholarships, merit lists), relevant coursework (the brief names: electrical circuits, electrical machines, electronics), university clubs/activities, career goals expanded.

## Skills taxonomy

Brief confirms: HTML, CSS, MATLAB "and others". Categories: Programming, Web Development, Engineering Tools.

| Category | Confirmed by brief | Suggested, **owner must confirm each** |
|---|---|---|
| Programming | MATLAB | C, Python |
| Web Development | HTML, CSS, JavaScript (used to build this site) | Git & GitHub, Responsive design |
| Engineering Tools | MATLAB (also here) | Proteus, LTspice, Multisim, Arduino, AutoCAD Electrical, MS Office |
| Core engineering (coursework) | Electrical circuits, electrical machines, electronics | Digital logic, signals & systems |

Levels: not shown in v1 (no percentages or self-ratings); each badge has a short factual description instead.

## Skill JSON schema (`content/skills.json`)

```json
[
  {
    "name": "MATLAB",
    "category": "programming | web | tools",
    "level": "learning | comfortable | proficient",
    "description": "One short factual sentence.",
    "icon": "optional icon file name"
  }
]
```

## Achievements, certifications, leadership

All **TODO(owner)**. Schema (`content/achievements.json`):

```json
[
  {
    "type": "certification | award | leadership | volunteer | activity",
    "title": "",
    "issuer": "",
    "date": "YYYY-MM",
    "description": "",
    "url": "optional verification link"
  }
]
```

If the owner has none yet, omit the section's cards and show nothing rather than placeholders; leadership/volunteer sections hide entirely.

## Project schema

`content/projects.json`:

```json
[
  {
    "id": "kebab-case-id",
    "title": "",
    "category": "web | hardware | analysis",
    "summary": "≤ 160 characters, outcome-focused.",
    "description": "optional, 2–4 sentences: problem, approach, result.",
    "image": "assets/img/projects/<name>-800.webp",
    "imageAlt": "",
    "tags": ["MATLAB", "Arduino"],
    "links": { "demo": "optional URL", "source": "optional URL" },
    "year": 2026,
    "featured": false
  }
]
```

Rules: no entry without real work behind it; `links.*` omitted if not available; categories drive the Web / Hardware / Analysis filter.

Project ideas to help the owner begin (these are suggestions, not content to publish until built):
- **Analysis:** MATLAB simulation of series/parallel RLC response; Fourier-series visualiser; power-factor correction calculation sheet.
- **Hardware:** Arduino temperature/humidity monitor; LED dimmer using PWM; simple regulated power supply (with measured results).
- **Web:** this portfolio; an Ohm's-law/resistor-colour-code calculator.

## Research & articles

`content/research.json` (papers, lab reports) and a simple blog list: `title`, `type` (`paper | lab-report | article`), `date`, `summary`, `url`/`pdf`. **TODO(owner).** Lab reports may be linked as PDFs only if the university permits.

## Contact section copy

- Heading: "Let's connect"
- Sub: "Have a question, an opportunity or a project idea? Send me a message and I'll get back to you."
- Form: Name · Email · Message · **Contact Me** (submit)
- Success: "Thanks! Your message was sent. I'll reply soon."
- Error: "Something went wrong. Please try again or email me directly."

## SEO copy

- Title: `Md. Maruf Hossen — EEE Student at JSTU`
- Description (≤ 155 chars): `Portfolio of Md. Maruf Hossen, EEE undergraduate at Jamalpur Science & Technology University: projects, skills and contact.`

## Owner TODO list

Priority order for the owner:

1. ☐ Confirm moving ID documents out of this folder.
2. ☐ GitHub and LinkedIn URLs.
3. ☐ CV PDF.
4. ☐ Facebook profile URL.
5. ☐ Confirm skills list and honest levels.
6. ☐ At least one real project (title, summary, photo/screenshot, links).
7. ☐ Certificates, awards, volunteer/leadership, university activities.
8. ☐ Education history (optional).
9. ☐ Higher-resolution profile photo (optional; the current one is fine up to ~480 px).
10. ☐ Formspree account + form ID.
11. ☐ GitHub username (repo name and final URL).
