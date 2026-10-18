import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { LogoMark } from "@/components/Logo";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceVisual } from "@/components/ServiceVisual";
import { companyFocus, companyIntro } from "@/content/company";
import { values } from "@/content/values";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Empresa",
  description:
    "NUVEXA es una empresa de software: soluciones a medida y productos propios para digitalizar, automatizar e integrar procesos empresariales.",
  path: "/empresa",
});

/** Ilustración de marca: NUVEXA al centro de sus cuatro capacidades. */
const orbitNodes = [
  { label: "Desarrollo", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
  { label: "Automatización", position: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2" },
  { label: "Integraciones", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
  { label: "IA aplicada", position: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" },
];

function CompanyVisual() {
  return (
    <div aria-hidden="true" className="hidden px-12 sm:block">
      <div className="relative mx-auto aspect-square w-full max-w-sm">
        <div className="absolute inset-0 rounded-full border bg-card/40" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-primary/30" />
        <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(closest-side,oklch(0.49_0.2_272/0.18),transparent)]" />
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="absolute size-24 animate-pulse-ring rounded-3xl border border-primary/30" />
          <LogoMark className="relative size-20 drop-shadow-[0_18px_30px_oklch(0.49_0.2_272/0.4)]" />
        </div>
        {orbitNodes.map(({ label, position }) => (
          <span
            key={label}
            className={cn(
              "absolute flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium whitespace-nowrap text-foreground shadow-surface",
              position,
            )}
          >
            <span className="size-1.5 rounded-full bg-primary" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

const focusVisuals = ["desarrollo-de-software", "desarrollo-a-medida"];

export default function CompanyPage() {
  const [lead, ...paragraphs] = companyIntro.paragraphs;

  return (
    <>
      <PageHeader id="empresa-titulo" eyebrow="Empresa" title={companyIntro.title} aside={<CompanyVisual />} />

      <section aria-labelledby="quienes-titulo" className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
          <div>
            <h2 id="quienes-titulo" className="eyebrow flex items-center gap-2.5 lg:sticky lg:top-28">
              <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
              Quiénes somos
            </h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-xl leading-snug font-medium tracking-tight text-foreground sm:text-2xl sm:leading-snug">
              {lead}
            </p>
            <div className="mt-8 grid gap-6 text-base leading-relaxed text-muted-foreground sm:grid-cols-2 sm:gap-10">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="enfoque-titulo" className="border-y bg-muted/60 py-20 sm:py-28">
        <Container>
          <SectionTitle id="enfoque-titulo" eyebrow="Qué hacemos" title={companyFocus.title} />
          <div className="relative mt-12 lg:mt-14">
            <ul className="reveal-stagger grid gap-4 md:grid-cols-2 md:gap-6">
              {companyFocus.items.map((item, index) => (
                <li
                  key={item.title}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border bg-card transition-[border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-surface"
                >
                  <div className="relative isolate border-b bg-muted/50 px-6 pt-8 pb-4 sm:px-10">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots opacity-70" />
                    <ServiceVisual id={focusVisuals[index]} className="mx-auto max-h-44" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{item.title}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{item.description}</p>
                    <Link
                      href={item.href}
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary after:absolute after:inset-0 after:rounded-3xl"
                    >
                      {item.linkLabel}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background text-primary shadow-surface md:flex"
            >
              <Plus className="size-4" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="valores-titulo" className="py-20 sm:py-28">
        <Container>
          <SectionTitle id="valores-titulo" eyebrow="Valores" title="Lo que guía nuestro trabajo" />
          <ul className="reveal mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {values.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="group bg-card p-6 transition-colors hover:bg-muted/40 sm:p-8">
                <div className="flex items-center justify-between">
                  <span
                    className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand-soft-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Cuéntanos qué proceso quieres simplificar"
        description="Revisamos tu caso y te proponemos cómo abordarlo: desarrollo a medida, automatización o integración de sistemas."
        primary={{ label: "Hablemos de tu proyecto", href: "/contacto" }}
        secondary={{ label: "Ver productos", href: "/productos" }}
      />
    </>
  );
}
