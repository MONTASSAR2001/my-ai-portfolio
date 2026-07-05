"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser as supabase } from "@/lib/supabase";

/**
 * AuthProvider — global OAuth redirect interceptor + auth state listener.
 *
 * Handles all three scenarios that can occur after Google OAuth:
 *
 *  A. PKCE code flow (correct):
 *     Supabase → Google → https://…/auth/callback?code=…
 *     The server Route Handler exchanges the code and redirects to /dashboard.
 *     This works without any client-side intervention.
 *
 *  B. PKCE code flow, but Supabase dashboard "Site URL" overrides redirectTo:
 *     Supabase → Google → https://…/?code=…   ← WRONG, lands on root page
 *     We intercept the ?code= param here and forward to /auth/callback ourselves.
 *
 *  C. Implicit flow (legacy fallback):
 *     Supabase → Google → https://…/#access_token=…
 *     We detect the hash and let Supabase's own JS parse it, then catch
 *     the resulting SIGNED_IN event and redirect to /dashboard.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const search = window.location.search;   // "?code=abc&state=xyz"
    const hash   = window.location.hash;     // "#access_token=..."
    const path   = window.location.pathname; // e.g. "/"

    // ── Scenario B: ?code= landed on the wrong page ─────────────────────────
    // Supabase should have sent the browser to /auth/callback, but the project's
    // "Site URL" setting redirected it here instead. Forward immediately so the
    // server Route Handler can do the code→session exchange.
    if (search.includes("code=") && !path.startsWith("/auth/callback")) {
      router.replace("/auth/callback" + search);
      return; // Stop here — the server handler will redirect to /dashboard.
    }

    // ── Scenario C: #access_token= implicit flow ─────────────────────────────
    // Supabase's createClient() will automatically parse the hash and fire
    // SIGNED_IN via onAuthStateChange. We just need to listen for it below.
    // No early return — we always register the auth listener.

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) return;

      const currentPath = window.location.pathname;

      // Skip redirect if already in a protected/post-auth area.
      if (
        currentPath.startsWith("/dashboard") ||
        currentPath.startsWith("/auth/") ||
        currentPath.startsWith("/p/")
      ) {
        return;
      }

      // Fires for scenario C (implicit flow SIGNED_IN) and as a last-resort
      // safety net for any other SIGNED_IN event on a public page.
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        router.replace("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps — register once on mount only.

  return <>{children}</>;
}
