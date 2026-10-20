import type { Metadata } from "next";

import { ApproachSection } from "@/components/ApproachSection";
import { CTASection } from "@/components/CTASection";
import { MainCover } from "@/components/MainCover";
import { ProblemsSection } from "@/components/ProblemsSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TechnologyProjectsSection } from "@/components/TechnologyProjectsSection";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ description: site.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <MainCover />
      <ServicesSection />
      <ProblemsSection />
      <ApproachSection />
      <ProductsSection />
      <TechnologyProjectsSection id="proyectos-portada-titulo" />
      <CTASection
        eyebrow="Contacto"
        title="¿Tienes un proceso que quieras simplificar?"
        description="Cuéntanos cómo funciona hoy y revisamos juntos la mejor forma de resolverlo."
        primary={{ label: "Hablemos de tu proyecto", href: "/contacto?motivo=desarrollo-a-medida" }}
        secondary={{ label: "Ver servicios", href: "/servicios" }}
      />
    </>
  );
}
