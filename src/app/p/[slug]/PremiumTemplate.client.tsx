"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

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
const PREMIUM_CSS = `
  .premium-root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #111111;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .premium-divider {
    height: 1px;
    width: 100%;
    background-color: rgba(0,0,0,0.06);
  }
  .premium-link {
    position: relative;
    display: inline-block;
    text-decoration: none;
  }
  .premium-link::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1.5px;
    bottom: 0;
    left: 0;
    background-color: #111;
    transform-origin: bottom right;
    transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  }
  .premium-link:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const smoothEase: any = [0.22, 1, 0.36, 1]

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: smoothEase } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
}

export default function PremiumTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const [isTldr, setIsTldr] = useState(false)
  
  const name = p.name || p.slug.split("-")[0]
  const email = p.email || `hello@${p.slug}.dev`
  
  const defaultSkills = ["Design Systems", "Frontend Architecture", "React & Next.js", "TypeScript", "User Experience", "Performance Optimization"]
  const skills = p.skills?.length ? p.skills : defaultSkills

  const defaultExperience = [
    { title: "Senior Designer", company: "Studio One", duration: "2021 — Present", description: "Leading digital product design and establishing comprehensive design systems across multiple enterprise products." },
    { title: "Product Engineer", company: "Tech Corp", duration: "2018 — 2021", description: "Developed scalable front-end architectures for global enterprise clients, improving performance by 40%." }
  ]
  const experienceItems = p.experience?.length ? p.experience : defaultExperience

  // TLDR Logic: Shorten descriptions if TLDR is active
  const displayExperience = isTldr 
    ? experienceItems.map(exp => ({
        ...exp,
        description: exp.description ? `— ${exp.description.split(".")[0]}.` : ""
      }))
    : experienceItems

  const summaryText = p.summary || "A dedicated professional with a passion for designing and implementing innovative, high-fidelity solutions."
  const tldrSummary = summaryText.split(".")[0] + "."

  return (
    <div className="premium-root relative selection:bg-black selection:text-white z-0">
      <style>{PREMIUM_CSS}</style>
      
      {/* 1. Fluid Mesh Background */}
      <FluidMeshBackground />
      
      {/* 2. Command Palette (Hidden in preview iframe so it doesn't hijack keystrokes) */}
      {!isPreview && <CommandPalette />}

      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: smoothEase }}
        className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-black/5`}
      >
        <div className="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
          <span className="font-semibold tracking-tight text-xl">{name}</span>
          <div className="flex items-center gap-8">
            
            {/* 3. TLDR Toggle (Desktop) */}
            <div className="hidden sm:block">
              <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
            </div>
            
            <nav className="hidden md:flex items-center gap-10 text-[13px] font-medium tracking-wide text-[#888] uppercase">
              {['Profile', 'Expertise', 'Experience'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-black transition-colors duration-500">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 pt-24">
        <section id="profile" className="pt-24 pb-24 px-8 max-w-6xl mx-auto min-h-[85vh] flex flex-col justify-center">
          
          {/* 4. Time Aware Greeting */}
          <div className="mb-12">
            <TimeAwareGreeting />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-16 md:gap-24">
            {p.profile_image && (
              <motion.div 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, ease: smoothEase }}
                className="shrink-0"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full bg-white/50 shadow-2xl backdrop-blur-md">
                  <Image 
                    src={p.profile_image} 
                    alt={name} 
                    width={256} 
                    height={256} 
                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-[1.5s] ease-out" 
                  />
                </div>
              </motion.div>
            )}
            
            <div className="flex-1">
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-8">
                <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
                  {p.role || "Professional Portfolio"}
                </motion.p>
                <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.05] text-black">
                  {name}
                </motion.h1>
                <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                  {isTldr ? tldrSummary : summaryText}
                </motion.p>
                
                {/* 3. TLDR Toggle (Mobile Fallback) */}
                <motion.div variants={fadeUp} className="sm:hidden pt-4">
                   <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="expertise" className="py-24 px-8 max-w-6xl mx-auto">
          <div className="premium-divider mb-32" />
          <div className="flex flex-col md:flex-row gap-12 md:gap-32">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:w-1/4">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">Expertise</h2>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-16">
              {skills.map((skill, i) => (
                <motion.div key={i} variants={fadeUp} className="group cursor-default">
                  <span className="text-2xl font-light text-gray-500 group-hover:text-black transition-colors duration-700">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="experience" className="py-24 px-8 max-w-6xl mx-auto">
          <div className="premium-divider mb-32" />
          <div className="flex flex-col md:flex-row gap-12 md:gap-32">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:w-1/4">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">Experience</h2>
              {isTldr && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-[10px] text-amber-600 font-bold tracking-widest uppercase">
                  Quick Scan Active
                </motion.p>
              )}
            </motion.div>
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="md:w-3/4 space-y-8">
              {displayExperience.map((exp, i) => (
                /* 5. Chameleon Project Card */
                <ChameleonProjectCard key={i} exp={exp} />
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contact" className="py-24 px-8 max-w-6xl mx-auto">
          <div className="premium-divider mb-32" />
          <div className="flex flex-col md:flex-row gap-12 md:gap-32 pb-32">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:w-1/4">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">Contact</h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:w-3/4">
              <p className="text-3xl font-light text-gray-500 mb-16 max-w-xl leading-relaxed">
                Available for selected opportunities. Let's build something beautiful together.
              </p>
              <a href={`mailto:${email}`} className="premium-link text-4xl md:text-6xl font-medium text-black pb-4 flex items-center gap-6 group">
                {email}
                <ArrowUpRight className="w-10 h-10 text-gray-300 group-hover:text-black transition-colors duration-700" />
              </a>
            </motion.div>
          </div>
          
          <motion.footer 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }} viewport={{ once: true }}
            className="pt-16 text-center text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase"
          >
            © {new Date().getFullYear()} {name}. All rights reserved.
          </motion.footer>
        </section>
      </main>
    </div>
  )
}
