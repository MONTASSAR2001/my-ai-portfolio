'use client'

import { useEffect, useState } from 'react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md border-b border-gray-light' 
        : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">Nexus AI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-primary hover:text-blue-accent transition-colors text-sm font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-primary hover:text-blue-accent transition-colors text-sm font-medium"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className="text-primary hover:text-blue-accent transition-colors text-sm font-medium"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-navy-light transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-light pt-4">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-primary hover:text-blue-accent transition-colors text-sm font-medium py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left text-primary hover:text-blue-accent transition-colors text-sm font-medium py-2"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className="block w-full text-left text-primary hover:text-blue-accent transition-colors text-sm font-medium py-2"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-navy-light transition-colors"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
