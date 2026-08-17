// Re-exported rather than redeclared: src/components/site.js is plain ESM with
// no Vite syntax, so Node can read the same file the application does and the
// canonical origin cannot be defined twice with two different values.
export { SITE_URL, OG_IMAGE } from '../src/components/site.js'
