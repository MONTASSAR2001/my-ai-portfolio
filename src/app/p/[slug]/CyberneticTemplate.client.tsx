"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Terminal, Cpu, Zap, Mic, X, Sparkles } from "lucide-react";
import CommandPalette from "../../../components/CommandPalette";
import TLDRToggle from "../../../components/TLDRToggle";
import TimeAwareGreeting from "../../../components/TimeAwareGreeting";

// ─── Types ──────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string }
interface PortfolioRow {
  slug: string; name?: string; role?: string; email?: string
  summary?: string; skills?: string[]; experience?: ExpItem[]
  profile_image?: string | null
}

const CYBERNETIC_CSS = `
  .cybernetic-root {
    background-color: #05070a;
    color: oklch(0.97 0.01 220);
    font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  }
  .cybernetic-glass {
    background: linear-gradient(135deg, oklch(0.22 0.02 235 / 0.4), oklch(0.16 0.01 240 / 0.25));
    backdrop-filter: blur(20px) saturate(140%);
    border: 1px solid oklch(0.55 0.08 210 / 0.15);
    box-shadow: 0 8px 40px -12px oklch(0.5 0.2 210 / 0.15), inset 0 1px 0 0 oklch(1 0 0 / 0.05);
  }
  .cybernetic-glass-strong {
    background: linear-gradient(135deg, oklch(0.24 0.03 235 / 0.55), oklch(0.16 0.01 240 / 0.4));
    backdrop-filter: blur(24px) saturate(160%);
    border: 1px solid oklch(0.6 0.1 210 / 0.2);
    box-shadow: 0 12px 60px -12px oklch(0.5 0.25 210 / 0.25), inset 0 1px 0 0 oklch(1 0 0 / 0.06);
  }
  .cybernetic-neon-glow {
    box-shadow: 0 0 20px oklch(0.85 0.18 200 / 0.4), 0 0 40px oklch(0.85 0.18 200 / 0.2);
  }
  .cybernetic-text-neon {
    color: oklch(0.9 0.18 200);
    text-shadow: 0 0 20px oklch(0.85 0.18 200 / 0.5);
  }
  .cybernetic-grid-bg {
    background-image:
      linear-gradient(oklch(0.6 0.08 210 / 0.06) 1px, transparent 1px),
      linear-gradient(90deg, oklch(0.6 0.08 210 / 0.06) 1px, transparent 1px);
    background-size: 48px 48px;
  }
`;

