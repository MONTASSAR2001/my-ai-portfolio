"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Mail } from "lucide-react"

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
const MINIMAL_CSS = `
  .minimal-root {
    font-family: 'Inter', -apple-system, sans-serif;
    background-color: #ffffff;
    color: #171717;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
  .minimal-link {
    color: #737373;
    transition: color 0.3s ease;
  }
  .minimal-link:hover {
    color: #171717;
  }
`

const slowFade: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

export default function MinimalTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const [isTldr, setIsTldr] = useState(false)
  
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const email = p.email || `hello@${p.slug}.dev`
  
  const summaryText = p.summary || "A minimalist designer focused on clarity, structure, and eliminating the unnecessary."
  const tldrSummary = summaryText.split(".")[0] + "."

  const defaultExperience = [
    { title: "Lead Product Designer", company: "Simplicity Corp", duration: "2021 — Present", description: "Led the design system overhaul. Reduced cognitive load across all core user flows." },
    { title: "UI/UX Engineer", company: "Whitespace Inc.", duration: "2018 — 2021", description: "Implemented highly accessible and responsive interfaces with a focus on typography and whitespace." }
  ]
  const experienceItems = p.experience?.length ? p.experience : defaultExperience

  // TLDR Logic: Shorten descriptions if TLDR is active
  const displayExperience = isTldr 
    ? experienceItems.map(exp => ({
        ...exp,
        description: exp.description ? `— ${exp.description.split(".")[0]}.` : ""
      }))
    : experienceItems

  const skills = p.skills?.length ? p.skills : ["Minimalism", "Typography", "User Research", "Interaction Design", "Design Systems"]

  return (
    <div className="minimal-root relative selection:bg-black selection:text-white z-0">
      <style>{MINIMAL_CSS}</style>
      
      {/* ADVANCED COMPONENT 1: Fluid Mesh Background - Barely visible for minimalism */}
      <div className="fixed inset-0 z-0 opacity-[0.06] mix-blend-multiply pointer-events-none transition-all duration-[3s]">
        <FluidMeshBackground />
      </div>

      {/* ADVANCED COMPONENT 2: Command Palette (Hidden in preview iframe) */}
      {!isPreview && <CommandPalette cvUrl={p.cv_url} />}

      <header className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100`}>
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-medium tracking-tight text-lg text-black">{name.split(" ")[0]}</span>
          
          <div className="flex items-center gap-8">
            {/* ADVANCED COMPONENT 4: TLDR Toggle */}
            <div className="hidden sm:block scale-90 opacity-80 hover:opacity-100 transition-opacity">
              <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
            </div>
            
            <nav className="hidden md:flex gap-8 text-sm text-gray-500 font-medium">
              <a href="#about" className="minimal-link">About</a>
              <a href="#work" className="minimal-link">Work</a>
              <a href="#contact" className="minimal-link">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-32 max-w-5xl mx-auto px-6">
        
        <section id="about" className="min-h-[70vh] flex flex-col justify-center">
          {/* ADVANCED COMPONENT 3: Time Aware Greeting */}
          <motion.div initial="hidden" animate="show" variants={slowFade} className="mb-12">
            <TimeAwareGreeting />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-3xl space-y-8">
            <motion.h1 variants={slowFade} className="text-5xl md:text-7xl font-semibold tracking-tighter text-black leading-[1.1]">
              {isTldr ? tldrSummary : summaryText}
            </motion.h1>
            
            <motion.p variants={slowFade} className="text-xl text-gray-500 font-light tracking-wide">
              {p.role || "Minimalist Designer & Engineer"}
            </motion.p>
            
            {/* Mobile TLDR Toggle */}
            <motion.div variants={slowFade} className="pt-8 sm:hidden">
              <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
            </motion.div>
          </motion.div>

          {p.profile_image && (
            <motion.div variants={slowFade} initial="hidden" animate="show" className="mt-20">
              <div className="relative w-full max-w-xl h-[400px] overflow-hidden bg-gray-50 rounded-2xl">
                <Image src={p.profile_image} alt={name} layout="fill" objectFit="cover" className="grayscale hover:grayscale-0 transition-all duration-[2s] ease-in-out" />
              </div>
            </motion.div>
          )}
        </section>

        <section id="work" className="py-32">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slowFade} className="mb-16 flex items-baseline justify-between border-b border-gray-100 pb-8">
            <h2 className="text-2xl font-medium tracking-tight">Experience</h2>
            {isTldr && <span className="text-xs text-amber-500 font-medium tracking-widest uppercase">Quick Scan Mode</span>}
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-12">
            {/* ADVANCED COMPONENT 5: Chameleon Project Card */}
            {displayExperience.map((exp, i) => (
              <ChameleonProjectCard key={i} exp={exp} />
            ))}
          </motion.div>
        </section>

        <section id="skills" className="py-32 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slowFade} className="mb-16">
            <h2 className="text-2xl font-medium tracking-tight mb-12">Expertise</h2>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {skills.map((skill, i) => (
                <span key={i} className="text-lg text-gray-500 font-light minimal-link cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="py-32 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slowFade} className="text-center">
            <h2 className="text-4xl font-medium tracking-tight mb-8">Let's talk.</h2>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-3 text-xl text-gray-500 hover:text-black transition-colors duration-500 group">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" /> {email}
            </a>
          </motion.div>
        </section>
        
        <footer className="mt-32 pb-16 text-center text-sm text-gray-400 font-light">
          © {new Date().getFullYear()} {name}.
        </footer>
      </main>
    </div>
  )
}
