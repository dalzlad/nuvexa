import type { FlowStep } from "@/content/products";
import { cn } from "@/lib/utils";

interface ProcessFlowProps {
  steps: (Pick<FlowStep, "title"> & Partial<Pick<FlowStep, "description">>)[];
  /** "horizontal": vertical en móvil y horizontal desde lg. */
  layout?: "vertical" | "horizontal";
  /** "dark": sobre superficies oscuras (bg-ink). */
  tone?: "light" | "dark";
  label: string;
  className?: string;
}

const horizontalCols: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

/** Flujo de pasos numerados. El último paso se destaca como resultado. */
export function ProcessFlow({ steps, layout = "vertical", tone = "light", label, className }: ProcessFlowProps) {
  const horizontal = layout === "horizontal";
  const dark = tone === "dark";

  return (
    <ol aria-label={label} className={cn("grid", horizontal && ["lg:gap-6", horizontalCols[steps.length]], className)}>
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li
            key={step.title}
            className={cn("relative flex gap-5 pb-9 last:pb-0", horizontal && "lg:flex-col lg:gap-5 lg:pb-0")}
          >
            {/* Conector */}
            {!last && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-11 bottom-2 left-[1.1875rem] w-px",
                  dark
                    ? "bg-linear-to-b from-white/25 to-white/5"
                    : "bg-linear-to-b from-primary/40 to-border",
                  horizontal &&
                    "lg:top-5 lg:right-[-1.5rem] lg:bottom-auto lg:left-14 lg:h-px lg:w-auto lg:bg-linear-to-r",
                )}
              />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border font-mono text-xs font-medium tabular-nums",
                last
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--primary)]"
                  : dark
                    ? "border-ink-border bg-white/5 text-ink-foreground"
                    : "bg-card text-foreground shadow-xs",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 pt-2 lg:pt-0">
              <p className={cn("font-semibold tracking-tight", dark ? "text-ink-foreground" : "text-foreground")}>
                {step.title}
              </p>
              {step.description && (
                <p className={cn("mt-1.5 text-sm leading-relaxed", dark ? "text-ink-muted" : "text-muted-foreground")}>
                  {step.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
