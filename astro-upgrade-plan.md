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

## Phase 0 — Design Direction (redesign)
Do this before building. Full redesign needs a target look first.
- Pick visual direction: **modern minimal dev-portfolio** — dark-first, mono accents,
  generous whitespace, strong type scale. Confirm with 1–2 reference sites.
- Define tokens: color palette (light + dark), type scale, spacing, radius, shadow.
  Encode as CSS custom properties + Tailwind theme extend.
- Rough wireframe per page (low-fi). Get sign-off before component build.
- **Gate:** approve direction + tokens before Phase 2.

## Phase 1 — Astro Setup (in-repo, side-by-side)
- Scaffold Astro in current repo (avoid nuking working SPA until parity reached).
- Deps: `astro`, `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/mdx`.
- `astro.config.mjs`: `output: 'static'`, `site: 'https://<domain>'`, sitemap integration.
- Port `tailwind.config.js` + design tokens from Phase 0.
- Structure:
  - `src/pages/` — index, about, experience, projects, contact
  - `src/layouts/BaseLayout.astro` — html head, SEO, nav, footer slot
  - `src/components/` — section + UI components (`.astro`)
  - `src/content/` — collections (experience, projects)
  - `public/` — favicon, `robots.txt`, `llms.txt`, OG images
- Keep `api/` untouched. Build output → serve alongside `api/` on PHP host.

## Phase 2 — Content Collections
Structured, typed, AI-parseable. Source = `jakaria-cv-info.md`.
- `src/content/config.ts` — zod schemas.
- `experience` collection — one entry per role (company, title, dates, bullets).
- `projects` collection — plugins + OSS repos (name, role, installs, stack, links, blurb).
- Optional `skills` data as a `.ts`/`.json` module.

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
