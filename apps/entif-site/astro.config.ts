import { unified } from '@astrojs/markdown-remark';
import { remarkSiteAssets, rehypeSiteTables } from './src/lib/remark-site-assets.mjs';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const configuredSite = process.env.ENTIF_SITE_URL ?? 'https://entif.ai';
const configuredBase = process.env.ENTIF_SITE_BASE ?? '/';
const base =
  configuredBase === '/' ? '/' : `/${configuredBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site: configuredSite,
  base,
  output: 'static',
  markdown: { processor: unified({ remarkPlugins: [remarkSiteAssets], rehypePlugins: [rehypeSiteTables] }) },
  integrations: [react(), sitemap()],
  build: {
    assets: '_assets',
  },
});
