import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { SectionTitle } from "@/components/SectionTitle";
import { availableProducts } from "@/content/products";
import { values } from "@/content/values";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Empresa",
  description: "NUVEXA es una empresa de software enfocada en productos SaaS y soluciones empresariales.",
  path: "/empresa",
});

const productNames = availableProducts.map((p) => p.name).join(" y ");

export default function CompanyPage() {
  return (
    <>
      <section aria-labelledby="empresa-titulo" className="border-b">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <SectionTitle
            as="h1"
            id="empresa-titulo"
            eyebrow="Empresa"
            title="Construimos software para resolver problemas empresariales."
          />
          <div className="space-y-5 leading-relaxed text-muted-foreground lg:pt-9">
            <p>
              NUVEXA es una empresa de software enfocada en productos SaaS y soluciones empresariales. Desarrollamos
              productos propios, como {productNames}, y construimos soluciones a medida para empresas que necesitan
              digitalizar, automatizar o integrar sus procesos.
            </p>
            <p>
              Partimos de una idea simple: el software debe hacer más fácil la operación diaria, no agregarle
              complejidad. Por eso empezamos por entender el proceso y usamos la inteligencia artificial solo donde
              aporta.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="valores-titulo" className="py-20 sm:py-24">
        <Container>
          <SectionTitle id="valores-titulo" eyebrow="Valores" title="Lo que guía nuestro trabajo" />
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, description, icon: Icon }) => (
              <li key={title}>
                <span
                  className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand-soft-foreground"
                  aria-hidden="true"
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Conoce lo que hacemos"
        description="Explora nuestros productos o cuéntanos qué necesita tu empresa."
        primary={{ label: "Conocer productos", href: "/productos" }}
        secondary={{ label: "Contactar", href: "/contacto" }}
      />
    </>
  );
}
