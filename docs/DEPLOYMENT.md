# Deployment — GitHub Pages

## 1. Repository

- Recommended name: `<github-username>.github.io` → site at `https://<github-username>.github.io/` (root path, simplest).
- Alternative: any repo name (e.g. `portfolio`) → `https://<username>.github.io/portfolio/`. All asset and fetch URLs must be **relative** (no leading `/`) and canonical/OG URLs must include the sub-path.
- Visibility: public (required for free Pages on user accounts).
- Before the first push: confirm `git ls-files | grep -Ei 'id-card|nid'` prints nothing (see [SECURITY_AND_PRIVACY.md](SECURITY_AND_PRIVACY.md)).

## 2. Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run check

  deploy:
    needs: check
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - name: Assemble site
        run: |
          mkdir _site
          cp -r index.html 404.html assets css js content sitemap.xml robots.txt manifest.webmanifest _site/
      - uses: actions/upload-pages-artifact@v3
        with: { path: _site }
      - id: deployment
        uses: actions/deploy-pages@v4
```

Notes: copy only the public files into `_site` so docs, tooling and any stray local files never get published. Pin action versions to the latest major at implementation time and review them periodically. The `ci.yml` workflow (PRs) runs `npm run check` plus Lighthouse CI.

## 3. Enable Pages

Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**. After the first successful run, tick **Enforce HTTPS**.

## 4. Formspree

1. Create a free account at formspree.io using the email where messages should arrive.
2. New form → copy the endpoint `https://formspree.io/f/<FORM_ID>`.
3. Put it in the form `action` attribute (no-JS fallback) and read it from `form.action` in `form.js`.
4. In Formspree settings: restrict allowed domains to the production origin if available on the plan, enable spam filtering, and set the redirect/thank-you behaviour for the no-JS path.
5. Send a test message from the **live** site and confirm delivery (check spam folder).

The form ID is public by design. It is not a secret, but the domain restriction and spam filter limit abuse.

EmailJS fallback: only if Formspree is unsuitable. Its public key is also visible, so enable domain allow-listing there too and update the CSP `connect-src`.

## 5. Custom domain (optional)

Buy a domain → add a `CNAME` file (just the domain) → DNS: `A` records to GitHub Pages IPs (or `CNAME` for `www` to `<username>.github.io`) → Settings → Pages → custom domain → enforce HTTPS. Then update canonical, OG, sitemap, robots and JSON-LD URLs.

## 6. Release process

1. Branch (`feat/…`) → PR → CI green → squash merge to `main`.
2. The deploy workflow publishes automatically (about 1 minute).
3. Post-deploy: open the live URL, run the manual smoke test (see [ACCESSIBILITY_AND_QA.md](ACCESSIBILITY_AND_QA.md)), re-scrape social previews.
4. Tag releases `vMAJOR.MINOR.PATCH`.

## 7. Rollback

`git revert <bad-commit>` and push (re-deploys in about a minute), or Actions → select the last good run → **Re-run all jobs**. Never force-push `main`.

## 8. After launch

- Add the URL to GitHub profile, LinkedIn (Featured/Contact info), CV and email signature.
- Submit the URL in Google Search Console (verify via the HTML-tag method) and submit `sitemap.xml`.
- Review content quarterly: new projects, certificates, skills. Update `sitemap.xml` `lastmod`.
