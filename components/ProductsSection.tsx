import { Blocks } from "lucide-react";

import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { availableProducts, productCtaLabel, productHref, upcomingProducts } from "@/content/products";

export const customSolutionCard = {
  category: "A medida",
  title: "¿Necesitas una solución diferente?",
  description: "Diseñamos software para procesos empresariales específicos.",
  href: "/servicios#desarrollo-a-medida",
  ctaLabel: "Ver desarrollo a medida",
  icon: Blocks,
} as const;

/** Productos en la portada: disponibles + tarjeta de desarrollo a medida. */
export function ProductsSection() {
  return (
    <section aria-labelledby="productos-titulo" className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          id="productos-titulo"
          eyebrow="Productos"
          title="Software para procesos que se repiten cada día"
          description="Productos propios que resuelven tareas operativas concretas, como la recepción y gestión de pedidos."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {availableProducts.map((product) => (
            <ProductCard
              key={product.slug}
              category={product.category}
              title={product.name}
              description={product.summary}
              href={productHref(product)}
              ctaLabel={productCtaLabel(product)}
              icon={product.icon}
            />
          ))}
          <ProductCard {...customSolutionCard} variant="custom" className="md:col-span-2 lg:col-span-1" />
        </div>

        {upcomingProducts.length > 0 && (
          <p className="mt-8 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Próximamente:</span>{" "}
            {upcomingProducts.map((p) => p.name).join(" · ")}
          </p>
        )}
      </Container>
    </section>
  );
}
