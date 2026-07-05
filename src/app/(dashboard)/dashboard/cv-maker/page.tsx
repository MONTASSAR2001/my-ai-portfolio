import CVBuilder from "@/components/cv-maker/CVBuilder";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "CV Maker — Résumé Studio",
  description: "Build a stunning, AI-enhanced résumé with live preview and multiple templates.",
};

export default function CVMakerPage() {
  return <CVBuilder />;
}
