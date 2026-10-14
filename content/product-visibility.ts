/**
 * Productos fuera del sitio público hasta que se autorice su publicación.
 *
 * Módulo sin dependencias: lo usan content/products.ts (catálogo, navegación,
 * sitemap y formulario) y next.config.ts (redirección temporal de su URL).
 * Para publicar un producto basta con quitar su slug de esta lista.
 */
export const hiddenProductSlugs: readonly string[] = ["pedidoflow"];
