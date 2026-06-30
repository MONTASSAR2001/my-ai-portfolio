'use client'

import { useEffect, useRef, useState } from 'react'

const team = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'Chief Executive Officer',
    bio: 'Visionary leader with 20+ years in AI research and enterprise technology',
    initials: 'SC',
    color: 'from-blue-accent to-primary',
  },
  {
    id: 2,
    name: 'James Morrison',
    role: 'Chief Technology Officer',
    bio: 'Hardware architecture expert with groundbreaking innovations in quantum integration',
    initials: 'JM',
    color: 'from-primary to-navy-light',
  },
  {
    id: 3,
    name: 'Dr. Priya Patel',
    role: 'VP of AI Research',
    bio: 'Ph.D. in Machine Learning, leading advanced neural network research initiatives',
    initials: 'PP',
    color: 'from-blue-accent to-gray-dark',
  },
  {
    id: 4,
    name: 'Marcus Thompson',
    role: 'VP of Product Engineering',
    bio: 'Product visionary with proven track record scaling enterprise solutions',
    initials: 'MT',
    color: 'from-navy-light to-blue-accent',
  },
  {
    id: 5,
    name: 'Elena Rodriguez',
    role: 'Chief Innovation Officer',
    bio: 'Drives strategic partnerships and breakthrough technology development',
    initials: 'ER',
    color: 'from-gray-dark to-primary',
  },
  {
    id: 6,
    name: 'Alex Kim',
    role: 'Director of Client Success',
    bio: 'Ensures our enterprise partners achieve maximum value from our solutions',
    initials: 'AK',
    color: 'from-blue-accent to-navy-light',
  },
]

export function Team() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredTeamMember, setHoveredTeamMember] = useState<number | null>(null)
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
    <section id="team" ref={ref} className="py-20 md:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-accent tracking-widest uppercase">Our Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            World-Class Leadership
          </h2>
          <p className="text-xl text-gray-dark max-w-2xl mx-auto">
            Exceptional individuals united by a shared vision of transforming enterprise technology through AI innovation and hardware mastery.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={member.id}
              className={`transition-all duration-1000 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
              onMouseEnter={() => setHoveredTeamMember(member.id)}
              onMouseLeave={() => setHoveredTeamMember(null)}
            >
              <div className="h-full group">
                {/* Avatar */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <div className={`w-full aspect-square bg-gradient-to-br ${member.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                    <span className="text-5xl font-bold text-white">{member.initials}</span>
                  </div>
                  {hoveredTeamMember === member.id && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center px-4">
                        <div className="text-white text-sm font-semibold">Leading Innovation</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-blue-accent transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-sm font-semibold text-blue-accent mb-3">{member.role}</div>
                  </div>

                  <p className="text-gray-dark leading-relaxed text-sm">
                    {member.bio}
                  </p>

                  {/* Social Links - Placeholder */}
                  <div className="flex gap-3 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="w-8 h-8 bg-off-white hover:bg-blue-accent rounded-full flex items-center justify-center text-xs font-bold text-primary hover:text-white transition-colors">
                      in
                    </a>
                    <a href="#" className="w-8 h-8 bg-off-white hover:bg-blue-accent rounded-full flex items-center justify-center text-xs font-bold text-primary hover:text-white transition-colors">
                      tw
                    </a>
                  </div>
                </div>

                {/* Accent Line */}
                <div className={`h-1 bg-gradient-to-r ${member.color} rounded-full mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-dark mb-6">Interested in joining our team?</p>
          <a
            href="#contact"
            className="inline-block bg-primary hover:bg-navy-light text-white px-8 py-3 rounded-md font-semibold transition-all hover:shadow-lg"
          >
            We&apos;re Hiring
          </a>
        </div>
      </div>
    </section>
  )
}
