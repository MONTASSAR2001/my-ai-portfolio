"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Terminal, Cpu, Globe, Crosshair } from "lucide-react"

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
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CYBER_CSS = `
  .cyber-root {
    font-family: 'Inter', sans-serif;
    background-color: #050505;
    color: #e2e8f0;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  .cyber-bg-grid {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(0, 243, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
  }

  .scanline {
    width: 100%;
    height: 100px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 243, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%);
    opacity: 0.1;
    position: fixed;
    bottom: 100%;
    animation: scanline 8s linear infinite;
    pointer-events: none;
    z-index: 50;
  }
  @keyframes scanline {
    0% { bottom: 100%; }
    100% { bottom: -100px; }
  }

  .glitch-text {
    position: relative;
    color: white;
  }
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #050505;
  }
  .glitch-text::before {
    left: 2px;
    text-shadow: -2px 0 #ff003c;
    clip: rect(24px, 550px, 90px, 0);
    animation: glitch-anim 3s infinite linear alternate-reverse;
  }
  .glitch-text::after {
    left: -2px;
    text-shadow: -2px 0 #00f3ff;
    clip: rect(85px, 550px, 140px, 0);
    animation: glitch-anim 2.5s infinite linear alternate-reverse;
  }
  @keyframes glitch-anim {
    0% { clip: rect(78px, 9999px, 83px, 0); }
    20% { clip: rect(15px, 9999px, 91px, 0); }
    40% { clip: rect(54px, 9999px, 23px, 0); }
    60% { clip: rect(98px, 9999px, 4px, 0); }
    80% { clip: rect(32px, 9999px, 78px, 0); }
    100% { clip: rect(65px, 9999px, 51px, 0); }
  }

  .neon-border {
    position: relative;
  }
  .neon-border::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border: 1px solid #00f3ff;
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.5), inset 0 0 10px rgba(0, 243, 255, 0.2);
    pointer-events: none;
    z-index: 10;
  }

  .cyber-btn {
    background: transparent;
    border: 1px solid #00f3ff;
    color: #00f3ff;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  }
  .cyber-btn:hover {
    background: #00f3ff;
    color: #050505;
    box-shadow: 0 0 15px #00f3ff;
  }
`

// ─── Animation Variants ───────────────────────────────────────────────────────
const staggerFast: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const revealSharp: any = {
  hidden: { opacity: 0, x: -20, filter: "brightness(0)" },
  show: { opacity: 1, x: 0, filter: "brightness(1)", transition: { duration: 0.3, ease: "easeOut" } }
}

