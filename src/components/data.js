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
    id: 'wpsubscription',
    title: 'WPSubscription',
    description:
      'Subscriptions and recurring payments for WooCommerce, published on WordPress.org. Billing cycles, free trials, installment plans and a customer self-service area, renewed in the background through Stripe, PayPal and further gateways.',
    summary:
      'A WordPress.org plugin that turns any WooCommerce product into a subscription, with automated recurring billing across several payment gateways.',
    story: [
      'WPSubscription turns any WooCommerce product into a subscription. A store owner sets a billing cycle — daily, weekly, monthly or yearly — adds a free trial or a sign-up fee if they want one, and the plugin takes it from there: renewals are charged automatically at the start of each cycle, and the customer never has to come back to the checkout.',
      'Recurring billing is a lifecycle, not a payment. A subscription is created, renewed, paused, switched to another plan, cancelled, or left to expire, and every one of those transitions has to be reflected in WooCommerce orders, in the email a customer receives, and in the activity log a store owner reads when something looks wrong. Most of the engineering is in keeping those three in agreement.',
      'Payment gateways are where that gets hard. Stripe and PayPal renew subscriptions in the free plugin, with further gateways in Pro, and each one has its own idea of what a recurring charge is, when it failed, and how a customer replaces an expired card. The plugin has to present one consistent subscription on top of all of them.',
      'I contribute to the plugin as part of the team that builds it, working on its core architecture, feature development and payment gateway integrations. I also built Doel, an AI agent for the product that answers user questions on Telegram and Discord, validates reported issues, opens GitHub issues, drafts candidate pull requests, and writes the release changelogs.',
    ],
    image: asset('/screenshots/wpsubscription.webp'),
    categories: ['wordpress'],
    meta: [
      { key: 'Role', value: 'Contributor' },
      { key: 'Built with', value: 'PHP · WooCommerce · JavaScript' },
    ],
    links: [
      { label: 'WordPress.org', url: 'https://wordpress.org/plugins/subscription/' },
      { label: 'Visit site', url: 'https://wpsubscription.co/' },
    ],
  },
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
      { key: 'Role', value: 'Creator' },
      { key: 'Built with', value: 'PHP · Elementor · JavaScript' },
    ],
    links: [
      { label: 'WordPress.org', url: 'https://wordpress.org/plugins/tablentor/' },
      { label: 'Source', url: 'https://github.com/jakaria-istauk/tablentor' },
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
    id: 'muhtamim',
    title: 'Muhtamim',
    description:
      'An ERP for madrasas, in Bengali and English. Admissions, attendance, exams and results, fees and expenses, and hifz progress, in one tenant-isolated workspace with a role for the administrator, the teacher, the parent and the student.',
    summary:
      'A bilingual madrasa ERP on Laravel: admissions, attendance, exams, fees and hifz progress in one tenant-isolated workspace.',
    story: [
      'Muhtamim is an ERP for madrasas. Admissions and student records, teacher and student attendance, classes and subjects, exams and results, fees and expenses, notices to parents, and hifz progress against the thirty juz, all in one workspace rather than the register, the ledger and the phone call that usually carry them.',
      'Hifz tracking is the part no general school system has, and it is the reason a madrasa cannot simply adopt one. Memorisation progress is not a grade: it accumulates, it is revised, and it is assessed on recitation quality rather than a mark out of a hundred. Modelling it as its own thing, alongside tajweed assessment, is what makes the rest of the system worth adopting.',
      'Four roles read the same data and need four different products from it. An administrator wants the institution at a glance, a teacher wants one class at a time, a parent wants one child, and a student wants their own record. Permissions are enforced per action rather than per screen, because a role that cannot see a page but can still call what the page calls is not a role.',
      'Every institution is a separate tenant, and keeping that boundary intact is the whole trust proposition: a madrasa handing over its student roll is handing over the records of children, and the answer to who else can see them has to be nobody. It is built on Laravel with Tailwind CSS, and it ships in Bengali and English from one string catalogue, so switching language changes the interface rather than the version of the product you are using.',
    ],
    image: asset('/screenshots/muhtamim.webp'),
    note: 'The workspace itself is behind sign-in; the public site is the marketing page.',
    categories: ['full-stack', 'interface'],
    meta: [
      { key: 'Languages', value: 'Bengali · English' },
      { key: 'Role', value: 'Creator' },
      { key: 'Built with', value: 'Laravel · PHP · Tailwind CSS' },
    ],
    links: [{ label: 'Visit site', url: 'https://muhtamim.oorol.com/' }],
  },
  {
    id: 'doel',
    title: 'Doel',
    description:
      'A support-to-release agent for WordPress product teams. It reads every customer ticket, finds the cause in the product code and carries it to a tested fix, with the pull requests ready for review.',
    summary:
      'A support-to-release agent: reads customer tickets, reproduces them on a bench store, files the issue, opens tested pull requests and prepares the release.',
    story: [
      'Doel is a support-to-release agent for WordPress products. Every ticket that arrives is read in full, traced into the product code and the knowledge base, and answered with a draft reply — then carried the rest of the way: reproduced on a real store, filed as a GitHub issue, fixed on a branch cut from dev, and handed back as a pull request with the release draft attached. The distance between a support ticket and a release is normally weeks of context-switching; the point of the agent is to walk it every time, the same way, without dropping anything.',
      'Reading a ticket is the easy part; believing it is the test. The steps a customer describes are run on a bench store in a real browser, so a report becomes a reproduction before anyone writes a line of fix code — which is also what catches the tickets that are not bugs at all, before they cost an engineer an afternoon. What the reproduction shows becomes the issue on the board: the cause, the steps, and where it started, rather than a complaint pasted into a tracker.',
      'No single model is good at every step. Triage wants a fast reader, a customer reply wants a careful writer, and the fix itself wants the strongest coder available. Doel hands each job to the model that does it best, and when one is busy or cannot finish, the next one in line takes over — the run keeps moving instead of waiting on a single provider.',
      'The panel is the trust surface, not a dashboard. Every step that reaches the outside world — a reply to a customer, an issue on the board, a pull request, a release — waits there for a yes, with what the agent read and ran on the record beside it. Steps that have earned trust are allowed to run on their own, so the guardrail moves with the confidence rather than holding the whole pipeline hostage to it.',
    ],
    image: asset('/screenshots/doel.webp'),
    note: 'The panel is behind team sign-in; the public site is the product page.',
    categories: ['full-stack', 'interface'],
    meta: [
      { key: 'Role', value: 'Creator, engineer' },
      { key: 'Built with', value: 'Python · JavaScript · LLM APIs' },
    ],
    links: [{ label: 'Visit site', url: 'https://doel.oorol.com/' }],
  },
]

