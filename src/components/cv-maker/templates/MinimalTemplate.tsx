import type { TemplateProps } from "./_shared";
import { Block } from "./_shared";

export function MinimalTemplate({ cv, skills }: TemplateProps) {
  return (
    <div className="flex h-full flex-col font-sans">
      <header className="border-b border-neutral-200 pb-5">
        <h1 className="text-[32px] font-light tracking-tight text-neutral-900">{cv.name || "Your Name"}</h1>
        <p className="mt-1 text-[13px] text-neutral-500">{cv.role}</p>
        <p className="mt-2 text-[11px] text-neutral-400">
          {[cv.email, cv.phone, cv.location, cv.website].filter(Boolean).join("  ·  ")}
        </p>
      </header>
      {cv.summary && <Block title="Profile"><p className="text-[12px] leading-relaxed text-neutral-600">{cv.summary}</p></Block>}
      {(cv.experience?.length ?? 0) > 0 && (
        <Block title="Experience">
          <div className="space-y-3">
            {cv.experience!.map((e, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <p className="text-[12.5px] font-medium text-neutral-900">{e.title} <span className="font-normal text-neutral-400">@ {e.company}</span></p>
                  <p className="text-[11px] text-neutral-400 shrink-0">{e.duration}</p>
                </div>
                {e.description && <p className="mt-1 text-[12px] leading-relaxed text-neutral-600">{e.description}</p>}
              </div>
            ))}
          </div>
        </Block>
      )}
      {(cv.education?.length ?? 0) > 0 && (
        <Block title="Education">
          {cv.education!.map((e, i) => (
            <div key={i} className="flex justify-between">
              <p className="text-[12px] text-neutral-800"><span className="font-medium">{e.degree}</span> · {e.institution}</p>
              <p className="text-[11px] text-neutral-400 shrink-0">{e.duration}</p>
            </div>
          ))}
        </Block>
      )}
      {skills.length > 0 && (
        <Block title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map(s => <span key={s} className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-[11px] text-neutral-600">{s}</span>)}
          </div>
        </Block>
      )}
    </div>
  );
}
