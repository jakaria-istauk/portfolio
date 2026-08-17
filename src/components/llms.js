import { ABOUT, EMAIL, FAQ, HISTORY, PROFILE, PROJECTS, RELEASES } from './data'
import { SITE_URL } from './site'
import { projectPath } from './routes'

// /llms.txt — a plain-text brief for the crawlers that feed AI answers.
//
// It is a convention, not a standard, and no engine is obliged to read it. It
// costs one generated file and it removes the guesswork: instead of an engine
// reconstructing who this is from prose and markup, the facts, the page list
// and the answers are all in one place, in the order that matters.
//
// Generated from the same data the pages render, so it cannot go stale while
// the site changes around it.
export const llmsTxt = () => {
  const lines = [
    `# ${PROFILE.name}`,
    '',
    `> ${PROFILE.role} in ${PROFILE.location}. ${ABOUT.lede}`,
    '',
    '## Summary',
    '',
    ABOUT.intro,
    '',
    ...ABOUT.pillars.flatMap((pillar) => [`### ${pillar.title}`, '', pillar.body, '']),
    '## Pages',
    '',
    `- [Home](${SITE_URL}/): the work, the experience, and how to get in touch.`,
    ...PROJECTS.map(
      (project) =>
        `- [${project.title}](${SITE_URL}${projectPath(project)}): ${project.summary}`
    ),
    '',
    '## Experience',
    '',
    ...HISTORY.map(
      (entry) => `- ${entry.when} — ${entry.role}, ${entry.where}. ${entry.what}`
    ),
    '',
    '## WordPress Core',
    '',
    `Contributions credited in ${RELEASES.length} releases: ${RELEASES.join(', ')}.`,
    'Bengali translation editor for the WordPress Polyglots, Core and Photos teams.',
    '',
    '## Questions',
    '',
    ...FAQ.flatMap((item) => [`### ${item.q}`, '', item.a, '']),
    '## Contact',
    '',
    `- Email: ${EMAIL}`,
    `- GitHub: ${PROFILE.github}`,
    `- LinkedIn: ${PROFILE.linkedin}`,
    `- WordPress.org: ${PROFILE.wordpress}`,
    `- CV: ${SITE_URL}/Jakaria_Istauk_CV.pdf`,
    '',
  ]

  return lines.join('\n')
}
