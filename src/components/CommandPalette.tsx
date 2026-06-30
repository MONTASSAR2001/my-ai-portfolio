"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, Briefcase, FolderGit2, Download } from "lucide-react"

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const actions = [
    { id: "about", label: "About Me", icon: User, href: "#about" },
    { id: "experience", label: "Experience", icon: Briefcase, href: "#experience" },
    { id: "projects", label: "Projects", icon: FolderGit2, href: "#projects" },
    { id: "resume", label: "Download CV", icon: Download, href: "#" },
  ]

  const filteredActions = actions.filter(a => a.label.toLowerCase().includes(search.toLowerCase()))

  const handleAction = (href: string) => {
    setIsOpen(false)
    setSearch("")
    if (href !== "#") {
      window.location.hash = href
    } else {
      // Placeholder for CV download logic
      alert("CV Download initiated.")
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="relative z-[9999]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-[90%] max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800">
                <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 text-lg w-full"
                />
                <div className="flex gap-1 ml-2 shrink-0">
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono text-slate-500 font-bold border border-slate-200 dark:border-slate-700">ESC</kbd>
                </div>
              </div>
              
              <div className="p-2 max-h-[50vh] overflow-y-auto">
                {filteredActions.length === 0 ? (
                  <div className="py-14 text-center text-slate-500">No results found for "{search}"</div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Quick Links
                    </div>
                    {filteredActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleAction(action.href)}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <action.icon className="w-5 h-5 text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                          <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400">{action.label}</span>
                        </div>
                        <span className="text-xs text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-wider mr-2">Jump to</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
