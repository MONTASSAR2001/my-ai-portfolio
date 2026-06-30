'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="space-y-8">
              <div className="inline-block">
                <div className="text-sm font-semibold text-primary tracking-widest uppercase">
                  Welcome to Nexus AI
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight" style={{ fontWeight: 700 }}>
                The Future of AI & Hardware Integration
              </h1>

              <p className="text-xl text-gray-dark leading-relaxed max-w-xl">
                Pioneering enterprise AI solutions seamlessly integrated with cutting-edge hardware. Transforming businesses through intelligent innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => scrollToSection('projects')}
                  className="bg-primary hover:bg-navy-light text-white px-8 py-3 rounded-md text-lg transition-all hover:shadow-lg"
                >
                  Explore Projects
                </Button>
                <Button
                  onClick={() => scrollToSection('about')}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md text-lg transition-all"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 pt-12 border-t border-gray-light">
                <div>
                  <div className="text-4xl font-bold text-primary">50+</div>
                  <div className="text-gray-dark text-sm mt-2">Enterprise Clients</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <div className="text-gray-dark text-sm mt-2">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`hidden lg:flex justify-center items-center transition-all duration-1000 ${isVisible ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-accent/10 rounded-3xl"></div>
              <div className="absolute inset-4 border-2 border-primary/20 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <div className="text-primary font-semibold text-lg">AI Innovation</div>
                  <div className="text-gray-dark text-sm mt-2">Hardware Integrated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
