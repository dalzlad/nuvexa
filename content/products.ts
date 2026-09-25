/**
 * Catálogo de productos de NUVEXA.
 *
 * Para agregar un producto nuevo basta con añadir una entrada aquí:
 * - status "available" + detail  → genera /productos/<slug> automáticamente.
 * - status "coming-soon"         → aparece en el listado, sin página de detalle.
 *
 * Regla de contenido: describir solo funcionalidades que existan.
 */

import { FileText, HardHat, PackageCheck, Wrench, type LucideIcon } from "lucide-react";

export type ProductStatus = "available" | "coming-soon";

export interface FlowStep {
  title: string;
  description: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductDetail {
  /** Título principal (h1) de la página del producto. */
  title: string;
  intro: string;
  problem: {
    title: string;
    description: string;
    points: ProductFeature[];
  };
  flow: {
    title: string;
    description?: string;
    steps: FlowStep[];
  };
  /** Mensaje destacado opcional debajo del flujo. */
  highlight?: string;
  /** Lista opcional (canales, capacidades…). Solo funciones implementadas. */
  features?: {
    title: string;
    description?: string;
    items: ProductFeature[];
  };
  tags?: { title: string; items: string[] };
  cta: { title: string; description: string; label: string };
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  summary: string;
  ctaLabel: string;
  icon: LucideIcon;
  status: ProductStatus;
  seo: { title: string; description: string };
  detail?: ProductDetail;
}

export const products: Product[] = [
  {
    slug: "pedidoflow",
    icon: PackageCheck,
    name: "PedidoFlow B2B",
    category: "SaaS B2B",
    summary:
      "Convierte pedidos provenientes de diferentes canales en órdenes estructuradas listas para validar y despachar.",
    ctaLabel: "Conocer PedidoFlow",
    status: "available",
    seo: {
      title: "PedidoFlow B2B",
      description:
        "Convierte pedidos de diferentes canales en órdenes estructuradas listas para validar y despachar.",
    },
    detail: {
      title: "Convierte pedidos en órdenes listas para gestionar.",
      intro:
        "PedidoFlow B2B recibe los pedidos de tus clientes, interpreta su contenido y los convierte en órdenes estructuradas antes de validarlas y despacharlas.",
      problem: {
        title: "Los pedidos llegan de muchas formas",
        description:
          "Un mensaje, un audio, un correo, una foto o una hoja de cálculo. Cada formato termina en alguien que lo lee y lo vuelve a escribir.",
        points: [
          {
            title: "Digitación manual",
            description: "Cada pedido se transcribe a mano al sistema.",
          },
          {
            title: "Errores",
            description: "Productos, cantidades o clientes mal registrados.",
          },
          {
            title: "Pérdida de tiempo",
            description: "Horas dedicadas a copiar información en lugar de gestionarla.",
          },
          {
            title: "Información desorganizada",
            description: "Pedidos repartidos entre chats, correos y archivos.",
          },
        ],
      },
      flow: {
        title: "Del pedido al despacho",
        description: "Cada pedido sigue el mismo recorrido, sin importar por dónde llegó.",
        steps: [
          { title: "Pedido", description: "Llega por cualquiera de los canales conectados." },
          { title: "Interpretación", description: "Se identifica qué se pidió y en qué cantidades." },
          { title: "Productos y cliente", description: "Se relaciona con tu catálogo, tus clientes y sus precios." },
          { title: "Validación", description: "Tu equipo revisa y corrige antes de confirmar." },
          { title: "Orden", description: "Queda registrada como una orden estructurada." },
          { title: "Despacho", description: "La orden avanza por sus estados hasta la entrega." },
        ],
      },
      tags: {
        title: "Canales de entrada",
        items: ["WhatsApp", "Correo electrónico", "Audio", "Imagen", "Excel y CSV", "Registro manual"],
      },
      features: {
        title: "Qué incluye",
        items: [
          {
            title: "Bandeja de entrada",
            description: "Todos los pedidos recibidos en un solo lugar, sin importar el canal.",
          },
          {
            title: "Interpretación asistida por IA",
            description: "Propone productos y cantidades a partir del mensaje original.",
          },
          {
            title: "Catálogo y sinónimos",
            description: "Reconoce los productos aunque el cliente los nombre de otra forma.",
          },
          {
            title: "Clientes y listas de precios",
            description: "Cada orden toma los precios que corresponden a cada cliente.",
          },
          {
            title: "Revisión y estados",
            description: "Validación humana antes de confirmar y seguimiento de cada orden.",
          },
          {
            title: "Panel de indicadores",
            description: "Vista general de pedidos y mensajes pendientes.",
          },
        ],
      },
      cta: {
        title: "Mira PedidoFlow con tus propios pedidos",
        description: "Agenda una demostración y revisamos cómo se adapta a tu operación.",
        label: "Solicitar demostración",
      },
    },
  },
  {
    slug: "cotizador",
    icon: FileText,
    name: "Cotizador Inteligente",
    category: "SaaS",
    summary:
      "Ayuda a crear cotizaciones rápidamente a partir de las necesidades expresadas por los clientes.",
    ctaLabel: "Conocer Cotizador",
    status: "available",
    seo: {
      title: "Cotizador Inteligente",
      description:
        "Crea cotizaciones a partir de las necesidades expresadas por tus clientes, con control sobre productos, precios, impuestos y totales.",
    },
    detail: {
      title: "Crea cotizaciones de forma más rápida.",
      intro:
        "Cotizador Inteligente ayuda a crear cotizaciones a partir de las necesidades expresadas por los clientes.",
      problem: {
        title: "Cotizar toma más tiempo del que debería",
        description:
          "Leer la solicitud, buscar cada producto, revisar precios, calcular impuestos y armar el documento. Un proceso repetitivo que depende de quien lo haga.",
        points: [
          {
            title: "Solicitudes poco estructuradas",
            description: "El cliente describe lo que necesita con sus propias palabras.",
          },
          {
            title: "Búsqueda manual",
            description: "Cada ítem se busca a mano en el catálogo.",
          },
          {
            title: "Cálculos repetitivos",
            description: "Precios, impuestos y totales se calculan una y otra vez.",
          },
        ],
      },
      flow: {
        title: "De la solicitud a la cotización",
        steps: [
          { title: "Solicitud del cliente", description: "El cliente expresa lo que necesita." },
          { title: "Interpretación", description: "La IA identifica los productos y cantidades solicitados." },
          { title: "Catálogo", description: "Se relaciona cada ítem con tu catálogo real." },
          { title: "Validación", description: "Se revisan productos, precios e impuestos." },
          { title: "Cotización", description: "Se genera el documento con sus totales." },
          { title: "Cliente", description: "La cotización queda lista para enviar." },
        ],
      },
      highlight:
        "La inteligencia artificial ayuda a interpretar la solicitud, mientras que el sistema mantiene el control sobre productos, precios, impuestos y totales.",
      cta: {
        title: "Conoce Cotizador Inteligente",
        description: "Agenda una demostración y revisamos tu proceso de cotización.",
        label: "Solicitar demostración",
      },
    },
  },
  {
    slug: "taller-ai",
    icon: Wrench,
    name: "Taller AI",
    category: "Próximamente",
    summary:
      "Asistente para talleres mecánicos: clientes, vehículos, órdenes de trabajo y apoyo al diagnóstico.",
    ctaLabel: "Quiero saber más",
    status: "coming-soon",
    seo: { title: "Taller AI", description: "Asistente para talleres mecánicos." },
  },
  {
    slug: "sst",
    icon: HardHat,
    name: "Gestión SST",
    category: "Próximamente",
    summary:
      "Gestión de seguridad y salud en el trabajo: documentos, contratistas y seguimiento del cumplimiento.",
    ctaLabel: "Quiero saber más",
    status: "coming-soon",
    seo: {
      title: "Gestión SST",
      description: "Gestión de seguridad y salud en el trabajo.",
    },
  },
];

export const availableProducts = products.filter(
  (p): p is Product & { detail: ProductDetail } => p.status === "available" && !!p.detail,
);

export const upcomingProducts = products.filter((p) => p.status === "coming-soon");

export function getProduct(slug: string) {
  return availableProducts.find((p) => p.slug === slug);
}

export function productHref(product: Product) {
  return product.status === "available" ? `/productos/${product.slug}` : "/contacto";
}
