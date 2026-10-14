import { resolveSiteConfig } from "@/lib/site-config";

/**
 * Datos globales de la marca.
 * El dominio (NEXT_PUBLIC_SITE_URL) y el correo público (NEXT_PUBLIC_CONTACT_EMAIL)
 * son obligatorios en producción y se validan en lib/site-config.ts.
 * Las variables se leen de forma literal para que Next las incluya también en el cliente.
 */
const config = resolveSiteConfig({
  url: process.env.NEXT_PUBLIC_SITE_URL,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
});

export const site = {
  name: "NUVEXA",
  tagline: "Software empresarial que simplifica la operación de tu negocio.",
  title: "NUVEXA — Software empresarial",
  description:
    "Productos SaaS, automatización, integraciones e inteligencia artificial para simplificar los procesos de tu empresa.",
  url: config.url,
  email: config.email,
  /** Idioma del contenido (atributo lang). */
  language: "es",
  /** Locale de Open Graph (idioma_PAÍS). */
  locale: "es_CO",
  copyrightYear: 2026,
} as const;
