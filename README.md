# Visha Tech Picks

**Status: Phases 1–3 merged and CI-verified; Phase 4 release-preparation candidate — NOT PUBLISHED.**

**Brand:** Visha Tech Picks. **GitHub repository (original slug):** `Vishva-e/vishva-tech-picks`.

An Astro + TypeScript + Tailwind CSS v4 static editorial website for Indian tech buyers. Built for source-controlled Markdown buying guides and a future Amazon Associates integration after editorial and policy review.

## What's included

- Responsive minimalist homepage, navigation and category tiles
- Guide listing with client-side search, six category routes and article templates
- Ten original **desk-research** buying guides (NOT claimed hands-on reviews)
- About, Editorial Policy, Affiliate Disclosure, Privacy, Contact and 404 pages
- Content collection schema, SEO metadata and pre-launch noindex safeguards
- Unitless baseline validation using Node's built-in test runner
- GitHub Actions CI (**no deployment action**) and Cloudflare Pages handoff docs

## Amazon Associates agent (private review queue)

Use `npm run agent:amazon -- help` for safe, owner-supplied SiteStripe link intake. It never accesses your account or publishes content. See [docs/AMAZON-AGENT.md](docs/AMAZON-AGENT.md).

## Phase 2: Local Amazon product review dashboard

Run `npm run agent:dashboard` after using the manual SiteStripe intake command to review pending products locally. Reviewed candidates are never published automatically. See [docs/PRODUCT-REVIEW.md](docs/PRODUCT-REVIEW.md). No Amazon account is connected.

## Phase 3: Discover and verify

- `/product-finder/` offers a deterministic, privacy-friendly buying criteria finder (no Amazon catalogue or actual price data).
- `/guides/` supports search, category filtering and sorting without a backend.
- `npm run validate` now includes a static SEO/noindex/internal-link audit after the Astro build.
- Private GitHub Actions headless Chromium checks run at mobile, tablet and desktop widths; screenshots remain CI artifacts only.
- Amazon account onboarding remains manual, separate and unconnected. See [docs/AMAZON-ONBOARDING.md](docs/AMAZON-ONBOARDING.md) and [docs/QA-PHASE3.md](docs/QA-PHASE3.md).

## Phase 4: Editorial handoff and release preflight\n\n- `npm run agent:handoff` checks owner-approved Amazon link candidates locally; `-- --write` writes a **gitignored private editorial JSON handoff**. It never modifies public website files or logs into Amazon.\n- `npm run release:preflight` fails closed until owner-authorized hosting, contact, legal/editorial review and relevant Amazon approval details exist. It **does not deploy**.\n- Public contact email is optional during development and shown only if a valid owner-approved `PUBLIC_CONTACT_EMAIL` is supplied.\n- See [Phase 4 release-readiness plan](docs/PHASE-4-READINESS.md).\n\n## Local development

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

Use `npm ci` for reproducible installs. CI runs `astro check`, Node tests, and the static build; it never deploys.

## Security and release gate

- No Amazon tracking IDs or referral links are present; Associate earning claims are hidden unless confirmed active.
- No private contact details or secrets are bundled.
- Before release, the built site uses `noindex` metadata and `public/robots.txt` disallows crawling.
- A future approved launch must explicitly set `PUBLIC_SITE_LIVE=true`, `SITE_URL=https://<approved-hostname>`, update robots.txt, verify privacy/legal disclosures and test SEO configuration.
- **Do not connect Cloudflare Pages / trigger a hosted preview until the owner separately authorizes the visibility and release approach.** A preview URL can still be publicly accessible to someone who has the link.

See [docs/RELEASE-GATE.md](docs/RELEASE-GATE.md) for full criteria.

## Current limitations

1. Ten desk-researched guides are present; a human source-accuracy and editorial review remains outstanding.
2. No contact endpoint exists until an approved public email/form is provided.
3. No affiliate tracking links, no product price API and no third-party analytics.
4. A production sitemap and canonical metadata need a verified public URL at the release gate.
5. The Astro build, unit tests and Chromium QA were verified in private GitHub Actions. Actual physical-device and legal reviews are still required before launch.

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
