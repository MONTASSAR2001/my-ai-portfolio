import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="snap-container bg-background text-foreground">
      <Nav />
      <Hero />
      <IndexSection />
      <TimeMachine />
      <ArchitectureFlow />
      <Closing />
    </main>
  );
}

/* ---------- NAV ---------- */

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference">
      <div className="flex items-center gap-2 text-mono text-xs tracking-widest uppercase">
        <span className="inline-block h-2 w-2 rounded-full bg-acid acid-glow" />
        Studio / Void
      </div>
      <nav className="hidden md:flex items-center gap-8 text-mono text-xs tracking-widest uppercase">
        <a href="#index" className="opacity-70 hover:opacity-100 transition">Index</a>
        <a href="#work" className="opacity-70 hover:opacity-100 transition">Work</a>
        <a href="#system" className="opacity-70 hover:opacity-100 transition">System</a>
        <a href="#contact" className="opacity-70 hover:opacity-100 transition">Contact</a>
      </nav>
      <div className="text-mono text-xs tracking-widest uppercase opacity-70">
        MMXXVI ©
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */

function Hero() {
  return (
    <section className="snap-section grain flex flex-col justify-between overflow-hidden">
      <div className="flex-1 flex items-center px-6 md:px-10 pt-32">
        <div className="w-full">
          <div className="text-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60 mb-6">
            <span className="text-acid">◆</span> Portfolio 2026 — Reel A
          </div>
          <h1 className="text-display text-[18vw] md:text-[14vw] leading-[0.82] tracking-tighter">
            Engineered
            <br />
            <span className="italic text-acid">cinema</span> for
            <br />
            the browser.
          </h1>
        </div>
      </div>

      <div className="border-t border-border grid grid-cols-2 md:grid-cols-4 text-mono text-xs">
        {[
          ["Discipline", "Interaction · Systems"],
          ["Based", "Berlin / Remote"],
          ["Available", "Q3 2026"],
          ["Scroll", "↓ 5 acts"],
        ].map(([k, v]) => (
          <div key={k} className="px-6 md:px-10 py-5 border-r border-border last:border-r-0">
            <div className="opacity-50 uppercase tracking-widest text-[10px] mb-1">{k}</div>
            <div className="text-foreground">{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- INDEX ---------- */

const PROJECTS = [
  { n: "01", name: "Aperture OS", tag: "Design system", year: "2026" },
  { n: "02", name: "Halcyon Terminal", tag: "Developer tools", year: "2025" },
  { n: "03", name: "Ferrous Bank", tag: "Fintech · Mobile", year: "2025" },
  { n: "04", name: "Meridian Atlas", tag: "3D mapping", year: "2024" },
  { n: "05", name: "Void Records", tag: "Editorial", year: "2024" },
];

function IndexSection() {
  return (
    <section id="index" className="snap-section flex flex-col px-6 md:px-10 pt-32 pb-10">
      <div className="text-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60 mb-10">
        <span className="text-acid">◆</span> 02 — Selected Index
      </div>
      <ul className="flex-1 flex flex-col justify-center divide-y divide-border">
        {PROJECTS.map((p, i) => (
          <motion.li
            key={p.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group grid grid-cols-12 items-baseline gap-4 py-6 md:py-8 cursor-pointer"
          >
            <span className="col-span-2 md:col-span-1 text-mono text-xs opacity-50">{p.n}</span>
            <span className="col-span-6 md:col-span-7 text-display text-4xl md:text-7xl leading-none transition-all duration-500 group-hover:translate-x-4 group-hover:text-acid">
              {p.name}
            </span>
            <span className="col-span-2 md:col-span-3 text-mono text-xs opacity-60 hidden md:block">{p.tag}</span>
            <span className="col-span-2 md:col-span-1 text-mono text-xs opacity-60 text-right">{p.year}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- TIME MACHINE SLIDER ---------- */

function TimeMachine() {
  const [pct, setPct] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, p)));
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => (draggingRef.current = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section id="work" className="snap-section flex flex-col px-6 md:px-10 pt-32 pb-10">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="text-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60 mb-3">
            <span className="text-acid">◆</span> 03 — Project Time-Machine
          </div>
          <h2 className="text-display text-5xl md:text-8xl leading-none">
            Aperture <span className="italic">OS</span>
          </h2>
          <p className="mt-3 max-w-md text-sm opacity-70">
            Drag the handle. Left is the wireframe scaffold at commit #001. Right is the shipped
            interface at commit #482.
          </p>
        </div>
        <div className="text-mono text-xs opacity-70 flex items-center gap-6">
          <span><span className="opacity-50">STATE</span> · {pct < 50 ? "SCAFFOLD" : "SHIPPED"}</span>
          <span><span className="opacity-50">REVEAL</span> · {Math.round(pct)}%</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 w-full rounded-xl overflow-hidden border border-border select-none touch-none"
        onPointerDown={(e) => {
          draggingRef.current = true;
          updateFromClientX(e.clientX);
        }}
      >
        {/* AFTER (right, base layer) */}
        <div className="absolute inset-0">
          <PolishedUI />
        </div>
        {/* BEFORE (left, clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <WireframeUI />
        </div>

        {/* Divider + handle */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: `${pct}%` }}
        >
          <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-acid acid-glow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <div className="h-14 w-14 rounded-full bg-background border border-acid acid-glow flex items-center justify-center cursor-ew-resize"
              onPointerDown={(e) => {
                e.stopPropagation();
                draggingRef.current = true;
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-acid">
                <path d="M9 6l-4 6 4 6M15 6l4 6-4 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-mono text-[10px] tracking-widest uppercase text-acid whitespace-nowrap">
              drag
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 text-mono text-[10px] tracking-widest uppercase bg-background/70 backdrop-blur px-2 py-1 rounded">
          Before · commit 001
        </div>
        <div className="absolute top-4 right-4 text-mono text-[10px] tracking-widest uppercase bg-background/70 backdrop-blur px-2 py-1 rounded">
          After · commit 482
        </div>
      </div>
    </section>
  );
}

function WireframeUI() {
  return (
    <div className="h-full w-full bg-[oklch(0.16_0.01_260)] text-bone/80 text-mono text-[11px] leading-relaxed p-6 overflow-hidden">
      <div className="grid grid-cols-12 gap-3 h-full">
        <div className="col-span-3 border border-dashed border-bone/25 rounded p-3 flex flex-col gap-2">
          <div className="text-[9px] uppercase opacity-50">nav</div>
          {["home", "index", "system", "contact"].map((x) => (
            <div key={x} className="h-6 border border-dashed border-bone/20 rounded flex items-center px-2 opacity-70">{x}</div>
          ))}
        </div>
        <div className="col-span-9 flex flex-col gap-3">
          <div className="border border-dashed border-bone/25 rounded p-3">
            <div className="text-[9px] uppercase opacity-50 mb-2">hero.tsx</div>
            <pre className="text-[10px] whitespace-pre-wrap opacity-80">{`<section className="hero">
  <h1>{title}</h1>
  <p>{lede}</p>
  <button>ship it</button>
</section>`}</pre>
          </div>
          <div className="grid grid-cols-3 gap-3 flex-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-dashed border-bone/25 rounded p-3">
                <div className="h-16 border border-dashed border-bone/20 mb-2 rounded" />
                <div className="h-2 w-2/3 bg-bone/20 mb-1 rounded" />
                <div className="h-2 w-1/2 bg-bone/15 rounded" />
              </div>
            ))}
          </div>
          <div className="border border-dashed border-bone/25 rounded p-2 text-[10px] opacity-60">
            {"// TODO: motion, palette, type scale"}
          </div>
        </div>
      </div>
    </div>
  );
}

function PolishedUI() {
  return (
    <div className="h-full w-full relative overflow-hidden" style={{
      background: "radial-gradient(ellipse at 20% 10%, oklch(0.28 0.05 260) 0%, oklch(0.14 0.01 260) 55%)"
    }}>
      <div className="absolute inset-0 grain" />
      <div className="relative h-full p-8 md:p-12 flex flex-col">
        <div className="flex items-center justify-between text-mono text-[10px] uppercase tracking-widest opacity-80">
          <span>Aperture OS</span>
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-acid acid-glow" /> live</span>
        </div>
        <div className="flex-1 flex items-center">
          <div>
            <div className="text-mono text-[10px] tracking-widest uppercase text-acid mb-3">v4.8 — Released</div>
            <div className="text-display text-5xl md:text-8xl leading-[0.85]">
              A camera <br /><span className="italic">for your</span> stack.
            </div>
            <div className="mt-6 flex gap-3">
              <div className="text-mono text-xs px-4 py-2 rounded-full bg-acid text-primary-foreground">Open studio →</div>
              <div className="text-mono text-xs px-4 py-2 rounded-full border border-border">Changelog</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-mono text-xs">
          {[["482", "commits"], ["36ms", "p50 render"], ["A+", "lighthouse"]].map(([v, k]) => (
            <div key={k} className="border-t border-border pt-3">
              <div className="text-display text-3xl md:text-4xl">{v}</div>
              <div className="opacity-60 uppercase tracking-widest text-[10px] mt-1">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- ARCHITECTURE FLOW ---------- */

type NodeKey = "client" | "edge" | "api" | "db";

const NODES: Record<NodeKey, { x: number; y: number; label: string; sub: string }> = {
  client: { x: 90, y: 220, label: "Frontend", sub: "React · Edge SSR" },
  edge:   { x: 340, y: 120, label: "Edge Fn", sub: "Auth · Cache" },
  api:    { x: 600, y: 220, label: "Backend", sub: "Server Fn · RPC" },
  db:     { x: 860, y: 220, label: "Database", sub: "Postgres · RLS" },
};

const PATH: NodeKey[] = ["client", "edge", "api", "db", "api", "client"];

function ArchitectureFlow() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const progress = useMotionValue(0);
  const x = useTransform(progress, (p) => {
    const seg = Math.floor(p);
    const t = p - seg;
    const a = NODES[PATH[seg]];
    const b = NODES[PATH[Math.min(seg + 1, PATH.length - 1)]];
    return a.x + (b.x - a.x) * t;
  });
  const y = useTransform(progress, (p) => {
    const seg = Math.floor(p);
    const t = p - seg;
    const a = NODES[PATH[seg]];
    const b = NODES[PATH[Math.min(seg + 1, PATH.length - 1)]];
    return a.y + (b.y - a.y) * t;
  });

  const simulate = async () => {
    if (running) return;
    setRunning(true);
    setStep(0);
    progress.set(0);
    for (let i = 0; i < PATH.length - 1; i++) {
      setStep(i);
      await animate(progress, i + 1, {
        duration: 0.75,
        ease: [0.65, 0, 0.35, 1],
      });

    }
    setStep(PATH.length - 1);
    setTimeout(() => {
      setRunning(false);
      setStep(-1);
    }, 600);
  };

  const activeNode = step >= 0 ? PATH[step] : null;

  return (
    <section id="system" className="snap-section flex flex-col px-6 md:px-10 pt-32 pb-10">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="text-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60 mb-3">
            <span className="text-acid">◆</span> 04 — Interactive Architecture
          </div>
          <h2 className="text-display text-5xl md:text-8xl leading-none">
            The <span className="italic">round-trip</span>.
          </h2>
          <p className="mt-3 max-w-md text-sm opacity-70">
            A single request, followed through the stack. Press simulate — the photon fires.
          </p>
        </div>
        <button
          onClick={simulate}
          disabled={running}
          className="text-mono text-xs uppercase tracking-widest px-5 py-3 rounded-full bg-acid text-primary-foreground acid-glow hover:opacity-90 transition disabled:opacity-50"
        >
          {running ? "· transmitting" : "▶ Simulate request"}
        </button>
      </div>

      <div className="flex-1 rounded-xl border border-border overflow-hidden relative bg-card grain">
        <svg viewBox="0 0 960 440" className="w-full h-full">
          <defs>
            <linearGradient id="wire" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.88 0.22 128)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="oklch(0.88 0.22 128)" stopOpacity="0.6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Grid */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={"v" + i} x1={i * 48} y1={0} x2={i * 48} y2={440} stroke="oklch(1 0 0 / 0.03)" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={"h" + i} x1={0} y1={i * 48} x2={960} y2={i * 48} stroke="oklch(1 0 0 / 0.03)" />
          ))}

          {/* Connections */}
          <Wire from={NODES.client} to={NODES.edge} />
          <Wire from={NODES.edge} to={NODES.api} />
          <Wire from={NODES.api} to={NODES.db} />

          {/* Nodes */}
          {(Object.entries(NODES) as [NodeKey, typeof NODES.client][]).map(([k, n]) => {
            const active = activeNode === k;
            return (
              <g key={k}>
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={active ? 46 : 36}
                  fill="oklch(0.18 0.01 260)"
                  stroke={active ? "oklch(0.88 0.22 128)" : "oklch(1 0 0 / 0.15)"}
                  strokeWidth={active ? 2 : 1}
                  animate={active ? { filter: "url(#glow)" } : {}}
                />
                <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-bone text-mono" style={{ fontSize: 11, letterSpacing: 1 }}>
                  {n.label.toUpperCase()}
                </text>
                <text x={n.x} y={n.y + 62} textAnchor="middle" className="fill-bone/60 text-mono" style={{ fontSize: 10 }}>
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Particle */}
        <AnimatePresence>
          {running && (
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: 0,
                top: 0,
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
                width: "0%",
                height: "0%",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ParticleSVG />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Log */}
        <div className="absolute bottom-4 left-4 right-4 text-mono text-[10px] uppercase tracking-widest opacity-70 flex gap-4 flex-wrap">
          <span className="text-acid">{running ? "◉ live" : "○ idle"}</span>
          <span>{activeNode ? `> ${activeNode} : ${NODES[activeNode].sub}` : "> awaiting input"}</span>
        </div>
      </div>
    </section>
  );
}

function Wire({ from, to }: { from: { x: number; y: number }; to: { x: number; y: number } }) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="url(#wire)"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
  );
}

function ParticleSVG() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: "translate(-30px,-30px)" }}>
      <defs>
        <radialGradient id="p">
          <stop offset="0%" stopColor="oklch(0.95 0.22 128)" stopOpacity="1" />
          <stop offset="40%" stopColor="oklch(0.88 0.22 128)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.88 0.22 128)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="28" fill="url(#p)" />
      <circle cx="30" cy="30" r="4" fill="oklch(0.98 0.03 128)" />
    </svg>
  );
}

/* ---------- CLOSING ---------- */

function Closing() {
  return (
    <section id="contact" className="snap-section flex flex-col px-6 md:px-10 pt-32 pb-8 grain">
      <div className="text-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60 mb-10">
        <span className="text-acid">◆</span> 05 — Coda
      </div>
      <div className="flex-1 flex items-center">
        <h2 className="text-display text-[14vw] md:text-[11vw] leading-[0.85]">
          Let's build
          <br />
          something <span className="italic text-acid">loud</span>.
        </h2>
      </div>
      <div className="border-t border-border grid grid-cols-2 md:grid-cols-4 text-mono text-xs">
        {[
          ["Email", "hello@studio-void.co"],
          ["Signal", "+49 · on request"],
          ["Studio", "Mitte, Berlin"],
          ["Return", "↑ top"],
        ].map(([k, v]) => (
          <div key={k} className="px-6 md:px-10 py-5 border-r border-border last:border-r-0">
            <div className="opacity-50 uppercase tracking-widest text-[10px] mb-1">{k}</div>
            <div className="text-foreground">{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
