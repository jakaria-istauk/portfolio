// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Production domain confirmed: jakaria.com.bd (Phase 7 gate). Drives sitemap + canonical URLs.
export default defineConfig({
  site: 'https://jakaria.com.bd',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }), // base/reset lives in src/styles/global.css
    sitemap(),
    mdx(),
  ],
});
