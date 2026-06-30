import { Briefcase, Code2, Component, Layers, Sparkles } from "lucide-react"

const experience = [
  {
    role: "Senior Product Designer",
    company: "Linear",
    period: "2023 — Present",
    icon: Layers,
    iconColor: "bg-indigo-50 text-indigo-600",
  },
  {
    role: "Design Engineer",
    company: "Vercel",
    period: "2021 — 2023",
    icon: Sparkles,
    iconColor: "bg-gray-900 text-white",
  },
  {
    role: "Product Designer",
    company: "Figma",
    period: "2019 — 2021",
    icon: Component,
    iconColor: "bg-rose-50 text-rose-600",
  },
  {
    role: "Frontend Engineer",
    company: "GitHub",
    period: "2017 — 2019",
    icon: Code2,
    iconColor: "bg-gray-100 text-gray-700",
  },
  {
    role: "UI Designer",
    company: "Freelance",
    period: "2015 — 2017",
    icon: Briefcase,
    iconColor: "bg-amber-50 text-amber-600",
  },
]

export function ExperienceCard() {
  return (
    <section className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md md:row-span-2">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">
        Experience
      </h2>
      <ul className="-mr-2 max-h-80 space-y-2 overflow-y-auto pr-2">
        {experience.map((item) => {
          const Icon = item.icon
          return (
            <li
              key={`${item.company}-${item.period}`}
              className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-gray-50"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconColor}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {item.role}
                </p>
                <p className="text-sm text-gray-500">
                  {item.company}
                  <span className="text-gray-400"> · {item.period}</span>
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
