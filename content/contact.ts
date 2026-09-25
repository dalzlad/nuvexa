import { availableProducts, upcomingProducts } from "./products";
import { services } from "./services";

export interface InterestOption {
  value: string;
  label: string;
}

/** Opciones de "¿Qué necesitas?". Se generan a partir de productos y servicios. */
export const interestOptions: InterestOption[] = [
  ...availableProducts.map((p) => ({ value: `demo-${p.slug}`, label: `Demostración de ${p.name}` })),
  ...services.map((s) => ({ value: s.id, label: s.title })),
  ...upcomingProducts.map((p) => ({ value: `informacion-${p.slug}`, label: `Información sobre ${p.name}` })),
  { value: "otro", label: "Otro" },
];

/**
 * Traduce los parámetros de la URL a una opción preseleccionada.
 * /contacto?motivo=demo&producto=pedidoflow        → "demo-pedidoflow"
 * /contacto?motivo=informacion&producto=taller-ai  → "informacion-taller-ai"
 * /contacto?motivo=automatizacion                  → "automatizacion"
 */
export function resolveInterest(motivo?: string | null, producto?: string | null) {
  const candidate = (motivo === "demo" || motivo === "informacion") && producto ? `${motivo}-${producto}` : motivo;
  return interestOptions.some((o) => o.value === candidate) ? candidate! : "";
}

export function interestLabel(value: string) {
  return interestOptions.find((o) => o.value === value)?.label ?? value;
}
