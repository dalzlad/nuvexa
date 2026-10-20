import { ArrowUpRight, Bot, Waves } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";

const projects = [
  {
    icon: Bot,
    category: "Robótica",
    title: "Nuvexa Scout",
    description: "Proyecto de robótica de NUVEXA. Visita el sitio para explorar Nuvexa Scout.",
    href: "https://nuvexa-scout.vercel.app/",
  },
  {
    icon: Waves,
    category: "IoT",
    title: "AquaControl",
    description: "Proyecto de IoT enfocado en el control del agua. Consulta su sitio para conocer su alcance y funcionamiento.",
    href: "https://nuvexa-aquacontrol.vercel.app/",
  },
];

/** Proyectos de robótica e IoT, presentados como una categoría distinta del software SaaS. */
export function TechnologyProjectsSection({ id = "proyectos-tecnologicos" }: { id?: string }) {
  return (
    <section aria-labelledby={id} className="py-16 sm:py-24">
      <Container>
        <SectionTitle
          id={id}
          eyebrow="Proyectos tecnológicos"
          title="Robótica e IoT"
          description="Aquí reunimos nuestras iniciativas de robótica e Internet de las cosas (IoT), separadas del catálogo de software empresarial."
        />
        <ul className="reveal-stagger mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {projects.map(({ icon: Icon, category, title, description, href }) => (
            <li key={title}>
              <article className="group relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-[border-color,box-shadow] hover:border-primary/35 hover:shadow-surface sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-surface"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                  <Badge tone="brand">{category}</Badge>
                </div>
                <h3 className="mt-7 text-lg font-semibold tracking-tight text-foreground sm:text-xl">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-1.5 border-t pt-5 text-sm font-medium text-primary after:absolute after:inset-0 after:rounded-2xl"
                  aria-label={`Visitar ${title}; se abre en una pestaña nueva`}
                >
                  Visitar proyecto
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
