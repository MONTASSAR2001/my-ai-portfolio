import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="snap-y-mandatory h-screen overflow-y-scroll overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <Manifesto />
      <TimeMachine />
      <Architecture />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
      <div className="text-sm font-medium tracking-[0.3em] text-white">ATELIER<sup>®</sup></div>
      <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-white/80">
        <a href="#work">Work</a>
        <a href="#process">Process</a>
        <a href="#system">System</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="text-xs tracking-widest text-white/60">EST. 2019 — NYC</div>
    </nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="snap-start relative h-screen w-full flex flex-col justify-end overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <motion.div style={{ y, opacity }} className="px-6 md:px-12 pb-20">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.4em] uppercase text-primary mb-8">— A Cinematic Digital Studio</motion.div>
        <h1 className="text-hero text-[clamp(4rem,16vw,20rem)] text-foreground">
          <motion.span initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="block">Craft</motion.span>
          <motion.span initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="block italic text-primary">in motion.</motion.span>
        </h1>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="max-w-md text-sm md:text-base text-muted-foreground">
            We design story-driven interfaces for brands who refuse to blend in. Every pixel considered, every millisecond earned.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="flex items-center gap-3 text-xs tracking-widest uppercase text-muted-foreground">
            <span className="inline-block w-8 h-px bg-primary animate-pulse" /> Scroll to enter
          </motion.div>
        </div>
      </motion.div>
      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
    </section>
  );
}

