import { PROFILE, PROJECTS } from './data'

// Real URLs, not hash fragments and not a client-side router.
//
// Every route is prerendered to its own index.html and linked with a plain
// anchor, so navigation is an ordinary page load. That costs a request and
// buys three things a hash-based single page could not have: one crawlable
// URL per case study, a title and description per page, and internal links
// between them — all three of which the SEO audit reported as missing.

const HOME = '/'

export const projectPath = (project) => `/work/${project.id}/`

export const ROUTES = [HOME, ...PROJECTS.map(projectPath)]

// Trailing slash or not, under a base prefix or at the domain root: the same
// page. Anchoring on /work/ rather than stripping a known base keeps this
// correct for both the custom domain and the GitHub project page.
const normalise = (pathname) => {
  const start = pathname.indexOf('/work/')
  if (start === -1) return HOME
  return `${pathname.slice(start).replace(/\/+$/, '')}/`
}

export const resolveRoute = (pathname) => {
  const path = normalise(pathname)

  if (path === HOME) return { name: 'home', path: HOME }

  const match = PROJECTS.find((project) => projectPath(project) === path)

  // An unknown path still has to render something, and the home page is a
  // better answer than a blank screen for the one case that reaches it: a
  // stale link to a project that has since been renamed.
  return match
    ? { name: 'project', path, project: match }
    : { name: 'home', path: HOME }
}

// The head tags that differ per page. `scripts/prerender.mjs` writes these
// into each generated index.html; nothing reads them at runtime.
export const routeHead = (path) => {
  const route = resolveRoute(path)

  if (route.name === 'project') {
    const { project } = route
    return {
      title: `${project.title} — ${PROFILE.name}`,
      description: project.summary,
      path: route.path,
      image: project.image,
    }
  }

  return {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    // Held near 155 characters: the audit flagged the old one for overflowing
    // the width Google renders a description in, which truncates the tail.
    description:
      'WordPress and full-stack engineer, nine years in. Custom plugins, themes and Elementor widgets, React and Node.js products, code running on 2M+ sites.',
    path: HOME,
    image: null,
  }
}
