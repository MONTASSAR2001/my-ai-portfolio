import { motion } from "framer-motion";
import { Briefcase, Code2 } from "lucide-react";

export type POV = "recruiter" | "developer";

export default function POVSwitcher({ value, onChange }: { value: POV; onChange: (v: POV) => void }) {
  const options: { id: POV; label: string; icon: React.ReactNode }[] = [
    { id: "recruiter", label: "Recruiter View", icon: <Briefcase className="h-3.5 w-3.5" /> },
    { id: "developer", label: "Developer View", icon: <Code2 className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="glass-strong relative flex items-center rounded-full p-1 shadow-elegant">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="relative z-10 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors"
            style={{ color: active ? "var(--primary-foreground)" : "var(--muted-foreground)" }}
          >
            {active && (
              <motion.span
                layoutId="pov-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    opt.id === "recruiter"
                      ? "var(--gradient-gold)"
                      : "linear-gradient(135deg, var(--electric), oklch(0.62 0.19 255))",
                  boxShadow:
                    opt.id === "recruiter" ? "var(--shadow-glow-gold)" : "var(--shadow-glow-blue)",
                }}
              />
            )}
            {opt.icon}
            <span className="hidden sm:inline">{opt.label}</span>
            <span className="sm:hidden">{opt.id === "recruiter" ? "Recruiter" : "Dev"}</span>
          </button>
        );
      })}
    </div>
  );
}