"use client"

import { motion } from "framer-motion"

export default function FluidMeshBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#fafafa] dark:bg-[#050505]">
      {/* Orb 1: Purple/Indigo */}
      <motion.div
        animate={{
          x: [0, 100, 0, -50, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,1) 0%, rgba(139,92,246,0) 70%)" }}
      />

      {/* Orb 2: Blue */}
      <motion.div
        animate={{
          x: [0, -120, 0, 80, 0],
          y: [0, -80, -100, -50, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,1) 0%, rgba(59,130,246,0) 70%)" }}
      />

      {/* Orb 3: Pink/Rose Center Drifter */}
      <motion.div
        animate={{
          x: [-50, 50, 150, -50],
          y: [-50, 100, -50, -50],
          scale: [1, 1.3, 1, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute top-[30%] left-[20%] w-[40%] h-[40%] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-30 dark:opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,1) 0%, rgba(219,39,119,0) 70%)" }}
      />
    </div>
  )
}
