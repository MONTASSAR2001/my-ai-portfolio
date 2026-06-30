"use client"

interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

const ELEGANT_CSS = `
  .elegant-root {
    font-family: 'Inter', 'Courier New', monospace;
    background: #0f0f0f;
    color: #ffffff;
    --accent: #00ff88;
    --accent-dim: rgba(0,255,136,0.1);
    --card-bg: #1a1a1a;
    --border: #2a2a2a;
    --muted: #a0a0a0;
  }
  .elegant-root .tech-card {
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 1.5rem;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .elegant-root .tech-card:hover {
    border-color: rgba(0,255,136,0.4);
    box-shadow: 0 0 15px rgba(0,255,136,0.1);
  }
  .elegant-root .accent { color: #00ff88; }
  @keyframes bounce-arrow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
  .elegant-bounce { animation: bounce-arrow 1.5s ease-in-out infinite; }
`

function ElegantHeader({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const firstName = name.split(" ")[0] || "Dev"
  const lastName = name.split(" ").slice(1).join(" ") || ""
  return (
    <header style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "5rem 1rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(0deg,transparent 24%,rgba(0,255,136,.05) 25%,rgba(0,255,136,.05) 26%,transparent 27%,transparent 74%,rgba(0,255,136,.05) 75%,rgba(0,255,136,.05) 76%,transparent 77%,transparent),linear-gradient(90deg,transparent 24%,rgba(0,255,136,.05) 25%,rgba(0,255,136,.05) 26%,transparent 27%,transparent 74%,rgba(0,255,136,.05) 75%,rgba(0,255,136,.05) 76%,transparent 77%,transparent)", backgroundSize: "50px 50px" }} />
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 768 }}>
        <div style={{ display: "inline-block", marginBottom: 24 }}>
          <div style={{ padding: "0.5rem 1rem", border: "1px solid rgba(0,255,136,0.4)", borderRadius: 9999, color: "#00ff88", fontSize: "0.875rem", fontFamily: "monospace" }}>
            &lt; Developer Portfolio /&gt;
          </div>
        </div>
        <h1 style={{ fontSize: "clamp(3rem,8vw,5rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          {firstName}{" "}<span className="accent">{lastName}</span>
        </h1>
        {p.role && <p style={{ fontSize: "1.1rem", color: "#a0a0a0", marginBottom: 16, fontFamily: "monospace" }}>{p.role}</p>}
        <p style={{ fontSize: "1.1rem", color: "#a0a0a0", marginBottom: 48, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 48px" }}>
          {p.summary || "Full-stack engineer crafting elegant solutions at the intersection of technology and design."}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          <button style={{ padding: "0.75rem 2rem", background: "#00ff88", color: "#0f0f0f", borderRadius: 8, fontWeight: 700, border: "none", cursor: "pointer", fontSize: "1rem" }}>View My Work</button>
          <button style={{ padding: "0.75rem 2rem", border: "1px solid rgba(0,255,136,0.4)", color: "#00ff88", borderRadius: 8, fontWeight: 700, background: "transparent", cursor: "pointer", fontSize: "1rem" }}>Get In Touch</button>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)" }} className="elegant-bounce">
        <svg width={24} height={24} fill="none" stroke="rgba(0,255,136,0.5)" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </header>
  )
}

function ElegantTechStack({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS", "Next.js", "GraphQL"]
  return (
    <section style={{ padding: "6rem 1rem", maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 48, color: "#fff" }}>Technical Stack</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12 }}>
        {items.map((skill, i) => (
          <div key={i} className="tech-card" style={{ textAlign: "center", cursor: "default" }}>
            <span style={{ color: "#fff", fontWeight: 500, fontSize: "0.95rem" }}>{skill}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 48, paddingTop: 48, borderTop: "1px solid #2a2a2a" }}>
        <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00ff88", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 24 }}>Core Competencies</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Full-Stack Development", "System Design", "Performance Optimization", "RESTful APIs", "Database Architecture", "CI/CD Pipelines"].map(c => (
            <span key={c} style={{ padding: "0.5rem 1rem", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 9999, fontSize: "0.875rem", color: "#fff" }}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ElegantTimeline({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [{ title: "Senior Software Engineer", company: "Tech Corp", duration: "2022–Present", description: "Built scalable distributed systems." }]
  return (
    <section style={{ padding: "6rem 1rem", maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 48, color: "#fff" }}>Experience Timeline</h2>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #00ff88, rgba(0,255,136,0.1))", opacity: 0.3 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {items.map((exp, i) => (
            <div key={i} style={{ position: "relative", paddingLeft: 48 }}>
              <div style={{ position: "absolute", left: 0, top: 6, width: 12, height: 12, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 10px rgba(0,255,136,0.6)" }} />
              <div className="tech-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>{exp.title}</h3>
                  {exp.duration && <time style={{ fontSize: "0.875rem", color: "#a0a0a0", fontFamily: "monospace", whiteSpace: "nowrap", marginLeft: 16 }}>{exp.duration}</time>}
                </div>
                <p style={{ color: "#00ff88", marginBottom: 8, fontSize: "0.95rem" }}>{exp.company}</p>
                {exp.description && <p style={{ color: "#a0a0a0", lineHeight: 1.7 }}>{exp.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ElegantFooter({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const email = p.email || `hello@${p.slug}.dev`
  return (
    <footer id="contact" style={{ padding: "6rem 1rem", borderTop: "1px solid #2a2a2a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 48, color: "#fff" }}>Let&apos;s Work Together</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 64 }}>
          <div>
            <p style={{ color: "#a0a0a0", lineHeight: 1.7, marginBottom: 24 }}>I&apos;m always interested in hearing about new projects and opportunities.</p>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>Get in touch:</p>
              <a href={`mailto:${email}`} style={{ color: "#00ff88", fontFamily: "monospace", fontSize: "1.1rem", textDecoration: "none" }}>{email}</a>
            </div>
          </div>
          <div className="tech-card">
            <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00ff88", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Quick Links</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Projects", "Resume", "GitHub", "LinkedIn"].map(link => (
                <a key={link} href="#" style={{ color: "#a0a0a0", textDecoration: "none", fontSize: "0.875rem" }}>→ {link}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 48, borderTop: "1px solid #2a2a2a", textAlign: "center", color: "#a0a0a0", fontSize: "0.875rem" }}>
          © {new Date().getFullYear()} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default function ElegantDeveloperTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  return (
    <div className="elegant-root" style={{ background: "#0f0f0f", color: "#fff", minHeight: "100vh" }}>
      <style>{ELEGANT_CSS}</style>
      <ElegantHeader p={p} />
      <ElegantTechStack skills={p.skills} />
      <ElegantTimeline experience={p.experience} />
      <ElegantFooter p={p} />
    </div>
  )
}
