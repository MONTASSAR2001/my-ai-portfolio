"use client"

import { motion } from "framer-motion"

interface ExpItem { title: string; company: string; duration?: string; description?: string }

export default function ChameleonProjectCard({ exp }: { exp: ExpItem }) {
  // Deterministic color based on title length or string hash to simulate dynamic extraction
  const colors = ["#3b82f6", "#ec4899", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]
  const hash = exp.title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const color = colors[hash % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -5,
        boxShadow: `0 20px 40px -10px ${color}40, 0 10px 20px -10px ${color}20`,
        borderColor: `${color}40`
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="p-8 md:p-10 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-black/5 dark:border-white/5 transition-colors relative overflow-hidden group"
    >
      <motion.div 
        className="absolute top-0 left-0 w-1.5 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
        <h3 className="text-3xl font-medium text-black dark:text-white transition-colors duration-500">
          {exp.title}
        </h3>
        {exp.duration && (
          <span className="text-sm font-semibold px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 self-start">
            {exp.duration}
          </span>
        )}
      </div>
      <p className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-6 transition-colors duration-500 group-hover:opacity-80" style={{ color: color }}>
        {exp.company}
      </p>
      {exp.description && (
        <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
          {exp.description}
        </p>
      )}
    </motion.div>
  )
}
