'use client';

export default function Header() {
  return (
    <header className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgb(0,255,136,.05)_25%,rgb(0,255,136,.05)_26%,transparent_27%,transparent_74%,rgb(0,255,136,.05)_75%,rgb(0,255,136,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgb(0,255,136,.05)_25%,rgb(0,255,136,.05)_26%,transparent_27%,transparent_74%,rgb(0,255,136,.05)_75%,rgb(0,255,136,.05)_76%,transparent_77%,transparent)] bg-[50px_50px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <div className="mb-6 inline-block">
          <div className="px-4 py-2 border border-accent/40 rounded-full text-accent text-sm font-mono hover:border-accent/80 transition-colors duration-300">
            &lt; Developer Portfolio /&gt;
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
          Alex <span className="text-accent">Chen</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
          Full-stack engineer crafting elegant solutions at the intersection of technology and design.
        </p>

        <p className="text-lg text-muted-foreground mb-12 font-mono">
          Building fast, scalable systems // TypeScript • React • Node.js • Cloud Architecture
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all duration-300 hover:scale-105">
            View My Work
          </button>
          <button className="px-8 py-3 border border-accent/40 text-accent rounded-lg font-semibold hover:border-accent hover:bg-accent/5 transition-all duration-300">
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-accent/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </header>
  );
}
