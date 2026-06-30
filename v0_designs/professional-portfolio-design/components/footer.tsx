'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Contact Section */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-accent mb-3">Get in Touch</p>
              <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              I&apos;m always interested in hearing about new projects and opportunities in embedded systems and RF engineering.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest font-semibold text-accent mb-6">Professional</p>
            <div className="space-y-3">
              <a href="mailto:contact@example.com" className="block hover:text-accent transition-colors font-medium">
                Email
              </a>
              <a href="#" className="block hover:text-accent transition-colors font-medium">
                GitHub
              </a>
              <a href="#" className="block hover:text-accent transition-colors font-medium">
                LinkedIn
              </a>
              <a href="#" className="block hover:text-accent transition-colors font-medium">
                Publications
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-accent">Quick Contact</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-primary-foreground text-primary px-4 py-3 text-sm placeholder-primary/50 focus:outline-none"
              />
              <button className="w-full bg-accent text-accent-foreground px-4 py-3 font-semibold hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
          <p>© {currentYear} Alex Chen. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
