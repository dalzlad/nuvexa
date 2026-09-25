/**
 * Datos globales de la marca.
 * El dominio aún no está definido: configúralo con NEXT_PUBLIC_SITE_URL
 * (se usa en metadata, Open Graph, sitemap y robots).
 */
export const site = {
  name: "NUVEXA",
  tagline: "Software empresarial que simplifica la operación de tu negocio.",
  title: "NUVEXA — Software empresarial",
  description:
    "Software SaaS, automatización e inteligencia artificial para simplificar procesos empresariales.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: "diegol720@gmail.com",
  copyrightYear: 2026,
} as const;
