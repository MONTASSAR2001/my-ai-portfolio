"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef } from "react";

// ── Shared glass panel base ───────────────────────────────────────────────────
export const GlassPanel = ({
  children, className = "", glow = "cyan", style = {},
}: { children: React.ReactNode; className?: string; glow?: "cyan"|"purple"|"none"; style?: React.CSSProperties }) => {
  const shadow =
    glow === "cyan"   ? "0 0 40px rgba(34,211,238,0.08), 0 0 1px rgba(34,211,238,0.2)" :
    glow === "purple" ? "0 0 40px rgba(139,92,246,0.10), 0 0 1px rgba(139,92,246,0.25)" : "none";
  return (
    <div
      className={`relative rounded-2xl border border-white/[0.07] ${className}`}
      style={{ background:"rgba(0,0,0,0.45)", backdropFilter:"blur(24px)", boxShadow: shadow, ...style }}
    >
      {children}
    </div>
  );
};

// ── Neon pulsing ring for PDF icon ───────────────────────────────────────────
export const NeonRing = ({ extracting }: { extracting: boolean }) => (
  <div className="relative flex items-center justify-center" style={{ width:130, height:130 }}>
    {/* Outer slow-spin ring */}
    <motion.div animate={{ rotate: 360 }} transition={{ duration:8, repeat:Infinity, ease:"linear" }}
      className="absolute inset-0 rounded-full"
      style={{ border:"1.5px solid transparent", background:"conic-gradient(from 0deg, #22d3ee, #8b5cf6, #22d3ee) border-box",
        WebkitMask:"linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)", WebkitMaskComposite:"destination-out",
        maskComposite:"exclude" }} />
    {/* Inner glow ring */}
    <motion.div animate={{ scale:[1,1.06,1], opacity:[0.6,1,0.6] }} transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}
      className="absolute rounded-full"
      style={{ inset:8, border:"1px solid rgba(34,211,238,0.4)",
        boxShadow:"0 0 24px rgba(34,211,238,0.35), inset 0 0 24px rgba(34,211,238,0.1)" }} />
    {/* Middle decorative ring */}
    <div className="absolute rounded-full" style={{ inset:20, border:"1px solid rgba(139,92,246,0.25)" }} />
    {/* Center icon */}
    <div className="relative z-10 flex flex-col items-center justify-center"
      style={{ width:56, height:56, borderRadius:12, background:"rgba(34,211,238,0.08)",
        border:"1px solid rgba(34,211,238,0.3)", boxShadow:"0 0 20px rgba(34,211,238,0.2)" }}>
      {extracting ? (
        <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:"linear" }}
          style={{ width:22, height:22, border:"2px solid rgba(34,211,238,0.3)", borderTopColor:"#22d3ee", borderRadius:"50%" }} />
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="12" height="18" rx="2" stroke="#22d3ee" strokeWidth="1.5"/>
          <path d="M4 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#22d3ee" strokeWidth="1.5" fill="none"/>
          <path d="M14 2v5h5" stroke="#22d3ee" strokeWidth="1.5"/>
          <text x="7" y="16" fontSize="6" fontWeight="700" fill="#22d3ee" fontFamily="monospace">PDF</text>
        </svg>
      )}
    </div>
    {/* Particle dots */}
    {[0,60,120,180,240,300].map((deg,i)=>(
      <motion.div key={i} animate={{ opacity:[0,1,0], scale:[0.5,1,0.5] }}
        transition={{ duration:2, repeat:Infinity, delay:i*0.33, ease:"easeInOut" }}
        className="absolute w-1 h-1 rounded-full bg-cyan-400"
        style={{ top:"50%", left:"50%",
          transform:`translate(-50%,-50%) rotate(${deg}deg) translateY(-58px)` }} />
    ))}
  </div>
);

// ── Mac OS window chrome ──────────────────────────────────────────────────────
export const MacWindowChrome = ({ slug }: { slug: string }) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]"
    style={{ background:"rgba(0,0,0,0.6)" }}>
    <div className="flex items-center gap-2">
      {[["#FF5F57","#C0392B"],["#FEBC2E","#D4A017"],["#28C840","#1E8E2E"]].map(([bg,s],i)=>(
        <div key={i} style={{ width:11,height:11,borderRadius:"50%",background:bg,
          boxShadow:`0 0 0 0.5px ${s}60,0 0 6px ${bg}40` }} />
      ))}
      <div className="ml-3 flex items-center gap-2 px-3 py-1 rounded-md"
        style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#52526a" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
        <span className="font-mono text-[10px]" style={{ color:"#52526a" }}>
          {slug ? `yourname.dev/p/${slug}` : "yourname.dev"}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color:"#52526a" }}>Live Preview</span>
      <motion.div animate={{ opacity:[1,0.4,1] }} transition={{ duration:2, repeat:Infinity }}
        style={{ width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 8px #22c55e" }} />
    </div>
  </div>
);

// ── Glowing gradient input ────────────────────────────────────────────────────
export const GlowInput = ({
  label, value, onChange, placeholder="", multiline=false, rows=4, id,
  focused, onFocus, onBlur,
}: {
  label:string; value:string; onChange:(v:string)=>void; placeholder?:string;
  multiline?:boolean; rows?:number; id:string;
  focused:boolean; onFocus:()=>void; onBlur:()=>void;
}) => {
  const base: React.CSSProperties = {
    width:"100%", background:"transparent", border:"none", outline:"none",
    color: focused ? "#f0f0ff" : "#8888a8", fontSize:13, padding:"8px 0",
    fontFamily:"'JetBrains Mono',monospace", resize:"none",
    transition:"color 0.2s",
  };
  return (
    <div>
      <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: focused ? "#22d3ee" : "#6666aa", transition:"color 0.2s" }}>
        {label}
      </label>
      <div style={{ position:"relative" }}>
        {multiline
          ? <textarea id={id} value={value} onChange={e=>onChange(e.target.value)}
              rows={rows} style={base} onFocus={onFocus} onBlur={onBlur} placeholder={placeholder} />
          : <input id={id} value={value} onChange={e=>onChange(e.target.value)}
              style={base} onFocus={onFocus} onBlur={onBlur} placeholder={placeholder} />
        }
        {/* Gradient bottom border */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:"1.5px",
          background: focused
            ? "linear-gradient(90deg,#22d3ee,#8b5cf6)"
            : "linear-gradient(90deg,rgba(34,211,238,0.2),rgba(139,92,246,0.2))",
          boxShadow: focused ? "0 0 12px rgba(34,211,238,0.4)" : "none",
          transition:"all 0.3s ease",
          borderRadius:4,
        }} />
      </div>
    </div>
  );
};

