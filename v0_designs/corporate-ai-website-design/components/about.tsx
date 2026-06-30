'use client'

import { useEffect, useRef, useState } from 'react'

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-accent tracking-widest uppercase">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            Pioneering AI Excellence
          </h2>
          <p className="text-xl text-gray-dark max-w-2xl mx-auto">
            We combine cutting-edge artificial intelligence with seamless hardware integration to deliver transformative solutions for forward-thinking enterprises.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-gray-dark leading-relaxed text-lg">
                  To empower enterprises with intelligent AI solutions that seamlessly integrate with their existing hardware infrastructure, unlocking unprecedented efficiency and innovation.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-gray-dark leading-relaxed text-lg">
                  A world where advanced AI and hardware work in perfect harmony, enabling organizations to achieve their boldest goals while maintaining complete control and transparency.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-2xl font-bold text-primary mb-6">Core Values</h3>
                <ul className="space-y-4">
                  {[
                    { title: 'Innovation', desc: 'Constantly pushing the boundaries of what&apos;s possible' },
                    { title: 'Reliability', desc: 'Enterprise-grade stability you can trust' },
                    { title: 'Transparency', desc: 'Complete visibility into every decision and process' },
                    { title: 'Excellence', desc: 'Uncompromising commitment to quality' },
                  ].map((value, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="w-6 h-6 bg-blue-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <div className="font-semibold text-primary">{value.title}</div>
                        <div className="text-gray-dark text-sm">{value.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`transition-all duration-1000 ${isVisible ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '15+', label: 'Years of Experience', icon: '📊' },
                { number: '50+', label: 'Enterprise Partners', icon: '🤝' },
                { number: '200+', label: 'Projects Delivered', icon: '✨' },
                { number: '99.9%', label: 'Uptime Guarantee', icon: '⚡' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-off-white p-6 rounded-xl border border-gray-light hover:border-blue-accent transition-all hover:shadow-lg group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="text-2xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-dark">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
