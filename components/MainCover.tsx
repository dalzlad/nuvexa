import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { CoverMockup } from "@/components/CoverMockup";
import { Button } from "@/components/ui/button";

/** Sección principal de portada: primera sección visible del sitio. */
export function MainCover() {
  return (
    <section aria-labelledby="portada-titulo" className="relative overflow-hidden border-b">
      {/* Retícula sutil de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[48px_48px] opacity-50 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-28">
        <div>
          <p className="text-sm font-medium text-primary">Software empresarial</p>
          <h1
            id="portada-titulo"
            className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            Software que simplifica la operación de tu negocio.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            NUVEXA desarrolla productos SaaS, automatización, integraciones e inteligencia artificial para que
            procesos como pedidos, cotizaciones y reportes dejen de depender de digitación manual, archivos
            sueltos y sistemas desconectados.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/productos">
                Ver productos
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/contacto">Hablemos de tu proyecto</Link>
            </Button>
          </div>
        </div>

        <CoverMockup />
      </Container>
    </section>
  );
}
