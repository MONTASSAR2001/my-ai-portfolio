"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Briefcase, Mail, Menu, X, ArrowRight, Building2, CheckCircle2 } from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const PRO_CSS = `
  .pro-root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
    min-height: 100vh;
  }
  .pro-card {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
  }
  .pro-btn {
    background-color: #0f172a;
    color: #ffffff;
    transition: background-color 0.2s;
  }
  .pro-btn:hover {
    background-color: #334155;
  }
`

// ─── Animations ──────────────────────────────────────────────────────────────
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

// ─── Components ──────────────────────────────────────────────────────────────
function ProNav({ name, isPreview }: { name: string; isPreview?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-bold tracking-tight text-xl text-slate-900">{name}</span>
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          {['Summary', 'Experience', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
              {item}
            </a>
          ))}
        </nav>
        <button className="md:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full">
          {['Summary', 'Experience', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="font-medium text-slate-700" onClick={() => setIsOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  )
}

function ProHero({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  
  return (
    <section id="summary" className="pt-40 pb-24 px-6 max-w-6xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <motion.div 
          initial="hidden" animate="show" variants={slideLeft} 
          className="flex-1 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold border border-slate-200">
            <Briefcase className="w-4 h-4" />
            <span>{p.role || "Professional"}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Hello, I'm <span className="text-blue-600">{name.split(" ")[0]}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
            {p.summary || "A dedicated professional with a track record of delivering high-quality, impactful results in dynamic corporate environments."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#contact" className="pro-btn px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow">
              Contact Me <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#experience" className="px-8 py-4 rounded-lg font-semibold flex items-center justify-center bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              View Profile
            </a>
          </div>
        </motion.div>
        
        {p.profile_image && (
          <motion.div 
            initial="hidden" animate="show" variants={slideRight} 
            className="flex-1 flex justify-center w-full max-w-md"
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image src={p.profile_image} alt={name} layout="fill" objectFit="cover" className="hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ProExperience({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [
    { title: "Senior Consultant", company: "Strategy Corp", duration: "2020 - Present", description: "Spearheaded key corporate initiatives driving 20% efficiency growth." },
    { title: "Business Analyst", company: "Finance Partners LLC", duration: "2016 - 2020", description: "Analyzed market trends and compiled detailed financial performance metrics." }
  ]
  
  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto overflow-hidden">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slideLeft} className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Professional History</h2>
        <div className="w-16 h-1.5 bg-blue-600 rounded-full" />
      </motion.div>
      
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-8">
        {items.map((exp, i) => (
          <motion.div 
            key={i} 
            variants={slideUp}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
            className="pro-card p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h3 className="text-2xl font-bold text-slate-900">{exp.title}</h3>
              {exp.duration && (
                <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-md border border-blue-100">
                  {exp.duration}
                </span>
              )}
            </div>
            <p className="text-lg text-slate-600 font-semibold mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-400" /> {exp.company}
            </p>
            {exp.description && (
              <p className="text-slate-600 leading-relaxed">
                {exp.description}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ProSkills({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["Leadership", "Project Management", "Data Analysis", "Strategic Planning", "Communication", "Financial Modeling"]
  
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto overflow-hidden">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slideRight} className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Core Skills</h2>
        <div className="w-16 h-1.5 bg-blue-600 rounded-full" />
      </motion.div>
      
      <motion.div 
        variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {items.map((skill, i) => (
          <motion.div 
            key={i} 
            variants={slideUp}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)", scale: 1.02 }}
            className="pro-card p-6 flex items-center gap-4 cursor-default"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="font-semibold text-slate-800 text-lg">{skill}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ProContact({ p }: { p: PortfolioRow }) {
  const email = p.email || `hello@${p.slug}.dev`
  
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto overflow-hidden">
      <motion.div 
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slideUp}
        className="pro-card p-10 md:p-16 text-center shadow-xl border-t-4 border-t-blue-600"
      >
        <Mail className="w-12 h-12 text-blue-600 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Let's Work Together</h2>
        <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto">
          I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${email}`} 
          className="pro-btn inline-flex items-center justify-center px-10 py-4 rounded-lg font-bold text-lg shadow-lg"
        >
          Send an Email
        </motion.a>
      </motion.div>
      
      <motion.footer 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} viewport={{ once: true }}
        className="mt-24 pt-8 border-t border-slate-200 text-center text-slate-500 font-medium text-sm"
      >
        © {new Date().getFullYear()} {p.name || p.slug.split("-")[0]}. All rights reserved.
      </motion.footer>
    </section>
  )
}

export default function ProfessionalPortfolioTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  return (
    <div className="pro-root">
      <style>{PRO_CSS}</style>
      <ProNav name={p.name || p.slug.split("-")[0]} isPreview={isPreview} />
      <main>
        <ProHero p={p} />
        <ProExperience experience={p.experience} />
        <ProSkills skills={p.skills} />
        <ProContact p={p} />
      </main>
    </div>
  )
}
