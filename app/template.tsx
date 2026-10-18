import { ViewTransition } from "react";

/**
 * La plantilla se vuelve a montar en cada navegación: la página saliente y la entrante
 * se animan con la clase "page" (ver app/globals.css). Sin soporte del navegador, el cambio es inmediato.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
