import type { TemplateProps } from "./_shared";

export function ClassicTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="flex h-full flex-col font-sans text-neutral-900">
      <header className="text-center mb-5 pb-4" style={{ borderBottom: "2px solid #111827" }}>
        <h1 className="text-[28px] font-bold uppercase tracking-[0.08em]">{cv.name}</h1>
        <div className="mt-2 flex justify-center flex-wrap gap-3 text-[11px] text-neutral-600">
          {cv.location && <span>{cv.location}</span>}
          {cv.phone && <><span>·</span><span>{cv.phone}</span></>}
          {cv.email && <><span>·</span><span>{cv.email}</span></>}
          {cv.website && <><span>·</span><span>{cv.website}</span></>}
        </div>
      </header>
      {cv.summary && (
        <div className="mb-4">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] border-b border-neutral-300 pb-0.5 mb-2">Objective</h2>
          <p className="text-[12px] leading-relaxed text-neutral-700">{cv.summary}</p>
        </div>
      )}
      {(cv.experience?.length ?? 0) > 0 && (
        <div className="mb-4">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] border-b border-neutral-300 pb-0.5 mb-2">Professional Experience</h2>
          <div className="space-y-3">
            {cv.experience!.map((e, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <p className="text-[13px] font-bold">{e.title}</p>
                  <p className="text-[11px] text-neutral-500 shrink-0">{e.duration}</p>
                </div>
                <p className="text-[11.5px] italic text-neutral-600">{e.company}</p>
                {e.description && <p className="mt-1 text-[11.5px] leading-relaxed text-neutral-700">{e.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      {(cv.education?.length ?? 0) > 0 && (
        <div className="mb-4">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] border-b border-neutral-300 pb-0.5 mb-2">Education</h2>
          {cv.education!.map((e, i) => (
            <div key={i} className="flex justify-between items-baseline">
              <p className="text-[12px]"><span className="font-bold">{e.degree}</span>, <span className="italic">{e.institution}</span></p>
              <p className="text-[11px] text-neutral-500 shrink-0">{e.duration}</p>
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] border-b border-neutral-300 pb-0.5 mb-2">Skills</h2>
          <p className="text-[12px] text-neutral-700">{skills.join("  ·  ")}</p>
        </div>
      )}
    </div>
  );
}
