import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const configuredSite =
  process.env.ENTIF_SITE_URL ?? 'https://entif-ai.github.io/rosetta';
const siteUrl = new URL(configuredSite);
const base =
  siteUrl.pathname === '/' ? '/' : siteUrl.pathname.replace(/\/$/, '');

export default defineConfig({
  site: siteUrl.origin,
  base,
  output: 'static',
  integrations: [react(), sitemap()],
  build: {
    assets: '_assets',
  },
});
