'use client'

import { motion } from 'framer-motion'
import { Boxes, Cpu } from 'lucide-react'
import { GlassPanel } from './glass-panel'

const clusters = [
  {
    title: 'Intelligence',
    items: ['PyTorch', 'JAX', 'CUDA', 'Triton', 'LangGraph', 'vLLM'],
  },
  {
    title: 'Systems',
    items: ['Rust', 'Go', 'TypeScript', 'gRPC', 'WASM', 'Kafka'],
  },
  {
    title: 'Cloud',
    items: ['Kubernetes', 'Terraform', 'Vercel', 'AWS', 'Postgres', 'Redis'],
  },
]

export function TechStackPanel() {
  return (
    <GlassPanel delay={0.25} className="h-full p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-neon/15 text-neon">
          <Cpu className="size-4" />
        </span>
        <div>
          <h2 className="font-sans text-lg font-semibold tracking-tight">Tech Stack</h2>
          <p className="font-mono text-xs text-muted-foreground">/ active capability matrix</p>
        </div>
        <Boxes className="ml-auto size-5 text-muted-foreground/50" />
      </div>

      <div className="space-y-5">
        {clusters.map((cluster, ci) => (
          <div key={cluster.title}>
            <p className="mb-2.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {cluster.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {cluster.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + ci * 0.1 + i * 0.04 }}
                  className="group/chip relative cursor-default rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-foreground/90 transition-all hover:border-neon/50 hover:bg-neon/10 hover:text-neon"
                >
                  <span className="absolute left-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-neon/60 opacity-0 shadow-[0_0_8px_oklch(0.7_0.23_305)] transition-opacity group-hover/chip:opacity-100" />
                  <span className="transition-transform group-hover/chip:translate-x-2.5">
                    {item}
                  </span>
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  )
}
