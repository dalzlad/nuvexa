import {
  Briefcase,
  Cog,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface CompanyValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const values: CompanyValue[] = [
  {
    title: "Tecnología práctica",
    description: "Usamos la tecnología cuando resuelve un problema concreto.",
    icon: Wrench,
  },
  {
    title: "Simplicidad",
    description: "Interfaces claras y procesos fáciles de entender.",
    icon: Sparkles,
  },
  {
    title: "Calidad",
    description: "Software confiable, mantenible y bien construido.",
    icon: ShieldCheck,
  },
  {
    title: "Automatización",
    description: "Menos tareas repetitivas, más tiempo para lo importante.",
    icon: Cog,
  },
  {
    title: "Innovación",
    description: "Aplicamos nuevas herramientas, como la IA, con criterio.",
    icon: Lightbulb,
  },
  {
    title: "Orientación empresarial",
    description: "Cada decisión técnica parte de una necesidad del negocio.",
    icon: Briefcase,
  },
];
