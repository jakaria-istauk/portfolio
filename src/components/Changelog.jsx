import React from 'react'
import { HISTORY, RELEASES } from './data'
import useReveal from './useReveal'

const Changelog = () => {
  const ref = useReveal()

  return (
    <section className="section" id="experience" ref={ref}>
      <div className="shell">
        <div className="section__head">
          <h2 className="section__title">Experience</h2>
          <p className="section__note">
            Where the seven years went.
          </p>
        </div>

        <div className="changelog">
          {HISTORY.map((entry) => (
            <article className="entry rise" key={entry.role + entry.when}>
              <p className="entry__when">{entry.when}</p>
              <div>
                <h3 className="entry__role">{entry.role}</h3>
                <p className="entry__where">{entry.where}</p>
                <p className="entry__what">{entry.what}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="releases rise">
          <h3 className="releases__title">Shipped in WordPress itself</h3>

          <div>
            <p className="releases__note">
              Core contributions credited in five releases. Also a Bengali
              translation editor for the Polyglots, Core and Photos teams.
            </p>

            <div className="tags">
              {RELEASES.map((version) => (
                <a
                  className="tag"
                  key={version}
                  href={`https://wordpress.org/documentation/wordpress-version/version-${version}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {version}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Changelog
