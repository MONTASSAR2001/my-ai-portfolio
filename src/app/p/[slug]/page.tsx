import { supabaseAdmin as supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CinematicTemplateClient        from './CinematicTemplate.client';
import FuturisticTemplateClient       from './FuturisticTemplate.client';
import PremiumTemplateClient          from './PremiumTemplate.client';
import ChicTechTemplateClient         from './ChicTechTemplate.client';
import CorporateAITemplateClient      from './CorporateAITemplate.client';
import ElegantDeveloperTemplateClient from './ElegantDeveloperTemplate.client';
import ProfessionalPortfolioTemplateClient from './ProfessionalPortfolioTemplate.client';
import RoboticsPortfolioTemplateClient    from './RoboticsPortfolioTemplate.client';
import CyberneticTemplateClient           from './CyberneticTemplate.client';
import { FloatingAdminDockClient }        from './FloatingAdminDock.client';

interface ExpItem { title: string; company: string; duration?: string; description?: string; }
interface PortfolioRow {
  id: string;
  user_id: string;
  slug: string; name?: string; role?: string; email?: string;
  summary?: string; skills?: string[]; experience?: ExpItem[];
  layout?: { root?: { props?: Record<string, unknown> } } | null;
  profile_image?: string | null; template_id?: string;
  has_paid?: boolean; is_published?: boolean;
  cv_url?: string | null;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from('portfolios')
    .select('slug,summary,has_paid,is_published')
    .eq('slug', slug)
    .single<PortfolioRow>();

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
  if (!p || !p.has_paid || !p.is_published) {
    return notFound();
  }

  const rootProps  = p.layout?.root?.props ?? {};
  const templateId = (rootProps.templateId as string) ?? p.template_id ?? 'cinematic';

  let Template = CinematicTemplateClient;
  if (templateId === 'futuristic')   Template = FuturisticTemplateClient;
  if (templateId === 'premium')      Template = PremiumTemplateClient;
  if (templateId === 'chic-tech')    Template = ChicTechTemplateClient;
  if (templateId === 'corporate-ai') Template = CorporateAITemplateClient;
  if (templateId === 'elegant')      Template = ElegantDeveloperTemplateClient;
  if (templateId === 'professional') Template = ProfessionalPortfolioTemplateClient;
  if (templateId === 'robotics')     Template = RoboticsPortfolioTemplateClient;
  if (templateId === 'cybernetic')   Template = CyberneticTemplateClient;

  return (
    <>
      <Template p={p} />
      <FloatingAdminDockClient portfolio={p} />
    </>
  );
}
