import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jakariaistauk/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/jakaria-istauk',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'X',
      url: 'https://x.com/jakaria_istauk',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 640 640">
          <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>
        </svg>
      )
    },
    {
      name: 'Wordpress',
      url: 'https://profiles.wordpress.org/jakariaistauk/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 640 640">
          <path d="M125.7 233.4L227.2 511.4C156.2 477 107.3 404.2 107.3 320C107.3 289.1 113.9 259.9 125.7 233.4zM463.6 309.3C463.6 283 454.2 264.8 446.1 250.6C435.3 233.1 425.2 218.2 425.2 200.7C425.2 181.1 440 162.9 460.9 162.9C461.8 162.9 462.7 163 463.7 163.1C425.8 128.4 375.4 107.2 320 107.2C245.7 107.2 180.3 145.3 142.2 203.1C147.2 203.3 151.9 203.4 155.9 203.4C178.1 203.4 212.6 200.7 212.6 200.7C224.1 200 225.4 216.9 214 218.2C214 218.2 202.5 219.5 189.7 220.2L267.2 450.6L313.8 311L280.7 220.2C269.2 219.5 258.4 218.2 258.4 218.2C246.9 217.5 248.3 200 259.7 200.7C259.7 200.7 294.8 203.4 315.7 203.4C337.9 203.4 372.4 200.7 372.4 200.7C383.9 200 385.2 216.9 373.8 218.2C373.8 218.2 362.3 219.5 349.5 220.2L426.4 448.9L447.6 378C456.6 348.6 463.6 327.5 463.6 309.3zM323.7 338.6L259.9 524.1C279 529.7 299.1 532.8 320 532.8C344.8 532.8 368.5 528.5 390.6 520.7C390 519.8 389.5 518.8 389.1 517.8L323.7 338.6zM506.7 217.9C507.6 224.7 508.1 231.9 508.1 239.8C508.1 261.4 504.1 285.6 491.9 316L426.9 503.9C490.2 467 532.7 398.5 532.7 320C532.7 283 523.3 248.2 506.7 217.9zM72 320C72 183 183 72 320 72C457 72 568 183 568 320C568 457 457 568 320 568C183 568 72 457 72 320zM556.6 320C556.6 189.3 450.7 83.4 320 83.4C189.3 83.4 83.4 189.3 83.4 320C83.4 450.7 189.3 556.6 320 556.6C450.7 556.6 556.6 450.7 556.6 320z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:jakariamd35@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max">
        {/* Main Footer Content */}
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Jakaria Istauk</h3>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                WordPress and full-stack engineer building custom plugins, themes
                and web applications. WordPress Core contributor. Let's build
                something together.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.href)
                      }}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-2 text-gray-300">
                <p>Dhaka, Bangladesh</p>
                <p>
                  <a 
                    href="mailto:jakariamd35@gmail.com"
                    className="hover:text-white transition-colors duration-200"
                  >
                    jakariamd35@gmail.com
                  </a>
                </p>
                {/* <p>
                  <a 
                    href="tel:+15551234567"
                    className="hover:text-white transition-colors duration-200"
                  >
                    +1 (555) 123-4567
                  </a>
                </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Jakaria Istauk. All rights reserved.
            </p>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="mt-4 sm:mt-0 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <span className="text-sm">Back to top</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
