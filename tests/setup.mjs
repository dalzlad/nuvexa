// Resolución de módulos para `node --test` (se carga con --import en `npm test`).
// Next resuelve estos imports al compilar; fuera de Next hay que hacerlo aquí:
// - "server-only": Next lo trata internamente (no está en node_modules); en las pruebas no hace nada.
// - "@/…": alias de tsconfig hacia la raíz del proyecto, con extensión .ts.
import { registerHooks } from "node:module";

const root = new URL("../", import.meta.url);

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "server-only") return { url: "data:text/javascript,", shortCircuit: true };
    if (specifier.startsWith("@/")) return nextResolve(new URL(`${specifier.slice(2)}.ts`, root).href, context);
    return nextResolve(specifier, context);
  },
});
