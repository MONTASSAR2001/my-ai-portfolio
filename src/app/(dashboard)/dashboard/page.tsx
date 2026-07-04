"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import AntiGravityWrapper from "@/components/AntiGravityWrapper";

/* ─── Animation Variants ────────────────────────────────────────── */

// Header: text slices down from above
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -32, skewY: -2 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const subtextVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  },
};

// Card 1: slices in from top-left diagonally
const card1Variants: Variants = {
  hidden: { opacity: 0, x: -60, y: 40, skewX: -4, skewY: 2 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    skewX: 0,
    skewY: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
};

// Card 2: slices in from bottom-right diagonally
const card2Variants: Variants = {
  hidden: { opacity: 0, x: 60, y: -40, skewX: 4, skewY: -2 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    skewX: 0,
    skewY: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.7 },
  },
};

// Strip
const stripVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.0 },
  },
};

/* ─── Step Item ─────────────────────────────────────────────────── */
function StepItem({ index, label, accent }: { index: number; label: string; accent: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "7px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: accent,
          letterSpacing: "0.1em",
          flexShrink: 0,
          width: 16,
          opacity: 0.8,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-text-secondary)",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Page Component ────────────────────────────────────────────── */
export default function DashboardHubPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "52px 48px 48px",
        maxWidth: 1100,
        position: "relative",
      }}
    >
      {/* Ambient light bleed — top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -100,
          left: 180,
          width: 500,
          height: 400,
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Header ────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: 56 }}>
        <motion.div variants={headerVariants} initial="hidden" animate="visible">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 1,
                backgroundColor: "var(--color-gold)",
                opacity: 0.6,
              }}
            />
            Your Tools
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: 900,
              lineHeight: 1.05,
              margin: 0,
              color: "var(--color-text-primary)",
              maxWidth: 640,
            }}
          >
            What would you like to{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-gold)",
                WebkitTextStroke: "0.5px var(--color-gold-dim)",
              }}
            >
              build today?
            </em>
          </h1>
        </motion.div>

        <motion.p
          variants={subtextVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--color-text-secondary)",
            marginTop: 18,
            maxWidth: 480,
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          Choose a tool below. Build a live shareable portfolio from your CV, or craft a polished PDF resume through a smart AI conversation.
        </motion.p>
      </div>

      {/* ── Tool Cards — Asymmetric Layout ─────────────────────── */}
      <AntiGravityWrapper
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gridTemplateRows: "auto",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* ─ Card 1: Portfolio Builder (LARGE) ─────────────────── */}
        <motion.div variants={card1Variants} initial="hidden" animate="visible">
          <Link
            href="/dashboard/portfolio"
            id="hub-card-portfolio"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border-hi)",
              textDecoration: "none",
              padding: "40px 36px 36px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              // Intentionally taller — creates asymmetry
              minHeight: 420,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-gold-dim)";
              el.style.boxShadow = "var(--shadow-card), var(--shadow-gold)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-border-hi)";
              el.style.boxShadow = "var(--shadow-card)";
            }}
          >
            {/* Corner accent — top-left */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 32,
                height: 32,
                borderTop: "2px solid var(--color-gold)",
                borderLeft: "2px solid var(--color-gold)",
                opacity: 0.5,
                pointerEvents: "none",
              }}
            />
            {/* Corner accent — bottom-right */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 32,
                height: 32,
                borderBottom: "2px solid var(--color-gold)",
                borderRight: "2px solid var(--color-gold)",
                opacity: 0.2,
                pointerEvents: "none",
              }}
            />

            {/* Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                border: "1px solid var(--color-gold-dim)",
                padding: "4px 10px",
                marginBottom: 28,
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: "var(--color-gold)",
                  display: "block",
                  borderRadius: "50%",
                }}
              />
              Live Portfolio
            </div>

            {/* Number accent */}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 80,
                fontWeight: 900,
                lineHeight: 0.85,
                color: "rgba(201,168,76,0.07)",
                position: "absolute",
                top: 20,
                right: 28,
                userSelect: "none",
                pointerEvents: "none",
                letterSpacing: "-0.04em",
              }}
              aria-hidden="true"
            >
              01
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 12px",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                maxWidth: 320,
              }}
            >
              Build a Live Portfolio Website
            </h2>

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-text-secondary)",
                lineHeight: 1.85,
                marginBottom: 28,
                flex: 1,
                maxWidth: 380,
              }}
            >
              Upload your PDF CV. Our AI extracts your experience, skills, and projects — then generates a stunning, shareable portfolio at a custom URL.
            </p>

            {/* Steps */}
            <div style={{ marginBottom: 32 }}>
              {["Upload PDF CV", "AI extracts your data", "Pick theme & slug", "Share your live site"].map((step, i) => (
                <StepItem key={i} index={i} label={step} accent="var(--color-gold)" />
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--color-gold)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <span>Start building</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        </motion.div>

        {/* ─ Card 2: AI CV Maker (SMALLER, offset down) ─────────── */}
        <motion.div
          variants={card2Variants}
          initial="hidden"
          animate="visible"
          style={{ marginTop: 48 }} // vertical offset creates asymmetry
        >
          <Link
            href="/dashboard/cv-maker"
            id="hub-card-cv-maker"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border-hi)",
              textDecoration: "none",
              padding: "32px 28px 28px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              minHeight: 340,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-amber)";
              el.style.boxShadow = "var(--shadow-card), 0 0 40px rgba(232,185,106,0.12)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-border-hi)";
              el.style.boxShadow = "var(--shadow-card)";
            }}
          >
            {/* Corner accent */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 28,
                height: 28,
                borderTop: "2px solid var(--color-amber)",
                borderRight: "2px solid var(--color-amber)",
                opacity: 0.45,
                pointerEvents: "none",
              }}
            />

            {/* Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-amber)",
                border: "1px solid rgba(232,185,106,0.3)",
                padding: "4px 10px",
                marginBottom: 24,
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: "var(--color-amber)",
                  borderRadius: "50%",
                  display: "block",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              AI CV Maker — New
            </div>

            {/* Number accent */}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 0.85,
                color: "rgba(232,185,106,0.06)",
                position: "absolute",
                bottom: 16,
                right: 20,
                userSelect: "none",
                pointerEvents: "none",
                letterSpacing: "-0.04em",
              }}
              aria-hidden="true"
            >
              02
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 10px",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Chat Your Way to a Perfect CV
            </h2>

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-text-secondary)",
                lineHeight: 1.85,
                marginBottom: 24,
                flex: 1,
              }}
            >
              No CV? No problem. Our AI agent interviews you through a natural conversation, then generates a beautifully formatted, ATS-ready PDF.
            </p>

            <div style={{ marginBottom: 28 }}>
              {["Chat with AI agent", "Answer simple questions", "Choose a CV template", "Download your PDF CV"].map((step, i) => (
                <StepItem key={i} index={i} label={step} accent="var(--color-amber)" />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 600,
                color: "var(--color-amber)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <span>Start the interview</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        </motion.div>
      </AntiGravityWrapper>

      {/* ── Pro Tip Strip ───────────────────────────────────────── */}
      <motion.div
        variants={stripVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: 32,
          padding: "16px 20px",
          border: "1px solid var(--color-border)",
          borderLeft: "3px solid var(--color-gold-dim)",
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          backgroundColor: "rgba(201,168,76,0.02)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: 1, opacity: 0.7 }}
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--color-text-secondary)",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>Pro Tip — </span>
          Already have a CV? Use{" "}
          <strong style={{ color: "var(--color-text-primary)" }}>Portfolio Builder</strong>{" "}
          to go from PDF to a live site in under a minute. Starting fresh?{" "}
          <strong style={{ color: "var(--color-text-primary)" }}>AI CV Maker</strong>{" "}
          will guide you through everything.
        </p>
      </motion.div>
    </div>
  );
}
