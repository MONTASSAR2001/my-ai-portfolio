"use client"

import { useEffect, useState } from "react"

interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

const CORP_CSS = `
  .corp-root { font-family: 'Inter', sans-serif; background: #ffffff; color: #0f1928; }
  @keyframes corp-fadeup { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  .corp-fadeup { animation: corp-fadeup 0.8s cubic-bezier(0.4,0,0.2,1) forwards; }
`

function CorpNav({ name, isPreview }: { name: string; isPreview?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    if (isPreview) return
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [isPreview])
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  return (
    <nav style={{ position: isPreview ? "absolute" : "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? "#fff" : "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #d0d5dd", transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, background: "#0f1928", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>{name.charAt(0).toUpperCase()}</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0f1928" }}>{name}</span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {["about", "experience", "contact"].map(id => (
            <button key={id} onClick={() => scroll(id)} style={{ color: "#0f1928", background: "none", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "0.875rem", textTransform: "capitalize" }}>{id}</button>
          ))}
          <button onClick={() => scroll("contact")} style={{ background: "#0f1928", color: "#fff", border: "none", cursor: "pointer", padding: "0.5rem 1.25rem", borderRadius: 6, fontWeight: 600, fontSize: "0.875rem" }}>Contact</button>
        </div>
      </div>
    </nav>
  )
}

function CorpHero({ p }: { p: PortfolioRow }) {
  const [v, setV] = useState(false)
  useEffect(() => { setV(true) }, [])
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "#fff", paddingTop: 80, padding: "5rem 2rem 4rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div className={v ? "corp-fadeup" : ""} style={{ opacity: v ? undefined : 0 }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>{p.role || "Welcome"}</p>
          <h1 style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 700, color: "#0f1928", lineHeight: 1.15, marginBottom: 24 }}>{name}</h1>
          <p style={{ fontSize: "1.1rem", color: "#717885", lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}>
            {p.summary || "Passionate professional delivering enterprise-grade solutions that transform business outcomes."}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "#0f1928", color: "#fff", border: "none", cursor: "pointer", padding: "0.75rem 2rem", borderRadius: 6, fontWeight: 600, fontSize: "1rem" }}>View Work</button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "transparent", color: "#0f1928", border: "2px solid #0f1928", cursor: "pointer", padding: "0.75rem 2rem", borderRadius: 6, fontWeight: 600, fontSize: "1rem" }}>Contact</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, paddingTop: 48, marginTop: 48, borderTop: "1px solid #d0d5dd" }}>
            <div><div style={{ fontSize: "2.25rem", fontWeight: 700, color: "#0f1928" }}>{p.experience?.length ?? 0}+</div><div style={{ color: "#717885", marginTop: 4, fontSize: "0.875rem" }}>Roles Held</div></div>
            <div><div style={{ fontSize: "2.25rem", fontWeight: 700, color: "#0f1928" }}>{p.skills?.length ?? 0}+</div><div style={{ color: "#717885", marginTop: 4, fontSize: "0.875rem" }}>Technologies</div></div>
          </div>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(15,25,40,0.06), rgba(37,99,235,0.06))", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", height: 380 }}>
          <div style={{ textAlign: "center", color: "#0f1928" }}>
            <div style={{ fontSize: "5rem", marginBottom: 12 }}>⚡</div>
            <div style={{ fontWeight: 600 }}>{name}</div>
            <div style={{ color: "#717885", fontSize: "0.875rem", marginTop: 4 }}>{p.role || "Professional"}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CorpExperience({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [{ title: "Senior Engineer", company: "Tech Corp", duration: "2022–Present", description: "Led enterprise development." }]
  return (
    <section id="experience" style={{ padding: "5rem 2rem", background: "#f8f9fa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#0f1928", marginBottom: 48 }}>Professional Experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {items.map((exp, i) => (
            <div key={i} style={{ padding: 32, border: "1px solid #d0d5dd", borderRadius: 12, background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f1928" }}>{exp.title}</h3>
                  <p style={{ color: "#2563eb", fontWeight: 600, marginTop: 4 }}>{exp.company}</p>
                </div>
                {exp.duration && <span style={{ fontSize: "0.875rem", color: "#717885" }}>{exp.duration}</span>}
              </div>
              {exp.description && <p style={{ color: "#717885", lineHeight: 1.7, marginTop: 8 }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CorpSkills({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["AI", "React", "Python", "TypeScript", "AWS", "Docker"]
  return (
    <section id="skills" style={{ padding: "5rem 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#0f1928", marginBottom: 48 }}>Skills & Expertise</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {items.map((skill, i) => (
            <div key={i} style={{ padding: "10px 18px", border: "1px solid #d0d5dd", borderRadius: 8, background: "#f8f9fa", color: "#0f1928", fontWeight: 500 }}>{skill}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CorpContact({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const email = p.email || `hello@${p.slug}.dev`
  return (
    <>
      <section id="contact" style={{ padding: "5rem 2rem", background: "#f8f9fa", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb", letterSpacing: "0.15em", textTransform: "uppercase" }}>Get in Touch</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#0f1928", margin: "16px 0 24px" }}>Let&apos;s Talk</h2>
          <p style={{ color: "#717885", marginBottom: 40 }}>{p.summary || "Ready to start a new project? I'd love to hear from you."}</p>
          <a href={`mailto:${email}`} style={{ display: "inline-block", background: "#0f1928", color: "#fff", padding: "0.875rem 2.5rem", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>{email}</a>
        </div>
      </section>
      <footer style={{ background: "#0f1928", color: "#fff", padding: "3rem 2rem", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </footer>
    </>
  )
}

export default function CorporateAITemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  return (
    <div className="corp-root">
      <style>{CORP_CSS}</style>
      {!isPreview && <CorpNav name={name} isPreview={isPreview} />}
      <CorpHero p={p} />
      <CorpSkills skills={p.skills} />
      <CorpExperience experience={p.experience} />
      <CorpContact p={p} />
    </div>
  )
}
