"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1">
      {links.map((link) => {
        const active = isActivePath(pathname, link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "block rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:rounded-full",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
