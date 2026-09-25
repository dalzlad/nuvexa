import { Copy, FileSpreadsheet, Hand, Mail, Repeat, Unplug } from "lucide-react";

import { Container } from "@/components/Container";
import { ProcessFlow } from "@/components/ProcessFlow";
import { SectionTitle } from "@/components/SectionTitle";

const problems = [
  { label: "Excel disperso", icon: FileSpreadsheet },
  { label: "Correos", icon: Mail },
  { label: "Información duplicada", icon: Copy },
  { label: "Procesos manuales", icon: Hand },
  { label: "Tareas repetitivas", icon: Repeat },
  { label: "Sistemas desconectados", icon: Unplug },
];

const stages = [
  { title: "Información dispersa", description: "Datos repartidos entre archivos, correos y personas." },
  { title: "Procesos digitales", description: "Cada paso queda registrado en un mismo sistema." },
  { title: "Automatización", description: "Las tareas repetitivas se ejecutan sin intervención manual." },
  { title: "Información organizada", description: "Datos confiables, disponibles para decidir." },
];

export function ProblemsSection() {
  return (
    <section aria-labelledby="problemas-titulo" className="border-y bg-muted/50 py-20 sm:py-28">
      <Container>
        <SectionTitle
          id="problemas-titulo"
          eyebrow="El problema"
          title="Muchas empresas operan con información dispersa"
          description="Cuando la operación depende de archivos sueltos y trabajo manual, crecer significa más errores y más tiempo perdido."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ul className="grid grid-cols-1 gap-3 self-start min-[400px]:grid-cols-2">
            {problems.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3.5">
                <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </li>
            ))}
          </ul>

          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Convertimos procesos manuales en software organizado y automatizado.
            </h3>
            <ProcessFlow steps={stages} label="De información dispersa a información organizada" className="mt-8" />
          </div>
        </div>
      </Container>
    </section>
  );
}
