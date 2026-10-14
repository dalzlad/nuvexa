import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { ContactFormWithParams } from "@/components/ContactFormWithParams";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description: "Cuéntanos qué necesitas: demostraciones de producto, desarrollo a medida, automatización o integraciones.",
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <div>
        <SectionTitle
          as="h1"
          eyebrow="Contacto"
          title="Cuéntanos qué necesitas."
          description="Solicita una demostración de nuestros productos o cuéntanos sobre el proceso que quieres mejorar."
        />
        <div className="mt-10 border-t pt-8">
          <h2 className="text-sm font-medium text-foreground">También puedes escribirnos</h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            <Mail className="size-4" aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </div>

      <div>
        <Suspense fallback={<ContactForm contactEmail={site.email} />}>
          <ContactFormWithParams contactEmail={site.email} />
        </Suspense>
      </div>
    </Container>
  );
}
