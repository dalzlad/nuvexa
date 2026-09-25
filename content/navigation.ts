import { availableProducts } from "./products";
import { services } from "./services";

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Navegación principal.
 * Rutas futuras (/pricing, /blog, /soporte, /login) se agregan aquí
 * cuando existan; el sitemap también se genera a partir de estas rutas.
 */
export const mainNav: NavLink[] = [
  { label: "Productos", href: "/productos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Empresa", href: "/empresa" },
];

export const contactLink: NavLink = { label: "Contactar", href: "/contacto" };

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Productos",
    links: availableProducts.map((p) => ({
      label: p.name,
      href: `/productos/${p.slug}`,
    })),
  },
  {
    title: "Servicios",
    links: services
      .filter((s) => s.showInFooter)
      .map((s) => ({ label: s.shortTitle, href: `/servicios#${s.id}` })),
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre NUVEXA", href: "/empresa" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];

/** Páginas estáticas del sitio (usadas por el sitemap). */
export const staticRoutes = ["/", "/productos", "/servicios", "/empresa", "/contacto"];
