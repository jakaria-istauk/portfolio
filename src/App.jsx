import React from 'react'
import { Rail, Footer } from './components/Chrome'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Changelog from './components/Changelog'
import Contact from './components/Contact'
import CaseStudy from './components/CaseStudy'
import { resolveRoute } from './components/routes'

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
