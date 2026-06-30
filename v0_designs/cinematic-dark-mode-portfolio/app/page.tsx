import { Hero } from "@/components/hero"
import { SkillsMarquee } from "@/components/skills-marquee"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { Nav, Contact } from "@/components/site-chrome"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05050A] text-white">
      {/* global ambient glow top */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[60vh] opacity-50"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 0%, rgba(67,56,202,0.18), transparent 70%)",
        }}
      />
      <Nav />
      <Hero />
      <div id="skills">
        <SkillsMarquee />
      </div>
      <ExperienceTimeline />
      <Contact />
    </main>
  )
}
