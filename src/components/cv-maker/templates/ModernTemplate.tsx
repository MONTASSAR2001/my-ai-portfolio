import type { TemplateProps } from "./_shared";

export function ModernTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="flex h-full flex-col font-sans">
      <header className="flex items-start justify-between mb-6 pb-6" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div>
          <h1 className="text-[30px] font-semibold tracking-tight text-neutral-900 leading-none">{cv.name}</h1>
          <p className="mt-1.5 text-[13px] text-blue-600 font-medium">{cv.role}</p>
        </div>
        <div className="text-right space-y-0.5 text-[10.5px] text-neutral-500 mt-1">
          {cv.email && <p>{cv.email}</p>}
          {cv.phone && <p>{cv.phone}</p>}
          {cv.location && <p>{cv.location}</p>}
          {cv.website && <p>{cv.website}</p>}
        </div>
      </header>
      {cv.summary && <p className="text-[12px] leading-relaxed text-neutral-600 mb-5">{cv.summary}</p>}
      {(cv.experience?.length ?? 0) > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 mb-3">Experience</h2>
          <div className="space-y-3">
            {cv.experience!.map((e, i) => (
              <div key={i} className="grid grid-cols-[6px_1fr] gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <div className="flex justify-between">
                    <p className="text-[12.5px] font-semibold text-neutral-900">{e.title}</p>
                    <p className="text-[10.5px] text-neutral-400 shrink-0">{e.duration}</p>
                  </div>
                  <p className="text-[11px] text-blue-500 font-medium">{e.company}</p>
                  {e.description && <p className="mt-1 text-[11.5px] leading-relaxed text-neutral-600">{e.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {(cv.education?.length ?? 0) > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 mb-2">Education</h2>
            {cv.education!.map((e, i) => (
              <div key={i} className="mb-1.5">
                <p className="text-[12px] font-semibold text-neutral-800">{e.degree}</p>
                <p className="text-[11px] text-neutral-500">{e.institution} · {e.duration}</p>
              </div>
            ))}
          </div>
        )}
        {skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => <span key={s} className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10.5px] text-blue-700">{s}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
