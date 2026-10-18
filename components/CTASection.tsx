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
  eyebrow?: string;
}

export function CTASection({ title, description, primary, secondary, eyebrow = "Siguiente paso" }: CTASectionProps) {
  return (
    <section aria-labelledby="cta-titulo" className="py-16 sm:py-24" data-hide-mobile-cta>
      <Container>
        <div className="reveal relative isolate overflow-hidden rounded-3xl bg-ink px-6 py-12 text-ink-foreground shadow-elevated sm:px-12 sm:py-16 lg:px-16">
          {/* Retícula y halo de luz */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-grid [--grid-color:var(--ink-border)] mask-[radial-gradient(ellipse_70%_90%_at_100%_100%,black,transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 -bottom-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.49_0.2_272/0.55),transparent)]"
          />
          {/* Órbitas abstractas */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            className="absolute -right-16 -bottom-24 -z-10 hidden w-[26rem] text-white/10 md:block"
            fill="none"
          >
            <circle cx="200" cy="200" r="190" stroke="currentColor" />
            <circle cx="200" cy="200" r="130" stroke="currentColor" />
            <circle cx="200" cy="200" r="70" stroke="currentColor" strokeDasharray="3 6" />
            <circle cx="70" cy="200" r="4" className="fill-brand-sky" />
            <circle cx="330" cy="135" r="3" fill="currentColor" />
            <circle cx="200" cy="10" r="3" className="fill-white/40" />
          </svg>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow text-brand-sky">{eyebrow}</p>
              <h2
                id="cta-titulo"
                className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.025em] sm:text-4xl sm:leading-[1.1]"
              >
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button asChild size="xl" className="bg-white text-ink shadow-none hover:bg-white/90">
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
                  className="border-white/20 bg-white/5 text-ink-foreground shadow-none hover:bg-white/10 hover:text-ink-foreground"
                >
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
