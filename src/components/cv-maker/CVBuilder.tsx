"use client";

import { useMemo, useState, type ReactNode, type InputHTMLAttributes } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema, type CVData } from "@/lib/schemas/cv-schema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AIEnhanceButton from "@/components/cv-maker/AIEnhanceButton";
import CoverLetterGenerator from "@/components/cv-maker/CoverLetterGenerator";
import ATSAnalyzer from "@/components/cv-maker/ATSAnalyzer";
import { TEMPLATE_REGISTRY, type TemplateId } from "@/components/cv-maker/templates";
import { User, FileText, Briefcase, GraduationCap, Sparkles, Download, Plus, Trash2, LayoutTemplate, PenLine, Target, Mail, Phone, MapPin, Globe } from "lucide-react";

// ─── Internal form state (superset of CVData for the builder) ───────────────
// We keep `website` and re-map skills as a plain string for ergonomics.
type BuilderForm = CVData & { website?: string; skillsRaw: string };

const defaultValues: BuilderForm = {
  name: "Elena Marchetti",
  role: "Senior Product Designer",
  email: "elena@studio.co",
  phone: "+1 (415) 555 0132",
  location: "San Francisco, CA",
  website: "elena.design",
  bio: null,
  cv_url: null,
  linkedin: null,
  github: null,
  whatsapp: null,
  facebook: null,
  summary:
    "Product designer with 8+ years shaping consumer software at the intersection of craft, systems, and story. Previously at Linear and Figma.",
  experience: [
    {
      title: "Senior Product Designer",
      company: "Linear",
      duration: "2022 — Present",
      description:
        "Led the redesign of the issue tracking surface used by 500k teams. Established a motion system and elevated visual density across the app.",
    },
  ],
  education: [
    { degree: "B.F.A. Interaction Design", institution: "RISD", duration: "2013 — 2017" },
  ],
  projects: [],
  skills: ["Product strategy", "Design systems", "Motion", "Prototyping", "Figma", "Swift", "TypeScript"],
  skillsRaw: "Product strategy · Design systems · Motion · Prototyping · Figma · Swift · TypeScript",
};

