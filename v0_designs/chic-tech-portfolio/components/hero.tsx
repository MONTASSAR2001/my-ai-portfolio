import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="mb-8 inline-block">
          <div className="glass-card">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Welcome to Innovation</span>
          </div>
        </div>

        <h1 className="hero-text mb-8">
          Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Digital Experiences</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          Cutting-edge technology meets minimalist design. Explore projects that showcase innovation, precision, and creative vision through glassmorphic interfaces and modern aesthetics.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="#projects" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105">
            View Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full glassmorphism text-foreground font-semibold hover:bg-white/40 dark:hover:bg-slate-700/40 transition-all duration-300">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
