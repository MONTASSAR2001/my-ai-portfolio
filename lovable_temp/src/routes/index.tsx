import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode, type TextareaHTMLAttributes, type InputHTMLAttributes } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  Download,
  Plus,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Wand2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: CVBuilder,
});

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

type Education = {
  id: string;
  degree: string;
  school: string;
  period: string;
};

type CV = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string;
};

const initialCV: CV = {
  fullName: "Elena Marchetti",
  title: "Senior Product Designer",
  email: "elena@studio.co",
  phone: "+1 (415) 555 0132",
  location: "San Francisco, CA",
  website: "elena.design",
  summary:
    "Product designer with 8+ years shaping consumer software at the intersection of craft, systems, and story. Previously at Linear and Figma.",
  experience: [
    {
      id: "e1",
      role: "Senior Product Designer",
      company: "Linear",
      period: "2022 — Present",
      description:
        "Led the redesign of the issue tracking surface used by 500k teams. Established a motion system and elevated visual density across the app.",
    },
    {
      id: "e2",
      role: "Product Designer",
      company: "Figma",
      period: "2019 — 2022",
      description:
        "Shipped FigJam's collaboration primitives from 0→1. Partnered with engineering to define a component API used across the platform.",
    },
  ],
  education: [
    {
      id: "d1",
      degree: "B.F.A. Interaction Design",
      school: "RISD",
      period: "2013 — 2017",
    },
  ],
  skills: "Product strategy · Design systems · Motion · Prototyping · Figma · Swift · TypeScript",
};

type Template = "minimal" | "corporate" | "creative";

