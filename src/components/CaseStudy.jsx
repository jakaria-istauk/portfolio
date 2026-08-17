import React from 'react'
import { PROJECTS, href } from './data'
import { projectPath } from './routes'
import ProjectTitle from './ProjectTitle'
import useReveal from './useReveal'

// The neighbours in the list, so every case study links to two others. A page
// that can only be left by the back button is a dead end for a crawler as
// well as for a reader.
const neighbours = (project) => {
  const index = PROJECTS.indexOf(project)
  const at = (offset) =>
    PROJECTS[(index + offset + PROJECTS.length) % PROJECTS.length]

  return PROJECTS.length > 1 ? [at(-1), at(1)] : []
}

const CaseStudy = ({ project }) => {
  const ref = useReveal(project.id)
  const [previous, next] = neighbours(project)

  return (
    <article className="study" ref={ref}>
      <div className="shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href={href('/')}>Home</a>
          <span aria-hidden="true">/</span>
          <a href={`${href('/')}#work`}>Work</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">
            <ProjectTitle project={project} />
          </span>
        </nav>

        <header className="study__head">
          <h1 className="study__title">
            <ProjectTitle project={project} />
          </h1>
          <p className="study__lede">{project.description}</p>

          <div className="study__actions">
            {project.links.map((link) => (
              <a
                className="button"
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </header>

        <div className="study__shot rise">
          <img
            src={project.image}
            alt={`${project.title} in use`}
            width="1200"
            height="750"
            fetchPriority="high"
          />
        </div>

        <div className="study__body">
          <div className="prose rise">
            <h2 className="study__section-title">What the work involved</h2>

            {project.story.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            {project.note && <p className="card__note">{project.note}</p>}
          </div>

          <aside className="study__aside rise">
            <h2 className="study__aside-title">At a glance</h2>

            <dl className="meta">
              {project.meta.map((item) => (
                <div className="meta__row" key={item.key}>
                  <dt className="meta__key">{item.key}</dt>
                  <dd
                    className={`meta__value${
                      item.signal ? ' meta__value--signal' : ''
                    }`}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {previous && (
          <nav className="study__nav rise" aria-label="More work">
            <a className="study__step" href={href(projectPath(previous))}>
              <span className="label">Previous</span>
              <span>
                <ProjectTitle project={previous} />
              </span>
            </a>
            <a className="study__step study__step--next" href={href(projectPath(next))}>
              <span className="label">Next</span>
              <span>
                <ProjectTitle project={next} />
              </span>
            </a>
          </nav>
        )}
      </div>
    </article>
  )
}

export default CaseStudy
