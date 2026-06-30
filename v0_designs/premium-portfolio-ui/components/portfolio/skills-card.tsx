const skills = [
  { label: "Product Design", color: "bg-blue-50 text-blue-700" },
  { label: "UX Research", color: "bg-rose-50 text-rose-700" },
  { label: "React", color: "bg-sky-50 text-sky-700" },
  { label: "TypeScript", color: "bg-indigo-50 text-indigo-700" },
  { label: "Figma", color: "bg-pink-50 text-pink-700" },
  { label: "Design Systems", color: "bg-amber-50 text-amber-700" },
  { label: "Prototyping", color: "bg-teal-50 text-teal-700" },
  { label: "Tailwind CSS", color: "bg-cyan-50 text-cyan-700" },
  { label: "Motion", color: "bg-emerald-50 text-emerald-700" },
  { label: "Accessibility", color: "bg-orange-50 text-orange-700" },
]

export function SkillsCard() {
  return (
    <section className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">
        Skills & Tools
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <span
            key={skill.label}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${skill.color}`}
          >
            {skill.label}
          </span>
        ))}
      </div>
    </section>
  )
}