function Manifesto() {
  const words = "We believe interfaces should feel inevitable — as if they could have existed no other way.".split(" ");
  return (
    <section id="process" className="snap-start relative h-screen w-full flex items-center px-6 md:px-16">
      <div className="max-w-6xl">
        <div className="text-xs tracking-[0.4em] uppercase text-primary mb-10">§ 01 — Manifesto</div>
        <p className="text-hero text-[clamp(2rem,6vw,6rem)] leading-[1.05]">
          {words.map((w, i) => (
            <motion.span key={i}
              initial={{ opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="inline-block mr-[0.25em]">
              {w === "inevitable" ? <em className="text-primary">{w}</em> : w}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}

// ─────────────────── Project Time-Machine Slider ───────────────────
function TimeMachine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(x);
    };
    const up = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <section id="work" className="snap-start relative h-screen w-full flex flex-col justify-center px-6 md:px-16 py-16">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="text-xs tracking-[0.4em] uppercase text-primary mb-4">§ 02 — Project Time-Machine</div>
          <h2 className="text-hero text-[clamp(2.5rem,7vw,7rem)]">Drag through <em className="text-primary">time.</em></h2>
        </div>
        <div className="text-xs tracking-widest uppercase text-muted-foreground max-w-xs">
          Nova Finance — Rebrand & Product 2024. Slide the handle to travel from wireframe to shipped UI.
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-[16/8] max-h-[62vh] rounded-2xl overflow-hidden border border-border select-none cursor-ew-resize"
        onMouseDown={(e) => { dragging.current = true; updateFromClientX(e.clientX); }}
        onTouchStart={(e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX); }}
      >
        {/* AFTER — polished UI (base layer) */}
        <PolishedUI />

        {/* BEFORE — wireframe (clipped) */}
        <div className="absolute inset-0 bg-[oklch(0.12_0.005_260)]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <WireframeUI />
        </div>

        {/* Divider line + handle */}
        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-primary shadow-[0_0_20px_var(--glow)]" />
          <motion.div
            animate={{ scale: dragging.current ? 1.1 : 1 }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_40px_var(--glow)] pointer-events-none"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
            </svg>
          </motion.div>
          <div className="absolute -top-8 -translate-x-1/2 text-[10px] tracking-widest uppercase text-primary font-mono">{Math.round(pos)}%</div>
        </div>

        {/* labels */}
        <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest uppercase text-white/60 bg-black/40 backdrop-blur px-2 py-1 rounded">◄ Wireframe · Day 03</div>
        <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest uppercase text-white/60 bg-black/40 backdrop-blur px-2 py-1 rounded">Shipped · Day 47 ►</div>
      </div>
    </section>
  );
}

function WireframeUI() {
  return (
    <div className="w-full h-full p-6 md:p-10 font-mono text-xs text-primary/70 grid grid-cols-12 gap-3 auto-rows-min">
      <div className="col-span-12 flex justify-between border-b border-dashed border-primary/30 pb-3 mb-2">
        <span>[ LOGO ]</span>
        <span>· nav · nav · nav · [cta]</span>
      </div>
      <div className="col-span-7 border border-dashed border-primary/40 h-40 flex items-center justify-center">{"<Headline h1 />"}</div>
      <div className="col-span-5 border border-dashed border-primary/40 h-40 flex items-center justify-center">{"<HeroChart />"}</div>
      <div className="col-span-4 border border-dashed border-primary/40 h-24 flex items-center justify-center">card_01</div>
      <div className="col-span-4 border border-dashed border-primary/40 h-24 flex items-center justify-center">card_02</div>
      <div className="col-span-4 border border-dashed border-primary/40 h-24 flex items-center justify-center">card_03</div>
      <div className="col-span-12 mt-2 text-[10px] opacity-60">// TODO: replace lorem, wire portfolio API, refine spacing tokens</div>
    </div>
  );
}

function PolishedUI() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[oklch(0.18_0.05_40)] via-[oklch(0.12_0.02_260)] to-[oklch(0.08_0.01_260)] p-6 md:p-10 flex flex-col">
      <div className="flex justify-between items-center text-xs">
        <span className="font-display italic text-lg text-primary">Nova.</span>
        <div className="flex gap-6 text-white/70 tracking-widest uppercase text-[10px]">
          <span>Markets</span><span>Vaults</span><span>Docs</span>
          <span className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground">Launch app</span>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-7 flex flex-col justify-center">
          <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Portfolio · Q3</div>
          <div className="font-display text-4xl md:text-6xl leading-[0.95] text-white">Yield, <em className="text-primary">reimagined</em>.</div>
          <div className="mt-4 text-xs text-white/60 max-w-sm">Automated vaults with institutional-grade risk. Deposit once, compound forever.</div>
          <div className="mt-6 flex gap-3">
            <div className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium">Deposit →</div>
            <div className="px-4 py-2 rounded-full border border-white/20 text-white text-xs">View vaults</div>
          </div>
        </div>
        <div className="col-span-5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur p-4 flex flex-col">
          <div className="flex justify-between text-[10px] text-white/60"><span>Total Value</span><span className="text-primary">+12.4%</span></div>
          <div className="font-display text-3xl text-white mt-1">$248,930</div>
          <svg viewBox="0 0 200 80" className="mt-4 flex-1">
            <defs>
              <linearGradient id="ln" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.85 0.18 85)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.85 0.18 85)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,60 C30,55 40,30 70,35 C100,40 120,10 150,18 C170,23 185,8 200,12 L200,80 L0,80 Z" fill="url(#ln)" />
            <path d="M0,60 C30,55 40,30 70,35 C100,40 120,10 150,18 C170,23 185,8 200,12" fill="none" stroke="oklch(0.85 0.18 85)" strokeWidth="1.5" />
          </svg>
          <div className="grid grid-cols-3 gap-2 mt-3 text-[10px]">
            {["ETH", "BTC", "SOL"].map((s, i) => (
              <div key={s} className="rounded bg-white/5 p-2">
                <div className="text-white/50">{s}</div>
                <div className="text-white">{["42%", "31%", "27%"][i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── Interactive Architecture Flow ───────────────────
function Architecture() {
  const [firing, setFiring] = useState(false);
  const [stage, setStage] = useState<null | "frontend" | "backend" | "database" | "return">(null);
  const progress = useMotionValue(0);

  // Path key points (in SVG coords, viewBox 1000x400)
  const nodes = {
    fe: { x: 150, y: 200 },
    be: { x: 500, y: 200 },
    db: { x: 850, y: 200 },
  };

  const simulate = async () => {
    if (firing) return;
    setFiring(true);
    setStage("frontend");
    const a1 = animate(progress, 0.5, { duration: 1.1, ease: "easeInOut", onUpdate: (v) => {
      if (v > 0.15 && v < 0.45) setStage("backend");
    }});
    await a1;
    setStage("database");
    await new Promise((r) => setTimeout(r, 400));
    setStage("return");
    const a2 = animate(progress, 1, { duration: 1.1, ease: "easeInOut" });
    await a2;
    setStage(null);
    progress.set(0);
    setFiring(false);
  };

  // particle position along path: 0→0.5 = FE→DB, 0.5→1 = DB→FE
  const cx = useTransform(progress, (p) => {
    if (p <= 0.5) {
      const t = p / 0.5;
      return nodes.fe.x + (nodes.db.x - nodes.fe.x) * t;
    }
    const t = (p - 0.5) / 0.5;
    return nodes.db.x - (nodes.db.x - nodes.fe.x) * t;
  });
  const cy = useTransform(progress, (p) => {
    // slight arc on the return trip
    if (p <= 0.5) return 200;
    const t = (p - 0.5) / 0.5;
    return 200 - Math.sin(t * Math.PI) * 60;
  });

  return (
    <section id="system" className="snap-start relative h-screen w-full flex flex-col justify-center px-6 md:px-16 py-16">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <div className="text-xs tracking-[0.4em] uppercase text-primary mb-4">§ 03 — Interactive Architecture</div>
          <h2 className="text-hero text-[clamp(2.5rem,7vw,7rem)]">The <em className="text-primary">signal</em> path.</h2>
        </div>
        <button
          onClick={simulate}
          disabled={firing}
          className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium shadow-[0_0_40px_var(--glow)] disabled:opacity-70 transition"
        >
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-primary-foreground ${firing ? "animate-ping" : ""}`} />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground" />
          </span>
          {firing ? "Transmitting…" : "Simulate request"}
        </button>
      </div>

      <div className="relative w-full rounded-2xl border border-border bg-[oklch(0.11_0.006_260)] overflow-hidden">
        <svg viewBox="0 0 1000 400" className="w-full h-auto">
          <defs>
            <radialGradient id="particleGlow">
              <stop offset="0%" stopColor="oklch(0.95 0.2 85)" stopOpacity="1" />
              <stop offset="40%" stopColor="oklch(0.85 0.18 85)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="oklch(0.85 0.18 85)" stopOpacity="0" />
            </radialGradient>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.85 0.18 85 / 0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1000" height="400" fill="url(#grid)" />

          {/* Connection lines */}
          <line x1={nodes.fe.x} y1={nodes.fe.y} x2={nodes.be.x} y2={nodes.be.y} stroke="oklch(0.85 0.18 85 / 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1={nodes.be.x} y1={nodes.be.y} x2={nodes.db.x} y2={nodes.db.y} stroke="oklch(0.85 0.18 85 / 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Nodes */}
          <ArchNode x={nodes.fe.x} y={nodes.fe.y} label="Frontend" sub="React · Edge" active={stage === "frontend" || stage === "return"} />
          <ArchNode x={nodes.be.x} y={nodes.be.y} label="Backend" sub="Server Fn" active={stage === "backend"} />
          <ArchNode x={nodes.db.x} y={nodes.db.y} label="Database" sub="Postgres" active={stage === "database"} />

          {/* Traveling particle */}
          <AnimatePresence>
            {firing && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.circle cx={cx} cy={cy} r={36} fill="url(#particleGlow)" />
                <motion.circle cx={cx} cy={cy} r={6} fill="oklch(0.98 0.05 85)" />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* status ticker */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between text-[11px] font-mono tracking-wider">
          <div className="flex gap-6 text-muted-foreground">
            <span>REQ_ID: <span className="text-primary">0x8f2a…c14e</span></span>
            <span>LATENCY: <span className="text-foreground">{firing ? "…" : "24ms"}</span></span>
            <span>REGION: <span className="text-foreground">iad1</span></span>
          </div>
          <div className="text-primary uppercase">
            {stage === "frontend" && "→ dispatching from client"}
            {stage === "backend" && "→ validating on edge"}
            {stage === "database" && "→ querying postgres"}
            {stage === "return" && "← returning payload"}
            {!stage && "◦ idle · awaiting signal"}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchNode({ x, y, label, sub, active }: { x: number; y: number; label: string; sub: string; active: boolean }) {
  return (
    <g>
      <motion.circle
        cx={x} cy={y} r={70}
        fill="oklch(0.14 0.01 260)"
        stroke={active ? "oklch(0.85 0.18 85)" : "oklch(0.25 0.01 260)"}
        strokeWidth={active ? 2 : 1}
        animate={{ filter: active ? "drop-shadow(0 0 24px oklch(0.85 0.18 85 / 0.8))" : "drop-shadow(0 0 0px transparent)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.circle
        cx={x} cy={y} r={70}
        fill="none"
        stroke="oklch(0.85 0.18 85)"
        strokeWidth={1}
        initial={{ opacity: 0, scale: 1 }}
        animate={active ? { opacity: [0.6, 0], scale: [1, 1.6] } : { opacity: 0 }}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <text x={x} y={y - 4} textAnchor="middle" className="fill-foreground" style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontStyle: "italic" }}>{label}</text>
      <text x={x} y={y + 18} textAnchor="middle" className="fill-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>{sub}</text>
    </g>
  );
}

function Footer() {
  return (
    <section id="contact" className="snap-start relative h-screen w-full flex flex-col justify-between px-6 md:px-16 py-16" style={{ background: "var(--gradient-hero)" }}>
      <div className="text-xs tracking-[0.4em] uppercase text-primary">§ 04 — Let's talk</div>
      <div>
        <h2 className="text-hero text-[clamp(3rem,14vw,16rem)]">
          Say <em className="text-primary">hello.</em>
        </h2>
        <a href="mailto:studio@atelier.co" className="inline-block mt-6 text-lg md:text-2xl underline underline-offset-8 decoration-primary/60 hover:decoration-primary transition">studio@atelier.co</a>
      </div>
      <div className="flex justify-between text-xs tracking-widest uppercase text-muted-foreground">
        <span>© 2026 Atelier Studio</span>
        <span>Brooklyn · Lisbon · Kyoto</span>
      </div>
    </section>
  );
}
