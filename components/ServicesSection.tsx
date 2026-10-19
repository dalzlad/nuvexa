import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

/** Capacidades en la portada: composición en mosaico, con el primer y el último servicio a doble ancho. */
export function ServicesSection() {
  return (
    <section aria-labelledby="servicios-titulo" className="py-20 sm:py-28">
      <Container>
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            id="servicios-titulo"
            eyebrow="Capacidades"
            title="Software construido a partir de cómo opera tu empresa"
            description="Desarrollamos, automatizamos e integramos los procesos que hoy dependen de trabajo manual."
          />
          <Link
            href="/servicios"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary"
          >
            Ver todos los servicios
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="reveal-stagger mt-12 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-6 lg:gap-5">
          {services.map((service, index) => {
            const last = index === services.length - 1;
            return (
              <ServiceCard
                key={service.id}
                service={service}
                index={index + 1}
                size={index === 0 || last ? "wide" : "default"}
                className={cn(
                  index === 0 ? "md:col-span-2 lg:col-span-4" : last ? "md:col-span-2 lg:col-span-6" : "lg:col-span-2",
                )}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
