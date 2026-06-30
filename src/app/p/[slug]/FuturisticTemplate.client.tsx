"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Activity, ArrowUpRight, Boxes, Code2, Cpu, Layers, Link2, Mail, MapPin, Sparkles, Terminal } from "lucide-react"
import type { ReactNode } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; summary?: string; skills?: string[]
  experience?: ExpItem[]; profile_image?: string | null
}

// ─── Injected CSS (v0 globals: glass-panel, text-glow, animations) ────────────
const FUTURISTIC_CSS = `
  .futuristic-root {
    --background: oklch(0.16 0.03 280);
    --foreground: oklch(0.97 0.01 280);
    --card: oklch(0.2 0.035 280);
    --card-foreground: oklch(0.97 0.01 280);
    --muted-foreground: oklch(0.72 0.03 285);
    --border: oklch(1 0 0 / 10%);
    --neon: oklch(0.7 0.23 305);
    --cyan: oklch(0.78 0.14 215);
    --primary-foreground: oklch(0.16 0.03 280);
    color-scheme: dark;
  }
  .futuristic-root { background-color: var(--background); color: var(--foreground); }
  .futuristic-root .text-foreground { color: var(--foreground) !important; }
  .futuristic-root .text-muted-foreground { color: var(--muted-foreground) !important; }
  .futuristic-root .bg-background { background-color: var(--background) !important; }
  .futuristic-root .bg-card { background-color: var(--card) !important; }
  .futuristic-root .text-neon { color: var(--neon) !important; }
  .futuristic-root .text-cyan { color: var(--cyan) !important; }
  .futuristic-root .bg-neon { background-color: var(--neon) !important; }
  .futuristic-root .bg-cyan { background-color: var(--cyan) !important; }
  .futuristic-root .bg-neon\\/15 { background-color: oklch(0.7 0.23 305 / 15%) !important; }
  .futuristic-root .bg-cyan\\/15 { background-color: oklch(0.78 0.14 215 / 15%) !important; }
  .futuristic-root .text-primary-foreground { color: var(--primary-foreground) !important; }
  .futuristic-root .shadow-\\[0_0_40px_-8px_oklch\\(0\\.7_0\\.23_305_\\/_0\\.8\\)\\] {
    box-shadow: 0 0 40px -8px oklch(0.7 0.23 305 / 0.8) !important;
  }
  .glass-panel {
    background: oklch(1 0 0 / 5%);
    backdrop-filter: blur(40px) saturate(140%);
    -webkit-backdrop-filter: blur(40px) saturate(140%);
    border: 1px solid oklch(1 0 0 / 8%);
    border-top-color: oklch(1 0 0 / 18%);
    box-shadow: 0 1px 0 0 oklch(1 0 0 / 10%) inset, 0 30px 80px -20px oklch(0.05 0.02 280 / 70%), 0 0 0 1px oklch(0.05 0.02 280 / 30%);
  }
  .text-glow { text-shadow: 0 0 40px oklch(0.7 0.23 305 / 45%); }
  @keyframes float { 0%,100% { transform:translate3d(0,0,0); } 50% { transform:translate3d(0,-14px,0); } }
  @keyframes breathe { 0%,100% { transform:scale(1); opacity:0.55; } 50% { transform:scale(1.12); opacity:0.9; } }
  @keyframes mesh { 0%,100% { transform:translate3d(0,0,0) scale(1); } 33% { transform:translate3d(6%,-4%,0) scale(1.1); } 66% { transform:translate3d(-5%,5%,0) scale(0.95); } }
  .animate-float { animation: float 9s ease-in-out infinite; }
  .animate-float-slow { animation: float 13s ease-in-out infinite; }
  .animate-breathe { animation: breathe 6s ease-in-out infinite; }
  .animate-mesh { animation: mesh 22s ease-in-out infinite; }
`

