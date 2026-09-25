import { ArrowDown, ArrowRight, CheckCircle2, Inbox, MessageSquareText } from "lucide-react";

// Datos ilustrativos del mockup (no representan clientes ni pedidos reales).
const orderLines = [
  { product: "Guantes de nitrilo M", qty: "12 cajas" },
  { product: "Desinfectante", qty: "5 galones" },
  { product: "Toallas de papel", qty: "8 paquetes" },
];

/**
 * Representación visual de software para la sección principal de portada:
 * un pedido en texto libre convertido en una orden estructurada.
 */
export function CoverMockup() {
  return (
    <figure
      className="@container relative w-full overflow-hidden rounded-xl border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-12px_rgb(30_27_75/0.18)]"
      aria-label="Ejemplo de PedidoFlow B2B: un pedido recibido por mensaje se convierte en una orden estructurada"
    >
      {/* Barra de la ventana */}
      <div className="flex items-center gap-3 border-b bg-muted/70 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Inbox className="size-3.5" aria-hidden="true" />
          PedidoFlow B2B · Bandeja de pedidos
        </div>
      </div>

      <div className="grid gap-3 p-4 @lg:grid-cols-[1fr_auto_1.25fr] @lg:items-center @lg:p-5">
        {/* Mensaje recibido */}
        <div className="rounded-lg border bg-background p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
              <MessageSquareText className="size-3.5 text-muted-foreground" aria-hidden="true" />
              Mensaje
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              WhatsApp
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
            Buenos días, para mañana por favor 12 cajas de guantes M, 5 galones de desinfectante y 8
            paquetes de toallas.
          </p>
        </div>

        <div className="flex justify-center text-primary" aria-hidden="true">
          <ArrowDown className="size-4 @lg:hidden" />
          <ArrowRight className="hidden size-4 @lg:block" />
        </div>

        {/* Orden estructurada */}
        <div className="rounded-lg border bg-background">
          <div className="flex items-center justify-between gap-2 border-b px-3.5 py-2.5">
            <span className="text-xs font-medium text-foreground">Orden estructurada</span>
            <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-brand-soft-foreground">
              Por validar
            </span>
          </div>
          <ul className="divide-y">
            {orderLines.map((line) => (
              <li key={line.product} className="flex items-center justify-between gap-3 px-3.5 py-2">
                <span className="flex min-w-0 items-center gap-2 text-[13px] text-foreground">
                  <CheckCircle2 className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="truncate">{line.product}</span>
                </span>
                <span className="shrink-0 text-[13px] text-muted-foreground tabular-nums">{line.qty}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-2 border-t px-3.5 py-2.5">
            <span className="text-[11px] text-muted-foreground">Cliente identificado</span>
            <span className="shrink-0 rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-primary-foreground">
              Validar orden
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}
