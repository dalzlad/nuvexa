"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import type { NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

/** Distancia de scroll (px) a partir de la cual aparece la barra. */
const SHOW_AFTER = 520;

/**
 * Acceso rápido a contacto en móvil: aparece tras pasar la portada y se oculta
 * mientras se ve otra llamada a la acción o el pie de página (`data-hide-mobile-cta`).
 * No se muestra en la propia página de contacto.
 */
export function MobileCTA({ cta }: { cta: NavLink }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [covered, setCovered] = useState(false);
  const hidden = pathname.startsWith(cta.href);

  useEffect(() => {
    if (hidden) return;

    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setCovered(visible.size > 0);
    });
    document.querySelectorAll("[data-hide-mobile-cta]").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [hidden, pathname]);

  if (hidden) return null;
  const show = scrolled && !covered;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-300 ease-out md:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      inert={!show}
    >
      <Link
        href={cta.href}
        className="flex h-13 items-center justify-between gap-3 rounded-2xl bg-ink pr-2 pl-5 text-[0.9375rem] font-medium text-ink-foreground shadow-elevated ring-1 ring-ink-border active:scale-[0.99]"
      >
        ¿Hablamos de tu proyecto?
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </div>
  );
}
