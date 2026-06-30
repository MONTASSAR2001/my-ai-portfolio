import { supabaseAdmin as supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CinematicTemplateClient  from './CinematicTemplate.client';
import FuturisticTemplateClient from './FuturisticTemplate.client';
import PremiumTemplateClient    from './PremiumTemplate.client';

interface ExpItem { title: string; company: string; duration?: string; description?: string; }
interface PortfolioRow {
  id: string;
  slug: string; summary?: string; skills?: string[]; experience?: ExpItem[];
  layout?: { root?: { props?: Record<string, unknown> } } | null;
  profile_image?: string | null; template_id?: string;
  has_paid?: boolean; is_published?: boolean;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from('portfolios')
    .select('slug,summary,has_paid,is_published')
    .eq('slug', slug)
    .single<PortfolioRow>();

  // Return minimal metadata for unpublished portfolios — don't leak the name.
  if (!data || !data.has_paid || !data.is_published) {
    return { title: 'Portfolio Not Available — PortfolioAI' };
  }

  return {
    title: `${slug}'s Portfolio — PortfolioAI`,
    description: data.summary ?? '',
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PublicPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: p } = await supabase
    .from('portfolios')
    .select('*')
    .eq('slug', slug)
    .single<PortfolioRow>();

  // ── Payment / publish gate ──────────────────────────────────────────────────
  // SECURITY: We check both flags. has_paid is set by the webhook after payment.
  // is_published can be toggled independently in future (e.g. maintenance mode).
  // If either is false/null we return notFound() — the template is NOT rendered
  // and its code is NOT sent to the client.
  if (!p || !p.has_paid || !p.is_published) {
    return notFound();
  }

  const rootProps  = p.layout?.root?.props ?? {};
  const templateId = (rootProps.templateId as string) ?? p.template_id ?? 'cinematic';

  if (templateId === 'futuristic') return <FuturisticTemplateClient p={p} />;
  if (templateId === 'premium')    return <PremiumTemplateClient    p={p} />;
  // default → cinematic
  return <CinematicTemplateClient p={p} />;
}
