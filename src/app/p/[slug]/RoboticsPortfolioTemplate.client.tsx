"use client"

import { useState } from "react"

interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

const ROBOTICS_CSS = `
  .robo-root {
    font-family: 'Inter', sans-serif;
    background: oklch(0.1 0 0);
    color: oklch(0.92 0 0);
    --accent: oklch(0.85 0.08 265);
    --card: oklch(0.16 0 0);
    --border: oklch(0.2 0 0);
    --muted: oklch(0.65 0 0);
  }
  .robo-root .project-card {
    background: oklch(0.16 0 0);
    border: 1px solid oklch(0.2 0 0);
    border-radius: 8px;
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .robo-root .project-card:hover {
    border-color: oklch(0.85 0.08 265 / 0.5);
    box-shadow: 0 0 20px oklch(0.85 0.08 265 / 0.25);
  }
`

function RoboNav({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  return (
    <nav style={{ position: isPreview ? "absolute" : "fixed", top: 0, left: 0, right: 0, zIndex: 50, borderBottom: "1px solid oklch(0.2 0 0)", background: "oklch(0.1 0 0 / 0.85)", backdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "oklch(0.92 0 0)", textDecoration: "none" }}>
            <span style={{ color: "oklch(0.85 0.08 265)" }}>&lt;</span>{name.split(" ")[0] || "Dev"}<span style={{ color: "oklch(0.85 0.08 265)" }}>/&gt;</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["#projects", "#about", "#contact"].map(href => (
              <a key={href} href={href} style={{ fontSize: "0.875rem", fontWeight: 500, color: "oklch(0.65 0 0)", textDecoration: "none" }}>{href.slice(1).charAt(0).toUpperCase() + href.slice(2)}</a>
            ))}
            <button style={{ padding: "0.5rem 1rem", background: "oklch(0.85 0.08 265)", color: "oklch(0.1 0 0)", border: "none", borderRadius: 8, fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>Resume</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function RoboHero({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const defaultSkills = ["ROS", "Python", "C++", "TensorFlow", "PyTorch", "CUDA", "ARM", "FPGA"]
  const techItems = p.skills?.length ? p.skills.slice(0, 8) : defaultSkills
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 80, padding: "5rem 2rem 4rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, oklch(0.16 0 0) 0%, oklch(0.1 0 0) 50%, oklch(0.1 0 0) 100%)", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: "25%", left: "25%", width: 384, height: 384, background: "oklch(0.85 0.08 265)", opacity: 0.05, borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "25%", right: "25%", width: 384, height: 384, background: "oklch(0.85 0.08 265)", opacity: 0.03, borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 896, margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-block", padding: "0.5rem 1rem", borderRadius: 9999, border: "1px solid oklch(0.85 0.08 265 / 0.3)", background: "oklch(0.16 0 0 / 0.5)", backdropFilter: "blur(8px)", marginBottom: 24 }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "oklch(0.85 0.08 265)" }}>{p.role || "Robotics Engineer • AI Researcher"}</span>
          </div>
        </div>
        <h1 style={{ fontSize: "clamp(3rem,8vw,5rem)", fontWeight: 700, marginBottom: 24, lineHeight: 1.1 }}>
          {name.split(" ")[0] || "Engineering"}{" "}
          <span style={{ backgroundImage: "linear-gradient(to right, oklch(0.85 0.08 265), oklch(0.85 0.08 265 / 0.7))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {name.split(" ").slice(1).join(" ") || "Intelligent Systems"}
          </span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "oklch(0.65 0 0)", maxWidth: 640, margin: "0 auto 32px", lineHeight: 1.7 }}>
          {p.summary || "Designing and deploying cutting-edge autonomous systems, embedded robotics platforms, and AI-driven solutions."}
        </p>
        <div style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ padding: "0.75rem 2rem", background: "oklch(0.85 0.08 265)", color: "oklch(0.1 0 0)", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>View My Work</button>
          <button style={{ padding: "0.75rem 2rem", border: "1px solid oklch(0.85 0.08 265 / 0.5)", color: "oklch(0.85 0.08 265)", background: "transparent", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Get In Touch</button>
        </div>
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid oklch(0.2 0 0 / 0.5)" }}>
          <p style={{ fontSize: "0.875rem", color: "oklch(0.65 0 0)", marginBottom: 16 }}>Tech Stack</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {techItems.map(tech => (
              <span key={tech} style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 500, background: "oklch(0.16 0 0)", border: "1px solid oklch(0.2 0 0 / 0.5)", borderRadius: 9999, color: "oklch(0.65 0 0)" }}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RoboProjects({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [
    { title: "Autonomous Navigation System", company: "SLAM & Pathfinding", description: "Real-time SLAM and pathfinding algorithm for mobile robots." },
    { title: "Computer Vision Pipeline", company: "Deep Learning", description: "High-performance object detection using state-of-the-art models." },
  ]
  return (
    <section id="projects" style={{ padding: "6rem 2rem", background: "oklch(0.1 0 0)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 16 }}>Featured Projects</h2>
          <p style={{ color: "oklch(0.65 0 0)", fontSize: "1.1rem", maxWidth: 512 }}>Complex technical projects showcasing expertise in autonomous systems and AI implementation.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {items.map((item, i) => (
            <div key={i} className="project-card">
              <div style={{ height: 160, background: "linear-gradient(135deg, oklch(0.16 0 0), oklch(0.12 0 0))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "3rem" }}>🤖</span>
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "oklch(0.85 0.08 265)", marginBottom: 12 }}>{item.company}</p>
                {item.description && <p style={{ fontSize: "0.875rem", color: "oklch(0.65 0 0)", lineHeight: 1.6 }}>{item.description}</p>}
                {item.duration && <p style={{ fontSize: "0.75rem", color: "oklch(0.65 0 0)", marginTop: 8 }}>{item.duration}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RoboFooter({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const email = p.email || `hello@${p.slug}.dev`
  return (
    <footer id="contact" style={{ borderTop: "1px solid oklch(0.2 0 0 / 0.3)", background: "oklch(0.1 0 0)", padding: "3rem 2rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, marginBottom: 32 }}>
        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>About</h3>
          <p style={{ fontSize: "0.875rem", color: "oklch(0.65 0 0)", lineHeight: 1.6 }}>Passionate about building intelligent autonomous systems and pushing the boundaries of robotics.</p>
        </div>
        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {["Projects", "Research", "Blog", "Contact"].map(link => (
              <li key={link}><a href="#" style={{ fontSize: "0.875rem", color: "oklch(0.65 0 0)", textDecoration: "none" }}>{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Connect</h3>
          <a href={`mailto:${email}`} style={{ fontSize: "0.875rem", color: "oklch(0.85 0.08 265)", textDecoration: "none" }}>{email}</a>
        </div>
      </div>
      <div style={{ borderTop: "1px solid oklch(0.2 0 0 / 0.3)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "oklch(0.65 0 0)" }}>© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function RoboticsPortfolioTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  return (
    <div className="robo-root" style={{ background: "oklch(0.1 0 0)", color: "oklch(0.92 0 0)", minHeight: "100vh" }}>
      <style>{ROBOTICS_CSS}</style>
      {!isPreview && <RoboNav p={p} isPreview={isPreview} />}
      <RoboHero p={p} />
      <RoboProjects experience={p.experience} />
      <RoboFooter p={p} />
    </div>
  )
}
