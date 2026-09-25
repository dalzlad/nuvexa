import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProductCardProps {
  category: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  icon: LucideIcon;
  /** "product": producto disponible · "custom": desarrollo a medida · "upcoming": próximamente */
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
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl border p-6 transition-colors sm:p-7",
        variant === "product" && "bg-card hover:border-primary/40",
        variant === "custom" && "border-dashed bg-muted/50 hover:border-primary/40",
        variant === "upcoming" && "bg-muted/40",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            variant === "upcoming" ? "bg-background text-muted-foreground" : "bg-brand-soft text-brand-soft-foreground",
          )}
          aria-hidden="true"
        >
          <Icon className="size-5" />
        </span>
        <span
          className={cn(
            "rounded-full border px-2.5 py-0.5 text-xs font-medium",
            variant === "upcoming" ? "bg-background text-muted-foreground" : "text-foreground",
          )}
        >
          {category}
        </span>
      </div>

      <Heading className="mt-6 text-lg font-semibold tracking-tight text-foreground">{title}</Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <Link
        href={href}
        className={cn(
          "mt-6 inline-flex items-center gap-1.5 text-sm font-medium after:absolute after:inset-0 after:rounded-xl",
          variant === "upcoming" ? "text-foreground" : "text-primary",
        )}
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
