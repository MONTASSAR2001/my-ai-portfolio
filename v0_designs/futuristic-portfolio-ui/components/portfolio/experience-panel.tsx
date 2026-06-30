'use client'

import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { GlassPanel } from './glass-panel'

const log = [
  {
    period: '2023 — NOW',
    role: 'Principal AI Engineer',
    org: 'Helix Labs',
    desc: 'Leading the inference platform powering 1.2B daily requests across edge regions.',
    tag: 'ACTIVE',
  },
  {
    period: '2020 — 2023',
    role: 'Staff Systems Engineer',
    org: 'Nimbus Dynamics',
    desc: 'Built a sub-millisecond Rust feature store and the real-time ML serving mesh.',
    tag: 'SHIPPED',
  },
  {
    period: '2017 — 2020',
    role: 'Senior Backend Engineer',
    org: 'Vector Grid',
    desc: 'Scaled distributed event pipelines from 0 to 80M events/min with zero data loss.',
    tag: 'SCALED',
  },
]

export function ExperiencePanel() {
  return (
    <GlassPanel delay={0.3} className="h-full p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
          <Terminal className="size-4" />
        </span>
        <div>
          <h2 className="font-sans text-lg font-semibold tracking-tight">Experience Log</h2>
          <p className="font-mono text-xs text-muted-foreground">/ chronological data-stream</p>
        </div>
      </div>

      <div className="relative pl-6">
        {/* vertical line */}
        <div className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-neon/60 via-white/15 to-transparent" />

        <div className="space-y-6">
          {log.map((entry, i) => (
            <motion.div
              key={entry.role}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.12 }}
              className="relative"
            >
              <span className="absolute -left-[22px] top-1.5 flex size-3 items-center justify-center">
                <span className="size-2 rounded-full bg-neon shadow-[0_0_10px_oklch(0.7_0.23_305)]" />
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{entry.period}</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-neon">
                  {entry.tag}
                </span>
              </div>
              <h3 className="mt-1 font-sans text-base font-medium text-foreground">
                {entry.role}{' '}
                <span className="text-muted-foreground">· {entry.org}</span>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassPanel>
  )
}
