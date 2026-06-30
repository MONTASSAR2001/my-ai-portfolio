'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  /** stagger / entrance delay in seconds */
  delay?: number
  /** subtle ambient floating */
  float?: boolean
}

export function GlassPanel({ children, className, delay = 0, float = false }: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        'glass-panel group relative overflow-hidden rounded-3xl transition-shadow duration-500',
        'hover:shadow-[0_40px_120px_-20px_oklch(0.5_0.22_300_/_0.45)]',
        float && 'animate-float',
        className,
      )}
    >
      {/* glowing top edge sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {/* hover aura */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120%_80%_at_50%_0%,oklch(0.7_0.23_305_/_0.12),transparent_70%)]" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
