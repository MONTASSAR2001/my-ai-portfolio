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

const ACCENTS = [
  { id: "indigo", hex: "#6366f1" }, { id: "violet", hex: "#8b5cf6" },
  { id: "emerald", hex: "#10b981" }, { id: "rose", hex: "#f43f5e" },
  { id: "amber", hex: "#f59e0b" }, { id: "sky", hex: "#0ea5e9" },
  { id: "white", hex: "#f8fafc" }, { id: "slate", hex: "#64748b" },
];

const TEMPLATES: { id: TemplateId; label: string; desc: string; badge?: string; emoji: string }[] = [
  { id: "cinematic",    label: "Cinematic",    desc: "Dark elegant, full-bleed hero",         emoji: "🎬" },
  { id: "futuristic",   label: "Futuristic",   desc: "Bento-grid spatial layout",             emoji: "🚀", badge: "HOT" },
  { id: "premium",      label: "Premium",      desc: "Clean, light bento UI",                 emoji: "✨" },
  { id: "chic-tech",    label: "Chic Tech",    desc: "Glassmorphic indigo-purple",            emoji: "💎", badge: "NEW" },
  { id: "corporate-ai",label: "Corporate AI",  desc: "Clean navy enterprise style",           emoji: "🏢", badge: "NEW" },
  { id: "elegant",      label: "Elegant Dev",  desc: "Dark terminal with green accent",        emoji: "💻", badge: "NEW" },
  { id: "professional", label: "Professional", desc: "Minimal editorial portfolio",            emoji: "📄", badge: "NEW" },
  { id: "robotics",     label: "Robotics",     desc: "Futuristic robotics & AI engineer",     emoji: "🤖", badge: "NEW" },
];