// ─── GlassPanel ───────────────────────────────────────────────────────────────
function GlassPanel({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`glass-panel group relative overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-[0_40px_120px_-20px_oklch(0.5_0.22_300_/_0.45)] ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120%_80%_at_50%_0%,oklch(0.7_0.23_305_/_0.12),transparent_70%)]" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}

// ─── SpatialBackground ────────────────────────────────────────────────────────
function SpatialBackground({ isPreview }: { isPreview?: boolean }) {
  return (
    <div aria-hidden className={`pointer-events-none ${isPreview ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden bg-background`}>
      <div className="absolute inset-0 bg-[radial-gradient(135%_135%_at_50%_-20%,oklch(0.34_0.13_300)_0%,oklch(0.22_0.08_288)_38%,oklch(0.13_0.04_282)_78%,oklch(0.1_0.02_280)_100%)]" />
      <div className="absolute -left-[12%] top-[-18%] h-[60vw] w-[60vw] animate-mesh rounded-full bg-[radial-gradient(circle,oklch(0.6_0.27_305_/_0.85),transparent_62%)] blur-[110px]" />
      <div className="absolute right-[-14%] top-[4%] h-[52vw] w-[52vw] animate-float-slow rounded-full bg-[radial-gradient(circle,oklch(0.55_0.24_275_/_0.7),transparent_62%)] blur-[110px]" />
      <div className="absolute bottom-[-22%] left-[14%] h-[55vw] w-[55vw] animate-mesh rounded-full bg-[radial-gradient(circle,oklch(0.6_0.18_245_/_0.6),transparent_62%)] blur-[110px] [animation-delay:-8s]" />
      <div className="absolute bottom-[2%] right-[4%] h-[40vw] w-[40vw] animate-breathe rounded-full bg-[radial-gradient(circle,oklch(0.72_0.2_312_/_0.6),transparent_62%)] blur-[100px]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(oklch(1_0_0)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(110%_110%_at_50%_0%,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(130%_130%_at_50%_45%,transparent_50%,oklch(0.07_0.02_280_/_0.8)_100%)]" />
    </div>
  )
}

// ─── TopDock ──────────────────────────────────────────────────────────────────
function TopDock({ slug, isPreview }: { slug: string, isPreview?: boolean }) {
  const initials = slug.split("-").map(w => w[0]?.toUpperCase() ?? "").join("").slice(0, 2)
  const navItems = [{ icon: Sparkles, label: "Overview" }, { icon: Cpu, label: "Stack" }, { icon: Layers, label: "Work" }, { icon: Activity, label: "Signal" }]
  const socials  = [{ icon: Code2, label: "GitHub" }, { icon: Link2, label: "LinkedIn" }, { icon: Mail, label: "Email" }]
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel ${isPreview ? "absolute" : "sticky"} top-4 z-50 mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5`}
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-8 items-center justify-center rounded-xl bg-neon/15">
          <span className="absolute inset-0 animate-breathe rounded-xl bg-neon/30 blur-md" />
          <Sparkles className="relative size-4 text-neon" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {initials}<span className="text-neon">/</span>OS
        </span>
      </div>
      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map(({ icon: Icon, label }) => (
          <button key={label} className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
            <Icon className="size-4" />{label}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-1">
        {socials.map(({ icon: Icon, label }) => (
          <button key={label} aria-label={label} className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-white/5 hover:text-neon">
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </motion.header>
  )
}

// ─── HeroPanel ────────────────────────────────────────────────────────────────
function HeroPanel({ p }: { p: PortfolioRow }) {
  const parts     = p.slug.split("-")
  const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Aria"
  const lastName  = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Vale"
  const fullName  = `${firstName} ${lastName}`

  return (
    <GlassPanel delay={0.1} className="p-8 md:p-10">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        {/* Avatar with breathing aura */}
        <div className="relative shrink-0">
          <div className="absolute -inset-4 animate-breathe rounded-full bg-[radial-gradient(circle,oklch(0.65_0.24_305_/_0.7),transparent_70%)] blur-2xl" />
          <div className="absolute -inset-px rounded-full bg-gradient-to-b from-white/40 to-transparent" />
          {p.profile_image ? (
            <Image src={p.profile_image} alt={`Portrait of ${fullName}`} width={132} height={132} priority className="relative size-28 rounded-full object-cover ring-1 ring-white/20 md:size-32" />
          ) : (
            <div className="relative size-28 rounded-full bg-white/5 ring-1 ring-white/20 flex items-center justify-center text-5xl font-black text-white/20 md:size-32">
              {firstName.charAt(0)}
            </div>
          )}
          <span className="absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-medium text-neon backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-neon" />online
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
          >
            <MapPin className="size-3 text-neon" />
            Remote · Available for select work
          </motion.div>
          <h1 className="text-balance font-sans text-5xl font-semibold leading-[0.95] tracking-tight text-glow md:text-7xl">
            {fullName}
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {p.summary || "Elite engineer architecting real-time intelligence at the edge of human–machine interfaces."}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#contact" className="group/btn flex items-center gap-2 rounded-xl bg-neon px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.7_0.23_305_/_0.8)] transition-transform hover:scale-[1.03]">
              Initiate contact
              <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
            <button className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/10">
              View dossier
            </button>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}

// ─── StatsPanel ───────────────────────────────────────────────────────────────
function StatsPanel({ experience, skills }: { experience?: ExpItem[]; skills?: string[] }) {
  const stats = [
    { value: `${experience?.length ?? 0}+`, label: "Roles held" },
    { value: `${skills?.length ?? 0}+`, label: "Technologies" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "∞", label: "Curiosity" },
  ]
  return (
    <GlassPanel delay={0.2} className="p-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="flex flex-col items-center justify-center gap-1 bg-card/40 px-4 py-5 text-center transition-colors hover:bg-white/5">
            <span className="font-sans text-3xl font-semibold tracking-tight text-foreground">{s.value}</span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  )
}

// ─── TechStackPanel ───────────────────────────────────────────────────────────
function TechStackPanel({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Docker", "Kubernetes", "Python", "Rust", "GraphQL", "Redis", "AWS"]
  const third = Math.ceil(items.length / 3)
  const clusters = [
    { title: "Core",    items: items.slice(0, third) },
    { title: "Systems", items: items.slice(third, third * 2) },
    { title: "Cloud",   items: items.slice(third * 2) },
  ]
  return (
    <GlassPanel delay={0.25} className="h-full p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-neon/15 text-neon">
          <Cpu className="size-4" />
        </span>
        <div>
          <h2 className="font-sans text-lg font-semibold tracking-tight">Tech Stack</h2>
          <p className="font-mono text-xs text-muted-foreground">/ active capability matrix</p>
        </div>
        <Boxes className="ml-auto size-5 text-muted-foreground/50" />
      </div>
      <div className="space-y-5">
        {clusters.map((cluster, ci) => (
          <div key={cluster.title}>
            <p className="mb-2.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">{cluster.title}</p>
            <div className="flex flex-wrap gap-2">
              {cluster.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + ci * 0.1 + i * 0.04 }}
                  className="group/chip relative cursor-default rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-foreground/90 transition-all hover:border-neon/50 hover:bg-neon/10 hover:text-neon"
                >
                  <span className="absolute left-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-neon/60 opacity-0 shadow-[0_0_8px_oklch(0.7_0.23_305)] transition-opacity group-hover/chip:opacity-100" />
                  <span className="transition-transform group-hover/chip:translate-x-2.5">{item}</span>
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  )
}

// ─── ExperiencePanel ──────────────────────────────────────────────────────────
function ExperiencePanel({ experience }: { experience?: ExpItem[] }) {
  const log = experience?.length ? experience.map((e, i) => ({
    period: e.duration ?? "—",
    role: e.title,
    org: e.company,
    desc: e.description ?? "",
    tag: i === 0 ? "ACTIVE" : "SHIPPED",
  })) : [
    { period: "2023 — NOW", role: "Principal AI Engineer", org: "Helix Labs", desc: "Leading inference platform powering 1.2B daily requests.", tag: "ACTIVE" },
    { period: "2020 — 2023", role: "Staff Systems Engineer", org: "Nimbus Dynamics", desc: "Built sub-millisecond feature store and ML serving mesh.", tag: "SHIPPED" },
  ]

  return (
    <GlassPanel delay={0.3} className="h-full p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
          <Terminal className="size-4" />
        </span>
        <div>
          <h2 className="font-sans text-lg font-semibold tracking-tight">Experience Log</h2>
          <p className="font-mono text-xs text-muted-foreground">/ chronological data-stream</p>
        </div>
      </div>
      <div className="relative pl-6">
        <div className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-neon/60 via-white/15 to-transparent" />
        <div className="space-y-6">
          {log.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.12 }}
              className="relative"
            >
              <span className="absolute -left-[22px] top-1.5 flex size-3 items-center justify-center">
                <span className="size-2 rounded-full bg-neon shadow-[0_0_10px_oklch(0.7_0.23_305)]" />
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{entry.period}</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-neon">{entry.tag}</span>
              </div>
              <h3 className="mt-1 font-sans text-base font-medium text-foreground">
                {entry.role}{" "}<span className="text-muted-foreground">· {entry.org}</span>
              </h3>
              {entry.desc && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.desc}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </GlassPanel>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function FuturisticTemplateClient({ p, isPreview }: { p: PortfolioRow, isPreview?: boolean }) {
  const parts    = p.slug.split("-")
  const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Aria"
  const lastName  = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Vale"

  return (
    <div className="futuristic-root">
      <style>{FUTURISTIC_CSS}</style>
      <main className="relative min-h-screen w-full px-4 pb-20 pt-4 md:px-8">
        <SpatialBackground isPreview={isPreview} />
        <TopDock slug={p.slug} isPreview={isPreview} />
        <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-6">
          <HeroPanel p={p} />
          <StatsPanel experience={p.experience} skills={p.skills} />
          <div className="grid gap-6 lg:grid-cols-2">
            <TechStackPanel skills={p.skills} />
            <ExperiencePanel experience={p.experience} />
          </div>
          <footer className="mt-4 flex flex-col items-center justify-between gap-2 px-2 text-xs text-muted-foreground sm:flex-row">
            <span className="font-mono">© {new Date().getFullYear()} {firstName.toUpperCase()} {lastName.toUpperCase()} · SPATIAL OS v3.1</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-neon" />all systems nominal
            </span>
          </footer>
        </div>
      </main>
    </div>
  )
}
