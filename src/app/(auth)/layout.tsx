import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortfolioAI — Sign In",
  description: "Sign in to your PortfolioAI studio account.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-obsidian)",
        display: "flex",
        alignItems: "stretch",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Left editorial panel (desktop only) ─────────────── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "42%",
          flexShrink: 0,
          backgroundColor: "var(--color-void)",
          borderRight: "1px solid var(--color-border)",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 52px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vertical rule accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 52,
            width: 1,
            height: "100%",
            background: "linear-gradient(to bottom, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)",
            opacity: 0.4,
          }}
        />

        {/* Ghost text — large decorative numeral */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -20,
            right: -20,
            fontFamily: "var(--font-display)",
            fontSize: 280,
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(201,168,76,0.03)",
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.06em",
          }}
        >
          AI
        </div>

        {/* Top section */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: 40,
            }}
          >
            — Studio Access
          </div>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3vw, 42px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "var(--color-text-primary)",
              margin: "0 0 20px",
              maxWidth: 360,
              position: "relative",
              zIndex: 1,
            }}
          >
            Your creative studio awaits.
          </p>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-secondary)",
              lineHeight: 1.9,
              maxWidth: 320,
              position: "relative",
              zIndex: 1,
            }}
          >
            Build stunning portfolios and AI-crafted CVs in minutes. Sign in to access your tools.
          </p>
        </div>

        {/* Bottom section — testimonial */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: 28,
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 14,
              fontStyle: "italic",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              margin: "0 0 16px",
            }}
          >
            "Went from a raw PDF to a live portfolio in under two minutes. Absolutely incredible."
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                border: "1px solid var(--color-gold-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-gold)",
                fontWeight: 700,
              }}
            >
              S
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-primary)", margin: 0 }}>
                Sofia M.
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-text-muted)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                UX Designer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: form area ───────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 32px",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}
