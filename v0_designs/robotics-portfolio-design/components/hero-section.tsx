export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 md:px-8">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-background opacity-50"></div>
      
      {/* Futuristic glow elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent opacity-3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-block px-4 py-2 rounded-full border border-accent/30 bg-card/50 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-accent">Robotics Engineer • AI Researcher</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent/70">Intelligent Systems</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
          Designing and deploying cutting-edge autonomous systems, embedded robotics platforms, and AI-driven solutions that push the boundaries of what&apos;s possible in robotics and machine intelligence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:glow-accent-subtle">
            View My Work
          </button>
          <button className="px-8 py-3 border border-accent/50 text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all duration-300 hover:border-accent">
            Get In Touch
          </button>
        </div>

        {/* Tech stack */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['ROS', 'Python', 'C++', 'TensorFlow', 'PyTorch', 'CUDA', 'ARM', 'FPGA'].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs font-medium bg-card border border-border/50 rounded-full text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
