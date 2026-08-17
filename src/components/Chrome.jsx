import React, { useEffect, useState } from 'react'
import { CV, EMAIL, PROFILE, href } from './data'

const NAV = [
  { label: 'Work', hash: '#work' },
  { label: 'About', hash: '#about' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Contact', hash: '#contact' },
]

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="12" r="4.2" />
    <path
      strokeLinecap="round"
      d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M18.7 5.3l-1.5 1.5M6.8 17.2l-1.5 1.5"
    />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path
      strokeLinejoin="round"
      d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4Z"
    />
  </svg>
)

const SystemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="4.5" width="18" height="12.5" rx="1.6" />
    <path strokeLinecap="round" d="M9 20.5h6" />
  </svg>
)

const MODES = [
  { value: 'light', label: 'Light', icon: <SunIcon /> },
  { value: 'dark', label: 'Dark', icon: <MoonIcon /> },
  { value: 'system', label: 'System', icon: <SystemIcon /> },
]

// `system` means no data-theme attribute at all, which hands the decision back
// to the prefers-color-scheme rules in the stylesheet. index.html applies the
// stored choice before first paint; this only keeps it in sync afterwards.
const applyTheme = (mode) => {
  if (mode === 'system') {
    delete document.documentElement.dataset.theme
  } else {
    document.documentElement.dataset.theme = mode
  }

  try {
    localStorage.setItem('theme', mode)
  } catch {
    // Private browsing can refuse storage; the choice still holds this visit.
  }
}

const ThemeControl = () => {
  const [mode, setMode] = useState('system')

  useEffect(() => {
    let stored = null
    try {
      stored = localStorage.getItem('theme')
    } catch {
      stored = null
    }
    setMode(stored === 'light' || stored === 'dark' ? stored : 'system')
  }, [])

  const choose = (next) => {
    applyTheme(next)
    setMode(next)
  }

  return (
    <div className="themes" role="group" aria-label="Colour theme">
      {MODES.map(({ value, label, icon }) => (
        <button
          key={value}
          type="button"
          className="themes__option"
          aria-pressed={mode === value}
          aria-label={`${label} theme`}
          title={`${label} theme`}
          onClick={() => choose(value)}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}

// On a case study the section anchors live on another page, so they have to
// carry the home path with them — a bare #work there scrolls nowhere.
export const Rail = ({ home = true }) => (
  <div className="rail">
    <div className="shell rail__inner">
      <a className="rail__mark" href={home ? '#top' : href('/')}>
        Jakaria Istauk
      </a>

      <nav className="rail__nav" aria-label="Sections">
        {NAV.map((item) => (
          <a
            className="rail__link"
            key={item.hash}
            href={home ? item.hash : `${href('/')}${item.hash}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="rail__right">
        <ThemeControl />

        <a className="rail__cta" href={CV.file} download={CV.filename}>
          Resume
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
  </div>
)

export const Footer = () => (
  <footer className="footer">
    <div className="shell footer__inner">
      {/* The year is baked in at build time and read again in the browser.
          Those disagree for anyone visiting after a new year on an old build,
          which is a stale copyright line, not a hydration bug worth an error. */}
      <p suppressHydrationWarning>
        © {new Date().getFullYear()} {PROFILE.name}
      </p>

      <div className="footer__links">
        <a href={CV.file} download={CV.filename}>
          Download resume
        </a>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        {/* rel="me" states that these profiles are the same person as this
            page. It is the machine-readable half of the sameAs list in the
            JSON-LD, and the half a crawler sees without parsing scripts. */}
        <a href={PROFILE.github} target="_blank" rel="me noreferrer">
          GitHub
        </a>
        <a href={PROFILE.wordpress} target="_blank" rel="me noreferrer">
          WordPress.org
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="me noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
)
