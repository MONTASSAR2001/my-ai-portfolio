"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { supabaseBrowser as supabase } from "@/lib/supabase";

/* ─── Animation Variants ────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ─── Styled input component ────────────────────────────────────── */
function FormField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  rightElement,
  accentLabel,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete: string;
  required?: boolean;
  rightElement?: React.ReactNode;
  accentLabel?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div variants={itemVariants}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <label
          htmlFor={id}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: focused ? "var(--color-gold)" : "var(--color-text-secondary)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            transition: "color 0.2s ease",
          }}
        >
          {label}
        </label>
        {accentLabel}
      </div>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: "13px 16px",
            paddingRight: rightElement ? 44 : 16,
            backgroundColor: focused ? "rgba(201,168,76,0.03)" : "var(--color-surface)",
            border: `1px solid ${focused ? "var(--color-gold-dim)" : "var(--color-border-hi)"}`,
            borderRadius: 0,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--color-text-primary)",
            outline: "none",
            transition: "border-color 0.2s ease, background-color 0.2s ease",
            boxSizing: "border-box",
          }}
        />
        {rightElement && (
          <div
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-muted)",
            }}
          >
            {rightElement}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Page Component ────────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: "100%", maxWidth: 400 }}
    >
      {/* Brand mark */}
      <motion.div
        variants={itemVariants}
        style={{ marginBottom: 44 }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                border: "1px solid var(--color-gold-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 700,
                color: "var(--color-gold)",
                letterSpacing: "0.05em",
              }}
            >
              AI
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 16,
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              Portfolio<em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>AI</em>
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Heading */}
      <motion.div variants={itemVariants} style={{ marginBottom: 36 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ display: "inline-block", width: 20, height: 1, backgroundColor: "var(--color-gold)" }} />
          Studio Access
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 900,
            color: "var(--color-text-primary)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Welcome back.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--color-text-secondary)",
            marginTop: 10,
            lineHeight: 1.7,
          }}
        >
          Sign in to access your portfolio tools.
        </p>
      </motion.div>

      {/* Form */}
      <form id="login-form" onSubmit={handleLogin}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <FormField
            id="login-email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <FormField
            id="login-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            autoComplete="current-password"
            required
            accentLabel={
              <a
                href="#"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "var(--color-gold-dim)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-gold)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-gold-dim)"; }}
              >
                Forgot?
              </a>
            }
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "var(--color-text-muted)" }}
              >
                {showPassword ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            }
          />

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              id="login-error"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "12px 14px",
                border: "1px solid rgba(248,113,113,0.3)",
                borderLeft: "3px solid #f87171",
                backgroundColor: "rgba(248,113,113,0.05)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#fca5a5", margin: 0, lineHeight: 1.6 }}>
                {error}
              </p>
            </motion.div>
          )}

          {/* Submit */}
          <motion.div variants={itemVariants}>
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px 20px",
                marginTop: 4,
                backgroundColor: isLoading ? "var(--color-surface-2)" : "var(--color-gold)",
                border: "1px solid",
                borderColor: isLoading ? "var(--color-border-hi)" : "var(--color-gold)",
                borderRadius: 0,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: isLoading ? "var(--color-text-muted)" : "var(--color-obsidian)",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-amber)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-amber)";
                }
              }}
              onMouseLeave={e => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-gold)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-gold)";
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Authenticating…
                </>
              ) : (
                <>
                  Sign In
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </form>

      {/* Divider */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          margin: "28px 0",
        }}
      >
        <div style={{ flex: 1, height: 1, backgroundColor: "var(--color-border)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-text-muted)", letterSpacing: "0.2em" }}>
          OR
        </span>
        <div style={{ flex: 1, height: 1, backgroundColor: "var(--color-border)" }} />
      </motion.div>

      {/* Google Button */}
      <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "14px 20px",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border-hi)",
            borderRadius: 0,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-text-primary)",
            cursor: isLoading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => {
            if (!isLoading) {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-surface-2)";
            }
          }}
          onMouseLeave={e => {
            if (!isLoading) {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-surface)";
            }
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </motion.button>
      </motion.div>

      {/* Sign up link */}
      <motion.p
        variants={itemVariants}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-text-muted)",
          textAlign: "center",
          margin: 0,
        }}
      >
        No account?{" "}
        <Link
          href="/signup"
          style={{
            color: "var(--color-gold)",
            textDecoration: "none",
            fontWeight: 600,
            letterSpacing: "0.05em",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-amber)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-gold)"; }}
        >
          Create one free →
        </Link>
      </motion.p>

      {/* Back link */}
      <motion.div
        variants={itemVariants}
        style={{ textAlign: "center", marginTop: 24 }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--color-text-muted)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>
      </motion.div>
    </motion.div>
  );
}
