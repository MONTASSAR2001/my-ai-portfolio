import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/20 dark:border-white/10 backdrop-blur-md bg-white/10 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Ready
              </span>
              {' to collaborate?'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">Let&apos;s build something amazing together</p>
          </div>

          <a
            href="#top"
            className="p-3 rounded-full glassmorphism hover:bg-white/40 dark:hover:bg-slate-700/40 transition-all transform hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </a>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          {[
            { emoji: '💻', label: 'GitHub', href: '#' },
            { emoji: '💼', label: 'LinkedIn', href: '#' },
            { emoji: '📧', label: 'Email', href: '#' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="p-3 rounded-full glass-card hover:bg-white/40 dark:hover:bg-slate-700/40 transition-all transform hover:scale-110 text-2xl"
            >
              {link.emoji}
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 dark:border-white/5 pt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} Tech Portfolio. Crafted with innovation and precision.
          </p>
        </div>
      </div>
    </footer>
  )
}
