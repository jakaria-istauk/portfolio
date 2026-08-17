import { ABOUT, EMAIL, FAQ, HISTORY, PROFILE, PROJECTS, RELEASES } from './data'
import { SITE_URL, OG_IMAGE } from './site'
import { projectPath, resolveRoute, routeHead } from './routes'

// JSON-LD, written per page by scripts/prerender.mjs.
//
// This is the part an AI search engine reads when it has to answer "who is
// this and what do they do" without a human skimming the page first. Prose
// alone leaves it inferring; a Person with sameAs links, knowsAbout terms and
// a real employment history leaves it quoting.
//
// Every claim here restates something already visible on the page. Structured
// data that says more than the page does is the definition of a spam signal.

const PERSON_ID = `${SITE_URL}/#person`
const SITE_ID = `${SITE_URL}/#website`

// Deliberately CreativeWork rather than SoftwareApplication: the latter
// expects an offer and a rating to be useful, and inventing either for a
// plugin someone can download for free would be a fabricated claim.
const projectNode = (project) => ({
  '@type': 'CreativeWork',
  '@id': `${SITE_URL}${projectPath(project)}#work`,
  name: project.title,
  description: project.summary,
  abstract: project.description,
  url: `${SITE_URL}${projectPath(project)}`,
  author: { '@id': PERSON_ID },
  keywords: project.categories.join(', '),
})

const person = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PROFILE.name,
  alternateName: 'Jakaria Istauk',
  jobTitle: PROFILE.role,
  description: ABOUT.intro,
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: `mailto:${EMAIL}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  // The profiles are the strongest identity signal available: they let an
  // engine tie this page to the same person on GitHub and WordPress.org.
  sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.wordpress, PROFILE.x],
  knowsAbout: [
    'WordPress plugin development',
    'WordPress theme development',
    'WordPress Core contribution',
    'Elementor widget development',
    'WooCommerce development',
    'PHP',
    'React',
    'Node.js',
    'TypeScript',
    'MySQL',
    'REST API design',
    'Web performance',
    'Application security',
  ],
  knowsLanguage: ['en', 'bn'],
  worksFor: HISTORY.map((entry) => ({
    '@type': 'Organization',
    name: entry.where,
  })),
  hasOccupation: {
    '@type': 'Occupation',
    name: PROFILE.role,
    occupationLocation: { '@type': 'City', name: 'Dhaka' },
  },
  subjectOf: RELEASES.map((version) => ({
    '@type': 'CreativeWork',
    name: `WordPress ${version}`,
    url: `https://wordpress.org/documentation/wordpress-version/version-${version}/`,
  })),
})

const website = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: `${PROFILE.name} — ${PROFILE.role}`,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
})

const faqPage = () => ({
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

const breadcrumbs = (project) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Work',
      item: `${SITE_URL}/#work`,
    },
    { '@type': 'ListItem', position: 3, name: project.title },
  ],
})

export const routeSchema = (path) => {
  const route = resolveRoute(path)
  const head = routeHead(path)

  const page = {
    '@id': `${SITE_URL}${head.path}#page`,
    url: `${SITE_URL}${head.path}`,
    name: head.title,
    description: head.description,
    inLanguage: 'en',
    isPartOf: { '@id': SITE_ID },
  }

  if (route.name === 'project') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', ...page, about: { '@id': PERSON_ID } },
        website(),
        person(),
        projectNode(route.project),
        breadcrumbs(route.project),
      ],
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // ProfilePage rather than WebPage: this page is about a person, and
      // saying so is what makes the Person node its subject rather than an
      // unrelated entity that happens to be mentioned.
      { '@type': 'ProfilePage', ...page, mainEntity: { '@id': PERSON_ID } },
      website(),
      person(),
      faqPage(),
      ...PROJECTS.map(projectNode),
    ],
  }
}
