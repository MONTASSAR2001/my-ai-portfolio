export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column: Name and tagline */}
        <div className="lg:col-span-1 border-b-4 border-accent pb-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            Alex<br />Chen
          </h1>
          <p className="text-lg text-accent font-medium tracking-wide mb-6">
            Electronics & Communications
          </p>
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">
            Engineer
          </p>
        </div>

        {/* Right column: Bio */}
        <div className="lg:col-span-2">
          <div className="space-y-6 text-base leading-relaxed">
            <p>
              I am a dedicated Electronic and Communications Engineer with a passion for designing and implementing innovative solutions in embedded systems, signal processing, and network infrastructure. My expertise spans hardware design, firmware development, and systems integration.
            </p>
            <p>
              With a background in telecommunications and digital signal processing, I specialize in bringing complex technical concepts to life through rigorous engineering and practical problem-solving. I thrive in collaborative environments where cutting-edge technology meets thoughtful design principles.
            </p>
            <p className="text-muted-foreground text-sm">
              Currently exploring opportunities in IoT systems, 5G applications, and advanced sensor technologies.
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex gap-6 text-sm">
            <a href="#" className="text-accent hover:underline font-medium">GitHub</a>
            <a href="#" className="text-accent hover:underline font-medium">LinkedIn</a>
            <a href="#" className="text-accent hover:underline font-medium">Email</a>
          </div>
        </div>
      </div>
    </section>
  )
}
