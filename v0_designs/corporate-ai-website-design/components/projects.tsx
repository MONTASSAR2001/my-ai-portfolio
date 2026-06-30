'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'Neural Processing Hub',
    category: 'AI Infrastructure',
    description: 'Advanced neural network processing platform with distributed GPU acceleration for real-time AI inference across enterprise networks.',
    features: ['GPU Acceleration', 'Real-time Processing', 'Distributed Architecture'],
    icon: '🧠',
  },
  {
    id: 2,
    title: 'Quantum Integration Suite',
    category: 'Hardware Integration',
    description: 'Seamless integration layer connecting quantum computing resources with classical infrastructure for hybrid processing workflows.',
    features: ['Quantum Computing', 'Hybrid Processing', 'System Integration'],
    icon: '⚛️',
  },
  {
    id: 3,
    title: 'Autonomous Data Platform',
    category: 'Data Analytics',
    description: 'Self-optimizing data pipeline that intelligently manages massive datasets with AI-driven insights and hardware-accelerated analytics.',
    features: ['Auto-Optimization', 'Big Data', 'Real-time Analytics'],
    icon: '📈',
  },
  {
    id: 4,
    title: 'EdgeAI Framework',
    category: 'Edge Computing',
    description: 'Lightweight AI inference framework optimized for edge devices, bringing machine learning capabilities to IoT ecosystems.',
    features: ['Edge Computing', 'IoT Integration', 'Lightweight ML'],
    icon: '🌐',
  },
  {
    id: 5,
    title: 'Secure Enclave Protocol',
    category: 'Security',
    description: 'Enterprise-grade security protocol leveraging hardware enclaves and AI-powered threat detection for zero-trust environments.',
    features: ['Hardware Security', 'Threat Detection', 'Zero-Trust'],
    icon: '🔐',
  },
  {
    id: 6,
    title: 'Adaptive ML Orchestrator',
    category: 'ML Operations',
    description: 'Intelligent orchestration platform that manages machine learning workflows with automatic resource allocation and optimization.',
    features: ['Model Management', 'Auto-Scaling', 'Performance Tuning'],
    icon: '🎯',
  },
]

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
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
    <section id="projects" ref={ref} className="py-20 md:py-32 px-4 md:px-8 bg-off-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-accent tracking-widest uppercase">Advanced Projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            Cutting-Edge Solutions
          </h2>
          <p className="text-xl text-gray-dark max-w-2xl mx-auto">
            Explore our portfolio of innovative AI and hardware integration projects that are reshaping enterprise technology landscapes.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`transition-all duration-1000 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
            >
              <div className="h-full bg-white rounded-xl border border-gray-light hover:border-blue-accent p-8 transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{project.icon}</div>

                <div className="inline-block mb-4 px-3 py-1 bg-off-white rounded-full">
                  <span className="text-xs font-semibold text-blue-accent uppercase tracking-wide">{project.category}</span>
                </div>

                <h3 className="text-2xl font-bold text-primary mb-3">{project.title}</h3>

                <p className="text-gray-dark leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className={`space-y-3 overflow-hidden transition-all ${
                  selectedProject === project.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-gray-light pt-4">
                    <div className="text-sm font-semibold text-primary mb-3">Key Features:</div>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="text-sm text-gray-dark flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-accent rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-sm font-semibold text-blue-accent mt-6 group-hover:translate-x-2 transition-transform">
                  Learn More →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