function CVBuilder() {
  const [cv, setCV] = useState<CV>(initialCV);
  const [template, setTemplate] = useState<Template>("minimal");

  const update = <K extends keyof CV>(key: K, value: CV[K]) =>
    setCV((c) => ({ ...c, [key]: value }));

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-obsidian text-foreground">
        <TopBar template={template} onTemplate={setTemplate} />
        <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* LEFT — Form */}
          <aside className="border-r border-hairline bg-obsidian">
            <div className="mx-auto max-w-xl px-8 py-10">
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Résumé Studio
                </p>
                <h1 className="mt-2 font-serif text-3xl leading-tight text-foreground">
                  Craft a résumé worth reading.
                </h1>
              </div>

              <Accordion
                type="multiple"
                defaultValue={["personal", "summary", "experience"]}
                className="space-y-2"
              >
                <Section value="personal" icon={<User className="h-3.5 w-3.5" />} label="Personal Details">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Full name" value={cv.fullName} onChange={(v) => update("fullName", v)} />
                    <Field label="Title" value={cv.title} onChange={(v) => update("title", v)} />
                    <Field label="Email" value={cv.email} onChange={(v) => update("email", v)} />
                    <Field label="Phone" value={cv.phone} onChange={(v) => update("phone", v)} />
                    <Field label="Location" value={cv.location} onChange={(v) => update("location", v)} />
                    <Field label="Website" value={cv.website} onChange={(v) => update("website", v)} />
                  </div>
                </Section>

                <Section value="summary" icon={<FileText className="h-3.5 w-3.5" />} label="Professional Summary">
                  <TextArea
                    value={cv.summary}
                    onChange={(v) => update("summary", v)}
                    rows={5}
                    placeholder="A short paragraph about who you are and what you build."
                  />
                </Section>

                <Section value="experience" icon={<Briefcase className="h-3.5 w-3.5" />} label="Work Experience">
                  <div className="space-y-4">
                    {cv.experience.map((exp, i) => (
                      <div key={exp.id} className="rounded-lg border border-hairline bg-white/[0.02] p-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Role" value={exp.role} onChange={(v) => {
                            const next = [...cv.experience]; next[i] = { ...exp, role: v }; update("experience", next);
                          }} />
                          <Field label="Company" value={exp.company} onChange={(v) => {
                            const next = [...cv.experience]; next[i] = { ...exp, company: v }; update("experience", next);
                          }} />
                          <div className="col-span-2">
                            <Field label="Period" value={exp.period} onChange={(v) => {
                              const next = [...cv.experience]; next[i] = { ...exp, period: v }; update("experience", next);
                            }} />
                          </div>
                        </div>
                        <div className="mt-3">
                          <TextArea
                            label="Description"
                            value={exp.description}
                            rows={3}
                            onChange={(v) => {
                              const next = [...cv.experience]; next[i] = { ...exp, description: v }; update("experience", next);
                            }}
                          />
                        </div>
                        <button
                          onClick={() => update("experience", cv.experience.filter((e) => e.id !== exp.id))}
                          className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground transition hover:text-foreground cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    ))}
                    <AddButton
                      onClick={() =>
                        update("experience", [
                          ...cv.experience,
                          { id: crypto.randomUUID(), role: "", company: "", period: "", description: "" },
                        ])
                      }
                      label="Add experience"
                    />
                  </div>
                </Section>

                <Section value="education" icon={<GraduationCap className="h-3.5 w-3.5" />} label="Education">
                  <div className="space-y-4">
                    {cv.education.map((ed, i) => (
                      <div key={ed.id} className="rounded-lg border border-hairline bg-white/[0.02] p-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Degree" value={ed.degree} onChange={(v) => {
                            const next = [...cv.education]; next[i] = { ...ed, degree: v }; update("education", next);
                          }} />
                          <Field label="School" value={ed.school} onChange={(v) => {
                            const next = [...cv.education]; next[i] = { ...ed, school: v }; update("education", next);
                          }} />
                          <div className="col-span-2">
                            <Field label="Period" value={ed.period} onChange={(v) => {
                              const next = [...cv.education]; next[i] = { ...ed, period: v }; update("education", next);
                            }} />
                          </div>
                        </div>
                        <button
                          onClick={() => update("education", cv.education.filter((e) => e.id !== ed.id))}
                          className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground transition hover:text-foreground cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    ))}
                    <AddButton
                      onClick={() =>
                        update("education", [
                          ...cv.education,
                          { id: crypto.randomUUID(), degree: "", school: "", period: "" },
                        ])
                      }
                      label="Add education"
                    />
                  </div>
                </Section>

                <Section value="skills" icon={<Sparkles className="h-3.5 w-3.5" />} label="Skills">
                  <TextArea
                    value={cv.skills}
                    onChange={(v) => update("skills", v)}
                    rows={3}
                    placeholder="Separate with · or commas"
                  />
                </Section>
              </Accordion>
            </div>
          </aside>

          {/* RIGHT — Preview */}
          <section className="relative bg-panel">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative flex min-h-full items-start justify-center px-6 py-12 lg:px-10 lg:py-16">
              <PaperPreview cv={cv} template={template} />
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  );
}

/* ---------- Top Bar ---------- */

