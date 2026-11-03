import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Do not set SITE_URL or PUBLIC_SITE_LIVE until owner approves a public release.
const site = process.env.SITE_URL?.trim();
const published = process.env.PUBLIC_SITE_LIVE === 'true';
if (published && (!site || !/^https:\/\//.test(site))) {
  throw new Error('Release blocked: set a verified HTTPS SITE_URL before PUBLIC_SITE_LIVE=true');
}

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  ...(site ? { site } : {}),
  vite: { plugins: [tailwindcss()] },
});
