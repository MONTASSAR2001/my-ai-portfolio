import type { TemplateProps } from "./_shared";

export function TechTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="flex h-full flex-col bg-white text-neutral-900" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
      <header className="border-b-2 border-neutral-900 pb-4 mb-4">
        <p className="text-[10px] text-neutral-400">$ whoami</p>
        <h1 className="text-[28px] font-bold text-neutral-900 mt-1">{cv.name}</h1>
        <p className="text-[12px] text-green-700">&gt; {cv.role}</p>
        <div className="mt-2 flex flex-wrap gap-3 text-[10.5px] text-neutral-500">
          {cv.email && <span>✉ {cv.email}</span>}
          {cv.phone && <span>☎ {cv.phone}</span>}
          {cv.location && <span>⌖ {cv.location}</span>}
          {cv.github && <span>⎇ {cv.github}</span>}
        </div>
      </header>
      {cv.summary && (
        <div className="mb-4 rounded border border-neutral-300 bg-neutral-50 p-3">
          <p className="text-[10px] text-neutral-400 mb-1">// about</p>
          <p className="text-[11.5px] leading-relaxed text-neutral-700">{cv.summary}</p>
        </div>
      )}
      <div className="mb-4">
        <p className="text-[10px] text-neutral-400 mb-2">// experience</p>
        <div className="space-y-3">
          {cv.experience?.map((e, i) => (
            <div key={i} className="border-l-2 border-green-600 pl-3">
              <p className="text-[12px] font-bold text-neutral-900">{e.title} <span className="font-normal text-neutral-500">@ {e.company}</span></p>
              <p className="text-[10px] text-neutral-400">{e.duration}</p>
              {e.description && <p className="mt-1 text-[11px] leading-relaxed text-neutral-700">{e.description}</p>}
            </div>
          ))}
        </div>
      </div>
      {skills.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] text-neutral-400 mb-1">// tech_stack</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(s => <span key={s} className="rounded border border-green-700 px-2 py-0.5 text-[10px] text-green-800 bg-green-50">{s}</span>)}
          </div>
        </div>
      )}
      {(cv.education?.length ?? 0) > 0 && (
        <div>
          <p className="text-[10px] text-neutral-400 mb-1">// education</p>
          {cv.education!.map((e, i) => <p key={i} className="text-[11px] text-neutral-700">{e.degree} — {e.institution} ({e.duration})</p>)}
        </div>
      )}
    </div>
  );
}
