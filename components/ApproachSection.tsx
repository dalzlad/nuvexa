import { Container } from "@/components/Container";
import { ProcessFlow } from "@/components/ProcessFlow";
import { SectionTitle } from "@/components/SectionTitle";
import { workSteps } from "@/content/services";
import { values } from "@/content/values";

const principles = values.filter((value) =>
  ["Claridad", "Criterio con la tecnología", "Cercanía"].includes(value.title),
);

/** Enfoque de trabajo en la portada: etapas del proyecto y principios que lo guían. */
export function ApproachSection() {
  return (
    <section aria-labelledby="enfoque-titulo" className="border-b bg-muted/60 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle
              id="enfoque-titulo"
              eyebrow="Enfoque de trabajo"
              title="Primero el proceso, después el código"
              description="Cada proyecto parte de entender la operación de tu empresa."
            />
            <figure className="mt-10 border-l-2 border-primary pl-5">
              <blockquote className="text-lg leading-snug font-medium tracking-tight text-foreground sm:text-xl">
                “El software debe quitar trabajo, no agregarlo.”
              </blockquote>
              <figcaption className="mt-3 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                Nuestro criterio
              </figcaption>
            </figure>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-surface sm:p-10">
            <ProcessFlow steps={workSteps} label="Etapas de trabajo" />
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3 lg:mt-20">
          {principles.map(({ title, description, icon: Icon }) => (
            <li key={title} className="bg-card p-6 sm:p-7">
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
