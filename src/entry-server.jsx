import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Build-time entry. `scripts/prerender.mjs` calls this and writes the result
// into dist/index.html, so crawlers get the real page instead of an empty
// #root. Nothing here may touch window or document: the components only reach
// for them inside effects and event handlers, which never run during a render
// on the server. Keep it that way.
export function render(path) {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>
  )
}

// The build step needs the route list and each route's head tags, and both
// derive from the project data. Re-exported here so the SSR bundle stays the
// only place the build reads application data from.
export { ROUTES, NOT_FOUND, routeHead } from './components/routes'
export { routeSchema } from './components/schema'
export { llmsTxt } from './components/llms'
