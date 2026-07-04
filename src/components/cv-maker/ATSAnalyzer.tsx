"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Loader2, AlertCircle } from 'lucide-react';
import { CVData } from '@/lib/schemas/cv-schema';

interface ATSAnalyzerProps {
  cvData: CVData;
}

interface ATSResult {
  score: number;
  feedback: string[];
}

export default function ATSAnalyzer({ cvData }: ATSAnalyzerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ats-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cvData }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to analyze CV');
      }
      
      const data: ATSResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("An error occurred while analyzing the CV. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // emerald-500
    if (score >= 60) return "#eab308"; // yellow-500
    return "#ef4444"; // red-500
  };

  const getScoreTextClass = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleScan}
        disabled={isLoading}
        className={`w-full relative group flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 overflow-hidden ${
          isLoading 
            ? 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-wait' 
            : 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/50'
        }`}
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
              <span>Scanning CV...</span>
            </motion.div>
          ) : (
            <motion.div
              key="scan"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              <span>Scan CV</span>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && (
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        )}
      </button>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{error}</p>
        </motion.div>
      )}

      {result && !isLoading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center pt-4 pb-6"
        >
          {/* Circular Progress Indicator */}
          <div className="relative w-40 h-40 flex items-center justify-center mb-8">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="8"
              />
              {/* Foreground circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke={getScoreColor(result.score)}
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0, 276.46" }} // 2 * pi * r
                animate={{ strokeDasharray: `${(result.score / 100) * 276.46}, 276.46` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl font-black ${getScoreTextClass(result.score)} tracking-tighter`}>
                <NumberTicker value={result.score} />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
                ATS Score
              </span>
            </div>
            {/* Glow effect */}
            <div 
              className="absolute inset-0 blur-3xl opacity-20 rounded-full"
              style={{ backgroundColor: getScoreColor(result.score) }}
            />
          </div>

          {/* Feedback Points */}
          <div className="w-full space-y-3">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-4 px-1">
              Analysis Feedback
            </h3>
            {result.feedback.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="p-4 rounded-lg bg-[#111116] border border-white/[0.06] flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: getScoreColor(result.score) }} />
                <p className="text-[12.5px] leading-relaxed text-zinc-300">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Helper component to animate the number counting up
function NumberTicker({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(Math.round(end * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue}</>;
}
