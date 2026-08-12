import React from 'react'
import { FIGURES, PROFILE } from './data'
import useReveal from './useReveal'

// Every WordPress plugin opens with a header docblock. This one introduces
// the person who writes them.
const ROWS = [
  {
    key: 'Engineer',
    className: 'row__value--name',
    content: PROFILE.name,
  },
  {
    key: 'Description',
    className: 'row__value--lede',
    content: (
      <>
        Nine years building the parts of the web other people ship on — custom
        plugins and themes, third-party integrations, and full-stack products in{' '}
        <em>React</em>, <em>Node.js</em> and <em>PHP</em>.
      </>
    ),
  },
  {
    key: 'Requires',
    className: 'row__value--meta',
    content: 'PHP 8.2 · WordPress 6.x · React 19 · Node 22',
  },
  {
    key: 'Location',
    className: 'row__value--meta',
    content: `${PROFILE.location} · remote, async-first, used to distributed teams`,
  },
  {
    key: 'Author URI',
    className: 'row__value--meta',
    content: (
      <a className="link" href={PROFILE.github}>
        github.com/jakaria-istauk
      </a>
    ),
  },
]

const Hero = () => {
  const ref = useReveal()

  return (
    <header className="hero shell" id="top" ref={ref}>
      <div className="docblock">
        <p className="docblock__open reveal-line" style={{ animationDelay: '0.05s' }}>
          /**
        </p>

        <div className="docblock__rows">
          {ROWS.map((row, i) => (
            <div
              key={row.key}
              className="row reveal-line"
              style={{ animationDelay: `${0.12 + i * 0.09}s` }}
            >
              <span className="row__key">{row.key}</span>
              <div className={`row__value ${row.className}`}>{row.content}</div>
            </div>
          ))}
        </div>

        <p
          className="docblock__close reveal-line"
          style={{ animationDelay: `${0.12 + ROWS.length * 0.09}s` }}
        >
          */
        </p>
      </div>

      <dl className="figures rise">
        {FIGURES.map((figure) => (
          <div className="figure" key={figure.label}>
            <dt className="figure__value">
              {figure.accent
                ? figure.value.replace(figure.accent, '')
                : figure.value}
              {figure.accent && <span>{figure.accent}</span>}
            </dt>
            <dd className="figure__label">{figure.label}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}

export default Hero
