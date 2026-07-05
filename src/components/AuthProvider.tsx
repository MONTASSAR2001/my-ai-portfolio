"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabaseBrowser as supabase } from "@/lib/supabase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        // Only push to dashboard if we are on login, signup, or home, OR if there's a hash with access_token
        if (pathname === '/login' || pathname === '/signup' || pathname === '/' || window.location.hash.includes('access_token')) {
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
