export function Experience() {
  const experiences = [
    {
      role: 'Senior Embedded Systems Engineer',
      company: 'TechComm Solutions',
      duration: 'Jun 2024 - Present',
      location: 'San Francisco, CA',
      highlights: [
        'Led development of next-generation IoT communication modules',
        'Designed firmware architecture for multi-protocol gateway device',
        'Mentored junior engineers in embedded systems best practices'
      ]
    },
    {
      role: 'Hardware Design Intern',
      company: 'RF Innovations Inc',
      duration: 'Jan 2023 - May 2024',
      location: 'Remote',
      highlights: [
        'Designed and validated RF frontend circuits for communication systems',
        'Implemented signal processing algorithms in C/ARM Assembly',
        'Conducted PCB layout optimization reducing EMI by 35%'
      ]
    },
    {
      role: 'Embedded Systems Technician',
      company: 'Industrial Automation Ltd',
      duration: 'Sep 2022 - Dec 2022',
      location: 'Boston, MA',
      highlights: [
        'Developed firmware for industrial controller boards',
        'Debugged complex CAN bus communication issues',
        'Improved system reliability metrics by 28%'
      ]
    }
  ]

  return (
    <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto" id="experience">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Professional Experience
        </h2>
        <div className="w-16 h-1 bg-accent" />
      </div>

      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-border">
            {/* Timeline marker */}
            <div className="md:col-span-1">
              <p className="text-xs uppercase tracking-widest font-semibold text-accent mb-2">Duration</p>
              <p className="font-semibold text-sm mb-4">{exp.duration}</p>
              <p className="text-xs text-muted-foreground">{exp.location}</p>
            </div>

            {/* Experience details */}
            <div className="md:col-span-3 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <p className="text-accent font-medium text-lg mt-1">{exp.company}</p>
              </div>

              <ul className="space-y-3">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed">
                    <span className="text-accent font-bold mt-0.5">→</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-secondary border-2 border-accent space-y-4">
        <p className="text-sm uppercase tracking-widest font-semibold text-accent">Education</p>
        <h3 className="text-2xl font-bold">B.S. in Electronics Engineering</h3>
        <p className="text-lg text-accent font-medium">State University</p>
        <p className="text-sm text-foreground/75">Graduated with Honors • GPA 3.8/4.0 • 2022</p>
      </div>
    </section>
  )
}
