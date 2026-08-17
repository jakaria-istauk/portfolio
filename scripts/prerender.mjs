// Injects the server-rendered markup into the built index.html.
//
// Runs as the last step of `npm run build`, after the client bundle and the
// SSR bundle are both on disk. The client then hydrates that markup instead of
// rendering into an empty container, so the HTML a crawler receives already
// contains the h1, the headings, the copy and the links.
//
// It rewrites dist/index.html in place and fails loudly, because a silent
// no-op here would publish the old empty shell and look like a working deploy.

import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SSR_DIR = resolve(root, '.ssr-build')
const SSR_ENTRY = resolve(SSR_DIR, 'assets/index.js')
const HTML = resolve(root, 'dist/index.html')
const PLACEHOLDER = '<div id="root"></div>'

const fail = (message) => {
  console.error(`prerender: ${message}`)
  process.exit(1)
}

const { render } = await import(SSR_ENTRY).catch(() =>
  fail(`could not load the SSR bundle at ${SSR_ENTRY}. Run the ssr build first.`)
)

const template = await readFile(HTML, 'utf8').catch(() =>
  fail(`no built ${HTML}. Run the client build first.`)
)

if (!template.includes(PLACEHOLDER)) {
  fail(`index.html has no ${PLACEHOLDER} to fill.`)
}

const markup = render()

if (!markup.includes('<h1')) {
  fail('the rendered markup has no h1 — refusing to publish it.')
}

await writeFile(
  HTML,
  template.replace(PLACEHOLDER, `<div id="root">${markup}</div>`)
)

// The SSR bundle is a build artefact of this step alone. Leaving it behind
// invites someone to ship it to the web root.
await rm(SSR_DIR, { recursive: true, force: true })

const words = markup.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
console.log(`prerender: injected ${markup.length} bytes, ~${words} words`)
