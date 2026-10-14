import {
  BarChart3,
  Check,
  Database,
  FileSpreadsheet,
  FileText,
  Mail,
  MessageSquare,
  Plug,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

/*
 * Ilustración conceptual de la portada (no representa un producto ni datos reales):
 * información dispersa entra a un sistema y sale como una operación organizada.
 */

const sources: { label: string; icon: LucideIcon; y: number; tilt: string }[] = [
  { label: "Hojas de cálculo", icon: FileSpreadsheet, y: 18, tilt: "sm:-rotate-3" },
  { label: "Correos", icon: Mail, y: 39, tilt: "sm:rotate-2" },
  { label: "Mensajes", icon: MessageSquare, y: 61, tilt: "sm:-rotate-1" },
  { label: "Documentos", icon: FileText, y: 82, tilt: "sm:rotate-3" },
];

const results: { label: string; icon: LucideIcon }[] = [
  { label: "Datos centralizados", icon: Database },
  { label: "Tareas automáticas", icon: Workflow },
  { label: "Sistemas conectados", icon: Plug },
  { label: "Reportes al día", icon: BarChart3 },
];

const bars = [38, 52, 44, 63, 58, 72, 66, 84];

function SourceChip({ label, icon: Icon, className }: { label: string; icon: LucideIcon; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border bg-card px-2.5 py-2 text-[13px] font-medium whitespace-nowrap text-foreground shadow-surface",
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
      {label}
    </div>
  );
}

function CoreNode({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex size-[4.5rem] items-center justify-center", className)}>
      <span className="absolute inset-0 animate-pulse-ring rounded-full border border-primary/40" />
      <span className="absolute inset-0 animate-pulse-ring rounded-full border border-primary/30 [animation-delay:1.6s]" />
      <span className="absolute inset-1.5 rounded-full bg-[radial-gradient(circle_at_30%_25%,oklch(0.62_0.19_272),oklch(0.42_0.2_272))] shadow-elevated" />
      <LogoMark className="relative size-8 [&_rect]:fill-transparent" />
    </div>
  );
}

function ResultsPanel({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border bg-card/95 p-4 shadow-elevated backdrop-blur", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-semibold text-foreground">Operación organizada</span>
        <span className="flex gap-1">
          <span className="size-1.5 rounded-full bg-border" />
          <span className="size-1.5 rounded-full bg-border" />
          <span className="size-1.5 rounded-full bg-primary" />
        </span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {results.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-2 rounded-lg bg-muted/70 px-2 py-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-soft-foreground">
              <Icon className="size-3.5" />
            </span>
            <span className="min-w-0 flex-1 text-[12.5px] leading-tight text-foreground">{label}</span>
            <Check className="size-3.5 shrink-0 text-success" />
          </li>
        ))}
      </ul>
      <div className="mt-3 flex h-12 items-end gap-1 rounded-lg border border-dashed px-2 pt-2">
        {bars.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className={cn(
              "flex-1 rounded-t-sm",
              index === bars.length - 1 ? "bg-primary" : "bg-primary/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroVisual({ className }: { className?: string }) {
  return (
    <figure
      className={cn("relative", className)}
      aria-label="Ilustración: información dispersa en hojas de cálculo, correos, mensajes y documentos se organiza en un solo sistema."
    >
      {/* Móvil: recorrido vertical */}
      <div aria-hidden="true" className="flex flex-col items-center sm:hidden">
        <div className="grid w-full grid-cols-2 gap-2">
          {sources.map(({ label, icon }) => (
            <SourceChip key={label} label={label} icon={icon} className="justify-center" />
          ))}
        </div>
        <Connector />
        <CoreNode />
        <Connector />
        <ResultsPanel className="w-full" />
      </div>

      {/* Desde sm: composición horizontal con conexiones */}
      <div aria-hidden="true" className="relative hidden aspect-[5/4] w-full sm:block">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
        >
          {sources.map(({ label, y }, index) => {
            const d = `M 28 ${y} C 34 ${y}, 31 50, 36 50`;
            return (
              <g key={label}>
                <path d={d} stroke="var(--border)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path
                  d={d}
                  pathLength={100}
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="14 86"
                  vectorEffect="non-scaling-stroke"
                  className="animate-flow motion-reduce:hidden"
                  style={{ animationDelay: `${index * 0.55}s` }}
                />
              </g>
            );
          })}
          <path d="M 48 50 L 54 50" stroke="var(--primary)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
        </svg>

        {sources.map(({ label, icon, y, tilt }) => (
          <div
            key={label}
            className={cn("absolute left-[14%] -translate-x-1/2 -translate-y-1/2", tilt)}
            style={{ top: `${y}%` }}
          >
            <SourceChip label={label} icon={icon} />
          </div>
        ))}

        <div className="absolute top-1/2 left-[42%] -translate-x-1/2 -translate-y-1/2">
          <CoreNode />
          <p className="absolute top-full left-1/2 mt-3 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            NUVEXA
          </p>
        </div>

        <ResultsPanel className="absolute top-1/2 right-0 w-[46%] -translate-y-1/2 animate-float" />
      </div>
    </figure>
  );
}

function Connector() {
  return (
    <div className="relative h-10 w-px bg-border">
      <span className="absolute -top-1 left-1/2 size-1.5 -translate-x-1/2 animate-travel-y rounded-full bg-primary motion-reduce:hidden" />
    </div>
  );
}
