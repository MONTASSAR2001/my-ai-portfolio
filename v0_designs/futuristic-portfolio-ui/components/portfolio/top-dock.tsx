'use client'

import { motion } from 'framer-motion'
import { Activity, Code2, Cpu, Layers, Link2, Mail, Sparkles } from 'lucide-react'

const navItems = [
  { icon: Sparkles, label: 'Overview' },
  { icon: Cpu, label: 'Stack' },
  { icon: Layers, label: 'Work' },
  { icon: Activity, label: 'Signal' },
]

const socials = [
  { icon: Code2, label: 'GitHub' },
  { icon: Link2, label: 'LinkedIn' },
  { icon: Mail, label: 'Email' },
]

export function TopDock() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel sticky top-4 z-50 mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5"
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-8 items-center justify-center rounded-xl bg-neon/15">
          <span className="absolute inset-0 animate-breathe rounded-xl bg-neon/30 blur-md" />
          <Sparkles className="relative size-4 text-neon" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          AV<span className="text-neon">/</span>OS
        </span>
      </div>

      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-1">
        {socials.map(({ icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-white/5 hover:text-neon"
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </motion.header>
  )
}
