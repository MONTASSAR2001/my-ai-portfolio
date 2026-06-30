'use client'

import HeroSection from '@/components/hero-section'
import ProjectsGrid from '@/components/projects-grid'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <ProjectsGrid />
      <Footer />
    </div>
  )
}
