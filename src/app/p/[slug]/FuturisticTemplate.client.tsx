"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Activity, ArrowUpRight, Code2, Cpu, Layers, Link2, Mail, Sparkles, Terminal } from "lucide-react"
import type { ReactNode } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const FUTURISTIC_CSS = `
  .futuristic-root {
    --background: #09090b;
    --foreground: #fafafa;
    --card: #121214;
    --muted-foreground: #a1a1aa;
    --neon: #d946ef;
    --cyan: #06b6d4;
    color-scheme: dark;
    background-color: var(--background);
    color: var(--foreground);
    font-family: 'Inter', sans-serif;
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .text-glow {
    text-shadow: 0 0 10px rgba(217, 70, 239, 0.7), 0 0 20px rgba(217, 70, 239, 0.4);
  }
  
  @keyframes glitch {
    0%, 100% { clip-path: inset(0 0 98% 0); transform: translate(-2px,0); }
    20% { clip-path: inset(30% 0 50% 0); transform: translate(2px,0); }
    40% { clip-path: inset(60% 0 20% 0); transform: translate(-2px,0); }
    60% { clip-path: inset(10% 0 80% 0); transform: translate(2px,0); }
    80% { clip-path: inset(80% 0 5% 0); transform: translate(-2px,0); }
  }
  
  .glitch-hover {
    position: relative;
    display: inline-block;
  }
  .glitch-hover:hover::before {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0; width: 100%;
    color: var(--neon);
    animation: glitch 0.3s steps(2) infinite;
    z-index: 10;
  }
  .glitch-hover:hover::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0; width: 100%;
    color: var(--cyan);
    animation: glitch 0.4s steps(2) infinite reverse;
    z-index: 9;
  }

  .scanline::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px);
  }

  .bg-grid {
    background-size: 40px 40px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  }
`

// ─── Animation Variants ───────────────────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.4, type: "spring", stiffness: 120 }
  }
}

// ─── Components ───────────────────────────────────────────────────────────────
function GlassPanel({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(217, 70, 239, 0.15)", borderColor: "rgba(217, 70, 239, 0.3)" }}
      className={`glass-panel relative overflow-hidden rounded-2xl transition-all duration-300 ${className ?? ""}`}
    >
      <div className="relative">{children}</div>
    </motion.div>
  )
}

