import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { NavLinks } from "@/components/NavLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { contactLink, mainNav } from "@/content/navigation";
import { site } from "@/content/site";

export function Navbar() {
  return (
    <header
      className="site-header sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/70"
      style={{ viewTransitionName: "site-header" }}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Navegación principal" className="hidden md:block">
          <NavLinks links={mainNav} />
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild size="lg" className="h-9 rounded-lg px-4">
            <Link href={contactLink.href}>
              {contactLink.label}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="-mr-2 flex items-center gap-1 md:hidden">
          <ThemeToggle className="size-11" />
          <MobileMenu links={mainNav} cta={contactLink} tagline={site.tagline} />
        </div>
      </Container>
      {/* Progreso de lectura (solo CSS, ver .scroll-progress en globals.css) */}
      <span
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-linear-to-r from-primary to-brand-sky"
      />
    </header>
  );
}