// ── Live Preview Canvas ───────────────────────────────────────────────────────
function LivePreviewCanvas({ cv, config, slug }: { cv: CVData; config: SiteConfig; slug: string }) {
  const p = {
    ...cv,
    slug: slug || "your-slug",
    profile_image: config.profileImage || null,
  };

  if (config.templateId === "futuristic")    return <FuturisticTemplateClient              p={p} isPreview={true} />;
  if (config.templateId === "premium")       return <PremiumTemplateClient                 p={p} isPreview={true} />;
  if (config.templateId === "chic-tech")     return <ChicTechTemplateClient                p={p} isPreview={true} />;
  if (config.templateId === "corporate-ai")  return <CorporateAITemplateClient             p={p} isPreview={true} />;
  if (config.templateId === "elegant")       return <ElegantDeveloperTemplateClient        p={p} isPreview={true} />;
  if (config.templateId === "professional")  return <ProfessionalPortfolioTemplateClient   p={p} isPreview={true} />;
  if (config.templateId === "robotics")      return <RoboticsPortfolioTemplateClient       p={p} isPreview={true} />;
  return <CinematicTemplateClient p={p} isPreview={true} />;
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
  const imgRef = useRef<HTMLInputElement>(null);

  // ── Detect return from Stripe Checkout ─────────────────────────────────────
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
  const inpStyle = { backgroundColor: "#171820", borderColor: "#2a2d3a", color: "#e2e8f0" };
  const ta = "w-full px-3 py-2 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600 transition-all border resize-none";
  const inp = "w-full px-3 py-2 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600 transition-all border";

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
      const res = await fetch("/api/process-cv", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      const d = json.data;
      setCv(prev => ({ ...prev, name: d.name || "", summary: d.summary || "", skills: d.skills || [], experience: d.experience || [] }));
    } catch (e) { setExtractErr(e instanceof Error ? e.message : "Extraction failed"); }
    finally { setIsExtracting(false); }
  };

  const handlePublish = async () => {
    if (!slug) {
      setSlugErr("Required");
      return;
    }
    if (slugErr) return;
    if (publishStatus === "success") return; // already paid
    setIsPublishing(true);
    setPublishMsg("");
    setPublishStatus("idle");

    try {
      // Step 1: Save the portfolio to get/update the DB row (and its ID)
      const saveRes = await fetch("/api/save-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolio: cv,
          slug,
          templateId: config.templateId,
          accent: config.accent,
          profileImage: config.profileImage,
        }),
      });
      const saveData = await saveRes.json();
      if (!saveRes.ok) throw new Error(saveData.error || "Failed to save portfolio");

      // Step 2: Create a Stripe Checkout session and redirect
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const checkoutData = await checkoutRes.json();

      if (checkoutRes.status === 409) {
        // Already paid — portfolio just wasn't flagged locally
        setPublishStatus("success");
        setPublishMsg("✅ Already published!");
        return;
      }
      if (!checkoutRes.ok) throw new Error(checkoutData.error || "Failed to start checkout");

      // Redirect to Stripe-hosted checkout page
      window.location.href = checkoutData.url;
    } catch (e) {
      setPublishStatus("error");
      setPublishMsg(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setIsPublishing(false);
    }
  };

  const setExp = useCallback((i: number, field: keyof ExpItem, val: string) =>
    setCv(p => ({ ...p, experience: p.experience.map((e, j) => j === i ? { ...e, [field]: val } : e) })), []);
  const removeExp = (i: number) => setCv(p => ({ ...p, experience: p.experience.filter((_, j) => j !== i) }));
  const addExp = () => setCv(p => ({ ...p, experience: [...p.experience, { title: "", company: "" }] }));

  const tabBtn = (t: SidebarTab, label: string) => (
    <button key={t} onClick={() => setActiveTab(t)}
      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === t ? "text-white bg-white/10 border border-white/20" : "text-slate-500 hover:text-slate-300"}`}
      style={activeTab === t ? { color: hex } : {}}>
      {label}
    </button>
  );

  return (
    <div className="flex flex-col text-white overflow-hidden" style={{ fontFamily: "Inter, sans-serif", height: "100vh", backgroundColor: "#0d0e12" }}>
      {/* ── Top Publish Bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0d0e12] z-10">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-white/30 hover:text-white/70 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-white/25 font-mono text-xs">portfolioai.app/p/</span>
            <input value={slug} onChange={e => validateSlug(e.target.value)} placeholder="your-slug"
              className="bg-transparent text-white/80 font-mono text-sm focus:outline-none border-b border-white/20 focus:border-white/50 pb-0.5 w-32 transition-colors placeholder-white/20" />
            {slugErr && <span className="text-red-400 text-xs">{slugErr}</span>}
            {slug && !slugErr && <a href={`/p/${slug}`} target="_blank" rel="noreferrer" className="text-white/25 hover:text-white/60 text-xs transition-colors">↗</a>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {publishMsg && (
            <span className={`text-xs font-semibold ${
              publishStatus === "success" ? "text-emerald-400" : "text-red-400"
            }`}>
              {publishMsg}
            </span>
          )}
          {publishStatus === "success" ? (
            // Post-payment state: show a live link instead of a button
            <a
              href={`/p/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ backgroundColor: "#10b981", color: "#fff", boxShadow: "0 4px 20px #10b98140" }}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
              View Live Site ↗
            </a>
          ) : (
            <button
              id="publish-btn"
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: hex, color: "#fff", boxShadow: `0 4px 20px ${hex}40` }}
            >
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Publish — $19
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left Sidebar */}
        <aside className="flex-shrink-0 border-r border-slate-800 flex flex-col overflow-hidden" style={{ width: "350px", backgroundColor: "#0d0e12" }}>
          {/* Tabs */}
          <div className="flex gap-1 p-2 border-b border-white/[0.08] flex-shrink-0">
            {(["content","design"] as SidebarTab[]).map(t => tabBtn(t, t.charAt(0).toUpperCase() + t.slice(1)))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6" style={{ backgroundColor: "#0d0e12" }}>
            
            {/* ── CONTENT TAB */}
            {activeTab === "content" && <>
              {/* CV Upload */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">AI Extraction</p>
                <div className="p-4 rounded-xl border border-dashed border-white/20 bg-white/5 text-center">
                  <button onClick={() => fileRef.current?.click()} disabled={isExtracting}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all w-full" style={{ backgroundColor: hex }}>
                    {isExtracting ? "Extracting with AI…" : "Upload PDF CV"}
                  </button>
                  <p className="text-[10px] text-white/40 mt-2">Auto-fill all your details instantly.</p>
                  <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => e.target.files?.[0] && handleCVExtract(e.target.files[0])} />
                  {extractErr && <p className="text-xs text-red-400 mt-2">{extractErr}</p>}
                </div>
              </div>

              {/* Profile Pic */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Profile Picture</p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-white/20 bg-[#171820] overflow-hidden cursor-pointer flex-shrink-0" onClick={() => imgRef.current?.click()}>
                    {config.profileImage ? <img src={config.profileImage} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center opacity-30">📷</div>}
                  </div>
                  <button onClick={() => imgRef.current?.click()} className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity" style={{ color: hex }}>Change Photo</button>
                  <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleProfileImg(e.target.files[0])} />
                </div>
              </div>

              {/* Basics */}
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Personal Info</p>
                <input value={cv.name} onChange={e => setCv(p => ({ ...p, name: e.target.value }))} className={inp} style={inpStyle} placeholder="Your name"/>
                <input value={cv.role || ""} onChange={e => setCv(p => ({ ...p, role: e.target.value }))} className={inp} style={inpStyle} placeholder="Your role (e.g. Software Engineer)"/>
                <input value={cv.email || ""} onChange={e => setCv(p => ({ ...p, email: e.target.value }))} className={inp} style={inpStyle} placeholder="Your email"/>
                <textarea value={cv.summary} onChange={e => setCv(p => ({ ...p, summary: e.target.value }))} className={ta} style={inpStyle} rows={4} placeholder="Write your professional summary…"/>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Skills</p>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {cv.skills.map((s, i) => (
                      <div key={i} className="flex items-center gap-1 rounded-full border border-white/20 pl-3 pr-1.5 py-1.5" style={{ backgroundColor: "#171820" }}>
                        <span className="text-xs text-white/80">{s}</span>
                        <button onClick={() => setCv(p => ({ ...p, skills: p.skills.filter((_, j) => j !== i) }))} className="text-white/30 hover:text-red-400 transition-colors text-lg leading-none ml-1">×</button>
                      </div>
                    ))}
                    <button onClick={() => { const s = prompt("Add skill"); if (s) setCv(p => ({ ...p, skills: [...p.skills, s] })); }}
                      className="text-xs px-3 py-1.5 rounded-full border border-dashed border-white/30 text-white/50 hover:text-white hover:border-white/50 transition-all">+ Add Skill</button>
                  </div>
              </div>

              {/* Experience */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Experience</p>
                  <button onClick={addExp} className="text-xs font-bold transition-colors" style={{ color: hex }}>+ Add Role</button>
                </div>
                <div className="space-y-3">
                  {cv.experience.map((e, i) => (
                    <div key={i} className="p-4 rounded-xl border border-white/10 space-y-2" style={{ backgroundColor: "#171820" }}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold opacity-50">Role {i+1}</span>
                        <button onClick={() => removeExp(i)} className="text-[10px] text-red-400 hover:text-red-300">Remove</button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input className={inp + " text-xs py-1.5"} style={{ ...inpStyle, backgroundColor: "#0d0e12" }} placeholder="Job Title" value={e.title} onChange={ev => setExp(i, "title", ev.target.value)}/>
                        <input className={inp + " text-xs py-1.5"} style={{ ...inpStyle, backgroundColor: "#0d0e12" }} placeholder="Company" value={e.company} onChange={ev => setExp(i, "company", ev.target.value)}/>
                      </div>
                      <input className={inp + " text-xs py-1.5"} style={{ ...inpStyle, backgroundColor: "#0d0e12" }} placeholder="Duration (e.g. 2020-2024)" value={e.duration || ""} onChange={ev => setExp(i, "duration", ev.target.value)}/>
                      <textarea className={ta + " text-xs py-1.5"} style={{ ...inpStyle, backgroundColor: "#0d0e12" }} rows={2} placeholder="Description…" value={e.description || ""} onChange={ev => setExp(i, "description", ev.target.value)}/>
                    </div>
                  ))}
                </div>
              </div>
            </>}

            {/* ── DESIGN TAB */}
            {activeTab === "design" && <>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Portfolio Template <span className="text-white/20">({TEMPLATES.length} available)</span></p>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => setConfig(c => ({ ...c, templateId: t.id }))}
                      className="p-3 rounded-xl border text-left transition-all flex flex-col h-full relative"
                      style={config.templateId === t.id ? { borderColor: hex, backgroundColor: `${hex}15` } : { borderColor: "#2a2d3a", backgroundColor: "#171820" }}>
                      {t.badge && (
                        <span className="absolute top-1.5 right-1.5 px-1 py-0.5 rounded text-[7px] font-black uppercase tracking-wider" style={{ backgroundColor: hex, color: "#fff" }}>{t.badge}</span>
                      )}
                      <span className="text-xl mb-1.5 leading-none">{t.emoji}</span>
                      <p className="text-xs font-bold text-white mb-0.5 leading-tight">{t.label}</p>
                      <p className="text-[10px] text-white/40 leading-snug flex-1">{t.desc}</p>
                      {config.templateId === t.id && <div className="mt-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: hex }}>✓</div>}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Accent Color</p>
                <div className="flex flex-wrap gap-3">
                  {ACCENTS.map(a => (
                    <button key={a.id} onClick={() => setConfig(c => ({ ...c, accent: a.id }))} title={a.id}
                      className="w-10 h-10 rounded-full transition-all"
                      style={{ backgroundColor: a.hex, boxShadow: config.accent === a.id ? `0 0 0 4px #0d0e12, 0 0 0 6px ${a.hex}` : "none", transform: config.accent === a.id ? "scale(1.1)" : "scale(1)" }}/>
                  ))}
                </div>
              </div>
            </>}
          </div>
        </aside>

        {/* ── Right Canvas */}
        <main className="flex-1 overflow-hidden flex flex-col" style={{ backgroundColor: "#050507" }}>
          {/* Canvas toolbar */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60"/>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"/>
              <div className="w-3 h-3 rounded-full bg-green-500/60"/>
              <span className="ml-3 text-xs text-white/20 font-mono">{slug ? `portfolioai.app/p/${slug}` : "portfolioai.app/p/your-slug"}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/20">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/8">Live Preview</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            </div>
          </div>

          {/* Canvas area */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <div className="w-full max-w-5xl h-[800px] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
              <LivePreviewCanvas cv={cv} config={config} slug={slug}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
