"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Cpu, Settings2, ShieldCheck, Zap, Cog, TerminalSquare, ArrowRight, CornerRightDown } from "lucide-react"
import Image from "next/image"

// ─── Types ──────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const ROBO_CSS = `
  .robo-root {
    font-family: 'Inter', sans-serif;
    background-color: #050b14;
    color: #e2e8f0;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .robo-bg-grid {
    background-size: 50px 50px;
    background-image: 
      linear-gradient(to right, rgba(56, 189, 248, 0.07) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(56, 189, 248, 0.07) 1px, transparent 1px);
  }
  .robo-font-mono {
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  }
  .robo-panel {
    background-color: rgba(10, 15, 30, 0.8);
    backdrop-filter: blur(12px);
  }
`

// ─── Animation Components ────────────────────────────────────────────────────
function DrawBorders({ delay = 0, color = "bg-cyan-500" }: { delay?: number, color?: string }) {
  const duration = 0.3;
  return (
    <>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration, delay: delay, ease: "linear" }} className={`absolute top-0 left-0 w-full h-[2px] ${color} origin-left z-10`} />
      <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration, delay: delay + duration, ease: "linear" }} className={`absolute top-0 right-0 w-[2px] h-full ${color} origin-top z-10`} />
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration, delay: delay + duration * 2, ease: "linear" }} className={`absolute bottom-0 right-0 w-full h-[2px] ${color} origin-right z-10`} />
      <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration, delay: delay + duration * 3, ease: "linear" }} className={`absolute bottom-0 left-0 w-[2px] h-full ${color} origin-bottom z-10`} />
    </>
  )
}

const rigidStep = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  show: { opacity: 1, clipPath: "inset(0% 0 0 0)", transition: { duration: 0.5, ease: "circOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
}

// ─── Components ──────────────────────────────────────────────────────────────
function RoboHeader({ name, isPreview }: { name: string; isPreview?: boolean }) {
  return (
    <header className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 bg-[#050b14]/90 backdrop-blur-md border-b border-cyan-900/50`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cog className="w-6 h-6 text-cyan-400 animate-[spin_4s_linear_infinite]" />
          <span className="font-bold tracking-widest text-lg uppercase">{name}</span>
        </div>
        <nav className="hidden md:flex gap-8 robo-font-mono text-xs uppercase tracking-widest text-cyan-500/70">
          {['Specs', 'Core_Systems', 'Log', 'Uplink'].map((item, i) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span className="text-cyan-800">0{i+1}.</span> {item}
            </a>
          ))}
        </nav>
      </div>
      {/* Scanning laser effect on header */}
      <motion.div 
        initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="h-[1px] w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute bottom-0"
      />
    </header>
  )
}

