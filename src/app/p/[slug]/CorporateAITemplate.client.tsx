"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight, Briefcase, Building2, GraduationCap, CheckCircle2 } from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CORPORATE_CSS = `
  .corporate-root {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
    min-height: 100vh;
  }
  .corporate-header {
    background-color: #1e293b;
    color: #ffffff;
  }
  .corporate-btn {
    background-color: #2563eb;
    color: #ffffff;
    transition: all 0.2s ease;
  }
  .corporate-btn:hover {
    background-color: #1d4ed8;
  }
  .section-bg {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  }
  .corporate-dark {
    background-color: #0f172a;
    color: #f8fafc;
  }
`

// ─── Animation Components ────────────────────────────────────────────────────
function Typewriter({ text, className = "" }: { text: string; className?: string }) {
  const characters = Array.from(text);
  return (
    <motion.span
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.04 } }
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

// ─── Components ──────────────────────────────────────────────────────────────
function CorpHeader({ name, isPreview }: { name: string; isPreview?: boolean }) {
  return (
    <header className={`corporate-header ${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 shadow-md`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-lg">
            {name.charAt(0).toUpperCase()}
          </div>
          <span className="text-2xl font-extrabold tracking-tight">{name}</span>
        </div>
        <nav className="hidden md:flex gap-10">
          {["Overview", "Expertise", "Experience"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </nav>
        <a href="#contact" className="corporate-btn px-6 py-2.5 rounded-md text-sm font-bold shadow-sm">
          Contact Me
        </a>
      </div>
    </header>
  )
}

function CorpHero({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  
  return (
    <section id="overview" className="corporate-dark pt-40 pb-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        {/* Subtle corporate grid */}
        <div className="w-full h-full" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="flex-1">
          <motion.div initial="hidden" animate="show" variants={slideUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-bold tracking-widest uppercase mb-10">
            <Building2 className="w-4 h-4" />
            <span>{p.role || "Enterprise Professional"}</span>
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15]">
            <Typewriter text={`Driving Innovation Through Structured `} />
            <span className="text-blue-500"><Typewriter text="Intelligence." /></span>
          </h1>
          
          <motion.p initial="hidden" animate="show" variants={slideUp} className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
            {p.summary || "Delivering scalable solutions and strategic insights to empower enterprise growth and technological transformation."}
          </motion.p>
          
          <motion.div initial="hidden" animate="show" variants={slideUp} className="flex gap-4">
            <a href="#expertise" className="corporate-btn px-8 py-4 rounded-md font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20">
              View Capabilities <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
        
        {p.profile_image && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-xl overflow-hidden border-8 border-slate-800 shadow-2xl">
              <Image src={p.profile_image} alt={name} layout="fill" objectFit="cover" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function CorpSkills({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["Strategic Planning", "Data Analysis", "Cloud Architecture", "Project Management", "Team Leadership", "Enterprise Software"]
  
  return (
    <section id="expertise" className="py-32 px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            <Typewriter text="Core Competencies" />
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {items.map((skill, i) => {
            // Deterministic width based on string length to simulate real data
            const width = Math.min(98, 70 + (skill.length * 1.5)) + "%"
            return (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-lg">{skill}</span>
                  <span className="text-sm font-bold text-slate-500">{width}</span>
                </div>
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CorpExperience({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [
    { title: "Senior Enterprise Architect", company: "Global Tech Solutions", duration: "2020 - Present", description: "Directed the migration of legacy systems to a cloud-native architecture, resulting in a 40% reduction in operational costs." },
    { title: "Project Manager", company: "Corporate Innovations Inc.", duration: "2016 - 2020", description: "Led cross-functional teams to deliver enterprise software solutions on time and under budget." }
  ]
  
  return (
    <section id="experience" className="py-32 px-6 lg:px-8 bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            <Typewriter text="Professional Experience" />
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto" />
        </div>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="space-y-8">
          {items.map((exp, i) => (
            <motion.div key={i} variants={slideUp} className="section-bg p-8 md:p-10 rounded-xl relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{exp.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-blue-700 font-bold text-lg">
                    <Briefcase className="w-5 h-5" />
                    {exp.company}
                  </div>
                </div>
                {exp.duration && (
                  <div className="px-4 py-2 bg-slate-100 rounded-md text-sm font-bold text-slate-600 border border-slate-200">
                    {exp.duration}
                  </div>
                )}
              </div>
              {exp.description && (
                <p className="text-slate-600 text-lg leading-relaxed">{exp.description}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CorpContact({ p }: { p: PortfolioRow }) {
  const email = p.email || `hello@${p.slug}.dev`
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  
  return (
    <section id="contact" className="corporate-dark py-32 px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={slideUp}>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-8">
            <Typewriter text="Ready to collaborate?" />
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            I am currently accepting new opportunities and strategic partnerships.
          </p>
          <a href={`mailto:${email}`} className="corporate-btn inline-flex items-center justify-center px-12 py-5 rounded-md font-bold text-xl shadow-xl shadow-blue-900/20">
            {email}
          </a>
        </motion.div>
        
        <div className="mt-32 pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm font-bold">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function CorporateAITemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  return (
    <div className="corporate-root">
      <style>{CORPORATE_CSS}</style>
      <CorpHeader name={p.name || p.slug.split("-")[0]} isPreview={isPreview} />
      <main>
        <CorpHero p={p} />
        <CorpSkills skills={p.skills} />
        <CorpExperience experience={p.experience} />
        <CorpContact p={p} />
      </main>
    </div>
  )
}
