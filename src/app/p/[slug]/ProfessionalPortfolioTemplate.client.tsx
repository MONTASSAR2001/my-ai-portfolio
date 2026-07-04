"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, ExternalLink } from "lucide-react"

import FluidMeshBackground from "../../../components/FluidMeshBackground"
import CommandPalette from "../../../components/CommandPalette"
import TimeAwareGreeting from "../../../components/TimeAwareGreeting"
import TLDRToggle from "../../../components/TLDRToggle"
import ChameleonProjectCard from "../../../components/ChameleonProjectCard"

// ─── Types ──────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
  cv_url?: string | null
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const PRO_CSS = `
  .pro-root {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
    min-height: 100vh;
  }
  .pro-card {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .pro-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`

// ─── Animation Variants ───────────────────────────────────────────────────────
const slideRight: any = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}
const slideLeft: any = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}
const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

export default function ProfessionalPortfolioTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const [isTldr, setIsTldr] = useState(false)
  
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const email = p.email || `hello@${p.slug}.dev`
  
  const summaryText = p.summary || "Results-driven professional with a proven track record of delivering high-impact solutions, managing cross-functional teams, and driving measurable business growth."
  const tldrSummary = summaryText.split(".")[0] + "."

  const defaultExperience = [
    { title: "Senior Manager", company: "Corporate Solutions LLC", duration: "2020 - Present", description: "Spearheaded the successful launch of 3 major product lines. Optimized operational workflows." },
    { title: "Consultant", company: "Strategy Partners", duration: "2016 - 2020", description: "Advised Fortune 500 clients on digital transformation and market expansion strategies." }
  ]
  const experienceItems = p.experience?.length ? p.experience : defaultExperience

  // TLDR Logic: Shorten descriptions if TLDR is active
  const displayExperience = isTldr 
    ? experienceItems.map(exp => ({
        ...exp,
        description: exp.description ? `— ${exp.description.split(".")[0]}.` : ""
      }))
    : experienceItems

  const skills = p.skills?.length ? p.skills : ["Project Management", "Strategic Planning", "Data Analysis", "Cross-functional Leadership", "Process Optimization", "Client Relations"]

  return (
    <div className="pro-root relative selection:bg-blue-600 selection:text-white z-0">
      <style>{PRO_CSS}</style>

      {/* ADVANCED COMPONENT 1: Fluid Mesh Background - Extremely subtle */}
      <div className="fixed inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none">
        <FluidMeshBackground />
      </div>

      {/* ADVANCED COMPONENT 2: Command Palette (Hidden in preview) */}
      {!isPreview && <CommandPalette cvUrl={p.cv_url ?? undefined} />}

      <header className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md">
              {name.charAt(0)}
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">{name}</span>
          </div>
          
          <div className="flex items-center gap-8">
            {/* ADVANCED COMPONENT 4: TLDR Toggle (Desktop) */}
            <div className="hidden sm:block">
              <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
            </div>
            
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
              <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
            </nav>
            <a href="#contact" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm hidden sm:block">
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-24 px-6 max-w-6xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <section id="about" className="pt-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div initial="hidden" animate="show" variants={slideRight} className="flex-1 space-y-8">
              
              {/* ADVANCED COMPONENT 3: Time Aware Greeting */}
              <div className="mb-4">
                <TimeAwareGreeting />
              </div>
              
              <div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                  {name}
                </h1>
                <p className="text-2xl text-blue-600 font-semibold tracking-wide">
                  {p.role || "Professional Consultant"}
                </p>
              </div>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                {isTldr ? tldrSummary : summaryText}
              </p>
              
              {/* Mobile TLDR Toggle */}
              <div className="sm:hidden pt-4">
                <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#experience" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                  View Experience
                </a>
                <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-3.5 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                  Contact Me
                </a>
              </div>
            </motion.div>
            
            {p.profile_image && (
              <motion.div initial="hidden" animate="show" variants={slideLeft} className="w-full max-w-md shrink-0">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image src={p.profile_image ?? undefined} alt={name} layout="fill" objectFit="cover" className="hover:scale-105 transition-transform duration-700" />
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Core Competencies</h2>
            <div className="w-16 h-1.5 bg-blue-600 rounded-full" />
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <motion.div key={i} variants={fadeUp} className="pro-card p-6 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="font-semibold text-slate-700">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Professional Experience</h2>
              <div className="w-16 h-1.5 bg-blue-600 rounded-full" />
            </div>
            {isTldr && <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm border border-amber-200">Quick Scan Mode</span>}
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-8">
            {/* ADVANCED COMPONENT 5: Chameleon Project Card */}
            {displayExperience.map((exp, i) => (
              <ChameleonProjectCard key={i} exp={exp} />
            ))}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pb-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="pro-card p-12 text-center bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none" />
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's build something together.</h2>
            <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg">
              I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a href={`mailto:${email}`} className="flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-500 transition-colors w-full sm:w-auto">
                <Mail className="w-5 h-5" /> Email Me
              </a>
              <a href="#" className="flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-colors w-full sm:w-auto">
                <ExternalLink className="w-5 h-5" /> Download Resume
              </a>
            </div>
          </motion.div>
          
          <div className="mt-20 text-center text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </div>
        </section>
      </main>
    </div>
  )
}
