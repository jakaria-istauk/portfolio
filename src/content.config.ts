// Phase 2 — Content Collections (Astro 5 Content Layer API).
// Structured, typed, AI-parseable. Source facts: About/Projects/Skills components
// + astro-upgrade-plan.md. Consumed by pages in Phase 3.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One entry per role. `endDate: null` means current/present.
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    companyUrl: z.string().url().optional(),
    location: z.string().optional(),
    startDate: z.string(), // "YYYY-MM"
    endDate: z.string().nullable().default(null), // null → present
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    order: z.number(), // higher = more recent; sort desc
  }),
});

// Plugins + OSS repos. `featured` surfaces on the home page.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['plugin', 'oss', 'app']),
    role: z.string().optional(),
    blurb: z.string(),
    installs: z.string().optional(), // e.g. "1,000+"
    contributions: z.string().optional(), // e.g. "2M+ active installs"
    stack: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99), // lower = earlier
  }),
});

export const collections = { experience, projects };
