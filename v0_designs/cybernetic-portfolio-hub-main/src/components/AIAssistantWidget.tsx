import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Sparkles } from "lucide-react";

export function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(24).fill(8));

  useEffect(() => {
    if (!listening) {
      setBars(Array(24).fill(8));
      return;
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
            className="glass-strong absolute bottom-20 right-0 w-[340px] overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.2_0.03_235)] border border-[oklch(0.85_0.18_200/0.4)]">
                  <Sparkles className="h-4 w-4 text-[oklch(0.9_0.18_200)]" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.18_200)] neon-glow" />
                </div>
                <div>
                  <div className="font-mono text-xs font-medium text-foreground">CYPHER.AI</div>
                  <div className="font-mono text-[10px] text-muted-foreground">voice · v1.2</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 px-4 py-4">
              <div className="rounded-xl border border-white/5 bg-black/30 p-3 font-mono text-xs text-muted-foreground">
                Hey — I'm a voice-cloned agent. Ask me about projects, stack, or availability.
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
                    ? "border-[oklch(0.85_0.18_200/0.6)] bg-[oklch(0.85_0.18_200/0.1)] text-neon neon-glow"
                    : "border-white/10 bg-white/[0.02] text-foreground/80 hover:border-[oklch(0.85_0.18_200/0.4)]"
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
        className="glass-strong group relative flex items-center gap-3 rounded-full px-5 py-3 neon-glow"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.2_0.03_235)]">
          <Mic className="h-4 w-4 text-[oklch(0.9_0.18_200)]" />
          <motion.span
            className="absolute inset-0 rounded-full border border-[oklch(0.85_0.18_200/0.5)]"
            animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
          Talk to my AI
        </span>
      </motion.button>
    </div>
  );
}
