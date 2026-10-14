import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { ProcessFlow } from "@/components/ProcessFlow";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { services, workSteps } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Servicios",
  description:
    "Desarrollo de software, automatización, integraciones, inteligencia artificial y desarrollo a medida para empresas.",
  path: "/servicios",
});

function ServicesIndex() {
  return (
    <nav aria-label="Servicios en esta página" className="rounded-3xl border bg-card/90 p-2 shadow-surface backdrop-blur">
      <p className="px-4 pt-3 pb-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
        En esta página
      </p>
      <ul>
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <li key={service.id}>
              <Link
                href={`#${service.id}`}
                className="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-muted"
              >
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="flex-1 text-[0.9375rem] font-medium text-foreground">{service.title}</span>
                <ArrowDownRight
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        id="servicios-titulo"
        eyebrow="Servicios"
        title="Desarrollo, automatización e integraciones para empresas"
        description="Construimos software a partir de cómo opera tu empresa: aplicaciones, flujos automáticos, conexiones entre sistemas e inteligencia artificial aplicada a procesos concretos."
        aside={<ServicesIndex />}
      />

      <section aria-label="Servicios" className="py-16 sm:py-24">
        <Container className="grid gap-20 sm:gap-28">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index + 1}
              variant="detailed"
              headingLevel="h2"
              reverse={index % 2 === 1}
            />
          ))}
        </Container>
      </section>

      <section aria-labelledby="como-trabajamos-titulo" className="border-y bg-muted/60 py-20 sm:py-28">
        <Container>
          <SectionTitle
            id="como-trabajamos-titulo"
            eyebrow="Cómo trabajamos"
            title="Primero el proceso, después el código"
            description="Cada proyecto parte de entender la operación de tu empresa."
          />
          <div className="mt-12 rounded-3xl border bg-card p-6 shadow-surface sm:p-10 lg:mt-14">
            <ProcessFlow steps={workSteps} layout="horizontal" label="Etapas de trabajo" />
          </div>
        </Container>
      </section>

      <CTASection
        title="Cuéntanos qué proceso quieres mejorar"
        description="Revisamos tu caso y te proponemos una forma concreta de abordarlo."
        primary={{ label: "Hablemos de tu proyecto", href: "/contacto?motivo=desarrollo-a-medida" }}
      />
    </>
  );
}
