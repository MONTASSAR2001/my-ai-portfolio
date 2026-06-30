'use client'

import { GlassPanel } from './glass-panel'

const stats = [
  { value: '9+', label: 'Years shipping' },
  { value: '42', label: 'Systems deployed' },
  { value: '1.2B', label: 'Daily inferences' },
  { value: '99.99%', label: 'Uptime SLA' },
]

export function StatsPanel() {
  return (
    <GlassPanel delay={0.2} className="p-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center gap-1 bg-card/40 px-4 py-5 text-center transition-colors hover:bg-white/5"
          >
            <span className="font-sans text-3xl font-semibold tracking-tight text-foreground">
              {s.value}
            </span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </GlassPanel>
  )
}
