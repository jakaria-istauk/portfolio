# Astro Rebuild Plan — Jakaria Istauk Portfolio

**Decisions:** PHP host (keep `api/contact.php`) · Full redesign · Multi-page

## Goal
Rebuild the React/Vite SPA as a multi-page Astro static site: stronger SEO, cleaner
structure, AI-friendly content, fresh visual design. Ship static HTML to a PHP host so
the existing `api/contact.php` backend keeps working unchanged.

## Current State (audited)
- React 19 + Vite 4 SPA, single page (`src/App.jsx`) composing 8 components.
- Tailwind 3 + PostCSS. Static content hardcoded in JSX.
- Sections: Header, Hero, About, Skills, Hobbies (hidden), Projects, Contact, Footer.
- `api/contact.php` (451 lines) — SMTP contact backend, PHP. **Keep.**
- Content source of truth: `jakaria-cv-info.md` (identity, experience, skills, WP contribs, projects).

---

## Phase 0 — Design Direction (redesign) ✅ COMPLETE
Do this before building. Full redesign needs a target look first.
- [x] Pick visual direction: **modern minimal dev-portfolio** — dark-first, mono accents,
  generous whitespace, strong type scale. Refs: linear.app, leerob.io.
- [x] Define tokens: color palette (light + dark), type scale, spacing, radius, shadow.
  → `design/tokens.css` (CSS custom properties, source of truth).
- [x] Rough wireframe per page (low-fi). → `design/preview.html` (5 pages + token showcase).
- [x] Verified in Chrome (both themes, toggle, console clean). Commit `9de947c`.
- **Gate:** approve direction + tokens before Phase 2.

## Phase 1 — Astro Setup (in-repo, side-by-side) ✅ COMPLETE
- [x] Scaffold Astro in current repo (SPA untouched — vite scripts kept; astro on `dev:astro`/`build:astro`).
- [x] Deps: `astro@5`, `@astrojs/tailwind@6`, `@astrojs/sitemap@3`, `@astrojs/mdx@4`.
      (Astro 7 pinned down to 5 — `@astrojs/tailwind` caps at Astro 5 + keeps Tailwind 3 config.)
- [x] `astro.config.mjs`: `output: 'static'`, `site: 'https://jakaria.com.bd'` (placeholder), sitemap + mdx.
- [x] Ported tokens → `tailwind.config.js` (semantic CSS-var colors, neutral/iris ramps, type scale,
      radius, shadow) + `src/styles/tokens.css` (copy) + `src/styles/global.css` (reset + primitives).
- [x] Structure: `src/pages/` (5 pages), `src/layouts/BaseLayout.astro` (head+SEO+OG+canonical),
      `src/components/` (`Nav.astro`, `Footer.astro`), `src/content/` (dir; schemas in Phase 2),
      `public/robots.txt`, `public/llms.txt`.
- [x] `api/` untouched. Contact page form POSTs to `/api/contact.php`.
- [x] `astro build` → 5 pages + `sitemap-index.xml`. Verified in Chrome (dark theme, tokens, nav
      active-state, fonts, footer, contact form; console clean). `.astro/` gitignored.
- **Gate:** confirm production domain before Phase 7 (sitemap/canonical/robots/llms use placeholder).

## Phase 2 — Content Collections ✅ COMPLETE
Structured, typed, AI-parseable. Source = About/Projects/Skills JSX + plan
(`jakaria-cv-info.md` not present in repo).
- [x] `src/content.config.ts` (Astro 5 Content Layer API + glob loader) — zod schemas.
- [x] `experience` collection — one entry per role (title, company, dates, summary,
      highlights, order): wpdeveloper, codexpert, agemark.
- [x] `projects` collection — plugins + OSS (name, type, role, installs/contributions,
      stack, links, blurb, featured, order): Essential Addons (2M+), Tablentor (1k+),
      Smoky Ghost Trail, strata.
- [x] `skills` as typed `.ts` module → `src/data/skills.ts` (categories + learning tags).
- [x] `astro sync` + `astro build` clean (schemas validate all entries).
- **Note:** strata repoUrl omitted (unverified). Confirm before Phase 3.

## Phase 3 — Pages & Component Build (redesign)
Build `.astro` components to the Phase 0 design. Mostly static.
- **Islands (interactivity) — only where needed:**
  - Header mobile menu → tiny `<script>` or Astro island.
  - Contact form → static HTML form POSTing to `api/contact.php`; JS island for
    validation + success/error states (keep current PHP contract).
- Pages:
  - `/` — Hero, positioning, featured projects, CTA.
  - `/about` — bio, education, community/speaking, hobbies.
  - `/experience` — timeline from `experience` collection.
  - `/projects` — plugins (Tablentor 1k+ installs, EAE 2M+ contrib) + OSS (strata, etc.).
  - `/contact` — form + all channels.
- Kill React/Vite deps once parity confirmed.

## Phase 4 — SEO & Structured Data
- Per-page `<title>` + meta description via `BaseLayout` props.
- OpenGraph + Twitter card tags; generate/point to OG image.
- Canonical URLs. `@astrojs/sitemap`. `robots.txt`.
- Semantic HTML, heading hierarchy, alt text.
- **JSON-LD:** `Person` (Jakaria — role, location, sameAs socials), `WebSite`,
  `BreadcrumbList`, `SoftwareApplication`/`CreativeWork` for plugins.

## Phase 5 — AI-Friendly Layer
- `public/llms.txt` — machine summary: name, role, location, expertise, key projects,
  contact. Mirror `jakaria-cv-info.md` positioning.
- Clean semantic headings + concise summaries per section.
- JSON-LD (Phase 4) doubles as AI-readable facts.

## Phase 6 — Perf & A11y
- Astro `<Image>` for optimized/responsive images (AVIF/WebP), lazy load below fold.
- Zero/near-zero JS on static pages (islands only).
- Keyboard nav, focus states, color contrast (both themes).
- Lighthouse: target 95+ across the board.

## Phase 7 — QA, Build, Deploy
- `astro build` → static `dist/`.
- Deploy layout on PHP host: static site at web root + `api/` reachable at `/api/`.
  Verify contact form E2E hits `api/contact.php` and sends mail.
- Validate: sitemap, robots, JSON-LD (Rich Results test), OG (social debuggers), mobile.
- Post-launch: submit sitemap, monitor indexing.

---

## Delivery Order
1. Design direction + tokens (Phase 0) — **gate**
2. Astro setup (Phase 1)
3. Content collections (Phase 2)
4. Pages/components (Phase 3)
5. SEO + JSON-LD + llms.txt (Phase 4–5)
6. Perf/a11y polish (Phase 6)
7. Build + deploy + validate (Phase 7)

## Timeline (est.)
- Phase 0: 0.5–1 day · Phase 1–2: 1 day · Phase 3: 2–3 days (redesign) ·
  Phase 4–5: 1 day · Phase 6: 0.5 day · Phase 7: 0.5 day. **~6–7 days.**

## Open Items
- Confirm production domain (`jakaria.com.bd` vs jamiluddin.com) for `site` + canonical.
- Confirm Codexpert end date gap (`jakaria-cv-info.md` note).
- Provide/approve OG image + headshot.