function TopBar({ template, onTemplate }: { template: Template; onTemplate: (t: Template) => void }) {
  return (
    <header className="glass sticky top-0 z-30">
      <div className="flex h-16 items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-primary-foreground">
            <span className="font-serif text-sm leading-none">R</span>
          </div>
          <span className="text-sm font-medium tracking-tight">Résumé Studio</span>
          <span className="ml-2 hidden text-[11px] text-muted-foreground sm:inline">/ Untitled draft</span>
        </div>

        <div className="flex items-center gap-2">
          <Select value={template} onValueChange={(v) => onTemplate(v as Template)}>
            <SelectTrigger className="h-9 w-[170px] border-hairline bg-white/[0.04] text-xs cursor-pointer focus-glow">
              <SelectValue placeholder="Template" />
            </SelectTrigger>
            <SelectContent className="border-hairline bg-obsidian text-foreground">
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-4 text-xs font-medium text-primary-foreground transition hover:opacity-90 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Left form primitives ---------- */

function Section({
  value,
  icon,
  label,
  children,
}: {
  value: string;
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <AccordionItem
      value={value}
      className="rounded-xl border border-hairline bg-white/[0.02] px-4 !border-b"
    >
      <AccordionTrigger className="py-3.5 text-[13px] font-medium tracking-tight hover:no-underline cursor-pointer">
        <span className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-hairline text-muted-foreground">
            {icon}
          </span>
          {label}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pt-1 pb-4">{children}</AccordionContent>
    </AccordionItem>
  );
}

function Field({
  label,
  value,
  onChange,
  ...rest
}: { label: string; value: string; onChange: (v: string) => void } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-glow block w-full rounded-md border border-hairline bg-white/[0.03] px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/60"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  ...rest
}: { label?: string; value: string; onChange: (v: string) => void } & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange"
>) {
  const [enhancing, setEnhancing] = useState(false);
  const enhance = () => {
    setEnhancing(true);
    setTimeout(() => {
      const polished = value.trim().length
        ? value.trim().replace(/\s+/g, " ")
        : value;
      onChange(polished);
      setEnhancing(false);
    }, 700);
  };
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
      )}
      <div className="focus-glow relative rounded-md border border-hairline bg-white/[0.03]">
        <textarea
          {...rest}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full resize-none rounded-md bg-transparent px-3 py-2.5 pr-10 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={enhance}
              aria-label="Enhance text"
              className={`absolute bottom-2 right-2 grid h-6 w-6 place-items-center rounded-md text-muted-foreground/70 transition hover:text-foreground hover:bg-white/5 cursor-pointer ${
                enhancing ? "animate-pulse text-foreground" : ""
              }`}
            >
              <Wand2 className="h-3.5 w-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="border border-hairline bg-obsidian text-[11px] text-foreground">
            Enhance text
          </TooltipContent>
        </Tooltip>
      </div>
    </label>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-hairline bg-transparent px-3 py-2 text-[11px] text-muted-foreground transition hover:border-foreground/30 hover:text-foreground cursor-pointer"
    >
      <Plus className="h-3 w-3" /> {label}
    </button>
  );
}

/* ---------- Right paper preview ---------- */

function PaperPreview({ cv, template }: { cv: CV; template: Template }) {
  const skills = useMemo(
    () =>
      cv.skills
        .split(/[·,]/)
        .map((s) => s.trim())
        .filter(Boolean),
    [cv.skills],
  );

  return (
    <div
      className="paper-shadow w-full max-w-[720px] rounded-sm bg-white text-neutral-900"
      style={{ aspectRatio: "1 / 1.414" }}
    >
      <div className="h-full w-full overflow-hidden p-10 sm:p-14">
        {template === "minimal" && <MinimalTemplate cv={cv} skills={skills} />}
        {template === "corporate" && <CorporateTemplate cv={cv} skills={skills} />}
        {template === "creative" && <CreativeTemplate cv={cv} skills={skills} />}
      </div>
    </div>
  );
}

function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-neutral-400">{icon}</span>
      {children}
    </span>
  );
}

function MinimalTemplate({ cv, skills }: { cv: CV; skills: string[] }) {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-neutral-200 pb-6">
        <h1 className="font-serif text-[34px] leading-none text-neutral-900">{cv.fullName || "Your name"}</h1>
        <p className="mt-2 text-[13px] tracking-wide text-neutral-500">{cv.title}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-neutral-600">
          {cv.email && <Row icon={<Mail className="h-3 w-3" />}>{cv.email}</Row>}
          {cv.phone && <Row icon={<Phone className="h-3 w-3" />}>{cv.phone}</Row>}
          {cv.location && <Row icon={<MapPin className="h-3 w-3" />}>{cv.location}</Row>}
          {cv.website && <Row icon={<Globe className="h-3 w-3" />}>{cv.website}</Row>}
        </div>
      </header>

      {cv.summary && (
        <Block title="Profile">
          <p className="text-[12px] leading-relaxed text-neutral-700">{cv.summary}</p>
        </Block>
      )}

      {cv.experience.length > 0 && (
        <Block title="Experience">
          <div className="space-y-4">
            {cv.experience.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[12.5px] font-semibold text-neutral-900">
                    {e.role} <span className="font-normal text-neutral-500">· {e.company}</span>
                  </p>
                  <p className="shrink-0 text-[11px] text-neutral-500">{e.period}</p>
                </div>
                {e.description && (
                  <p className="mt-1 text-[12px] leading-relaxed text-neutral-700">{e.description}</p>
                )}
              </div>
            ))}
          </div>
        </Block>
      )}

      {cv.education.length > 0 && (
        <Block title="Education">
          <div className="space-y-2">
            {cv.education.map((e) => (
              <div key={e.id} className="flex items-baseline justify-between gap-4">
                <p className="text-[12.5px] text-neutral-900">
                  <span className="font-semibold">{e.degree}</span>{" "}
                  <span className="text-neutral-500">· {e.school}</span>
                </p>
                <p className="shrink-0 text-[11px] text-neutral-500">{e.period}</p>
              </div>
            ))}
          </div>
        </Block>
      )}

      {skills.length > 0 && (
        <Block title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-[11px] text-neutral-700"
              >
                {s}
              </span>
            ))}
          </div>
        </Block>
      )}
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

