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

        <p className="about__intro rise">{ABOUT.intro}</p>

        {/* Each pillar is a heading and one paragraph. The same material read as
            a wall of text when it was four long paragraphs in a single column
            against an empty half of the page. */}
        <div className="about__grid">
          {ABOUT.pillars.map((pillar, index) => (
            <div className="pillar rise" key={pillar.title}>
              <span className="pillar__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="pillar__title">{pillar.title}</h3>
              <p className="pillar__body">{pillar.body}</p>
            </div>
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
