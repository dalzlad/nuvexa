import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronRight, ShieldCheck } from "lucide-react";

import { Backdrop } from "@/components/Backdrop";
import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { ProcessFlow } from "@/components/ProcessFlow";
import { SectionTitle, headingStyles } from "@/components/SectionTitle";
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
          <Link href="/productos" className="transition-colors hover:text-foreground">
            Productos
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5" />
        </li>
        <li aria-current="page" className="font-medium text-foreground">
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
      <section aria-labelledby="producto-titulo" className="relative isolate overflow-hidden">
        <Backdrop />
        <Container className="grid gap-14 py-12 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:py-28">
          <div className="animate-fade-up">
            <ProductBreadcrumb name={product.name} />
            <div className="mt-10 flex items-center gap-3">
              <span
                className="flex size-12 items-center justify-center rounded-2xl border bg-card text-primary shadow-surface"
                aria-hidden="true"
              >
                <Icon className="size-5" />
              </span>
              <Badge tone="progress" dot>
                Próximamente
              </Badge>
            </div>
            <h1
              id="producto-titulo"
              className={cn("mt-6 max-w-3xl font-semibold tracking-[-0.03em] text-foreground", headingStyles.h1)}
            >
              {product.name}
            </h1>
            {product.category && <p className="mt-4 text-lg font-medium text-primary">{product.category}</p>}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {product.summary ??
                "Este producto está en desarrollo. Publicaremos aquí su descripción cuando esté disponible."}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href={`/contacto?motivo=informacion&producto=${product.slug}`}>
                  {productActions.info}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/productos">
                  <ArrowLeft data-icon="inline-start" aria-hidden="true" />
                  Ver otros productos
                </Link>
              </Button>
            </div>
          </div>

          {/* Plano en construcción: decorativo, sin pantallas ni funciones del producto. */}
          <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative isolate overflow-hidden rounded-3xl border border-dashed border-primary/30 bg-card/70 p-6 shadow-surface backdrop-blur sm:p-8">
              <div className="absolute inset-0 -z-10 bg-grid [--grid-color:oklch(0.49_0.2_272/0.08)] [background-size:24px_24px]" />
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-xl bg-primary/15" />
                <span className="h-2.5 w-28 rounded-full bg-foreground/10" />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <span className="col-span-2 h-24 rounded-2xl border border-dashed border-primary/25 bg-brand-soft/50" />
                <span className="h-24 rounded-2xl border border-dashed" />
                <span className="h-16 rounded-2xl border border-dashed" />
                <span className="col-span-2 h-16 rounded-2xl border border-dashed" />
              </div>
              <div className="mt-6 space-y-2.5">
                <span className="block h-2 w-full rounded-full bg-foreground/8" />
                <span className="block h-2 w-4/5 rounded-full bg-foreground/8" />
                <span className="block h-2 w-3/5 rounded-full bg-foreground/8" />
              </div>
              <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                En desarrollo
              </p>
            </div>
          </div>
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
      <section aria-labelledby="producto-titulo" className="relative isolate overflow-hidden border-b">
        <Backdrop />
        <Container className="py-12 sm:py-20 lg:py-24">
          <ProductBreadcrumb name={product.name} />

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-surface"
              aria-hidden="true"
            >
              <Icon className="size-5" />
            </span>
            <span className="text-sm font-semibold text-foreground">{product.name}</span>
            <Badge tone="brand">{product.category}</Badge>
          </div>

          <h1
            id="producto-titulo"
            className={cn("mt-6 max-w-3xl font-semibold tracking-[-0.03em] text-foreground", headingStyles.h1)}
          >
            {detail.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{detail.intro}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
      <section aria-labelledby="problema-titulo" className="py-20 sm:py-28">
        <Container>
          <SectionTitle
            id="problema-titulo"
            eyebrow="El problema"
            title={detail.problem.title}
            description={detail.problem.description}
          />
          <ul
            className={cn(
              "mt-12 grid gap-4 sm:grid-cols-2",
              detail.problem.points.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4",
            )}
          >
            {detail.problem.points.map((point, index) => (
              <li key={point.title} className="rounded-2xl border bg-card p-6">
                <span className="font-mono text-xs text-muted-foreground tabular-nums" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-semibold tracking-tight text-foreground">{point.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Flujo */}
      <section id="como-funciona" aria-labelledby="flujo-titulo" className="border-y bg-muted/60 py-20 sm:py-28">
        <Container>
          <SectionTitle
            id="flujo-titulo"
            eyebrow="Cómo funciona"
            title={detail.flow.title}
            description={detail.flow.description}
          />
          <div className="mt-12 rounded-3xl border bg-card p-6 shadow-surface sm:p-10">
            <ProcessFlow steps={detail.flow.steps} layout="horizontal" label={`Flujo de ${product.name}`} />
          </div>

          {detail.highlight && (
            <div className="mt-6 flex gap-4 rounded-2xl border border-primary/20 bg-brand-soft/60 p-5 sm:p-6">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="leading-relaxed text-foreground">{detail.highlight}</p>
            </div>
          )}
        </Container>
      </section>

      {/* Canales y capacidades */}
      {(detail.tags || detail.features) && (
        <section aria-labelledby="incluye-titulo" className="py-20 sm:py-28">
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
                    <li key={tag} className="rounded-full border bg-card px-3.5 py-1.5 text-sm text-foreground shadow-xs">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detail.features && (
              <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {detail.features.items.map((feature) => (
                  <li key={feature.title} className="flex gap-3 bg-card p-6 sm:p-7">
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold tracking-tight text-foreground">{feature.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
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
        <section aria-labelledby="resultado-titulo" className="border-t py-20 sm:py-28">
          <Container>
            <SectionTitle
              id="resultado-titulo"
              eyebrow="Resultado"
              title={detail.outcomes.title}
              description={detail.outcomes.description}
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detail.outcomes.items.map((item) => (
                <li key={item.title} className="border-l-2 border-primary py-1 pl-5">
                  <h3 className="font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
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
