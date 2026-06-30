'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-foreground hover:text-accent transition-colors">
              <span className="text-accent">&lt;</span>Dev<span className="text-accent">/&gt;</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
              Projects
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
              Contact
            </a>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-all">
              Resume
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border/30">
            <a href="#projects" className="block py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
              Projects
            </a>
            <a href="#about" className="block py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
              About
            </a>
            <a href="#contact" className="block py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
              Contact
            </a>
            <button className="w-full mt-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-all">
              Resume
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
