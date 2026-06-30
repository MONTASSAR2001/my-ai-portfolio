/**
 * Supabase singleton clients
 *
 * - `supabaseBrowser` — browser-safe client (anon key, used in Client Components)
 * - `supabaseServer` — server-only client (service role key, used in Route Handlers
 *    and Server Components that need to bypass RLS)
 *
 * Import from this module instead of calling createClient() inline to avoid
 * the "Multiple GoTrueClient instances" warning.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  );
}

/** ── Browser client (singleton) ──────────────────────────────────────────────
 *  Safe to use in "use client" components and auth flows.
 *  Shares a single GoTrueClient instance to avoid the duplicate-instance warning.
 */
export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);

/** ── Server client (service role) ───────────────────────────────────────────
 *  Use ONLY in Route Handlers (server-side). Bypasses RLS so upserts/inserts
 *  work without a user session. Never expose this to the browser.
 */
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : supabaseBrowser; // graceful fallback if service key is absent
