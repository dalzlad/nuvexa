import {
  Briefcase,
  Eye,
  Feather,
  Handshake,
  Lightbulb,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface CompanyValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const values: CompanyValue[] = [
  {
    title: "Claridad",
    description: "Decimos qué hace el software y qué no. No prometemos lo que el producto no puede cumplir.",
    icon: Eye,
  },
  {
    title: "Simplicidad",
    description: "Preferimos una herramienta fácil de usar a una llena de opciones que nadie necesita.",
    icon: Feather,
  },
  {
    title: "Responsabilidad técnica",
    description: "Construimos software confiable y mantenible, pensado para seguir funcionando después de la entrega.",
    icon: ShieldCheck,
  },
  {
    title: "Criterio con la tecnología",
    description: "Usamos la inteligencia artificial cuando resuelve un problema real, con control humano donde importa.",
    icon: Lightbulb,
  },
  {
    title: "Foco en el negocio",
    description: "Cada decisión técnica parte de una necesidad concreta de la operación.",
    icon: Briefcase,
  },
  {
    title: "Cercanía",
    description: "Trabajamos junto a quienes usan el software y lo ajustamos con su experiencia real.",
    icon: Handshake,
  },
];
