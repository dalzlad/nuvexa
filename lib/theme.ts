/** Clave de localStorage con el tema elegido ("light" | "dark"). Sin valor se sigue al sistema. */
export const THEME_STORAGE_KEY = "nuvexa-theme";

/**
 * Script en línea que se ejecuta antes del primer pintado para aplicar el tema sin parpadeo.
 * Mientras la persona no elija un tema, sigue los cambios de tema del sistema.
 */
export const themeScript = `(() => {
  const key = ${JSON.stringify(THEME_STORAGE_KEY)};
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const stored = () => { try { return localStorage.getItem(key); } catch { return null; } };
  const apply = () => {
    const theme = stored() || (media.matches ? "dark" : "light");
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  };
  apply();
  media.addEventListener("change", () => { if (!stored()) apply(); });
})();`;
