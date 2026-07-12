// Site identity — single source of truth for SEO / JSON-LD (Phase 4).
// Domain is placeholder until confirmed (see plan Open Items).
export const site = {
  name: 'Jakaria Istauk',
  jobTitle: 'WordPress Engineer & Plugin Developer',
  description:
    'WordPress engineer & plugin developer based in Bangladesh. Builds plugins used on millions of sites and open-source developer tooling.',
  email: 'hello@jakaria.com.bd',
  location: { country: 'BD', locality: 'Bangladesh' },
  // Order matters: first is treated as primary profile.
  sameAs: [
    'https://github.com/jakariaistauk',
    'https://www.linkedin.com/in/jakariaistauk',
    'https://profiles.wordpress.org/jakariaistauk',
    'https://www.strava.com/athletes/154252698',
  ],
  ogImage: '/og.png',
  ogImageAlt: 'Jakaria Istauk — WordPress Engineer & Plugin Developer',
} as const;

// Human-readable labels for breadcrumb trails, keyed by path segment.
export const pageLabels: Record<string, string> = {
  '': 'Home',
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  contact: 'Contact',
};
