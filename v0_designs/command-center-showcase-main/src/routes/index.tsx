import { createFileRoute } from "@tanstack/react-router";
import { LiveCodeArena } from "@/components/LiveCodeArena";
import { TerminalEasterEgg } from "@/components/TerminalEasterEgg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "shock" | "highlight" | "electric" }) {
  const bg =
    tone === "shock" ? "var(--color-shock)"
    : tone === "highlight" ? "var(--color-highlight)"
    : tone === "electric" ? "var(--color-electric)"
    : "var(--color-background)";
  return (
    <span
      className="inline-flex items-center gap-1 border-[3px] border-foreground px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-foreground"
      style={{ background: bg }}
    >
      {children}
    </span>
  );
}

const PROJECTS = [
  { name: "packetgun", tag: "cli · rust", desc: "A weirdly fast HTTP load-tester with pretty flame charts.", accent: "shock" as const },
  { name: "inkwell", tag: "web · tsx", desc: "Distraction-free markdown editor with printable zines export.", accent: "highlight" as const },
  { name: "kernel.fm", tag: "audio · wasm", desc: "In-browser modular synth with a MIDI-first workflow.", accent: "electric" as const },
  { name: "orbit", tag: "infra · go", desc: "Tiny scheduler for background jobs on a single VPS.", accent: "shock" as const },
];

