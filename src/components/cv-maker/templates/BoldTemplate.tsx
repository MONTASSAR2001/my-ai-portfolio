import type { TemplateProps } from "./_shared";

export function BoldTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="flex h-full flex-col font-sans">
      <header className="bg-neutral-900 text-white p-6 -mx-1 -mt-1 mb-5 rounded-sm">
        <h1 className="text-[40px] font-black leading-none uppercase tracking-tight text-white">{cv.name}</h1>
        <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.2em] text-neutral-300">{cv.role}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-[10.5px] text-neutral-400">
          {cv.email && <span>{cv.email}</span>}
          {cv.phone && <span>{cv.phone}</span>}
          {cv.location && <span>{cv.location}</span>}
        </div>
      </header>
      {cv.summary && (
        <div className="mb-4 border-l-4 border-neutral-900 pl-4">
          <p className="text-[12px] leading-relaxed text-neutral-700">{cv.summary}</p>
        </div>
      )}
      <div className="mb-4">
        <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-900 border-b-2 border-neutral-900 pb-1 mb-3">Experience</h2>
        <div className="space-y-3">
          {cv.experience?.map((e, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <p className="text-[13px] font-black text-neutral-900 uppercase">{e.title}</p>
                <p className="text-[10px] text-neutral-400 shrink-0 ml-2">{e.duration}</p>
              </div>
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">{e.company}</p>
              {e.description && <p className="mt-1 text-[11.5px] leading-relaxed text-neutral-700">{e.description}</p>}
            </div>
          ))}
        </div>
      </div>
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-900 border-b-2 border-neutral-900 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(s => <span key={s} className="bg-neutral-900 text-white px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide rounded-sm">{s}</span>)}
          </div>
        </div>
      )}
      {(cv.education?.length ?? 0) > 0 && (
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-900 border-b-2 border-neutral-900 pb-1 mb-3">Education</h2>
          {cv.education!.map((e, i) => <p key={i} className="text-[12px] text-neutral-800"><span className="font-black uppercase">{e.degree}</span> — {e.institution} <span className="text-neutral-400">({e.duration})</span></p>)}
        </div>
      )}
    </div>
  );
}
