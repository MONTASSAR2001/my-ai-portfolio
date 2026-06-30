'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Layers } from 'lucide-react'
import { GlassPanel } from './glass-panel'

const projects = [
  {
    name: 'Synapse',
    type: 'Realtime inference router',
    metric: 'p99 · 8ms',
    accent: 'neon',
  },
  {
    name: 'Aether',
    type: 'Edge vector database',
    metric: '12M vec/s',
    accent: 'cyan',
  },
  {
    name: 'Pulse',
    type: 'Observability mesh',
    metric: '0 downtime',
    accent: 'neon',
  },
]

export function ProjectsPanel() {
  return (
    <GlassPanel delay={0.35} className="p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-neon/15 text-neon">
          <Layers className="size-4" />
        </span>
        <div>
          <h2 className="font-sans text-lg font-semibold tracking-tight">Featured Systems</h2>
          <p className="font-mono text-xs text-muted-foreground">/ production deployments</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {projects.map((p, i) => (
          <motion.button
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="group/card relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >
            <div
              className={`pointer-events-none absolute -right-8 -top-8 size-24 rounded-full opacity-40 blur-2xl transition-opacity group-hover/card:opacity-90 ${
                p.accent === 'cyan' ? 'bg-cyan/40' : 'bg-neon/40'
              }`}
            />
            <div className="relative flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {p.metric}
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-neon" />
            </div>
            <h3 className="relative mt-8 font-sans text-xl font-semibold tracking-tight">
              {p.name}
            </h3>
            <p className="relative mt-1 text-sm text-muted-foreground">{p.type}</p>
          </motion.button>
        ))}
      </div>
    </GlassPanel>
  )
}
