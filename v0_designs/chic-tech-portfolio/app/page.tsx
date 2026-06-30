import Header from '@/components/header'
import Hero from '@/components/hero'
import Projects from '@/components/projects'
import CaseStudy from '@/components/case-study'
import ContactForm from '@/components/contact-form'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header />
      <Hero />
      <Projects />
      <div id="case-study">
        <CaseStudy />
      </div>
      <ContactForm />
      <Footer />
    </main>
  )
}
