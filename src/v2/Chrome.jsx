import React, { useEffect, useState } from 'react'
import { CV, EMAIL, PROFILE } from './data'

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="4.5" />
    <path
      strokeLinecap="round"
      d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"
    />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path
      strokeLinejoin="round"
      d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4Z"
    />
  </svg>
)

// The theme is applied to <html> before React mounts (see index.html), so this
// only has to read what is already there and keep it in sync from here on.
const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private browsing can refuse storage; the toggle still works this visit.
    }
    setTheme(next)
  }

  const label =
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export const Rail = () => (
  <div className="rail">
    <div className="shell rail__inner">
      <a className="rail__mark" href="#top">
        Jakaria Istauk
      </a>

      <div className="rail__right">
        <nav className="rail__nav" aria-label="Sections">
          {NAV.map((item) => (
            <a className="rail__link" key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a
            className="rail__link"
            href={CV.file}
            download={CV.filename}
            data-optional="true"
          >
            CV
          </a>
        </nav>

        <ThemeToggle />
      </div>
    </div>
  </div>
)

export const Footer = () => (
  <footer className="footer">
    <div className="shell footer__inner">
      <p>Built in {PROFILE.location}.</p>

      <div className="footer__links">
        <a href={CV.file} download={CV.filename}>
          Download CV
        </a>
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
