import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Terminal, Cpu, Zap } from "lucide-react";
import { NeuralSkillsMap } from "@/components/NeuralSkillsMap";
import { AIAssistantWidget } from "@/components/AIAssistantWidget";

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  { name: "Synapse OS", tag: "AI Runtime", desc: "Distributed inference layer with sub-100ms cold starts.", stack: ["Rust", "WASM", "K8s"] },
  { name: "Prism.gg", tag: "Realtime", desc: "Multiplayer canvas engine — 60fps at 10k concurrent peers.", stack: ["TypeScript", "WebRTC"] },
  { name: "Halcyon", tag: "DevTools", desc: "Type-safe RPC framework adopted by 4k+ teams.", stack: ["Node", "Zod", "OSS"] },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070a] text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[oklch(0.6_0.2_210/0.15)] blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-[oklch(0.55_0.22_280/0.12)] blur-[120px]" />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-mono text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[oklch(0.85_0.18_200/0.4)] bg-[oklch(0.2_0.03_235)] text-neon">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-wider">CYPHER<span className="text-neon">/</span>DEV</span>
        </div>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <a href="#work" className="hover:text-neon">Work</a>
          <a href="#stack" className="hover:text-neon">Stack</a>
          <a href="#about" className="hover:text-neon">About</a>
        </nav>
        <a href="#" className="glass flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest hover:neon-glow">
          <Github className="h-3.5 w-3.5" /> Source
        </a>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.18_200)] neon-glow" />
            Available Q3 · Remote
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Building <span className="text-neon">cybernetic</span><br />
            interfaces for humans<br />
            <span className="text-muted-foreground">& machines.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I'm Kai — a systems-minded product engineer designing realtime tools, AI runtimes, and interfaces that feel alive.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="glass-strong flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-widest text-neon neon-glow">
              View selected work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#stack" className="glass flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-widest">
              Explore stack
            </a>
          </div>
        </motion.div>

        {/* stat strip */}
        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { k: "08+", v: "Years shipping" },
            { k: "42", v: "OSS releases" },
            { k: "4.2k", v: "GitHub stars" },
            { k: "12ms", v: "Avg P50 latency" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-xl p-5">
              <div className="font-mono text-3xl text-neon">{s.k}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills / Neural map */}
      <section id="stack" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
              <Cpu className="mr-2 inline h-3 w-3" /> 02 · Neural Stack
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">
              Skills, wired as a network.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Hover the illuminated core nodes — signal propagates to related sub-technologies.
          </p>
        </div>
        <NeuralSkillsMap />
      </section>

      {/* Projects */}
      <section id="work" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
            <Zap className="mr-2 inline h-3 w-3" /> 01 · Selected Work
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">Signals in the noise.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_200/0.6)] to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon">{p.tag}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-neon" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-12">
        <div className="glass-strong grid gap-8 rounded-3xl p-10 md:grid-cols-[1.4fr_1fr] md:p-14">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">03 · Contact</div>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">
              Let's build something<br />that shouldn't exist yet.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Or — just tap the widget below and talk to my voice-cloned agent. It knows my calendar, my rates, and (most of) my opinions.
            </p>
          </div>
          <div className="space-y-3 self-end">
            <a href="mailto:hi@cypher.dev" className="glass flex items-center justify-between rounded-xl p-4 hover:neon-glow">
              <span className="font-mono text-xs uppercase tracking-widest">hi@cypher.dev</span>
              <ArrowUpRight className="h-4 w-4 text-neon" />
            </a>
            <a href="#" className="glass flex items-center justify-between rounded-xl p-4 hover:neon-glow">
              <span className="font-mono text-xs uppercase tracking-widest">Book intro call</span>
              <ArrowUpRight className="h-4 w-4 text-neon" />
            </a>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>© 2026 Cypher/Dev</span>
          <span>Runtime · online</span>
        </div>
      </section>

      <AIAssistantWidget />
    </div>
  );
}
