import type { TemplateProps } from "./_shared";

export function StartupTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="flex h-full flex-col font-sans">
      {/* Bold gradient header */}
      <header className="rounded-xl mb-5 p-5" style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)" }}>
        <h1 className="text-[30px] font-black text-white leading-none">{cv.name}</h1>
        <p className="mt-1 text-[13px] font-medium text-purple-100">{cv.role}</p>
        <p className="mt-2 text-[10.5px] text-purple-200">{[cv.email, cv.phone, cv.location].filter(Boolean).join("  ·  ")}</p>
      </header>
      {cv.summary && (
        <p className="text-[12px] leading-relaxed text-neutral-700 mb-4 px-1">{cv.summary}</p>
      )}
      <div className="mb-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 mb-2">Experience</h2>
        <div className="space-y-3">
          {cv.experience?.map((e, i) => (
            <div key={i} className="rounded-lg border border-purple-100 bg-purple-50 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[12.5px] font-bold text-neutral-900">{e.title}</p>
                  <p className="text-[11px] text-purple-600 font-medium">{e.company}</p>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full shrink-0">{e.duration}</span>
              </div>
              {e.description && <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-600">{e.description}</p>}
            </div>
          ))}
        </div>
      </div>
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(s => <span key={s} className="rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-3 py-0.5 text-[10.5px] font-medium text-white">{s}</span>)}
          </div>
        </div>
      )}
      {(cv.education?.length ?? 0) > 0 && (
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 mb-2">Education</h2>
          {cv.education!.map((e, i) => <p key={i} className="text-[11.5px] text-neutral-800"><span className="font-bold">{e.degree}</span> · {e.institution} <span className="text-neutral-400">{e.duration}</span></p>)}
        </div>
      )}
    </div>
  );
}
