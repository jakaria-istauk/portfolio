# Portfolio - Mohammad Jakaria Istauk

Personal portfolio site for a WordPress and full-stack engineer. A React single
page application built with Vite and deployed as static files, with no backend
of its own.

- Live: [jakaria.com.bd](https://jakaria.com.bd)
- Mirror: [jakaria-istauk.github.io/portfolio](https://jakaria-istauk.github.io/portfolio/)

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Build | Vite 4 |
| Styling | Tailwind CSS 3 with a hand written stylesheet in `src/styles/v2.css` |
| Linting | ESLint 9 with the React Hooks and Refresh plugins |

## Requirements

- Node.js 18 or newer (developed on 22)
- npm

## Getting started

```bash
git clone git@github.com:jakaria-istauk/portfolio.git
cd portfolio
npm install
npm run dev
```

The dev server prints a local URL, by default <http://localhost:5173>.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot module replacement |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint over the project |
| `npm run deploy` | Build and publish to the `gh-pages` branch |
| `npm run deploy:ftp` | Build and publish to the `ftp-deploy` branch, which a GitHub Action uploads over FTP |
| `npm run package` | Build for a domain root and zip it for a manual upload |

## Project structure

```
src/
├── main.jsx             Entry point
├── App.jsx              Section composition
├── styles/v2.css        Global styles and Tailwind layers
└── v2/
    ├── Chrome.jsx       Side rail navigation and footer
    ├── Hero.jsx         Intro, figures, CV download
    ├── Work.jsx         Selected projects
    ├── Changelog.jsx    Contribution timeline
    ├── Contact.jsx      Contact form, composes a mailto message
    ├── data.js          All site content: profile, projects, figures, links
    └── useReveal.js     Intersection observer hook for scroll reveals

public/                  Static files copied verbatim into the build
scripts/                 Deployment scripts
.github/workflows/       FTP upload workflow
```

Site content lives in [src/v2/data.js](src/v2/data.js). Edit that file rather
than the components when updating projects, figures, or links.

## Base path

GitHub project pages serve from `/portfolio/`, a custom domain serves from `/`.
[vite.config.js](vite.config.js) reads `BASE_PATH` to pick between them and
defaults to `/`. The deploy scripts set it as needed, so you rarely set it by
hand.

Asset URLs written as JavaScript strings are not rewritten by Vite. Use the
`asset()` helper in [src/v2/data.js](src/v2/data.js) so they stay correct under
any base path.

## Contact form

There is no server behind the form. [src/v2/Contact.jsx](src/v2/Contact.jsx)
assembles the fields into a `mailto:` message and hands it to the visitor's own
mail client, so they keep a copy of what they sent and replies land in a thread
they already have. The site stays fully static, with no endpoint to secure or
keep alive.

## Deployment

Both targets build locally. Neither builds in CI, so what ships is exactly what
you tested. Both scripts refuse to run with uncommitted changes, so every
deploy corresponds to a commit you can point at.

### FTP host (jakaria.com.bd)

```bash
npm run deploy:ftp
```

Builds for the domain root, then pushes the contents of `dist/` to the
`ftp-deploy` branch. Pushing that branch triggers
[.github/workflows/ftp-deploy.yml](.github/workflows/ftp-deploy.yml), which
uploads the tree over FTPS and does nothing else.

Repository secrets the workflow needs:

| Name | Value |
| --- | --- |
| `FTP_SERVER` | Hostname only, no `ftp://` prefix |
| `FTP_USERNAME` | FTP account user |
| `FTP_PASSWORD` | FTP account password |

Optional repository variable `FTP_SERVER_DIR` sets the remote path, with a
trailing slash. It defaults to `./` because this host drops the FTP user
straight into the web root.

The action records what it has already uploaded in
`.ftp-deploy-sync-state.json` in the web root. Deleting that file forces a full
re-upload on the next run.

### GitHub Pages

```bash
npm run deploy
```

Builds with base `/portfolio/` and pushes to the `gh-pages` branch, which holds
build output only and is rewritten on every deploy. Never edit it by hand or
commit source to it. Pages serves the result within a minute or so.

To serve a Pages build from a domain root instead, run `BASE_PATH=/ npm run
deploy` and add the domain to `public/CNAME` as a single line with no protocol,
so it survives each deploy.

### Manual upload

```bash
npm run package
```

Builds for a domain root and writes `jakaria-portfolio-dist.zip`. Upload its
contents to the web root, the files themselves rather than a `dist` folder.

Do not zip `dist/` by hand after `npm run deploy`: that build is pathed for
`/portfolio/` and every asset 404s from a root. The package script rebuilds for
the root and refuses to zip a project page build.

## Contact

- Email: [jakariamd35@gmail.com](mailto:jakariamd35@gmail.com)
- LinkedIn: [jakariaistauk](https://www.linkedin.com/in/jakariaistauk/)
- WordPress.org: [jakariaistauk](https://profiles.wordpress.org/jakariaistauk/)
- GitHub: [jakaria-istauk](https://github.com/jakaria-istauk)
