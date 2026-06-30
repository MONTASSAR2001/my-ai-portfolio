"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CINEMATIC_CSS = `
  .cinematic-root {
    --background: #030303;
    --foreground: #f0f0f0;
    --muted: #888888;
    background-color: var(--background);
    color: var(--foreground);
    font-family: 'Inter', Helvetica, Arial, sans-serif;
    overflow-x: hidden;
  }
  .cinematic-root h1, .cinematic-root h2, .cinematic-root h3, .serif {
    font-family: 'Playfair Display', 'Georgia', serif;
  }
  .cinematic-gradient {
    background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
  }
  
  .slow-pan {
    animation: pan-image 40s ease-in-out infinite alternate;
  }
  
  @keyframes pan-image {
    0% { transform: scale(1.05) translate(0, 0); }
    100% { transform: scale(1.15) translate(-1%, -2%); }
  }
`

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.4, delayChildren: 0.2 } }
}

// ─── Components ───────────────────────────────────────────────────────────────
function CinematicNav({ name, isPreview }: { name: string; isPreview?: boolean }) {
  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      className={`z-50 ${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 flex items-center justify-between px-8 py-8 mix-blend-difference pointer-events-none`}
    >
      <span className="text-sm font-bold tracking-[0.3em] uppercase pointer-events-auto">{name}</span>
      <a href="#contact" className="text-xs tracking-[0.2em] uppercase border-b border-white/30 pb-1 hover:border-white transition-colors duration-500 pointer-events-auto">
        Contact
      </a>
    </motion.nav>
  )
}

function HeroSection({ p }: { p: PortfolioRow }) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleText = useTransform(scrollY, [0, 500], [1, 0.95]);

  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        {p.profile_image ? (
          <div className="relative w-full h-full">
            {/* Dramatic vignettes */}
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/50 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303]/50 z-10" />
            
            <img src={p.profile_image} alt={name} className="w-full h-full object-cover slow-pan opacity-60" />
          </div>
        ) : (
          <div className="w-full h-full cinematic-gradient opacity-40" />
        )}
      </motion.div>
      
      <motion.div 
        style={{ opacity: opacityText, scale: scaleText }}
        className="z-10 text-center px-4 max-w-5xl"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-white/50 uppercase tracking-[0.4em] text-xs md:text-sm mb-6 md:mb-10"
        >
          {p.role || "Creative Portfolio"}
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-8 text-white/90"
        >
          {name}
        </motion.h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 2, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  )
}

function SummarySection({ summary }: { summary?: string }) {
  return (
    <section className="py-40 px-6 md:px-16 max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
      <motion.div 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="serif text-3xl md:text-5xl leading-relaxed md:leading-snug text-center text-white/80 font-light">
          "{summary || "A passionate creative pushing the boundaries of art and technology to deliver unforgettable digital experiences."}"
        </h2>
      </motion.div>
    </section>
  )
}

function ExperienceSection({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [
    { title: "Art Director", company: "Studio X", duration: "2021 — Present", description: "Leading creative vision for global brands, crafting narratives that resonate on a deeply emotional level." },
    { title: "Senior Designer", company: "Agency Y", duration: "2018 — 2021", description: "Crafted award-winning digital campaigns that merged striking visuals with seamless interactivity." }
  ]

  return (
    <section className="py-40 px-6 md:px-16 max-w-6xl mx-auto border-t border-white/5 relative">
      <motion.div 
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} 
        className="mb-32 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white/90">Selected Works</h2>
        <p className="mt-6 text-white/40 tracking-[0.3em] uppercase text-xs">Experience & History</p>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-32"
      >
        {items.map((exp, i) => (
          <motion.div key={i} variants={fadeUp} className="group flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="md:w-1/3 shrink-0">
              <p className="text-xl md:text-2xl text-white/30 mb-3 serif italic tracking-wide">{exp.duration}</p>
              <h3 className="text-3xl md:text-4xl font-semibold text-white/70 group-hover:text-white transition-colors duration-1000">{exp.company}</h3>
            </div>
            <div className="md:w-2/3">
              <h4 className="text-2xl md:text-3xl mb-6 font-light text-white/80">{exp.title}</h4>
              {exp.description && (
                <p className="text-lg text-white/40 leading-relaxed max-w-2xl">{exp.description}</p>
              )}
              <div className="mt-12 overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="w-0 h-px bg-white group-hover:w-full transition-all duration-[1.5s] ease-out" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function SkillsSection({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["Direction", "Cinematography", "UI/UX", "Motion Graphics", "3D Rendering", "Visual Effects"]
  return (
    <section className="py-40 px-6 md:px-16 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="text-3xl md:text-5xl font-semibold text-center mb-24 text-white/80"
        >
          Expertise
        </motion.h2>
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-x-16 gap-y-12"
        >
          {items.map((skill, i) => (
            <motion.div key={i} variants={fadeUp} className="overflow-hidden">
              <motion.span 
                whileHover={{ scale: 1.05, color: "#fff" }}
                className="block text-2xl md:text-4xl font-light text-white/30 cursor-default transition-colors duration-700 serif italic"
              >
                {skill}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ContactSection({ p }: { p: PortfolioRow }) {
  const email = p.email || `hello@${p.slug}.dev`
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  
  return (
    <section id="contact" className="py-40 px-6 md:px-16 max-w-5xl mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter mb-10 text-white/90">Get in Touch</h2>
        <p className="text-lg text-white/40 mb-20 max-w-2xl mx-auto leading-relaxed">
          Available for freelance opportunities and select collaborations. Let's create something extraordinary together.
        </p>
        <motion.a 
          whileHover={{ scale: 1.05, color: "#fff", borderColor: "#fff" }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${email}`}
          className="inline-flex items-center gap-6 text-2xl md:text-4xl serif italic border-b border-white/20 pb-4 text-white/70 transition-all duration-700"
        >
          {email} <ArrowRight className="w-6 h-6 md:w-8 md:h-8 opacity-50" />
        </motion.a>
      </motion.div>
      
      <motion.footer 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }} viewport={{ once: true }}
        className="mt-40 text-[10px] text-white/20 uppercase tracking-[0.3em]"
      >
        © {new Date().getFullYear()} {name}. All rights reserved.
      </motion.footer>
    </section>
  )
}

export default function CinematicTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  return (
    <div className="cinematic-root selection:bg-white/20 selection:text-white">
      <style>{CINEMATIC_CSS}</style>
      <CinematicNav name={p.name || p.slug.split("-")[0]} isPreview={isPreview} />
      <main>
        <HeroSection p={p} />
        <SummarySection summary={p.summary} />
        <ExperienceSection experience={p.experience} />
        <SkillsSection skills={p.skills} />
        <ContactSection p={p} />
      </main>
    </div>
  )
}
