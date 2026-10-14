import "server-only";

import { resolveSiteConfig } from "@/lib/site-config";

/**
 * Datos globales de la marca. Solo servidor.
 * El dominio (NEXT_PUBLIC_SITE_URL) y el correo de contacto (CONTACT_EMAIL)
 * son obligatorios en producción y se validan en lib/site-config.ts.
 * CONTACT_EMAIL no existe en el navegador: los componentes del cliente que necesiten
 * el correo lo reciben como prop desde un componente del servidor (p. ej. ContactForm).
 */
const config = resolveSiteConfig({
  url: process.env.NEXT_PUBLIC_SITE_URL,
  email: process.env.CONTACT_EMAIL,
});

export const site = {
  name: "NUVEXA",
  tagline: "Software empresarial que simplifica la operación de tu negocio.",
  title: "NUVEXA — Software empresarial",
  description:
    "Desarrollo de software, automatización de procesos, integración de sistemas e inteligencia artificial aplicada para simplificar la operación de tu empresa.",
  url: config.url,
  email: config.email,
  /** Idioma del contenido (atributo lang). */
  language: "es",
  /** Locale de Open Graph (idioma_PAÍS). */
  locale: "es_CO",
  copyrightYear: 2026,
} as const;
