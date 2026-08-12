import React from 'react'
import { EMAIL, PROFILE } from './data'

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const Rail = () => (
  <div className="rail">
    <div className="shell rail__inner">
      <a className="rail__mark" href="#top">
        <span className="rail__dot" aria-hidden="true" />
        Jakaria Istauk
        <span className="rail__status">open to senior roles</span>
      </a>

      <nav className="rail__nav" aria-label="Sections">
        {NAV.map((item) => (
          <a className="rail__link" key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a
          className="rail__link"
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          data-optional="true"
        >
          GitHub
        </a>
      </nav>
    </div>
  </div>
)

export const Footer = () => (
  <footer className="footer">
    <div className="shell footer__inner">
      <p>Built in {PROFILE.location}. Set in Bodoni Moda.</p>

      <div className="footer__links">
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={PROFILE.wordpress} target="_blank" rel="noreferrer">
          WordPress.org
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
)
