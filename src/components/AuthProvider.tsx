"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabaseBrowser as supabase } from "@/lib/supabase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if we already have an access_token in the URL on mount
    if (typeof window !== "undefined" && window.location.hash.includes("access_token")) {
      router.push("/dashboard");
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        // Force redirect to /dashboard immediately if we are coming from an OAuth hash fragment
        if (typeof window !== "undefined" && window.location.hash.includes("access_token")) {
          router.push("/dashboard");
        } else if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
          router.push("/dashboard");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname]);

  return <>{children}</>;
}
