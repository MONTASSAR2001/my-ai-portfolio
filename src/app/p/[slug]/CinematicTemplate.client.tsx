"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

import FluidMeshBackground from "../../../components/FluidMeshBackground"
import CommandPalette from "../../../components/CommandPalette"
import TimeAwareGreeting from "../../../components/TimeAwareGreeting"
import TLDRToggle from "../../../components/TLDRToggle"
import ChameleonProjectCard from "../../../components/ChameleonProjectCard"

// ─── Types ──────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CINEMATIC_CSS = `
  .cinematic-root {
    font-family: 'Inter', sans-serif;
    background-color: #000000;
    color: #ffffff;
    min-height: 100vh;
  }
  .cinematic-serif {
    font-family: 'Playfair Display', 'Georgia', serif;
  }
  .slow-pan {
    animation: panImage 40s linear infinite alternate;
  }
  @keyframes panImage {
    0% { transform: scale(1.1) translate(0, 0); }
    100% { transform: scale(1.3) translate(-2%, -2%); }
  }
`

const fadeUpSlow: any = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
}

export default function CinematicTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const [isTldr, setIsTldr] = useState(false)
  const { scrollY } = useScroll()
  const yHero = useTransform(scrollY, [0, 1000], [0, 300])
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0])

  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const email = p.email || `hello@${p.slug}.dev`
  
  const summaryText = p.summary || "Crafting digital experiences with dramatic precision and uncompromising quality."
  const tldrSummary = summaryText.split(".")[0] + "."

  const defaultExperience = [
    { title: "Director of Engineering", company: "Aperture Science", duration: "2020 - Present", description: "Directed the complete overhaul of legacy systems into a modern, highly concurrent microservices architecture." },
    { title: "Lead Architect", company: "Massive Dynamic", duration: "2015 - 2020", description: "Architected global content delivery pipelines handling petabytes of telemetry." }
  ]
  const experienceItems = p.experience?.length ? p.experience : defaultExperience

  // TLDR Logic: Shorten descriptions if TLDR is active
  const displayExperience = isTldr 
    ? experienceItems.map(exp => ({
        ...exp,
        description: exp.description ? `— ${exp.description.split(".")[0]}.` : ""
      }))
    : experienceItems

  return (
    <div className="cinematic-root relative selection:bg-white/30 selection:text-white">
      <style>{CINEMATIC_CSS}</style>
      
      {/* 1. Fluid Mesh Background - opacity dropped and blend-mode shifted to fit cinematic darkness */}
      <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <FluidMeshBackground />
      </div>

      {/* 2. Command Palette (Hidden in preview so it doesn't hijack CMD+K) */}
      {!isPreview && <CommandPalette />}

      {/* Navigation Header */}
      <motion.header 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
        className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 px-8 md:px-12 py-8 flex items-center justify-between mix-blend-difference`}
      >
        <span className="cinematic-serif text-2xl font-bold tracking-widest uppercase text-white">{name.split(" ")[0]}</span>
        
        {/* 4. TLDR Toggle in header */}
        <div className="hidden sm:block opacity-80 hover:opacity-100 transition-opacity">
          <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
        </div>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section with Parallax */}
        <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0 pointer-events-none">
            {p.profile_image ? (
              <Image src={p.profile_image} alt={name} layout="fill" objectFit="cover" className="slow-pan opacity-30 brightness-75 grayscale" />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-[#111] to-[#000]" />
            )}
            <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black via-transparent to-black" />
          </motion.div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col items-center text-center mt-20">
            {/* 3. Time Aware Greeting */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 0.5 }} className="mb-12">
              <TimeAwareGreeting />
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-8 max-w-4xl">
              <motion.h1 variants={fadeUpSlow} className="cinematic-serif text-6xl md:text-8xl lg:text-[7rem] leading-none tracking-tight">
                {name}
              </motion.h1>
              <motion.div variants={fadeUpSlow} className="h-[1px] w-32 bg-white/30 mx-auto" />
              <motion.p variants={fadeUpSlow} className="text-xl md:text-3xl font-light text-gray-300 tracking-wide uppercase">
                {p.role || "Director & Engineer"}
              </motion.p>
              <motion.p variants={fadeUpSlow} className="text-lg md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed italic cinematic-serif">
                "{isTldr ? tldrSummary : summaryText}"
              </motion.p>
              
              {/* Mobile TLDR Fallback */}
              <motion.div variants={fadeUpSlow} className="sm:hidden pt-8">
                <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-8 max-w-5xl mx-auto bg-transparent relative">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUpSlow} className="mb-24 text-center">
            <h2 className="cinematic-serif text-4xl md:text-6xl mb-6 tracking-wide">Selected Works</h2>
            <div className="h-[1px] w-24 bg-white/20 mx-auto" />
            {isTldr && <p className="mt-8 text-xs text-amber-500 font-bold tracking-[0.3em] uppercase">Quick Scan Mode</p>}
          </motion.div>

          <div className="space-y-12">
            {/* 5. Chameleon Project Card */}
            {displayExperience.map((exp, i) => (
              <ChameleonProjectCard key={i} exp={exp} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-8 max-w-6xl mx-auto bg-black/40 backdrop-blur-sm">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUpSlow} className="mb-24 text-center">
            <h2 className="cinematic-serif text-4xl md:text-6xl mb-6 tracking-wide">Capabilities</h2>
            <div className="h-[1px] w-24 bg-white/20 mx-auto" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="flex flex-wrap justify-center gap-6 md:gap-12 max-w-4xl mx-auto">
            {(p.skills?.length ? p.skills : ["Cinematography", "Direction", "Visual Effects", "Sound Design", "Editing"]).map((skill, i) => (
              <motion.div key={i} variants={fadeUpSlow}>
                <span className="text-xl md:text-3xl text-gray-500 hover:text-white transition-colors duration-1000 font-light tracking-widest uppercase">
                  {skill}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-8 max-w-4xl mx-auto text-center relative bg-transparent">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUpSlow} className="space-y-16">
            <h2 className="cinematic-serif text-5xl md:text-7xl">Get in touch</h2>
            <div className="h-[1px] w-32 bg-white/20 mx-auto" />
            <a href={`mailto:${email}`} className="inline-block text-3xl md:text-5xl text-gray-400 hover:text-white transition-colors duration-1000 tracking-wide">
              {email}
            </a>
          </motion.div>

          <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 3, delay: 1 }} viewport={{ once: true }} className="mt-40 text-xs tracking-[0.3em] text-gray-600 uppercase">
            © {new Date().getFullYear()} {name}. End of reel.
          </motion.footer>
        </section>
      </main>
    </div>
  )
}
