"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const BG_PANEL  = "#121214";
const BG_INPUT  = "transparent";
const BG_CARD   = "#0E0E10";
const BORDER    = "#1a1a1f";
const BORDER_LT = "#2a2a35";
const TEXT_MUT  = "#52526a";
const TEXT_SUB  = "#8888a8";
const CYAN_GLOW = "#22d3ee";

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
    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: TEXT_MUT, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ display: "inline-block", width: 14, height: 1, background: BORDER_LT }} />
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

  // Underline-style inputs – cyan glow on focus via FocusInput component below
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const mkInp = (id: string) => ({
    onFocus: () => setFocusedField(id),
    onBlur:  () => setFocusedField(null),
    style: {
      width: "100%", background: "transparent", border: "none",
      borderBottom: `1px solid ${focusedField === id ? CYAN_GLOW : BORDER_LT}`,
      outline: "none", color: "#E8E8F0", fontSize: 13, padding: "7px 0",
      fontFamily: "'JetBrains Mono', monospace", resize: "none" as const,
      boxShadow: focusedField === id ? `0 1px 0 ${CYAN_GLOW}40` : "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
    } as React.CSSProperties,
  });

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
    <div className="flex flex-col text-white overflow-hidden" style={{ height: "100vh", backgroundColor: BG_APP, fontFamily: "'JetBrains Mono', monospace" }}>

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

          {/* Tab switcher — framer-motion layoutId sliding pill */}
          <div className="flex flex-shrink-0 relative" style={{ borderBottom: `1px solid ${BORDER}`, padding: "6px 8px", gap: 4 }}>
            {(["content", "design"] as SidebarTab[]).map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, position: "relative", padding: "6px 0", background: "none", border: "none", cursor: "pointer", zIndex: 1 }}>
                {activeTab === t && (
                  <motion.span layoutId="tab-pill" transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    style={{ position: "absolute", inset: 0, background: "#1e1e28", border: `1px solid ${BORDER_LT}`, borderRadius: 6 }} />
                )}
                <span style={{ position: "relative", zIndex: 1, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", fontFamily: "'JetBrains Mono', monospace", color: activeTab === t ? "#e0e0f0" : TEXT_SUB, textTransform: "uppercase" }}>
                  {t}
                </span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">

            {/* ── CONTENT TAB ─────────────────────────────────────────────── */}
            {activeTab === "content" && <>
              {/* CV Upload — animated gradient border */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <SectionLabel>AI Extraction</SectionLabel>
                <div style={{ padding: 1, borderRadius: 10, background: `linear-gradient(135deg, ${CYAN_GLOW}55, #6366f155, ${CYAN_GLOW}55)`, backgroundSize: "200% 200%", animation: "gradShift 3s ease infinite" }}>
                  <div style={{ borderRadius: 9, backgroundColor: BG_CARD, padding: "14px 12px", textAlign: "center" }}>
                    <button onClick={() => fileRef.current?.click()} disabled={isExtracting}
                      style={{ width: "100%", padding: "9px 0", background: isExtracting ? "#1a1a28" : `linear-gradient(135deg, #1a1a38, #0f1628)`, border: `1px solid ${CYAN_GLOW}60`, borderRadius: 6, color: isExtracting ? TEXT_SUB : CYAN_GLOW, fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", cursor: isExtracting ? "not-allowed" : "pointer", boxShadow: isExtracting ? "none" : `0 0 20px ${CYAN_GLOW}20`, transition: "all 0.2s" }}>
                      {isExtracting ? "⟳  Extracting with AI…" : "⬆  Upload PDF CV"}
                    </button>
                    <p style={{ fontSize: 10, marginTop: 8, color: TEXT_MUT, fontFamily: "'JetBrains Mono', monospace" }}>Auto-fills all fields instantly via AI</p>
                    <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => e.target.files?.[0] && handleCVExtract(e.target.files[0])} />
                    {extractErr && <p style={{ fontSize: 11, color: "#f87171", marginTop: 6 }}>{extractErr}</p>}
                  </div>
                </div>
                <style>{`@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
              </motion.div>

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

              {/* Personal Info — staggered reveal + underline inputs */}
              {([{
                key: "info", label: "Personal Info", delay: 0.05,
                content: (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {([{id:"name",ph:"Full name",val:cv.name,fn:(v:string)=>setCv(p=>({...p,name:v}))},{id:"role",ph:"Role · e.g. Software Engineer",val:cv.role||"" ,fn:(v:string)=>setCv(p=>({...p,role:v}))},{id:"email",ph:"Email address",val:cv.email||"",fn:(v:string)=>setCv(p=>({...p,email:v}))}] as {id:string;ph:string;val:string;fn:(v:string)=>void}[]).map(f=>(
                      <div key={f.id}>
                        <label style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color: focusedField===f.id ? CYAN_GLOW : TEXT_MUT, fontFamily:"'JetBrains Mono',monospace", display:"block", marginBottom:3, transition:"color 0.2s" }}>{f.ph}</label>
                        <input value={f.val} onChange={e=>f.fn(e.target.value)} placeholder="" {...mkInp(f.id)} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color: focusedField==="summary" ? CYAN_GLOW : TEXT_MUT, fontFamily:"'JetBrains Mono',monospace", display:"block", marginBottom:3, transition:"color 0.2s" }}>Professional Summary</label>
                      <textarea value={cv.summary} onChange={e=>setCv(p=>({...p,summary:e.target.value}))} rows={4} placeholder="" {...mkInp("summary")} />
                    </div>
                  </div>
                )
              },{
                key: "skills", label: "Skills", delay: 0.12,
                content: (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {cv.skills.map((s,i)=>(
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:4, padding:"3px 10px", border:`1px solid ${BORDER_LT}`, borderRadius:4, background:"#0e0e14" }}>
                        <span style={{ fontSize:11, color:"#c8c8e8", fontFamily:"'JetBrains Mono',monospace" }}>{s}</span>
                        <button onClick={()=>setCv(p=>({...p,skills:p.skills.filter((_,j)=>j!==i)}))} style={{ color:TEXT_MUT, background:"none", border:"none", cursor:"pointer", fontSize:14, lineHeight:1, padding:0 }}>×</button>
                      </div>
                    ))}
                    <button onClick={()=>{const s=prompt("Add skill");if(s)setCv(p=>({...p,skills:[...p.skills,s]}));}} style={{ fontSize:10, padding:"3px 10px", border:`1px dashed ${BORDER_LT}`, borderRadius:4, color:TEXT_SUB, background:"none", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>+ Add</button>
                  </div>
                )
              },{
                key: "exp", label: "Experience", delay: 0.19,
                content: (
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {cv.experience.map((e,i)=>(
                      <div key={i} style={{ padding:"10px 12px", border:`1px solid ${BORDER_LT}`, borderRadius:6, background:BG_CARD, display:"flex", flexDirection:"column", gap:8 }}>
                        <div style={{ display:"flex", justifyContent:"space-between" }}>
                          <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:TEXT_MUT, fontFamily:"'JetBrains Mono',monospace" }}>Role {i+1}</span>
                          <button onClick={()=>removeExp(i)} style={{ fontSize:9, color:"#f87171", background:"none", border:"none", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>Remove</button>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                          <input value={e.title} onChange={ev=>setExp(i,"title",ev.target.value)} placeholder="" {...mkInp(`t${i}`)} />
                          <input value={e.company} onChange={ev=>setExp(i,"company",ev.target.value)} placeholder="" {...mkInp(`c${i}`)} />
                        </div>
                        <input value={e.duration||""} onChange={ev=>setExp(i,"duration",ev.target.value)} placeholder="" {...mkInp(`d${i}`)} />
                        <textarea value={e.description||""} onChange={ev=>setExp(i,"description",ev.target.value)} rows={2} placeholder="" {...mkInp(`desc${i}`)} />
                      </div>
                    ))}
                    <button onClick={addExp} style={{ fontSize:10, padding:"6px 0", border:`1px dashed ${BORDER_LT}`, borderRadius:6, color:TEXT_SUB, background:"none", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"0.1em" }}>+ Add Role</button>
                  </div>
                )
              }] as {key:string;label:string;delay:number;content:React.ReactNode}[]).map(section=>(
                <motion.div key={section.key} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:section.delay, ease:[0.22,1,0.36,1] }}>
                  <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:TEXT_MUT, fontFamily:"'JetBrains Mono',monospace", marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ display:"inline-block", width:16, height:1, background:BORDER_LT }} />
                    {section.label}
                  </p>
                  {section.content}
                </motion.div>
              ))}
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

        {/* ── Right Preview Canvas — premium anodized chrome ────────────────── */}
        <main className="flex-1 overflow-hidden flex flex-col" style={{ backgroundColor: "#060608" }}>
          {/* Hardware-grade window chrome */}
          <div style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 20px", background:"linear-gradient(180deg,#1a1a22 0%,#111118 100%)", borderBottom:`1px solid ${BORDER}`, boxShadow:"0 1px 0 rgba(255,255,255,0.04)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              {[["#ff5f57","#ff8c00"],["#febc2e","#e6a800"],["#28c840","#1da035"]].map(([bg,shadow],idx)=>(
                <span key={idx} style={{ width:11, height:11, borderRadius:"50%", background:bg, boxShadow:`0 0 0 0.5px ${shadow}40`, display:"block" }} />
              ))}
              <div style={{ marginLeft:12, display:"flex", alignItems:"center", gap:6, background:"#0d0d14", border:`1px solid ${BORDER_LT}`, borderRadius:5, padding:"3px 10px" }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={TEXT_MUT} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:TEXT_MUT, letterSpacing:"0.04em" }}>
                  {slug ? `portfolioai.app/p/${slug}` : "portfolioai.app/p/your-slug"}
                </span>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.15em", textTransform:"uppercase", color:TEXT_MUT }}>Live Preview</span>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 8px #22c55e", display:"block", animation:"pulse 2s infinite" }} />
            </div>
          </div>

          {/* Canvas */}
          <div style={{ flex:1, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:32, overflowY:"auto", background:"radial-gradient(ellipse at 50% 0%, #0f0f1a 0%, #060608 70%)" }}>
            <motion.div initial={{ opacity:0, y:20, scale:0.98 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
              style={{ width:"100%", maxWidth:1024, borderRadius:0, overflow:"hidden", position:"relative", minHeight:800,
                border:`1px solid #252535`,
                boxShadow:"0 0 0 1px #1a1a28, 0 32px 100px -10px rgba(0,0,0,0.95), 0 8px 32px -4px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)"
              }}>
              <LivePreviewCanvas cv={cv} config={config} slug={slug} />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
