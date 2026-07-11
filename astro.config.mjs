// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// NOTE: production domain unconfirmed (jakaria.com.bd vs jamiluddin.com — see plan Open Items).
// Placeholder below drives sitemap + canonical URLs. Update before Phase 7 deploy.
export default defineConfig({
  site: 'https://jakaria.com.bd',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }), // base/reset lives in src/styles/global.css
    sitemap(),
    mdx(),
  ],
});
