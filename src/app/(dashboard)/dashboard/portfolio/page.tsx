"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getColor } from "colorthief";
import CinematicTemplateClient        from "@/app/p/[slug]/CinematicTemplate.client";
import FuturisticTemplateClient       from "@/app/p/[slug]/FuturisticTemplate.client";
import PremiumTemplateClient          from "@/app/p/[slug]/PremiumTemplate.client";
import ChicTechTemplateClient         from "@/app/p/[slug]/ChicTechTemplate.client";
import CorporateAITemplateClient      from "@/app/p/[slug]/CorporateAITemplate.client";
import ElegantDeveloperTemplateClient from "@/app/p/[slug]/ElegantDeveloperTemplate.client";
import ProfessionalPortfolioTemplateClient from "@/app/p/[slug]/ProfessionalPortfolioTemplate.client";
import RoboticsPortfolioTemplateClient    from "@/app/p/[slug]/RoboticsPortfolioTemplate.client";
import { supabaseBrowser } from "@/lib/supabase";
import { GlassPanel, NeonRing, MacWindowChrome, GlowInput, BottomDock, AnalyticsPanel, ProjectsPanel, InterviewDefender, HistoryPanel } from "./SpatialPanels";

interface ExpItem { title: string; company: string; duration?: string; description?: string; }
interface CVData { name: string; role?: string; email?: string; location?: string; bio?: string; summary: string; skills: string[]; experience: ExpItem[]; phone?: string; linkedin?: string; github?: string; whatsapp?: string; facebook?: string; cv_url?: string; }
type TemplateId = "cinematic"|"futuristic"|"premium"|"chic-tech"|"corporate-ai"|"elegant"|"professional"|"robotics";
interface SiteConfig { templateId: TemplateId; accent: string; profileImage: string; }

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id:"cinematic",    label:"Cinematic"    },
  { id:"futuristic",   label:"Futuristic"   },
  { id:"premium",      label:"Premium"      },
  { id:"chic-tech",    label:"Chic Tech"    },
  { id:"corporate-ai", label:"Corporate AI" },
  { id:"elegant",      label:"Elegant Dev"  },
  { id:"professional", label:"Professional" },
  { id:"robotics",     label:"Robotics"     },
];

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

const useVoiceCommand = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";
        
        recognitionRef.current.onresult = (event: any) => {
          const current = event.resultIndex;
          const result = event.results[current][0].transcript;
          setTranscript(result);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition error:", e);
      }
    }
  };

  return { isListening, transcript, toggleListening };
};

const saveVersion = async (userId: string, cv: CVData, config: SiteConfig, slug: string) => {
  try {
    const { error } = await supabaseBrowser
      .from('portfolio_versions')
      .insert({
        user_id: userId,
        slug,
        cv_state: cv,
        config_state: config,
        created_at: new Date().toISOString(),
        description: `Snapshot at ${new Date().toLocaleTimeString()}`
      });
    if (error) throw error;
  } catch (err) {
    console.error("Failed to save version:", err);
  }
};

const fetchVersions = async (userId: string, slug: string) => {
  try {
    const { data, error } = await supabaseBrowser
      .from('portfolio_versions')
      .select('*')
      .eq('user_id', userId)
      .eq('slug', slug)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Failed to fetch versions:", err);
    return [];
  }
};

