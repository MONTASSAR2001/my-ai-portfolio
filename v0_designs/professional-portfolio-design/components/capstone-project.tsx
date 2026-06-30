export function CapstoneProject() {
  return (
    <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto" id="projects">
      <div className="border-l-4 border-accent pl-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">Featured Project</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
          Adaptive RF Signal<br />Processing System
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Project Description */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Overview</h3>
            <p className="text-base leading-relaxed text-foreground/85">
              A comprehensive RF signal processing system designed to adaptively filter and analyze electromagnetic signals across multiple frequency bands. The system integrates real-time digital signal processing with hardware-accelerated computation for industrial communication applications.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Technical Achievements</h3>
            <ul className="space-y-3 text-base">
              <li className="flex gap-4">
                <span className="text-accent font-bold">→</span>
                <span>Implemented adaptive FIR filtering algorithms achieving 45dB signal-to-noise improvement</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-bold">→</span>
                <span>Designed PCB for high-frequency RF frontend with impedance matching and noise reduction</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-bold">→</span>
                <span>Developed firmware in C/Assembly for ARM Cortex processor with real-time constraints</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-bold">→</span>
                <span>Created data visualization dashboard for signal analysis and system monitoring</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Impact</h3>
            <p className="text-base leading-relaxed text-foreground/85">
              Reduced signal acquisition latency by 60% and improved detection accuracy to 98.7%, enabling deployment in time-sensitive industrial automation environments. Published findings in IEEE signal processing workshop.
            </p>
          </div>
        </div>

        {/* Specs Sidebar */}
        <div className="lg:col-span-1 border-l-4 border-accent pl-6 space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">Duration</p>
            <p className="text-lg font-semibold">Jan 2023 — May 2024</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">Technologies</p>
            <div className="space-y-2">
              <span className="inline-block bg-primary text-accent px-3 py-1 text-sm font-medium mr-2 mb-2">DSP (ARM CMSIS)</span>
              <span className="inline-block bg-primary text-accent px-3 py-1 text-sm font-medium mr-2 mb-2">C/Assembly</span>
              <span className="inline-block bg-primary text-accent px-3 py-1 text-sm font-medium mr-2 mb-2">Altium Designer</span>
              <span className="inline-block bg-primary text-accent px-3 py-1 text-sm font-medium mr-2 mb-2">Python/MATLAB</span>
              <span className="inline-block bg-primary text-accent px-3 py-1 text-sm font-medium mr-2 mb-2">RF Design</span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">Team</p>
            <p className="text-sm text-foreground/75">3 Engineers + 1 Advisor</p>
          </div>

          <button className="w-full bg-accent text-accent-foreground px-4 py-3 font-semibold hover:opacity-90 transition-opacity">
            View Project Details
          </button>
        </div>
      </div>
    </section>
  )
}
