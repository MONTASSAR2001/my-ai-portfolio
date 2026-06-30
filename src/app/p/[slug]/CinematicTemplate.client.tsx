"use client"

import Image from "next/image"

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; summary?: string; skills?: string[]
  experience?: ExpItem[]; profile_image?: string | null
}

// ─── Injected CSS (v0 globals: animate-marquee, animate-pulse-dot) ─────────────
const CINEMATIC_CSS = `
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .animate-marquee { animation: marquee 40s linear infinite; }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
    50%       { opacity: 0.6; box-shadow: 0 0 0 6px rgba(16,185,129,0); }
  }
  .animate-pulse-dot { animation: pulse-dot 3s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) { .animate-marquee, .animate-pulse-dot { animation: none; } }
`

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ slug, isPreview }: { slug: string, isPreview?: boolean }) {
  const initials = slug.split("-").map(w => w[0]?.toUpperCase() ?? "").join("—").slice(0, 3)
  return (
    <header className={`${isPreview ? "absolute" : "fixed"} inset-x-0 top-0 z-50`}>
      <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl md:mx-6 lg:mx-auto">
        <a href="#" className="font-mono text-sm font-semibold tracking-widest text-white">
          {initials}
        </a>
        <div className="hidden items-center gap-8 sm:flex">
          {[["Work", "#work"], ["Skills", "#skills"], ["Contact", "#contact"]].map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-white/60 transition-colors hover:text-white">
              {label}
            </a>
          ))}
        </div>
        <a href="#contact" className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/20">
          Resume
        </a>
      </nav>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ p }: { p: PortfolioRow }) {
  const parts = p.slug.split("-")
  const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Kael"
  const lastName  = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Voss"

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 md:px-12 lg:px-20">
      {/* Ambient grid / vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(67,56,202,0.08), transparent 60%)" }}
      />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: typography */}
        <div className="order-2 lg:order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-xl">
            <span className="animate-pulse-dot size-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs tracking-widest text-white/60">AVAILABLE FOR {new Date().getFullYear()}</span>
          </div>
          <h1 className="text-balance text-6xl font-bold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
            {firstName}
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-white to-emerald-300 bg-clip-text text-transparent">
              {lastName}
            </span>
          </h1>
          <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-white/50">
            {p.summary || "Engineer architecting ambitious systems at the edge of research and product."}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#work" className="rounded-full bg-white px-7 py-3 text-sm font-medium text-[#05050A] transition-transform hover:scale-[1.03]">
              View Work
            </a>
            <a href="#contact" className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white/80 backdrop-blur-xl transition-colors hover:bg-white/10">
              Get in touch
            </a>
          </div>
        </div>

        {/* Right: avatar with aura */}
        <div className="relative order-1 flex items-center justify-center lg:order-2">
          {/* Massive blurred radial aura */}
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[120%] max-w-[640px] rounded-full opacity-70 blur-[120px]"
            style={{ background: "radial-gradient(circle at 35% 35%, #4338ca 0%, transparent 55%), radial-gradient(circle at 70% 70%, #10b981 0%, transparent 55%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[80%] max-w-[440px] rounded-full opacity-60 blur-[80px]"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)" }}
          />
          <div className="relative aspect-square w-64 overflow-hidden rounded-full border border-white/10 shadow-2xl sm:w-80 lg:w-96">
            {p.profile_image ? (
              <Image src={p.profile_image} alt={`Portrait of ${firstName} ${lastName}`} fill priority sizes="(max-width:1024px) 320px, 384px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/5 text-8xl font-black text-white/10">
                {firstName.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-white/30">
        SCROLL TO EXPLORE
      </div>
    </section>
  )
}

// ─── Skills Marquee ───────────────────────────────────────────────────────────
function SkillsMarquee({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["TypeScript", "React", "Next.js", "Node.js", "GraphQL", "PostgreSQL", "Docker", "Kubernetes", "Python", "Rust"]

  function Pill({ label }: { label: string }) {
    return (
      <li className="group relative flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl transition-colors hover:border-emerald-400/40">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]" />
        <span className="whitespace-nowrap text-sm font-medium text-white/80">{label}</span>
      </li>
    )
  }

  return (
    <section id="skills" className="relative py-24" aria-label="Skills">
      <div className="mx-auto mb-12 max-w-7xl px-6 md:px-12 lg:px-20">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400/80">/ CAPABILITIES</p>
      </div>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="animate-marquee flex shrink-0 gap-4 pr-4">
          {items.map(s => <Pill key={s} label={s} />)}
        </ul>
        <ul className="animate-marquee flex shrink-0 gap-4 pr-4" aria-hidden="true">
          {items.map(s => <Pill key={`dup-${s}`} label={s} />)}
        </ul>
      </div>
    </section>
  )
}

// ─── Experience Timeline ──────────────────────────────────────────────────────
function ExperienceTimeline({ experience }: { experience?: ExpItem[] }) {
  const entries = experience?.length ? experience.map(e => ({
    year: e.duration?.split(/[–—-]/)[0]?.trim() ?? "—",
    role: e.title,
    company: e.company,
    detail: e.description ?? "",
  })) : [
    { year: "2024", role: "Principal Engineer", company: "Helix Labs", detail: "Leading autonomous systems deployed at planetary scale." },
    { year: "2022", role: "Senior Engineer", company: "Nebula AI", detail: "Designed low-latency inference infrastructure serving 4B+ daily requests." },
  ]

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-20" aria-label="Experience">
      <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400/80">/ TRAJECTORY</p>
      <h2 className="mb-16 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">Experience</h2>
      <ol className="relative ml-2">
        {/* vertical line */}
        <div aria-hidden="true" className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-indigo-500/40 via-white/10 to-transparent" />
        {entries.map((item, i) => (
          <li key={i} className="relative grid grid-cols-1 gap-2 pb-14 pl-8 sm:grid-cols-[120px_1fr] sm:gap-8">
            {/* glowing dot */}
            <span aria-hidden="true" className="animate-pulse-dot absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(16,185,129,0.6)]" />
            <span className="font-mono text-sm text-white/40">{item.year}</span>
            <div>
              <h3 className="text-xl font-medium text-white">
                {item.role}{" "}
                <span className="text-white/40">— {item.company}</span>
              </h3>
              {item.detail && <p className="mt-2 max-w-xl text-pretty leading-relaxed text-white/50">{item.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ p }: { p: PortfolioRow }) {
  const parts = p.slug.split("-")
  const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Kael"
  const lastName  = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Voss"
  const fullName  = `${firstName} ${lastName}`

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32 text-center md:px-12 lg:px-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[60%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[140px]"
        style={{ background: "radial-gradient(circle, #4338ca 0%, transparent 55%), radial-gradient(circle at 70% 60%, #10b981 0%, transparent 55%)" }}
      />
      <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400/80">/ LET&apos;S BUILD</p>
      <h2 className="mx-auto max-w-3xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
        Building the future, one commit at a time.
      </h2>
      <a
        href={`mailto:hello@${p.slug}.dev`}
        className="mt-12 inline-block rounded-full bg-white px-8 py-4 text-sm font-medium text-[#05050A] transition-transform hover:scale-[1.03]"
      >
        hello@{p.slug}.dev
      </a>
      <footer className="mt-28 border-t border-white/10 pt-8 font-mono text-xs tracking-widest text-white/30">
        © {new Date().getFullYear()} {fullName.toUpperCase()} — DESIGNED IN THE DARK
      </footer>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function CinematicTemplateClient({ p, isPreview }: { p: PortfolioRow, isPreview?: boolean }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05050A] text-white">
      <style>{CINEMATIC_CSS}</style>
      {/* global ambient glow top */}
      <div
        aria-hidden="true"
        className={`pointer-events-none ${isPreview ? "absolute" : "fixed"} inset-x-0 top-0 -z-10 h-[60vh] opacity-50`}
        style={{ background: "radial-gradient(60% 60% at 70% 0%, rgba(67,56,202,0.18), transparent 70%)" }}
      />
      <Nav slug={p.slug} isPreview={isPreview} />
      <Hero p={p} />
      <SkillsMarquee skills={p.skills} />
      <ExperienceTimeline experience={p.experience} />
      <Contact p={p} />
    </main>
  )
}
