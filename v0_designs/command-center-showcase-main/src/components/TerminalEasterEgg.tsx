import { useEffect, useRef, useState } from "react";

const LINES = [
  "> auth --user visitor --token ********",
  "> verifying handshake ..........",
  "> bypassing firewall .......... OK",
  "> ACCESS GRANTED.",
  "> Welcome to the VIP zone.",
  "",
  "$ whoami",
  "> guest_of_honor",
  "",
  "$ perks --list",
  "> [1] direct line: hello@axl.dev",
  "> [2] resume.pdf   → /downloads/axl.pdf",
  "> [3] source code  → github.com/axl",
  "",
  "// press ESC to exit the mainframe.",
];

export function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [buffer, setBuffer] = useState("");
  const timerRef = useRef<number | null>(null);

  // keyboard triggers: cmd+k, ctrl+k, or typing HIRE
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (open) return;
      // sequence detector
      if (/^[a-zA-Z]$/.test(e.key)) {
        setBuffer((b) => {
          const next = (b + e.key.toUpperCase()).slice(-4);
          if (next === "HIRE") {
            setOpen(true);
            return "";
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // typing animation
  useEffect(() => {
    if (!open) {
      setTyped([]);
      setCurrentLine("");
      return;
    }
    let lineIdx = 0;
    let charIdx = 0;
    const tick = () => {
      if (lineIdx >= LINES.length) return;
      const line = LINES[lineIdx];
      if (charIdx <= line.length) {
        setCurrentLine(line.slice(0, charIdx));
        charIdx++;
        timerRef.current = window.setTimeout(tick, 18 + Math.random() * 22);
      } else {
        setTyped((t) => [...t, line]);
        setCurrentLine("");
        lineIdx++;
        charIdx = 0;
        timerRef.current = window.setTimeout(tick, line === "" ? 60 : 180);
      }
    };
    tick();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [open]);

  return (
    <>
      {/* Ambient trigger hint — bottom-left */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open hidden terminal"
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 border-2 border-foreground bg-background px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/70 opacity-70 transition hover:opacity-100 hover:bg-[color:var(--color-highlight)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-terminal)] animate-blink" />
        press ⌘K · or type <span className="font-bold text-foreground">HIRE</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-term-in"
          style={{ background: "oklch(0 0 0 / 0.85)" }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden border-[3px] border-[color:var(--color-terminal)]"
            style={{
              background: "var(--color-terminal-bg)",
              boxShadow:
                "0 0 0 3px oklch(0 0 0), 12px 12px 0 3px var(--color-terminal), 0 0 60px oklch(0.6 0.2 145 / 0.35)",
            }}
          >
            {/* title bar */}
            <div className="flex items-center justify-between border-b-2 border-[color:var(--color-terminal)] px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-terminal)]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-[color:var(--color-terminal)]" />
                mainframe // vip.access.axl
              </div>
              <button
                onClick={() => setOpen(false)}
                className="border border-[color:var(--color-terminal)] px-2 py-0.5 text-[color:var(--color-terminal)] hover:bg-[color:var(--color-terminal)] hover:text-[color:var(--color-terminal-bg)]"
              >
                ESC
              </button>
            </div>

            {/* screen */}
            <div
              className="relative h-[60vh] max-h-[520px] overflow-hidden p-5 font-mono text-sm leading-relaxed text-[color:var(--color-terminal)]"
              style={{
                textShadow:
                  "0 0 6px oklch(0.88 0.24 145 / 0.7), 0 0 14px oklch(0.88 0.24 145 / 0.35)",
              }}
            >
              {typed.map((l, i) => (
                <div key={i}>{l || "\u00A0"}</div>
              ))}
              <div>
                {currentLine}
                <span className="ml-0.5 inline-block h-[1em] w-[0.6ch] translate-y-[2px] bg-[color:var(--color-terminal)] animate-blink" />
              </div>

              {/* scanlines */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, oklch(0 0 0 / 0.6) 3px, transparent 4px)",
                }}
              />
              {/* vignette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 55%, oklch(0 0 0 / 0.7) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
