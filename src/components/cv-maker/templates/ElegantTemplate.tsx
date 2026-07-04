import type { TemplateProps } from "./_shared";

export function ElegantTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="flex h-full flex-col" style={{ fontFamily: "'Georgia', 'Palatino Linotype', serif" }}>
      <header className="text-center pb-6 mb-6" style={{ borderBottom: "1px solid #d4af7a" }}>
        <p className="text-[10px] uppercase tracking-[0.45em] text-amber-600 mb-2">Curriculum Vitæ</p>
        <h1 className="text-[38px] font-normal text-neutral-900 leading-none" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.01em" }}>{cv.name}</h1>
        <p className="mt-2 text-[13px] italic text-neutral-500">{cv.role}</p>
        <div className="mt-3 flex justify-center gap-4 text-[11px] text-neutral-500">
          {[cv.email, cv.phone, cv.location].filter(Boolean).map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </header>
      {cv.summary && (
        <div className="mb-5 text-center">
          <p className="text-[12.5px] leading-loose text-neutral-600 italic max-w-[480px] mx-auto">{cv.summary}</p>
        </div>
      )}
      <div className="mb-5">
        <h2 className="text-center text-[10px] uppercase tracking-[0.35em] text-amber-600 mb-4">Professional Experience</h2>
        <div className="space-y-4">
          {cv.experience?.map((e, i) => (
            <div key={i} className="text-center">
              <p className="text-[13px] font-semibold text-neutral-900">{e.title}</p>
              <p className="text-[11px] italic text-neutral-500">{e.company} · {e.duration}</p>
              {e.description && <p className="mt-1.5 text-[11.5px] leading-relaxed text-neutral-700 max-w-[480px] mx-auto">{e.description}</p>}
              {i < (cv.experience?.length ?? 0) - 1 && <div className="mt-3 mx-auto w-8 border-b border-amber-200" />}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <h2 className="text-center text-[10px] uppercase tracking-[0.35em] text-amber-600 mb-3">Education</h2>
        {cv.education?.map((e, i) => (
          <p key={i} className="text-center text-[12px] text-neutral-800"><span className="font-semibold">{e.degree}</span>, {e.institution} <span className="text-neutral-400">({e.duration})</span></p>
        ))}
      </div>
      {skills.length > 0 && (
        <div className="mt-auto text-center">
          <div className="mx-auto w-24 border-t border-amber-200 mb-3" />
          <p className="text-[11px] italic text-neutral-500">{skills.join("  ·  ")}</p>
        </div>
      )}
    </div>
  );
}
