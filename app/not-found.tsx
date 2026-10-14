import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Backdrop } from "@/components/Backdrop";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="error-titulo" className="relative isolate overflow-hidden">
      <Backdrop variant="center" />
      <Container className="flex flex-col items-center py-20 text-center sm:py-32">
        <p
          aria-hidden="true"
          className="bg-[linear-gradient(to_bottom,var(--foreground),transparent)] bg-clip-text font-mono text-[7rem] leading-none font-semibold tracking-tighter text-transparent opacity-15 select-none sm:text-[10rem]"
        >
          404
        </p>
        <p className="eyebrow -mt-2 sm:-mt-4">Error 404</p>
        <h1
          id="error-titulo"
          className="mt-4 text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.03em] text-foreground sm:text-5xl"
        >
          Página no encontrada
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          La página que buscas no existe o cambió de dirección.
        </p>
        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="xl">
            <Link href="/">
              Ir al inicio
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/contacto">Contactar</Link>
          </Button>
        </div>
        <nav aria-label="Secciones del sitio" className="mt-12 border-t pt-6">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
