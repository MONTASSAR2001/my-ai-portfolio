"use client"

import Image from "next/image"
import { ArrowUpRight, Briefcase, Code2, Component, Layers, Mail, Sparkles } from "lucide-react"
import type { ElementType } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; summary?: string; skills?: string[]
  experience?: ExpItem[]; profile_image?: string | null
}

// Cycle through icons for experience entries
const EXP_ICONS: { icon: ElementType; color: string }[] = [
  { icon: Layers,     color: "bg-indigo-50 text-indigo-600" },
  { icon: Sparkles,   color: "bg-gray-900 text-white" },
  { icon: Component,  color: "bg-rose-50 text-rose-600" },
  { icon: Code2,      color: "bg-gray-100 text-gray-700" },
  { icon: Briefcase,  color: "bg-amber-50 text-amber-600" },
]

// Cycle through pill colors for skills
const PILL_COLORS = [
  "bg-blue-50 text-blue-700",
  "bg-rose-50 text-rose-700",
  "bg-sky-50 text-sky-700",
  "bg-indigo-50 text-indigo-700",
  "bg-pink-50 text-pink-700",
  "bg-amber-50 text-amber-700",
  "bg-teal-50 text-teal-700",
  "bg-cyan-50 text-cyan-700",
  "bg-emerald-50 text-emerald-700",
  "bg-orange-50 text-orange-700",
]

// ─── HeroCard ─────────────────────────────────────────────────────────────────
function HeroCard({ p }: { p: PortfolioRow }) {
  const parts     = p.slug.split("-")
  const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Alex"
  const lastName  = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Rivera"
  const fullName  = `${firstName} ${lastName}`

  return (
    <section className="group relative flex flex-col justify-between gap-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md md:col-span-2 md:row-span-2 md:p-10">
      <div className="flex items-start justify-between gap-6">
        <div className="relative">
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-gray-100 md:h-24 md:w-24">
            {p.profile_image ? (
              <Image src={p.profile_image} alt={`Portrait of ${fullName}`} fill sizes="96px" className="object-cover" priority />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-3xl font-black text-gray-300">
                {firstName.charAt(0)}
              </div>
            )}
          </div>
          <span className="absolute -right-1 bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
          </span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available for work
        </span>
      </div>
      <div className="space-y-4">
        <h1 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
          {`Hi, I'm ${fullName}.`}
        </h1>
        <p className="max-w-md text-pretty text-lg leading-relaxed text-gray-500">
          {p.summary || "A product designer & engineer crafting clean, human-centered digital products that feel effortless to use."}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700">
          Get in touch <ArrowUpRight className="h-4 w-4" />
        </a>
        <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          View work
        </a>
      </div>
    </section>
  )
}

// ─── ExperienceCard ───────────────────────────────────────────────────────────
function ExperienceCard({ experience }: { experience?: ExpItem[] }) {
  const items = experience?.length ? experience.map((e, i) => ({
    role: e.title,
    company: e.company,
    period: e.duration ?? "—",
    icon: EXP_ICONS[i % EXP_ICONS.length]!.icon,
    iconColor: EXP_ICONS[i % EXP_ICONS.length]!.color,
  })) : [
    { role: "Senior Product Designer", company: "Linear",   period: "2023 — Present", icon: Layers,    iconColor: "bg-indigo-50 text-indigo-600" },
    { role: "Design Engineer",         company: "Vercel",   period: "2021 — 2023",    icon: Sparkles,  iconColor: "bg-gray-900 text-white" },
    { role: "Product Designer",        company: "Figma",    period: "2019 — 2021",    icon: Component, iconColor: "bg-rose-50 text-rose-600" },
    { role: "Frontend Engineer",       company: "GitHub",   period: "2017 — 2019",    icon: Code2,     iconColor: "bg-gray-100 text-gray-700" },
    { role: "UI Designer",             company: "Freelance",period: "2015 — 2017",    icon: Briefcase, iconColor: "bg-amber-50 text-amber-600" },
  ]

  return (
    <section id="work" className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md md:row-span-2">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">Experience</h2>
      <ul className="-mr-2 max-h-80 space-y-2 overflow-y-auto pr-2">
        {items.map((item, idx) => {
          const Icon = item.icon
          return (
            <li key={idx} className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-gray-50">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconColor}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.role}</p>
                <p className="text-sm text-gray-500">
                  {item.company}<span className="text-gray-400"> · {item.period}</span>
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

// ─── SkillsCard ───────────────────────────────────────────────────────────────
function SkillsCard({ skills }: { skills?: string[] }) {
  const items = skills?.length ? skills : ["Product Design", "UX Research", "React", "TypeScript", "Figma", "Design Systems", "Prototyping", "Tailwind CSS", "Motion", "Accessibility"]

  return (
    <section className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">Skills & Tools</h2>
      <div className="flex flex-wrap gap-2.5">
        {items.map((label, i) => (
          <span key={label} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${PILL_COLORS[i % PILL_COLORS.length]}`}>
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ experience, skills }: { experience?: ExpItem[]; skills?: string[] }) {
  return (
    <section className="flex flex-col justify-between gap-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">Impact</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-4xl font-semibold tracking-tight text-gray-900">{experience?.length ?? 0}+</p>
          <p className="mt-1 text-sm text-gray-500">Roles held</p>
        </div>
        <div>
          <p className="text-4xl font-semibold tracking-tight text-gray-900">40M+</p>
          <p className="mt-1 text-sm text-gray-500">Users reached</p>
        </div>
        <div>
          <p className="text-4xl font-semibold tracking-tight text-gray-900">{skills?.length ?? 0}+</p>
          <p className="mt-1 text-sm text-gray-500">Technologies</p>
        </div>
        <div>
          <p className="text-4xl font-semibold tracking-tight text-gray-900">120</p>
          <p className="mt-1 text-sm text-gray-500">Projects shipped</p>
        </div>
      </div>
    </section>
  )
}

// ─── ContactCard ──────────────────────────────────────────────────────────────
function ContactCard({ p }: { p: PortfolioRow }) {
  return (
    <section id="contact" className="group flex flex-col justify-between gap-6 rounded-3xl border border-gray-100 bg-gray-900 p-8 text-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
        <Mail className="h-5 w-5" />
      </span>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-balance">
          {"Let's build something great."}
        </h2>
        <p className="text-sm leading-relaxed text-gray-400">
          Open to select freelance and full-time opportunities.
        </p>
      </div>
      <a
        href={`mailto:hello@${p.slug}.dev`}
        className="inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
      >
        hello@{p.slug}.dev
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function PremiumTemplateClient({ p, isPreview }: { p: PortfolioRow, isPreview?: boolean }) {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-5xl auto-rows-min grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        <HeroCard p={p} />
        <ExperienceCard experience={p.experience} />
        <SkillsCard skills={p.skills} />
        <StatCard experience={p.experience} skills={p.skills} />
        <ContactCard p={p} />
      </div>
    </main>
  )
}
