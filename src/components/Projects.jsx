import React, { useState } from 'react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 'essential-addons',
      title: 'Essential Addons for Elementor',
      description:
        'The most-installed Elementor addon, running on 2 million+ sites. I work across the widget library, performance, security hardening and backward compatibility for a codebase used daily by non-technical site builders.',
      image: '/screenshots/essential-addons.webp',
      metric: '2M+ active installs',
      technologies: ['PHP', 'WordPress', 'Elementor', 'JavaScript', 'SCSS'],
      categories: ['wordpress'],
      role: 'Plugin engineer',
      liveUrl: 'https://essential-addons.com',
      githubUrl:
        'https://github.com/WPDevelopers/essential-addons-for-elementor-lite',
    },
    {
      id: 'bookclub',
      title: 'BookClub',
      description:
        'Internal library platform for a distributed team: catalogue, borrow and return flows, ratings and title suggestions, with domain-restricted authentication. Built end to end — data model, REST API, and the front end.',
      image: '/screenshots/bookclub.webp',
      metric: 'Production, sign-in required',
      technologies: ['Node.js', 'TypeScript', 'React', 'REST API', 'MySQL'],
      categories: ['fullstack'],
      role: 'Sole engineer',
      liveUrl: 'https://bookclub.oorol.com',
      liveLabel: 'View Live',
      note: 'Private instance — sign-in restricted to verified company domains.',
    },
    {
      id: 'strata',
      title: 'Strata',
      description:
        'A self-hosted database admin client: browse data, run SQL and manage schema from a React SPA sitting on a thin PHP + PDO JSON API. Credentials never leave the browser. Ships as a zip — no Node, no Composer.',
      image: '/screenshots/strata.webp',
      metric: 'Open source · v1.2.2',
      technologies: ['TypeScript', 'React', 'PHP', 'PDO', 'MySQL'],
      categories: ['fullstack', 'frontend'],
      role: 'Creator',
      liveUrl: 'https://jakaria-istauk.github.io/strata/',
      githubUrl: 'https://github.com/jakaria-istauk/strata',
    },
    {
      id: 'tablentor',
      title: 'Tablentor',
      description:
        'A table builder addon for Elementor published on WordPress.org. Custom widget, live editor controls, responsive output and import/export — built to WordPress plugin review standards.',
      image: '/screenshots/tablentor.webp',
      metric: '1K+ active installs on WordPress.org',
      technologies: ['PHP', 'WordPress', 'Elementor', 'JavaScript'],
      categories: ['wordpress'],
      role: 'Creator',
      liveUrl: 'https://wordpress.org/plugins/tablentor/',
      liveLabel: 'WordPress.org',
      githubUrl: 'https://github.com/jakaria-istauk/tablentor',
    },
    {
      id: 'hajjflow',
      title: 'HajjFlow',
      description:
        'A Bengali-language Hajj ritual planner. Offline-capable, mobile-first, and fully localised — an exercise in typography and readability for a non-Latin script.',
      image: '/screenshots/hajjflow.webp',
      metric: 'Localised, offline-first',
      technologies: ['JavaScript', 'HTML', 'CSS', 'i18n'],
      categories: ['frontend'],
      role: 'Creator',
      liveUrl: 'https://jakaria-istauk.github.io/hajjflow/',
      githubUrl: 'https://github.com/jakaria-istauk/hajjflow',
    },
    {
      id: 'smoky-ghost-trail',
      title: 'Smoky Ghost Trail',
      description:
        'A lightweight WebGL cursor-trail library that attaches to any DOM element. Zero dependencies, shader-based rendering, and a small public API.',
      image: '/screenshots/smoky.webp',
      metric: 'Zero-dependency library',
      technologies: ['JavaScript', 'WebGL', 'GLSL', 'CSS'],
      categories: ['frontend'],
      role: 'Creator',
      liveUrl: 'https://jakaria-istauk.github.io/smoky-ghost-cursor-trail/',
      githubUrl: 'https://github.com/jakaria-istauk/smoky-ghost-cursor-trail',
    },
  ]

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'wordpress', label: 'WordPress' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
  ]

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter))

  const ProjectCard = ({ project }) => (
    <article className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          width="1200"
          height="750"
          className="w-full h-56 object-cover object-top transition-transform duration-300 hover:scale-105"
        />
        {project.metric && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gray-900/80 text-white text-xs font-medium backdrop-blur-sm">
            {project.metric}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
          <span className="text-xs uppercase tracking-wide text-gray-500 whitespace-nowrap">
            {project.role}
          </span>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

        {project.note && (
          <p className="text-xs text-gray-500 italic mb-4">{project.note}</p>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              {project.liveLabel || 'Live Demo'}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shipped work — WordPress plugins used by millions, full-stack products,
            and open-source tools. Every project below is live and inspectable.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Want to see more of my work?</p>
          <a
            href="https://github.com/jakaria-istauk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
