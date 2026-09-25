import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { ProcessFlow } from "@/components/ProcessFlow";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Servicios",
  description:
    "Desarrollo de software, automatización, integraciones, inteligencia artificial y desarrollo a medida para empresas.",
  path: "/servicios",
});

const workSteps = [
  { title: "Diagnóstico", description: "Entendemos cómo funciona hoy el proceso y dónde se pierde tiempo." },
  { title: "Diseño", description: "Definimos el alcance, la solución y las prioridades contigo." },
  { title: "Construcción", description: "Desarrollamos por etapas, con entregas que puedes revisar." },
  { title: "Acompañamiento", description: "Ponemos la solución en marcha y la ajustamos con el uso real." },
];

export default function ServicesPage() {
  return (
    <>
      <Container className="pt-16 sm:pt-24">
        <SectionTitle
          as="h1"
          eyebrow="Servicios"
          title="Soluciones de software para empresas"
          description="Construimos, automatizamos e integramos software para procesos empresariales, con criterio técnico y foco en el resultado para el negocio."
        />
      </Container>

      <section aria-label="Servicios" className="pt-8 pb-12 sm:pb-16">
        <Container className="divide-y">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} variant="detailed" headingLevel="h2" />
          ))}
        </Container>
      </section>

      <section aria-labelledby="como-trabajamos-titulo" className="border-y bg-muted/50 py-20 sm:py-24">
        <Container>
          <SectionTitle
            id="como-trabajamos-titulo"
            eyebrow="Cómo trabajamos"
            title="Primero el proceso, después el código"
            description="Cada proyecto parte de entender la operación de tu empresa."
          />
          <ProcessFlow steps={workSteps} layout="horizontal" label="Etapas de trabajo" className="mt-12" />
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
