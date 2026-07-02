"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";

// ── Shared glass panel base ───────────────────────────────────────────────────
export const GlassPanel = ({
  children, className = "", glow = "cyan", dynamicGlow = null, style = {},
}: { children: React.ReactNode; className?: string; glow?: "cyan"|"purple"|"none"; dynamicGlow?: string | null; style?: React.CSSProperties }) => {
  const shadow =
    dynamicGlow ? `0 0 40px ${dynamicGlow}15, 0 0 1px ${dynamicGlow}40` :
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
  onMicClick, isListening = false, commandFeedback = null
}: { 
  onGenerate:()=>void; isExtracting:boolean; templateLabel:string; accentName:string;
  onMicClick?: ()=>void; isListening?: boolean; commandFeedback?: string | null;
}) => (
  <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-6 z-50 pointer-events-none">
    <AnimatePresence>
      {commandFeedback && (
        <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className="mb-4 px-5 py-2.5 rounded-full border"
          style={{ background: "rgba(0,0,0,0.8)", borderColor: "rgba(34,211,238,0.3)", boxShadow: "0 0 20px rgba(34,211,238,0.15)", backdropFilter: "blur(10px)" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#22d3ee" }}>{commandFeedback}</p>
        </motion.div>
      )}
      {isListening && !commandFeedback && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="mb-4 px-5 py-2.5 rounded-full border"
          style={{ background: "rgba(0,0,0,0.8)", borderColor: "rgba(239,68,68,0.3)", boxShadow: "0 0 20px rgba(239,68,68,0.15)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center gap-2">
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-red-400">Listening for commands...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

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
        <div style={{ width:1,height:32,background:"rgba(255,255,255,0.06)" }} />
        {/* Voice Command Mic */}
        <div className="flex flex-col items-center justify-center px-1">
          <motion.button onClick={onMicClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center rounded-full cursor-pointer pointer-events-auto"
            style={{ width: 44, height: 44, background: isListening ? "rgba(239,68,68,0.15)" : "rgba(34,211,238,0.05)", border: `1px solid ${isListening ? "rgba(239,68,68,0.5)" : "rgba(34,211,238,0.2)"}`, boxShadow: isListening ? "0 0 20px rgba(239,68,68,0.5)" : "0 0 10px rgba(34,211,238,0.1)" }}>
            {isListening && (
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-red-500" />
            )}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isListening ? "#ef4444" : "#22d3ee"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </motion.button>
        </div>
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

export const AnalyticsPanel = ({
  themeColor, onClose
}: { themeColor: string | null; onClose: () => void }) => {
  return (
    <GlassPanel glow="purple" dynamicGlow={themeColor} style={{height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{borderColor:"rgba(255,255,255,0.05)"}}>
        <div className="flex items-center gap-2">
          <span className="text-[12px]">📈</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{color: themeColor || "#8888a8"}}>Analytics & Heatmap</span>
        </div>
        <button onClick={onClose} style={{color:"#52526a",background:"none",border:"none",cursor:"pointer",fontSize:16}}>×</button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5" style={{display:"flex",flexDirection:"column",gap:24}}>
        
        {/* Total Views */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: "#8888a8" }}>Total Views This Week</p>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold font-mono" style={{ color: "#fff", textShadow: `0 0 20px ${themeColor || '#22d3ee'}80` }}>1,284</span>
              <div className="flex items-center gap-1 px-2 py-1 rounded-md mb-1" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                <span className="text-[10px] font-bold text-emerald-400">12%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Avg Time */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: "#8888a8" }}>Avg Time on Page</p>
            <div className="mt-2 text-2xl font-bold font-mono" style={{ color: "#c0c0e0" }}>2m 45s</div>
          </div>
        </motion.div>

        {/* Heatmap */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6666aa" }}>Attention Heatmap</p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Experience", pct: 75 },
              { label: "Skills", pct: 15 },
              { label: "About", pct: 10 },
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px]" style={{ color: "#a0a0c0" }}>{stat.label}</span>
                  <span className="text-[10px] font-mono text-white">{stat.pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.pct}%` }}
                    transition={{ duration: 1, delay: 0.4 + (i * 0.1), ease: "easeOut" }}
                    className="h-full"
                    style={{ background: themeColor ? `linear-gradient(90deg, ${themeColor}80, ${themeColor})` : "linear-gradient(90deg, #22d3ee, #8b5cf6)", boxShadow: `0 0 10px ${themeColor || '#22d3ee'}80` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Viewer */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6666aa" }}>Recent Activity</p>
          <div className="flex gap-3 p-3 rounded-xl items-start" style={{ background: "rgba(34,211,238,0.05)", border: "1px dashed rgba(34,211,238,0.2)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(34,211,238,0.1)", color: "#22d3ee" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h3l3-9 5 18 3-9h5"/></svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-white mb-0.5">Tech Lead <span style={{ color: "#52526a" }}>from</span> Google</p>
              <p className="text-[10px]" style={{ color: "#a0a0c0" }}>Viewed your portfolio 2 hours ago.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </GlassPanel>
  );
};

export const GitHubCity = ({ themeColor }: { themeColor: string | null }) => {
  const [hovered, setHovered] = useState<{ x: number, y: number } | null>(null);
  
  // 7x7 grid mock data
  const grid = Array.from({ length: 7 }, (_, x) =>
    Array.from({ length: 7 }, (_, y) => ({
      x, y,
      commits: Math.floor(Math.random() * 20), // 0 to 19
      date: `May ${x * 7 + y + 1}th`
    }))
  );

  return (
    <div className="relative w-full h-[240px] flex items-center justify-center overflow-visible" style={{ perspective: "1000px" }}>
      <motion.div 
        initial={{ rotateX: 60, rotateZ: -45, y: 50, opacity: 0 }}
        animate={{ rotateX: 60, rotateZ: -45, y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative"
        style={{ transformStyle: "preserve-3d", width: 140, height: 140 }}
      >
        {/* Wireframe Base */}
        <div className="absolute inset-0 border" style={{
          borderColor: `${themeColor || '#10b981'}40`,
          background: `linear-gradient(to right, ${themeColor || '#10b981'}10 1px, transparent 1px), linear-gradient(to bottom, ${themeColor || '#10b981'}10 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          boxShadow: `0 0 40px ${themeColor || '#10b981'}20`
        }} />

        {/* Buildings */}
        {grid.flatMap((col, x) => col.map((cell, y) => {
          const size = 14; 
          const gap = 6;
          const left = x * (size + gap);
          const top = y * (size + gap);
          const h = cell.commits === 0 ? 2 : cell.commits * 2.5;
          const isHovered = hovered?.x === x && hovered?.y === y;
          const glowColor = themeColor || "#10b981";

          return (
            <motion.div 
              key={`${x}-${y}`}
              className="absolute"
              style={{
                left, top, width: size, height: size,
                transformStyle: "preserve-3d",
                cursor: "pointer"
              }}
              onMouseEnter={() => setHovered({x, y})}
              onMouseLeave={() => setHovered(null)}
              animate={{ translateZ: isHovered ? 10 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cell.commits > 0 && (
                <>
                  {/* Top Face */}
                  <div className="absolute inset-0" style={{
                    background: glowColor,
                    transform: `translateZ(${h}px)`,
                    boxShadow: isHovered ? `0 0 15px ${glowColor}, inset 0 0 10px #fff` : `inset 0 0 8px rgba(0,0,0,0.5)`,
                    border: `1px solid ${glowColor}`,
                    opacity: 0.9,
                    transition: "box-shadow 0.3s"
                  }} />
                  {/* Front Face */}
                  <div className="absolute bottom-0 left-0 w-full" style={{
                    height: h,
                    background: "linear-gradient(to bottom, #000, #030308)",
                    borderLeft: `1px solid ${glowColor}40`,
                    borderRight: `1px solid ${glowColor}40`,
                    borderBottom: `1px solid ${glowColor}40`,
                    transformOrigin: "bottom",
                    transform: "rotateX(-90deg)",
                    opacity: 0.8
                  }} />
                  {/* Right Face */}
                  <div className="absolute top-0 right-0 h-full" style={{
                    width: h,
                    background: "linear-gradient(to bottom, #000, #030308)",
                    borderTop: `1px solid ${glowColor}40`,
                    borderBottom: `1px solid ${glowColor}40`,
                    borderRight: `1px solid ${glowColor}40`,
                    transformOrigin: "right",
                    transform: "rotateY(90deg)",
                    opacity: 0.6
                  }} />
                </>
              )}
              {cell.commits === 0 && (
                <div className="absolute inset-0" style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)"
                }} />
              )}
            </motion.div>
          );
        }))}
      </motion.div>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-0 pointer-events-none px-4 py-2 rounded-full z-50"
            style={{ 
              background: "rgba(0,0,0,0.8)", 
              border: `1px solid ${themeColor || '#10b981'}40`,
              backdropFilter: "blur(12px)",
              boxShadow: `0 0 20px ${themeColor || '#10b981'}20`
            }}
          >
            {(() => {
              const cell = grid[hovered.x][hovered.y];
              return (
                <p className="text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
                  <span style={{ color: themeColor || '#10b981' }}>{cell.commits} commits</span> on {cell.date}
                </p>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProjectsPanel = ({
  themeColor, onClose
}: { themeColor: string | null; onClose: () => void }) => {
  return (
    <GlassPanel glow="purple" dynamicGlow={themeColor} style={{height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{borderColor:"rgba(255,255,255,0.05)"}}>
        <div className="flex items-center gap-2">
          <span className="text-[12px]">🗂</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{color: themeColor || "#8888a8"}}>Projects & Activity</span>
        </div>
        <button onClick={onClose} style={{color:"#52526a",background:"none",border:"none",cursor:"pointer",fontSize:16}}>×</button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5" style={{display:"flex",flexDirection:"column",gap:24}}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6666aa" }}>Contribution Matrix</p>
          <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <GitHubCity themeColor={themeColor} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6666aa" }}>Pinned Projects</p>
          <div className="flex flex-col gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="p-3 rounded-lg flex items-center justify-between" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <p className="text-[11px] font-bold text-white mb-0.5">Project Alpha {i}</p>
                  <p className="text-[9px]" style={{ color: "#a0a0c0" }}>React • Next.js • WebGL</p>
                </div>
                <button className="px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest" style={{ background: themeColor ? `${themeColor}20` : "rgba(34,211,238,0.1)", color: themeColor || "#22d3ee", border: `1px solid ${themeColor ? `${themeColor}40` : "rgba(34,211,238,0.3)"}` }}>Edit</button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </GlassPanel>
  );
};

export const InterviewDefender = ({ themeColor, cvData }: { themeColor: string | null, cvData?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { cvData },
    initialMessages: [
      { id: '1', role: 'assistant', content: `Hello! I am ${cvData?.name || "the creator"}'s AI Assistant. Ask me anything about their experience, skills, or projects.` }
    ]
  });

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <div className="absolute bottom-6 right-6 z-50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center rounded-full shadow-2xl cursor-pointer pointer-events-auto"
            style={{ width: 64, height: 64, background: "rgba(0,0,0,0.8)", border: `1px solid ${themeColor || '#22d3ee'}40` }}
          >
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: `0 0 30px ${themeColor || '#22d3ee'}` }} />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={themeColor || "#22d3ee"} strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M9 10h.01M15 10h.01M12 10h.01"/>
            </svg>
            <div className="absolute -top-8 right-0 px-3 py-1 rounded-full whitespace-nowrap pointer-events-none" style={{ background: "rgba(0,0,0,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="text-[10px] font-bold tracking-widest text-white uppercase">Interview Me</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex flex-col rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
            style={{ 
              width: 320, height: 440, 
              background: "rgba(0,0,0,0.7)", 
              backdropFilter: "blur(24px)",
              border: `1px solid ${themeColor || '#22d3ee'}40`,
              boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 40px ${themeColor || '#22d3ee'}20`
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: themeColor || "#22d3ee", boxShadow: `0 0 8px ${themeColor || '#22d3ee'}` }} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">AI Defender</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ color: "#8888a8", background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>×</button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((m) => (
                <motion.div 
                  key={m.id} 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="px-3 py-2 rounded-xl max-w-[85%]" style={{ 
                    background: m.role === 'user' ? (themeColor ? `${themeColor}20` : "rgba(34,211,238,0.15)") : "rgba(255,255,255,0.05)",
                    border: `1px solid ${m.role === 'user' ? (themeColor ? `${themeColor}40` : "rgba(34,211,238,0.3)") : "rgba(255,255,255,0.05)"}`,
                    color: m.role === 'user' ? "#fff" : "#c0c0e0",
                    fontSize: 12, lineHeight: 1.5
                  }}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-3 py-2 rounded-xl flex gap-1" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <motion.div animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <motion.div animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <motion.div animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.4)" }}>
              <form onSubmit={handleSubmit} className="relative">
                <input 
                  value={input} onChange={handleInputChange}
                  placeholder="Ask me anything..." 
                  className="w-full bg-transparent text-white text-xs px-3 py-2 outline-none rounded-lg"
                  style={{ border: `1px solid ${themeColor || '#22d3ee'}40` }}
                />
                <button type="submit" disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 disabled:opacity-50" style={{ color: themeColor || "#22d3ee" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const HistoryPanel = ({
  themeColor, onClose, versions, onRestore
}: { 
  themeColor: string | null; 
  onClose: () => void; 
  versions: any[]; 
  onRestore: (v: any) => void;
}) => {
  return (
    <GlassPanel glow="cyan" dynamicGlow={themeColor} style={{height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{borderColor:"rgba(255,255,255,0.05)"}}>
        <div className="flex items-center gap-2">
          <span className="text-[12px]">⏳</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{color: themeColor || "#8888a8"}}>Version History</span>
        </div>
        <button onClick={onClose} style={{color:"#52526a",background:"none",border:"none",cursor:"pointer",fontSize:16}}>×</button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5" style={{display:"flex",flexDirection:"column",gap:16}}>
        {versions.length === 0 ? (
          <p className="text-[10px] text-center" style={{color:"#52526a"}}>No snapshots yet.</p>
        ) : (
          <div className="relative border-l border-white/10 ml-2 pl-4 py-2 space-y-6">
            {versions.map((v, i) => (
              <motion.div key={v.id || i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full" style={{background: themeColor || "#22d3ee", boxShadow: `0 0 10px ${themeColor || '#22d3ee'}`}} />
                
                <div className="p-3 rounded-xl border border-white/5" style={{background: "rgba(255,255,255,0.02)"}}>
                  <p className="text-[10px] font-bold text-white mb-1">
                    {new Date(v.created_at).toLocaleDateString()} at {new Date(v.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-[9px] text-gray-400 mb-3">{v.description || "Portfolio Snapshot"}</p>
                  <button 
                    onClick={() => onRestore(v)}
                    className="px-3 py-1.5 w-full rounded-md text-[9px] font-bold uppercase tracking-widest transition-all" 
                    style={{ 
                      background: themeColor ? `${themeColor}20` : "rgba(34,211,238,0.1)", 
                      color: themeColor || "#22d3ee", 
                      border: `1px solid ${themeColor ? `${themeColor}40` : "rgba(34,211,238,0.3)"}`,
                      boxShadow: `0 0 10px ${themeColor ? `${themeColor}20` : 'rgba(34,211,238,0.1)'}`
                    }}>
                    Restore
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </GlassPanel>
  );
};
