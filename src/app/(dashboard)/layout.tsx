"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabaseBrowser as supabase } from "@/lib/supabase";

/* ─── Navigation config ─────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    id: "nav-hub",
    label: "Dashboard",
    moniker: "01",
    href: "/dashboard",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: "nav-portfolio",
    label: "Portfolio Builder",
    moniker: "02",
    href: "/dashboard/portfolio",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "nav-cv-maker",
    label: "AI CV Maker",
    moniker: "03",
    href: "/dashboard/cv-maker",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
];

/* ─── Sidebar animation variants ───────────────────────────────── */
const sidebarVariants = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const navItemVariants = {
  hidden: { x: -24, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Component ──────────────────────────────────────────────────── */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }
      setUserEmail(session.user.email ?? null);
      setAuthChecked(true);
    };
    checkSession();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  /* Loading state */
  if (!authChecked) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-obsidian)" }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Animated brand mark */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 40,
                height: 40,
                border: "1px solid var(--color-gold-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 700,
                color: "var(--color-gold)",
                letterSpacing: "0.1em",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              AI
            </div>
            <div
              style={{
                position: "absolute",
                inset: -4,
                border: "1px solid var(--color-gold-dim)",
                opacity: 0.3,
                animation: "spin 3s linear infinite",
              }}
            />
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-secondary)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Verifying session…
          </p>
        </div>
      </div>
    );
  }

  const userInitial = userEmail?.[0]?.toUpperCase() ?? "?";

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--color-obsidian)", color: "var(--color-text-primary)" }}
    >
      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="fixed left-0 top-0 bottom-0 z-40 flex flex-col"
        style={{
          width: 220,
          backgroundColor: "var(--color-void)",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: "1px solid var(--color-gold-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "var(--color-gold)",
                  letterSpacing: "0.05em",
                  flexShrink: 0,
                }}
              >
                AI
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  letterSpacing: "0.02em",
                }}
              >
                Portfolio
                <em style={{ color: "var(--color-gold)", fontStyle: "italic" }}>AI</em>
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--color-text-muted)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                paddingLeft: 38,
              }}
            >
              v2.0 — Studio
            </span>
          </Link>
        </div>

        {/* Horizontal rule accent */}
        <div style={{ padding: "16px 20px 0" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "var(--color-text-muted)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Navigation
          </span>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.id}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  id={item.id}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 10px",
                    textDecoration: "none",
                    position: "relative",
                    transition: "all 0.2s ease",
                    borderLeft: isActive ? "2px solid var(--color-gold)" : "2px solid transparent",
                    backgroundColor: isActive ? "rgba(201,168,76,0.05)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)";
                      (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--color-border-hi)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                    }
                  }}
                >
                  {/* Moniker */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: isActive ? "var(--color-gold)" : "var(--color-text-muted)",
                      letterSpacing: "0.1em",
                      flexShrink: 0,
                      width: 18,
                    }}
                  >
                    {item.moniker}
                  </span>
                  {/* Icon */}
                  <span style={{ color: isActive ? "var(--color-gold)" : "var(--color-text-muted)", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {/* Label */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Decorative divider line */}
        <div style={{ margin: "0 20px", height: 1, backgroundColor: "var(--color-border)" }} />

        {/* User section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{ padding: 12 }}
        >
          {/* User pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              border: "1px solid var(--color-border)",
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                border: "1px solid var(--color-gold-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 700,
                color: "var(--color-gold)",
                flexShrink: 0,
              }}
            >
              {userInitial}
            </div>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-text-primary)",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userEmail}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: "#4ade80",
                    display: "block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Sign out */}
          <button
            id="sign-out-btn"
            onClick={handleSignOut}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--color-text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textAlign: "left",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#f87171";
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(248,113,113,0.05)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </motion.div>
      </motion.aside>

      {/* ── Main content ─────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          marginLeft: 220,
          minHeight: "100vh",
          backgroundColor: "var(--color-obsidian)",
          position: "relative",
        }}
      >
        {children}
      </main>
    </div>
  );
}
