"use client"

import { useState } from "react"
import { ArrowRight, ArrowUp, Send } from "lucide-react"
import Image from "next/image"

// ─── Types ──────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

// ─── Injected CSS ────────────────────────────────────────────────────────────
const CHIC_CSS = `
  .chic-root {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #f0e6ff 0%, #e6f2ff 50%, #e6f9ff 100%);
    min-height: 100vh;
    color: #1a1a2e;
  }
  .chic-root .glassmorphism {
    backdrop-filter: blur(16px);
    background: rgba(255,255,255,0.4);
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px rgba(99,102,241,0.1);
  }
  .chic-root .glass-card {
    backdrop-filter: blur(12px);
    background: rgba(255,255,255,0.3);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: box-shadow 0.3s;
  }
  .chic-root .glass-card:hover { box-shadow: 0 8px 24px rgba(99,102,241,0.2); }
  @keyframes pulse-chic { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .chic-pulse { animation: pulse-chic 2s ease-in-out infinite; }
`

// ─── Header ─────────────────────────────────────────────────────────────────
function ChicHeader({ name }: { name: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = [{ label: "Work", href: "#work" }, { label: "Skills", href: "#skills" }, { label: "Contact", href: "#contact" }]
  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold">
          <span style={{ background: "linear-gradient(to right, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {name.split(" ")[0] || "Tech"}
          </span>
          <span style={{ color: "#1a1a2e" }}>{name.split(" ").slice(1).join(" ") || "Portfolio"}</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <a key={item.label} href={item.href} style={{ color: "#1a1a2e", fontWeight: 500 }} className="hover:text-indigo-600 transition-colors">{item.label}</a>
          ))}
          <a href="#contact" className="px-6 py-2 rounded-full text-white font-semibold" style={{ background: "linear-gradient(to right, #6366f1, #8b5cf6)" }}>Hire Me</a>
        </div>
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>
      {isOpen && (
        <div className="glass-card m-4 rounded-xl md:hidden" style={{ background: "rgba(255,255,255,0.7)" }}>
          <div className="flex flex-col gap-4">
            {navItems.map(item => <a key={item.label} href={item.href} style={{ color: "#1a1a2e", fontWeight: 500 }} onClick={() => setIsOpen(false)}>{item.label}</a>)}
          </div>
        </div>
      )}
    </header>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function ChicHero({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full chic-pulse" style={{ background: "rgba(99,102,241,0.15)", filter: "blur(60px)" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full chic-pulse" style={{ background: "rgba(139,92,246,0.15)", filter: "blur(60px)", animationDelay: "1s" }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {p.profile_image && (
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/50 shadow-xl">
              <Image src={p.profile_image} alt={name} width={128} height={128} className="object-cover w-full h-full" />
            </div>
          </div>
        )}
        <div className="mb-8 inline-block">
          <div className="glassmorphism px-6 py-2">
            <span className="text-sm font-semibold text-indigo-600">{p.role || "Welcome to My Portfolio"}</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
          {name.split(" ").slice(0, 1).join("")}{" "}
          <span style={{ background: "linear-gradient(to right, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {name.split(" ").slice(1).join(" ")}
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto" style={{ color: "#475569" }}>
          {p.summary || "Cutting-edge technology meets minimalist design."}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="#work" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300" style={{ background: "linear-gradient(to right, #6366f1, #8b5cf6)" }}>
            View Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all duration-300 glassmorphism" style={{ color: "#1a1a2e" }}>
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Skills ─────────────────────────────────────────────────────────────────
function ChicSkills({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL"]
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "#1a1a2e" }}>Skills & Technologies</h2>
        <p className="text-lg mb-12" style={{ color: "#64748b" }}>Technologies I work with every day.</p>
        <div className="flex flex-wrap gap-3">
          {items.map(skill => (
            <span key={skill} className="glass-card text-sm font-semibold px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.5)", color: "#4f46e5" }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Experience ──────────────────────────────────────────────────────────────
function ChicExperience({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [{ title: "Software Engineer", company: "Acme Corp", duration: "2022–Present", description: "Built scalable web applications." }]
  return (
    <section id="work" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "#1a1a2e" }}>Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {items.map((exp, i) => (
            <div key={i} className="glass-card">
              <h3 className="text-xl font-bold mb-1" style={{ color: "#1a1a2e" }}>{exp.title}</h3>
              <p className="font-semibold mb-1" style={{ color: "#6366f1" }}>{exp.company}</p>
              {exp.duration && <p className="text-sm mb-3" style={{ color: "#64748b" }}>{exp.duration}</p>}
              {exp.description && <p style={{ color: "#475569" }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function ChicContact({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const emailDisplay = p.email || `hello@${p.slug}.dev`
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "#1a1a2e" }}>Let&apos;s Connect</h2>
        <p className="text-lg mb-12" style={{ color: "#64748b" }}>Have a project in mind? I&apos;d love to hear about it.</p>
        <div className="glass-card p-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Send className="w-6 h-6 text-indigo-600" />
            <a href={`mailto:${emailDisplay}`} className="text-xl font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">{emailDisplay}</a>
          </div>
        </div>
        <footer className="mt-16 border-t border-white/20 pt-8 text-center" style={{ color: "#64748b", fontSize: "0.875rem" }}>
          © {new Date().getFullYear()} {name}. Crafted with innovation.
        </footer>
      </div>
    </section>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function ChicTechTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  return (
    <div className="chic-root">
      <style>{CHIC_CSS}</style>
      {!isPreview && <ChicHeader name={name} />}
      <ChicHero p={p} />
      <ChicSkills skills={p.skills} />
      <ChicExperience experience={p.experience} />
      <ChicContact p={p} />
    </div>
  )
}
