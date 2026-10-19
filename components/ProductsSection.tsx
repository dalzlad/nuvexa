import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { availableProducts, productHref, upcomingProducts } from "@/content/products";

/**
 * Productos en la portada: una franja compacta con el estado real de cada producto.
 * Los productos ocultos (`hidden`) no aparecen.
 */
export function ProductsSection() {
  const products = [...availableProducts, ...upcomingProducts];
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="productos-titulo" className="py-20 sm:py-28">
      <Container>
        <div className="reveal grid gap-10 rounded-3xl border bg-card p-6 shadow-surface sm:p-10 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-14 lg:p-12">
          <div>
            <p className="eyebrow flex items-center gap-2.5">
              <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
              Productos
            </p>
            <h2
              id="productos-titulo"
              className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground sm:text-[2rem]"
            >
              Software para procesos que se repiten cada día
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Además de los proyectos a medida, desarrollamos productos SaaS propios para procesos operativos
              concretos.
            </p>
            <Link
              href="/productos"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Ver catálogo de productos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="divide-y overflow-hidden rounded-2xl border bg-background">
            {products.map((product) => {
              const Icon = product.icon;
              const available = product.status === "available";
              return (
                <li key={product.slug} className="group relative flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/70 sm:px-5">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-card text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  >
                    <Icon className="size-[1.125rem]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={productHref(product)}
                      className="font-medium text-foreground after:absolute after:inset-0"
                    >
                      {product.name}
                    </Link>
                    {product.category && (
                      <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{product.category}</p>
                    )}
                    {/* En pantallas estrechas el estado va bajo el nombre: a la derecha no cabe. */}
                    <Badge tone={available ? "brand" : "progress"} dot className="mt-2 flex w-fit sm:hidden">
                      {available ? "Disponible" : "Próximamente"}
                    </Badge>
                  </div>
                  <Badge tone={available ? "brand" : "progress"} dot className="hidden sm:inline-flex">
                    {available ? "Disponible" : "Próximamente"}
                  </Badge>
                  <ChevronRight
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
