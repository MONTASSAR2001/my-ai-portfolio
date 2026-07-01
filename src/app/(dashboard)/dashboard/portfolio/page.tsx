"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CinematicTemplateClient        from "@/app/p/[slug]/CinematicTemplate.client";
import FuturisticTemplateClient       from "@/app/p/[slug]/FuturisticTemplate.client";
import PremiumTemplateClient          from "@/app/p/[slug]/PremiumTemplate.client";
import ChicTechTemplateClient         from "@/app/p/[slug]/ChicTechTemplate.client";
import CorporateAITemplateClient      from "@/app/p/[slug]/CorporateAITemplate.client";
import ElegantDeveloperTemplateClient from "@/app/p/[slug]/ElegantDeveloperTemplate.client";
import ProfessionalPortfolioTemplateClient from "@/app/p/[slug]/ProfessionalPortfolioTemplate.client";
import RoboticsPortfolioTemplateClient    from "@/app/p/[slug]/RoboticsPortfolioTemplate.client";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ExpItem { title: string; company: string; duration?: string; description?: string; }
interface CVData { name: string; role?: string; email?: string; summary: string; skills: string[]; experience: ExpItem[]; }
type SidebarTab = "content" | "design";
type TemplateId = "cinematic" | "futuristic" | "premium" | "chic-tech" | "corporate-ai" | "elegant" | "professional" | "robotics";
interface SiteConfig { templateId: TemplateId; accent: string; profileImage: string; }

// ── Design tokens ─────────────────────────────────────────────────────────────
const BG_APP    = "#09090B";
const BG_PANEL  = "#18181B";
const BG_INPUT  = "#27272A";
const BG_CARD   = "#1C1C1F";
const BORDER    = "#27272A";
const BORDER_LT = "#3F3F46";
const TEXT_MUT  = "#71717A";
const TEXT_SUB  = "#A1A1AA";

const ACCENTS = [
  { id: "indigo",  hex: "#6366f1" }, { id: "violet",  hex: "#8b5cf6" },
  { id: "emerald", hex: "#10b981" }, { id: "rose",    hex: "#f43f5e" },
  { id: "amber",   hex: "#f59e0b" }, { id: "sky",     hex: "#0ea5e9" },
  { id: "white",   hex: "#f8fafc" }, { id: "slate",   hex: "#64748b" },
];

const TEMPLATES: { id: TemplateId; label: string; desc: string; badge?: string; emoji: string }[] = [
  { id: "cinematic",    label: "Cinematic",    desc: "Dark elegant, full-bleed hero",       emoji: "🎬" },
  { id: "futuristic",   label: "Futuristic",   desc: "Bento-grid spatial layout",           emoji: "🚀", badge: "HOT" },
  { id: "premium",      label: "Premium",      desc: "Clean, light bento UI",               emoji: "✨" },
  { id: "chic-tech",    label: "Chic Tech",    desc: "Glassmorphic indigo-purple",          emoji: "💎", badge: "NEW" },
  { id: "corporate-ai", label: "Corporate AI", desc: "Clean navy enterprise style",         emoji: "🏢", badge: "NEW" },
  { id: "elegant",      label: "Elegant Dev",  desc: "Dark terminal with green accent",     emoji: "💻", badge: "NEW" },
  { id: "professional", label: "Professional", desc: "Minimal editorial portfolio",          emoji: "📄", badge: "NEW" },
  { id: "robotics",     label: "Robotics",     desc: "Futuristic robotics & AI engineer",  emoji: "🤖", badge: "NEW" },
];

