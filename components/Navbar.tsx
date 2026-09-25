import Link from "next/link";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { NavLinks } from "@/components/NavLinks";
import { Button } from "@/components/ui/button";
import { contactLink, mainNav } from "@/content/navigation";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/75">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Navegación principal" className="hidden md:block">
          <NavLinks links={mainNav} />
        </nav>

        <div className="hidden md:block">
          <Button asChild size="lg" className="px-4">
            <Link href={contactLink.href}>{contactLink.label}</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <MobileMenu links={mainNav} cta={contactLink} />
        </div>
      </Container>
    </header>
  );
}
