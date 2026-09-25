/**
 * Catálogo de productos de NUVEXA.
 *
 * Para agregar un producto nuevo basta con añadir una entrada aquí:
 * - status "available" + detail  → genera /productos/<slug> automáticamente.
 * - status "coming-soon"         → aparece en "Próximamente", sin página de detalle.
 *
 * Regla de contenido: describir solo funcionalidades que existan.
 * "category" es el área de negocio que resuelve el producto, no su estado.
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
  /** Qué cambia en el proceso al usar el producto. Sin cifras ni resultados no comprobados. */
  outcomes?: {
    title: string;
    description?: string;
    items: ProductFeature[];
  };
  cta: { title: string; description: string };
}

export interface Product {
  slug: string;
  name: string;
  /** Opcional en productos "Próximamente": sin categoría ni resumen se muestra solo el nombre. */
  category?: string;
  summary?: string;
  icon: LucideIcon;
  status: ProductStatus;
  seo?: { title: string; description: string };
  detail?: ProductDetail;
  /** Solo "coming-soon": genera /productos/<slug> con el nombre y "Próximamente", sin más contenido. */
  comingSoonPage?: boolean;
}

type AvailableProduct = Product & {
  category: string;
  summary: string;
  seo: NonNullable<Product["seo"]>;
  detail: ProductDetail;
};

export const products: Product[] = [
  {
    slug: "pedidoflow",
    icon: PackageCheck,
    name: "PedidoFlow B2B",
    category: "Gestión de pedidos",
    summary:
      "Convierte pedidos provenientes de diferentes canales en órdenes estructuradas listas para validar y despachar.",
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
      outcomes: {
        title: "Qué cambia en tu proceso de pedidos",
        items: [
          {
            title: "Un solo punto de entrada",
            description: "Mensajes, correos y archivos llegan a la misma bandeja.",
          },
          {
            title: "Validar en lugar de transcribir",
            description: "Tu equipo revisa una orden propuesta en vez de escribirla desde cero.",
          },
          {
            title: "Seguimiento de cada orden",
            description: "Cada pedido tiene un estado visible desde que llega hasta el despacho.",
          },
        ],
      },
      cta: {
        title: "Mira PedidoFlow B2B con tus propios pedidos",
        description: "Agenda una demostración y revisamos cómo se adapta a tu operación.",
      },
    },
  },
  {
    // Sin contenido funcional publicado hasta verificar lo que el producto hace hoy.
    slug: "cotizador",
    icon: FileText,
    name: "Cotizador Inteligente",
    status: "coming-soon",
    comingSoonPage: true,
  },
  {
    slug: "taller-ai",
    icon: Wrench,
    name: "Taller AI",
    category: "Talleres mecánicos",
    summary:
      "Asistente para talleres mecánicos: clientes, vehículos, órdenes de trabajo y apoyo al diagnóstico.",
    status: "coming-soon",
    seo: { title: "Taller AI", description: "Asistente para talleres mecánicos." },
  },
  {
    slug: "sst",
    icon: HardHat,
    name: "Gestión SST",
    category: "Seguridad y salud laboral",
    summary:
      "Gestión de seguridad y salud en el trabajo: documentos, contratistas y seguimiento del cumplimiento.",
    status: "coming-soon",
    seo: {
      title: "Gestión SST",
      description: "Gestión de seguridad y salud en el trabajo.",
    },
  },
];

export const availableProducts = products.filter(
  (p): p is AvailableProduct =>
    p.status === "available" && !!p.detail && !!p.seo && !!p.category && !!p.summary,
);

export const upcomingProducts = products.filter((p) => p.status === "coming-soon");

export function getProduct(slug: string) {
  return availableProducts.find((p) => p.slug === slug);
}

function hasPage(product: Product) {
  return product.status === "available" ? !!getProduct(product.slug) : !!product.comingSoonPage;
}

/** Productos con página en /productos/<slug>: disponibles + "Próximamente" con comingSoonPage. */
export const productsWithPage = products.filter(hasPage);

export function getProductWithPage(slug: string) {
  return productsWithPage.find((p) => p.slug === slug);
}

/** Textos de acción únicos para todo el sitio. */
export const productActions = {
  demo: "Solicitar demostración",
  info: "Solicitar información",
} as const;

export function productHref(product: Product) {
  return hasPage(product) ? `/productos/${product.slug}` : `/contacto?motivo=informacion&producto=${product.slug}`;
}

export function productDemoHref(product: Product) {
  return `/contacto?motivo=demo&producto=${product.slug}`;
}

/** Texto del enlace de cada tarjeta de producto. */
export function productCtaLabel(product: Product) {
  return hasPage(product) ? `Ver ${product.name}` : `${productActions.info} sobre ${product.name}`;
}
