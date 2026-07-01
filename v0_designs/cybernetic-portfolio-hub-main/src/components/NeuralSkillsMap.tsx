import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Node = { id: string; label: string; x: number; y: number; group: string };

const CENTERS: Node[] = [
  { id: "react", label: "React", x: 50, y: 30, group: "frontend" },
  { id: "node", label: "Node.js", x: 25, y: 70, group: "backend" },
  { id: "cloud", label: "Cloud", x: 78, y: 68, group: "infra" },
];

const SUBS: Record<string, Node[]> = {
  react: [
    { id: "nextjs", label: "Next.js", x: 22, y: 12, group: "frontend" },
    { id: "tailwind", label: "Tailwind", x: 78, y: 10, group: "frontend" },
    { id: "framer", label: "Framer Motion", x: 82, y: 32, group: "frontend" },
    { id: "ts", label: "TypeScript", x: 40, y: 8, group: "frontend" },
  ],
  node: [
    { id: "trpc", label: "tRPC", x: 8, y: 55, group: "backend" },
    { id: "postgres", label: "PostgreSQL", x: 10, y: 88, group: "backend" },
    { id: "redis", label: "Redis", x: 38, y: 92, group: "backend" },
  ],
  cloud: [
    { id: "aws", label: "AWS", x: 92, y: 55, group: "infra" },
    { id: "docker", label: "Docker", x: 88, y: 88, group: "infra" },
    { id: "k8s", label: "Kubernetes", x: 62, y: 92, group: "infra" },
  ],
};

export function NeuralSkillsMap() {
  const [active, setActive] = useState<string | null>("react");
  const allNodes = useMemo(() => [...CENTERS, ...Object.values(SUBS).flat()], []);
  const activeSubs = active ? SUBS[active] ?? [] : [];
  const activeCenter = CENTERS.find((c) => c.id === active);

  return (
    <div className="glass-strong relative aspect-[16/10] w-full overflow-hidden rounded-2xl p-6">
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* Ambient blobs */}
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

        {/* faint background connections between centers */}
        {CENTERS.map((a, i) =>
          CENTERS.slice(i + 1).map((b) => (
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
          )),
        )}
      </svg>

      {allNodes.map((n) => {
        const isCenter = CENTERS.some((c) => c.id === n.id);
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
                  ? "border border-[oklch(0.85_0.18_200/0.5)] bg-[oklch(0.2_0.03_235/0.7)] text-neon neon-glow"
                  : "border border-white/10 bg-[oklch(0.2_0.02_235/0.6)] text-foreground/80"
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

      <div className="absolute bottom-4 left-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Hover a core node · {activeCenter?.label ?? "—"}
      </div>
    </div>
  );
}
