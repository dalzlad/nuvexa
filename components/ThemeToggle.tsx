"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Alterna entre modo claro y oscuro. El tema inicial lo fija el script de app/layout.tsx
 * antes de pintar (preferencia guardada o la del sistema), así que este botón no necesita
 * estado: los iconos y la etiqueta se muestran según la clase `dark` del documento.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    const apply = () => {
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
    };
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Almacenamiento no disponible (modo privado): el cambio dura lo que la visita.
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && "startViewTransition" in document) document.startViewTransition(apply);
    else apply();
  }

  return (
    <Button variant="ghost" size="icon-lg" onClick={toggle} className={cn("size-10 rounded-full", className)}>
      <Moon className="size-[1.15rem] dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-[1.15rem] dark:block" aria-hidden="true" />
      <span className="sr-only dark:hidden">Activar modo oscuro</span>
      <span className="sr-only hidden dark:inline">Activar modo claro</span>
    </Button>
  );
}
