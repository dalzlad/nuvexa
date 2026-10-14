import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { NavLinks } from "@/components/NavLinks";
import { Button } from "@/components/ui/button";
import { contactLink, mainNav } from "@/content/navigation";
import { site } from "@/content/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Navegación principal" className="hidden md:block">
          <NavLinks links={mainNav} />
        </nav>

        <div className="hidden md:block">
          <Button asChild size="lg" className="h-9 rounded-lg px-4">
            <Link href={contactLink.href}>
              {contactLink.label}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="-mr-2 md:hidden">
          <MobileMenu links={mainNav} cta={contactLink} tagline={site.tagline} />
        </div>
      </Container>
    </header>
  );
}
