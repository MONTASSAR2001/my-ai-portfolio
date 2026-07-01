import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUSES = [
  "Compiling Next.js code...",
  "Reviewing PR #1284...",
  "Optimizing bundle size...",
  "Deploying to production...",
  "Refactoring auth module...",
  "Writing unit tests...",
];

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

export default function PulseWidget() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTime(formatTime(new Date())), 1000);
    const s = setInterval(() => setStatusIdx((i) => (i + 1) % STATUSES.length), 3800);
    return () => {
      clearInterval(t);
      clearInterval(s);
    };
  }, []);

  return (
    <div className="glass-strong flex items-center gap-3 rounded-full px-4 py-2 shadow-elegant">
      <div className="relative flex items-center">
        <span className="absolute inline-flex h-2 w-2 rounded-full bg-[color:var(--success)] opacity-75 animate-pulse-dot" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--success)]" />
      </div>
      <span className="font-mono text-xs text-foreground/90 tabular-nums">{time}</span>
      <span className="h-3 w-px bg-border/70" />
      <div className="min-w-[190px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={statusIdx}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="font-mono text-xs text-muted-foreground"
          >
            <span className="text-electric">Status:</span> {STATUSES[statusIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}