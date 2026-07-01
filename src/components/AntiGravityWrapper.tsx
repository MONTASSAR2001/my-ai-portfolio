"use client";

/**
 * AntiGravityWrapper
 * ──────────────────────────────────────────────────────────────────
 * Wraps children and, when activated, detaches each child from the
 * normal document flow and makes it float freely around the viewport
 * with randomised, continuously-looping framer-motion animations.
 *
 * Usage:
 *   <AntiGravityWrapper>
 *     <SomeCard />
 *     <AnotherCard />
 *   </AntiGravityWrapper>
 */

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Children,
} from "react";
import {
  motion,
  useAnimationControls,
  type AnimationControls,
} from "framer-motion";

/* ─── tuneable constants ──────────────────────────────────────────── */
const DRIFT_DURATION_MIN = 3.5;   // seconds per target
const DRIFT_DURATION_MAX = 7;
const MAX_DRIFT_X        = 320;   // px from origin
const MAX_DRIFT_Y        = 260;
const MAX_ROTATION       = 35;    // deg
const RESTORE_DURATION   = 0.9;   // spring snap-back

/* ─── helpers ─────────────────────────────────────────────────────── */
const rand  = (min: number, max: number) => Math.random() * (max - min) + min;
const randS = (range: number) => (Math.random() < 0.5 ? -1 : 1) * rand(range * 0.3, range);

/** Kick off an infinite async drift loop for one child element. */
async function driftLoop(
  controls: AnimationControls,
  isCancelledRef: React.MutableRefObject<boolean>
) {
  while (!isCancelledRef.current) {
    const target = {
      x:      randS(MAX_DRIFT_X),
      y:      randS(MAX_DRIFT_Y),
      rotate: randS(MAX_ROTATION),
      scale:  rand(0.9, 1.08),
    };
    const duration = rand(DRIFT_DURATION_MIN, DRIFT_DURATION_MAX);

    await controls.start({
      ...target,
      transition: {
        duration,
        ease: "easeInOut",
      },
    });

    // If framer-motion resolves immediately (e.g. unmounted), bail out.
    if (isCancelledRef.current) break;

    // Tiny pause at each target for the "weightless" feeling.
    await new Promise<void>((r) => setTimeout(r, rand(200, 600)));
  }
}

/* ─── single floating child wrapper ──────────────────────────────── */
interface FloatingChildProps {
  children: React.ReactNode;
  isZeroGravity: boolean;
  /** Screen-space origin captured just before zero-G activated. */
  origin: { top: number; left: number; width: number; height: number } | null;
}

