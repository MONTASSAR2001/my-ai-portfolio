"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal, Code2 } from "lucide-react"

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
const HACKER_CSS = `
  .hacker-root {
    font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
    background-color: #050505;
    color: #a3a3a3;
    min-height: 100vh;
  }
  .matrix-bg {
    background-image: 
      linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
    background-position: center center;
  }
  .hacker-text {
    color: #22c55e;
    text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
  }
  .terminal-window {
    background: #0a0a0a;
    border: 1px solid #1f2937;
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  }
  .terminal-header {
    background: #171717;
    border-bottom: 1px solid #262626;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
  }
  .terminal-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`

const Typewriter = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.02, delayChildren: delay } }
      }}
      className={className}
    >
      {Array.from(text).map((char, i) => (
        <motion.span key={i} variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function ElegantDeveloperTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const [isTldr, setIsTldr] = useState(false)
  
  const name = p.name || p.slug
  const email = p.email || `sudo@${p.slug}.dev`
  
  const summaryText = p.summary || "Full-stack engineer optimizing complex systems and delivering scalable logic."
  const tldrSummary = summaryText.split(".")[0] + "."

  const defaultExperience = [
    { title: "Senior Core Contributor", company: "Open Source Foundation", duration: "2021 - Present", description: "Maintained critical infrastructure pipelines. Authored 50+ PRs resolving complex memory leaks." },
    { title: "Systems Engineer", company: "Cyberdyne Systems", duration: "2018 - 2021", description: "Developed low-latency trading algorithms using Rust and WebAssembly, boosting execution speed by 15%." }
  ]
  const experienceItems = p.experience?.length ? p.experience : defaultExperience

  // TLDR Logic: Shorten descriptions if TLDR is active
  const displayExperience = isTldr 
    ? experienceItems.map(exp => ({
        ...exp,
        description: exp.description ? `— ${exp.description.split(".")[0]}.` : ""
      }))
    : experienceItems

  const skills = p.skills?.length ? p.skills : ["Rust", "TypeScript", "Go", "Docker", "Kubernetes", "Linux"]

  return (
    <div className="hacker-root relative selection:bg-green-500/30 selection:text-green-300 z-0">
      <style>{HACKER_CSS}</style>
      
      {/* ADVANCED COMPONENT 1: Fluid Mesh Background - Under the matrix grid */}
      <div className="fixed inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <FluidMeshBackground />
      </div>
      
      {/* Matrix overlay */}
      <div className="fixed inset-0 z-0 matrix-bg pointer-events-none opacity-40" />

      {/* ADVANCED COMPONENT 2: Command Palette (Hidden in preview iframe) */}
      {!isPreview && (
        <div className="dark">
          <CommandPalette cvUrl={p.cv_url ?? undefined} />
        </div>
      )}

      <header className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-green-900/30`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 hacker-text font-bold text-lg">
            <Terminal className="w-5 h-5" />
            <span>~/{name.split(" ")[0].toLowerCase()}</span>
          </div>
          
          <div className="flex items-center gap-6">
            {/* ADVANCED COMPONENT 4: TLDR Toggle (Desktop) */}
            <div className="hidden sm:block scale-90">
              {/* Force dark mode for TLDR toggle to fit hacker theme */}
              <div className="dark">
                <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
              </div>
            </div>
            
            <nav className="hidden md:flex gap-6 text-sm">
              {['./init', './skills', './log'].map(item => (
                <a key={item} href={`#${item.replace('./', '')}`} className="hover:hacker-text transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-24 px-6 max-w-6xl mx-auto pb-32">
        <section id="init" className="pt-20 pb-32 flex flex-col items-start justify-center min-h-[80vh]">
          
          {/* ADVANCED COMPONENT 3: Time Aware Greeting */}
          <div className="mb-8 dark">
            <TimeAwareGreeting />
          </div>

          <div className="w-full terminal-window overflow-hidden">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-2 text-xs text-slate-500 font-medium">bash - root@{name.split(" ")[0].toLowerCase()}</span>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold">$</span>
                <Typewriter text={`whoami`} className="text-slate-300" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="pl-4 border-l-2 border-slate-800"
              >
                <h1 className="text-4xl md:text-6xl font-black text-slate-100 mb-2">{name}</h1>
                <p className="text-xl hacker-text mb-4">{p.role || "Systems Architect"}</p>
                <p className="text-slate-400 max-w-2xl leading-relaxed">
                  {isTldr ? tldrSummary : summaryText}
                </p>

                {/* Mobile TLDR Toggle */}
                <div className="sm:hidden mt-6 dark">
                  <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex items-center gap-2 mt-6">
                <span className="text-green-500 font-bold">$</span>
                <span className="text-slate-300">./connect.sh</span>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="pl-4">
                <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors rounded">
                  <Terminal className="w-4 h-4" /> Initialize Uplink
                </a>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="flex items-center gap-2">
                <span className="text-green-500 font-bold">$</span>
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-5 bg-green-500 inline-block" />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="hacker-text text-2xl font-bold">~/skills</span>
            <div className="h-[1px] flex-1 bg-slate-800" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="terminal-window p-6 text-center hover:border-green-500/50 transition-colors group cursor-crosshair"
              >
                <Code2 className="w-8 h-8 text-slate-600 group-hover:text-green-400 mx-auto mb-4 transition-colors" />
                <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{skill}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="log" className="py-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="hacker-text text-2xl font-bold">~/execution_log</span>
            <div className="h-[1px] flex-1 bg-slate-800" />
            {isTldr && <span className="text-amber-500 text-xs px-2 py-1 bg-amber-500/10 border border-amber-500/30">--verbose=false</span>}
          </div>
          
          <div className="space-y-8 dark">
            {/* ADVANCED COMPONENT 5: Chameleon Project Card (Wrapped in dark class to match terminal vibe) */}
            {displayExperience.map((exp, i) => (
              <ChameleonProjectCard key={i} exp={exp} />
            ))}
          </div>
        </section>

        <footer className="mt-32 pt-8 border-t border-slate-800 text-center text-sm text-slate-600">
          <p>root@{name.split(" ")[0].toLowerCase()}:~$ exit</p>
          <p className="mt-2 text-xs">CONNECTION TERMINATED.</p>
        </footer>
      </main>
    </div>
  )
}
