"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

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
    background-color: #ffffff;
    color: #111111;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .premium-divider {
    height: 1px;
    width: 100%;
    background-color: #f0f0f0;
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

// ─── Animations ──────────────────────────────────────────────────────────────
const smoothEase = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: smoothEase } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
}

// ─── Components ──────────────────────────────────────────────────────────────
function PremiumNav({ name, isPreview }: { name: string; isPreview?: boolean }) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: smoothEase }}
      className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#f0f0f0]`}
    >
      <div className="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
        <span className="font-semibold tracking-tight text-xl">{name}</span>
        <nav className="hidden md:flex items-center gap-10 text-[13px] font-medium tracking-wide text-[#888] uppercase">
          {['Profile', 'Expertise', 'Experience', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-black transition-colors duration-500">
              {item}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}

function PremiumHero({ p }: { p: PortfolioRow }) {
  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  
  return (
    <section id="profile" className="pt-48 pb-24 px-8 max-w-6xl mx-auto min-h-[85vh] flex flex-col justify-center">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-16 md:gap-24">
        {p.profile_image && (
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: smoothEase }}
            className="shrink-0"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full bg-gray-50">
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
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
              {p.role || "Professional Portfolio"}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-semibold tracking-tighter leading-[1.05] text-black">
              {name}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl font-light">
              {p.summary || "A dedicated professional with a passion for designing and implementing innovative, high-fidelity solutions."}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PremiumSkills({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["Design Systems", "Frontend Architecture", "React & Next.js", "TypeScript", "User Experience", "Performance Optimization"]
  
  return (
    <section id="expertise" className="py-24 px-8 max-w-6xl mx-auto">
      <div className="premium-divider mb-32" />
      
      <div className="flex flex-col md:flex-row gap-12 md:gap-32">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:w-1/4">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">Expertise</h2>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} 
          className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-16"
        >
          {items.map((skill, i) => (
            <motion.div key={i} variants={fadeUp} className="group cursor-default">
              <span className="text-2xl font-light text-gray-400 group-hover:text-black transition-colors duration-700">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PremiumExperience({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience : [
    { title: "Senior Designer", company: "Studio One", duration: "2021 — Present", description: "Leading digital product design and establishing comprehensive design systems." },
    { title: "Product Engineer", company: "Tech Corp", duration: "2018 — 2021", description: "Developed scalable front-end architectures for global enterprise clients." }
  ]
  
  return (
    <section id="experience" className="py-24 px-8 max-w-6xl mx-auto">
      <div className="premium-divider mb-32" />
      
      <div className="flex flex-col md:flex-row gap-12 md:gap-32">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:w-1/4">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">Experience</h2>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} 
          className="md:w-3/4 space-y-24"
        >
          {items.map((exp, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col group">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                <h3 className="text-3xl font-medium text-black tracking-tight">{exp.title}</h3>
                <span className="text-sm text-gray-400 font-medium mt-2 sm:mt-0 uppercase tracking-widest">{exp.duration}</span>
              </div>
              <p className="text-xl text-gray-900 font-medium mb-6">{exp.company}</p>
              {exp.description && (
                <p className="text-gray-500 font-light leading-relaxed text-lg max-w-2xl">
                  {exp.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PremiumContact({ p }: { p: PortfolioRow }) {
  const email = p.email || `hello@${p.slug}.dev`
  
  return (
    <section id="contact" className="py-24 px-8 max-w-6xl mx-auto">
      <div className="premium-divider mb-32" />
      
      <div className="flex flex-col md:flex-row gap-12 md:gap-32 pb-32">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:w-1/4">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">Contact</h2>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:w-3/4">
          <p className="text-3xl font-light text-gray-400 mb-16 max-w-xl leading-relaxed">
            Available for selected opportunities. Let's build something beautiful together.
          </p>
          <a href={`mailto:${email}`} className="premium-link text-4xl md:text-6xl font-medium text-black pb-4 flex items-center gap-6 group">
            {email}
            <ArrowUpRight className="w-10 h-10 text-gray-200 group-hover:text-black transition-colors duration-700" />
          </a>
        </motion.div>
      </div>
      
      <motion.footer 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }} viewport={{ once: true }}
        className="pt-16 text-center text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase"
      >
        © {new Date().getFullYear()} {p.name || p.slug.split("-")[0]}. All rights reserved.
      </motion.footer>
    </section>
  )
}

export default function PremiumTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  return (
    <div className="premium-root selection:bg-black selection:text-white">
      <style>{PREMIUM_CSS}</style>
      <PremiumNav name={p.name || p.slug.split("-")[0]} isPreview={isPreview} />
      <main>
        <PremiumHero p={p} />
        <PremiumSkills skills={p.skills} />
        <PremiumExperience experience={p.experience} />
        <PremiumContact p={p} />
      </main>
    </div>
  )
}
