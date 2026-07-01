import { useMemo, useState } from "react";

type Preset = {
  id: string;
  label: string;
  code: string;
  bg: string;
  text: string;
  radius: string;
  shadow: string;
  btnLabel: string;
};

const PRESETS: Preset[] = [
  {
    id: "shock",
    label: "shock.tsx",
    code: `export function CTA() {
  return (
    <button
      className="btn"
      style={{
        background: "#ff2e88",
        color: "#0a0a0a",
        border: "3px solid #0a0a0a",
        borderRadius: 0,
        boxShadow: "6px 6px 0 #0a0a0a",
        padding: "14px 22px",
        fontWeight: 800,
      }}
    >
      SHIP IT →
    </button>
  );
}`,
    bg: "var(--color-shock)",
    text: "#0a0a0a",
    radius: "0px",
    shadow: "6px 6px 0 #0a0a0a",
    btnLabel: "SHIP IT →",
  },
  {
    id: "highlight",
    label: "yellow.tsx",
    code: `export function CTA() {
  return (
    <button
      className="btn"
      style={{
        background: "#f5e400",
        color: "#0a0a0a",
        border: "3px solid #0a0a0a",
        borderRadius: 0,
        boxShadow: "6px 6px 0 #0a0a0a",
        padding: "14px 22px",
        fontWeight: 800,
      }}
    >
      DEPLOY.NOW()
    </button>
  );
}`,
    bg: "var(--color-highlight)",
    text: "#0a0a0a",
    radius: "0px",
    shadow: "6px 6px 0 #0a0a0a",
    btnLabel: "DEPLOY.NOW()",
  },
  {
    id: "electric",
    label: "cyan.tsx",
    code: `export function CTA() {
  return (
    <button
      className="btn soft"
      style={{
        background: "#7cc4ff",
        color: "#0a0a0a",
        border: "3px solid #0a0a0a",
        borderRadius: "999px",
        boxShadow: "6px 6px 0 #0a0a0a",
        padding: "14px 22px",
        fontWeight: 800,
      }}
    >
      hire(me)
    </button>
  );
}`,
    bg: "var(--color-electric)",
    text: "#0a0a0a",
    radius: "999px",
    shadow: "6px 6px 0 #0a0a0a",
    btnLabel: "hire(me)",
  },
];

// tiny syntax highlighter for TSX-ish snippets
function highlight(src: string) {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let html = escape(src);
  // strings
  html = html.replace(/(&quot;|&#39;|")([^"&\n]*)("|&quot;|&#39;)/g, (m) =>
    `<span style="color:var(--code-string)">${m}</span>`
  );
  html = html.replace(/(&quot;[^&]*?&quot;)/g, `<span style="color:var(--code-string)">$1</span>`);
  // comments
  html = html.replace(/(\/\/[^\n]*)/g, `<span style="color:var(--code-comment)">$1</span>`);
  // keywords
  html = html.replace(
    /\b(export|function|return|const|let|import|from|default)\b/g,
    `<span style="color:var(--code-keyword);font-weight:700">$1</span>`
  );
  // JSX tags
  html = html.replace(/(&lt;\/?)([A-Za-z][A-Za-z0-9]*)/g,
    `$1<span style="color:var(--code-fn)">$2</span>`);
  // props (identifier=)
  html = html.replace(/([A-Za-z_][A-Za-z0-9_]*)=/g,
    `<span style="color:var(--code-var)">$1</span>=`);
  return html;
}

export function LiveCodeArena() {
  const [activeId, setActiveId] = useState(PRESETS[0].id);
  const [customBtn, setCustomBtn] = useState<string | null>(null);

  const active = useMemo(
    () => PRESETS.find((p) => p.id === activeId) ?? PRESETS[0],
    [activeId]
  );

  const [editable, setEditable] = useState(active.code);

  // when preset switches, reset editable
  useMemo(() => {
    setEditable(active.code);
    setCustomBtn(null);
  }, [active.code]);

  // parse the button label live from the edited code
  const derivedLabel = useMemo(() => {
    const m = editable.match(/>\s*([^<>{}\n][^<>\n]*?)\s*</);
    return customBtn ?? (m ? m[1].trim() : active.btnLabel);
  }, [editable, customBtn, active.btnLabel]);

  return (
    <section className="brutal-border bg-card brutal-shadow-lg">
      {/* Title bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[3px] border-foreground bg-foreground px-4 py-2 text-background">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
          <span className="inline-block h-3 w-3 bg-[color:var(--color-shock)]" />
          <span className="inline-block h-3 w-3 bg-[color:var(--color-highlight)]" />
          <span className="inline-block h-3 w-3 bg-[color:var(--color-terminal)]" />
          <span className="ml-2">// live-code-arena / component.tsx</span>
        </div>
        <div className="flex gap-1">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`font-mono text-[11px] uppercase tracking-widest px-2 py-1 border-2 border-background ${
                p.id === activeId
                  ? "bg-[color:var(--color-highlight)] text-foreground"
                  : "bg-transparent text-background hover:bg-background hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* CODE PANE */}
        <div className="relative border-b-[3px] border-foreground lg:border-b-0 lg:border-r-[3px] bg-[#faf9f5]">
          <div className="flex items-center justify-between border-b border-foreground/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
            <span>editor · tsx</span>
            <span className="flex items-center gap-1 rounded-none border border-foreground bg-[color:var(--color-highlight)] px-2 py-0.5 text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-blink" />
              editable — click to type
            </span>
          </div>
          <div className="relative">
            {/* highlighted layer */}
            <pre
              aria-hidden
              className="pointer-events-none m-0 min-h-[360px] whitespace-pre p-4 font-mono text-[13px] leading-relaxed text-foreground"
              dangerouslySetInnerHTML={{ __html: highlight(editable) + "\n" }}
            />
            {/* transparent textarea overlay */}
            <textarea
              value={editable}
              onChange={(e) => setEditable(e.target.value)}
              spellCheck={false}
              className="absolute inset-0 h-full w-full resize-none bg-transparent p-4 font-mono text-[13px] leading-relaxed text-transparent caret-foreground outline-none"
            />
          </div>
        </div>

        {/* PREVIEW PANE */}
        <div className="relative flex flex-col">
          <div className="flex items-center justify-between border-b border-foreground/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
            <span>preview · localhost:∞</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-terminal)]" />
              live
            </span>
          </div>
          <div
            className="relative flex flex-1 items-center justify-center p-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(0.13 0 0 / 0.06) 1px, transparent 1px),linear-gradient(to bottom, oklch(0.13 0 0 / 0.06) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            <button
              type="button"
              onClick={() => setCustomBtn(`clicked ${Math.floor(Math.random() * 999)}×`)}
              style={{
                background: active.bg,
                color: active.text,
                border: "3px solid var(--color-foreground)",
                borderRadius: active.radius,
                boxShadow: active.shadow,
                padding: "14px 22px",
                fontWeight: 800,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
              }}
              className="text-sm uppercase transition-transform active:translate-x-[3px] active:translate-y-[3px]"
            >
              {derivedLabel}
            </button>
            <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              renders on keystroke
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
