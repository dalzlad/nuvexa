import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { ServiceVisual } from "@/components/ServiceVisual";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  /** Posición del servicio (1, 2…) para la numeración visual. */
  index: number;
  /** "compact": tarjeta enlazada (portada) · "detailed": bloque completo con ejemplos (/servicios) */
  variant?: "compact" | "detailed";
  /** "wide": tarjeta compacta a doble ancho, con la ilustración al lado. */
  size?: "default" | "wide";
  /** Solo "detailed": invierte texto e ilustración en escritorio. */
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
}

const number = (index: number) => String(index).padStart(2, "0");

export function ServiceCard({
  service,
  index,
  variant = "compact",
  size = "default",
  reverse = false,
  headingLevel: Heading = "h3",
  className,
}: ServiceCardProps) {
  const Icon = service.icon;

  if (variant === "detailed") {
    return (
      <article
        id={service.id}
        aria-labelledby={`${service.id}-titulo`}
        className={cn("grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16", className)}
      >
        <div className={cn(reverse && "lg:order-2")}>
          <div className="flex items-center gap-3">
            <span
              className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand-soft-foreground"
              aria-hidden="true"
            >
              <Icon className="size-5" />
            </span>
            <span className="font-mono text-xs tracking-[0.14em] text-muted-foreground">{number(index)}</span>
          </div>
          <Heading
            id={`${service.id}-titulo`}
            className="mt-6 text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
          >
            {service.title}
          </Heading>

          <dl className="mt-6 grid gap-6">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">El problema</dt>
              <dd className="mt-1.5 leading-relaxed text-muted-foreground">{service.problem}</dd>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <dt className="text-sm font-medium text-primary">Qué construimos</dt>
              <dd className="mt-1.5 leading-relaxed text-foreground">{service.solution}</dd>
            </div>
          </dl>

          <p className="mt-8 text-sm font-medium text-foreground">Ejemplos de aplicación</p>
          <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2" aria-label={`Ejemplos de ${service.title}`}>
            {service.examples.map((example) => (
              <li key={example} className="flex gap-2.5 text-sm leading-snug text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {example}
              </li>
            ))}
          </ul>

          <Link
            href={`/contacto?motivo=${service.id}`}
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            Conversemos sobre {service.title.toLowerCase()}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div
          className={cn(
            "relative isolate overflow-hidden rounded-3xl border bg-muted/70 p-6 sm:p-10",
            reverse && "lg:order-1",
          )}
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots opacity-80" />
          <div
            aria-hidden="true"
            className="absolute -right-20 -bottom-24 -z-10 size-72 rounded-full bg-[radial-gradient(closest-side,oklch(0.49_0.2_272/0.12),transparent)]"
          />
          <ServiceVisual id={service.id} className="mx-auto max-w-md" />
        </div>
      </article>
    );
  }

  const wide = size === "wide";

  return (
    <article
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-surface",
        wide && "md:flex-row",
        className,
      )}
    >
      <div
        className={cn(
          "relative border-b bg-muted/60 px-6 pt-6 pb-4",
          wide && "md:order-2 md:flex md:w-[52%] md:items-center md:border-b-0 md:border-l md:p-8",
        )}
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots opacity-70" />
        <ServiceVisual
          id={service.id}
          className={cn(
            "mx-auto max-h-36 transition-transform duration-500 group-hover:scale-[1.03]",
            wide && "md:max-h-none",
          )}
        />
      </div>

      <div className={cn("flex flex-1 flex-col p-6", wide && "md:justify-center md:p-8")}>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs tracking-[0.14em] text-muted-foreground">{number(index)}</span>
          <ArrowUpRight
            className="size-4 text-muted-foreground transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
            aria-hidden="true"
          />
        </div>
        <Heading className={cn("mt-3 font-semibold tracking-tight text-foreground", wide ? "text-xl sm:text-2xl" : "text-lg")}>
          <Link href={`/servicios#${service.id}`} className="after:absolute after:inset-0 after:rounded-2xl">
            {service.title}
          </Link>
        </Heading>
        <p className={cn("mt-2 leading-relaxed text-muted-foreground", wide ? "text-base" : "text-sm")}>
          {wide ? service.solution : service.description}
        </p>
      </div>
    </article>
  );
}
