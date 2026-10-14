/**
 * Lógica de "¿Qué necesitas?" sin datos: se puede importar desde componentes del cliente
 * sin arrastrar el catálogo de productos ni el contenido de servicios al navegador.
 * Las opciones se generan en el servidor (content/contact.ts) y llegan como props.
 */

export interface InterestOption {
  value: string;
  label: string;
}

/**
 * Traduce los parámetros de la URL a una opción preseleccionada.
 * /contacto?motivo=demo&producto=<slug>         → "demo-<slug>"
 * /contacto?motivo=informacion&producto=<slug>  → "informacion-<slug>"
 * /contacto?motivo=automatizacion               → "automatizacion"
 */
export function resolveInterestFrom(options: InterestOption[], motivo?: string | null, producto?: string | null) {
  const candidate = (motivo === "demo" || motivo === "informacion") && producto ? `${motivo}-${producto}` : motivo;
  return options.some((o) => o.value === candidate) ? candidate! : "";
}

export function interestLabelFrom(options: InterestOption[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}
