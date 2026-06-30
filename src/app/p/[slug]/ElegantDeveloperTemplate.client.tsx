"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal as TerminalIcon, GitBranch, FolderGit2 } from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const TERMINAL_CSS = `
  .elegant-root {
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    background-color: #050505;
    color: #a3a3a3;
    min-height: 100vh;
  }
  .matrix-bg {
    background-image: 
      linear-gradient(rgba(74, 222, 128, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(74, 222, 128, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .term-green {
    color: #4ade80;
  }
  .term-window {
    background-color: #0a0a0a;
    border: 1px solid #1f1f1f;
    border-radius: 8px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.8);
  }
  .cursor-blink {
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`

// ─── Animation Components ────────────────────────────────────────────────────
function TerminalTypewriter({ text, prompt = ">", delay = 0 }: { text: string; prompt?: string; delay?: number }) {
  const characters = Array.from(text);
  return (
    <div className="inline-block break-words">
      {prompt && <span className="term-green mr-3 select-none">{prompt}</span>}
      <motion.span
        variants={{
          hidden: { opacity: 1 },
          show: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: delay } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {characters.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, display: "none" },
              show: { opacity: 1, display: "inline" }
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
      <span className="cursor-blink term-green ml-1 select-none">_</span>
    </div>
  )
}

function TermHoverPopup({ children, popupText }: { children: React.ReactNode; popupText: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative inline-block cursor-crosshair w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 z-50 pointer-events-none"
          >
            <div className="term-window p-3 text-xs bg-[#050505]">
              <div className="flex gap-1.5 mb-3 border-b border-gray-800 pb-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <p className="term-green font-bold mb-1">$ cat details.txt</p>
              <p className="text-gray-400">{popupText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Content Sections ───────────────────────────────────────────────────────
function TopBar({ name, isPreview }: { name: string; isPreview?: boolean }) {
  return (
    <header className={`term-window ${isPreview ? 'absolute' : 'fixed'} top-4 left-4 right-4 z-50 flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/90 backdrop-blur`}>
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        </div>
        <TerminalIcon className="w-4 h-4 text-gray-500" />
        <span className="text-xs md:text-sm font-bold text-gray-300">bash — {name.toLowerCase().replace(/\s+/g, '_')}@system:~</span>
      </div>
      <div className="hidden md:flex gap-6 text-xs font-bold text-gray-500">
        <a href="#about" className="hover:term-green transition-colors">./about.sh</a>
        <a href="#skills" className="hover:term-green transition-colors">./skills.sh</a>
        <a href="#work" className="hover:term-green transition-colors">./work.sh</a>
        <a href="#contact" className="hover:term-green transition-colors">./contact.sh</a>
      </div>
    </header>
  )
}

function TerminalHero({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const role = p.role || "Software Engineer"
  
  return (
    <section id="about" className="pt-32 pb-20 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="term-window p-5 md:p-10 relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-[#111] border-b border-[#222] rounded-t-lg flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-[10px] text-gray-500 ml-2 font-bold font-sans tracking-widest">profile.exe</span>
        </div>
        
        <div className="mt-8 space-y-10">
          <div>
            <div className="text-lg md:text-2xl font-bold text-white mb-4">
              <TerminalTypewriter text={`whoami`} prompt="admin@local ~ %" delay={0.2} />
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="pl-4 md:pl-6 border-l-2 border-gray-800 py-2">
              <p className="text-3xl md:text-5xl font-black mb-3 text-gray-200">{name}</p>
              <p className="term-green text-xl md:text-2xl font-bold">"{role}"</p>
            </motion.div>
          </div>

          <div>
            <div className="text-lg md:text-2xl font-bold text-white mb-4">
              <TerminalTypewriter text={`cat summary.txt`} prompt="admin@local ~ %" delay={1.5} />
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="pl-4 md:pl-6 text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl border-l-2 border-gray-800 py-2">
              {p.summary || "Full-stack developer focused on building scalable, performant, and secure systems."}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TerminalSkills({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["TypeScript", "React", "Node.js", "Python", "Go", "Docker", "Kubernetes", "PostgreSQL", "AWS", "GraphQL"]
  
  return (
    <section id="skills" className="py-20 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="term-window p-5 md:p-10 relative">
        <div className="text-lg md:text-2xl font-bold text-white mb-8">
          <TerminalTypewriter text={`ls -la ./skills/`} prompt="admin@local ~ %" delay={0} />
        </div>
        
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 pl-4 md:pl-6 border-l-2 border-gray-800 py-2"
        >
          {items.map((skill, i) => {
            const permissions = "-rw-r--r--"
            const size = Math.floor(Math.random() * 8000) + 1024
            return (
              <motion.div key={i} variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}>
                <TermHoverPopup popupText={`Expertise module loaded: [${skill}]. System nominal and ready for compilation.`}>
                  <div className="flex flex-col border border-gray-800 p-4 rounded bg-[#080808] hover:border-green-500/40 hover:bg-[#0a0a0a] transition-all">
                    <div className="text-[10px] text-gray-600 mb-3 flex justify-between font-sans tracking-wider">
                      <span>{permissions}</span>
                      <span>{size}B</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FolderGit2 className="w-4 h-4 term-green" />
                      <span className="font-bold text-gray-300 text-sm md:text-base">{skill}</span>
                    </div>
                  </div>
                </TermHoverPopup>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function TerminalExperience({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [
    { title: "Senior Software Engineer", company: "Cyberdyne Systems", duration: "2021 - Present", description: "Developed neural net-based processors. Optimized system architecture." },
    { title: "Backend Developer", company: "Tyrell Corp", duration: "2018 - 2021", description: "Maintained legacy replicant database and REST APIs." }
  ]
  
  return (
    <section id="work" className="py-20 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="term-window p-5 md:p-10 relative">
        <div className="text-lg md:text-2xl font-bold text-white mb-8">
          <TerminalTypewriter text={`git log --oneline`} prompt="admin@local ~ %" delay={0} />
        </div>
        
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 1 } } }}
          className="space-y-10 mt-8 pl-6 border-l-2 border-gray-800 py-2 relative"
        >
          {items.map((exp, i) => {
            const commitHash = Math.random().toString(16).substr(2, 7)
            return (
              <motion.div key={i} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="relative">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-[#0a0a0a] border-2 border-green-500 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                  <span className="text-yellow-500 font-bold text-sm">commit {commitHash}</span>
                  <span className="text-gray-500 text-xs">({exp.duration})</span>
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl mb-2">{exp.title}</h3>
                <div className="mb-4 text-gray-400 font-bold flex items-center gap-2 text-sm">
                  <GitBranch className="w-4 h-4 term-green" />
                  {exp.company}
                </div>
                {exp.description && (
                  <p className="text-gray-500 text-sm leading-relaxed max-w-2xl bg-[#050505] p-5 rounded-md border border-gray-900">
                    <span className="text-gray-700 select-none">&gt; </span>{exp.description}
                  </p>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function TerminalContact({ p }: { p: PortfolioRow }) {
  const email = p.email || `hello@${p.slug}.dev`
  
  return (
    <section id="contact" className="py-20 px-4 md:px-6 max-w-5xl mx-auto mb-20">
      <div className="term-window p-5 md:p-10 relative">
        <div className="text-lg md:text-2xl font-bold text-white mb-8">
          <TerminalTypewriter text={`./ping.sh`} prompt="admin@local ~ %" delay={0} />
        </div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }} className="pl-4 md:pl-6 border-l-2 border-gray-800 py-2 space-y-2 font-mono text-xs md:text-sm">
          <p className="text-gray-500">PING mail-server.local (127.0.0.1): 56 data bytes</p>
          <p className="text-gray-500">64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms</p>
          <p className="text-gray-500">64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms</p>
          <p className="text-gray-500 mb-8">--- mail-server.local ping statistics ---</p>
          
          <p className="text-white font-bold text-lg md:text-xl mt-8">
            Connection established. Send packets to:
          </p>
          <a href={`mailto:${email}`} className="inline-block mt-4 term-green text-xl md:text-3xl font-black hover:bg-green-500/10 p-2 rounded transition-colors border border-transparent hover:border-green-500/30">
            {email}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default function ElegantDeveloperTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  return (
    <div className="elegant-root matrix-bg selection:bg-green-500/30 selection:text-green-200">
      <style>{TERMINAL_CSS}</style>
      <TopBar name={p.name || p.slug.split("-")[0]} isPreview={isPreview} />
      <main className="pt-8 relative z-10">
        <TerminalHero p={p} />
        <TerminalSkills skills={p.skills} />
        <TerminalExperience experience={p.experience} />
        <TerminalContact p={p} />
      </main>
    </div>
  )
}
