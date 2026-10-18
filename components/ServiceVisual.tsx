import { cn } from "@/lib/utils";

/*
 * Ilustraciones conceptuales de cada servicio. Solo geometría: no muestran
 * productos, clientes ni datos reales. Son decorativas (aria-hidden).
 */

const box = "fill-card stroke-border";
const soft = "fill-muted stroke-border";
const line = "stroke-border";
const ink = "fill-foreground/15";
const brand = "fill-primary";
const brandSoft = "fill-brand-soft stroke-primary/30";

function Software() {
  return (
    <>
      <rect x="20" y="14" width="200" height="132" rx="10" className={box} />
      <path d="M20 34h200" className={line} />
      <circle cx="32" cy="24" r="3" className={ink} />
      <circle cx="42" cy="24" r="3" className={ink} />
      <circle cx="52" cy="24" r="3" className={ink} />
      <rect x="30" y="44" width="40" height="92" rx="5" className={soft} />
      <rect x="37" y="54" width="26" height="4" rx="2" className={brand} />
      <rect x="37" y="66" width="20" height="4" rx="2" className={ink} />
      <rect x="37" y="78" width="24" height="4" rx="2" className={ink} />
      <rect x="37" y="90" width="18" height="4" rx="2" className={ink} />
      <rect x="80" y="44" width="62" height="40" rx="5" className={brandSoft} />
      <rect x="88" y="54" width="22" height="4" rx="2" className={brand} />
      <rect x="88" y="66" width="40" height="8" rx="2" className="fill-primary/25" />
      <rect x="150" y="44" width="60" height="40" rx="5" className={soft} />
      <path d="M158 74l10-8 9 5 12-11 13 6" fill="none" strokeWidth="2" strokeLinecap="round" className="stroke-primary" />
      <rect x="80" y="92" width="130" height="44" rx="5" className={soft} />
      <path d="M88 104h114M88 114h114M88 124h80" className={line} />
    </>
  );
}

function Store() {
  return (
    <>
      <rect x="20" y="14" width="200" height="132" rx="10" className={box} />
      <path d="M20 34h200" className={line} />
      <circle cx="32" cy="24" r="3" className={ink} />
      <circle cx="42" cy="24" r="3" className={ink} />
      <circle cx="52" cy="24" r="3" className={ink} />
      {[30, 80, 130].map((x, i) => (
        <g key={x}>
          <rect x={x} y="44" width="42" height="84" rx="6" className={i === 1 ? brandSoft : soft} />
          <rect x={x + 6} y="50" width="30" height="34" rx="4" className={i === 1 ? "fill-primary/20" : "fill-foreground/10"} />
          <rect x={x + 6} y="92" width="24" height="4" rx="2" className={ink} />
          <rect x={x + 6} y="102" width="14" height="4" rx="2" className={i === 1 ? brand : ink} />
          <rect x={x + 6} y="112" width="30" height="9" rx="4.5" className={i === 1 ? brand : "fill-foreground/15"} />
        </g>
      ))}
      <rect x="180" y="44" width="32" height="84" rx="6" className={box} />
      <circle cx="196" cy="62" r="10" className="fill-primary" />
      <path d="M191 59h2l2 6h6l1.5-4.5H194" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white" />
      <rect x="186" y="82" width="20" height="4" rx="2" className={ink} />
      <rect x="186" y="92" width="16" height="4" rx="2" className={ink} />
      <path d="M186 106h20" className={line} />
      <rect x="186" y="112" width="20" height="8" rx="4" className={brand} />
    </>
  );
}

function Automation() {
  return (
    <>
      <path d="M58 80h40M142 80h40" strokeWidth="1.5" strokeDasharray="3 4" className="stroke-primary/50" />
      <path d="M120 58V30h62M120 102v28h62" fill="none" strokeWidth="1.5" className={line} />
      <rect x="18" y="58" width="40" height="44" rx="10" className={box} />
      <path d="M30 80h16M38 72v16" strokeWidth="2" strokeLinecap="round" className="stroke-foreground/30" />
      <rect x="98" y="58" width="44" height="44" rx="8" transform="rotate(45 120 80)" className={brandSoft} />
      <path d="M112 80l6 6 11-12" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary" />
      <rect x="182" y="18" width="40" height="24" rx="6" className={box} />
      <rect x="182" y="68" width="40" height="24" rx="6" className="fill-primary stroke-primary" />
      <rect x="182" y="118" width="40" height="24" rx="6" className={box} />
      <rect x="190" y="28" width="20" height="4" rx="2" className={ink} />
      <rect x="190" y="78" width="20" height="4" rx="2" className="fill-white/80" />
      <rect x="190" y="128" width="20" height="4" rx="2" className={ink} />
    </>
  );
}