function RoboHero({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  
  return (
    <section id="specs" className="pt-40 pb-24 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
      <div className="flex flex-col lg:flex-row items-center gap-16 relative">
        <div className="flex-1 w-full relative">
          <DrawBorders delay={0.2} color="bg-cyan-500/80" />
          <div className="robo-panel p-8 md:p-12 relative overflow-hidden">
            {/* Blueprint corner accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50" />

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
              <motion.div variants={rigidStep} className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/50 border border-cyan-800 text-cyan-400 text-xs robo-font-mono tracking-widest uppercase">
                <TerminalSquare className="w-4 h-4" />
                <span>SYS_DESIGNATION: {p.role || "ENGINEER"}</span>
              </motion.div>
              
              <motion.h1 variants={rigidStep} className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[1.1]">
                {name}
              </motion.h1>
              
              <motion.div variants={rigidStep} className="h-[2px] w-24 bg-cyan-500" />
              
              <motion.p variants={rigidStep} className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed robo-font-mono text-sm">
                &gt; {p.summary || "Precision-engineered software solutions and robust systems architecture."}
              </motion.p>
              
              <motion.div variants={rigidStep} className="pt-8 flex flex-col sm:flex-row gap-4">
                <a href="#uplink" className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-[#050b14] px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors">
                  Initialize Contact <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#core_systems" className="inline-flex items-center justify-center gap-2 border border-cyan-500/50 text-cyan-400 px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-cyan-950/50 transition-colors">
                  View Specs
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {p.profile_image && (
          <div className="lg:w-1/3 relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1 }}
              className="relative w-64 h-64 md:w-80 md:h-80 bg-cyan-950/30 border border-cyan-800 p-4"
            >
              <DrawBorders delay={1.5} color="bg-cyan-400" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050b14] px-2 robo-font-mono text-xs text-cyan-500">
                OPTICAL_SENSOR
              </div>
              <Image src={p.profile_image} alt={name} layout="fill" objectFit="cover" className="p-2 opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500" />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

function RoboSkills({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["Embedded Systems", "C++", "ROS", "Python", "Computer Vision", "Machine Learning", "PCB Design", "Control Theory"]
  
  return (
    <section id="core_systems" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-100">Core Systems</h2>
        <div className="flex-1 h-[1px] bg-cyan-900/50" />
        <span className="robo-font-mono text-cyan-600 text-xs tracking-widest">MODULES_ONLINE</span>
      </div>
      
      <motion.div 
        variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {items.map((skill, i) => (
          <motion.div key={i} variants={rigidStep} className="relative group">
            <DrawBorders delay={0} color="bg-cyan-500/50" />
            <div className="robo-panel p-6 border border-transparent group-hover:bg-cyan-950/40 transition-colors h-full flex flex-col justify-between">
              <Cpu className="w-6 h-6 text-cyan-700 group-hover:text-cyan-400 transition-colors mb-6" />
              <div>
                <div className="text-[10px] robo-font-mono text-slate-500 mb-1">SYS.MOD.{i.toString().padStart(3, '0')}</div>
                <div className="font-bold text-slate-200 group-hover:text-white transition-colors">{skill}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function RoboExperience({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [
    { title: "Robotics Engineer", company: "Boston Dynamics", duration: "2021 - Present", description: "Designed control algorithms for bipedal locomotion. Improved sensor fusion latency by 35%." },
    { title: "Automation Specialist", company: "Tesla", duration: "2018 - 2021", description: "Programmed robotic arms for assembly line precision. Reduced error margins." }
  ]
  
  return (
    <section id="log" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-100">Operation Log</h2>
        <div className="flex-1 h-[1px] bg-cyan-900/50" />
      </div>
      
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-12">
        {items.map((exp, i) => (
          <motion.div key={i} variants={rigidStep} className="relative pl-8 md:pl-0">
            {/* Desktop timeline line */}
            <div className="hidden md:block absolute left-[155px] top-0 bottom-0 w-[1px] bg-cyan-900/50" />
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
              {/* Timeline marker */}
              <div className="absolute -left-[35px] top-2 md:static md:w-32 shrink-0 flex flex-col md:items-end z-10">
                <div className="w-3 h-3 bg-cyan-500 shadow-[0_0_10px_rgba(56,189,248,0.8)] md:hidden mb-2" />
                <span className="robo-font-mono text-cyan-400 text-sm font-bold bg-[#050b14] py-1">{exp.duration}</span>
              </div>
              
              {/* Timeline marker Desktop */}
              <div className="hidden md:block absolute left-[151px] top-3 w-2 h-2 bg-cyan-500 shadow-[0_0_10px_rgba(56,189,248,0.8)] z-10" />

              <div className="relative flex-1">
                <DrawBorders delay={0} color="bg-slate-700" />
                <div className="robo-panel p-6 md:p-8">
                  <div className="flex items-center gap-2 text-cyan-500 mb-2">
                    <CornerRightDown className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider">{exp.company}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-100 mb-4">{exp.title}</h3>
                  {exp.description && (
                    <p className="text-slate-400 leading-relaxed robo-font-mono text-sm">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function RoboContact({ p }: { p: PortfolioRow }) {
  const email = p.email || `hello@${p.slug}.dev`
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  
  return (
    <section id="uplink" className="py-24 px-6 max-w-4xl mx-auto relative z-10 mb-20">
      <div className="relative">
        <DrawBorders delay={0.2} color="bg-cyan-500" />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={rigidStep} className="robo-panel p-10 md:p-16 text-center">
          <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-100 mb-6">Establish Uplink</h2>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto robo-font-mono text-sm">
            &gt; SYSTEM READY TO RECEIVE TRANSMISSIONS. AWAITING INPUT FOR NEW DIRECTIVES.
          </p>
          <a href={`mailto:${email}`} className="inline-block bg-cyan-500 text-[#050b14] px-10 py-4 font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors">
            Transmit Signal
          </a>
        </motion.div>
      </div>
      
      <div className="mt-32 pt-8 border-t border-cyan-900/50 flex flex-col md:flex-row justify-between items-center gap-4 robo-font-mono text-xs text-slate-600">
        <p>IDENTIFIER: {name.toUpperCase()}</p>
        <p>STATUS: ONLINE</p>
        <p>© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
      </div>
    </section>
  )
}

export default function RoboticsPortfolioTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  return (
    <div className="robo-root relative selection:bg-cyan-500/30 selection:text-cyan-100">
      <style>{ROBO_CSS}</style>
      {/* Background grid */}
      <div className={`pointer-events-none ${isPreview ? 'absolute' : 'fixed'} inset-0 z-0 robo-bg-grid`} />
      
      <RoboHeader name={p.name || p.slug.split("-")[0]} isPreview={isPreview} />
      <main className="relative z-10">
        <RoboHero p={p} />
        <RoboSkills skills={p.skills} />
        <RoboExperience experience={p.experience} />
        <RoboContact p={p} />
      </main>
    </div>
  )
}
