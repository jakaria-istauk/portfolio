import React from 'react'
import { ABOUT, FAQ } from './data'
import useReveal from './useReveal'

const About = () => {
  const ref = useReveal()

  return (
    <section className="section" id="about" ref={ref}>
      <div className="shell">
        <div className="section__head">
          <h2 className="section__title">{ABOUT.title}</h2>
          <p className="section__note">{ABOUT.lede}</p>
        </div>

        <div className="prose rise">
          {ABOUT.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className="faq rise">
          <h3 className="faq__title">Common questions</h3>

          <dl className="faq__list">
            {FAQ.map((item) => (
              <div className="faq__item" key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default About
