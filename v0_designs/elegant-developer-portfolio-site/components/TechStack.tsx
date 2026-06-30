'use client';

interface TechItem {
  category: string;
  items: { name: string; icon: string }[];
}

const techStack: TechItem[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: '⚛️' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Next.js', icon: '▲' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'REST APIs', icon: '🔗' },
      { name: 'GraphQL', icon: '🔷' },
    ],
  },
  {
    category: 'DevOps & Cloud',
    items: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Vercel', icon: '▲' },
      { name: 'AWS', icon: '☁️' },
      { name: 'GitHub Actions', icon: '⚙️' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', icon: '📦' },
      { name: 'Figma', icon: '🎭' },
      { name: 'VS Code', icon: '💻' },
      { name: 'Prisma', icon: '🔮' },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <h2 className="section-heading">Technical Stack</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {techStack.map((stack) => (
          <div key={stack.category} className="space-y-4">
            <h3 className="text-lg font-semibold text-accent tracking-widest uppercase text-sm mb-6">
              {stack.category}
            </h3>

            <div className="space-y-3">
              {stack.items.map((item) => (
                <div
                  key={item.name}
                  className="tech-card flex items-center gap-3 cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="text-foreground group-hover:text-accent transition-colors duration-300 font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skill highlights */}
      <div className="mt-16 pt-12 border-t border-border">
        <h3 className="text-lg font-semibold text-accent tracking-widest uppercase text-sm mb-6">
          Core Competencies
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Full-Stack Development',
            'System Design',
            'Performance Optimization',
            'RESTful APIs',
            'Database Architecture',
            'CI/CD Pipelines',
            'Cloud Infrastructure',
            'Scalable Applications',
            'UI/UX Implementation',
            'Code Quality',
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 cursor-pointer"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
