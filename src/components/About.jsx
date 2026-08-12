import React from 'react'

const About = () => {
  const experiences = [
    {
      title: 'WordPress Developer',
      company: 'WPDeveloper, Inc',
      period: 'Mar 2022 - Jul 2026',
      description: 'Built features, performance and security work for Essential Addons for Elementor (2M+ installs), maintaining backward compatibility across a large plugin codebase. Also built internal Node.js/TypeScript products, including a book management platform and a Figma-to-Elementor template conversion service.'
    },
    {
      title: 'Jr. Software Engineer',
      company: 'Codexpert, Inc',
      period: 'Aug 2019 - Feb 2022',
      description: 'Sole engineer on several full-stack PHP, WordPress and JavaScript products: a WooCommerce builder for Elementor, a WooCommerce affiliate marketing plugin, per-role widget access control, and a 2Checkout payment gateway integration.'
    },
    {
      title: 'Jr. Software Architect',
      company: 'Agemark Technology Ltd.',
      period: 'Feb 2019 - Jul 2019',
      description: 'Application architecture, data models and backend services.'
    },
    {
      title: 'Web Developer & Trainer',
      company: 'Binary Pathshala',
      period: 'Jan 2017 - May 2019',
      description: 'Built websites and templates from design mockups, and trained students in web development and programming — including writing the curriculum.'
    }
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                About Me
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full"></div>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>I'm a WordPress and full-stack engineer with 9 years of experience building custom plugins and themes, integrating third-party APIs, and contributing to the open-source ecosystem. My journey in tech began with a deep curiosity about problem-solving and how the web connects people — which naturally led me to specialize in WordPress and full-stack web development.</p>

              <p>I focus on writing clean, efficient code and creating digital experiences that are user-focused, scalable, and visually refined. I regularly contribute to the WordPress Core, Polyglots, and Photo Directory teams, and enjoy being part of a global community that thrives on collaboration and shared knowledge.</p>

              <p>When I’m not coding or contributing, I enjoy experimenting with new tools, participating in tech events, and sharing what I learn with others.</p>

              <p>My mission is to grow continuously as a developer while helping businesses, teams, and individuals bring their ideas to life through smart, sustainable technology.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">9+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">2M+</div>
                <div className="text-sm text-gray-600">Sites Running My Code</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">5</div>
                <div className="text-sm text-gray-600">WordPress Core Releases</div>
              </div>
            </div>
          </div>

          {/* Right Column - Experience Timeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience</h3>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 pb-6">
                  {/* Timeline line */}
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-2 top-8 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                    <div className="text-primary-600 font-medium mb-2">{exp.company}</div>
                    <div className="text-sm text-gray-500 mb-3">{exp.period}</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
