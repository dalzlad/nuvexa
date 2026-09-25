import { Blocks, BrainCircuit, Code2, Plug, Workflow, type LucideIcon } from "lucide-react";

export interface Service {
  /** Se usa como ancla: /servicios#<id> */
  id: string;
  title: string;
  /** Etiqueta corta para el pie de página. */
  shortTitle: string;
  /** Resumen de una línea (tarjetas de la portada). */
  description: string;
  /** Qué problema resuelve. */
  problem: string;
  /** Qué tipo de solución se construye. */
  solution: string;
  /** Ejemplos concretos de aplicación (no etapas del proceso). */
  examples: string[];
  icon: LucideIcon;
  showInFooter: boolean;
}

export const services: Service[] = [
  {
    id: "desarrollo-de-software",
    title: "Desarrollo de software",
    shortTitle: "Desarrollo de software",
    description: "Aplicaciones web y plataformas que concentran la operación en un solo sistema.",
    problem:
      "Cuando la operación crece sobre hojas de cálculo, correos y herramientas aisladas, la información se duplica y nadie tiene la versión completa.",
    solution:
      "Desarrollamos aplicaciones web y plataformas empresariales que reúnen la información y el trabajo de un proceso en un solo sistema, con acceso según el rol de cada persona.",
    examples: [
      "Portal de pedidos para clientes",
      "Panel administrativo de inventario",
      "Portal de proveedores para documentos",
      "Sistema interno de solicitudes",
    ],
    icon: Code2,
    showInFooter: true,
  },
  {
    id: "automatizacion",
    title: "Automatización",
    shortTitle: "Automatización",
    description: "Procesos repetitivos que se ejecutan solos y avisan cuando hace falta una decisión.",
    problem:
      "Copiar datos entre archivos, enviar el mismo reporte cada semana o perseguir aprobaciones por correo consume horas del equipo y depende de que alguien lo recuerde.",
    solution:
      "Digitalizamos esos pasos y los automatizamos: el sistema ejecuta las tareas repetitivas, valida los datos y avisa a las personas solo cuando se necesita su intervención.",
    examples: [
      "Aprobación de compras y gastos",
      "Carga y validación de archivos Excel",
      "Reportes periódicos automáticos",
      "Notificaciones por cambios de estado",
    ],
    icon: Workflow,
    showInFooter: true,
  },
  {
    id: "integraciones",
    title: "Integraciones",
    shortTitle: "Integraciones",
    description: "Sistemas conectados para que la información no se copie a mano.",
    problem:
      "Cuando el ERP, el sistema contable, la tienda en línea o el CRM no están conectados, alguien tiene que pasar la información de uno a otro manualmente.",
    solution:
      "Conectamos tus sistemas mediante APIs y servicios de integración para que la información fluya de forma automática y se mantenga consistente en todos ellos.",
    examples: [
      "Pedidos de tienda en línea hacia el ERP",
      "Clientes y facturas hacia el sistema contable",
      "APIs para consulta de terceros",
      "Conexión con servicios externos",
    ],
    icon: Plug,
    showInFooter: true,
  },
  {
    id: "inteligencia-artificial",
    title: "Inteligencia artificial",
    shortTitle: "IA",
    description: "IA aplicada a información que hoy se lee y clasifica a mano.",
    problem:
      "Mucha información llega en formatos que un sistema no entiende directamente: mensajes, correos, documentos o imágenes. Leerla y clasificarla sigue siendo trabajo manual.",
    solution:
      "Aplicamos inteligencia artificial para interpretar y clasificar esa información dentro de procesos con reglas claras, con validación humana donde el resultado importa.",
    examples: [
      "Extracción de datos de documentos",
      "Clasificación de correos y solicitudes",
      "Interpretación de pedidos en lenguaje natural",
      "Asistentes de consulta interna",
    ],
    icon: BrainCircuit,
    showInFooter: true,
  },
  {
    id: "desarrollo-a-medida",
    title: "Desarrollo a medida",
    shortTitle: "Desarrollo a medida",
    description: "Soluciones completas para procesos propios de tu empresa o tu sector.",
    problem:
      "Algunos procesos son propios de cada empresa o sector y no encajan en un software estándar ni en un producto existente.",
    solution:
      "Diseñamos y construimos una solución completa para ese proceso, combinando desarrollo, automatización, integraciones e inteligencia artificial según lo que el caso requiera.",
    examples: [
      "Gestión de un proceso propio del sector",
      "Herramienta que reemplaza varios archivos de Excel",
      "Módulo que complementa el software actual",
      "Plataforma entre clientes, proveedores y equipo",
    ],
    icon: Blocks,
    showInFooter: false,
  },
];
