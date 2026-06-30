"use client"

import { motion } from "framer-motion"
import { BookOpen, Zap } from "lucide-react"

export interface TLDRToggleProps {
  isTldr: boolean
  setIsTldr: (val: boolean) => void
}

export default function TLDRToggle({ isTldr, setIsTldr }: TLDRToggleProps) {
  return (
    <div className="inline-flex p-1.5 bg-slate-100/80 dark:bg-slate-900/50 backdrop-blur-md rounded-full border border-slate-200/80 dark:border-slate-800 shadow-inner">
      {/* Full Story Button */}
      <button
        onClick={() => setIsTldr(false)}
        className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-colors ${
          !isTldr 
            ? "text-slate-900 dark:text-white" 
            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
        }`}
      >
        {!isTldr && (
          <motion.div
            layoutId="tldr-pill-bg"
            className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-600/50"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <BookOpen className={`w-4 h-4 ${!isTldr ? "text-blue-500" : ""}`} />
          Full Story
        </span>
      </button>

      {/* Quick Scan (TL;DR) Button */}
      <button
        onClick={() => setIsTldr(true)}
        className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-colors ${
          isTldr 
            ? "text-slate-900 dark:text-white" 
            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
        }`}
      >
        {isTldr && (
          <motion.div
            layoutId="tldr-pill-bg"
            className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-600/50"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <Zap className={`w-4 h-4 ${isTldr ? "text-amber-500" : ""}`} />
          Quick Scan
        </span>
      </button>
    </div>
  )
}
