// Writes dist/sitemap.xml from the route list in site.mjs.
//
// Generated rather than committed so the URL list and the lastmod date cannot
// drift away from what the build actually produced.

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { ROUTES, SITE_URL } from './site.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const lastmod = new Date().toISOString().slice(0, 10)

const url = (path) =>
  [
    '  <url>',
    `    <loc>${SITE_URL}${path}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    // The home page is the one worth recrawling most often; case studies
    // change only when the work does.
    `    <priority>${path === '/' ? '1.0' : '0.8'}</priority>`,
    '  </url>',
  ].join('\n')

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.map(url),
  '</urlset>',
  '',
].join('\n')

await writeFile(resolve(root, 'dist/sitemap.xml'), xml)
console.log(`sitemap: ${ROUTES.length} url(s)`)