function CorporateTemplate({ cv, skills }: { cv: CV; skills: string[] }) {
  return (
    <div className="grid h-full grid-cols-[1fr_2fr] gap-8">
      <aside className="border-r border-neutral-200 pr-6">
        <h1 className="text-[22px] font-bold leading-tight text-neutral-900">{cv.fullName}</h1>
        <p className="mt-1 text-[11px] uppercase tracking-widest text-neutral-500">{cv.title}</p>
        <div className="mt-6 space-y-1.5 text-[11px] text-neutral-700">
          {cv.email && <p>{cv.email}</p>}
          {cv.phone && <p>{cv.phone}</p>}
          {cv.location && <p>{cv.location}</p>}
          {cv.website && <p>{cv.website}</p>}
        </div>
        {skills.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Expertise
            </h2>
            <ul className="space-y-1 text-[11.5px] text-neutral-700">
              {skills.map((s) => <li key={s}>— {s}</li>)}
            </ul>
          </div>
        )}
      </aside>
      <main>
        {cv.summary && (
          <>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Profile</h2>
            <p className="mt-2 text-[12px] leading-relaxed text-neutral-700">{cv.summary}</p>
          </>
        )}
        <h2 className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Experience</h2>
        <div className="mt-2 space-y-4">
          {cv.experience.map((e) => (
            <div key={e.id}>
              <p className="text-[12.5px] font-semibold text-neutral-900">{e.role} — {e.company}</p>
              <p className="text-[10.5px] uppercase tracking-wider text-neutral-500">{e.period}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-neutral-700">{e.description}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Education</h2>
        <div className="mt-2 space-y-1.5">
          {cv.education.map((e) => (
            <p key={e.id} className="text-[12px] text-neutral-800">
              <span className="font-semibold">{e.degree}</span> — {e.school} · <span className="text-neutral-500">{e.period}</span>
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}

function CreativeTemplate({ cv, skills }: { cv: CV; skills: string[] }) {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-end justify-between border-b border-neutral-900 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Portfolio · {new Date().getFullYear()}</p>
          <h1 className="mt-1 font-serif text-[42px] leading-none text-neutral-900">{cv.fullName}</h1>
        </div>
        <p className="font-serif text-[15px] italic text-neutral-700">{cv.title}</p>
      </header>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-600">
        {cv.email}{cv.email && cv.phone && " · "}{cv.phone}{cv.phone && cv.location && " · "}{cv.location}{cv.location && cv.website && " · "}{cv.website}
      </div>

      {cv.summary && (
        <p className="mt-6 font-serif text-[18px] leading-snug text-neutral-800">{cv.summary}</p>
      )}

      <section className="mt-6">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">Selected Work</h2>
        <div className="mt-3 space-y-3">
          {cv.experience.map((e) => (
            <div key={e.id} className="grid grid-cols-[80px_1fr] gap-4">
              <p className="text-[10.5px] uppercase tracking-widest text-neutral-500">{e.period}</p>
              <div>
                <p className="text-[13px] text-neutral-900"><span className="font-semibold">{e.company}</span> — {e.role}</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-neutral-700">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">Education</h2>
        {cv.education.map((e) => (
          <p key={e.id} className="mt-2 text-[12px] text-neutral-800">
            {e.degree} · {e.school} · <span className="text-neutral-500">{e.period}</span>
          </p>
        ))}
      </section>

      {skills.length > 0 && (
        <p className="mt-auto pt-6 text-[11px] text-neutral-500">{skills.join(" · ")}</p>
      )}
    </div>
  );
}
