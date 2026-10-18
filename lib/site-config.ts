/**
 * Configuración pública del sitio: dominio y correo de contacto.
 *
 * En producción, SITE_URL y CONTACT_EMAIL son obligatorias:
 * content/site.ts llama a resolveSiteConfig() y el build falla con un mensaje claro
 * si faltan o no son válidas.
 * En desarrollo se usan valores locales que nunca llegan a una compilación de producción.
 *
 * Los mensajes de error nunca incluyen los valores recibidos.
 */

export interface SiteConfigInput {
  url: string | undefined;
  email: string | undefined;
}

export interface SiteConfig {
  url: string;
  email: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isLocalHostname(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname === "0.0.0.0" ||
    hostname === "[::1]" ||
    /^127\./.test(hostname)
  );
}

function siteUrlError(value: string): string | null {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return "SITE_URL debe ser una URL absoluta (p. ej. https://<dominio>).";
  }
  if (url.protocol !== "https:") return "SITE_URL debe usar https://.";
  if (isLocalHostname(url.hostname)) return "SITE_URL no puede apuntar a localhost ni a una dirección local.";
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    return "SITE_URL debe contener solo el dominio, sin ruta, parámetros ni credenciales.";
  }
  return null;
}

function contactEmailError(value: string): string | null {
  if (value.length > 254 || !EMAIL_PATTERN.test(value)) {
    return "CONTACT_EMAIL no tiene un formato de correo válido.";
  }
  return null;
}

/** Lista de problemas de la configuración de producción (vacía si es válida). */
export function siteConfigErrors({ url, email }: SiteConfigInput): string[] {
  const errors: string[] = [];
  const siteUrl = url?.trim();
  const contactEmail = email?.trim();

  if (!siteUrl) errors.push("SITE_URL no está definida.");
  else {
    const error = siteUrlError(siteUrl);
    if (error) errors.push(error);
  }

  if (!contactEmail) errors.push("CONTACT_EMAIL no está definida.");
  else {
    const error = contactEmailError(contactEmail);
    if (error) errors.push(error);
  }

  return errors;
}

export function formatSiteConfigErrors(errors: string[]) {
  return [
    "Configuración de producción incompleta o no válida:",
    ...errors.map((error) => `  - ${error}`),
    "Defínelas en las variables de entorno del hosting o en .env.local (ver .env.example).",
  ].join("\n");
}

/**
 * Devuelve la configuración del sitio. En producción exige valores válidos;
 * en desarrollo completa los que falten con valores locales.
 */
export function resolveSiteConfig(input: SiteConfigInput): SiteConfig {
  // Next sustituye NODE_ENV al compilar: esta rama y sus valores locales
  // se eliminan del build de producción.
  if (process.env.NODE_ENV !== "production") {
    return {
      url: (input.url?.trim() || "http://localhost:3000").replace(/\/$/, ""),
      // Dominio reservado (RFC 2606): deja claro en desarrollo que falta configurar el correo.
      email: input.email?.trim() || "correo-no-configurado@example.invalid",
    };
  }

  const errors = siteConfigErrors(input);
  if (errors.length > 0) throw new Error(formatSiteConfigErrors(errors));

  return { url: new URL(input.url!.trim()).origin, email: input.email!.trim() };
}
