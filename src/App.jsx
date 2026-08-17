import React from 'react'
import { Rail, Footer } from './v2/Chrome'
import Hero from './v2/Hero'
import Work from './v2/Work'
import About from './v2/About'
import Changelog from './v2/Changelog'
import Contact from './v2/Contact'
import CaseStudy from './v2/CaseStudy'
import { resolveRoute } from './v2/routes'

// `path` comes from the URL: the prerender passes each route in turn, and the
// browser passes window.location.pathname. Both resolve through the same
// function, so the markup hydrates against exactly what was built.
function App({ path = '/' }) {
  const route = resolveRoute(path)
  const home = route.name === 'home'

  return (
    <>
      <a className="skip" href={home ? '#work' : '#main'}>
        Skip to {home ? 'work' : 'content'}
      </a>
      <Rail home={home} />
      <main id="main">
        {home ? (
          <>
            <Hero />
            <Work />
            <About />
            <Changelog />
            <Contact />
          </>
        ) : (
          <CaseStudy project={route.project} />
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
