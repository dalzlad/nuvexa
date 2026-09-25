import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { SectionTitle } from "@/components/SectionTitle";
import { companyFocus, companyIntro } from "@/content/company";
import { values } from "@/content/values";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Empresa",
  description:
    "NUVEXA es una empresa de software: productos SaaS y soluciones a medida para digitalizar, automatizar e integrar procesos empresariales.",
  path: "/empresa",
});

export default function CompanyPage() {
  return (
    <>
      <section aria-labelledby="empresa-titulo" className="border-b">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <SectionTitle as="h1" id="empresa-titulo" eyebrow="Empresa" title={companyIntro.title} />
          <div className="space-y-5 leading-relaxed text-muted-foreground lg:pt-9">
            {companyIntro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="enfoque-titulo" className="border-b bg-muted/50 py-20 sm:py-24">
        <Container>
          <SectionTitle id="enfoque-titulo" eyebrow="Qué hacemos" title={companyFocus.title} />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
            {companyFocus.items.map((item) => (
              <li key={item.title} className="flex flex-col rounded-xl border bg-background p-6 sm:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary"
                >
                  {item.linkLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
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
        title="Cuéntanos qué proceso quieres simplificar"
        description="Revisamos si uno de nuestros productos lo resuelve o si conviene una solución a medida."
        primary={{ label: "Hablemos de tu proyecto", href: "/contacto" }}
        secondary={{ label: "Ver productos", href: "/productos" }}
      />
    </>
  );
}