// ─── Neural Skills Map Component ──────────────────────────────────────────────
function NeuralSkillsMap({ skills }: { skills?: string[] }) {
  const [active, setActive] = useState<string | null>("core1");
  
  const { centers, subs } = useMemo(() => {
    const defaultSkills = ["React", "Node.js", "Cloud", "Next.js", "Tailwind", "Framer Motion", "TypeScript", "tRPC", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes"];
    const s = skills?.length ? [...skills, ...defaultSkills] : defaultSkills;
    return {
      centers: [
        { id: "core1", label: s[0], x: 50, y: 30, group: "frontend" },
        { id: "core2", label: s[1], x: 25, y: 70, group: "backend" },
        { id: "core3", label: s[2], x: 78, y: 68, group: "infra" },
      ],
      subs: {
        core1: [
          { id: "sub1-1", label: s[3] || "Next.js", x: 22, y: 12, group: "frontend" },
          { id: "sub1-2", label: s[4] || "Tailwind", x: 78, y: 10, group: "frontend" },
          { id: "sub1-3", label: s[5] || "Framer", x: 82, y: 32, group: "frontend" },
          { id: "sub1-4", label: s[6] || "TypeScript", x: 40, y: 8, group: "frontend" },
        ],
        core2: [
          { id: "sub2-1", label: s[7] || "tRPC", x: 8, y: 55, group: "backend" },
          { id: "sub2-2", label: s[8] || "PostgreSQL", x: 10, y: 88, group: "backend" },
          { id: "sub2-3", label: s[9] || "Redis", x: 38, y: 92, group: "backend" },
        ],
        core3: [
          { id: "sub3-1", label: s[10] || "AWS", x: 92, y: 55, group: "infra" },
          { id: "sub3-2", label: s[11] || "Docker", x: 88, y: 88, group: "infra" },
          { id: "sub3-3", label: s[12] || "Kubernetes", x: 62, y: 92, group: "infra" },
        ]
      }
    };
  }, [skills]);

  const allNodes = useMemo(() => [...centers, ...Object.values(subs).flat()], [centers, subs]);
  const activeSubs = active ? subs[active as keyof typeof subs] ?? [] : [];
  const activeCenter = centers.find((c) => c.id === active);

  return (
    <div className="cybernetic-glass-strong relative aspect-[16/10] w-full overflow-hidden rounded-2xl p-6">
      <div className="absolute inset-0 cybernetic-grid-bg opacity-40" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-[oklch(0.7_0.2_200/0.15)] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[oklch(0.6_0.22_280/0.12)] blur-3xl" />

      <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.9 0.18 200)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.7 0.2 260)" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <AnimatePresence>
          {activeCenter &&
            activeSubs.map((sub) => (
              <motion.line
                key={`${activeCenter.id}-${sub.id}`}
                x1={`${activeCenter.x}%`}
                y1={`${activeCenter.y}%`}
                x2={`${sub.x}%`}
                y2={`${sub.y}%`}
                stroke="url(#edge)"
                strokeWidth={1.5}
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
        </AnimatePresence>

        {centers.map((a, i) =>
          centers.slice(i + 1).map((b) => (
            <line
              key={`${a.id}-${b.id}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="oklch(0.6 0.08 210 / 0.15)"
              strokeDasharray="3 6"
              strokeWidth={1}
            />
          ))
        )}
      </svg>

      {allNodes.map((n) => {
        const isCenter = centers.some((c) => c.id === n.id);
        const isActive = active === n.id;
        const isRelated = activeSubs.some((s) => s.id === n.id) || isActive;
        const dim = active && !isRelated && !isCenter ? 0.25 : 1;
        return (
          <motion.button
            key={n.id}
            onMouseEnter={() => isCenter && setActive(n.id)}
            onClick={() => isCenter && setActive(n.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
            style={{ left: `${n.x}%`, top: `${n.y}%`, zIndex: 2 }}
            animate={{ opacity: dim, scale: isActive ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`relative flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs backdrop-blur-md ${
                isCenter
                  ? "border border-[oklch(0.85_0.18_200/0.5)] bg-[oklch(0.2_0.03_235/0.7)] cybernetic-text-neon cybernetic-neon-glow"
                  : "border border-white/10 bg-[oklch(0.2_0.02_235/0.6)] text-white/80"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isCenter ? "bg-[oklch(0.9_0.18_200)]" : "bg-[oklch(0.7_0.1_210)]"
                }`}
              />
              {n.label}
              {isCenter && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-[oklch(0.85_0.18_200/0.4)]"
                  animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </div>
          </motion.button>
        );
      })}

      <div className="absolute bottom-4 left-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        Hover a core node · {activeCenter?.label ?? "—"}
      </div>
    </div>
  );
}

// ─── AI Assistant Widget ──────────────────────────────────────────────────────
function AIAssistantWidget({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(24).fill(8));

  useEffect(() => {
    if (!listening) {
      const t = setTimeout(() => setBars(Array(24).fill(8)), 0);
      return () => clearTimeout(t);
    }
    const id = setInterval(() => {
      setBars(Array.from({ length: 24 }, () => 8 + Math.random() * 36));
    }, 90);
    return () => clearInterval(id);
  }, [listening]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            className="cybernetic-glass-strong absolute bottom-20 right-0 w-[340px] overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.2_0.03_235)] border border-[oklch(0.85_0.18_200/0.4)]">
                  <Sparkles className="h-4 w-4 text-[oklch(0.9_0.18_200)]" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.18_200)] cybernetic-neon-glow" />
                </div>
                <div>
                  <div className="font-mono text-xs font-medium text-white">CYPHER.AI</div>
                  <div className="font-mono text-[10px] text-white/50">voice · v1.2</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-white/50 hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 px-4 py-4">
              <div className="rounded-xl border border-white/5 bg-black/30 p-3 font-mono text-xs text-white/50">
                Hey — I&apos;m {name}&apos;s voice-cloned agent. Ask me about projects, stack, or availability.
              </div>

              <div className="flex h-16 items-center justify-center gap-[3px] rounded-xl border border-white/5 bg-black/30 px-3">
                {bars.map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-[oklch(0.6_0.18_260)] to-[oklch(0.9_0.18_200)]"
                    animate={{ height: h }}
                    transition={{ duration: 0.09 }}
                    style={{ height: h }}
                  />
                ))}
              </div>

              <button
                onClick={() => setListening((v) => !v)}
                className={`group relative flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-mono text-xs uppercase tracking-widest transition ${
                  listening
                    ? "border-[oklch(0.85_0.18_200/0.6)] bg-[oklch(0.85_0.18_200/0.1)] cybernetic-text-neon cybernetic-neon-glow"
                    : "border-white/10 bg-white/[0.02] text-white/80 hover:border-[oklch(0.85_0.18_200/0.4)]"
                }`}
              >
                <Mic className="h-4 w-4" />
                {listening ? "Listening…" : "Hold to speak"}
                {listening && (
                  <motion.span
                    className="absolute inset-0 rounded-xl border border-[oklch(0.85_0.18_200/0.4)]"
                    animate={{ scale: [1, 1.05], opacity: [0.6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cybernetic-glass-strong group relative flex items-center gap-3 rounded-full px-5 py-3 cybernetic-neon-glow text-white"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.2_0.03_235)]">
          <Mic className="h-4 w-4 text-[oklch(0.9_0.18_200)]" />
          <motion.span
            className="absolute inset-0 rounded-full border border-[oklch(0.85_0.18_200/0.5)]"
            animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em]">
          Talk to my AI
        </span>
      </motion.button>
    </div>
  );
}

// ─── Main Template ────────────────────────────────────────────────────────────
export default function CyberneticTemplateClient({ p, isPreview }: { p: PortfolioRow; isPreview?: boolean }) {
  const [isTldr, setIsTldr] = useState(false);

  const name = p.name || p.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const email = p.email || `hi@${p.slug}.dev`;
  
  const summaryText = p.summary || "A systems-minded product engineer designing realtime tools, AI runtimes, and interfaces that feel alive.";
  const tldrSummary = summaryText.split(".")[0] + ".";

  const defaultExperience = [
    { title: "Synapse OS", company: "AI Runtime", duration: "2023", description: "Distributed inference layer with sub-100ms cold starts." },
    { title: "Prism.gg", company: "Realtime", duration: "2022", description: "Multiplayer canvas engine — 60fps at 10k concurrent peers." },
    { title: "Halcyon", company: "DevTools", duration: "2021", description: "Type-safe RPC framework adopted by 4k+ teams." },
  ];
  
  const experienceItems = p.experience?.length ? p.experience : defaultExperience;
  
  const displayExperience = isTldr 
    ? experienceItems.map(exp => ({ ...exp, description: exp.description ? `— ${exp.description.split(".")[0]}.` : "" }))
    : experienceItems;

  return (
    <div className="cybernetic-root relative min-h-screen overflow-hidden selection:bg-[oklch(0.85_0.18_200/0.3)] selection:text-white">
      <style>{CYBERNETIC_CSS}</style>

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 cybernetic-grid-bg opacity-30" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[oklch(0.6_0.2_210/0.15)] blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-[oklch(0.55_0.22_280/0.12)] blur-[120px]" />

      {!isPreview && <CommandPalette />}

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-mono text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[oklch(0.85_0.18_200/0.4)] bg-[oklch(0.2_0.03_235)] cybernetic-text-neon">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-wider uppercase text-white">{name.split(" ")[0]}<span className="cybernetic-text-neon">/</span>DEV</span>
        </div>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-[0.2em] text-white/50 md:flex">
          <a href="#work" className="hover:cybernetic-text-neon transition-colors">Work</a>
          <a href="#stack" className="hover:cybernetic-text-neon transition-colors">Stack</a>
          <a href="#about" className="hover:cybernetic-text-neon transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-4">
          <TLDRToggle isTldr={isTldr} setIsTldr={setIsTldr} />
          <a href="#" className="cybernetic-glass hidden sm:flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest hover:cybernetic-neon-glow transition-shadow text-white">
            <Github className="h-3.5 w-3.5" /> Source
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-block">
            <TimeAwareGreeting />
          </div>
          <br/>
          <div className="cybernetic-glass mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.18_200)] cybernetic-neon-glow" />
            {p.role || "Systems Engineer"}
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl text-white">
            {isTldr ? "Building" : "Crafting"} <span className="cybernetic-text-neon">cybernetic</span><br />
            interfaces for humans<br />
            <span className="text-white/40">& machines.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            {isTldr ? tldrSummary : summaryText}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="cybernetic-glass-strong flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-widest cybernetic-text-neon cybernetic-neon-glow text-white">
              View selected work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#stack" className="cybernetic-glass flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-widest text-white">
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
            <div key={s.v} className="cybernetic-glass rounded-xl p-5 text-white">
              <div className="font-mono text-3xl cybernetic-text-neon">{s.k}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills / Neural map */}
      <section id="stack" className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] cybernetic-text-neon">
              <Cpu className="mr-2 inline h-3 w-3" /> 02 · Neural Stack
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">
              Skills, wired as a network.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-white/50 md:block">
            Hover the illuminated core nodes — signal propagates to related sub-technologies.
          </p>
        </div>
        <NeuralSkillsMap skills={p.skills} />
      </section>

      {/* Projects */}
      <section id="work" className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-white">
        <div className="mb-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] cybernetic-text-neon">
            <Zap className="mr-2 inline h-3 w-3" /> 01 · Selected Work
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">Signals in the noise.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {displayExperience.map((exp, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="cybernetic-glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_200/0.6)] to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] cybernetic-text-neon">{exp.company}</span>
                <ArrowUpRight className="h-4 w-4 text-white/50 transition group-hover:cybernetic-text-neon" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{exp.title}</h3>
              <p className="mt-2 text-sm text-white/60">{exp.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] text-white/50">
                  {exp.duration || "Present"}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-12 text-white">
        <div className="cybernetic-glass-strong grid gap-8 rounded-3xl p-10 md:grid-cols-[1.4fr_1fr] md:p-14">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] cybernetic-text-neon">03 · Contact</div>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">
              Let&apos;s build something<br />that shouldn&apos;t exist yet.
            </h2>
            <p className="mt-4 max-w-md text-white/60">
              Or — just tap the widget below and talk to my voice-cloned agent. It knows my calendar, my rates, and (most of) my opinions.
            </p>
          </div>
          <div className="space-y-3 self-end">
            <a href={`mailto:${email}`} className="cybernetic-glass flex items-center justify-between rounded-xl p-4 hover:cybernetic-neon-glow transition-shadow">
              <span className="font-mono text-xs uppercase tracking-widest">{email}</span>
              <ArrowUpRight className="h-4 w-4 cybernetic-text-neon" />
            </a>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          <span>© {new Date().getFullYear()} {name}</span>
          <span>Runtime · online</span>
        </div>
      </section>

      <AIAssistantWidget name={name} />
    </div>
  );
}
