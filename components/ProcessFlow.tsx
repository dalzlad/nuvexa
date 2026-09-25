import type { FlowStep } from "@/content/products";
import { cn } from "@/lib/utils";

interface ProcessFlowProps {
  steps: (Pick<FlowStep, "title"> & Partial<Pick<FlowStep, "description">>)[];
  /** "horizontal": vertical en móvil y horizontal desde lg. */
  layout?: "vertical" | "horizontal";
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
export function ProcessFlow({ steps, layout = "vertical", label, className }: ProcessFlowProps) {
  const horizontal = layout === "horizontal";

  return (
    <ol aria-label={label} className={cn("grid", horizontal && ["lg:gap-4", horizontalCols[steps.length]], className)}>
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li key={step.title} className={cn("relative flex gap-4 pb-8 last:pb-0", horizontal && "lg:flex-col lg:pb-0")}>
            {/* Conector */}
            {!last && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-9 bottom-1 left-4 w-px bg-border",
                  horizontal && "lg:top-4 lg:right-[-1rem] lg:bottom-auto lg:left-11 lg:h-px lg:w-auto",
                )}
              />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums",
                last ? "border-primary bg-primary text-primary-foreground" : "bg-background text-foreground",
              )}
            >
              {index + 1}
            </span>
            <div className="min-w-0 pt-1 lg:pt-0">
              <p className="font-medium text-foreground">{step.title}</p>
              {step.description && (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
