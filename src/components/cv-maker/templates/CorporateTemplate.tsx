import type { TemplateProps } from "./_shared";

export function CorporateTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="grid h-full grid-cols-[160px_1fr] gap-6 font-sans">
      <aside className="border-r border-neutral-300 pr-5 pt-1">
        <div className="mb-5 border-b border-neutral-300 pb-4">
          <h1 className="text-[17px] font-bold leading-tight text-neutral-900">{cv.name}</h1>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">{cv.role}</p>
        </div>
        <div className="space-y-1 text-[10.5px] text-neutral-700 mb-5">
          {cv.email && <p>{cv.email}</p>}
          {cv.phone && <p>{cv.phone}</p>}
          {cv.location && <p>{cv.location}</p>}
          {cv.website && <p>{cv.website}</p>}
        </div>
        {skills.length > 0 && (
          <div>
            <h2 className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Core Skills</h2>
            <ul className="space-y-1 text-[10.5px] text-neutral-700">
              {skills.map(s => <li key={s} className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0" />{s}</li>)}
            </ul>
          </div>
        )}
      </aside>
      <main className="overflow-hidden">
        {cv.summary && (
          <div className="mb-4 rounded bg-neutral-50 p-3 border-l-2 border-neutral-400">
            <p className="text-[11.5px] leading-relaxed text-neutral-700">{cv.summary}</p>
          </div>
        )}
        <div>
          <h2 className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Professional Experience</h2>
          <div className="space-y-3">
            {cv.experience?.map((e, i) => (
              <div key={i}>
                <p className="text-[12px] font-bold text-neutral-900">{e.title}</p>
                <p className="text-[10.5px] text-neutral-500">{e.company} · {e.duration}</p>
                {e.description && <p className="mt-1 text-[11px] leading-relaxed text-neutral-700">{e.description}</p>}
              </div>
            ))}
          </div>
        </div>
        {(cv.education?.length ?? 0) > 0 && (
          <div className="mt-4">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Education</h2>
            {cv.education!.map((e, i) => (
              <p key={i} className="text-[11px] text-neutral-800"><span className="font-semibold">{e.degree}</span> — {e.institution} <span className="text-neutral-500">({e.duration})</span></p>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
