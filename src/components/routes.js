import { PROFILE, PROJECTS } from './data'

// Real URLs, not hash fragments and not a client-side router.
//
// Every route is prerendered to its own index.html and linked with a plain
// anchor, so navigation is an ordinary page load. That costs a request and
// buys three things a hash-based single page could not have: one crawlable
// URL per case study, a title and description per page, and internal links
// between them — all three of which the SEO audit reported as missing.

const HOME = '/'

// Not a route in the sitemap: the host serves this file for any address that
// does not exist, so it has no canonical URL of its own and must not be
// indexed. Prerendered like everything else so it is styled and linked rather
// than a bare server error page.
export const NOT_FOUND = '/404.html'

export const projectPath = (project) => `/work/${project.id}/`

export const ROUTES = [HOME, ...PROJECTS.map(projectPath)]

// Trailing slash or not, under a base prefix or at the domain root: the same
// page. Anchoring on /work/ rather than stripping a known base keeps this
// correct for both the custom domain and the GitHub project page.
const normalise = (pathname) => {
  if (pathname.endsWith('/404.html')) return NOT_FOUND

  const start = pathname.indexOf('/work/')
  if (start === -1) return HOME
  return `${pathname.slice(start).replace(/\/+$/, '')}/`
}

export const resolveRoute = (pathname) => {
  const path = normalise(pathname)

  if (path === NOT_FOUND) return { name: 'notfound', path: NOT_FOUND }
  if (path === HOME) return { name: 'home', path: HOME }

  const match = PROJECTS.find((project) => projectPath(project) === path)

  // A /work/ path with no project behind it is a stale or mistyped link, and
  // the honest answer to it is the not-found page rather than silently showing
  // something else.
  return match
    ? { name: 'project', path, project: match }
    : { name: 'notfound', path: NOT_FOUND }
}

// The head tags that differ per page. `scripts/prerender.mjs` writes these
// into each generated index.html; nothing reads them at runtime.
export const routeHead = (path) => {
  const route = resolveRoute(path)

  if (route.name === 'notfound') {
    return {
      title: 'Page not found — Mohammad Jakaria Istauk',
      description:
        'That address does not exist on this site. The work, the experience and the contact details are all one link away.',
      path: NOT_FOUND,
      // No canonical URL, and no place in an index: this file answers for many
      // addresses, none of which are its own.
      noindex: true,
    }
  }

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
      'WordPress and full-stack engineer, seven years in. Custom plugins, themes and Elementor widgets, React and Node.js products, code running on 2M+ sites.',
    path: HOME,
    image: null,
  }
}
