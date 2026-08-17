import React, { useState } from 'react'
import { FILTERS, PROJECTS, href } from './data'
import { projectPath } from './routes'
import ProjectTitle from './ProjectTitle'
import useReveal from './useReveal'

const Card = ({ project }) => (
  <article className="card rise">
    <a className="card__shot" href={href(projectPath(project))}>
      <img
        src={project.image}
        alt={`${project.title} in use`}
        loading="lazy"
        width="1200"
        height="750"
      />
    </a>

    <div className="card__body">
      <h3 className="card__title">
        <a href={href(projectPath(project))}>
          <ProjectTitle project={project} />
        </a>
      </h3>
      <p className="card__desc">{project.description}</p>
      {project.note && <p className="card__note">{project.note}</p>}

      <dl className="meta">
        {project.meta.map((item) => (
          <div className="meta__row" key={item.key}>
            <dt className="meta__key">{item.key}</dt>
            <dd
              className={`meta__value${item.signal ? ' meta__value--signal' : ''}`}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="card__actions">
        <a className="card__action" href={href(projectPath(project))}>
          Read the case study
          <span aria-hidden="true">→</span>
        </a>

        {project.links.map((link) => (
          <a
            className="card__action"
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
            <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </div>
  </article>
)

const Work = () => {
  const [filter, setFilter] = useState('everything')
  const ref = useReveal(filter)

  const shown =
    filter === 'everything'
      ? PROJECTS
      : PROJECTS.filter((project) => project.categories.includes(filter))

  return (
    <section className="section" id="work" ref={ref}>
      <div className="shell">
        <div className="section__head">
          <h2 className="section__title">Work</h2>
          <p className="section__note">
            Everything here is live, and everything here is mine to point at.
          </p>

          <div className="filters" role="group" aria-label="Filter work">
            {FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                className="filter"
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="work">
          {shown.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
