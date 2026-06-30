import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortfolioAI — Sign In",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080910] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>
      {children}
    </div>
  );
}
