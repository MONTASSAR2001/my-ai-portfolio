"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { useCompletion } from '@ai-sdk/react';
import { CVData } from '@/lib/schemas/cv-schema';

interface CoverLetterGeneratorProps {
  cvData: CVData;
}

export default function CoverLetterGenerator({ cvData }: CoverLetterGeneratorProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [copied, setCopied] = useState(false);

  const { complete, completion, isLoading } = useCompletion({
    api: '/api/cover-letter',
  });

  const handleGenerate = async () => {
    if (!jobDescription.trim() || isLoading) return;
    
    await complete(jobDescription, {
      body: { 
        cvData,
        jobDescription 
      }
    });
  };

  const handleCopy = () => {
    if (!completion) return;
    navigator.clipboard.writeText(completion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[12px] font-medium tracking-wide text-zinc-400 uppercase">
          Target Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full min-h-[160px] rounded-lg border border-white/[0.08] bg-[#111116] p-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors resize-y"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading || !jobDescription.trim()}
        className={`w-full relative group flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 overflow-hidden ${
          isLoading 
            ? 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-wait' 
            : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50'
        } ${!jobDescription.trim() && 'opacity-50 cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-500'}`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </motion.div>
          ) : (
            <motion.div
              key="sparkles"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate with AI</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shimmer effect */}
        {!isLoading && jobDescription.trim() && (
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        )}
      </button>

      {completion && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 relative rounded-lg border border-white/[0.08] bg-[#111116] overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              Generated Result
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-5 text-[13px] leading-relaxed text-zinc-300 whitespace-pre-wrap font-serif">
            {completion}
          </div>
        </motion.div>
      )}
    </div>
  );
}
