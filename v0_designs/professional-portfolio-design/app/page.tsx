import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { CapstoneProject } from '@/components/capstone-project'
import { Skills } from '@/components/skills'
import { Hardware } from '@/components/hardware'
import { Experience } from '@/components/experience'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <CapstoneProject />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-12 py-24">
          <Skills />
          <Hardware />
        </div>
        <Experience />
      </main>
      <Footer />
    </div>
  )
}
