# Release gate: MUST NOT PUBLISH WITHOUT OWNER APPROVAL

## Status

- [x] Architecture / design / implementation direction approved (November 3, 2026)
- [x] Phase 1 implementation source written
- [ ] Source dependency install and production build verified
- [ ] Astro type-check and automated QA verified
- [ ] Mobile, keyboard and accessibility manual review
- [ ] Seven additional original articles researched and approved
- [ ] Public contact channel supplied and verified
- [ ] Privacy / legal notice checked against actual hosting and data handling
- [ ] Amazon enrolment verified before switching affiliate declaration on
- [ ] Final Amazon Associates disclosures reviewed
- [ ] Production sitemap and canonical URLs configured
- [ ] Domain / deployment / hosting explicitly approved by owner
- [ ] Owner explicitly authorizes public release

## Safeguards

- No Cloudflare connection or Pages project yet.
- `robots.txt` says `Disallow: /`.
- Meta robots defaults to `noindex,nofollow,noarchive`.
- `PUBLIC_SITE_LIVE=true` requires HTTPS `SITE_URL`.
- A GitHub Actions workflow **does not deploy**.

**Note:** `noindex` and `robots.txt` are not security controls. A real web deployment would still be externally accessible. Keep the source repository private and avoid any hosted deployment until approved.