export default function PortfolioBuilderPage() {
  const searchParams = useSearchParams();
  const [cv, setCv] = useState<CVData>({ name:"", summary:"", skills:[], experience:[] });
  const [config, setConfig] = useState<SiteConfig>({ templateId:"cinematic", accent:"violet", profileImage:"" });
  const [slug, setSlug] = useState("");
  const [slugErr, setSlugErr] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState("");
  const [publishStatus, setPublishStatus] = useState<"idle"|"success"|"error">("idle");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractErr, setExtractErr] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [focusedField, setFocusedField] = useState<string|null>(null);
  const [themeColor, setThemeColor] = useState<string|null>(null);
  const [activeTab, setActiveTab] = useState<"profile"|"analytics"|"projects"|"history">("profile");
  const [isEditMode, setIsEditMode] = useState(false);
  const [versions, setVersions] = useState<any[]>([]);
  const [userId, setUserId] = useState<string|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef  = useRef<HTMLInputElement>(null);

  const { isListening, transcript, toggleListening } = useVoiceCommand();
  const [commandFeedback, setCommandFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!transcript) return;
    const text = transcript.toLowerCase();
    let handled = false;
    let feedback = "";
    
    const templateMatch = TEMPLATES.find(t => text.includes(t.id.replace("-", " ")) || text.includes(t.label.toLowerCase()));
    if (templateMatch) {
      setConfig(c => ({...c, templateId: templateMatch.id}));
      feedback = `Theme -> ${templateMatch.label}`;
      handled = true;
    }
    
    const colors: Record<string, string> = { "purple": "violet", "cyan": "cyan", "blue": "sky", "emerald": "emerald", "green": "emerald", "indigo": "indigo", "rose": "rose", "amber": "amber", "slate": "slate" };
    for (const [key, val] of Object.entries(colors)) {
      if (text.includes(key)) {
        setConfig(c => ({...c, accent: val}));
        feedback = feedback ? `${feedback} & Color -> ${val}` : `Color -> ${val}`;
        handled = true;
      }
    }

    if (handled) {
      setCommandFeedback(`Command accepted: ${feedback}`);
    } else {
      setCommandFeedback(`Unrecognized: "${transcript}"`);
    }

    const timer = setTimeout(() => setCommandFeedback(null), 4000);
    return () => clearTimeout(timer);
  }, [transcript]);

  useEffect(() => {
    if (config.profileImage) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = config.profileImage;
      img.onload = () => {
        getColor(img)
          .then(color => {
            if (color) {
              setThemeColor(color.hex());
            }
          })
          .catch(e => console.error("Color extraction failed", e));
      };
    } else {
      setThemeColor(null);
    }
  }, [config.profileImage]);

  useEffect(() => {
    if (searchParams.get("published") === "1") {
      setPublishStatus("success"); setPublishMsg("🎉 Portfolio is live!");
      const s = searchParams.get("slug"); if (s) setSlug(s);
    } else if (searchParams.get("cancelled") === "1") {
      setPublishStatus("error"); setPublishMsg("Payment cancelled.");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const { data: sessionData } = await supabaseBrowser.auth.getSession();
        if (!sessionData?.session?.user) return;
        setUserId(sessionData.session.user.id);
        
        const { data, error } = await supabaseBrowser
          .from('portfolios')
          .select('*')
          .eq('user_id', sessionData.session.user.id)
          .single();
          
        if (data) {
          setIsEditMode(true);
          setSlug(data.slug);
          setCv(p => ({
            ...p,
            name: data.name || "",
            summary: data.summary || "",
            skills: data.skills || [],
            experience: data.experience || [],
            cv_url: data.cv_url
          }));
          setConfig(c => ({
            ...c,
            templateId: (data.template_id as TemplateId) || "cinematic",
            accent: data.layout?.root?.props?.accent || "indigo",
            profileImage: data.profile_image || ""
          }));
          if (data.is_published) {
            setPublishStatus("success");
            setPublishMsg("🎉 Portfolio is live!");
          }
          
          const v = await fetchVersions(sessionData.session.user.id, data.slug);
          setVersions(v);
        }
      } catch (err) {
        console.error("Fetch existing portfolio err:", err);
      }
    };
    fetchExisting();
  }, []);

  const validateSlug = (v: string) => {
    const c = v.toLowerCase().replace(/[^a-z0-9-]/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");
    setSlug(c); setSlugErr(c.length>0&&c.length<3?"Min 3 chars":""); return c;
  };

  const handleProfileImg = (f: File) => {
    const r = new FileReader();
    r.onload = (e) => setConfig(c=>({...c, profileImage: e.target?.result as string}));
    r.readAsDataURL(f);
  };

  const handleCVExtract = async (file: File) => {
    setIsExtracting(true); setExtractErr("");
    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabaseBrowser
        .storage
        .from('cv-files')
        .upload(fileName, file);

      let cv_url = "";
      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
      } else {
        const { data: urlData } = supabaseBrowser.storage.from('cv-files').getPublicUrl(fileName);
        cv_url = urlData.publicUrl;
      }

      // 2. Process CV data
      const fd = new FormData(); fd.append("cv", file);
      const res = await fetch("/api/process-cv",{ method:"POST", body:fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error||"Failed");
      const d = json.data;
      setCv(p=>({...p, name:d.name||"", summary:d.summary||"", skills:d.skills||[], experience:d.experience||[], cv_url: cv_url || p.cv_url}));
    } catch(e) { setExtractErr(e instanceof Error?e.message:"Extraction failed"); }
    finally { setIsExtracting(false); }
  };

  const handlePublish = async () => {
    if (!slug){setSlugErr("Required");return;} if(slugErr)return;
    setIsPublishing(true); setPublishMsg(""); setPublishStatus("idle");
    try {
      const { data: sessionData } = await supabaseBrowser.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      const sr = await fetch("/api/save-portfolio",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({portfolio:cv,slug,templateId:config.templateId,accent:config.accent,profileImage:config.profileImage, userId})});
      const sd = await sr.json(); if(!sr.ok) throw new Error(sd.error||"Failed to save");
      
      if (isEditMode) {
        setPublishStatus("success");
        setPublishMsg("✅ Portfolio Updated!");
        return;
      }

      const cr = await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({slug})});
      const cd = await cr.json();
      if(cr.status===409){setPublishStatus("success");setPublishMsg("✅ Already published!");return;}
      if(!cr.ok) throw new Error(cd.error||"Failed to start checkout");
      window.location.href = cd.url;
    } catch(e){setPublishStatus("error");setPublishMsg(e instanceof Error?e.message:"Unexpected error");}
    finally{setIsPublishing(false);}
  };

  const handleTranslate = async (lang: string) => {
    if (!cv.name && !cv.summary) return;
    setIsTranslating(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData: cv, targetLang: lang })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to translate");
      setCv({ ...cv, ...data.translatedCV });
    } catch(err) {
      console.error(err);
      alert("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCreateSnapshot = async () => {
    if (!userId || !slug) {
      setPublishStatus("error"); setPublishMsg("Save portfolio first."); return;
    }
    setPublishStatus("idle"); setPublishMsg("Creating snapshot...");
    await saveVersion(userId, cv, config, slug);
    const v = await fetchVersions(userId, slug);
    setVersions(v);
    setPublishStatus("success"); setPublishMsg("📸 Snapshot saved!");
    setTimeout(() => setPublishMsg(""), 3000);
  };

  const handleRestore = (v: any) => {
    setCv(v.cv_state);
    setConfig(v.config_state);
    setPublishStatus("success"); setPublishMsg("✨ Restored!");
    setTimeout(() => setPublishMsg(""), 3000);
  };

  const setExp    = useCallback((i:number,field:keyof ExpItem,val:string)=>setCv(p=>({...p,experience:p.experience.map((e,j)=>j===i?{...e,[field]:val}:e)})),[]);
  const removeExp = (i:number)=>setCv(p=>({...p,experience:p.experience.filter((_,j)=>j!==i)}));
  const addExp    = ()=>setCv(p=>({...p,experience:[...p.experience,{title:"",company:""}]}));
  const fProps    = (id:string)=>({ id, focused:focusedField===id, onFocus:()=>setFocusedField(id), onBlur:()=>setFocusedField(null) });
  const tLabel    = TEMPLATES.find(t=>t.id===config.templateId)?.label ?? "Cinematic";

  return (
    <div className="relative flex flex-col overflow-hidden" style={{height:"100vh",background:"#030308",fontFamily:"'JetBrains Mono',monospace"}}>

      {/* ── Deep space stage glow ── */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{background:`radial-gradient(ellipse 80% 40% at 50% 100%,${themeColor ? themeColor+'20' : 'rgba(34,211,238,0.12)'} 0%,${themeColor ? themeColor+'15' : 'rgba(139,92,246,0.10)'} 40%,transparent 70%)`}} />
      <div className="pointer-events-none fixed inset-0 z-0" style={{background:`radial-gradient(ellipse 60% 25% at 50% 102%,${themeColor ? themeColor+'30' : 'rgba(34,211,238,0.18)'} 0%,transparent 60%)`}} />

      {/* ── Top command bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 z-20 border-b" style={{borderColor:"rgba(255,255,255,0.05)",background:"rgba(3,3,8,0.85)",backdropFilter:"blur(20px)"}}>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" style={{color:"#52526a"}} className="hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{background:"linear-gradient(135deg,#22d3ee,#8b5cf6)"}} />
            <span className="text-white font-bold text-sm tracking-wide">KONEKTUS AI</span>
            <span className="text-xs" style={{color:"#52526a"}}>Portfolio Builder</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{background:"rgba(139,92,246,0.1)",border:"1px solid rgba(139,92,246,0.25)"}}>
          <div className="w-3 h-3 rounded" style={{background:"linear-gradient(135deg,#22d3ee,#8b5cf6)"}} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{background:"linear-gradient(90deg,#22d3ee,#8b5cf6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AI Command Center</span>
        </div>
        <div className="flex items-center gap-3">
          {publishMsg && <span className={`text-xs font-semibold ${publishStatus==="success"?"text-emerald-400":"text-red-400"}`}>{publishMsg}</span>}
          <div className="flex items-center gap-1.5 text-xs" style={{color:"#52526a"}}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            Auto-saved
          </div>
          <button onClick={handleCreateSnapshot} className="px-2 py-1.5 rounded-lg text-xs font-semibold" style={{color: "#22d3ee", background:"rgba(34,211,238,0.1)",border:"1px solid rgba(34,211,238,0.2)"}}>
            Create Snapshot 📸
          </button>
          <div className="relative group">
            <button disabled={isTranslating} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white disabled:opacity-50" style={{background:"rgba(139,92,246,0.15)",border:"1px solid rgba(139,92,246,0.3)", boxShadow:"0 0 15px rgba(139,92,246,0.15)"}}>
              {isTranslating ? (
                <svg className="animate-spin h-3 w-3 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
              )}
              {isTranslating ? "Translating..." : "Translate CV"}
            </button>
            <div className="absolute right-0 mt-2 w-32 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden" style={{background:"rgba(13,13,30,0.95)",border:"1px solid rgba(139,92,246,0.3)",boxShadow:"0 10px 30px rgba(0,0,0,0.8),0 0 20px rgba(139,92,246,0.2)",backdropFilter:"blur(12px)"}}>
              <div className="flex flex-col">
                {[ {l:"English",f:"🇺🇸"}, {l:"French",f:"🇫🇷"}, {l:"Spanish",f:"🇪🇸"}, {l:"German",f:"🇩🇪"}, {l:"Arabic",f:"🇦🇪"} ].map(lang => (
                  <button key={lang.l} onClick={() => handleTranslate(lang.l)} className="flex items-center gap-2 px-4 py-2.5 text-xs text-white hover:bg-white/10 transition-colors text-left">
                    <span>{lang.f}</span> {lang.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)"}}>Preview</button>
          {publishStatus==="success" && (
            <a href={`/p/${slug}`} target="_blank" rel="noreferrer" className="px-4 py-1.5 rounded-lg text-sm font-bold text-white" style={{background:"linear-gradient(135deg,#059669,#047857)"}}>View Live ↗</a>
          )}
          <button id="publish-btn" onClick={handlePublish} disabled={isPublishing} className="px-4 py-1.5 rounded-lg text-sm font-bold text-white disabled:opacity-40" style={{background:"linear-gradient(135deg,#22d3ee,#8b5cf6)",boxShadow:"0 0 20px rgba(34,211,238,0.3)"}}>
            {isPublishing ? (isEditMode ? "Updating…" : "Preparing…") : (isEditMode ? "Update Portfolio" : "Export — $19")}
          </button>
        </div>
      </div>

      {/* ── Main stage: 3-column spatial layout ── */}
      <div className="flex flex-1 overflow-hidden relative z-10 gap-4 p-4 pb-28">

        {/* LEFT PANEL — AI Dropzone */}
        <motion.div initial={{x:-60,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}} className="flex-shrink-0" style={{width:220}}>
          <GlassPanel glow="cyan" dynamicGlow={themeColor} style={{height:"100%",display:"flex",flexDirection:"column"}}>
            {/* Sidebar icon nav */}
            <div className="flex flex-col items-center gap-1 py-4 border-b" style={{borderColor:"rgba(255,255,255,0.05)"}}>
              {[
                {icon:"✦",label:"AI Upload",active:activeTab==="profile"||activeTab==="analytics"||activeTab==="projects"||activeTab==="history", id:"ai"},
                {icon:"👤",label:"Profile",active:activeTab==="profile", id:"profile"},
                {icon:"📈",label:"Analytics",active:activeTab==="analytics", id:"analytics"},
                {icon:"🗂",label:"Projects",active:activeTab==="projects", id:"projects"},
                {icon:"⏳",label:"History",active:activeTab==="history", id:"history"},
                {icon:"ℹ",label:"About",active:false, id:"about"},
                {icon:"⚡",label:"Skills",active:false, id:"skills"},
                {icon:"💼",label:"Experience",active:false, id:"experience"},
                {icon:"🎨",label:"Design",active:false, id:"design"},
                {icon:"⚙",label:"Settings",active:false, id:"settings"},
              ].map(item=>(
                <button key={item.label} onClick={() => { if(["profile","analytics","projects","history"].includes(item.id)) setActiveTab(item.id as any); }} title={item.label} className="w-full flex flex-col items-center gap-1 py-2 rounded-lg transition-all" style={{background:item.active?"rgba(34,211,238,0.08)":"transparent",color:item.active?"#22d3ee":"#52526a"}}>
                  <span style={{fontSize:16}}>{item.icon}</span>
                  <span style={{fontSize:8,letterSpacing:"0.1em",textTransform:"uppercase"}}>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Dropzone */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] uppercase tracking-widest font-bold" style={{color:"#52526a"}}>AI Dropzone</span>
                <button style={{color:"#52526a",background:"none",border:"none",cursor:"pointer",fontSize:14}}>×</button>
              </div>

              <motion.div onClick={()=>!isExtracting&&fileRef.current?.click()} whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                className="flex flex-col items-center gap-4 cursor-pointer">
                <NeonRing extracting={isExtracting}/>
                <div className="text-center">
                  <p className="text-sm font-bold mb-1" style={{color:"#e0e8ff"}}>{isExtracting?"Extracting…":"Drop your CV here"}</p>
                  <p className="text-[10px]" style={{color:"#52526a"}}>Let AI transform your story{"\n"}into a stunning portfolio</p>
                  <p className="text-[9px] mt-1" style={{color:"#3a3a52"}}>or</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white w-full justify-center" style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)"}}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  Choose File
                </button>
              </motion.div>
              <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={e=>e.target.files?.[0]&&handleCVExtract(e.target.files[0])}/>
              {extractErr&&<p className="text-[10px] text-red-400 text-center">{extractErr}</p>}
              <div className="flex items-center gap-1.5 mt-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                <span className="text-[9px]" style={{color:"#52526a"}}>Supports PDF · DOCX · TXT</span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* CENTER PANEL — Live Preview */}
        <motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8,delay:0.15,ease:[0.22,1,0.36,1]}} className="flex-1 flex flex-col min-w-0">
          <GlassPanel glow="purple" dynamicGlow={themeColor} style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:themeColor ? `0 0 60px ${themeColor}20,0 40px 120px rgba(0,0,0,0.9),0 0 1px ${themeColor}50` : "0 0 60px rgba(139,92,246,0.12),0 40px 120px rgba(0,0,0,0.9),0 0 1px rgba(139,92,246,0.3)"}}>
            <MacWindowChrome slug={slug}/>
            <div style={{flex:1,overflowY:"auto",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"24px 24px 32px",background:"rgba(0,0,0,0.2)"}}>
              <motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}}
                style={{width:"100%",maxWidth:1024,minHeight:700,borderRadius:8,overflow:"hidden",position:"relative",
                  border:"1px solid rgba(255,255,255,0.06)",
                  boxShadow:"0 32px 100px -10px rgba(0,0,0,0.95),0 8px 32px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.04)"}}>
                <LivePreviewCanvas cv={cv} config={config} slug={slug}/>
                <InterviewDefender themeColor={themeColor} cvData={cv} />
              </motion.div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* RIGHT PANEL — Edit Profile Form or Analytics or Projects */}
        <motion.div initial={{x:60,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}} className="flex-shrink-0" style={{width:300}}>
          {activeTab === "analytics" ? (
            <AnalyticsPanel themeColor={themeColor} onClose={() => setActiveTab("profile")} />
          ) : activeTab === "projects" ? (
            <ProjectsPanel themeColor={themeColor} onClose={() => setActiveTab("profile")} />
          ) : activeTab === "history" ? (
            <HistoryPanel themeColor={themeColor} onClose={() => setActiveTab("profile")} versions={versions} onRestore={handleRestore} />
          ) : (
            <GlassPanel glow="purple" dynamicGlow={themeColor} style={{height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{borderColor:"rgba(255,255,255,0.05)"}}>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{color:"#8888a8"}}>Edit Profile</span>
                <button style={{color:"#52526a",background:"none",border:"none",cursor:"pointer",fontSize:16}}>×</button>
              </div>

            <div className="flex-1 overflow-y-auto px-5 py-4" style={{display:"flex",flexDirection:"column",gap:20}}>
              {/* Premium glowing circular avatar uploader */}
              <div className="flex flex-col items-center justify-center mb-4">
                <div 
                  onClick={()=>imgRef.current?.click()} 
                  className="relative flex items-center justify-center rounded-full cursor-pointer group"
                  style={{width: 80, height: 80}}
                >
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      border: "1.5px solid transparent", 
                      background: "conic-gradient(from 0deg, #22d3ee, #8b5cf6, #22d3ee) border-box",
                      WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)", 
                      WebkitMaskComposite: "destination-out",
                      maskComposite: "exclude" 
                    }} 
                  />
                  <div 
                    className="absolute inset-1 rounded-full overflow-hidden flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "inset 0 0 20px rgba(139,92,246,0.15)" }}
                  >
                    {config.profileImage ? (
                      <img src={config.profileImage} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={()=>imgRef.current?.click()} className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-white" style={{color: themeColor || "#22d3ee",background:"none",border:"none",cursor:"pointer"}}>
                    {config.profileImage ? "Change Avatar" : "Upload Avatar"}
                  </button>
                  {themeColor && (
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: `${themeColor}20`, border: `1px solid ${themeColor}40` }}>
                      <span style={{ fontSize: 10 }}>🪄</span>
                      <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: themeColor }}>Theme auto-generated</span>
                    </motion.div>
                  )}
                </div>
                <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&handleProfileImg(e.target.files[0])}/>
              </div>

              <GlowInput label="Full Name" value={cv.name} onChange={v=>setCv(p=>({...p,name:v}))} {...fProps("name")}/>
              <GlowInput label="Title" value={cv.role||""} onChange={v=>setCv(p=>({...p,role:v}))} {...fProps("role")}/>
              <GlowInput label="Location" value={cv.location||""} onChange={v=>setCv(p=>({...p,location:v}))} {...fProps("location")}/>
              <GlowInput label="Email" value={cv.email||""} onChange={v=>setCv(p=>({...p,email:v}))} {...fProps("email")}/>
              <GlowInput label="Phone" value={cv.phone||""} onChange={v=>setCv(p=>({...p,phone:v}))} {...fProps("phone")}/>
              <GlowInput label="LinkedIn" value={cv.linkedin||""} onChange={v=>setCv(p=>({...p,linkedin:v}))} {...fProps("linkedin")}/>
              <GlowInput label="GitHub" value={cv.github||""} onChange={v=>setCv(p=>({...p,github:v}))} {...fProps("github")}/>
              <GlowInput label="WhatsApp" value={cv.whatsapp||""} onChange={v=>setCv(p=>({...p,whatsapp:v}))} {...fProps("whatsapp")}/>
              <GlowInput label="Facebook" value={cv.facebook||""} onChange={v=>setCv(p=>({...p,facebook:v}))} {...fProps("facebook")}/>
              <GlowInput label="Bio" value={cv.summary} onChange={v=>setCv(p=>({...p,summary:v}))} multiline rows={4} {...fProps("summary")}/>

              {/* Char count */}
              <div className="flex justify-end">
                <span className="text-[9px]" style={{color:"#52526a"}}>{cv.summary.length} / 160</span>
              </div>

              {/* Skills */}
              <div>
                <label className="block mb-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{color:"#6666aa"}}>Skills</label>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {cv.skills.map((s,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:6,background:"rgba(34,211,238,0.06)",border:"1px solid rgba(34,211,238,0.15)"}}>
                      <span style={{fontSize:11,color:"#c0c0e0"}}>{s}</span>
                      <button onClick={()=>setCv(p=>({...p,skills:p.skills.filter((_,j)=>j!==i)}))} style={{color:"#52526a",background:"none",border:"none",cursor:"pointer",fontSize:14,lineHeight:1,padding:0}}>×</button>
                    </div>
                  ))}
                  <button onClick={()=>{const s=prompt("Add skill");if(s)setCv(p=>({...p,skills:[...p.skills,s]}))} } style={{fontSize:11,padding:"3px 10px",borderRadius:6,color:"#22d3ee",background:"rgba(34,211,238,0.05)",border:"1px dashed rgba(34,211,238,0.2)",cursor:"pointer"}}>+ Add Skill</button>
                </div>
              </div>

              {/* Slug + publish */}
              <div>
                <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em]" style={{color:"#6666aa"}}>Portfolio URL</label>
                <div style={{display:"flex",alignItems:"center",gap:0,borderBottom:"1.5px solid rgba(139,92,246,0.3)"}}>
                  <span style={{fontSize:10,color:"#52526a",whiteSpace:"nowrap"}}>portfolioai.app/p/</span>
                  <input value={slug} onChange={e=>validateSlug(e.target.value)} placeholder="your-slug" style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#e0e0ff",fontSize:13,padding:"6px 4px",fontFamily:"'JetBrains Mono',monospace"}}/>
                </div>
                {slugErr&&<p className="text-red-400 text-[10px] mt-1">{slugErr}</p>}
              </div>

              {/* Template picker */}
              <div>
                <label className="block mb-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{color:"#6666aa"}}>Template</label>
                <select value={config.templateId} onChange={e=>setConfig(c=>({...c,templateId:e.target.value as TemplateId}))}
                  style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,color:"#e0e0ff",fontSize:12,padding:"8px 10px",fontFamily:"'JetBrains Mono',monospace",cursor:"pointer",outline:"none"}}>
                  {TEMPLATES.map(t=><option key={t.id} value={t.id} style={{background:"#0d0d1e"}}>{t.label}</option>)}
                </select>
              </div>

              {/* Pro tip */}
              <div className="rounded-xl p-3 mt-2" style={{background:"rgba(234,179,8,0.06)",border:"1px solid rgba(234,179,8,0.15)"}}>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{fontSize:12}}>💡</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{color:"#eab308"}}>Pro Tip</span>
                </div>
                <p className="text-[10px]" style={{color:"#888880"}}>Add more projects to showcase your best work.</p>
                <div className="mt-2 rounded-full h-1" style={{background:"rgba(255,255,255,0.06)"}}>
                  <div className="h-1 rounded-full" style={{width:"50%",background:"linear-gradient(90deg,#22d3ee,#8b5cf6)"}}/>
                </div>
                <div className="flex justify-end mt-1"><span className="text-[9px]" style={{color:"#52526a"}}>3 / 6</span></div>
              </div>
            </div>
          </GlassPanel>
          )}
        </motion.div>
      </div>

      {/* ── Bottom floating dock ── */}
      <BottomDock 
        onGenerate={()=>fileRef.current?.click()} 
        isExtracting={isExtracting} 
        templateLabel={tLabel} 
        accentName={config.accent}
        onMicClick={toggleListening}
        isListening={isListening}
        commandFeedback={commandFeedback}
      />

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.4); }
      `}</style>
    </div>
  );
}