export const FILTERS = ['everything', 'wordpress', 'full-stack', 'interface']

export const HISTORY = [
  {
    when: 'Sep 2026 — Present',
    role: 'Software Engineer',
    where: 'ThemeXpert',
    what: 'Leads core architecture and feature development for WPSubscription, a WordPress.org subscription plugin: subscription management, recurring billing lifecycles and payment gateway integrations. Also built Doel, an autonomous AI agent for the product that works across Telegram and Discord to answer client queries, validate reported issues, open GitHub issues, draft candidate pull requests, and write the release changelogs and newsletters.',
  },
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
      title: 'Agents that do real work',
      body: 'Autonomous AI workflows built on the Claude Agent SDK and LLM function calling, aimed at the work around a product rather than a demo: triaging support questions, reproducing reported issues, opening GitHub issues, drafting candidate pull requests, and writing release changelogs and newsletters.',
    },
    {
      title: 'The work I like best',
      body: 'The kind of problem that needs one person to own it end to end — the data model through to the interface, including the decisions in between about what the system should refuse to do.',
    },
  ],
}

// Answer-shaped, because this is what an AI search engine quotes when someone
// asks it who to hire and what for. Kept honest: every answer restates
// something already stated elsewhere on the site.
export const FAQ = [
  {
    q: 'What does Jakaria Istauk build?',
    a: 'Custom WordPress plugins and themes, Elementor widgets, WooCommerce extensions and third-party integrations, plus full-stack products in React, Node.js, TypeScript, PHP, Laravel and MySQL, and autonomous AI agents built on the Claude Agent SDK. On product work he builds the data model, the REST API and the interface rather than a single layer.',
  },
  {
    q: 'How much experience does he have?',
    a: 'Seven years, since 2019. Currently a software engineer at ThemeXpert, leading development of the WPSubscription plugin. Before that he spent four years on Essential Addons for Elementor, which runs on more than two million sites, after earlier full-stack roles at Codexpert and Agemark Technology.',
  },
  {
    q: 'Has he contributed to WordPress Core?',
    a: 'Yes. His contributions are credited in five WordPress Core releases — 6.1, 6.2, 6.3, 6.4 and 6.9 — and he is a Bengali translation editor for the WordPress Polyglots, Core and Photos teams.',
  },
  {
    q: 'How can I get in touch with him?',
    a: 'He works remote and async-first from Dhaka, Bangladesh. The fastest route is email; his CV is downloadable from any page of this site.',
  },
  {
    q: 'What is his strongest technical area?',
    a: 'Maintaining WordPress code at scale: shipping features into a plugin installed on millions of sites without breaking the pages already built on it, which means backward compatibility, performance and security hardening in equal measure.',
  },
]
