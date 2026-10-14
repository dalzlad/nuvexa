import "server-only";

import { interestLabelFrom, type InterestOption } from "@/lib/interest";

import { availableProducts, upcomingProducts } from "./products";
import { services } from "./services";

export type { InterestOption };

/**
 * Opciones de "¿Qué necesitas?". Se generan a partir de productos y servicios públicos.
 * Solo servidor: el formulario las recibe como props para que el catálogo completo
 * (incluidos los productos ocultos) no forme parte del JavaScript del navegador.
 */
export const interestOptions: InterestOption[] = [
  ...availableProducts.map((p) => ({ value: `demo-${p.slug}`, label: `Demostración de ${p.name}` })),
  ...services.map((s) => ({ value: s.id, label: s.title })),
  ...upcomingProducts.map((p) => ({ value: `informacion-${p.slug}`, label: `Información sobre ${p.name}` })),
  { value: "otro", label: "Otro" },
];

export function interestLabel(value: string) {
  return interestLabelFrom(interestOptions, value);
}
