import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Backdrop } from "@/components/Backdrop";
import { Container } from "@/components/Container";
import { HeroVisual } from "@/components/HeroVisual";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";

const capabilities = services.filter((service) => service.showInFooter).map((service) => service.title);

/** Sección principal de portada: primera sección visible del sitio. */
export function MainCover() {
  return (
    <section aria-labelledby="portada-titulo" className="relative isolate overflow-hidden border-b">
      <Backdrop />

      <Container className="grid items-center gap-14 pt-12 pb-16 sm:pt-20 sm:pb-24 lg:grid-cols-[1fr_1.02fr] lg:gap-10 lg:pt-24 lg:pb-28 xl:gap-16">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border bg-card/80 py-1 pr-3 pl-1 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur">
            <span className="rounded-full bg-brand-soft px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-brand-soft-foreground uppercase">
              Software empresarial
            </span>
            <span className="hidden min-[400px]:inline">Desarrollo · Automatización · IA</span>
          </p>

          <h1
            id="portada-titulo"
            className="mt-6 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.035em] text-foreground sm:text-6xl sm:leading-[1.02] lg:text-[3.6rem] xl:text-[4rem]"
          >
            Software que simplifica <span className="text-gradient-brand">la operación</span> de tu negocio.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            NUVEXA desarrolla software a medida, automatización, integraciones e inteligencia artificial para que
            procesos como pedidos, cotizaciones y reportes dejen de depender de digitación manual, archivos
            sueltos y sistemas desconectados.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/contacto">
                Hablemos de tu proyecto
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/servicios">Ver servicios</Link>
            </Button>
          </div>

          <ul aria-label="Capacidades" className="mt-10 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t pt-6 sm:flex sm:flex-wrap">
            {capabilities.map((capability) => (
              <li key={capability} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual className="mx-auto w-full max-w-md sm:max-w-xl lg:max-w-none" />
      </Container>
    </section>
  );
}
