const EXPERIENCE = [
  {
    year: "2024",
    role: "Principal AI Engineer",
    company: "Helix Labs",
    detail:
      "Leading a team building autonomous research agents and multi-modal reasoning systems deployed at planetary scale.",
  },
  {
    year: "2022",
    role: "Senior ML Engineer",
    company: "Nebula AI",
    detail:
      "Designed low-latency inference infrastructure serving 4B+ daily requests across distributed GPU clusters.",
  },
  {
    year: "2020",
    role: "Research Engineer",
    company: "Cortex Research",
    detail:
      "Published work on efficient transformer architectures and pioneered in-house diffusion model tooling.",
  },
  {
    year: "2018",
    role: "Machine Learning Intern",
    company: "Quantum Systems",
    detail:
      "Built the first generation of the recommendation engine using deep collaborative filtering.",
  },
]

export function ExperienceTimeline() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-20"
      aria-label="Experience"
    >
      <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400/80">
        / TRAJECTORY
      </p>
      <h2 className="mb-16 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Experience
      </h2>

      <ol className="relative ml-2">
        {/* vertical line */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-indigo-500/40 via-white/10 to-transparent"
        />

        {EXPERIENCE.map((item) => (
          <li
            key={item.year}
            className="relative grid grid-cols-1 gap-2 pb-14 pl-8 sm:grid-cols-[120px_1fr] sm:gap-8"
          >
            {/* glowing dot */}
            <span
              aria-hidden="true"
              className="animate-pulse-dot absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(16,185,129,0.6)]"
            />
            <span className="font-mono text-sm text-white/40">{item.year}</span>
            <div>
              <h3 className="text-xl font-medium text-white">
                {item.role}{" "}
                <span className="text-white/40">— {item.company}</span>
              </h3>
              <p className="mt-2 max-w-xl text-pretty leading-relaxed text-white/50">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
