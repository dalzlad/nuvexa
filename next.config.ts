import type { NextConfig } from "next";

// NEXT_PUBLIC_SITE_URL y NEXT_PUBLIC_CONTACT_EMAIL se validan en lib/site-config.ts:
// el build de producción falla si faltan o no son válidas. No se valida aquí porque
// `next typegen` (npm run typecheck) también carga este archivo y debe funcionar sin ellas.
const nextConfig: NextConfig = {
  poweredByHeader: false,
};

export default nextConfig;
