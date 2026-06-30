import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortfolioAI — Dashboard",
};

export default function DashboardHubPage() {
  return (
    <div className="p-8 md:p-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest uppercase text-violet-400 mb-3">Your Tools</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          What would you like to{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            build today?
          </span>
        </h1>
        <p className="mt-3 text-white/45 text-sm max-w-lg leading-relaxed">
          Choose a tool below. Build a live shareable portfolio from your existing CV, or create a polished PDF resume through a smart AI conversation.
        </p>
      </div>

      {/* Tool cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Portfolio Builder */}
        <Link
          href="/dashboard/portfolio"
          id="hub-card-portfolio"
          className="group relative flex flex-col rounded-3xl border border-white/8 bg-white/[0.02] p-8 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
        >
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
            style={{ background: "radial-gradient(400px circle at 30% 20%, rgba(139,92,246,0.08), transparent)" }} />

          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:border-violet-500/40 transition-colors">
            <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-12m12-13.5v.75c0 .966.784 1.75 1.75 1.75H21M3.75 16.5v.75c0 .966-.784 1.75-1.75 1.75H.75M12 12v3.75m0 0H9m3 0h3" />
            </svg>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 mb-4 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            AI Portfolio Builder
          </span>

          <h2 className="text-xl font-extrabold tracking-tight mb-2 group-hover:text-violet-100 transition-colors">
            Build a Live Portfolio Website
          </h2>
          <p className="text-sm text-white/45 leading-relaxed flex-1 mb-8">
            Upload your PDF CV. Our AI extracts your experience, skills, and projects — then generates a stunning, shareable portfolio at a custom URL.
          </p>

          <div className="space-y-2 mb-8">
            {["Upload PDF CV", "AI extracts your data", "Pick theme & slug", "Share your live site"].map((step, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-white/40">
                <span className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/20 flex items-center justify-center text-[10px] font-black text-violet-400 flex-shrink-0">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-violet-400 group-hover:text-violet-300 transition-colors">
            Start building
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </Link>

        {/* AI CV Maker */}
        <Link
          href="/dashboard/cv-maker"
          id="hub-card-cv-maker"
          className="group relative flex flex-col rounded-3xl border border-white/8 bg-white/[0.02] p-8 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
        >
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
            style={{ background: "radial-gradient(400px circle at 30% 20%, rgba(16,185,129,0.07), transparent)" }} />

          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:border-emerald-500/40 transition-colors">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-4 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI CV Maker — New
          </span>

          <h2 className="text-xl font-extrabold tracking-tight mb-2 group-hover:text-emerald-100 transition-colors">
            Chat Your Way to a Perfect CV
          </h2>
          <p className="text-sm text-white/45 leading-relaxed flex-1 mb-8">
            No CV? No problem. Our AI agent interviews you through a natural conversation, then generates a beautifully formatted, ATS-ready PDF in seconds.
          </p>

          <div className="space-y-2 mb-8">
            {["Chat with AI agent", "Answer simple questions", "Choose a CV template", "Download your PDF CV"].map((step, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-white/40">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-[10px] font-black text-emerald-400 flex-shrink-0">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
            Start the interview
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Tips strip */}
      <div className="mt-8 p-5 rounded-2xl border border-white/6 bg-white/[0.01] flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-white/60 mb-1">Pro Tip</p>
          <p className="text-xs text-white/35 leading-relaxed">
            Already have a CV? Use the <strong className="text-white/50">Portfolio Builder</strong> to go from PDF to a live site in under a minute. Starting from scratch? The <strong className="text-white/50">AI CV Maker</strong> will guide you through everything.
          </p>
        </div>
      </div>
    </div>
  );
}
