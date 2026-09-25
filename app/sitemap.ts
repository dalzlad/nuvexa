import type { MetadataRoute } from "next";

import { staticRoutes } from "@/content/navigation";
import { availableProducts } from "@/content/products";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...availableProducts.map((p) => `/productos/${p.slug}`)];

  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route.startsWith("/productos") ? 0.8 : 0.6,
  }));
}
