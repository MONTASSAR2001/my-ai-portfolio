'use client';

interface Deployment {
  date: string;
  title: string;
  description: string;
  tags: string[];
  impact?: string;
}

const deployments: Deployment[] = [
  {
    date: 'December 2024',
    title: 'E-Commerce Platform Migration',
    description: 'Migrated monolithic application to microservices architecture with Docker containerization.',
    tags: ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    impact: '40% performance improvement',
  },
  {
    date: 'October 2024',
    title: 'Real-time Analytics Dashboard',
    description: 'Built real-time data visualization dashboard handling 100K+ events/sec with WebSocket streaming.',
    tags: ['React', 'TypeScript', 'GraphQL', 'WebSocket'],
    impact: '98% uptime SLA',
  },
  {
    date: 'August 2024',
    title: 'Automated CI/CD Pipeline',
    description: 'Designed comprehensive deployment automation reducing deployment time from 2 hours to 10 minutes.',
    tags: ['GitHub Actions', 'Docker', 'Terraform', 'AWS'],
    impact: '10x faster deployments',
  },
  {
    date: 'June 2024',
    title: 'Multi-tenant SaaS Infrastructure',
    description: 'Architected scalable multi-tenant system supporting 500+ organizations with isolated data environments.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Vercel'],
    impact: '$2M ARR potential',
  },
  {
    date: 'April 2024',
    title: 'Performance Optimization Initiative',
    description: 'Optimized frontend bundle size and implemented aggressive caching strategies.',
    tags: ['Next.js', 'React', 'Webpack', 'CDN'],
    impact: 'LCP: 1.2s → 0.8s',
  },
  {
    date: 'February 2024',
    title: 'API Redesign & Documentation',
    description: 'Redesigned RESTful API with comprehensive OpenAPI documentation and SDK generation.',
    tags: ['REST', 'OpenAPI', 'TypeScript', 'Rate Limiting'],
    impact: '99.95% availability',
  },
];

export default function Timeline() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <h2 className="section-heading">Deployment Timeline</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-secondary opacity-30 md:-translate-x-1/2" />

        {/* Timeline items */}
        <div className="space-y-12">
          {deployments.map((deployment, index) => (
            <div
              key={deployment.title}
              className={`relative pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:ml-1/2 md:pl-12'}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2">
                <div className="timeline-dot" />
              </div>

              {/* Card */}
              <div className="tech-card group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {deployment.title}
                  </h3>
                  <time className="text-sm text-muted-foreground font-mono whitespace-nowrap ml-4">
                    {deployment.date}
                  </time>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {deployment.description}
                </p>

                {deployment.impact && (
                  <div className="mb-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                    <p className="text-sm text-accent font-semibold flex items-center gap-2">
                      <span>✓</span>
                      {deployment.impact}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {deployment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-card border border-accent/20 text-accent rounded group-hover:border-accent/40 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-20 grid md:grid-cols-4 gap-6">
        {[
          { label: 'Deployments', value: '50+' },
          { label: 'Projects', value: '20+' },
          { label: 'Years Experience', value: '7+' },
          { label: 'Team Size Led', value: '12' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="tech-card text-center hover:border-secondary"
          >
            <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
