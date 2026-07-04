import type { TemplateProps } from "./_shared";

export function CreativeTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="flex h-full flex-col" style={{ fontFamily: "'Georgia', serif" }}>
      <header className="pb-5 mb-5" style={{ borderBottom: "3px solid #1a1a1a" }}>
        <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">{new Date().getFullYear()} · Portfolio</p>
        <h1 className="mt-1 text-[44px] font-bold leading-none text-neutral-900" style={{ fontFamily: "Georgia, serif" }}>{cv.name}</h1>
        <p className="mt-2 text-[14px] italic text-neutral-600">{cv.role}</p>
        <p className="mt-2 text-[11px] text-neutral-500">{[cv.email, cv.phone, cv.location, cv.website].filter(Boolean).join("  ·  ")}</p>
      </header>
      {cv.summary && <p className="text-[15px] leading-snug text-neutral-800 italic mb-5" style={{ fontFamily: "Georgia, serif" }}>{cv.summary}</p>}
      <section className="mb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-3">Selected Work</h2>
        <div className="space-y-3">
          {cv.experience?.map((e, i) => (
            <div key={i} className="grid grid-cols-[72px_1fr] gap-3">
              <p className="text-[9.5px] uppercase tracking-widest text-neutral-400 pt-0.5">{e.duration}</p>
              <div>
                <p className="text-[13px] text-neutral-900"><span className="font-bold">{e.company}</span> — {e.title}</p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-neutral-700">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-2">Education</h2>
        {cv.education?.map((e, i) => (
          <p key={i} className="text-[12px] text-neutral-800">{e.degree} · {e.institution} · <span className="text-neutral-400">{e.duration}</span></p>
        ))}
      </section>
      {skills.length > 0 && <p className="mt-auto pt-4 text-[11px] text-neutral-400">{skills.join("  ·  ")}</p>}
    </div>
  );
}
