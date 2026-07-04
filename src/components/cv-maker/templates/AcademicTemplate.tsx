import type { TemplateProps } from "./_shared";

export function AcademicTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="flex h-full flex-col font-sans text-neutral-900">
      <header className="mb-4 pb-3" style={{ borderBottom: "2px solid #374151" }}>
        <h1 className="text-[24px] font-bold tracking-tight">{cv.name}</h1>
        <p className="text-[12px] text-neutral-600 mt-0.5">{cv.role}</p>
        <div className="mt-1.5 flex flex-wrap gap-3 text-[10.5px] text-neutral-500">
          {cv.email && <span>{cv.email}</span>}
          {cv.phone && <span>{cv.phone}</span>}
          {cv.location && <span>{cv.location}</span>}
          {cv.linkedin && <span>{cv.linkedin}</span>}
        </div>
      </header>
      <div className="grid grid-cols-[1fr_180px] gap-6 flex-1">
        <main className="space-y-4 overflow-hidden">
          {cv.summary && (
            <div><h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 border-b border-neutral-300 pb-0.5 mb-1.5">Research Summary</h2>
              <p className="text-[11.5px] leading-relaxed text-neutral-700">{cv.summary}</p></div>
          )}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 border-b border-neutral-300 pb-0.5 mb-2">Work Experience</h2>
            <div className="space-y-2.5">
              {cv.experience?.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <p className="text-[12px] font-semibold">{e.title}, <span className="font-normal italic">{e.company}</span></p>
                    <p className="text-[10.5px] text-neutral-500 shrink-0">{e.duration}</p>
                  </div>
                  {e.description && <p className="text-[11px] leading-relaxed text-neutral-700 mt-0.5">{e.description}</p>}
                </div>
              ))}
            </div>
          </div>
          {(cv.education?.length ?? 0) > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 border-b border-neutral-300 pb-0.5 mb-2">Education</h2>
              {cv.education!.map((e, i) => (
                <div key={i} className="flex justify-between">
                  <p className="text-[11.5px]"><span className="font-semibold">{e.degree}</span>, {e.institution}</p>
                  <p className="text-[10.5px] text-neutral-500 shrink-0">{e.duration}</p>
                </div>
              ))}
            </div>
          )}
        </main>
        <aside className="border-l border-neutral-300 pl-4 space-y-4">
          {skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-2">Skills</h2>
              <ul className="space-y-1">
                {skills.map(s => <li key={s} className="text-[10.5px] text-neutral-700">• {s}</li>)}
              </ul>
            </div>
          )}
          {cv.github && <div><h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-1">Links</h2><p className="text-[10.5px] text-neutral-700">{cv.github}</p></div>}
        </aside>
      </div>
    </div>
  );
}