export default function FuturisticTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const [isTldr, setIsTldr] = useState(false)
  
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const email = p.email || `hello@${p.slug}.dev`
  
  const summaryText = p.summary || "Architecting high-performance systems and cyberpunk interfaces for the next generation of the web."
  const tldrSummary = summaryText.split(".")[0] + "."

  const defaultExperience = [
    { title: "Netrunner", company: "Cyberdyne Systems", duration: "2077 - Present", description: "Hacking mainframes and optimizing deep neural networks. Built next-gen ICE protocols." },
    { title: "Frontend Operative", company: "Tyrell Corporation", duration: "2074 - 2077", description: "Designed retina-burning neon UI systems for off-world colony deployment." }
  ]
  const experienceItems = p.experience?.length ? p.experience : defaultExperience

  // TLDR Logic: Shorten descriptions if TLDR is active
  const displayExperience = isTldr 
    ? experienceItems.map(exp => ({
        ...exp,
        description: exp.description ? `— ${exp.description.split(".")[0]}.` : ""
      }))
    : experienceItems

  const skills = p.skills?.length ? p.skills : ["React", "TypeScript", "Three.js", "WebGL", "Cyber Security", "UI/UX"]

  return (
    <div className="cyber-root relative selection:bg-[#ff003c] selection:text-white z-0">
      <style>{CYBER_CSS}</style>
      
      {/* Visual Effects */}
      <div className="scanline" />
      <div className={`pointer-events-none ${isPreview ? 'absolute' : 'fixed'} inset-0 z-0 cyber-bg-grid`} />
      
      {/* ADVANCED COMPONENT 1: Fluid Mesh Background */}
      <div className="fixed inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
        <FluidMeshBackground />
      </div>

      {/* ADVANCED COMPONENT 2: Command Palette (Hidden in preview iframe) */}
      {!isPreview && (
        <div className="dark">
          <CommandPalette />
        </div>
      )}

      {/* Header */}
      <header className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#00f3ff]/30`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crosshair className="w-6 h-6 text-[#ff003c] animate-pulse" />
            <span className="font-bold tracking-widest text-lg uppercase text-white hidden sm:block">{name.split(" ")[0]}</span>
          </div>
          
          <div className="flex items-center gap-6">
            {/* ADVANCED COMPONENT 4: TLDR Toggle (Desktop) */}
            <div className="hidden sm:block scale-90 dark">
              <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
            </div>

            <nav className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest text-[#00f3ff]/70">
              {['Status', 'Tech', 'Logs', 'Comm'].map((item, i) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#ff003c] transition-colors flex items-center gap-1 group">
                  <span className="text-white group-hover:text-[#ff003c]">0{i+1}.</span> {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <motion.div 
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="h-[2px] w-full bg-[#ff003c] absolute bottom-0 origin-left"
        />
      </header>

      <main className="relative z-10 pt-20">
        
        {/* Hero Section */}
        <section id="status" className="pt-20 pb-24 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-center gap-16 relative">
            <div className="flex-1 w-full">
              
              {/* ADVANCED COMPONENT 3: Time Aware Greeting */}
              <div className="mb-6 dark">
                <TimeAwareGreeting />
              </div>

              <motion.div variants={staggerFast} initial="hidden" animate="show" className="space-y-6">
                <motion.div variants={revealSharp} className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f3ff]/10 border border-[#00f3ff]/50 text-[#00f3ff] text-xs font-mono tracking-widest uppercase">
                  <Terminal className="w-4 h-4" />
                  <span>OP_CLASS: {p.role || "ENGINEER"}</span>
                </motion.div>
                
                <motion.h1 variants={revealSharp} className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[1.1]">
                  <span className="glitch-text block" data-text={name}>{name}</span>
                </motion.h1>
                
                <motion.div variants={revealSharp} className="h-[2px] w-24 bg-[#ff003c]" />
                
                <motion.p variants={revealSharp} className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-mono text-sm">
                  &gt; {isTldr ? tldrSummary : summaryText}
                </motion.p>

                {/* Mobile TLDR Toggle */}
                <motion.div variants={revealSharp} className="sm:hidden pt-2 dark">
                  <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
                </motion.div>
                
                <motion.div variants={revealSharp} className="pt-8 flex flex-col sm:flex-row gap-4">
                  <a href="#comm" className="cyber-btn inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#00f3ff]/10">
                    <Crosshair className="w-4 h-4" /> Connect
                  </a>
                </motion.div>
              </motion.div>
            </div>
            
            {p.profile_image && (
              <div className="lg:w-1/3 relative flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                  className="neon-border relative w-64 h-64 md:w-80 md:h-80 bg-[#00f3ff]/10 p-4"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-2 font-mono text-xs text-[#00f3ff] z-10 border border-[#00f3ff]/50">
                    ID_TAG
                  </div>
                  <Image src={p.profile_image} alt={name} layout="fill" objectFit="cover" className="p-2 opacity-80 mix-blend-screen filter contrast-125 hover:opacity-100 transition-all duration-300" />
                </motion.div>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section id="tech" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">Tech Stack</h2>
            <div className="flex-1 h-[1px] bg-[#00f3ff]/30" />
          </div>
          
          <motion.div 
            variants={staggerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {skills.map((skill, i) => (
              <motion.div key={i} variants={revealSharp} className="neon-border relative group p-6 bg-[#00f3ff]/5 hover:bg-[#00f3ff]/20 transition-colors h-full flex flex-col justify-between">
                <Cpu className="w-6 h-6 text-[#00f3ff] group-hover:text-white transition-colors mb-6" />
                <div>
                  <div className="font-bold text-white uppercase tracking-widest">{skill}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="logs" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">Action Logs</h2>
            <div className="flex-1 h-[1px] bg-[#ff003c]/50" />
            {isTldr && <span className="font-mono text-[#ff003c] text-xs tracking-widest px-2 py-1 bg-[#ff003c]/10 border border-[#ff003c]/30 animate-pulse">FAST_FWD</span>}
          </div>
          
          <motion.div variants={staggerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-12">
            {displayExperience.map((exp, i) => (
              <motion.div key={i} variants={revealSharp} className="dark">
                {/* ADVANCED COMPONENT 5: Chameleon Project Card */}
                <ChameleonProjectCard exp={exp} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="comm" className="py-24 px-6 max-w-4xl mx-auto relative z-10 mb-20 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={revealSharp} className="p-10 md:p-16 bg-[#00f3ff]/5 border border-[#00f3ff]/30 neon-border">
            <Globe className="w-12 h-12 text-[#ff003c] mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">Open Channel</h2>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto font-mono text-sm">
              &gt; FREQUENCY AVAILABLE. WAITING FOR PING...
            </p>
            <a href={`mailto:${email}`} className="cyber-btn inline-block px-10 py-4 font-black text-lg">
              Send Ping
            </a>
          </motion.div>
          
          <div className="mt-32 pt-8 border-t border-[#00f3ff]/30 font-mono text-xs text-slate-600">
            <p>© {new Date().getFullYear()} {name.toUpperCase()} // END OF TRANSMISSION</p>
          </div>
        </section>
      </main>
    </div>
  )
}
