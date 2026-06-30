"use client"

interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

const PROFESSIONAL_CSS = `
  .prof-root {
    font-family: 'Inter', sans-serif;
    background: oklch(0.98 0 0);
    color: oklch(0.12 0 0);
    --accent: oklch(0.55 0.18 200);
    --primary: oklch(0.15 0 0);
    --muted: oklch(0.45 0 0);
    --secondary: oklch(0.92 0 0);
    --border: oklch(0.92 0 0);
  }
`

function ProfHeader({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const firstName = name.split(" ")[0] || "Your"
  const lastName = name.split(" ").slice(1).join(" ") || "Name"
  return (
    <header style={{ position: isPreview ? "absolute" : "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "oklch(0.98 0 0)", borderBottom: "1px solid oklch(0.92 0 0)", padding: "1rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{firstName} {lastName}</span>
        <div style={{ display: "flex", gap: 24 }}>
          {["About", "Experience", "Skills", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "oklch(0.45 0 0)", textDecoration: "none", fontWeight: 500, fontSize: "0.875rem" }}>{item}</a>
          ))}
        </div>
      </div>
    </header>
  )
}

function ProfHero({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const firstName = name.split(" ")[0] || "Your"
  const lastName = name.split(" ").slice(1).join(" ") || "Name"
  return (
    <section id="about" style={{ paddingTop: 128, paddingBottom: 80, padding: "8rem 1.5rem 5rem", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48 }}>
        <div style={{ borderBottom: "4px solid oklch(0.55 0.18 200)", paddingBottom: 32 }}>
          <h1 style={{ fontSize: "clamp(3rem,6vw,4rem)", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: 16, lineHeight: 1 }}>
            {firstName}<br />{lastName}
          </h1>
          <p style={{ color: "oklch(0.55 0.18 200)", fontWeight: 500, fontSize: "1rem", letterSpacing: "0.05em", marginBottom: 24 }}>{p.role || "Software Engineer"}</p>
          <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "oklch(0.45 0 0)", fontWeight: 600 }}>Engineer</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "oklch(0.2 0 0)" }}>
            {p.summary || "A dedicated professional with a passion for designing and implementing innovative solutions. My expertise spans various domains with a focus on delivering high-quality results."}
          </p>
          <div style={{ display: "flex", gap: 24, fontSize: "0.875rem" }}>
            <a href={`mailto:${p.email || `hello@${p.slug}.dev`}`} style={{ color: "oklch(0.55 0.18 200)", fontWeight: 500, textDecoration: "none" }}>Email</a>
            <a href="#" style={{ color: "oklch(0.55 0.18 200)", fontWeight: 500, textDecoration: "none" }}>LinkedIn</a>
            <a href="#" style={{ color: "oklch(0.55 0.18 200)", fontWeight: 500, textDecoration: "none" }}>GitHub</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfSkills({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["TypeScript", "React", "Python", "PostgreSQL", "Docker", "AWS", "Node.js"]
  const categories = [
    { category: "Technical Skills", skills: items.slice(0, Math.ceil(items.length / 2)) },
    { category: "Tools & Frameworks", skills: items.slice(Math.ceil(items.length / 2)) },
  ]
  return (
    <section id="skills" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        {categories.map((cat, ci) => (
          <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ borderBottom: "4px solid oklch(0.55 0.18 200)", paddingBottom: 24 }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{cat.category}</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {cat.skills.map((skill, i) => (
                  <div key={i} style={{ background: "oklch(0.92 0 0)", color: "oklch(0.12 0 0)", padding: "12px 16px", fontSize: "0.875rem", fontWeight: 500 }}>{skill}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProfExperience({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [{ title: "Senior Engineer", company: "Tech Corp", duration: "2022–Present", description: "Led development of next-generation systems." }]
  return (
    <section id="experience" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16 }}>Professional Experience</h2>
          <div style={{ width: 64, height: 4, background: "oklch(0.55 0.18 200)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {items.map((exp, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 32, paddingBottom: 48, borderBottom: "1px solid oklch(0.92 0 0)" }}>
              <div>
                <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, color: "oklch(0.55 0.18 200)", marginBottom: 8 }}>Duration</p>
                <p style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: 16 }}>{exp.duration || "—"}</p>
              </div>
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 4 }}>{exp.title}</h3>
                <p style={{ color: "oklch(0.55 0.18 200)", fontWeight: 500, fontSize: "1.1rem", marginBottom: 12 }}>{exp.company}</p>
                {exp.description && (
                  <p style={{ color: "oklch(0.2 0 0)", lineHeight: 1.7 }}>{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProfFooter({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const email = p.email || `hello@${p.slug}.dev`
  return (
    <footer id="contact" style={{ background: "oklch(0.15 0 0)", color: "oklch(0.98 0 0)", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, marginBottom: 64 }}>
        <div>
          <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, color: "oklch(0.55 0.18 200)", marginBottom: 12 }}>Get in Touch</p>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>Let&apos;s Connect</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>I&apos;m always interested in hearing about new projects and opportunities.</p>
        </div>
        <div>
          <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, color: "oklch(0.55 0.18 200)", marginBottom: 24 }}>Professional</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href={`mailto:${email}`} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 500 }}>Email</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 500 }}>GitHub</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 500 }}>LinkedIn</a>
          </div>
        </div>
        <div>
          <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, color: "oklch(0.55 0.18 200)", marginBottom: 12 }}>Quick Contact</p>
          <a href={`mailto:${email}`} style={{ display: "block", background: "oklch(0.55 0.18 200)", color: "#fff", padding: "0.75rem 1.5rem", textAlign: "center", textDecoration: "none", fontWeight: 600, marginTop: 12 }}>
            Send Message
          </a>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.875rem" }}>Privacy Policy</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.875rem" }}>Terms of Use</a>
        </div>
      </div>
    </footer>
  )
}

export default function ProfessionalPortfolioTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  return (
    <div className="prof-root" style={{ background: "oklch(0.98 0 0)", color: "oklch(0.12 0 0)", minHeight: "100vh" }}>
      <style>{PROFESSIONAL_CSS}</style>
      {!isPreview && <ProfHeader p={p} isPreview={isPreview} />}
      <ProfHero p={p} />
      <ProfSkills skills={p.skills} />
      <ProfExperience experience={p.experience} />
      <ProfFooter p={p} />
    </div>
  )
}
