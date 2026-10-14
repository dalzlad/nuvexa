import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** h1 solo para el título principal de una página. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  /** "dark": sobre superficies oscuras (bg-ink). */
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}

/** Escala tipográfica de títulos compartida por todo el sitio. */
export const headingStyles = {
  h1: "text-[2.25rem] leading-[1.08] sm:text-5xl sm:leading-[1.05] lg:text-[3.5rem]",
  h2: "text-[1.75rem] leading-[1.15] sm:text-4xl sm:leading-[1.1]",
} as const;

export function SectionTitle({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  tone = "light",
  id,
  className,
}: SectionTitleProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-4 flex items-center gap-2.5",
            align === "center" && "justify-center",
            dark && "text-brand-sky",
          )}
        >
          <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "font-semibold tracking-[-0.025em]",
          dark ? "text-ink-foreground" : "text-foreground",
          headingStyles[Heading],
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
