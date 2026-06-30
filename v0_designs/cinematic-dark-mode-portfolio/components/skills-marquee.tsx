const SKILLS = [
  "PyTorch",
  "Transformers",
  "LangGraph",
  "Vector Databases",
  "CUDA",
  "RAG Pipelines",
  "Reinforcement Learning",
  "Diffusion Models",
  "TypeScript",
  "Distributed Training",
  "ONNX",
  "Triton",
  "Model Quantization",
  "Agentic Systems",
  "MLOps",
  "Ray",
]

function Pill({ label }: { label: string }) {
  return (
    <li className="group relative flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl transition-colors hover:border-emerald-400/40">
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]"
      />
      <span className="whitespace-nowrap text-sm font-medium text-white/80">
        {label}
      </span>
    </li>
  )
}

export function SkillsMarquee() {
  return (
    <section className="relative py-24" aria-label="Skills">
      <div className="mx-auto mb-12 max-w-7xl px-6 md:px-12 lg:px-20">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400/80">
          / CAPABILITIES
        </p>
      </div>

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="animate-marquee flex shrink-0 gap-4 pr-4">
          {SKILLS.map((s) => (
            <Pill key={s} label={s} />
          ))}
        </ul>
        <ul
          className="animate-marquee flex shrink-0 gap-4 pr-4"
          aria-hidden="true"
        >
          {SKILLS.map((s) => (
            <Pill key={`dup-${s}`} label={s} />
          ))}
        </ul>
      </div>
    </section>
  )
}
