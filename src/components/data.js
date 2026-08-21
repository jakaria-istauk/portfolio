export const EMAIL = 'jakariamd35@gmail.com'

// Vite rewrites asset URLs it finds in index.html, but not ones written as
// strings in JavaScript. Prefixing here keeps them correct under any base.
const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// Internal links need the same treatment: the GitHub project page serves this
// site from /portfolio/, so a hard-coded /work/strata/ would 404 there.
export const href = (path) => asset(path)

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
    value: '7',
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
    summary:
      'Engineering work on Essential Addons for Elementor, the most-installed Elementor addon, running on more than two million WordPress sites.',
    story: [
      'Essential Addons for Elementor is the most-installed addon in the Elementor ecosystem, and the install count is the whole engineering problem. Two million sites means every widget change is a compatibility question first and a feature second: someone, somewhere, is depending on the markup a widget produced three years ago, and they are not reading a changelog before they update.',
      'My work runs across the widget library, performance and security hardening. That means writing new widgets to the same conventions as the ones already shipped, keeping output backward compatible when the internals underneath it change, and treating every input that reaches PHP as untrusted — a plugin at this scale is a shared attack surface for every site that installs it.',
      'The people using it are not developers. They are site builders working visually, which sets the standard for what an acceptable failure looks like: no white screens, no broken layouts after an update, and no setting that quietly stops doing what it did last week.',
      'Performance work on a plugin this large is mostly about what not to load. A widget library is only as fast as its restraint: assets scoped to the widgets a page actually uses, queries that do not multiply with the number of elements on the canvas, and nothing enqueued globally that only one widget needed.',
    ],
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
    summary:
      'A shared team library built end to end — data model, REST API and interface — in Node.js, TypeScript, React and MySQL.',
    story: [
      'BookClub is a shared library for a distributed team: a catalogue, borrow and return flows, ratings, and a way to suggest titles worth buying. It is in production, behind sign-in restricted to verified company domains.',
      'I built it end to end — the data model, the REST API on Node.js and TypeScript, the MySQL schema underneath, and the React interface on top. Being the only engineer on a product means the boundaries are yours to draw, so the interesting decisions were about where state belongs: what the server is authoritative over, what the client is allowed to assume, and which of the two owns the rules about who may borrow what.',
      'Borrow and return is a small domain with sharp edges. Two people wanting the same copy at the same moment, a return that never happens, a title that leaves the catalogue while someone still holds it — the flows have to answer all of it without an administrator stepping in.',
      'Restricting sign-in to verified company domains is doing more work than access control. It is what lets the product assume good faith internally, so the interface can stay light on confirmations and warnings and heavy on the two things people came for: finding a book and getting it back.',
    ],
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
    id: 'hisab-counter',
    title: 'হিসাব কাউন্টার (Hisab Counter)',
    // Only the first half of that title is Bengali. See ProjectTitle.jsx.
    titleLang: 'bn',
    description:
      'A Bengali double-ledger accounting app for mobile financial service agent shops in Bangladesh. Every transaction moves the cash drawer and the wallet float at once, commission is applied per provider, and the day closes on a counted-cash variance check.',
    summary:
      'A Bengali double-ledger app for MFS agent shops: cash drawer and wallet float in one book, with a nightly cash variance check.',
    story: [
      'An agent shop in Bangladesh sells bKash, Nagad, Rocket, Upay and Tap from the same counter, and every transaction moves money in two places at once: the cash in the drawer and the wallet float in the agent account. A cash-out takes notes out of the drawer and puts balance into the wallet. A wallet recharge does the reverse. Commission lands in the wallet, never in the drawer. Get any of that backwards and the two books stop agreeing, which is only discovered at eleven at night when the cash does not add up.',
      'The shops that run on a spreadsheet feel this most. A single wrong drag breaks a formula silently, a phone is a bad place to edit a workbook, and by the time a month is corrupted there is no way to find where it went wrong. This replaces that: one entry screen, both ledgers recomputed from scratch on every save, and a receipt tape that prints exactly what the entry did to each of them.',
      'The rules are the product. Commission rates are versioned, so changing a provider rate today does not rewrite what yesterday earned. Transactions that cannot physically happen are refused at entry with the reason and the fix, rather than accepted and reconciled later — paying out more cash than the drawer holds is not a rounding error, it is a wrong number that will be trusted. Distributor payments are treated as buying float rather than as an expense, which is the mistake that made the original spreadsheet understate profit.',
      'The whole interface is in Bengali, mobile-first for use at the counter, and offline-capable because shop internet is not reliable. It is in private beta with accounts created on request, built as sole engineer on a React and TypeScript front end over a Laravel API.',
    ],
    image: asset('/screenshots/hisab-counter.webp'),
    note: 'Accounts are created on request, so the app itself is behind sign-in.',
    categories: ['full-stack', 'interface'],
    meta: [
      { key: 'Status', value: 'Private beta', signal: true },
      { key: 'Role', value: 'Creator, sole engineer' },
      { key: 'Built with', value: 'React · TypeScript · Laravel' },
    ],
    links: [{ label: 'Visit site', url: 'https://mfs.oorol.com/' }],
  },
  {
    id: 'strata',
    title: 'Strata',
    description:
      'A database admin client you host yourself. Browse data, run SQL and manage schema from a React app over a thin PHP and PDO JSON API. Credentials never leave the browser, and it ships as a zip — no Node, no Composer.',
    summary:
      'A self-hosted database admin client: a React and TypeScript front end over a thin PHP and PDO JSON API, shipped as a zip.',
    story: [
      'Strata is a database client you host yourself. It browses data, runs SQL and manages schema from a React and TypeScript interface, talking to a thin JSON API written in PHP over PDO.',
      'The constraint that shaped it was the install: it ships as a zip, with no Node and no Composer on the far end. That rules out the usual build-on-the-server answer and pushes the whole application into files that can be dropped onto shared hosting — the kind of place where a database admin tool is most needed and least likely to be installable.',
      'Credentials never leave the browser. The API is deliberately thin: it holds no session of its own and stores nothing, which keeps a self-hosted tool from becoming a credential store someone forgets they deployed. The current release is v1.2.2, and the source is public.',
      'A tool that runs arbitrary SQL has to be honest about what it is about to do. So the interface treats destructive operations as a separate class of action rather than another button, and shows the statement it is going to send before it sends it — the person at the keyboard is the safeguard, and they need the information to be one.',
    ],
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
    summary:
      'A table builder for Elementor published on WordPress.org, with a custom widget, live editor controls and responsive output.',
    story: [
      'Tablentor is a table builder for Elementor, published on WordPress.org and running on more than a thousand active sites. It is a custom Elementor widget: live editor controls, responsive output, and import and export for the table data itself.',
      'Publishing on WordPress.org sets the bar. The plugin review standards are not a style guide — they are rules about escaping output, sanitising input, prefixing everything you put in a shared namespace, and never shipping code that reaches out to somewhere the site owner did not ask for. Meeting them is a condition of being listed at all.',
      'Maintaining it afterwards is the longer job. Elementor and WordPress Core both move, and a widget that renders correctly today has to keep rendering correctly through their updates, on sites whose owners will never look at a release note.',
      'Tables are also a harder interface problem than they look. The same data has to survive a phone screen without becoming unreadable, which means deciding what a column is allowed to do when there is no room for it — collapse, scroll, or stack — and making that choice configurable without handing the site builder a panel of forty settings.',
    ],
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
    summary:
      'A Bengali-language, offline-capable Hajj ritual planner, built mobile-first around typesetting a non-Latin script.',
    story: [
      'HajjFlow is a ritual planner for Hajj, written in Bengali. It is offline-capable and mobile-first, because it is meant to be used somewhere with a crowded network and a phone that has been out all day.',
      'Most of the craft went into the typesetting. Bengali is not Latin: the script has taller glyph clusters, conjuncts that change shape in combination, and no reliable relationship between a font size that works for English and one that stays readable here. Line height, letter spacing and the type scale all had to be set for the script rather than inherited from a Latin default.',
      'Offline was a correctness requirement, not a feature. A planner you cannot open when the connection drops is a planner that fails precisely when it is being relied on.',
      'It is built in plain JavaScript, HTML and CSS, with no framework, because the whole application is small enough not to need one and every kilobyte saved is a kilobyte that does not have to arrive over a bad connection. That decision is also why it starts instantly on an old phone, which is the device most of its readers will actually be holding.',
      'Working in Bengali on a project like this feeds directly into the translation work: the same questions about wording, register and what a term should be called in Bengali come up whether the string is in a planner or in WordPress Core.',
    ],
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
    id: 'restrict-elementor-widgets',
    title: 'Restrict Elementor Widgets',
    description:
      'Per-role access control for the Elementor editor, published on WordPress.org. An administrator decides which widgets, columns and sections each role may use, and the editor stops offering the rest.',
    summary:
      'A WordPress.org plugin giving per-role control over which Elementor widgets, columns and sections a user may use in the editor.',
    story: [
      'Restrict Elementor Widgets is per-role access control for the Elementor editor. An administrator picks which widgets, columns and sections each role is allowed, and everyone else opens a canvas that simply does not offer the rest.',
      'The problem it solves is an agency problem. A site handed to a client comes with a page builder that can undo the design it was built to protect: a client editing their own copy is welcome, a client dropping an unstyled widget into a carefully built template is a support ticket. Narrowing the palette is what makes handing over the keys safe.',
      'Doing that correctly means the restriction has to hold in the editor rather than only in the interface. A widget hidden from a panel but still reachable is not access control, so the rules are enforced where Elementor asks what a user may insert, not where the list is drawn.',
      'It is published on WordPress.org, which sets the same bar every listed plugin meets: escaped output, sanitised input, a prefixed namespace, and no traffic to anywhere the site owner did not ask for. Roles and capabilities come from WordPress itself rather than a parallel permissions system, because a plugin that invents its own idea of who an editor is will disagree with the site around it.',
    ],
    image: asset('/screenshots/restrict-elementor-widgets.webp'),
    categories: ['wordpress'],
    meta: [
      { key: 'Active installs', value: '400+', signal: true },
      { key: 'Role', value: 'Plugin engineer' },
      { key: 'Built with', value: 'PHP · Elementor · JavaScript' },
    ],
    links: [
      {
        label: 'WordPress.org',
        url: 'https://wordpress.org/plugins/restrict-elementor-widgets/',
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
    what: 'Features, performance and security work on Essential Addons for Elementor, holding backward compatibility across a plugin installed on more than two million sites. Also built internal Node.js and TypeScript products: a book management platform, and FigWP, a service that converts Figma designs into Elementor templates, including the sales, user-credit and import systems and AI-assisted widget generation.',
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
]

export const RELEASES = ['6.9', '6.4', '6.3', '6.2', '6.1']

// Degree and institution only. A dated qualification stated plainly is worth
// more than a paragraph explaining it, and it is the one fact on the site a
// reader cannot infer from the work.
export const EDUCATION = [
  {
    degree: 'MSc, Computer Science',
    where: 'Daffodil International University',
    year: '2021',
  },
  {
    degree: 'BSc, Computer Science',
    where: 'Daffodil International University',
    year: '2018',
  },
]

// Organising and speaking, kept separate from attendance: the first two are
// work done for the community, the last is showing up, and conflating them
// would overstate both.
export const COMMUNITY = {
  contributions: [
    { role: 'Table Lead', event: 'WordCamp Rajshahi', year: '2026' },
    { role: 'Table Lead', event: 'WordCamp Kolkata', year: '2022' },
    { role: 'Speaker', event: 'Elementor Bangladesh Meetup' },
  ],
  attended: ['WordCamp Asia 2023', 'WordCamp Dhaka 2025'],
}

// The home page had 61 crawlable words, and the fix for that is prose that
// says plainly what the work is. Broken into named pillars rather than run as
// four long paragraphs: the same words, but scannable, and each heading is a
// thing someone might actually be searching for.
export const ABOUT = {
  title: 'What I actually do',
  lede: 'Seven years of it, in two halves that keep feeding each other.',
  intro:
    'I am a WordPress and full-stack engineer based in Dhaka, Bangladesh, working remote and async-first. Half the work is WordPress at scale; the other half is product engineering outside it. What follows is the honest version of both.',
  pillars: [
    {
      title: 'WordPress at scale',
      body: 'Custom plugins and themes, Elementor widgets, WooCommerce extensions, third-party API integrations, and the unglamorous maintenance that keeps all of it working after Core and Elementor both move underneath it.',
    },
    {
      title: 'Products end to end',
      body: 'React, Node.js, TypeScript, PHP, Laravel and MySQL. On product work I build the data model, the API and the interface rather than one layer of the three, which is also where the interesting decisions live.',
    },
    {
      title: 'Compatibility as the specification',
      body: 'Essential Addons for Elementor is installed on more than two million sites. At that size a widget that renders differently after an update breaks pages published years ago, so the questions come in a fixed order: what depends on this, what happens to those sites if it changes, and can it change without asking anyone to migrate.',
    },
    {
      title: 'Security as a default, not a pass',
      body: 'A plugin on two million sites is a shared attack surface. Every input reaching PHP is hostile until sanitised and every output dangerous until escaped. Contributions credited in five WordPress Core releases came out of working this way, as did editing Bengali translations for the Polyglots, Core and Photos teams.',
    },
    {
      title: 'What I am looking for',
      body: 'Senior WordPress or full-stack work, and specifically the kind of problem that needs one person to own it end to end — the data model through to the interface, including the decisions in between about what the system should refuse to do.',
    },
  ],
}

// Answer-shaped, because this is what an AI search engine quotes when someone
// asks it who to hire and what for. Kept honest: every answer restates
// something already stated elsewhere on the site.
export const FAQ = [
  {
    q: 'What does Jakaria Istauk build?',
    a: 'Custom WordPress plugins and themes, Elementor widgets, WooCommerce extensions and third-party integrations, plus full-stack products in React, Node.js, TypeScript, PHP, Laravel and MySQL. On product work he builds the data model, the REST API and the interface rather than a single layer.',
  },
  {
    q: 'How much experience does he have?',
    a: 'Seven years, since 2019. Currently a WordPress developer working on Essential Addons for Elementor, which runs on more than two million sites, after earlier full-stack roles at Codexpert and Agemark Technology.',
  },
  {
    q: 'Has he contributed to WordPress Core?',
    a: 'Yes. His contributions are credited in five WordPress Core releases — 6.1, 6.2, 6.3, 6.4 and 6.9 — and he is a Bengali translation editor for the WordPress Polyglots, Core and Photos teams.',
  },
  {
    q: 'Is he available for hire?',
    a: 'He is open to senior WordPress and full-stack roles, working remote and async-first from Dhaka, Bangladesh. The fastest route is email; his CV is downloadable from any page of this site.',
  },
  {
    q: 'What is his strongest technical area?',
    a: 'Maintaining WordPress code at scale: shipping features into a plugin installed on millions of sites without breaking the pages already built on it, which means backward compatibility, performance and security hardening in equal measure.',
  },
]
