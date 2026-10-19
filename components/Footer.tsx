import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { footerColumns } from "@/content/navigation";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-ink-foreground" data-hide-mobile-cta>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [--grid-color:oklch(1_0_0/0.05)] mask-[linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <Container className="pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-6 text-xl leading-snug font-medium tracking-tight text-ink-foreground">{site.tagline}</p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-ink-border bg-white/5 px-3.5 py-2.5 text-sm text-ink-foreground transition-colors hover:bg-white/10"
            >
              <Mail className="size-4 text-ink-muted" aria-hidden="true" />
              {site.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-ink-muted uppercase">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 py-1.5 text-sm text-ink-foreground/85 transition-colors hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight
                          className="size-3.5 opacity-0 transition-opacity group-hover:opacity-60"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Marca de gran formato, decorativa */}
        <p
          aria-hidden="true"
          className="mt-16 bg-[linear-gradient(to_bottom,oklch(1_0_0/0.14),oklch(1_0_0/0.02))] bg-clip-text text-center text-[19vw] leading-[0.8] font-semibold tracking-[0.06em] text-transparent select-none xl:text-[14rem]"
        >
          NUVEXA
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-ink-border pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. Todos los derechos reservados.
          </p>
          <a
            href="#contenido"
            className="inline-flex items-center gap-1.5 self-start transition-colors hover:text-ink-foreground sm:self-auto"
          >
            Volver arriba
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
