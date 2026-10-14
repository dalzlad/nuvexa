import { Copy, FileSpreadsheet, Hand, Mail, Repeat, Unplug } from "lucide-react";

import { Container } from "@/components/Container";
import { ProcessFlow } from "@/components/ProcessFlow";
import { SectionTitle } from "@/components/SectionTitle";
import { cn } from "@/lib/utils";

const problems = [
  { label: "Excel disperso", icon: FileSpreadsheet, tilt: "sm:-rotate-2" },
  { label: "Correos", icon: Mail, tilt: "sm:rotate-1" },
  { label: "Información duplicada", icon: Copy, tilt: "sm:rotate-2" },
  { label: "Procesos manuales", icon: Hand, tilt: "sm:-rotate-1" },
  { label: "Tareas repetitivas", icon: Repeat, tilt: "sm:rotate-1" },
  { label: "Sistemas desconectados", icon: Unplug, tilt: "sm:-rotate-2" },
];

const stages = [
  { title: "Información dispersa", description: "Datos repartidos entre archivos, correos y personas." },
  { title: "Procesos digitales", description: "Cada paso queda registrado en un mismo sistema." },
  { title: "Automatización", description: "Las tareas repetitivas se ejecutan sin intervención manual." },
  { title: "Información organizada", description: "Datos confiables, disponibles para decidir." },
];

export function ProblemsSection() {
  return (
    <section
      aria-labelledby="problemas-titulo"
      className="relative isolate overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [--grid-color:oklch(1_0_0/0.05)] mask-[radial-gradient(ellipse_80%_70%_at_20%_10%,black,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-[-12rem] -z-10 size-[36rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.49_0.2_272/0.35),transparent)]"
      />

      <Container className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <SectionTitle
            tone="dark"
            id="problemas-titulo"
            eyebrow="El problema"
            title="Muchas empresas operan con información dispersa"
            description="Cuando la operación depende de archivos sueltos y trabajo manual, crecer significa más errores y más tiempo perdido."
          />

          <div className="relative mt-10 rounded-2xl border border-dashed border-white/15 p-4 sm:p-6">
            <p className="absolute -top-2.5 left-4 bg-ink px-2 font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
              Hoy
            </p>
            <ul className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2">
              {problems.map(({ label, icon: Icon, tilt }) => (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border border-ink-border bg-white/[0.04] px-4 py-3.5 transition-transform duration-300 hover:rotate-0",
                    tilt,
                  )}
                >
                  <Icon className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                  <span className="text-sm font-medium text-ink-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-ink-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-10">
          <p className="eyebrow text-brand-sky">Con NUVEXA</p>
          <h3 className="mt-4 text-xl leading-snug font-semibold tracking-tight text-ink-foreground sm:text-2xl">
            Convertimos procesos manuales en software organizado y automatizado.
          </h3>
          <ProcessFlow
            tone="dark"
            steps={stages}
            label="De información dispersa a información organizada"
            className="mt-10"
          />
        </div>
      </Container>
    </section>
  );
}