const STACK = ["TypeScript", "React", "Rust", "Go", "Postgres", "Vite", "TanStack", "WASM", "Tailwind", "Node"];

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      {/* MARQUEE STATUS BAR */}
      <div className="border-b-[3px] border-foreground bg-foreground text-background overflow-hidden">
        <div className="flex whitespace-nowrap py-1.5 font-mono text-xs uppercase tracking-widest animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-6 pr-6">
              <span>● status: available for contract work</span>
              <span>◆ ships/week: 4</span>
              <span>▲ coffee: 3 cups</span>
              <span>■ location: berlin / remote</span>
              <span>● uptime: 27y</span>
              <span>◆ press ⌘K to enter the mainframe</span>
              <span>▲ hire signal: strong</span>
              <span>■ latency: 12ms</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-30 border-b-[3px] border-foreground bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-display text-xl">
            <span className="inline-block h-6 w-6 border-[3px] border-foreground bg-[color:var(--color-shock)]" />
            AXL<span className="text-foreground/40">/</span>DEV
          </a>
          <nav className="hidden gap-1 md:flex">
            {["work", "stack", "log", "contact"].map((l) => (
              <a
                key={l}
                href={`#${l}`}
                className="border-[3px] border-transparent px-3 py-1.5 font-mono text-xs uppercase tracking-widest hover:border-foreground hover:bg-[color:var(--color-highlight)]"
              >
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hover-lift brutal-border bg-[color:var(--color-shock)] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-foreground brutal-shadow"
          >
            hire.me()
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* HERO */}
        <section className="grid grid-cols-12 gap-4 py-10 sm:py-16">
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <Chip tone="highlight">v4.2 — 2026</Chip>
              <Chip>senior · full-stack</Chip>
              <Chip tone="electric">open to work</Chip>
            </div>
            <h1 className="font-display text-[13vw] leading-[0.85] uppercase sm:text-[9rem]">
              HACKER
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">COMMAND</span>
                <span
                  className="absolute inset-x-0 bottom-2 -z-0 h-5 sm:h-8"
                  style={{ background: "var(--color-highlight)" }}
                />
              </span>
              <br />
              CENTER<span className="text-[color:var(--color-shock)]">.</span>
            </h1>
            <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-foreground/70 sm:text-base">
              I&apos;m <strong className="text-foreground">Axl Vega</strong> — a developer who builds tools that
              feel like proper machines. Sharp edges, loud borders, no
              round&nbsp;corners. Currently shipping open-source runtimes and small
              interfaces that punch above their weight class.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#arena"
                className="hover-lift brutal-border bg-foreground px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-background"
              >
                ▶ enter the arena
              </a>
              <a
                href="#work"
                className="hover-lift brutal-border bg-background px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest brutal-shadow"
              >
                cat ./projects
              </a>
            </div>
          </div>

          {/* SPEC CARD */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="brutal-border brutal-shadow-shock bg-card p-5">
              <div className="mb-3 flex items-center justify-between border-b-2 border-foreground pb-2 font-mono text-[11px] uppercase tracking-widest">
                <span>spec-sheet.txt</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-terminal)] animate-blink" />
                  live
                </span>
              </div>
              <dl className="space-y-2 font-mono text-sm">
                {[
                  ["role", "senior engineer"],
                  ["yrs.exp", "9"],
                  ["locale", "de-BER / remote"],
                  ["rate", "$$ / negotiable"],
                  ["mode", "async-first"],
                  ["typing.wpm", "112"],
                  ["fav.error", "SIGSEGV"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3 border-b border-dashed border-foreground/30 pb-1">
                    <dt className="text-foreground/60">{k}</dt>
                    <dd className="text-right font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-xs uppercase">
                <div className="brutal-border bg-[color:var(--color-highlight)] py-2">218<br /><span className="text-[10px]">PRs</span></div>
                <div className="brutal-border bg-[color:var(--color-electric)] py-2">47k<br /><span className="text-[10px]">⭐</span></div>
                <div className="brutal-border bg-[color:var(--color-shock)] py-2">12<br /><span className="text-[10px]">repos</span></div>
              </div>
            </div>
          </aside>
        </section>

        {/* LIVE CODE ARENA */}
        <section id="arena" className="pb-16">
          <SectionHeader
            index="01"
            title="Live Code Arena"
            subtitle="Type into the editor. The preview reacts. No, really — try changing the button label."
            tone="shock"
          />
          <LiveCodeArena />
        </section>

        {/* WORK */}
        <section id="work" className="pb-16">
          <SectionHeader
            index="02"
            title="Selected Work"
            subtitle="Small teams. Loud impact. Repos you can actually read."
            tone="highlight"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <article
                key={p.name}
                className={`brutal-border bg-card p-5 hover-lift ${
                  p.accent === "shock" ? "brutal-shadow-shock"
                  : p.accent === "highlight" ? "brutal-shadow-highlight"
                  : "brutal-shadow-electric"
                }`}
              >
                <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span className="text-foreground/60">// {p.tag}</span>
                  <Chip tone={p.accent}>open source</Chip>
                </div>
                <h3 className="font-display text-3xl uppercase leading-none">{p.name}</h3>
                <p className="mt-3 max-w-md font-mono text-sm text-foreground/70">{p.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex gap-3 font-mono text-xs text-foreground/60">
                    <span>★ {Math.floor(Math.random() * 8) + 2}k</span>
                    <span>⑃ {Math.floor(Math.random() * 400) + 60}</span>
                    <span>● maintained</span>
                  </div>
                  <a href="#" className="border-b-2 border-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--color-highlight)]">
                    read.me →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="pb-16">
          <SectionHeader
            index="03"
            title="Kit / Stack"
            subtitle="Tools I reach for before coffee kicks in."
            tone="electric"
          />
          <div className="brutal-border bg-card p-5 brutal-shadow">
            <div className="flex flex-wrap gap-2">
              {STACK.map((s, i) => (
                <span
                  key={s}
                  className="brutal-border px-3 py-1.5 font-mono text-sm font-bold uppercase"
                  style={{
                    background:
                      i % 4 === 0 ? "var(--color-highlight)"
                      : i % 4 === 1 ? "var(--color-shock)"
                      : i % 4 === 2 ? "var(--color-electric)"
                      : "var(--color-background)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* LOG */}
        <section id="log" className="pb-16">
          <SectionHeader
            index="04"
            title="Change Log"
            subtitle="git log --author=axl --since=recent"
            tone="highlight"
          />
          <div className="brutal-border bg-card font-mono text-sm">
            {[
              ["2026-06-24", "feat", "kernel.fm: added polyphonic voice router"],
              ["2026-05-11", "perf", "packetgun: 3.2× throughput on tokio 1.40"],
              ["2026-04-02", "docs", "inkwell: added zine template & printable CSS"],
              ["2026-02-18", "chore", "orbit: switched to sqlite WAL, 40% less latency"],
            ].map(([d, type, msg], i) => (
              <div key={i} className={`grid grid-cols-12 items-baseline gap-3 px-4 py-3 ${i !== 0 ? "border-t-2 border-foreground" : ""}`}>
                <span className="col-span-3 sm:col-span-2 text-foreground/60">{d}</span>
                <span
                  className="col-span-2 sm:col-span-1 border-2 border-foreground px-1 text-center text-[10px] font-bold uppercase"
                  style={{
                    background:
                      type === "feat" ? "var(--color-highlight)"
                      : type === "perf" ? "var(--color-shock)"
                      : type === "docs" ? "var(--color-electric)"
                      : "var(--color-background)",
                  }}
                >
                  {type}
                </span>
                <span className="col-span-12 sm:col-span-9">{msg}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pb-24">
          <SectionHeader
            index="05"
            title="Signal Boost"
            subtitle="If your project needs a sharp pair of hands."
            tone="shock"
          />
          <div className="brutal-border bg-foreground p-8 text-background brutal-shadow-highlight">
            <p className="font-display text-4xl uppercase leading-none sm:text-6xl">
              LET&apos;S SHIP
              <br />
              SOMETHING
              <span className="text-[color:var(--color-highlight)]"> LOUD.</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="mailto:hello@axl.dev"
                className="brutal-border bg-[color:var(--color-highlight)] px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-foreground hover-lift"
              >
                hello@axl.dev
              </a>
              <a
                href="#"
                className="brutal-border bg-background px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-foreground hover-lift"
              >
                /github
              </a>
              <span className="font-mono text-xs uppercase tracking-widest text-background/60">
                or type <kbd className="border-2 border-background/60 bg-background/10 px-1.5">HIRE</kbd> anywhere on this page ↩
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-[3px] border-foreground bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 font-mono text-[11px] uppercase tracking-widest text-foreground/60 sm:px-6">
          <span>© 2026 axl vega · handcrafted in tsx</span>
          <span>build 0x4A2C · no cookies · no trackers</span>
        </div>
      </footer>

      <TerminalEasterEgg />
    </div>
  );
}

function SectionHeader({
  index, title, subtitle, tone,
}: { index: string; title: string; subtitle: string; tone: "shock" | "highlight" | "electric" }) {
  const bg =
    tone === "shock" ? "var(--color-shock)"
    : tone === "highlight" ? "var(--color-highlight)"
    : "var(--color-electric)";
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b-[3px] border-foreground pb-3">
      <div className="flex items-end gap-4">
        <span
          className="brutal-border px-2 py-1 font-mono text-xs font-bold"
          style={{ background: bg }}
        >
          {index}
        </span>
        <h2 className="font-display text-3xl uppercase leading-none sm:text-5xl">{title}</h2>
      </div>
      <p className="hidden max-w-sm text-right font-mono text-xs text-foreground/60 sm:block">{subtitle}</p>
    </div>
  );
}