export default function CVBuilder() {
  const [template, setTemplate] = useState<TemplateId>("minimal");
  const [activeTab, setActiveTab] = useState<"cv" | "cover-letter" | "ats">("cv");

  const { register, control, watch, setValue } = useForm<BuilderForm>({
    resolver: zodResolver(cvSchema.extend({ skillsRaw: cvSchema.shape.summary }) as any),
    defaultValues,
    mode: "onChange",
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experience" });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });

  const cv = watch();

  // Parse skills from the raw comma/dot-separated string for the preview
  const skillsForPreview = useMemo(
    () => (cv.skillsRaw || "").split(/[·,]/).map((s) => s.trim()).filter(Boolean),
    [cv.skillsRaw],
  );

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-[#09090B] text-zinc-200">
        {/* ── Top Bar ── */}
        <header
          id="cv-topbar"
          className="print:hidden sticky top-0 z-30 flex h-16 items-center justify-between px-6 lg:px-8"
          style={{
            background: "color-mix(in oklab, #09090B 60%, transparent)",
            backdropFilter: "blur(20px) saturate(140%)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-zinc-100 text-black">
              <span className="font-serif text-sm leading-none">R</span>
            </div>
            <span className="text-sm font-medium tracking-tight">Résumé Studio</span>
            <span className="ml-2 hidden text-[11px] text-zinc-500 sm:inline">/ Untitled draft</span>
          </div>

          <div className="flex items-center gap-2">
            <Select value={template} onValueChange={(v) => setTemplate(v as TemplateId)}>
              <SelectTrigger className="h-9 w-[200px] text-xs">
                <SelectValue placeholder="Template" />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(TEMPLATE_REGISTRY) as [TemplateId, { label: string }][]).map(([id, { label }]) => (
                  <SelectItem key={id} value={id}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              onClick={() => window.print()}
              className="inline-flex h-9 items-center gap-2 rounded-md bg-zinc-100 px-4 text-xs font-medium text-black transition hover:bg-white cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
          </div>
        </header>

        {/* ── Split layout ── */}
        <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* LEFT — Form */}
          <aside id="cv-form-aside" className="print:hidden border-r border-white/[0.08] bg-[#09090B] overflow-y-auto">
            <div className="mx-auto max-w-xl px-8 py-10">
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Résumé Studio</p>
                <h1 className="mt-2 font-serif text-3xl leading-tight text-zinc-100">
                  Craft a résumé worth reading.
                </h1>
              </div>

              {/* View Toggle */}
              <div className="flex bg-white/[0.02] border border-white/[0.08] rounded-lg p-1 mb-8">
                <button
                  onClick={() => setActiveTab("cv")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium rounded-md transition-all ${
                    activeTab === "cv" 
                      ? "bg-[#111116] text-white shadow-sm border border-white/[0.08]" 
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <LayoutTemplate className="w-3.5 h-3.5" /> Editor
                </button>
                <button
                  onClick={() => setActiveTab("cover-letter")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium rounded-md transition-all ${
                    activeTab === "cover-letter" 
                      ? "bg-[#111116] text-white shadow-sm border border-white/[0.08]" 
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <PenLine className="w-3.5 h-3.5" /> Letter
                </button>
                <button
                  onClick={() => setActiveTab("ats")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium rounded-md transition-all ${
                    activeTab === "ats" 
                      ? "bg-[#111116] text-white shadow-sm border border-white/[0.08]" 
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Target className="w-3.5 h-3.5" /> ATS Scan
                </button>
              </div>

              {activeTab === "cv" ? (
                <Accordion type="multiple" defaultValue={["personal", "summary", "experience"]} className="space-y-2">
                  {/* Personal */}
                <FormSection value="personal" icon={<User className="h-3.5 w-3.5" />} label="Personal Details">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Full name" {...register("name")} />
                    <Field label="Title / Role" {...register("role")} />
                    <Field label="Email" {...register("email")} />
                    <Field label="Phone" {...register("phone")} />
                    <Field label="Location" {...register("location")} />
                    <Field label="Website" {...register("website")} />
                  </div>
                </FormSection>

                {/* Summary */}
                <FormSection value="summary" icon={<FileText className="h-3.5 w-3.5" />} label="Professional Summary">
                  <Controller
                    control={control}
                    name="summary"
                    render={({ field }) => (
                      <EnhancedTextArea
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        rows={5}
                        placeholder="A short paragraph about who you are and what you build."
                      />
                    )}
                  />
                </FormSection>

                {/* Experience */}
                <FormSection value="experience" icon={<Briefcase className="h-3.5 w-3.5" />} label="Work Experience">
                  <div className="space-y-4">
                    {expFields.map((field, i) => (
                      <div key={field.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Role" {...register(`experience.${i}.title`)} />
                          <Field label="Company" {...register(`experience.${i}.company`)} />
                          <div className="col-span-2">
                            <Field label="Period" {...register(`experience.${i}.duration`)} />
                          </div>
                        </div>
                        <div className="mt-3">
                          <Controller
                            control={control}
                            name={`experience.${i}.description`}
                            render={({ field }) => (
                              <EnhancedTextArea
                                label="Description"
                                value={field.value ?? ""}
                                onChange={field.onChange}
                                rows={3}
                                placeholder="What did you achieve?"
                              />
                            )}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExp(i)}
                          className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-zinc-500 transition hover:text-zinc-200 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    ))}
                    <AddButton
                      label="Add experience"
                      onClick={() => appendExp({ title: "", company: "", duration: "", description: "" })}
                    />
                  </div>
                </FormSection>

                {/* Education */}
                <FormSection value="education" icon={<GraduationCap className="h-3.5 w-3.5" />} label="Education">
                  <div className="space-y-4">
                    {eduFields.map((field, i) => (
                      <div key={field.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Degree" {...register(`education.${i}.degree`)} />
                          <Field label="Institution" {...register(`education.${i}.institution`)} />
                          <div className="col-span-2">
                            <Field label="Period" {...register(`education.${i}.duration`)} />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEdu(i)}
                          className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-zinc-500 transition hover:text-zinc-200 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    ))}
                    <AddButton
                      label="Add education"
                      onClick={() => appendEdu({ degree: "", institution: "", duration: "" })}
                    />
                  </div>
                </FormSection>

                {/* Skills */}
                <FormSection value="skills" icon={<Sparkles className="h-3.5 w-3.5" />} label="Skills">
                  <Controller
                    control={control}
                    name="skillsRaw"
                    render={({ field }) => (
                      <EnhancedTextArea
                        value={field.value ?? ""}
                        onChange={(val) => {
                          field.onChange(val);
                          // Sync parsed array back to the real skills field
                          setValue("skills", val.split(/[·,]/).map((s) => s.trim()).filter(Boolean));
                        }}
                        rows={3}
                        placeholder="Separate with · or commas"
                      />
                    )}
                  />
                </FormSection>
              </Accordion>
              ) : activeTab === "cover-letter" ? (
                <div className="mt-2">
                  <CoverLetterGenerator cvData={cv} />
                </div>
              ) : (
                <div className="mt-2">
                  <ATSAnalyzer cvData={cv} />
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT — Preview */}
          <section
            id="cv-preview-section"
            className="relative bg-[#111116] overflow-y-auto print:absolute print:inset-0 print:block print:w-full print:bg-white print:z-50 print:p-0 print:m-0 print:overflow-visible"
          >
            {/* dot grid — hidden when printing */}
            <div
              aria-hidden
              className="print:hidden pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative flex min-h-full items-start justify-center px-6 py-12 lg:px-10 lg:py-16 print:block print:p-0 print:m-0 print:min-h-0">
              <PaperPreview cv={cv} skillsForPreview={skillsForPreview} template={template} />
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  );
}

// ─── Form primitives ──────────────────────────────────────────────────────────

function FormSection({ value, icon, label, children }: { value: string; icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <AccordionItem value={value} className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 !border-b">
      <AccordionTrigger className="py-3.5 text-[13px] font-medium tracking-tight hover:no-underline cursor-pointer">
        <span className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-white/[0.08] text-zinc-500">
            {icon}
          </span>
          {label}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pt-1 pb-4">{children}</AccordionContent>
    </AccordionItem>
  );
}

// Simple text input — uses ...rest to accept react-hook-form's register props
function Field({ label, ...rest }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-zinc-500">{label}</span>
      <input
        {...rest}
        className="block w-full rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
      />
    </label>
  );
}

// Textarea with integrated AIEnhanceButton
function EnhancedTextArea({
  label, value, onChange, rows, placeholder,
}: {
  label?: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-zinc-500">{label}</span>
      )}
      <div className="relative rounded-md border border-white/[0.08] bg-white/[0.03] focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-500 transition-all">
        <textarea
          rows={rows ?? 4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full resize-none rounded-md bg-transparent px-3 py-2.5 pr-10 text-[13px] leading-relaxed text-zinc-200 placeholder:text-zinc-700 focus:outline-none"
        />
        <div className="absolute bottom-2 right-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <AIEnhanceButton currentText={value} onUpdate={onChange} />
              </span>
            </TooltipTrigger>
            <TooltipContent side="left">Enhance with AI</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </label>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-white/[0.12] bg-transparent px-3 py-2 text-[11px] text-zinc-500 transition hover:border-zinc-500 hover:text-zinc-200 cursor-pointer"
    >
      <Plus className="h-3 w-3" /> {label}
    </button>
  );
}

// ─── Preview panel ────────────────────────────────────────────────────────────

type PreviewCV = BuilderForm;

function PaperPreview({ cv, skillsForPreview, template }: { cv: PreviewCV; skillsForPreview: string[]; template: TemplateId }) {
  const TemplateComponent = TEMPLATE_REGISTRY[template].component;
  return (
    <div
      id="cv-print-area"
      className="w-full max-w-[720px] rounded-sm bg-white text-neutral-900"
      style={{
        aspectRatio: "1 / 1.414",
        boxShadow: "0 1px 1px rgba(0,0,0,0.35), 0 8px 24px -6px rgba(0,0,0,0.55), 0 40px 80px -20px rgba(0,0,0,0.65)",
      }}
    >
      <div className="h-full w-full overflow-hidden p-10 sm:p-14">
        <TemplateComponent cv={cv} skills={skillsForPreview} />
      </div>
    </div>
  );
}

// All template components are now in src/components/cv-maker/templates/
// The inline MinimalTemplate, CorporateTemplate, CreativeTemplate have been removed.

function ContactRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-neutral-400">{icon}</span>
      {children}
    </span>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">{title}</h2>
      {children}
    </section>
  );
}

function MinimalTemplate({ cv, skills }: { cv: PreviewCV; skills: string[] }) {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-neutral-200 pb-6">
        <h1 className="font-serif text-[34px] leading-none text-neutral-900">{cv.name || "Your name"}</h1>
        <p className="mt-2 text-[13px] tracking-wide text-neutral-500">{cv.role}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-neutral-600">
          {cv.email && <ContactRow icon={<Mail className="h-3 w-3" />}>{cv.email}</ContactRow>}
          {cv.phone && <ContactRow icon={<Phone className="h-3 w-3" />}>{cv.phone}</ContactRow>}
          {cv.location && <ContactRow icon={<MapPin className="h-3 w-3" />}>{cv.location}</ContactRow>}
          {cv.website && <ContactRow icon={<Globe className="h-3 w-3" />}>{cv.website}</ContactRow>}
        </div>
      </header>

      {cv.summary && (
        <Block title="Profile">
          <p className="text-[12px] leading-relaxed text-neutral-700">{cv.summary}</p>
        </Block>
      )}

      {(cv.experience?.length ?? 0) > 0 && (
        <Block title="Experience">
          <div className="space-y-4">
            {cv.experience!.map((e, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[12.5px] font-semibold text-neutral-900">
                    {e.title} <span className="font-normal text-neutral-500">· {e.company}</span>
                  </p>
                  <p className="shrink-0 text-[11px] text-neutral-500">{e.duration}</p>
                </div>
                {e.description && <p className="mt-1 text-[12px] leading-relaxed text-neutral-700">{e.description}</p>}
              </div>
            ))}
          </div>
        </Block>
      )}

      {(cv.education?.length ?? 0) > 0 && (
        <Block title="Education">
          <div className="space-y-2">
            {cv.education!.map((e, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4">
                <p className="text-[12.5px] text-neutral-900">
                  <span className="font-semibold">{e.degree}</span>{" "}
                  <span className="text-neutral-500">· {e.institution}</span>
                </p>
                <p className="shrink-0 text-[11px] text-neutral-500">{e.duration}</p>
              </div>
            ))}
          </div>
        </Block>
      )}

      {skills.length > 0 && (
        <Block title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-[11px] text-neutral-700">
                {s}
              </span>
            ))}
          </div>
        </Block>
      )}
    </div>
  );
}

function CorporateTemplate({ cv, skills }: { cv: PreviewCV; skills: string[] }) {
  return (
    <div className="grid h-full grid-cols-[1fr_2fr] gap-8">
      <aside className="border-r border-neutral-200 pr-6">
        <h1 className="text-[22px] font-bold leading-tight text-neutral-900">{cv.name}</h1>
        <p className="mt-1 text-[11px] uppercase tracking-widest text-neutral-500">{cv.role}</p>
        <div className="mt-6 space-y-1.5 text-[11px] text-neutral-700">
          {cv.email && <p>{cv.email}</p>}
          {cv.phone && <p>{cv.phone}</p>}
          {cv.location && <p>{cv.location}</p>}
          {cv.website && <p>{cv.website}</p>}
        </div>
        {skills.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Expertise</h2>
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
          {cv.experience?.map((e, i) => (
            <div key={i}>
              <p className="text-[12.5px] font-semibold text-neutral-900">{e.title} — {e.company}</p>
              <p className="text-[10.5px] uppercase tracking-wider text-neutral-500">{e.duration}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-neutral-700">{e.description}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Education</h2>
        <div className="mt-2 space-y-1.5">
          {cv.education?.map((e, i) => (
            <p key={i} className="text-[12px] text-neutral-800">
              <span className="font-semibold">{e.degree}</span> — {e.institution} ·{" "}
              <span className="text-neutral-500">{e.duration}</span>
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}

function CreativeTemplate({ cv, skills }: { cv: PreviewCV; skills: string[] }) {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-end justify-between border-b border-neutral-900 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Portfolio · {new Date().getFullYear()}</p>
          <h1 className="mt-1 font-serif text-[42px] leading-none text-neutral-900">{cv.name}</h1>
        </div>
        <p className="font-serif text-[15px] italic text-neutral-700">{cv.role}</p>
      </header>

      <div className="mt-4 text-[11px] text-neutral-600">
        {[cv.email, cv.phone, cv.location, cv.website].filter(Boolean).join(" · ")}
      </div>

      {cv.summary && <p className="mt-6 font-serif text-[18px] leading-snug text-neutral-800">{cv.summary}</p>}

      <section className="mt-6">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">Selected Work</h2>
        <div className="mt-3 space-y-3">
          {cv.experience?.map((e, i) => (
            <div key={i} className="grid grid-cols-[80px_1fr] gap-4">
              <p className="text-[10.5px] uppercase tracking-widest text-neutral-500">{e.duration}</p>
              <div>
                <p className="text-[13px] text-neutral-900"><span className="font-semibold">{e.company}</span> — {e.title}</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-neutral-700">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">Education</h2>
        {cv.education?.map((e, i) => (
          <p key={i} className="mt-2 text-[12px] text-neutral-800">
            {e.degree} · {e.institution} · <span className="text-neutral-500">{e.duration}</span>
          </p>
        ))}
      </section>

      {skills.length > 0 && (
        <p className="mt-auto pt-6 text-[11px] text-neutral-500">{skills.join(" · ")}</p>
      )}
    </div>
  );
}
