import type { Metadata } from "next";

import { site } from "@/content/site";

interface PageMetadataInput {
  /** Título corto de la página; se completa con " | NUVEXA". Omitir en la portada. */
  title?: string;
  description: string;
  path: string;
}

// Next no hereda app/opengraph-image en páginas que definen su propio openGraph,
// por eso la imagen se declara explícitamente.
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: site.title };

/** Metadata consistente por página: title, description, canonical y Open Graph. */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.title;
  return {
    title: title ?? { absolute: site.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
  };
}
