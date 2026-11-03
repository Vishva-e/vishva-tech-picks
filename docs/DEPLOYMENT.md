# Cloudflare Workers — static Astro deployment

## November 3, 2026: deployment failure and fix
The Cloudflare deploy command failed because the repository lacked `wrangler.jsonc`. Wrangler's automatic Astro framework detection tried to run `astro add cloudflare` and then install `@astrojs/cloudflare@^14.4.4`. The dependency installation failed. **This site renders 100% statically**; an SSR adapter is not required.

The root `wrangler.jsonc` now explicitly configures Cloudflare **Workers Static Assets**:
```json
{
  "name": "visha-tech-picks",
  "compatibility_date": "2026-11-03",
  "assets": {
    "directory": "./dist",
    "html_handling": "auto-trailing-slash",
    "not_found_handling": "404-page"
  }
}
```

Important: `name` must match the Worker project's actual name in the Cloudflare dashboard. The default above is the brand name **visha-tech-picks**, not a verified Cloudflare account project name. If the connected Worker is called something else, edit `name` to match before retrying; Cloudflare Workers Builds may automatically use `WRANGLER_CI_OVERRIDE_NAME`, but should not be relied upon without verification. Do **not** change the Worker name without checking the project.

## Cloudflare Workers → Settings → Builds
Select the Worker connected to `Vishva-e/vishva-tech-picks`, then verify:

| Setting | Value |
| --- | --- |
| Git repository | `Vishva-e/vishva-tech-picks` |
| Production branch | `main` |
| Root directory | `/` (repository root) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy --config wrangler.jsonc` |
| Node version | `22.12.0+` |
| Output | `./dist` (from `wrangler.jsonc`, not a separate deploy CLI parameter) |

Do not use `astro add cloudflare`, `@astrojs/cloudflare`, `npm run build:release` with missing signoffs, or an unreviewed SSR entry point. Do not set both `npm run build` as the build command and `npm run build && wrangler deploy` as the deploy command: this would unnecessarily build twice.

**Git push to `main` may trigger an automatic Workers deployment** if Workers Builds Git integration is already connected. A successful GitHub Actions job does not prove a Cloudflare deploy succeeded. Inspect the Cloudflare deployment logs and verify the real URL.

## Build-time vs runtime variables
For an Astro static site, read `process.env` values only during build. Cloudflare dashboard `Settings → Variables & Secrets` is for **runtime** Workers bindings; it does not automatically provide build-time values.

Use Workers `Settings → Build → Build variables and secrets` (or the corresponding Build settings section). For a safe initial public preview:
```text
PUBLIC_SITE_LIVE=false
PUBLIC_AMAZON_ASSOCIATE_ACTIVE=false
RELEASE_MODE=editorial
PUBLIC_CONTACT_EMAIL=vishvaelumalai98@gmail.com
NODE_VERSION=22
```
Leave `SITE_URL` unset until Cloudflare provides a **verified** `https://<worker>.<subdomain>.workers.dev` URL or owner-approved custom domain. Never invent a hostname.

**Warning:** with `PUBLIC_SITE_LIVE=false`, the site may be reachable at a public URL, but the built output intentionally keeps meta `noindex`, `robots.txt` Disallow and the `X-Robots-Tag: noindex` HTTP header. Those are *not* access controls. This is a *noindex preview*, not a complete public indexed SEO launch.

Only set `PUBLIC_SITE_LIVE=true` after independently confirming real domain, hosting, content, legal/privacy and physical-device accessibility review. `npm run build:release` then produces canonical metadata, sitemap and indexable asset headers. Never mark approvals `true` simply to pass a build gate. **Amazon affiliate links remain disabled** until the separate Associates verification.

## After applying this fix
1. Merge the reviewed and CI-green PR into `main`.
2. In Cloudflare Workers, select **Deployments → Build history → Retry build**, or allow the `main` push to trigger a fresh build.
3. If the log says Worker's name mismatched, set the `name` in `wrangler.jsonc` to the exact Cloudflare project name and retry.
4. Confirm the log shows static asset upload and `Deployed` with a real URL. Check `/contact/`, `/guides/`, `/robots.txt`, `/404`, HTTPS and response headers.
5. Report the **verified** live URL; do not assume that the GitHub repository URL is the site URL.

### Official references
- Cloudflare static Astro Workers manual config: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Worker name mismatch: https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/
- Workers Git builds and environment variables: https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- Workers static assets headers: https://developers.cloudflare.com/workers/static-assets/headers/

No Cloudflare account credentials or API tokens belong in GitHub or issue comments.