function TopDock({ slug, isPreview }: { slug: string, isPreview?: boolean }) {
  const initials = slug.split("-").map(w => w[0]?.toUpperCase() ?? "").join("").slice(0, 2)
  const navItems = [{ icon: Sparkles, label: "Overview" }, { icon: Cpu, label: "Stack" }, { icon: Layers, label: "Work" }]
  const socials  = [{ icon: Code2, label: "GitHub" }, { icon: Link2, label: "LinkedIn" }, { icon: Mail, label: "Email" }]
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`glass-panel ${isPreview ? "absolute" : "sticky"} top-4 z-50 mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3`}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
          <Sparkles className="size-4" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
          {initials}<span className="text-fuchsia-500">/</span>OS
        </span>
      </div>
      <nav className="hidden items-center gap-2 md:flex">
        {navItems.map(({ icon: Icon, label }) => (
          <button key={label} className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/10 hover:text-white">
            <Icon className="size-4" />{label}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-1">
        {socials.map(({ icon: Icon, label }) => (
          <button key={label} aria-label={label} className="flex size-9 items-center justify-center rounded-xl text-zinc-400 transition-all hover:bg-white/10 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </motion.header>
  )
}

function HeroPanel({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const firstName = name.split(" ")[0] || "Aria"
  
  return (
    <GlassPanel delay={0.1} className="p-8 md:p-12">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <div className="relative shrink-0">
          <div className="absolute -inset-4 animate-pulse rounded-full bg-fuchsia-500/20 blur-2xl" />
          {p.profile_image ? (
            <Image src={p.profile_image} alt={name} width={132} height={132} className="relative size-32 rounded-full object-cover ring-2 ring-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.4)]" />
          ) : (
            <div className="relative flex size-32 items-center justify-center rounded-full bg-white/5 ring-2 ring-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.4)] text-5xl font-black text-white/30">
              {firstName.charAt(0)}
            </div>
          )}
          <span className="absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-medium text-cyan-400 backdrop-blur border border-cyan-400/30">
            <span className="size-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />sys.online
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-200"
          >
            <Terminal className="size-3 text-fuchsia-400" />
            {p.role || "Cybernetics Engineer"}
          </motion.div>
          <h1 
            className="glitch-hover text-balance font-sans text-5xl font-black tracking-tight md:text-7xl text-glow"
            data-text={name}
          >
            {name}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
            {p.summary || "Architecting real-time intelligence at the edge of human–machine interfaces."}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(217,70,239,0.6)" }}
              className="flex items-center gap-2 rounded-xl bg-fuchsia-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-fuchsia-400"
            >
              Initiate contact
              <ArrowUpRight className="size-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}

function TechStackPanel({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["TypeScript", "React", "Next.js", "Python", "Rust", "GraphQL", "Docker", "AWS"]
  
  return (
    <GlassPanel delay={0.2} className="h-full p-8">
      <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <Cpu className="size-5" />
        </span>
        <div>
          <h2 className="font-sans text-xl font-bold tracking-tight">Active Matrix</h2>
          <p className="font-mono text-xs text-zinc-500">/ sys.capabilities</p>
        </div>
      </div>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap gap-3"
      >
        {items.map((item) => (
          <motion.span
            key={item}
            variants={staggerItem}
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(6,182,212,0.6)", borderColor: "rgba(6,182,212,0.8)", color: "#22d3ee" }}
            className="cursor-default rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </GlassPanel>
  )
}

function ExperiencePanel({ experience }: { experience?: ExpItem[] }) {
  const log = experience?.length ? experience : [
    { title: "Principal Systems Engineer", company: "Nexus Corp", duration: "2023 — NOW", description: "Architected distributed inference platform." },
    { title: "Senior Developer", company: "Cyberdyne", duration: "2020 — 2023", description: "Built real-time data processing pipelines." },
  ]

  return (
    <GlassPanel delay={0.3} className="h-full p-8">
      <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex size-10 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
          <Activity className="size-5" />
        </span>
        <div>
          <h2 className="font-sans text-xl font-bold tracking-tight">Operation Logs</h2>
          <p className="font-mono text-xs text-zinc-500">/ chronological data-stream</p>
        </div>
      </div>
      <div className="relative pl-6">
        <div className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-gradient-to-b from-fuchsia-500 via-cyan-400 to-transparent opacity-50" />
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {log.map((entry, i) => (
            <motion.div key={i} variants={staggerItem} className="relative">
              <span className="absolute -left-[27px] top-1.5 flex size-4 items-center justify-center rounded-full bg-[#121214] border border-fuchsia-500/50">
                <span className="size-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.8)] animate-pulse" />
              </span>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <span className="font-mono text-xs text-fuchsia-400">{entry.duration || "—"}</span>
                <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-cyan-400 uppercase">
                  {i === 0 ? "Active" : "Logged"}
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-white">
                {entry.title}{" "}
                <span className="text-zinc-400 font-medium text-base">@ {entry.company}</span>
              </h3>
              {entry.description && <p className="mt-2 text-sm leading-relaxed text-zinc-400">{entry.description}</p>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </GlassPanel>
  )
}

export default function FuturisticTemplateClient({ p, isPreview }: { p: PortfolioRow, isPreview?: boolean }) {
  const parts = p.slug.split("-")
  const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Aria"
  const lastName = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Vale"

  return (
    <div className="futuristic-root scanline">
      <style>{FUTURISTIC_CSS}</style>
      <div className={`pointer-events-none ${isPreview ? "absolute" : "fixed"} inset-0 -z-10 bg-grid`} />
      <div className={`pointer-events-none ${isPreview ? "absolute" : "fixed"} inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.15),transparent_50%)]`} />
      
      <main className="relative min-h-screen w-full px-4 pb-20 pt-4 md:px-8">
        <TopDock slug={p.slug} isPreview={isPreview} />
        
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-6">
          <HeroPanel p={p} />
          <div className="grid gap-6 lg:grid-cols-2">
            <TechStackPanel skills={p.skills} />
            <ExperiencePanel experience={p.experience} />
          </div>
          
          <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 px-2 text-xs text-zinc-500 sm:flex-row">
            <span className="font-mono">
              © {new Date().getFullYear()} {firstName.toUpperCase()} {lastName.toUpperCase()} · NEURAL_NET v3.1
            </span>
            <span className="flex items-center gap-2 font-mono">
              <span className="size-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
              all systems nominal
            </span>
          </footer>
        </div>
      </main>
    </div>
  )
}
