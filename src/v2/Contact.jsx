import React, { useState } from 'react'
import { EMAIL, PROFILE } from './data'
import useReveal from './useReveal'

const CHANNELS = [
  { key: 'Email', value: EMAIL, url: `mailto:${EMAIL}` },
  { key: 'GitHub', value: 'jakaria-istauk', url: PROFILE.github },
  { key: 'LinkedIn', value: 'jakariaistauk', url: PROFILE.linkedin },
  { key: 'WordPress', value: 'profiles.wordpress.org', url: PROFILE.wordpress },
  { key: 'X', value: 'jakaria_istauk', url: PROFILE.x },
]

const Contact = () => {
  const ref = useReveal()
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [composed, setComposed] = useState(false)
  const [copied, setCopied] = useState(false)

  const update = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value })

  // This site is hosted as static files, so there is no server to post to.
  // The message opens in the visitor's own mail client instead — they keep a
  // copy of what they sent, and replies land in a thread they already have.
  const compose = (event) => {
    event.preventDefault()
    const body = [form.message, '', '—', `${form.name} <${form.email}>`].join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(body)}`
    setComposed(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="shell">
        <div className="section__head">
          <h2 className="section__title">Get in touch</h2>
        </div>

        <div className="contact">
          <div className="rise">
            <p className="contact__lede">
              Open to senior WordPress and full-stack roles, and to the kind of
              problem that needs someone to own it end to end.
            </p>

            <div className="contact__list">
              {CHANNELS.map((channel) => (
                <a
                  className="contact__item"
                  key={channel.key}
                  href={channel.url}
                  target={channel.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                >
                  <span>{channel.key}</span>
                  <span>{channel.value}</span>
                </a>
              ))}
            </div>
          </div>

          <form className="form rise" onSubmit={compose}>
            <h3 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
              Write a message
            </h3>
            <p className="form__hint">
              Opens in your own mail app, so you keep a copy of what you sent.
            </p>

            {composed && (
              <div className="notice" role="status">
                <strong>Your mail app should be open.</strong>
                Nothing happened? Write to {EMAIL} directly.{' '}
                <button type="button" onClick={copyEmail}>
                  {copied ? 'Copied' : 'Copy address'}
                </button>
              </div>
            )}

            <div className="pair">
              <label className="field">
                <span className="field__label">Your name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  autoComplete="name"
                  placeholder="Jane Reviewer"
                />
              </label>

              <label className="field">
                <span className="field__label">Your email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  required
                  autoComplete="email"
                  placeholder="jane@studio.com"
                />
              </label>
            </div>

            <label className="field">
              <span className="field__label">Subject</span>
              <input
                name="subject"
                value={form.subject}
                onChange={update}
                required
                placeholder="A role, a project, or a question"
              />
            </label>

            <label className="field">
              <span className="field__label">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={update}
                required
                rows={6}
                placeholder="What are you building?"
              />
            </label>

            <button className="submit" type="submit">
              Open in mail app
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
