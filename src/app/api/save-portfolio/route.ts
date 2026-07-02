import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

interface ExperienceItem { title: string; company: string; duration?: string; description?: string; }
interface PortfolioPayload {
  slug: string;
  portfolio: { summary?: string; skills?: string[]; experience?: ExperienceItem[]; name?: string; cv_url?: string; };
  theme?: string;
  accent?: string;
  templateId?: string;
  profileImage?: string; // base64 data URL or empty string
  userId?: string;
}

const THEME_BG: Record<string, string> = { minimal: '#ffffff', dark: '#0f172a', creative: '#fdf4ff', split: '#f8fafc' };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PortfolioPayload;
    const { slug, portfolio, theme = 'minimal', accent = 'indigo', templateId = 'minimal', profileImage = '', userId } = body;

    if (!slug || slug.trim().length < 3)
      return NextResponse.json({ error: 'Slug must be at least 3 characters.' }, { status: 400 });

    const { summary = '', skills = [], experience = [], cv_url = null } = portfolio ?? {};
    const backgroundColor = THEME_BG[theme] ?? '#ffffff';

    const layout = {
      root: {
        id: 'root', type: 'PageContainer',
        props: { backgroundColor, theme, accent, templateId },
        children: [
          { id: 'hero-1', type: 'Hero', props: { title: 'Building digital experiences that make an impact.', showBadge: true, badgeText: 'Available for hire', profileImage } },
          { id: 'skills-1', type: 'Skills', props: { layout: 'wrap', color: accent } },
          { id: 'exp-1', type: 'Experience', props: { style: 'cards', accent } },
        ],
      },
    };

    console.log(`📝 save-portfolio: slug="${slug}" template="${templateId}" accent="${accent}"`);

    const { data, error } = await supabaseAdmin
      .from('portfolios')
      .upsert(
        [{ slug, summary, skills, experience, layout, profile_image: profileImage || null, template_id: templateId, cv_url, ...(userId ? { user_id: userId } : {}) }],
        { onConflict: 'slug' }
      )
      .select();

    if (error) {
      console.error('❌ Supabase error:', JSON.stringify(error));
      return NextResponse.json({ error: error.message, hint: error.hint }, { status: 500 });
    }

    console.log(`✅ Saved slug="${slug}"`);
    return NextResponse.json({ success: true, slug, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('❌ Exception:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}