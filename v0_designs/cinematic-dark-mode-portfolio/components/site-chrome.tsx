export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl md:mx-6 lg:mx-auto">
        <a
          href="#"
          className="font-mono text-sm font-semibold tracking-widest text-white"
        >
          K—V
        </a>
        <div className="hidden items-center gap-8 sm:flex">
          {[
            ["Work", "#work"],
            ["Skills", "#skills"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/20"
        >
          Resume
        </a>
      </nav>
    </header>
  )
}

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl px-6 py-32 text-center md:px-12 lg:px-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[60%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, #4338ca 0%, transparent 55%), radial-gradient(circle at 70% 60%, #10b981 0%, transparent 55%)",
        }}
      />
      <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400/80">
        / LET&apos;S BUILD
      </p>
      <h2 className="mx-auto max-w-3xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
        Building the future, one model at a time.
      </h2>
      <a
        href="mailto:hello@kaelvoss.ai"
        className="mt-12 inline-block rounded-full bg-white px-8 py-4 text-sm font-medium text-[#05050A] transition-transform hover:scale-[1.03]"
      >
        hello@kaelvoss.ai
      </a>

      <footer className="mt-28 border-t border-white/10 pt-8 font-mono text-xs tracking-widest text-white/30">
        © 2026 KAEL VOSS — DESIGNED IN THE DARK
      </footer>
    </section>
  )
}
