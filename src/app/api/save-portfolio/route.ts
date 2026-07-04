import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase';

// ── Types ──────────────────────────────────────────────────────────────────────
interface ExperienceItem { title: string; company: string; duration?: string; description?: string; }
interface PortfolioPayload {
  slug: string;
  portfolio: { summary?: string; skills?: string[]; experience?: ExperienceItem[]; name?: string; cv_url?: string; };
  theme?: string;
  accent?: string;
  templateId?: string;
  profileImage?: string;
  /** Ignored — the authenticated user.id from the session is always used instead. */
  userId?: string;
}

const THEME_BG: Record<string, string> = {
  minimal:  '#ffffff',
  dark:     '#0f172a',
  creative: '#fdf4ff',
  split:    '#f8fafc',
};

// ── Helper: build a Supabase client that can read the auth session from cookies ─
// We do NOT use supabaseAdmin here for the session check because the service-role
// key bypasses auth. We build a fresh anon client whose cookie jar is populated
// from the incoming request so getUser() resolves correctly.
async function getSessionUser() {
  const cookieStore = await cookies();

  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Build a temporary per-request client seeded with the request cookies.
  // This is the recommended pattern when @supabase/ssr is not installed.
  const authToken = cookieStore
    .getAll()
    .find(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))?.value;

  const supabase = createClient(supabaseUrl, supabaseAnon, {
    global: {
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

// ── Route Handler ──────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // ── 1. Enforce authentication ─────────────────────────────────────────────
    const user = await getSessionUser();

    if (!user) {
      console.warn('⛔ /api/save-portfolio: unauthenticated request rejected');
      return NextResponse.json(
        { error: 'Authentication required. Please sign in.' },
        { status: 401 }
      );
    }

    // ── 2. Parse & validate body ──────────────────────────────────────────────
    const body = (await req.json()) as PortfolioPayload;
    const {
      slug,
      portfolio,
      theme      = 'minimal',
      accent     = 'indigo',
      templateId = 'minimal',
      profileImage = '',
      // userId from body is deliberately ignored — we enforce the session user below
    } = body;

    if (!slug || slug.trim().length < 3) {
      return NextResponse.json(
        { error: 'Slug must be at least 3 characters.' },
        { status: 400 }
      );
    }

    let finalProfileImage = profileImage;
    if (profileImage && profileImage.startsWith('data:image')) {
      const match = profileImage.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
      if (match) {
        const ext = match[1];
        const base64Data = match[2];
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `${user.id}/${Date.now()}.${ext}`;
        
        const { error: uploadError } = await supabaseAdmin.storage
          .from('portfolios')
          .upload(filename, buffer, {
            contentType: `image/${ext}`,
            upsert: true
          });
          
        if (!uploadError) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from('portfolios')
            .getPublicUrl(filename);
          finalProfileImage = publicUrlData.publicUrl;
        } else {
          console.error('Failed to upload image:', uploadError);
        }
      }
    }

    // ── 3. Build payload ──────────────────────────────────────────────────────
    const { summary = '', skills = [], experience = [], cv_url = null } = portfolio ?? {};
    const backgroundColor = THEME_BG[theme] ?? '#ffffff';

    const layout = {
      root: {
        id: 'root', type: 'PageContainer',
        props: { backgroundColor, theme, accent, templateId },
        children: [
          {
            id: 'hero-1', type: 'Hero',
            props: { title: 'Building digital experiences that make an impact.', showBadge: true, badgeText: 'Available for hire', profileImage: finalProfileImage },
          },
          { id: 'skills-1', type: 'Skills',     props: { layout: 'wrap', color: accent } },
          { id: 'exp-1',    type: 'Experience',  props: { style: 'cards', accent } },
        ],
      },
    };

    console.log(
      `📝 save-portfolio: user="${user.id}" slug="${slug}" template="${templateId}" accent="${accent}"`
    );

    // ── 4. Upsert with FORCED server-verified user.id ─────────────────────────
    // user_id is sourced from the verified session — never from the request body.
    const { data, error } = await supabaseAdmin
      .from('portfolios')
      .upsert(
        [{
          slug,
          summary,
          skills,
          experience,
          layout,
          profile_image: finalProfileImage || null,
          template_id:   templateId,
          cv_url,
          user_id:       user.id,   // ← always the authenticated user, never client-supplied
        }],
        { onConflict: 'slug' }
      )
      .select();

    if (error) {
      console.error('❌ Supabase upsert error:', JSON.stringify(error));
      return NextResponse.json({ error: error.message, hint: error.hint }, { status: 500 });
    }

    console.log(`✅ Saved slug="${slug}" for user="${user.id}"`);
    return NextResponse.json({ success: true, slug, data });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('❌ /api/save-portfolio exception:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}