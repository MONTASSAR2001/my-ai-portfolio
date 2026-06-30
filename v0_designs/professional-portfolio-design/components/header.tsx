'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-background border-b border-border z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent" />
          <h1 className="text-lg font-bold tracking-wide">Portfolio</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#about" className="hover:text-accent transition-colors">About</Link>
          <Link href="#projects" className="hover:text-accent transition-colors">Projects</Link>
          <Link href="#experience" className="hover:text-accent transition-colors">Experience</Link>
          <Link href="#contact" className="text-accent bg-primary px-4 py-2">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
