"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, MenuIcon, XIcon } from "lucide-react";

import { LogoMark } from "@/components/Logo";
import { isActivePath } from "@/components/NavLinks";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function MobileMenu({ links, cta, tagline }: { links: NavLink[]; cta: NavLink; tagline: string }) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="size-11" aria-label="Abrir menú">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        showCloseButton={false}
        className="w-full gap-0 p-0 sm:max-w-sm"
      >
        <div className="flex h-16 items-center gap-2.5 border-b pr-2.5 pl-5">
          <LogoMark />
          <SheetTitle className="flex-1 text-[15px] font-semibold tracking-[0.14em]">NUVEXA</SheetTitle>
          {/* Cierre propio con área táctil de 44 × 44 px (el del Sheet compartido mide 28 px). */}
          <SheetClose asChild>
            <Button variant="ghost" size="icon-lg" className="size-11" aria-label="Cerrar menú">
              <XIcon className="size-5" aria-hidden="true" />
            </Button>
          </SheetClose>
        </div>
        <nav aria-label="Navegación móvil" className="flex flex-1 flex-col px-3 py-5">
          <ul className="flex flex-col gap-1">
            {links.map((link, index) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-4 rounded-xl px-3 py-3.5 text-lg font-medium tracking-tight transition-colors hover:bg-muted",
                        active ? "bg-muted text-foreground" : "text-foreground/80",
                      )}
                    >
                      <span className="font-mono text-xs text-muted-foreground tabular-nums" aria-hidden="true">
                        0{index + 1}
                      </span>
                      <span className="flex-1">{link.label}</span>
                      <ArrowUpRight
                        className={cn(
                          "size-4 transition-colors",
                          active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                        )}
                        aria-hidden="true"
                      />
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
          <SheetClose asChild>
            <Button asChild size="xl" className="mt-6 w-full">
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </SheetClose>
          <p className="mt-auto px-3 pt-8 text-sm leading-relaxed text-muted-foreground">{tagline}</p>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
