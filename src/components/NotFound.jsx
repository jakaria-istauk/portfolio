import React from 'react'
import { PROJECTS, href } from './data'
import { projectPath } from './routes'
import ProjectTitle from './ProjectTitle'
import useReveal from './useReveal'

// Served by the host for any path that does not exist. A default server error
// page is a dead end for a reader and for a crawler both, so this one carries
// the full list of real pages — which is also the one place that list is worth
// repeating, now that the footer no longer does.
const NotFound = () => {
  const ref = useReveal()

  return (
    <article className="study" ref={ref}>
      <div className="shell">
        <span className="label">Error 404</span>

        <header className="study__head">
          <h1 className="study__title">This page does not exist.</h1>
          <p className="study__lede">
            The address is wrong, or what used to be here has moved. Everything
            that does exist is one link away.
          </p>

          <div className="study__actions">
            <a className="button button--solid" href={href('/')}>
              Go to the home page
            </a>
          </div>
        </header>

        <nav className="notfound__list rise" aria-label="All pages">
          <h2 className="study__aside-title">Case studies</h2>

          <ul>
            {PROJECTS.map((project) => (
              <li key={project.id}>
                <a href={href(projectPath(project))}>
                  <ProjectTitle project={project} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  )
}

export default NotFound
