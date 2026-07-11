// Phase 2 — skills as a typed data module (plan: optional .ts/.json).
// Source: src/components/Skills.jsx. Consumed by pages in Phase 3.

export type Skill = { name: string; level: number };
export type SkillCategory = { title: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 70 },
      { name: 'JavaScript', level: 75 },
      { name: 'TypeScript', level: 55 },
      { name: 'HTML/CSS', level: 75 },
      { name: 'Tailwind CSS', level: 60 },
      { name: 'Vue.js', level: 55 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'PHP', level: 90 },
      { name: 'WordPress', level: 95 },
      { name: 'Node.js', level: 58 },
      { name: 'MySQL', level: 87 },
      { name: 'PostgreSQL', level: 65 },
      { name: 'REST APIs', level: 92 },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'Figma', level: 85 },
      { name: 'Jest', level: 80 },
      { name: 'Webpack', level: 75 },
    ],
  },
];

// Flat "always learning" tag cloud.
export const learningTags: string[] = [
  'GraphQL',
  'Next.js',
  'AI',
  'n8n',
  'React Native',
  'Laravel',
  'Python',
  'Express.js',
  'MongoDB',
];
