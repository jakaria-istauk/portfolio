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

## Phase 3 — Pages & Component Build (redesign) ✅ COMPLETE
Build `.astro` components to the Phase 0 design. Mostly static.
- **Islands (interactivity):**
  - [x] Header mobile menu → hamburger toggle `<script>` in `Nav.astro` (a11y: aria-expanded/controls).
  - [x] Contact form → JS island `fetch`-POSTs **JSON** to `api/contact.php`
        (contract confirmed: JSON body, fields name/email/**subject**/message; returns
        `{success,message,errors}`). Client validation mirrors `api/config.php` lengths;
        success/error status states. Added missing `subject` field.
- Pages:
  - [x] `/` — Hero (headshot, positioning, CTA), featured projects (collection), by-the-numbers stats.
  - [x] `/about` — bio, skills (`data/skills.ts`), community/open source, hobbies (sleeper/runner+Strava).
  - [x] `/experience` — timeline from `experience` collection (date fmt YYYY-MM→Mon YYYY, null→Present).
  - [x] `/projects` — plugins + OSS from collection via shared `ProjectCard.astro`.
  - [x] `/contact` — JSON form island + all channels.
- [x] New shared component: `src/components/ProjectCard.astro`.
- [x] `astro build` clean — 5 pages + sitemap. Islands inline into HTML.
- **Note:** strata still has no repoUrl (card renders without Source link). React/Vite deps
  not yet removed — do after full parity/QA (Phase 7).

## Phase 4 — SEO & Structured Data ✅ COMPLETE
- [x] Per-page `<title>` + unique meta description via `BaseLayout` props (all 5 pages).
- [x] OpenGraph + Twitter card tags (image/width/height/alt, `og:type` profile on home+about).
- [x] OG image: real 1200×630 `public/og.png` (branded card, headless-Chrome render of
      `design/og-card.html` — edit that + re-screenshot to regenerate).
- [x] Canonical URLs. `@astrojs/sitemap`. `robots.txt` (pre-existing).
- [x] Semantic HTML — single `<h1>` per page verified; avatar alt text present.
- [x] **JSON-LD** `@graph` in `BaseLayout` off shared `src/data/site.ts`: `Person`
      (role, location, email, sameAs socials), `WebSite`, per-page `BreadcrumbList`
      (path-derived), + `SoftwareApplication`/`CreativeWork` per project on `/projects`.
      Cross-linked via stable `@id` anchors; validated (parses, entity types correct).
- **Note:** all absolute URLs use placeholder `jakaria.com.bd` — confirm domain (Phase 7 gate).

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
