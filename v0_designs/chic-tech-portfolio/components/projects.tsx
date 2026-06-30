'use client'

import Image from 'next/image'
import { ExternalLink, Code2 } from 'lucide-react'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
  github?: string
}

function ProjectCard({ title, description, image, tags, link, github }: ProjectCardProps) {
  return (
    <div className="glass-card group cursor-pointer overflow-hidden">
      <div className="relative h-64 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
          >
            <Code2 className="w-4 h-4" />
            Code
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const projects: ProjectCardProps[] = [
    {
      id: '1',
      title: 'Neural Flow AI',
      description: 'Machine learning visualization platform with real-time data processing and interactive dashboards',
      image: '/neural-flow.png',
      tags: ['React', 'Python', 'TensorFlow'],
      link: '#',
      github: '#',
    },
    {
      id: '2',
      title: 'Quantum Interface',
      description: 'Next-generation UI framework built with cutting-edge web standards and glassmorphic design patterns',
      image: '/quantum-interface.png',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
      link: '#',
      github: '#',
    },
    {
      id: '3',
      title: 'CloudSync Pro',
      description: 'Enterprise-grade cloud synchronization with end-to-end encryption and distributed architecture',
      image: '/cloudsync-pro.png',
      tags: ['Node.js', 'AWS', 'PostgreSQL'],
      link: '#',
      github: '#',
    },
    {
      id: '4',
      title: 'Nexus Analytics',
      description: 'Advanced analytics engine with AI-powered insights and predictive modeling capabilities',
      image: 'https://images.unsplash.com/photo-1551014832-f6d953ffe030?w=500&h=500&fit=crop',
      tags: ['Data Science', 'Visualization', 'Analytics'],
      link: '#',
      github: '#',
    },
  ]

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            A curated selection of recent work showcasing innovative solutions and technical excellence across various domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
