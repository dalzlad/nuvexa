import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="text-sm font-medium text-primary">Error 404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        La página que buscas no existe o cambió de dirección.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="xl">
          <Link href="/">Ir al inicio</Link>
        </Button>
        <Button asChild size="xl" variant="outline">
          <Link href="/productos">Ver productos</Link>
        </Button>
      </div>
    </Container>
  );
}
