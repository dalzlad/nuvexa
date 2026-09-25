/**
 * Datos globales de la marca.
 * El dominio aún no está definido: configúralo con NEXT_PUBLIC_SITE_URL
 * (se usa en metadata, Open Graph, sitemap y robots).
 * El correo público se configura con NEXT_PUBLIC_CONTACT_EMAIL; mientras no exista
 * un correo del dominio (p. ej. contacto@<dominio>) se usa el correo provisional.
 */
export const site = {
  name: "NUVEXA",
  tagline: "Software empresarial que simplifica la operación de tu negocio.",
  title: "NUVEXA — Software empresarial",
  description:
    "Productos SaaS, automatización, integraciones e inteligencia artificial para simplificar los procesos de tu empresa.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "diegol720@gmail.com",
  copyrightYear: 2026,
} as const;
