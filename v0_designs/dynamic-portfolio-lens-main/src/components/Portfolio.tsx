import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  Target,
  Award,
  Github,
  Linkedin,
  Mail,
  Terminal,
  GitBranch,
  Zap,
  Database,
  Sparkles,
} from "lucide-react";
import PulseWidget from "./PulseWidget";
import POVSwitcher, { type POV } from "./POVSwitcher";

const recruiterMetrics = [
  { label: "Revenue Impact", value: "$4.2M", detail: "Attributed ARR from shipped features", icon: TrendingUp },
  { label: "Team Leadership", value: "12", detail: "Engineers mentored across 3 orgs", icon: Users },
  { label: "On-time Delivery", value: "98%", detail: "Projects shipped within committed scope", icon: Target },
  { label: "Recognition", value: "3×", detail: "Company-wide excellence awards", icon: Award },
];

const developerMetrics = [
  { label: "Commits / yr", value: "2,847", detail: "Across 42 production repositories", icon: GitBranch },
  { label: "p99 Latency", value: "38ms", detail: "Payments API — down from 340ms", icon: Zap },
  { label: "Test Coverage", value: "94%", detail: "Weighted across critical services", icon: Terminal },
  { label: "Data Migrated", value: "1.4TB", detail: "Zero-downtime Postgres → CockroachDB", icon: Database },
];

const recruiterProjects = [
  {
    company: "Stripe",
    role: "Staff Engineer, Payments Platform",
    period: "2022 — Present",
    headline: "Led modernization of the merchant onboarding flow used by 4M+ businesses.",
    impact: [
      "Reduced merchant activation time by 62% — measured across cohorts of 100k merchants.",
      "Shipped adaptive KYC that lifted approval rate 14pp in emerging markets.",
      "Owned quarterly roadmap across 4 squads and 3 product managers.",
    ],
    stack: ["Product strategy", "Cross-functional leadership", "Compliance"],
  },
  {
    company: "Airbnb",
    role: "Senior Software Engineer, Trust",
    period: "2019 — 2022",
    headline: "Built the fraud detection surface that protects $80B+ in annual bookings.",
    impact: [
      "Cut chargeback rate 41% with a real-time risk scoring rollout.",
      "Mentored 8 engineers, 3 promoted to senior within 18 months.",
      "Represented engineering in weekly exec review with the CFO.",
    ],
    stack: ["Stakeholder communication", "Mentorship", "Executive reporting"],
  },
  {
    company: "Notion",
    role: "Software Engineer",
    period: "2017 — 2019",
    headline: "Early team member — grew engineering org from 6 to 40.",
    impact: [
      "Interviewed 200+ candidates; hired 22, retention rate 91%.",
      "Established the engineering onboarding program still used today.",
      "Delivered the block-editor rewrite that unlocked mobile launch.",
    ],
    stack: ["Hiring", "Process design", "Product craft"],
  },
];

const developerProjects = [
  {
    company: "Stripe",
    role: "Staff Engineer, Payments Platform",
    period: "2022 — Present",
    headline: "Rewrote the merchant onboarding state machine in Rust; ships 40k events/sec.",
    impact: [
      "Replaced legacy Ruby workflow with Rust + Temporal — p99 340ms → 38ms.",
      "Designed idempotent event sourcing over Kafka; 0 duplicate side-effects in 18 months.",
      "Authored RFC-0284: adaptive KYC scoring using online gradient boosting.",
    ],
    stack: ["Rust", "Temporal", "Kafka", "PostgreSQL", "gRPC"],
  },
  {
    company: "Airbnb",
    role: "Senior Software Engineer, Trust",
    period: "2019 — 2022",
    headline: "Built real-time fraud scoring on Flink — sub-100ms p95 at 200k RPS.",
    impact: [
      "Shipped feature store on ScyllaDB; 12x throughput vs previous Redis pipeline.",
      "Migrated 1.4TB from Postgres → CockroachDB with zero downtime.",
      "Open-sourced `frisk-rs`, a Rust crate for streaming risk features (1.2k ★).",
    ],
    stack: ["Flink", "Kotlin", "ScyllaDB", "Kubernetes", "Rust"],
  },
  {
    company: "Notion",
    role: "Software Engineer",
    period: "2017 — 2019",
    headline: "Co-authored the CRDT block engine powering collaborative editing.",
    impact: [
      "Designed the operational transform → CRDT migration path with zero doc corruption.",
      "Reduced cold-load JS bundle 340KB → 90KB via aggressive code-splitting.",
      "Wrote the reconciliation algorithm for offline-first mobile sync.",
    ],
    stack: ["TypeScript", "React", "CRDTs", "IndexedDB", "WebSockets"],
  },
];

