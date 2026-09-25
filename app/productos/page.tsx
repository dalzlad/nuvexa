import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { ProductCard } from "@/components/ProductCard";
import { customSolutionCard } from "@/components/ProductsSection";
import { SectionTitle } from "@/components/SectionTitle";
import {
  availableProducts,
  productActions,
  productCtaLabel,
  productHref,
  upcomingProducts,
} from "@/content/products";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Cada producto resuelve un proceso operativo concreto de principio a fin. Conoce qué hace cada uno y solicita una demostración.";

export const metadata: Metadata = pageMetadata({
  title: "Productos",
  description,
  path: "/productos",
});

export default function ProductsPage() {
  return (
    <>
      <Container className="pt-16 pb-4 sm:pt-24">
        <SectionTitle
          as="h1"
          eyebrow="Productos"
          title="Productos SaaS para la operación de tu empresa"
          description={description}
        />
      </Container>

      <section aria-label="Productos disponibles" className="py-12">
        <Container className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {availableProducts.map((product) => (
            <ProductCard
              key={product.slug}
              headingLevel="h2"
              category={product.category}
              title={product.name}
              description={product.summary}
              href={productHref(product)}
              ctaLabel={productCtaLabel(product)}
              icon={product.icon}
            />
          ))}
          <ProductCard
            {...customSolutionCard}
            headingLevel="h2"
            variant="custom"
            className="md:col-span-2 lg:col-span-1"
          />
        </Container>
      </section>

      {upcomingProducts.length > 0 && (
        <section aria-labelledby="proximamente-titulo" className="py-12">
          <Container>
            <h2 id="proximamente-titulo" className="text-xl font-semibold tracking-tight text-foreground">
              Próximamente
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Productos en desarrollo. Escríbenos si quieres conocerlos antes de su lanzamiento.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {upcomingProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  variant="upcoming"
                  category={product.category}
                  title={product.name}
                  description={product.summary}
                  href={productHref(product)}
                  ctaLabel={productCtaLabel(product)}
                  icon={product.icon}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        title="Mira nuestros productos en funcionamiento"
        description="Agenda una demostración y revisamos cómo se aplica cada producto a tu operación."
        primary={{ label: productActions.demo, href: "/contacto?motivo=demo" }}
      />
    </>
  );
}
