import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail } from "lucide-react";

import { Backdrop } from "@/components/Backdrop";
import { ContactForm } from "@/components/ContactForm";
import { ContactFormWithParams } from "@/components/ContactFormWithParams";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { interestOptions } from "@/content/contact";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description:
    "Cuéntanos qué proceso quieres mejorar: automatización de procesos, desarrollo de software a medida, integración de sistemas o inteligencia artificial aplicada.",
  path: "/contacto",
});

const nextSteps = [
  { title: "Cuéntanos tu caso", description: "Qué proceso quieres mejorar y cómo funciona hoy." },
  { title: "Revisamos tu solicitud", description: "Analizamos tu caso y la forma concreta de abordarlo." },
  { title: "Te respondemos", description: "Al correo que nos indiques en el formulario." },
];

export default function ContactPage() {
  return (
    <section aria-labelledby="contacto-titulo" className="relative isolate overflow-hidden">
      <Backdrop />
      <Container className="grid gap-12 pt-12 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-x-16 lg:gap-y-0 lg:pt-24">
        {/* Orden: introducción, formulario e información. En escritorio el formulario ocupa la columna derecha. */}
        <div className="animate-fade-up lg:col-start-1 lg:row-start-1">
          <SectionTitle
            as="h1"
            id="contacto-titulo"
            eyebrow="Contacto"
            title="Cuéntanos qué necesitas."
            description="Cuéntanos qué proceso quieres automatizar, qué software necesitas o qué sistemas quieres conectar. Revisamos tu caso y te proponemos una forma concreta de abordarlo."
          />
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <Suspense fallback={<ContactForm contactEmail={site.email} interestOptions={interestOptions} />}>
            <ContactFormWithParams contactEmail={site.email} interestOptions={interestOptions} />
          </Suspense>
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <div className="border-t pt-8 lg:mt-10">
            <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Cómo seguimos
            </h2>
            <ol className="mt-5 space-y-5">
              {nextSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-card font-mono text-xs text-foreground shadow-xs"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 rounded-2xl border bg-card/80 p-5 shadow-xs backdrop-blur">
            <h2 className="text-sm font-medium text-foreground">También puedes escribirnos</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium break-all text-primary underline-offset-4 hover:underline"
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
