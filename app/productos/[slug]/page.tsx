import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, ShieldCheck } from "lucide-react";

import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { ProcessFlow } from "@/components/ProcessFlow";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  getProduct,
  getProductWithPage,
  productActions,
  productDemoHref,
  productsWithPage,
  type Product,
} from "@/content/products";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";

// Solo se generan los productos con página; cualquier otro slug devuelve 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return productsWithPage.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/productos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductWithPage(slug);
  if (!product) return {};

  const available = getProduct(slug);
  return pageMetadata({
    title: available?.seo.title ?? product.name,
    description: available?.seo.description ?? `${product.name}. Próximamente.`,
    path: `/productos/${product.slug}`,
  });
}

function ProductBreadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/productos" className="hover:text-foreground">
            Productos
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5" />
        </li>
        <li aria-current="page" className="text-foreground">
          {name}
        </li>
      </ol>
    </nav>
  );
}

/** Producto "Próximamente": solo nombre y estado, sin afirmaciones sobre funcionalidades. */
function ComingSoonProduct({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <section aria-labelledby="producto-titulo">
      <Container className="py-14 sm:py-20">
        <ProductBreadcrumb name={product.name} />
        <span
          className="mt-10 flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground"
          aria-hidden="true"
        >
          <Icon className="size-5" />
        </span>
        <h1
          id="producto-titulo"
          className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        >
          {product.name}
        </h1>
        <p className="mt-5 inline-flex rounded-full border px-3 py-1 text-sm font-medium text-muted-foreground">
          Próximamente
        </p>
      </Container>
    </section>
  );
}

export default async function ProductPage({ params }: PageProps<"/productos/[slug]">) {
  const { slug } = await params;
  const pageProduct = getProductWithPage(slug);
  if (!pageProduct) notFound();

  const product = getProduct(slug);
  if (!product) return <ComingSoonProduct product={pageProduct} />;

  const { detail } = product;
  const demoHref = productDemoHref(product);
  const Icon = product.icon;

  return (
    <>
      {/* Encabezado del producto */}
      <section aria-labelledby="producto-titulo" className="border-b">
        <Container className="py-14 sm:py-20">
          <ProductBreadcrumb name={product.name} />

          <div className="mt-10 flex items-center gap-3">
            <span
              className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand-soft-foreground"
              aria-hidden="true"
            >
              <Icon className="size-5" />
            </span>
            <span className="text-sm font-medium text-foreground">{product.name}</span>
            <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {product.category}
            </span>
          </div>

          <h1
            id="producto-titulo"
            className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
          >
            {detail.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {detail.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href={demoHref}>
                {productActions.demo}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="#como-funciona">Ver cómo funciona</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Problema */}
      <section aria-labelledby="problema-titulo" className="py-20 sm:py-24">
        <Container>
          <SectionTitle
            id="problema-titulo"
            eyebrow="El problema"
            title={detail.problem.title}
            description={detail.problem.description}
          />
          <ul
            className={cn(
              "mt-10 grid gap-4 sm:grid-cols-2",
              detail.problem.points.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4",
            )}
          >
            {detail.problem.points.map((point) => (
              <li key={point.title} className="border-l-2 border-primary/30 py-1 pl-4">
                <p className="font-medium text-foreground">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Flujo */}
      <section id="como-funciona" aria-labelledby="flujo-titulo" className="border-y bg-muted/50 py-20 sm:py-24">
        <Container>
          <SectionTitle
            id="flujo-titulo"
            eyebrow="Cómo funciona"
            title={detail.flow.title}
            description={detail.flow.description}
          />
          <ProcessFlow
            steps={detail.flow.steps}
            layout="horizontal"
            label={`Flujo de ${product.name}`}
            className="mt-12"
          />

          {detail.highlight && (
            <div className="mt-14 flex gap-4 rounded-xl border bg-background p-5 sm:p-6">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="leading-relaxed text-foreground">{detail.highlight}</p>
            </div>
          )}
        </Container>
      </section>

      {/* Canales y capacidades */}
      {(detail.tags || detail.features) && (
        <section aria-labelledby="incluye-titulo" className="py-20 sm:py-24">
          <Container>
            <SectionTitle
              id="incluye-titulo"
              eyebrow="Producto"
              title={detail.features?.title ?? detail.tags!.title}
              description={detail.features?.description}
            />

            {detail.tags && (
              <div className="mt-10">
                <h3 className="text-sm font-medium text-muted-foreground">{detail.tags.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {detail.tags.items.map((tag) => (
                    <li key={tag} className="rounded-full border bg-background px-3 py-1.5 text-sm text-foreground">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detail.features && (
              <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {detail.features.items.map((feature) => (
                  <li key={feature.title} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </section>
      )}

      {/* Resultado esperado */}
      {detail.outcomes && (
        <section aria-labelledby="resultado-titulo" className="border-t py-20 sm:py-24">
          <Container>
            <SectionTitle
              id="resultado-titulo"
              eyebrow="Resultado"
              title={detail.outcomes.title}
              description={detail.outcomes.description}
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detail.outcomes.items.map((item) => (
                <li key={item.title} className="border-l-2 border-primary/30 py-1 pl-4">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CTASection
        title={detail.cta.title}
        description={detail.cta.description}
        primary={{ label: productActions.demo, href: demoHref }}
        secondary={{ label: "Ver otros productos", href: "/productos" }}
      />
    </>
  );
}