// ── Bottom floating dock ──────────────────────────────────────────────────────
export const BottomDock = ({
  onGenerate, isExtracting, templateLabel, accentName,
}: { onGenerate:()=>void; isExtracting:boolean; templateLabel:string; accentName:string }) => (
  <div className="fixed bottom-0 left-0 right-0 flex justify-center items-end pb-6 z-50 pointer-events-none">
    <motion.div initial={{ y:100, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ delay:0.5, duration:0.7, ease:[0.22,1,0.36,1] }}
      className="pointer-events-auto relative">
      {/* Dock pill */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.08]"
        style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"blur(30px)",
          boxShadow:"0 -4px 40px rgba(34,211,238,0.08),0 0 80px rgba(0,0,0,0.8)" }}>
        {/* Template */}
        <DockItem icon="⬜" label="Template" value={templateLabel} />
        <div style={{ width:1,height:32,background:"rgba(255,255,255,0.06)" }} />
        {/* Theme */}
        <DockItem icon="🎨" label="Theme" value={accentName} />
        <div style={{ width:1,height:32,background:"rgba(255,255,255,0.06)" }} />
        {/* AI orb — centerpiece, pops above dock */}
        <div className="relative flex flex-col items-center" style={{ marginTop:-28 }}>
          <motion.button onClick={onGenerate} disabled={isExtracting}
            whileHover={{ scale:1.08 }} whileTap={{ scale:0.96 }}
            className="relative flex flex-col items-center justify-center rounded-full cursor-pointer disabled:opacity-60"
            style={{ width:72, height:72 }}>
            {/* Outer glow rings */}
            <motion.div animate={{ scale:[1,1.15,1], opacity:[0.5,0.8,0.5] }}
              transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}
              className="absolute inset-0 rounded-full"
              style={{ background:"radial-gradient(circle,rgba(34,211,238,0.2),rgba(139,92,246,0.15),transparent 70%)" }} />
            <motion.div animate={{ rotate:360 }} transition={{ duration:6, repeat:Infinity, ease:"linear" }}
              className="absolute inset-0 rounded-full"
              style={{ border:"1.5px solid transparent",
                background:"conic-gradient(from 0deg,#22d3ee,#8b5cf6,#22d3ee) border-box",
                WebkitMask:"linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)",
                WebkitMaskComposite:"destination-out", maskComposite:"exclude" }} />
            {/* Face */}
            <div className="absolute inset-1.5 rounded-full"
              style={{ background:"linear-gradient(135deg,#0d0d1e,#1a0a2e)",
                boxShadow:"inset 0 0 20px rgba(34,211,238,0.15)" }}>
              <div className="w-full h-full rounded-full flex items-center justify-center">
                {isExtracting ? (
                  <motion.div animate={{ rotate:360 }} transition={{ duration:1,repeat:Infinity,ease:"linear" }}
                    style={{ width:24,height:24,border:"2px solid rgba(34,211,238,0.3)",
                      borderTopColor:"#22d3ee",borderRadius:"50%" }} />
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="url(#star-grad)" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5"/>
                    <defs>
                      <linearGradient id="star-grad" x1="2" y1="2" x2="22" y2="22">
                        <stop stopColor="#22d3ee"/><stop offset="1" stopColor="#8b5cf6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
            </div>
          </motion.button>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-widest"
            style={{ color:"#8888a8" }}>Generate</span>
        </div>
        <div style={{ width:1,height:32,background:"rgba(255,255,255,0.06)" }} />
        {/* Sections */}
        <DockItem icon="⚡" label="Sections" value="All active" />
        <div style={{ width:1,height:32,background:"rgba(255,255,255,0.06)" }} />
        {/* Save */}
        <DockItem icon="✓" label="Save" value="Auto-saved" iconColor="#22c55e" />
      </div>
    </motion.div>
  </div>
);

function DockItem({ icon, label, value, iconColor="#8b5cf6" }:
  { icon:string; label:string; value:string; iconColor?:string }) {
  return (
    <div className="flex items-center gap-2 px-2">
      <span style={{ color:iconColor, fontSize:14 }}>{icon}</span>
      <div>
        <p className="text-[9px] uppercase tracking-widest" style={{ color:"#52526a" }}>{label}</p>
        <p className="text-[11px] font-semibold" style={{ color:"#c0c0e0" }}>{value}</p>
      </div>
    </div>
  );
}
