import Image from "next/image"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 md:px-12 lg:px-20">
      {/* Ambient grid / vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(67,56,202,0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: typography */}
        <div className="order-2 lg:order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-xl">
            <span className="animate-pulse-dot size-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs tracking-widest text-white/60">
              AVAILABLE FOR 2026
            </span>
          </div>

          <h1 className="text-balance text-6xl font-bold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Kael
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-white to-emerald-300 bg-clip-text text-transparent">
              Voss
            </span>
          </h1>

          <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-white/50">
            AI Engineer architecting autonomous systems, neural inference
            pipelines, and human-grade reasoning at the edge of research and
            product.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-full bg-white px-7 py-3 text-sm font-medium text-[#05050A] transition-transform hover:scale-[1.03]"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white/80 backdrop-blur-xl transition-colors hover:bg-white/10"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Right: avatar with aura */}
        <div className="relative order-1 flex items-center justify-center lg:order-2">
          {/* Massive blurred radial aura */}
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[120%] max-w-[640px] rounded-full opacity-70 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #4338ca 0%, transparent 55%), radial-gradient(circle at 70% 70%, #10b981 0%, transparent 55%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[80%] max-w-[440px] rounded-full opacity-60 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)",
            }}
          />

          <div className="relative aspect-square w-64 overflow-hidden rounded-full border border-white/10 shadow-2xl sm:w-80 lg:w-96">
            <Image
              src="/avatar.png"
              alt="Portrait of Kael Voss"
              fill
              priority
              sizes="(max-width: 1024px) 320px, 384px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-white/30">
        SCROLL TO EXPLORE
      </div>
    </section>
  )
}