function FloatingChild({ children, isZeroGravity, origin }: FloatingChildProps) {
  const controls     = useAnimationControls();
  const cancelledRef = useRef(false);
  const wrapperRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isZeroGravity && origin) {
      cancelledRef.current = false;
      // Teleport to fixed coords matching original position, then drift.
      controls.set({ x: 0, y: 0, rotate: 0, scale: 1 });
      driftLoop(controls, cancelledRef);
    } else {
      // Cancel loop and snap back.
      cancelledRef.current = true;
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 160,
          damping: 22,
          duration: RESTORE_DURATION,
        },
      });
    }

    return () => {
      cancelledRef.current = true;
    };
  }, [isZeroGravity, origin, controls]);

  if (!isZeroGravity || !origin) {
    // Normal layout rendering — motion.div is invisible overhead.
    return (
      <motion.div ref={wrapperRef} style={{ display: "contents" }} animate={controls}>
        {children}
      </motion.div>
    );
  }

  // Zero-G: lift out of flow with position:fixed at captured origin.
  return (
    <motion.div
      ref={wrapperRef}
      animate={controls}
      style={{
        position: "fixed",
        top:      origin.top,
        left:     origin.left,
        width:    origin.width,
        height:   origin.height,
        zIndex:   9000,
        cursor:   "grab",
        // Prevent layout collapse of the parent slot.
        pointerEvents: "auto",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── main wrapper ────────────────────────────────────────────────── */
interface AntiGravityWrapperProps {
  children: React.ReactNode;
  /** Optional className forwarded to the outer container. */
  className?: string;
  /** Optional inline style forwarded to the outer container. */
  style?: React.CSSProperties;
}

export default function AntiGravityWrapper({
  children,
  className,
  style,
}: AntiGravityWrapperProps) {
  const [isZeroGravity, setIsZeroGravity] = useState(false);
  const [origins, setOrigins]             = useState<
    Array<{ top: number; left: number; width: number; height: number } | null>
  >([]);
  const childRefs = useRef<Array<HTMLDivElement | null>>([]);
  const childArray = Children.toArray(children);

  /** Capture every child’s bounding box, then flip zero-G on. */
  const activate = useCallback(() => {
    const rects = childRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top, left: r.left, width: r.width, height: r.height };
    });
    setOrigins(rects);
    setIsZeroGravity(true);
  }, []);

  const deactivate = useCallback(() => {
    setIsZeroGravity(false);
    // Keep origins a moment so FloatingChild can animate back from its
    // fixed position before we clear.
    setTimeout(() => setOrigins([]), (RESTORE_DURATION + 0.15) * 1000);
  }, []);

  const toggle = useCallback(() => {
    if (isZeroGravity) deactivate();
    else activate();
  }, [isZeroGravity, activate, deactivate]);

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      {/* ── children ─────────────────────────────────────────────── */}
      {childArray.map((child, i) => {
        const isActive = isZeroGravity && !!origins[i];

        return (
          <React.Fragment key={i}>
            {/*
              Slot div: always stays in the layout grid.
              - Normal mode:   renders the child inside, ref captures size.
              - Zero-G mode:   renders an invisible size-matched placeholder
                               so the grid column doesn't collapse while the
                               real child floats fixed above the viewport.
            */}
            <div
              ref={(el) => { childRefs.current[i] = el; }}
              style={{
                // Keep exact dimensions for the grid placeholder.
                minHeight: isActive && origins[i] ? origins[i]!.height : undefined,
              }}
            >
              {!isActive && child}
            </div>

            {/* The floating clone — rendered into a portal-like fixed layer */}
            {isActive && (
              <FloatingChild
                isZeroGravity={true}
                origin={origins[i] ?? null}
              >
                {child}
              </FloatingChild>
            )}
          </React.Fragment>
        );
      })}

      {/* ── control button ────────────────────────────────────────── */}
      <AntiGravityButton isActive={isZeroGravity} onToggle={toggle} />
    </div>
  );
}

/* ─── button ──────────────────────────────────────────────────────── */
function AntiGravityButton({
  isActive,
  onToggle,
}: {
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      id="anti-gravity-btn"
      onClick={onToggle}
      title={isActive ? "Restore Gravity" : "Disable Gravity — chaos incoming"}
      /* ── layout position ── */
      style={{
        position:    "fixed",
        bottom:      28,
        right:       28,
        zIndex:      9999,
        cursor:      "pointer",
        /* ── brutalist base style ── */
        fontFamily:  '"JetBrains Mono", "Fira Code", monospace',
        fontSize:    11,
        fontWeight:  700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        padding:     "11px 20px",
        borderRadius: 0,
        border:       isActive
          ? "1px solid rgba(232, 185, 106, 0.8)"
          : "1px solid rgba(201, 168, 76, 0.35)",
        background:  isActive
          ? "rgba(201, 168, 76, 0.08)"
          : "rgba(10, 10, 12, 0.92)",
        color:        isActive ? "#E8B96A" : "#6A6A7A",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow:   isActive
          ? "0 0 24px rgba(201,168,76,0.25), inset 0 0 12px rgba(201,168,76,0.05)"
          : "0 4px 24px rgba(0,0,0,0.6)",
        userSelect:  "none",
        /* framer-motion handles transitions */
        overflow:    "hidden",
      }}
      /* ── framer-motion micro-animations ── */
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      animate={
        isActive
          ? {
              // Pulsing glow when active
              boxShadow: [
                "0 0 16px rgba(201,168,76,0.2), inset 0 0 8px rgba(201,168,76,0.04)",
                "0 0 36px rgba(201,168,76,0.45), inset 0 0 20px rgba(201,168,76,0.10)",
                "0 0 16px rgba(201,168,76,0.2), inset 0 0 8px rgba(201,168,76,0.04)",
              ],
            }
          : { boxShadow: "0 4px 24px rgba(0,0,0,0.6)" }
      }
      transition={
        isActive
          ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
    >
      {/* ── label with swap animation ── */}
      <motion.span
        key={isActive ? "restore" : "disable"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22 }}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        {/* Icon */}
        {isActive ? (
          /* Arrow-down (restore) */
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        ) : (
          /* Warning triangle */
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )}
        {isActive ? "RESTORE GRAVITY" : "WARNING: DISABLE GRAVITY"}
      </motion.span>

      {/* ── scan-line shimmer overlay when active ── */}
      {isActive && (
        <motion.span
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
        />
      )}
    </motion.button>
  );
}
