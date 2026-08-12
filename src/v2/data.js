export const EMAIL = 'jakariamd35@gmail.com'

// Vite rewrites asset URLs it finds in index.html, but not ones written as
// strings in JavaScript. Prefixing here keeps them correct under any base.
const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const CV = {
  file: asset('/Jakaria_Istauk_CV.pdf'),
  filename: 'Jakaria_Istauk_CV.pdf',
}

export const PROFILE = {
  name: 'Mohammad Jakaria Istauk',
  role: 'WordPress & Full-Stack Engineer',
  location: 'Dhaka, Bangladesh',
  github: 'https://github.com/jakaria-istauk',
  linkedin: 'https://www.linkedin.com/in/jakariaistauk/',
  wordpress: 'https://profiles.wordpress.org/jakariaistauk/',
  x: 'https://x.com/jakaria_istauk',
}

export const FIGURES = [
  {
    value: '2M+',
    accent: '+',
    label: 'sites running a plugin I help build',
  },
  {
    value: '9',
    label: 'years shipping WordPress and full-stack products',
  },
  {
    value: '5',
    label: 'WordPress Core releases with my contributions in them',
  },
  {
    value: '13+',
    accent: '+',
    label: 'projects translated into Bengali as a Polyglots editor',
  },
]

export const PROJECTS = [
  {
    id: 'essential-addons',
    title: 'Essential Addons for Elementor',
    description:
      'The most-installed Elementor addon. I work across the widget library, performance, security hardening and backward compatibility for a codebase non-technical site builders depend on daily.',
    image: asset('/screenshots/essential-addons.webp'),
    categories: ['wordpress'],
    meta: [
      { key: 'Active installs', value: '2 million+', signal: true },
      { key: 'Role', value: 'Plugin engineer' },
      { key: 'Built with', value: 'PHP · Elementor · JS · SCSS' },
    ],
    links: [
      { label: 'Visit site', url: 'https://essential-addons.com' },
      {
        label: 'Source',
        url: 'https://github.com/WPDevelopers/essential-addons-for-elementor-lite',
      },
    ],
  },
  {
    id: 'bookclub',
    title: 'BookClub',
    description:
      'A shared library for a distributed team: catalogue, borrow and return flows, ratings, and title suggestions, behind domain-restricted sign-in. Built end to end — data model, REST API, and interface.',
    image: asset('/screenshots/bookclub.webp'),
    note: 'Sign-in is restricted to verified company domains.',
    categories: ['full-stack'],
    meta: [
      { key: 'Status', value: 'In production', signal: true },
      { key: 'Role', value: 'Sole engineer' },
      { key: 'Built with', value: 'Node.js · TypeScript · React · MySQL' },
    ],
    links: [{ label: 'Visit site', url: 'https://bookclub.oorol.com' }],
  },
  {
    id: 'strata',
    title: 'Strata',
    description:
      'A database admin client you host yourself. Browse data, run SQL and manage schema from a React app over a thin PHP and PDO JSON API. Credentials never leave the browser, and it ships as a zip — no Node, no Composer.',
    image: asset('/screenshots/strata.webp'),
    categories: ['full-stack', 'interface'],
    meta: [
      { key: 'Latest release', value: 'v1.2.2' },
      { key: 'Role', value: 'Creator' },
      { key: 'Built with', value: 'TypeScript · React · PHP · PDO' },
    ],
    links: [
      { label: 'Visit site', url: 'https://jakaria-istauk.github.io/strata/' },
      { label: 'Source', url: 'https://github.com/jakaria-istauk/strata' },
    ],
  },
  {
    id: 'tablentor',
    title: 'Tablentor',
    description:
      'A table builder for Elementor, published on WordPress.org. Custom widget, live editor controls, responsive output and import/export — built to plugin review standards and maintained through Core updates.',
    image: asset('/screenshots/tablentor.webp'),
    categories: ['wordpress'],
    meta: [
      { key: 'Active installs', value: '1,000+', signal: true },
      { key: 'Role', value: 'Creator' },
      { key: 'Built with', value: 'PHP · Elementor · JavaScript' },
    ],
    links: [
      { label: 'WordPress.org', url: 'https://wordpress.org/plugins/tablentor/' },
      { label: 'Source', url: 'https://github.com/jakaria-istauk/tablentor' },
    ],
  },
  {
    id: 'hajjflow',
    title: 'HajjFlow',
    description:
      'A Hajj ritual planner written in Bengali. Offline-capable and mobile-first, and an exercise in setting a non-Latin script so it stays readable at every size.',
    image: asset('/screenshots/hajjflow.webp'),
    categories: ['interface'],
    meta: [
      { key: 'Language', value: 'Bengali' },
      { key: 'Role', value: 'Creator' },
      { key: 'Built with', value: 'JavaScript · HTML · CSS' },
    ],
    links: [
      { label: 'Visit site', url: 'https://jakaria-istauk.github.io/hajjflow/' },
      { label: 'Source', url: 'https://github.com/jakaria-istauk/hajjflow' },
    ],
  },
  {
    id: 'smoky-ghost-trail',
    title: 'Smoky Ghost Trail',
    description:
      'A WebGL cursor-trail library that attaches to any element on a page. Shader-based, no dependencies, and small enough to read in one sitting.',
    image: asset('/screenshots/smoky.webp'),
    categories: ['interface'],
    meta: [
      { key: 'Dependencies', value: 'None' },
      { key: 'Role', value: 'Creator' },
      { key: 'Built with', value: 'JavaScript · WebGL · GLSL' },
    ],
    links: [
      {
        label: 'Try it',
        url: 'https://jakaria-istauk.github.io/smoky-ghost-cursor-trail/',
      },
      {
        label: 'Source',
        url: 'https://github.com/jakaria-istauk/smoky-ghost-cursor-trail',
      },
    ],
  },
]

export const FILTERS = ['everything', 'wordpress', 'full-stack', 'interface']

export const HISTORY = [
  {
    when: 'Mar 2022 — Jul 2026',
    role: 'WordPress Developer',
    where: 'WPDeveloper, Inc',
    what: 'Features, performance and security work on Essential Addons for Elementor, holding backward compatibility across a plugin installed on more than two million sites. Also built internal Node.js and TypeScript products: a book management platform, and a service that converts Figma designs into Elementor templates, including AI-assisted widget generation.',
  },
  {
    when: 'Aug 2019 — Feb 2022',
    role: 'Jr. Software Engineer',
    where: 'Codexpert, Inc',
    what: 'Sole engineer on several full-stack PHP, WordPress and JavaScript products — a WooCommerce builder for Elementor, a WooCommerce affiliate marketing plugin, per-role widget access control for the editor, and a 2Checkout payment gateway integration.',
  },
  {
    when: 'Feb 2019 — Jul 2019',
    role: 'Jr. Software Architect',
    where: 'Agemark Technology Ltd.',
    what: 'Application architecture, data models and backend services.',
  },
  {
    when: 'Jan 2017 — May 2019',
    role: 'Web Developer & Trainer',
    where: 'Binary Pathshala',
    what: 'Built sites and templates from design files, and taught web development — writing the curriculum students learned from.',
  },
]

export const RELEASES = ['6.9', '6.4', '6.3', '6.2', '6.1']
