"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { useCompletion } from '@ai-sdk/react';

interface AIEnhanceButtonProps {
  currentText: string;
  onUpdate: (newText: string) => void;
}

export default function AIEnhanceButton({ currentText, onUpdate }: AIEnhanceButtonProps) {
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/enhance-text',
    body: {
      instruction: "Make this sound highly professional and impactful for a CV",
    },
  });

  // Stream updates to the parent component in real-time
  useEffect(() => {
    if (completion) {
      onUpdate(completion);
    }
  }, [completion, onUpdate]);

  const handleEnhance = async () => {
    if (!currentText.trim() || isLoading) return;
    
    // We pass `text` explicitly in the body to strictly fulfill the backend JSON requirement, 
    // alongside `useCompletion`'s default `prompt` payload.
    await complete(currentText, {
      body: { 
        text: currentText,
        instruction: "Make this sound highly professional and impactful for a CV"
      }
    });
  };

  return (
    <motion.button
      type="button"
      onClick={handleEnhance}
      disabled={isLoading || !currentText.trim()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative group flex items-center justify-center p-2.5 rounded-full border transition-all duration-300 ${
        isLoading 
          ? 'bg-zinc-900 border-zinc-800 text-zinc-500 cursor-wait shadow-inner' 
          : 'bg-[#09090B] border-zinc-800/80 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]'
      } ${!currentText.trim() && 'opacity-50 cursor-not-allowed'}`}
      title="Enhance with AI"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
          </motion.div>
        ) : (
          <motion.div
            key="sparkles"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle absolute glow that pulses when hovered */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md bg-emerald-500/20 -z-10 pointer-events-none" />
    </motion.button>
  );
}