export default function Portfolio() {
  const [pov, setPov] = useState<POV>("recruiter");
  const isRecruiter = pov === "recruiter";

  const metrics = isRecruiter ? recruiterMetrics : developerMetrics;
  const projects = isRecruiter ? recruiterProjects : developerProjects;

  return (
    <div className="relative min-h-screen overflow-hidden gradient-hero">
      {/* Ambient background flourishes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--electric), transparent 60%)" }}
        />
        <div
          className="absolute -right-40 top-[40%] h-[620px] w-[620px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--gold), transparent 60%)" }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <LayoutGroup>
        <Header pov={pov} setPov={setPov} />

        <main className="relative mx-auto max-w-7xl px-6 pb-32 pt-10 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pov}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Hero pov={pov} />
              <Metrics metrics={metrics} pov={pov} />
              <Projects projects={projects} pov={pov} />
              <Philosophy pov={pov} />
              <ContactCTA pov={pov} />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </LayoutGroup>
    </div>
  );
}

function Header({ pov, setPov }: { pov: POV; setPov: (v: POV) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl" style={{ background: "oklch(0.14 0.04 260 / 0.72)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-gold)" }}>
            <span className="font-display text-lg font-bold text-[color:var(--navy-deep)]">A</span>
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-semibold">Alex Chen</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Staff Engineer · SF</span>
          </div>
        </div>

        <POVSwitcher value={pov} onChange={setPov} />

        <div className="hidden lg:block">
          <PulseWidget />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl px-6 pb-3 lg:hidden">
        <PulseWidget />
      </div>
    </header>
  );
}

function Hero({ pov }: { pov: POV }) {
  const isRecruiter = pov === "recruiter";
  return (
    <section className="relative pt-16 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5">
          <Sparkles className="h-3 w-3 text-gold" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {isRecruiter ? "Available for Staff / Principal roles" : "Open to IC-heavy Staff+ roles"}
          </span>
        </div>

        <h1 className="font-display text-[3.2rem] font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {isRecruiter ? (
            <>
              I help engineering orgs<br />
              <span className="italic text-shimmer">turn strategy into shipped revenue.</span>
            </>
          ) : (
            <>
              I build systems that stay fast<br />
              <span className="italic" style={{ color: "var(--electric)" }}>at three orders of magnitude.</span>
            </>
          )}
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {isRecruiter
            ? "Ten years leading platform teams at Stripe, Airbnb, and Notion. I translate ambiguous product goals into predictable delivery, and I coach the engineers who make it happen."
            : "Ten years shipping distributed systems in Rust, Go, and TypeScript. I optimize for correctness, observability, and the boring kind of scalability that survives 3am incidents."}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]"
            style={{
              background: isRecruiter ? "var(--gradient-gold)" : "linear-gradient(135deg, var(--electric), oklch(0.6 0.2 250))",
              color: isRecruiter ? "var(--navy-deep)" : "white",
              boxShadow: isRecruiter ? "var(--shadow-glow-gold)" : "var(--shadow-glow-blue)",
            }}
          >
            {isRecruiter ? "Schedule an intro call" : "Read the technical brief"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href="#work" className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            {isRecruiter ? "Download resume (PDF)" : "See architecture write-ups"}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

type Metric = { label: string; value: string; detail: string; icon: React.ComponentType<{ className?: string }> };

function Metrics({ metrics, pov }: { metrics: Metric[]; pov: POV }) {
  return (
    <section className="grid grid-cols-1 gap-4 border-y border-border/40 py-10 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            className="group relative"
          >
            <div
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
              style={{ color: pov === "recruiter" ? "var(--gold)" : "var(--electric)" }}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="text-muted-foreground">{m.label}</span>
            </div>
            <div className="mt-3 font-display text-4xl font-light tracking-tight">{m.value}</div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{m.detail}</p>
          </motion.div>
        );
      })}
    </section>
  );
}

type Project = {
  company: string;
  role: string;
  period: string;
  headline: string;
  impact: string[];
  stack: string[];
};

function Projects({ projects, pov }: { projects: Project[]; pov: POV }) {
  const isRecruiter = pov === "recruiter";
  return (
    <section id="work" className="pt-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {isRecruiter ? "Selected engagements" : "Selected systems"}
          </div>
          <h2 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">
            {isRecruiter ? "Where I shipped outcomes." : "Where I shipped code."}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((p, i) => (
          <motion.article
            key={p.company}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.45 }}
            className="glass group relative overflow-hidden rounded-2xl p-8 transition-all hover:border-white/20"
          >
            <div
              className="absolute inset-y-0 left-0 w-1 opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: isRecruiter ? "var(--gradient-gold)" : "var(--electric)" }}
            />
            <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
              <div>
                <div className="font-display text-2xl font-medium">{p.company}</div>
                <div className="mt-1 text-sm text-muted-foreground">{p.role}</div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
                  {p.period}
                </div>
              </div>

              <div>
                <p className="text-lg font-light leading-snug text-foreground/95">{p.headline}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.impact.map((line) => (
                    <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: isRecruiter ? "var(--gold)" : "var(--electric)" }}
                      />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className={
                        isRecruiter
                          ? "rounded-full border border-border/60 bg-white/5 px-3 py-1 text-xs text-foreground/80"
                          : "rounded-md border border-border/60 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-foreground/80"
                      }
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Philosophy({ pov }: { pov: POV }) {
  const isRecruiter = pov === "recruiter";
  const items = isRecruiter
    ? [
        { title: "Ruthless prioritization", body: "Every quarter I cut 30% of the roadmap. The team ships faster and morale climbs." },
        { title: "Executive-ready communication", body: "I write one-page briefs a CFO can act on. Complexity is not a flex." },
        { title: "Grow the bench", body: "Two of my direct reports are now Directors. Leaders leave leaders behind." },
      ]
    : [
        { title: "Correctness over cleverness", body: "Boring, well-instrumented code beats the fancy abstraction that pages you at 3am." },
        { title: "Observability is a feature", body: "If it isn't in a trace, it doesn't exist. I ship dashboards with every service." },
        { title: "Own the migration path", body: "Every green-field system needs a documented, reversible cutover — before the RFC merges." },
      ];

  return (
    <section className="pt-24">
      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Operating principles</div>
      <h2 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">
        {isRecruiter ? "How I lead." : "How I engineer."}
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div
              className="mb-4 h-8 w-8 rounded-lg"
              style={{
                background: isRecruiter ? "var(--gradient-gold)" : "linear-gradient(135deg, var(--electric), transparent)",
              }}
            />
            <h3 className="font-display text-lg font-medium">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactCTA({ pov }: { pov: POV }) {
  const isRecruiter = pov === "recruiter";
  return (
    <section id="contact" className="mt-28">
      <div
        className="glass-strong relative overflow-hidden rounded-3xl p-10 sm:p-14"
      >
        <div
          className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
          style={{ background: isRecruiter ? "var(--gold)" : "var(--electric)" }}
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Next chapter</div>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              {isRecruiter
                ? "Let's talk about your Q1 hiring plan."
                : "Let's talk about the system you can't stop thinking about."}
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              {isRecruiter
                ? "I'm reviewing a small number of Staff / Principal roles for early 2026. Send a brief and I'll respond within 48 hours."
                : "Reach out with the tech stack, the constraints, and the failure mode you're most worried about. I'll come back with a written first-take."}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="mailto:alex@example.com" className="glass flex items-center justify-between rounded-xl px-5 py-4 transition-colors hover:border-white/25">
              <span className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /><span className="text-sm font-medium">alex@chen.dev</span></span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <a href="https://linkedin.com" className="glass flex items-center justify-between rounded-xl px-5 py-4 transition-colors hover:border-white/25">
              <span className="flex items-center gap-3"><Linkedin className="h-4 w-4 text-electric" /><span className="text-sm font-medium">in/alexchen</span></span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <a href="https://github.com" className="glass flex items-center justify-between rounded-xl px-5 py-4 transition-colors hover:border-white/25">
              <span className="flex items-center gap-3"><Github className="h-4 w-4" /><span className="font-mono text-sm">@alexchen</span></span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/40 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground sm:flex-row lg:px-10">
        <div className="font-mono">© 2026 Alex Chen · Crafted in San Francisco</div>
        <div className="flex items-center gap-2 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)]" />
          All systems operational
        </div>
      </div>
    </footer>
  );
}