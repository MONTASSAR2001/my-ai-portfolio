import { HeroCard } from "@/components/portfolio/hero-card"
import { SkillsCard } from "@/components/portfolio/skills-card"
import { ExperienceCard } from "@/components/portfolio/experience-card"
import { StatCard, ContactCard } from "@/components/portfolio/stat-cards"

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-5xl auto-rows-min grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        <HeroCard />
        <ExperienceCard />
        <SkillsCard />
        <StatCard />
        <ContactCard />
      </div>
    </main>
  )
}
