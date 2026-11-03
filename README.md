# Vishva Tech Picks

**Status: Phase 1 implementation candidate — NOT PUBLISHED.**

An Astro + TypeScript + Tailwind CSS v4 static editorial website for Indian tech buyers. Built for source-controlled Markdown buying guides and a future Amazon Associates integration after editorial and policy review.

## What's included

- Responsive minimalist homepage, navigation and category tiles
- Guide listing with client-side search, six category routes and article templates
- Three original **desk-research** sample guides (NOT claimed hands-on reviews)
- About, Editorial Policy, Affiliate Disclosure, Privacy, Contact and 404 pages
- Content collection schema, SEO metadata and pre-launch noindex safeguards
- Unitless baseline validation using Node's built-in test runner
- GitHub Actions CI (**no deployment action**) and Cloudflare Pages handoff docs

## Local development

Requirements: Node.js 22.12+ and an active internet connection for the initial npm install.

```bash
npm install
npm run dev
# Open http://127.0.0.1:4321
```

Check project and build:

```bash
npm run validate
```

The first `npm install` will create `package-lock.json`. Commit it before opening a PR and update CI to `npm ci` once generated.

## Security and release gate

- No Amazon tracking IDs or referral links are present; Associate earning claims are hidden unless confirmed active.
- No private contact details or secrets are bundled.
- Before release, the built site uses `noindex` metadata and `public/robots.txt` disallows crawling.
- A future approved launch must explicitly set `PUBLIC_SITE_LIVE=true`, `SITE_URL=https://<approved-hostname>`, update robots.txt, verify privacy/legal disclosures and test SEO configuration.
- **Do not connect Cloudflare Pages / trigger a hosted preview until the owner separately authorizes the visibility and release approach.** A preview URL can still be publicly accessible to someone who has the link.

See [docs/RELEASE-GATE.md](docs/RELEASE-GATE.md) for full criteria.

## Current limitations

1. The three guides are editorial starters; an additional seven researched and reviewed guides are part of Phase 2.
2. No contact endpoint exists until an approved public email/form is provided.
3. No affiliate tracking links, no product price API and no third-party analytics.
4. A production sitemap and canonical metadata need a verified public URL at the release gate.
5. This handoff is source code only; it has **not** been built or previewed against downloaded dependencies in the current environment (npm registry networking unavailable).

## Source structure

```
src/components/          Header, Footer, GuideCard, PageHeading
src/content/guides/      Version-controlled Markdown guides
src/content.config.ts    Validated frontmatter schema
src/data/site.ts         Categories, navigation and brand metadata
src/layouts/             Base page template, SEO and noindex
src/pages/               Static and dynamic routes
src/styles/              Theme and responsive design
.github/workflows/       Checks only; no deployment
public/                  Brand favicon and prelaunch robots.txt
docs/                    Architecture, design, content and rollout policy
```

## Tech documentation

- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Tailwind v4 for Astro: https://tailwindcss.com/docs/installation/framework-guides/astro
- Cloudflare Pages for Astro (future release only): https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
