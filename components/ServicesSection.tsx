import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/content/services";

/** Resumen de servicios para la portada. */
export function ServicesSection() {
  return (
    <section aria-labelledby="servicios-titulo" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            id="servicios-titulo"
            eyebrow="Servicios"
            title="Soluciones de software para empresas"
            description="Además de nuestros productos, construimos, automatizamos e integramos software para procesos específicos."
          />
          <Link
            href="/servicios"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary"
          >
            Ver todos los servicios
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
