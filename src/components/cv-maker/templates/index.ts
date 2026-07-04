export { MinimalTemplate } from "./MinimalTemplate";
export { CorporateTemplate } from "./CorporateTemplate";
export { CreativeTemplate } from "./CreativeTemplate";
export { TechTemplate } from "./TechTemplate";
export { StartupTemplate } from "./StartupTemplate";
export { ElegantTemplate } from "./ElegantTemplate";
export { BoldTemplate } from "./BoldTemplate";
export { AcademicTemplate } from "./AcademicTemplate";
export { ModernTemplate } from "./ModernTemplate";
export { ClassicTemplate } from "./ClassicTemplate";
export type { TemplateProps } from "./_shared";

import type React from 'react';
import type { TemplateProps } from "./_shared";
import { MinimalTemplate } from "./MinimalTemplate";
import { CorporateTemplate } from "./CorporateTemplate";
import { CreativeTemplate } from "./CreativeTemplate";
import { TechTemplate } from "./TechTemplate";
import { StartupTemplate } from "./StartupTemplate";
import { ElegantTemplate } from "./ElegantTemplate";
import { BoldTemplate } from "./BoldTemplate";
import { AcademicTemplate } from "./AcademicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { ClassicTemplate } from "./ClassicTemplate";

export type TemplateId =
  | "minimal" | "corporate" | "creative" | "tech"
  | "startup" | "elegant" | "bold" | "academic"
  | "modern" | "classic";

export const TEMPLATE_REGISTRY: Record<TemplateId, {
  label: string;
  component: (props: TemplateProps) => React.ReactElement;
}> = {
  minimal:   { label: "Minimal",   component: MinimalTemplate },
  corporate: { label: "Corporate", component: CorporateTemplate },
  creative:  { label: "Creative",  component: CreativeTemplate },
  tech:      { label: "Tech",      component: TechTemplate },
  startup:   { label: "Startup",   component: StartupTemplate },
  elegant:   { label: "Elegant",   component: ElegantTemplate },
  bold:      { label: "Bold",      component: BoldTemplate },
  academic:  { label: "Academic",  component: AcademicTemplate },
  modern:    { label: "Modern",    component: ModernTemplate },
  classic:   { label: "Classic",   component: ClassicTemplate },
};
