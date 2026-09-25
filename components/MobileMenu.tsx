"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { LogoMark } from "@/components/Logo";
import { isActivePath } from "@/components/NavLinks";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function MobileMenu({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" aria-label="Abrir menú">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" aria-describedby={undefined} className="w-full max-w-xs gap-0 p-0">
        <div className="flex h-16 items-center gap-2.5 border-b px-5">
          <LogoMark />
          <SheetTitle className="text-[15px] font-semibold tracking-[0.14em]">NUVEXA</SheetTitle>
        </div>
        <nav aria-label="Navegación móvil" className="flex flex-1 flex-col px-3 py-4">
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted",
                        active ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
          <SheetClose asChild>
            <Button asChild size="xl" className="mt-6 w-full">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
