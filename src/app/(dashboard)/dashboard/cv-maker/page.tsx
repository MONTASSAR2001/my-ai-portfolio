"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Phase = "chat" | "template" | "generating" | "done";

interface Message {
  role: "ai" | "user";
  content: string;
}

interface CVData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: string;
  experience: string;
  skills: string;
}

const TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, white, maximum readability",
    preview: "bg-white border-gray-200",
    accent: "text-gray-900",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Bold header, structured layout",
    preview: "bg-slate-900 border-slate-700",
    accent: "text-white",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Colorful sidebar, modern design",
    preview: "bg-gradient-to-br from-violet-600 to-indigo-600 border-violet-400",
    accent: "text-white",
  },
];

const QUESTIONS: { field: keyof CVData; question: string; placeholder: string }[] = [
  { field: "name", question: "Let's start with the basics. What's your full name?", placeholder: "e.g. John Doe" },
  { field: "email", question: "Great! What's your professional email address?", placeholder: "e.g. john@example.com" },
  { field: "phone", question: "What phone number should recruiters use?", placeholder: "e.g. +1 555 0100" },
  { field: "location", question: "Where are you based? (City, Country)", placeholder: "e.g. New York, USA" },
  { field: "summary", question: "Write a short professional summary about yourself — what you do and what you're looking for.", placeholder: "e.g. Software engineer with 5 years of experience in full-stack development..." },
  { field: "education", question: "Tell me about your education. Degree, university, and year?", placeholder: "e.g. BSc Computer Science, MIT, 2020" },
  { field: "experience", question: "Describe your work experience. Include job titles, companies, and key achievements.", placeholder: "e.g. Software Engineer at Google (2020–2024) — Built scalable APIs..." },
  { field: "skills", question: "What are your key skills? List them separated by commas.", placeholder: "e.g. TypeScript, React, Python, Docker, AWS" },
];

export default function CVMakerPage() {
  const [phase, setPhase] = useState<Phase>("chat");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "👋 Hi! I'm your AI CV assistant. I'll guide you through building a professional CV in just a few minutes. Let's get started — " + QUESTIONS[0].question },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [cvData, setCvData] = useState<Partial<CVData>>({});
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const val = currentInput.trim();
    if (!val || questionIndex >= QUESTIONS.length) return;

    const q = QUESTIONS[questionIndex];
    const newCvData = { ...cvData, [q.field]: val };
    setCvData(newCvData);
    setCurrentInput("");

    setMessages((prev) => [...prev, { role: "user", content: val }]);
    setIsTyping(true);

    const nextIndex = questionIndex + 1;

    setTimeout(() => {
      setIsTyping(false);
      if (nextIndex < QUESTIONS.length) {
        const nextQ = QUESTIONS[nextIndex];
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: `Got it! ${nextQ.question}` },
        ]);
        setQuestionIndex(nextIndex);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `🎉 Perfect! I have everything I need. Your CV data is all collected. Now let's pick a template and I'll generate your polished PDF!`,
          },
        ]);
        setPhase("template");
        setQuestionIndex(nextIndex);
      }
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleGenerate = async () => {
    setPhase("generating");
    // Simulate generation — in production, call /api/cv-maker/generate-pdf
    await new Promise((r) => setTimeout(r, 2500));
    setPhase("done");
  };

  const progress = Math.min((questionIndex / QUESTIONS.length) * 100, 100);

  return (
    <div className="p-8 md:p-12 h-screen flex flex-col max-h-screen max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2 flex-shrink-0">
        <Link href="/dashboard" className="text-white/30 hover:text-white/60 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-xs text-white/40 font-medium">AI CV Maker</span>
      </div>

      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            AI CV{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Maker
            </span>
          </h1>
          <p className="text-xs text-white/35 mt-1">Just answer the questions — your CV builds itself.</p>
        </div>

        {/* Progress */}
        {phase === "chat" && (
          <div className="text-right">
            <p className="text-xs text-white/40 mb-1.5">{questionIndex}/{QUESTIONS.length} questions</p>
            <div className="w-32 h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Chat Phase ─────────────────────────────────────────────────────── */}
      {(phase === "chat" || phase === "template") && (
        <div className="flex-1 flex flex-col rounded-3xl border border-white/8 bg-white/[0.02] overflow-hidden min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "ai"
                      ? "bg-white/5 border border-white/8 text-white/80"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* AI typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-[10px] font-black flex-shrink-0">
                  AI
                </div>
                <div className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          {phase === "chat" && questionIndex < QUESTIONS.length && (
            <div className="p-4 border-t border-white/6 bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  id="cv-chat-input"
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={QUESTIONS[questionIndex]?.placeholder}
                  disabled={isTyping}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/90 placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all disabled:opacity-50"
                />
                <button
                  id="cv-send-btn"
                  onClick={sendMessage}
                  disabled={!currentInput.trim() || isTyping}
                  className="w-11 h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-white/8 disabled:to-white/8 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Template selection (inside chat box when ready) */}
          {phase === "template" && (
            <div className="p-6 border-t border-white/6 space-y-4">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Choose your CV template</p>
              <div className="grid grid-cols-3 gap-3">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    id={`template-${t.id}`}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                      selectedTemplate === t.id ? "border-emerald-500/50 bg-emerald-500/8" : "border-white/8 hover:border-white/20 bg-white/[0.01]"
                    }`}
                  >
                    <div className={`w-full h-10 rounded-lg mb-3 border ${t.preview}`} />
                    <p className="text-xs font-bold text-white/80">{t.name}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{t.description}</p>
                  </button>
                ))}
              </div>
              <button
                id="generate-pdf-btn"
                onClick={handleGenerate}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                Generate My PDF CV
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Generating Phase ──────────────────────────────────────────────── */}
      {phase === "generating" && (
        <div className="flex-1 flex items-center justify-center rounded-3xl border border-white/8 bg-white/[0.02]">
          <div className="text-center space-y-5 p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-emerald-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white/80">Generating your PDF CV…</p>
              <p className="text-xs text-white/35 mt-1.5">Applying the <strong>{selectedTemplate}</strong> template to your data</p>
            </div>
            <div className="flex justify-center gap-4 text-xs text-white/25">
              {["Formatting layout", "Applying styles", "Exporting PDF"].map((s, i) => (
                <span key={i} className="flex items-center gap-1.5 animate-pulse" style={{ animationDelay: `${i * 300}ms` }}>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Done Phase ────────────────────────────────────────────────────── */}
      {phase === "done" && (
        <div className="flex-1 flex items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/5">
          <div className="text-center space-y-5 p-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Your CV is ready! 🎉</h2>
              <p className="text-sm text-white/45 mt-2">
                Built with the <strong>{selectedTemplate}</strong> template for {cvData.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                id="download-cv-btn"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
              <button
                onClick={() => { setPhase("chat"); setMessages([{ role: "ai", content: "👋 Hi! I'm your AI CV assistant. I'll guide you through building a professional CV in just a few minutes. Let's get started — " + QUESTIONS[0].question }]); setQuestionIndex(0); setCvData({}); setCurrentInput(""); }}
                className="px-6 py-3.5 rounded-xl border border-white/10 text-sm text-white/50 hover:text-white hover:border-white/25 transition-all font-medium"
              >
                Start Over
              </button>
              <Link href="/dashboard" className="px-6 py-3.5 rounded-xl border border-white/10 text-sm text-white/40 hover:text-white/70 hover:border-white/20 transition-all text-center font-medium">
                ← Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
