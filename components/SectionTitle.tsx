import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** h1 solo para el título principal de una página. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  id?: string;
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  id,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p>}
      <Heading
        id={id}
        className={cn(
          "font-semibold tracking-tight text-foreground",
          Heading === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}
