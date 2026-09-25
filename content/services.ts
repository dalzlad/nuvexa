import { Blocks, BrainCircuit, Code2, Plug, Workflow, type LucideIcon } from "lucide-react";

export interface Service {
  /** Se usa como ancla: /servicios#<id> */
  id: string;
  title: string;
  /** Etiqueta corta para el pie de página. */
  shortTitle: string;
  description: string;
  examples: string[];
  icon: LucideIcon;
  showInFooter: boolean;
}

export const services: Service[] = [
  {
    id: "desarrollo-de-software",
    title: "Desarrollo de software",
    shortTitle: "Desarrollo de software",
    description: "Aplicaciones web y plataformas empresariales.",
    examples: ["Plataformas web", "Paneles administrativos", "Portales para clientes y proveedores"],
    icon: Code2,
    showInFooter: true,
  },
  {
    id: "automatizacion",
    title: "Automatización",
    shortTitle: "Automatización",
    description: "Digitalización y automatización de procesos repetitivos.",
    examples: ["Flujos de aprobación", "Carga y validación de datos", "Reportes automáticos"],
    icon: Workflow,
    showInFooter: true,
  },
  {
    id: "integraciones",
    title: "Integraciones",
    shortTitle: "Integraciones",
    description: "Conexión entre sistemas, APIs y servicios.",
    examples: ["APIs a medida", "Sincronización entre sistemas", "Conexión con servicios externos"],
    icon: Plug,
    showInFooter: true,
  },
  {
    id: "inteligencia-artificial",
    title: "Inteligencia artificial",
    shortTitle: "IA",
    description: "Aplicaciones prácticas de IA para procesos empresariales.",
    examples: ["Interpretación de documentos y mensajes", "Clasificación de información", "Asistentes para tareas internas"],
    icon: BrainCircuit,
    showInFooter: true,
  },
  {
    id: "desarrollo-a-medida",
    title: "Desarrollo a medida",
    shortTitle: "Desarrollo a medida",
    description: "Construcción de soluciones específicas para cada empresa.",
    examples: ["Análisis del proceso", "Diseño de la solución", "Construcción y acompañamiento"],
    icon: Blocks,
    showInFooter: false,
  },
];
