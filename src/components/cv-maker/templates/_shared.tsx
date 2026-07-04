import type { CVData } from "@/lib/schemas/cv-schema";
import type { ReactNode } from "react";

export type TemplateProps = { cv: CVData & { website?: string; skillsRaw?: string }; skills: string[] };

// ─── Shared helpers used across templates ─────────────────────────────────────
export function Block({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`mt-5 ${className}`}>
      <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">{title}</h2>
      {children}
    </section>
  );
}

export function ContactLine({ items }: { items: (string | null | undefined)[] }) {
  return (
    <p className="text-[11px] text-neutral-500">
      {items.filter(Boolean).join("  ·  ")}
    </p>
  );
}
