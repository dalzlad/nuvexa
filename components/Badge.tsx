import { cn } from "@/lib/utils";

const tones = {
  neutral: "border-border bg-card text-muted-foreground",
  brand: "border-transparent bg-brand-soft text-brand-soft-foreground",
  progress: "border-amber-600/20 bg-amber-50 text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200",
} as const;

const dots = {
  neutral: "bg-muted-foreground/60",
  brand: "bg-primary",
  progress: "bg-amber-500",
} as const;

interface BadgeProps extends React.ComponentProps<"span"> {
  tone?: keyof typeof tones;
  /** Punto de estado a la izquierda del texto. */
  dot?: boolean;
}

/** Etiqueta compacta para categorías y estados. */
export function Badge({ tone = "neutral", dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className={cn("size-1.5 rounded-full", dots[tone])} />}
      {children}
    </span>
  );
}
