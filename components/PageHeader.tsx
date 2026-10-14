import { Backdrop } from "@/components/Backdrop";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Contenido sobre el título (p. ej. ruta de navegación). */
  before?: React.ReactNode;
  /** Acciones o contenido bajo la descripción. */
  children?: React.ReactNode;
  /** Recurso visual a la derecha en escritorio. */
  aside?: React.ReactNode;
  className?: string;
}

/** Encabezado de las páginas internas: mismo lenguaje que la portada, a menor escala. */
export function PageHeader({ id, eyebrow, title, description, before, children, aside, className }: PageHeaderProps) {
  return (
    <section aria-labelledby={id} className={cn("relative isolate overflow-hidden border-b", className)}>
      <Backdrop />
      <Container
        className={cn(
          "grid gap-12 pt-12 pb-14 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24",
          aside && "lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16",
        )}
      >
        <div className="animate-fade-up">
          {before && <div className="mb-8">{before}</div>}
          <SectionTitle as="h1" id={id} eyebrow={eyebrow} title={title} description={description} />
          {children && <div className="mt-9">{children}</div>}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </Container>
    </section>
  );
}
