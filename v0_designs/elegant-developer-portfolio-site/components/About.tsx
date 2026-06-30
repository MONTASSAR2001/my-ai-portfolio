'use client';

export default function About() {
  return (
    <section className="py-24 px-4 bg-card/30 border-y border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-heading">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m a passionate full-stack engineer with a deep focus on building scalable, high-performance systems. With over 7 years of experience, I&apos;ve worked across the entire technology stack—from frontend interfaces to cloud infrastructure.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My philosophy centers on clean code, thoughtful architecture, and meaningful impact. I believe that great engineering isn&apos;t just about solving problems—it&apos;s about solving them elegantly, at scale, and with an eye toward maintainability.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently, I&apos;m focused on building distributed systems, optimizing performance bottlenecks, and mentoring junior engineers. I love exploring emerging technologies and finding practical applications that drive real business value.
            </p>

            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors duration-300 font-semibold group"
              >
                Let&apos;s collaborate
                <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Stats/Highlights */}
          <div className="space-y-6">
            <div className="tech-card hover:border-accent/40">
              <h3 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                Specializations
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  'Full-Stack Web Development',
                  'Microservices Architecture',
                  'Database Design & Optimization',
                  'Cloud Infrastructure (AWS)',
                  'DevOps & Automation',
                  'System Performance Tuning',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-accent mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tech-card hover:border-secondary/40">
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">
                Current Focus
              </h3>
              <p className="text-muted-foreground">
                Building AI-powered features with LLMs, optimizing database queries for massive scale, and exploring edge computing opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
