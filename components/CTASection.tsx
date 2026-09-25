import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";

interface CTAAction {
  label: string;
  href: string;
}

interface CTASectionProps {
  title: string;
  description: string;
  primary: CTAAction;
  secondary?: CTAAction;
}

export function CTASection({ title, description, primary, secondary }: CTASectionProps) {
  return (
    <section aria-labelledby="cta-titulo" className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 rounded-2xl bg-foreground px-6 py-10 text-background sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 id="cta-titulo" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 leading-relaxed text-background/75">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Button asChild size="xl" className="bg-background text-foreground hover:bg-background/90">
              <Link href={primary.href}>
                {primary.label}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            {secondary && (
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
