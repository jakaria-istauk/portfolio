// Writes one prerendered HTML file per route, plus the sitemap.
//
// Runs as the last step of `npm run build`, after the client bundle and the
// SSR bundle are both on disk. The client then hydrates that markup instead of
// rendering into an empty container, so the HTML a crawler receives already
// contains the h1, the headings, the copy and the links.
//
// The route list and the per-page head tags come from the SSR bundle, which
// means they come from the same project data the pages render — there is no
// second list here to fall out of sync with the first.
//
// It fails loudly, because a silent no-op would publish the old shell and look
// like a working deploy.

import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { SITE_URL, OG_IMAGE } from './site.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SSR_DIR = resolve(root, '.ssr-build')
const SSR_ENTRY = resolve(SSR_DIR, 'assets/index.js')
const DIST = resolve(root, 'dist')
const PLACEHOLDER = '<div id="root"></div>'

const fail = (message) => {
  console.error(`prerender: ${message}`)
  process.exit(1)
}

const bundle = await import(SSR_ENTRY).catch(() =>
  fail(`could not load the SSR bundle at ${SSR_ENTRY}. Run the ssr build first.`)
)

const { render, ROUTES, routeHead, routeSchema, llmsTxt } = bundle

const template = await readFile(resolve(DIST, 'index.html'), 'utf8').catch(() =>
  fail('no built dist/index.html. Run the client build first.')
)

if (!template.includes(PLACEHOLDER)) {
  fail(`index.html has no ${PLACEHOLDER} to fill.`)
}

// Swaps the value of a single head tag. Each pattern is asserted rather than
// replaced blindly: a silently missed replacement would ship the home page's
// title on every case study.
const swap = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) fail(`no ${label} to replace in index.html.`)
  return html.replace(pattern, replacement)
}

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

const pageFor = (path) => {
  const head = routeHead(path)
  const markup = render(path)

  if (!markup.includes('<h1')) {
    fail(`the markup for ${path} has no h1 — refusing to publish it.`)
  }

  let html = template

  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${escape(head.title)}</title>`, 'title')

  html = swap(
    html,
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${escape(head.description)}" />`,
    'description'
  )

  html = swap(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${SITE_URL}${head.path}" />`,
    'canonical link'
  )

  // Social cards and structured data are injected rather than templated:
  // they are entirely derived from the route, so there is nothing for
  // index.html to hold a placeholder for. JSON-LD carries the identity an AI
  // search engine would otherwise have to infer from the prose.
  const url = `${SITE_URL}${head.path}`

  const social = [
    `<meta property="og:type" content="${head.path === '/' ? 'profile' : 'article'}" />`,
    `<meta property="og:site_name" content="${escape(PROFILE_NAME)}" />`,
    `<meta property="og:title" content="${escape(head.title)}" />`,
    `<meta property="og:description" content="${escape(head.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:locale" content="en_GB" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escape(head.title)}" />`,
    `<meta name="twitter:description" content="${escape(head.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    // Ends up inside a script element, so the only sequence that matters is
    // one that could close it early.
    `<script type="application/ld+json">${JSON.stringify(routeSchema(path)).replace(
      /</g,
      '\\u003c'
    )}</script>`,
  ]
    .map((tag) => `    ${tag}`)
    .join('\n')

  html = swap(html, /\n?\s*<\/head>/, `\n${social}\n  </head>`, 'closing head tag')

  return { html: html.replace(PLACEHOLDER, `<div id="root">${markup}</div>`), markup }
}

// '/' is dist/index.html; '/work/strata/' is dist/work/strata/index.html, so
// a static host serves it without any rewrite rule.
const fileFor = (path) => resolve(DIST, `.${path}index.html`)

// Only used in the og:site_name tag, and only the display name is wanted.
const PROFILE_NAME = 'Mohammad Jakaria Istauk'

for (const path of ROUTES) {
  const { html, markup } = pageFor(path)
  const file = fileFor(path)

  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)

  const words = markup.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  console.log(`prerender: ${path.padEnd(28)} ~${words} words`)
}

const lastmod = new Date().toISOString().slice(0, 10)

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.map((path) =>
    [
      '  <url>',
      `    <loc>${SITE_URL}${path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      // The home page is the one worth recrawling most often; a case study
      // changes only when the work does.
      `    <priority>${path === '/' ? '1.0' : '0.8'}</priority>`,
      '  </url>',
    ].join('\n')
  ),
  '</urlset>',
  '',
].join('\n')

await writeFile(resolve(DIST, 'sitemap.xml'), sitemap)
console.log(`prerender: sitemap lists ${ROUTES.length} url(s)`)

const llms = llmsTxt()
await writeFile(resolve(DIST, 'llms.txt'), llms)
console.log(`prerender: llms.txt ${llms.length} bytes`)

// The SSR bundle is a build artefact of this step alone. Leaving it behind
// invites someone to ship it to the web root.
await rm(SSR_DIR, { recursive: true, force: true })