// ── Live Preview Canvas ───────────────────────────────────────────────────────
function LivePreviewCanvas({ cv, config, slug }: { cv: CVData; config: SiteConfig; slug: string }) {
  const p = { ...cv, slug: slug || "your-slug", profile_image: config.profileImage || null };
  if (config.templateId === "futuristic")   return <FuturisticTemplateClient              p={p} isPreview={true} />;
  if (config.templateId === "premium")      return <PremiumTemplateClient                 p={p} isPreview={true} />;
  if (config.templateId === "chic-tech")    return <ChicTechTemplateClient                p={p} isPreview={true} />;
  if (config.templateId === "corporate-ai") return <CorporateAITemplateClient             p={p} isPreview={true} />;
  if (config.templateId === "elegant")      return <ElegantDeveloperTemplateClient        p={p} isPreview={true} />;
  if (config.templateId === "professional") return <ProfessionalPortfolioTemplateClient   p={p} isPreview={true} />;
  if (config.templateId === "robotics")     return <RoboticsPortfolioTemplateClient       p={p} isPreview={true} />;
  return <CinematicTemplateClient p={p} isPreview={true} />;
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: TEXT_MUT }}>
      {children}
    </p>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PortfolioBuilderPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<SidebarTab>("content");
  const [cv, setCv] = useState<CVData>({ name: "", summary: "", skills: [], experience: [] });
  const [config, setConfig] = useState<SiteConfig>({ templateId: "cinematic", accent: "violet", profileImage: "" });
  const [slug, setSlug] = useState("");
  const [slugErr, setSlugErr] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState("");
  const [publishStatus, setPublishStatus] = useState<"idle" | "success" | "error">("idle");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractErr, setExtractErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.get("published") === "1") {
      setPublishStatus("success");
      setPublishMsg("🎉 Portfolio is live!");
      const returnedSlug = searchParams.get("slug");
      if (returnedSlug) setSlug(returnedSlug);
    } else if (searchParams.get("cancelled") === "1") {
      setPublishStatus("error");
      setPublishMsg("Payment cancelled.");
    }
  }, [searchParams]);

  const hex = ACCENTS.find(a => a.id === config.accent)?.hex ?? "#8b5cf6";

  const inpCls = "w-full px-3 py-2 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all border resize-none";
  const inpSty = { backgroundColor: BG_INPUT, borderColor: BORDER_LT, color: "#E4E4E7" };
  const focusRing = { "--tw-ring-color": BORDER_LT } as React.CSSProperties;

  const validateSlug = (v: string) => {
    const c = v.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    setSlug(c); setSlugErr(c.length > 0 && c.length < 3 ? "Min 3 chars" : "");
    return c;
  };

  const handleProfileImg = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setConfig(c => ({ ...c, profileImage: e.target?.result as string }));
    reader.readAsDataURL(f);
  };

  const handleCVExtract = async (file: File) => {
    setIsExtracting(true); setExtractErr("");
    try {
      const fd = new FormData(); fd.append("cv", file);
      const res  = await fetch("/api/process-cv", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      const d = json.data;
      setCv(prev => ({ ...prev, name: d.name || "", summary: d.summary || "", skills: d.skills || [], experience: d.experience || [] }));
    } catch (e) { setExtractErr(e instanceof Error ? e.message : "Extraction failed"); }
    finally { setIsExtracting(false); }
  };

  const handlePublish = async () => {
    if (!slug) { setSlugErr("Required"); return; }
    if (slugErr) return;
    if (publishStatus === "success") return;
    setIsPublishing(true); setPublishMsg(""); setPublishStatus("idle");
    try {
      const saveRes  = await fetch("/api/save-portfolio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ portfolio: cv, slug, templateId: config.templateId, accent: config.accent, profileImage: config.profileImage }) });
      const saveData = await saveRes.json();
      if (!saveRes.ok) throw new Error(saveData.error || "Failed to save portfolio");
      const checkoutRes  = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug }) });
      const checkoutData = await checkoutRes.json();
      if (checkoutRes.status === 409) { setPublishStatus("success"); setPublishMsg("✅ Already published!"); return; }
      if (!checkoutRes.ok) throw new Error(checkoutData.error || "Failed to start checkout");
      window.location.href = checkoutData.url;
    } catch (e) {
      setPublishStatus("error");
      setPublishMsg(e instanceof Error ? e.message : "Unexpected error");
    } finally { setIsPublishing(false); }
  };

  const setExp    = useCallback((i: number, field: keyof ExpItem, val: string) =>
    setCv(p => ({ ...p, experience: p.experience.map((e, j) => j === i ? { ...e, [field]: val } : e) })), []);
  const removeExp = (i: number) => setCv(p => ({ ...p, experience: p.experience.filter((_, j) => j !== i) }));
  const addExp    = () => setCv(p => ({ ...p, experience: [...p.experience, { title: "", company: "" }] }));

  return (
    <div className="flex flex-col text-white overflow-hidden" style={{ height: "100vh", backgroundColor: BG_APP, fontFamily: "Inter, sans-serif" }}>

      {/* ── Top Publish Bar ───────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 z-10"
        style={{ backgroundColor: BG_PANEL, borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="transition-colors" style={{ color: TEXT_MUT }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#E4E4E7"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = TEXT_MUT}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs" style={{ color: TEXT_MUT }}>portfolioai.app/p/</span>
            <input value={slug} onChange={e => validateSlug(e.target.value)} placeholder="your-slug"
              className="bg-transparent font-mono text-sm focus:outline-none pb-0.5 w-32 transition-colors placeholder-zinc-700"
              style={{ color: "#E4E4E7", borderBottom: `1px solid ${BORDER_LT}` }} />
            {slugErr && <span className="text-red-400 text-xs">{slugErr}</span>}
            {slug && !slugErr && (
              <a href={`/p/${slug}`} target="_blank" rel="noreferrer"
                className="text-xs transition-colors" style={{ color: TEXT_MUT }}>↗</a>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {publishMsg && (
            <span className={`text-xs font-semibold ${publishStatus === "success" ? "text-emerald-400" : "text-red-400"}`}>
              {publishMsg}
            </span>
          )}
          {publishStatus === "success" ? (
            <a href={`/p/${slug}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: "#059669", boxShadow: "0 0 0 1px #065F46" }}>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
              View Live Site ↗
            </a>
          ) : (
            <button id="publish-btn" onClick={handlePublish} disabled={isPublishing}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#4F46E5", boxShadow: "0 0 0 1px #3730A3" }}>
              {isPublishing ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Preparing…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Publish — $19
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left Settings Panel ───────────────────────────────────────────── */}
        <aside className="flex-shrink-0 flex flex-col overflow-hidden" style={{ width: 340, backgroundColor: BG_PANEL, borderRight: `1px solid ${BORDER}` }}>

          {/* Tab switcher */}
          <div className="flex p-2 gap-1 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
            {(["content", "design"] as SidebarTab[]).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className="flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors"
                style={activeTab === t
                  ? { backgroundColor: "#3F3F46", color: "#FAFAFA" }
                  : { color: TEXT_SUB }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">

            {/* ── CONTENT TAB ─────────────────────────────────────────────── */}
            {activeTab === "content" && <>
              {/* CV Upload */}
              <div>
                <SectionLabel>AI Extraction</SectionLabel>
                <div className="p-4 rounded-lg text-center" style={{ border: `1px dashed ${BORDER_LT}`, backgroundColor: BG_APP }}>
                  <button onClick={() => fileRef.current?.click()} disabled={isExtracting}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white w-full transition-opacity disabled:opacity-50"
                    style={{ backgroundColor: "#4F46E5" }}>
                    {isExtracting ? "Extracting with AI…" : "Upload PDF CV"}
                  </button>
                  <p className="text-[10px] mt-2" style={{ color: TEXT_MUT }}>Auto-fill all your details instantly.</p>
                  <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => e.target.files?.[0] && handleCVExtract(e.target.files[0])} />
                  {extractErr && <p className="text-xs text-red-400 mt-2">{extractErr}</p>}
                </div>
              </div>

              {/* Profile Pic */}
              <div>
                <SectionLabel>Profile Picture</SectionLabel>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden cursor-pointer flex-shrink-0"
                    style={{ border: `1px solid ${BORDER_LT}`, backgroundColor: BG_INPUT }}
                    onClick={() => imgRef.current?.click()}>
                    {config.profileImage
                      ? <img src={config.profileImage} className="w-full h-full object-cover" alt="Profile" />
                      : <div className="w-full h-full flex items-center justify-center text-lg opacity-30">📷</div>}
                  </div>
                  <button onClick={() => imgRef.current?.click()} className="text-xs font-semibold transition-opacity hover:opacity-80" style={{ color: hex }}>
                    Change Photo
                  </button>
                  <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleProfileImg(e.target.files[0])} />
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-2">
                <SectionLabel>Personal Info</SectionLabel>
                <input value={cv.name} onChange={e => setCv(p => ({ ...p, name: e.target.value }))} className={inpCls} style={inpSty} placeholder="Your name" />
                <input value={cv.role || ""} onChange={e => setCv(p => ({ ...p, role: e.target.value }))} className={inpCls} style={inpSty} placeholder="Your role (e.g. Software Engineer)" />
                <input value={cv.email || ""} onChange={e => setCv(p => ({ ...p, email: e.target.value }))} className={inpCls} style={inpSty} placeholder="Your email" />
                <textarea value={cv.summary} onChange={e => setCv(p => ({ ...p, summary: e.target.value }))} className={inpCls} style={inpSty} rows={4} placeholder="Write your professional summary…" />
              </div>

              {/* Skills */}
              <div>
                <SectionLabel>Skills</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {cv.skills.map((s, i) => (
                    <div key={i} className="flex items-center gap-1 rounded-full px-2.5 py-1" style={{ backgroundColor: BG_INPUT, border: `1px solid ${BORDER_LT}` }}>
                      <span className="text-xs" style={{ color: "#D4D4D8" }}>{s}</span>
                      <button onClick={() => setCv(p => ({ ...p, skills: p.skills.filter((_, j) => j !== i) }))} className="text-base leading-none ml-1 hover:text-red-400 transition-colors" style={{ color: TEXT_MUT }}>×</button>
                    </div>
                  ))}
                  <button onClick={() => { const s = prompt("Add skill"); if (s) setCv(p => ({ ...p, skills: [...p.skills, s] })); }}
                    className="text-xs px-2.5 py-1 rounded-full transition-colors hover:text-white"
                    style={{ border: `1px dashed ${BORDER_LT}`, color: TEXT_SUB }}>
                    + Add
                  </button>
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <SectionLabel>Experience</SectionLabel>
                  <button onClick={addExp} className="text-xs font-semibold transition-opacity hover:opacity-80" style={{ color: hex }}>+ Add Role</button>
                </div>
                <div className="space-y-2">
                  {cv.experience.map((e, i) => (
                    <div key={i} className="p-3 rounded-lg space-y-2" style={{ backgroundColor: BG_APP, border: `1px solid ${BORDER}` }}>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-semibold" style={{ color: TEXT_MUT }}>Role {i + 1}</span>
                        <button onClick={() => removeExp(i)} className="text-[10px] text-red-500 hover:text-red-400 transition-colors">Remove</button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input className={inpCls + " text-xs"} style={inpSty} placeholder="Job Title" value={e.title} onChange={ev => setExp(i, "title", ev.target.value)} />
                        <input className={inpCls + " text-xs"} style={inpSty} placeholder="Company" value={e.company} onChange={ev => setExp(i, "company", ev.target.value)} />
                      </div>
                      <input className={inpCls + " text-xs"} style={inpSty} placeholder="Duration (e.g. 2020–2024)" value={e.duration || ""} onChange={ev => setExp(i, "duration", ev.target.value)} />
                      <textarea className={inpCls + " text-xs"} style={inpSty} rows={2} placeholder="Description…" value={e.description || ""} onChange={ev => setExp(i, "description", ev.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            </>}

            {/* ── DESIGN TAB ──────────────────────────────────────────────── */}
            {activeTab === "design" && <>
              <div>
                <SectionLabel>Portfolio Template ({TEMPLATES.length} available)</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATES.map(t => {
                    const active = config.templateId === t.id;
                    return (
                      <button key={t.id} onClick={() => setConfig(c => ({ ...c, templateId: t.id }))}
                        className="p-3 rounded-lg text-left transition-all flex flex-col relative"
                        style={{
                          backgroundColor: active ? `${hex}18` : BG_APP,
                          border: `1px solid ${active ? hex : BORDER_LT}`,
                          boxShadow: active ? `0 0 0 1px ${hex}30` : "none",
                        }}>
                        {t.badge && (
                          <span className="absolute top-1.5 right-1.5 px-1 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: hex }}>{t.badge}</span>
                        )}
                        <span className="text-xl mb-1.5 leading-none">{t.emoji}</span>
                        <p className="text-xs font-semibold text-white mb-0.5 leading-tight">{t.label}</p>
                        <p className="text-[10px] leading-snug flex-1" style={{ color: TEXT_MUT }}>{t.desc}</p>
                        {active && (
                          <div className="mt-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: hex }}>✓</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <SectionLabel>Accent Color</SectionLabel>
                <div className="flex flex-wrap gap-3">
                  {ACCENTS.map(a => (
                    <button key={a.id} onClick={() => setConfig(c => ({ ...c, accent: a.id }))} title={a.id}
                      className="w-9 h-9 rounded-full transition-all"
                      style={{
                        backgroundColor: a.hex,
                        boxShadow: config.accent === a.id ? `0 0 0 2px ${BG_PANEL}, 0 0 0 4px ${a.hex}` : "none",
                        transform: config.accent === a.id ? "scale(1.15)" : "scale(1)",
                      }} />
                  ))}
                </div>
              </div>
            </>}
          </div>
        </aside>

        {/* ── Right Preview Canvas ──────────────────────────────────────────── */}
        <main className="flex-1 overflow-hidden flex flex-col" style={{ backgroundColor: BG_APP }}>
          {/* Mac-style window header */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-2.5"
            style={{ backgroundColor: BG_PANEL, borderBottom: `1px solid ${BORDER}` }}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 block" />
              <span className="w-3 h-3 rounded-full bg-green-500 block" />
              <span className="ml-3 font-mono text-xs" style={{ color: TEXT_MUT }}>
                {slug ? `portfolioai.app/p/${slug}` : "portfolioai.app/p/your-slug"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded text-[10px] font-medium" style={{ backgroundColor: BG_INPUT, color: TEXT_SUB, border: `1px solid ${BORDER_LT}` }}>Live Preview</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse block" />
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
            <div className="w-full max-w-5xl rounded-xl overflow-hidden relative"
              style={{
                border: `1px solid ${BORDER_LT}`,
                boxShadow: "0 24px 80px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
                minHeight: 800,
              }}>
              <LivePreviewCanvas cv={cv} config={config} slug={slug} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
