"use client";
import React, { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export function FloatingAdminDockClient({ portfolio }: { portfolio: any }) {
  const [isOwner, setIsOwner] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [versions, setVersions] = useState<any[]>([]);
  const [cvData, setCvData] = useState(portfolio);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (data?.session?.user?.id === portfolio.user_id) {
        setIsOwner(true);
      }
    });
  }, [portfolio.user_id]);

  useEffect(() => {
    if (isOwner && showHistory) {
      supabaseBrowser.from('portfolio_versions').select('*')
        .eq('user_id', portfolio.user_id).eq('slug', portfolio.slug)
        .order('created_at', { ascending: false })
        .then(({ data }) => setVersions(data || []));
    }
  }, [isOwner, showHistory, portfolio]);

  const handleRestore = async (version: any) => {
    const rootProps = portfolio.layout?.root?.props || {};
    await fetch("/api/save-portfolio", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        portfolio: version.cv_state, 
        slug: portfolio.slug, 
        templateId: version.config_state.templateId || portfolio.template_id, 
        accent: version.config_state.accent || rootProps.accent, 
        profileImage: version.config_state.profileImage || portfolio.profile_image, 
        userId: portfolio.user_id 
      })
    });
    window.location.reload();
  };

  const handleSaveEdits = async () => {
    setIsSaving(true);
    const rootProps = portfolio.layout?.root?.props || {};
    await fetch("/api/save-portfolio", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        portfolio: { ...cvData, experience: portfolio.experience, skills: portfolio.skills }, 
        slug: portfolio.slug, 
        templateId: portfolio.template_id, 
        accent: rootProps.accent, 
        profileImage: portfolio.profile_image, 
        userId: portfolio.user_id 
      })
    });
    setIsSaving(false);
    setIsEditMode(false);
    window.location.reload();
  };

  if (!isOwner) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto" style={{fontFamily:"'JetBrains Mono',monospace"}}>
      
      {/* ── Dock ── */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.08]"
        style={{ background:"rgba(10,10,25,0.85)", backdropFilter:"blur(30px)", boxShadow:"0 -4px 40px rgba(34,211,238,0.08),0 0 80px rgba(0,0,0,0.8)" }}>
        <div className="flex items-center gap-2 px-2">
          <span className="text-[14px]">👑</span>
          <div>
            <p className="text-[9px] uppercase tracking-widest" style={{ color:"#52526a" }}>Mode</p>
            <p className="text-[11px] font-semibold text-emerald-400">Owner CMS</p>
          </div>
        </div>
        <div style={{ width:1,height:32,background:"rgba(255,255,255,0.06)" }} />
        
        <button onClick={() => { setIsEditMode(true); setShowHistory(false); }} className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors">
          <span className="text-[12px]">✏️</span>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#c0c0e0" }}>Edit Mode</span>
        </button>

        <div style={{ width:1,height:32,background:"rgba(255,255,255,0.06)" }} />
        
        <button onClick={() => { setShowHistory(true); setIsEditMode(false); }} className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors">
          <span className="text-[12px]">⏳</span>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#c0c0e0" }}>History</span>
        </button>
      </motion.div>

      {/* ── Edit Modal ── */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[400px] rounded-2xl border p-5 shadow-2xl"
            style={{ background: "rgba(10,10,25,0.95)", borderColor: "rgba(34,211,238,0.3)", backdropFilter: "blur(40px)", boxShadow: "0 0 40px rgba(34,211,238,0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Quick Edit</span>
              <button onClick={() => setIsEditMode(false)} className="text-gray-400 hover:text-white">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase text-gray-400 block mb-1">Name</label>
                <input value={cvData.name || ''} onChange={e => setCvData({...cvData, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="text-[10px] uppercase text-gray-400 block mb-1">Role</label>
                <input value={cvData.role || ''} onChange={e => setCvData({...cvData, role: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="text-[10px] uppercase text-gray-400 block mb-1">Summary</label>
                <textarea rows={4} value={cvData.summary || ''} onChange={e => setCvData({...cvData, summary: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400" />
              </div>
              <button onClick={handleSaveEdits} disabled={isSaving} className="w-full py-2.5 rounded-lg text-black font-bold uppercase tracking-widest text-[10px] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50">
                {isSaving ? "Saving..." : "Save & Publish"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── History Modal ── */}
      <AnimatePresence>
        {showHistory && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[400px] max-h-[500px] flex flex-col rounded-2xl border p-5 shadow-2xl"
            style={{ background: "rgba(10,10,25,0.95)", borderColor: "rgba(139,92,246,0.3)", backdropFilter: "blur(40px)", boxShadow: "0 0 40px rgba(139,92,246,0.1)" }}>
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Time Machine</span>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-white">×</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {versions.length === 0 ? <p className="text-xs text-gray-500 text-center py-4">No snapshots found.</p> : null}
              {versions.map(v => (
                <div key={v.id} className="p-4 rounded-xl border border-white/10 bg-white/5 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
                  <p className="text-[11px] font-bold text-white mb-1">
                    {new Date(v.created_at).toLocaleDateString()} — {new Date(v.created_at).toLocaleTimeString()}
                  </p>
                  <p className="text-[10px] text-gray-400 mb-3">{v.description || "Auto-Snapshot"}</p>
                  <button onClick={() => handleRestore(v)} className="w-full py-2 rounded-lg border border-purple-500/50 text-purple-400 text-[9px] uppercase tracking-widest font-bold hover:bg-purple-500 hover:text-white transition-colors">
                    Revert to this version
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
