import type { NextConfig } from "next";

import { hiddenProductSlugs } from "./content/product-visibility";

// SITE_URL y CONTACT_EMAIL se validan en lib/site-config.ts:
// el build de producción falla si faltan o no son válidas. No se valida aquí porque
// `next typegen` (npm run typecheck) también carga este archivo y debe funcionar sin ellas.
const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Los productos ocultos redirigen al catálogo en lugar de responder 404, para no romper
  // enlaces existentes. Temporal (307): se elimina sola al publicar el producto.
  redirects() {
    return hiddenProductSlugs.map((slug) => ({
      source: `/productos/${slug}`,
      destination: "/productos",
      permanent: false,
    }));
  },
};

export default nextConfig;
