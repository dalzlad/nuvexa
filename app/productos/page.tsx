import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceVisual } from "@/components/ServiceVisual";
import { Button } from "@/components/ui/button";
import {
  availableProducts,
  productActions,
  productCtaLabel,
  productHref,
  upcomingProducts,
} from "@/content/products";
import { pageMetadata } from "@/lib/metadata";

const hasAvailable = availableProducts.length > 0;

// Mientras no haya productos publicados, el texto describe el estado real del catálogo.
const description = hasAvailable
  ? "Cada producto resuelve un proceso operativo concreto de principio a fin. Conoce qué hace cada uno y solicita una demostración."
  : "Desarrollamos productos propios para procesos operativos concretos. Escríbenos si quieres conocerlos antes de su lanzamiento.";

export const metadata: Metadata = pageMetadata({
  title: "Productos",
  description,
  path: "/productos",
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        id="productos-titulo"
        eyebrow="Productos"
        title="Productos SaaS para la operación de tu empresa"
        description={description}
      >
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {hasAvailable && (
            <Badge tone="brand" dot>
              {availableProducts.length} {availableProducts.length === 1 ? "disponible" : "disponibles"}
            </Badge>
          )}
          {upcomingProducts.length > 0 && (
            <Badge tone="progress" dot>
              {upcomingProducts.length} en desarrollo
            </Badge>
          )}
        </div>
      </PageHeader>

      {hasAvailable && (
        <section aria-labelledby="disponibles-titulo" className="pt-16 sm:pt-24">
          <Container>
            <h2 id="disponibles-titulo" className="text-2xl font-semibold tracking-tight text-foreground">
              Disponibles
            </h2>
            <div className="reveal-stagger mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
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
            </div>
          </Container>
        </section>
      )}

      {upcomingProducts.length > 0 && (
        <section aria-labelledby="proximamente-titulo" className="pt-16 sm:pt-24">
          <Container>
            <SectionTitle
              id="proximamente-titulo"
              eyebrow="Próximamente"
              title="Productos en desarrollo"
              description="Escríbenos si quieres conocerlos antes de su lanzamiento."
            />
            <ul className="reveal mt-10 divide-y overflow-hidden rounded-3xl border bg-card shadow-surface">
              {upcomingProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <li
                    key={product.slug}
                    className="group relative grid gap-5 p-6 transition-colors hover:bg-muted/50 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:p-8"
                  >
                    <span
                      className="flex size-12 items-center justify-center rounded-2xl border bg-muted text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                          {product.name}
                        </h3>
                        <Badge tone="progress" dot>
                          Próximamente
                        </Badge>
                      </div>
                      {product.category && <p className="mt-1 text-sm font-medium text-primary">{product.category}</p>}
                      {product.summary && (
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {product.summary}
                        </p>
                      )}
                    </div>
                    <Link
                      href={productHref(product)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary after:absolute after:inset-0 sm:justify-self-end"
                    >
                      {productCtaLabel(product)}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="a-medida-titulo" className="pt-16 sm:pt-24">
        <Container>
          <div className="relative isolate grid overflow-hidden rounded-3xl border border-primary/20 bg-brand-soft/60 lg:grid-cols-[1.1fr_1fr]">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-dots [--grid-color:oklch(0.49_0.2_272/0.14)]"
            />
            <div className="p-6 sm:p-10 lg:p-12">
              <Badge tone="brand">A medida</Badge>
              <h2
                id="a-medida-titulo"
                className="mt-5 text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
              >
                ¿Necesitas una solución diferente?
              </h2>
              <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                Diseñamos software para procesos empresariales específicos.
              </p>
              <Button asChild size="xl" variant="outline" className="mt-8">
                <Link href="/servicios#desarrollo-a-medida">
                  Ver desarrollo a medida
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center border-t border-primary/15 bg-card/60 p-6 sm:p-10 lg:border-t-0 lg:border-l">
              <ServiceVisual id="desarrollo-a-medida" className="mx-auto max-w-sm" />
            </div>
          </div>
        </Container>
      </section>

      {hasAvailable ? (
        <CTASection
          title="Mira nuestros productos en funcionamiento"
          description="Agenda una demostración y revisamos cómo se aplica cada producto a tu operación."
          primary={{ label: productActions.demo, href: "/contacto?motivo=demo" }}
        />
      ) : (
        <CTASection
          title="¿Quieres conocer un producto antes de su lanzamiento?"
          description="Cuéntanos qué proceso quieres resolver y revisamos si conviene un producto o una solución a medida."
          primary={{ label: productActions.info, href: "/contacto" }}
          secondary={{ label: "Ver servicios", href: "/servicios" }}
        />
      )}
    </>
  );
}
