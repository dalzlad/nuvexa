import { cn } from "@/lib/utils";

/**
 * Fondo decorativo compartido: retícula técnica que se desvanece y dos halos de luz.
 * Se coloca dentro de un contenedor `relative isolate overflow-hidden`.
 */
export function Backdrop({ className, variant = "default" }: { className?: string; variant?: "default" | "center" }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-grid opacity-70",
          variant === "center"
            ? "mask-[radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent_75%)]"
            : "mask-[radial-gradient(ellipse_75%_75%_at_75%_0%,black,transparent_75%)]",
        )}
      />
      <div className="absolute -top-48 right-[-15%] h-[30rem] w-[44rem] max-w-none rounded-full bg-[radial-gradient(closest-side,oklch(0.49_0.2_272/0.13),transparent)]" />
      <div className="absolute -top-32 left-[-20%] h-[24rem] w-[34rem] max-w-none rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.14_240/0.09),transparent)]" />
    </div>
  );
}
