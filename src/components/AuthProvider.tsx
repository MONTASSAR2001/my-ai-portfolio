"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser as supabase } from "@/lib/supabase";

/**
 * AuthProvider — global auth state listener.
 *
 * Handles two OAuth redirect scenarios:
 *  1. Authorization Code Flow → Supabase redirects to /auth/callback?code=...,
 *     the server-side route handler exchanges the code and redirects to /dashboard.
 *  2. Implicit Flow (fallback) → Supabase redirects to /#access_token=...,
 *     the browser lands on the home page with a hash fragment. We must detect this
 *     and redirect the user to /dashboard client-side.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // ── 1. Immediate hash detection on mount ────────────────────────────────
    // When Supabase uses the implicit flow it appends the access token to the
    // URL hash. We read the href (not just hash) so we catch it even if the
    // browser stripped the fragment before React hydrated.
    const href = typeof window !== "undefined" ? window.location.href : "";
    if (href.includes("access_token")) {
      // Don't push immediately – let Supabase parse the hash first (it happens
      // synchronously during the createClient call). The onAuthStateChange
      // listener below will fire SIGNED_IN and handle the redirect cleanly.
      // But as a safety net, also schedule an imperative replace:
      router.replace("/dashboard");
      return;
    }

    // ── 2. Auth state listener (covers both flows) ───────────────────────────
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) return;

      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      // If the user is already on the dashboard or a protected route, do nothing.
      if (currentPath.startsWith("/dashboard") || currentPath.startsWith("/p/")) {
        return;
      }

      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        // Covers:
        //  - Implicit flow: hash fragment on /
        //  - Code flow that didn't redirect properly
        //  - Normal email/password sign-in on /login or /signup
        router.replace("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps: register once, never re-register on pathname change.

  return <>{children}</>;
}
