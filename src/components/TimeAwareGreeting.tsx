"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, CloudSun, Sunrise } from "lucide-react"

export default function TimeAwareGreeting() {
  const [greetingInfo, setGreetingInfo] = useState<{ text: string; icon: any; colors: string; bg: string } | null>(null)

  useEffect(() => {
    const hour = new Date().getHours()
    
    if (hour >= 5 && hour < 12) {
      setGreetingInfo({
        text: "Good Morning",
        icon: Sunrise,
        colors: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-100/80 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800"
      })
    } else if (hour >= 12 && hour < 18) {
      setGreetingInfo({
        text: "Good Afternoon",
        icon: Sun,
        colors: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-100/80 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800"
      })
    } else if (hour >= 18 && hour < 22) {
      setGreetingInfo({
        text: "Good Evening",
        icon: CloudSun,
        colors: "text-indigo-600 dark:text-indigo-400",
        bg: "bg-indigo-100/80 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800"
      })
    } else {
      setGreetingInfo({
        text: "Good Night",
        icon: Moon,
        colors: "text-blue-500 dark:text-blue-400",
        bg: "bg-blue-100/80 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800"
      })
    }
  }, [])

  if (!greetingInfo) return null

  const Icon = greetingInfo.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border ${greetingInfo.bg} ${greetingInfo.colors} backdrop-blur-md shadow-sm`}
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <span className="font-bold tracking-wide text-sm">{greetingInfo.text}</span>
      </motion.div>
    </AnimatePresence>
  )
}
