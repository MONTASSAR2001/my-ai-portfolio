'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { GlassPanel } from './glass-panel'

export function HeroPanel() {
  return (
    <GlassPanel delay={0.1} className="p-8 md:p-10">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        {/* Avatar with breathing aura */}
        <div className="relative shrink-0">
          <div className="absolute -inset-4 animate-breathe rounded-full bg-[radial-gradient(circle,oklch(0.65_0.24_305_/_0.7),transparent_70%)] blur-2xl" />
          <div className="absolute -inset-px rounded-full bg-gradient-to-b from-white/40 to-transparent" />
          <Image
            src="/avatar.png"
            alt="Portrait of Aria Vale"
            width={132}
            height={132}
            priority
            className="relative size-28 rounded-full object-cover ring-1 ring-white/20 md:size-32"
          />
          <span className="absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-medium text-neon backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-neon" />
            online
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
          >
            <MapPin className="size-3 text-neon" />
            San Francisco · UTC−8 · Available for select work
          </motion.div>

          <h1 className="text-balance font-sans text-5xl font-semibold leading-[0.95] tracking-tight text-glow md:text-7xl">
            Aria Vale
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Elite AI &amp; systems engineer architecting{' '}
            <span className="text-foreground">real-time intelligence</span> at the edge of
            human–machine interfaces.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="group/btn flex items-center gap-2 rounded-xl bg-neon px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.7_0.23_305_/_0.8)] transition-transform hover:scale-[1.03]">
              Initiate contact
              <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
            <button className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/10">
              View dossier
            </button>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}
