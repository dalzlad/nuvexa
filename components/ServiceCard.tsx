import Link from "next/link";

import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  /** "compact": resumen enlazado (portada) · "detailed": fila completa con ejemplos (/servicios) */
  variant?: "compact" | "detailed";
  headingLevel?: "h2" | "h3";
  className?: string;
}

export function ServiceCard({ service, variant = "compact", headingLevel: Heading = "h3", className }: ServiceCardProps) {
  const Icon = service.icon;

  if (variant === "detailed") {
    return (
      <article
        id={service.id}
        className={cn("grid scroll-mt-24 gap-6 py-10 md:grid-cols-[1fr_1.1fr] md:gap-12", className)}
      >
        <div className="flex gap-4">
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-soft-foreground"
            aria-hidden="true"
          >
            <Icon className="size-5" />
          </span>
          <div>
            <Heading className="text-xl font-semibold tracking-tight text-foreground">{service.title}</Heading>
            <p className="mt-2 leading-relaxed text-muted-foreground">{service.problem}</p>
            <p className="mt-3 leading-relaxed text-foreground">{service.solution}</p>
          </div>
        </div>
        <div className="md:pt-1">
          <p className="text-sm font-medium text-muted-foreground">Ejemplos de aplicación</p>
          <ul className="mt-3 flex flex-wrap content-start gap-2" aria-label={`Ejemplos de ${service.title}`}>
            {service.examples.map((example) => (
              <li key={example} className="rounded-full border bg-background px-3 py-1.5 text-sm text-foreground">
                {example}
              </li>
            ))}
          </ul>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group relative rounded-xl border bg-card p-6 transition-colors hover:border-primary/40", className)}>
      <Icon className="size-5 text-primary" aria-hidden="true" />
      <Heading className="mt-4 font-semibold text-foreground">
        <Link href={`/servicios#${service.id}`} className="after:absolute after:inset-0 after:rounded-xl">
          {service.title}
        </Link>
      </Heading>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
    </article>
  );
}