function Integrations() {
  return (
    <>
      <path d="M62 40C96 40 92 80 120 80M62 120C96 120 92 80 120 80M178 40C144 40 148 80 120 80M178 120C144 120 148 80 120 80" fill="none" strokeWidth="1.5" className={line} />
      <path d="M62 40C96 40 92 80 120 80M178 120C144 120 148 80 120 80" fill="none" strokeWidth="1.5" strokeDasharray="3 4" className="stroke-primary/60" />
      {[
        [20, 24],
        [20, 104],
        [178, 24],
        [178, 104],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="42" height="32" rx="7" className={box} />
          <rect x={x + 8} y={y + 9} width="18" height="4" rx="2" className={ink} />
          <rect x={x + 8} y={y + 18} width="26" height="4" rx="2" className="fill-foreground/10" />
        </g>
      ))}
      <circle cx="120" cy="80" r="26" className="fill-primary/10" />
      <circle cx="120" cy="80" r="17" className="fill-primary" />
      <path d="M114 76h12M114 84h12M120 70v20" strokeWidth="2" strokeLinecap="round" className="stroke-white" />
    </>
  );
}

function Intelligence() {
  return (
    <>
      <rect x="24" y="16" width="96" height="128" rx="8" className={box} />
      <path d="M38 36h52M38 50h68M38 64h60M38 78h68M38 92h44M38 106h62M38 120h50" strokeWidth="3" strokeLinecap="round" className="stroke-foreground/10" />
      <rect x="30" y="58" width="84" height="26" rx="4" className="fill-primary/10 stroke-primary/40" />
      <path d="M120 71h22" strokeWidth="1.5" strokeDasharray="3 4" className="stroke-primary/60" />
      {[
        { y: 38, w: 58, accent: false },
        { y: 64, w: 70, accent: true },
        { y: 90, w: 50, accent: false },
      ].map(({ y, w, accent }) => (
        <g key={y}>
          <rect x="142" y={y} width={w + 18} height="20" rx="10" className={accent ? "fill-primary" : brandSoft} />
          <circle cx="152" cy={y + 10} r="3" className={accent ? "fill-white" : "fill-primary"} />
          <rect x="160" y={y + 8} width={w - 10} height="4" rx="2" className={accent ? "fill-white/80" : "fill-primary/40"} />
        </g>
      ))}
      <path d="M150 124l4-8 4 8-8-5h8z" className="fill-primary/60" />
    </>
  );
}

function Custom() {
  const cells = [
    [28, 22, 56, 50, "box"],
    [92, 22, 56, 50, "soft"],
    [156, 22, 56, 50, "box"],
    [28, 80, 88, 58, "soft"],
    [124, 80, 88, 58, "brand"],
  ] as const;
  return (
    <>
      {cells.map(([x, y, w, h, kind]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={w}
          height={h}
          rx="8"
          className={kind === "brand" ? brandSoft : kind === "soft" ? soft : box}
        />
      ))}
      <rect x="124" y="80" width="88" height="58" rx="8" strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="stroke-primary" />
      <path d="M160 109h16M168 101v16" strokeWidth="2.2" strokeLinecap="round" className="stroke-primary" />
      <rect x="38" y="34" width="22" height="4" rx="2" className={ink} />
      <rect x="102" y="34" width="28" height="4" rx="2" className={ink} />
      <rect x="166" y="34" width="20" height="4" rx="2" className={ink} />
      <rect x="38" y="94" width="36" height="4" rx="2" className={ink} />
    </>
  );
}

const visuals: Record<string, () => React.JSX.Element> = {
  "desarrollo-de-software": Software,
  "tiendas-virtuales": Store,
  automatizacion: Automation,
  integraciones: Integrations,
  "inteligencia-artificial": Intelligence,
  "desarrollo-a-medida": Custom,
};

export function ServiceVisual({ id, className }: { id: string; className?: string }) {
  const Visual = visuals[id];
  if (!Visual) return null;

  return (
    <svg viewBox="0 0 240 160" aria-hidden="true" className={cn("h-auto w-full", className)}>
      <Visual />
    </svg>
  );
}
