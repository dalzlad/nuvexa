import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  category?: string;
  title: string;
  description?: string;
  href: string;
  ctaLabel: string;
  icon: LucideIcon;
  /** "product": producto disponible · "custom": desarrollo a medida · "upcoming": en desarrollo */
  variant?: "product" | "custom" | "upcoming";
  headingLevel?: "h2" | "h3";
  className?: string;
}

export function ProductCard({
  category,
  title,
  description,
  href,
  ctaLabel,
  icon: Icon,
  variant = "product",
  headingLevel: Heading = "h3",
  className,
}: ProductCardProps) {
  const upcoming = variant === "upcoming";
  const custom = variant === "custom";

  return (
    <article
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-2xl border p-6 transition-[border-color,box-shadow] duration-300 sm:p-7",
        custom ? "border-primary/20 bg-brand-soft/60" : "bg-card",
        "hover:border-primary/35 hover:shadow-surface",
        className,
      )}
    >
      {custom && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-dots [--grid-color:oklch(0.49_0.2_272/0.15)] mask-[linear-gradient(to_bottom_left,black,transparent_60%)]"
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            upcoming ? "border bg-muted text-muted-foreground" : "bg-primary text-primary-foreground shadow-surface",
          )}
          aria-hidden="true"
        >
          <Icon className="size-5" />
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {upcoming && (
            <Badge tone="progress" dot>
              Próximamente
            </Badge>
          )}
          {category && <Badge tone={upcoming ? "neutral" : "brand"}>{category}</Badge>}
        </div>
      </div>

      <Heading className="mt-7 text-lg font-semibold tracking-tight text-foreground sm:text-xl">{title}</Heading>
      {description ? (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : (
        <div className="flex-1" />
      )}

      <Link
        href={href}
        className="mt-7 inline-flex items-center gap-1.5 border-t pt-5 text-sm font-medium text-primary after:absolute after:inset-0 after:rounded-2xl"
      >
        {ctaLabel}
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
