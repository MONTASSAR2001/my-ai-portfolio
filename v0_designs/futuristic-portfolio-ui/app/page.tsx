import { SpatialBackground } from '@/components/portfolio/spatial-background'
import { TopDock } from '@/components/portfolio/top-dock'
import { HeroPanel } from '@/components/portfolio/hero-panel'
import { StatsPanel } from '@/components/portfolio/stats-panel'
import { TechStackPanel } from '@/components/portfolio/tech-stack-panel'
import { ExperiencePanel } from '@/components/portfolio/experience-panel'
import { ProjectsPanel } from '@/components/portfolio/projects-panel'

export default function Page() {
  return (
    <main className="relative min-h-screen w-full px-4 pb-20 pt-4 md:px-8">
      <SpatialBackground />

      <TopDock />

      <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-6">
        <HeroPanel />

        <StatsPanel />

        <div className="grid gap-6 lg:grid-cols-2">
          <TechStackPanel />
          <ExperiencePanel />
        </div>

        <ProjectsPanel />

        <footer className="mt-4 flex flex-col items-center justify-between gap-2 px-2 text-xs text-muted-foreground sm:flex-row">
          <span className="font-mono">© 2026 ARIA VALE · SPATIAL OS v3.1</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-neon" />
            all systems nominal
          </span>
        </footer>
      </div>
    </main>
  )
}
