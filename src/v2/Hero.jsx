import React from 'react'
import { CV, FIGURES, PROFILE } from './data'
import useReveal from './useReveal'

const FACTS = [
  'Dhaka, Bangladesh',
  'Remote, async-first',
  'Open to senior roles',
]

const Hero = () => {
  const ref = useReveal()

  return (
    <header className="hero shell" id="top" ref={ref}>
      <span className="label hero__name settle" style={{ animationDelay: '0.05s' }}>
        {PROFILE.name} — {PROFILE.role}
      </span>

      <h1 className="hero__claim settle" style={{ animationDelay: '0.15s' }}>
        Nine years building the parts of the web <em>other people ship on.</em>
      </h1>

      <p className="hero__lede settle" style={{ animationDelay: '0.3s' }}>
        Custom WordPress plugins and themes, third-party integrations, and
        full-stack products in React, Node.js and PHP.{' '}
        <strong>
          Code I maintain runs on more than two million sites.
        </strong>
      </p>

      <div className="hero__actions settle" style={{ animationDelay: '0.42s' }}>
        <a className="button button--solid" href={CV.file} download={CV.filename}>
          Download resume
          <span aria-hidden="true">↓</span>
        </a>
        <a className="button" href="#work">
          See the work
        </a>
      </div>

      <div className="hero__meta settle" style={{ animationDelay: '0.5s' }}>
        {FACTS.map((fact) => (
          <span className="label" key={fact}>
            {fact}
          </span>
        ))}
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
