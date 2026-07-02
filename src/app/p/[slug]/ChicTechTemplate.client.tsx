"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Send, Menu, X } from "lucide-react"

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
const CHIC_CSS = `
  .chic-root {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    color: #1a1a2e;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .glassmorphism {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.08);
  }
  .glass-card {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 1.5rem;
    padding: 2.5rem;
  }
  .text-gradient {
    background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

// ─── Animation Variants ───────────────────────────────────────────────────────
const springReveal: any = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const floatingAnimation: any = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function ChicTechTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isTldr, setIsTldr] = useState(false)
  
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const emailDisplay = p.email || `hello@${p.slug}.dev`
  
  const navItems = [{ label: "Work", href: "#work" }, { label: "Skills", href: "#skills" }, { label: "Contact", href: "#contact" }]

  const skillsItems = p.skills?.length ? p.skills : ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Framer Motion", "Tailwind CSS"]
  
  const defaultExperience = [{ title: "Software Engineer", company: "Acme Corp", duration: "2022–Present", description: "Built scalable web applications with modern tech stacks. Designed seamless UI/UX using advanced CSS." }]
  const experienceItems = p.experience?.length ? p.experience : defaultExperience

  const summaryText = p.summary || "Cutting-edge technology meets minimalist design."
  const tldrSummary = summaryText.split(".")[0] + "."

  // TLDR Logic: Shorten descriptions if TLDR is active
  const displayExperience = isTldr 
    ? experienceItems.map(exp => ({
        ...exp,
        description: exp.description ? `— ${exp.description.split(".")[0]}.` : ""
      }))
    : experienceItems

  return (
    <div className="chic-root selection:bg-indigo-500/30 selection:text-indigo-900 relative">
      <style>{CHIC_CSS}</style>
      
      {/* ADVANCED COMPONENT 1: Fluid Mesh Background */}
      <FluidMeshBackground />
      
      {/* ADVANCED COMPONENT 2: Command Palette (Hidden in preview iframe) */}
      {!isPreview && <CommandPalette cvUrl={p.cv_url} />}

      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className={`glassmorphism ${isPreview ? 'absolute' : 'fixed'} top-4 left-4 right-4 z-50 rounded-full`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold tracking-tight">
            <span className="text-gradient">{name.split(" ")[0] || "Tech"}</span>
            <span style={{ color: "#1a1a2e" }}>{name.split(" ").slice(1).join(" ") || "Portfolio"}</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {/* ADVANCED COMPONENT 4: TLDR Toggle (Desktop) */}
            <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
            
            {navItems.map(item => (
              <motion.a 
                key={item.label} 
                href={item.href} 
                whileHover={{ scale: 1.05, color: "#6366f1" }}
                style={{ color: "#475569", fontWeight: 700, fontSize: "0.95rem" }} 
                className="transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full text-white font-bold shadow-lg" 
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              Hire Me
            </motion.a>
          </div>
          <button className="md:hidden p-2 text-indigo-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="md:hidden overflow-hidden glassmorphism mt-2 mx-2 rounded-3xl"
            >
              <div className="flex flex-col gap-4 p-6">
                <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
                {navItems.map(item => (
                  <a key={item.label} href={item.href} style={{ color: "#1a1a2e", fontWeight: 700 }} onClick={() => setIsOpen(false)}>{item.label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
          <motion.div 
            variants={staggerContainer} initial="hidden" animate="show"
            className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          >
            {/* ADVANCED COMPONENT 3: Time Aware Greeting */}
            <motion.div variants={springReveal} className="mb-10 flex justify-center">
              <TimeAwareGreeting />
            </motion.div>

            {p.profile_image && (
              <motion.div variants={springReveal} className="mb-12 flex justify-center">
                <motion.div 
                  variants={floatingAnimation} animate="animate"
                  className="w-48 h-48 rounded-full overflow-hidden border-[8px] border-white/60 shadow-2xl backdrop-blur-md bg-white/30"
                >
                  <Image src={p.profile_image} alt={name} width={192} height={192} className="object-cover w-full h-full" />
                </motion.div>
              </motion.div>
            )}
            
            <motion.div variants={springReveal} className="mb-10 inline-block">
              <div className="glassmorphism px-8 py-3 rounded-full">
                <span className="text-sm font-black tracking-widest uppercase text-indigo-700">{p.role || "Welcome to My Portfolio"}</span>
              </div>
            </motion.div>
            
            <motion.h1 variants={springReveal} className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tight leading-[1.05] mb-10 text-[#1a1a2e]">
              {name.split(" ").slice(0, 1).join("")}{" "}
              <span className="text-gradient">
                {name.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>
            
            <motion.p variants={springReveal} className="text-2xl md:text-3xl mb-16 leading-relaxed max-w-4xl mx-auto font-medium" style={{ color: "#475569" }}>
              {isTldr ? tldrSummary : summaryText}
            </motion.p>
            
            <motion.div variants={springReveal} className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a 
                href="#work" 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(99,102,241,0.4)" }} whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg transition-all" 
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                View Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-10 py-5 rounded-full font-bold text-lg glassmorphism transition-all" 
                style={{ color: "#1a1a2e" }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-40 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={springReveal} className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-[#1a1a2e]">Skills & Tech</h2>
              <p className="text-2xl text-slate-500 font-medium max-w-2xl mx-auto">The tools and technologies I use to bring ideas to life.</p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap justify-center gap-4 md:gap-6"
            >
              {skillsItems.map((skill) => (
                <motion.div 
                  key={skill} 
                  variants={springReveal}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="glass-card !rounded-3xl !p-5 md:!p-8 !border-white/90 cursor-default"
                >
                  <span className="text-xl md:text-2xl font-bold text-indigo-700">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="work" className="py-40 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={springReveal} className="mb-24 flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-[#1a1a2e]">Experience</h2>
              {isTldr && <span className="glassmorphism px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase text-amber-600 shadow-md">Quick Scan Mode</span>}
            </motion.div>
            
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              {/* ADVANCED COMPONENT 5: Chameleon Project Card */}
              {displayExperience.map((exp, i) => (
                <ChameleonProjectCard key={i} exp={exp} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={springReveal}>
              <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-10 text-[#1a1a2e]">Let&apos;s Connect</h2>
              <p className="text-3xl mb-20 text-slate-500 font-medium">Have a project in mind? I&apos;d love to hear about it.</p>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={springReveal}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-16 inline-block shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Send className="w-10 h-10 text-indigo-600" />
                </div>
                <a href={`mailto:${emailDisplay}`} className="text-4xl md:text-5xl font-black text-gradient hover:opacity-80 transition-opacity">
                  {emailDisplay}
                </a>
              </div>
            </motion.div>
            
            <motion.footer 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} viewport={{ once: true }}
              className="mt-40 border-t border-white/50 pt-16 text-center text-slate-500 font-bold uppercase tracking-[0.2em] text-sm"
            >
              © {new Date().getFullYear()} {name}. Crafted with innovation.
            </motion.footer>
          </div>
        </section>
      </main>
    </div>
  )
}
