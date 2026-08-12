import React from 'react'
import { Rail, Footer } from './v2/Chrome'
import Hero from './v2/Hero'
import Work from './v2/Work'
import Changelog from './v2/Changelog'
import Contact from './v2/Contact'

function App() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Rail />
      <main>
        <Hero />
        <Work />
        <Changelog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
