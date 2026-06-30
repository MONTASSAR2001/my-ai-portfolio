import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortfolioAI — Build Your AI-Powered Portfolio & CV",
  description:
    "Upload your CV and let our AI transform it into a stunning portfolio website. Or use the AI Chat to build a polished PDF CV from scratch — in minutes.",
};

// ─── Static data ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: "portfolio",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-12m12-13.5v.75c0 .966.784 1.75 1.75 1.75H21M3.75 16.5v.75c0 .966-.784 1.75-1.75 1.75H.75M12 12v3.75m0 0H9m3 0h3" />
      </svg>
    ),
    badge: "AI Portfolio Builder",
    badgeColor: "from-violet-500 to-indigo-500",
    badgeBg: "bg-violet-500/10 border-violet-500/20 text-violet-300",
    title: "From PDF to Live Portfolio",
    subtitle: "Upload your CV once. Get a stunning, shareable website instantly.",
    description:
      "Our AI extracts your experience, skills, and story from any CV — then assembles a professional portfolio at a custom URL. No design skills needed.",
    cta: "Build My Portfolio",
    ctaHref: "/login",
    steps: ["Upload your PDF CV", "AI extracts & structures your data", "Pick a theme & custom URL", "Share your live portfolio link"],
    accent: "violet",
  },
  {
    id: "cv-maker",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    badge: "AI CV Maker",
    badgeColor: "from-emerald-500 to-teal-500",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    title: "Chat Your Way to a Perfect CV",
    subtitle: "Just answer questions. Walk away with a polished PDF.",
    description:
      "Our AI agent guides you through a conversational interview — Contact, Education, Experience, Skills. Then generates a professionally formatted PDF CV ready to send.",
    cta: "Start CV Interview",
    ctaHref: "/login",
    steps: ["Chat with the AI agent", "Answer simple questions naturally", "Pick a CV template", "Download your polished PDF"],
    accent: "emerald",
  },
];

const STATS = [
  { value: "< 60s", label: "Average generation time" },
  { value: "3", label: "Professional CV templates" },
  { value: "100%", label: "ATS-friendly output" },
  { value: "∞", label: "Shareable portfolio links" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080910] text-white font-sans overflow-x-hidden">

      {/* ── Ambient Background ─────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-600/6 rounded-full blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav
        id="main-nav"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/5 bg-[#080910]/80 backdrop-blur-xl"
      >
        <Link href="/" id="nav-logo" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-black shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
            AI
          </div>
          <span className="font-bold text-sm tracking-tight">
            Portfolio<span className="text-violet-400">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a>
          <a href="#stats" className="hover:text-white transition-colors duration-200">Why Us</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            id="nav-login-btn"
            className="text-sm text-white/50 hover:text-white transition-colors font-medium px-3 py-1.5"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            id="nav-signup-btn"
            className="text-sm px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-semibold shadow-lg shadow-violet-500/20 transition-all duration-200"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="relative pt-44 pb-24 px-6 text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Powered by OpenRouter AI · Built for professionals
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-7">
            Your career,{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                amplified
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
            </span>
            {" "}by AI.
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
            Build a live AI portfolio from your CV — or let our AI agent write your perfect PDF resume through a simple chat. Two powerful tools, one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              id="hero-cta-primary"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-sm font-bold shadow-xl shadow-violet-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start for Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="#features"
              id="hero-cta-secondary"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              See how it works
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex items-center justify-center gap-6 text-xs text-white/25">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Free forever plan
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              ATS-optimized output
            </span>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ────────────────────────────────────────────────────── */}
      <section id="stats" className="py-12 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs text-white/40 mt-1.5 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ──────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase text-violet-400 mb-4">Two Powerful Tools</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                land the job.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                id={`feature-card-${feature.id}`}
                className="group relative rounded-3xl border border-white/8 bg-white/[0.02] p-8 md:p-10 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
              >
                {/* Card glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl`}
                  style={{
                    background:
                      feature.accent === "violet"
                        ? "radial-gradient(600px circle at 50% 0%, rgba(139,92,246,0.06), transparent)"
                        : "radial-gradient(600px circle at 50% 0%, rgba(16,185,129,0.06), transparent)",
                  }}
                />

                {/* Badge */}
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border bg-transparent ${feature.badgeBg} mb-6`}>
                  {feature.icon}
                  {feature.badge}
                </span>

                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">{feature.title}</h3>
                <p className={`text-sm font-semibold mb-4 ${feature.accent === "violet" ? "text-violet-400" : "text-emerald-400"}`}>
                  {feature.subtitle}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-8">{feature.description}</p>

                {/* Steps */}
                <ol className="space-y-3 mb-10">
                  {feature.steps.map((step, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center bg-gradient-to-br ${feature.badgeColor} text-white shadow-md`}
                      >
                        {i + 1}
                      </span>
                      <span className="text-white/65">{step}</span>
                    </li>
                  ))}
                </ol>

                <Link
                  href={feature.ctaHref}
                  id={`feature-cta-${feature.id}`}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                    feature.accent === "violet"
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-500/25"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25"
                  }`}
                >
                  {feature.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-28 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-4">The Process</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Up and running in minutes.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                icon: "🔐",
                title: "Create your account",
                body: "Sign up in seconds. No payment required. Your data stays private and secure.",
              },
              {
                n: "02",
                icon: "🤖",
                title: "Choose your tool",
                body: "Upload a PDF to build a live portfolio, or start the AI chat to craft a beautiful CV.",
              },
              {
                n: "03",
                icon: "🚀",
                title: "Share or download",
                body: "Get a shareable link to your portfolio or download a pixel-perfect PDF CV — instantly.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="relative p-8 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-all duration-200 group"
              >
                <span className="absolute top-6 right-6 text-xs font-black text-white/10 font-mono group-hover:text-white/20 transition-colors">
                  {step.n}
                </span>
                <span className="text-3xl mb-5 block">{step.icon}</span>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-[500px] h-[200px] bg-violet-600/15 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <p className="text-xs font-bold tracking-widest uppercase text-violet-400 mb-6">Ready to start?</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Build your AI-powered career page{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">today.</span>
            </h2>
            <p className="text-white/45 mb-10 max-w-lg mx-auto text-base leading-relaxed">
              Join professionals who are already using AI to stand out. Free to start, no design skills needed.
            </p>
            <Link
              href="/signup"
              id="final-cta-btn"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-sm font-bold shadow-2xl shadow-violet-500/30 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get Started — It&apos;s Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-black">
              AI
            </div>
            <span className="font-bold text-sm tracking-tight">
              Portfolio<span className="text-violet-400">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link href="/login" className="hover:text-white/60 transition-colors">Sign In</Link>
            <Link href="/signup" className="hover:text-white/60 transition-colors">Sign Up</Link>
          </div>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} PortfolioAI · Powered by OpenRouter & Next.js 16
          </p>
        </div>
      </footer>
    </div>
  );
}