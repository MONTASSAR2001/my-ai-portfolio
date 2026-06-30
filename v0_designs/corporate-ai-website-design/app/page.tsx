import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Team } from '@/components/team'
import { ContactFooter } from '@/components/contact-footer'

export default function Page() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Team />
      <ContactFooter />
    </main>
  )
}
