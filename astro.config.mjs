import { defineConfig } from 'astro/config';

// Tailwind 4 is configured through PostCSS, preventing duplicate Vite type trees.
// Never turn on public release flags without the owner's separate approval.
const site = process.env.SITE_URL?.trim();
const published = process.env.PUBLIC_SITE_LIVE === 'true';
if (published && (!site || !/^https:\/\//.test(site))) {
  throw new Error('Release blocked: set a verified HTTPS SITE_URL before PUBLIC_SITE_LIVE=true');
}

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  ...(site ? { site } : {}),
});
