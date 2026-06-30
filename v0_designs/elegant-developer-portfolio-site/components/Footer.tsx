'use client';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', icon: '⚙️', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Twitter', icon: '𝕏', url: '#' },
    { name: 'Email', icon: '📧', url: '#' },
  ];

  return (
    <footer id="contact" className="py-24 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-heading">Let&apos;s Work Together</h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact info */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m always interested in hearing about new projects and opportunities. Whether you need a full-stack developer, technical consultant, or someone to help architect your next big idea—let&apos;s talk.
            </p>

            <div className="space-y-3">
              <p className="text-foreground font-semibold">Get in touch:</p>
              <p className="text-accent font-mono text-lg hover:text-foreground transition-colors duration-300 cursor-pointer">
                hello@alexchen.dev
              </p>
              <p className="text-muted-foreground">Available for contracts, consulting, and full-time roles.</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <div className="tech-card">
              <h3 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {['Projects', 'Blog', 'Resume', 'GitHub', 'LinkedIn', 'Twitter'].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                  >
                    → {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="py-12 border-t border-border">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 group"
                title={link.name}
              >
                <span className="text-lg group-hover:text-accent transition-colors duration-300">
                  {link.icon}
                </span>
                <span className="text-sm font-medium group-hover:text-accent transition-colors duration-300">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>
              Designed & built with React, TypeScript, and{' '}
              <span className="text-accent glow-accent">Tailwind CSS</span>
            </p>
            <p>© 2024 Alex Chen. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
