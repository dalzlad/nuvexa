/**
 * Campos del formulario de contacto: tipos, límites, lectura/normalización y validación.
 *
 * Seguro para el cliente: no lee variables de entorno ni hace llamadas de red.
 * ContactForm lo usa para los límites, el campo trampa y el correo alternativo;
 * la acción del servidor, para validar. El envío está en lib/leads.ts (solo servidor).
 */

export interface Lead {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export type LeadField = keyof Lead;

/** Campo oculto que una persona no ve ni rellena; si llega con contenido, es un bot. */
export const HONEYPOT_FIELD = "website";

/** Identificador de la solicitud: se reutiliza al reintentar para que el destino pueda descartar duplicados. */
export const SUBMISSION_ID_FIELD = "submissionId";

// Sin espacios, comillas, comas, punto y coma ni <>: el correo se usa como reply-to y no debe
// poder convertirse en una lista de direcciones ni en una dirección con nombre.
export const EMAIL_PATTERN = /^[^\s@<>,;:"'()[\]\\]+@[^\s@<>,;:"'()[\]\\]+\.[^\s@<>,;:"'()[\]\\]{2,}$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const leadLimits: Record<LeadField, number> = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  interest: 80,
  message: 4000,
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Una línea: sin caracteres de control ni saltos de línea, espacios colapsados. */
function singleLine(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Texto libre: conserva saltos de línea y tabulaciones, elimina el resto de caracteres de control. */
function multiLine(value: string) {
  return (
    value
      .replace(/\r\n?/g, "\n")
      .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

/**
 * Lee y normaliza los campos. Corta cada valor un carácter por encima del límite
 * para acotar la memoria y que validateLead() pueda informar que el texto es demasiado largo.
 */
export function readLead(formData: FormData): Lead {
  const get = (key: LeadField) => {
    const raw = readString(formData, key);
    const value = key === "message" ? multiLine(raw) : singleLine(raw);
    return value.slice(0, leadLimits[key] + 1);
  };
  return {
    name: get("name"),
    company: get("company"),
    email: get("email").toLowerCase(),
    phone: get("phone"),
    interest: get("interest"),
    message: get("message"),
  };
}

export function isHoneypotFilled(formData: FormData) {
  return readString(formData, HONEYPOT_FIELD).trim() !== "";
}

/** Devuelve el identificador recibido si es válido; si no, genera uno nuevo. */
export function readSubmissionId(formData: FormData) {
  const value = readString(formData, SUBMISSION_ID_FIELD);
  return UUID_PATTERN.test(value) ? value.toLowerCase() : crypto.randomUUID();
}

export function validateLead(lead: Lead, allowedInterests: readonly string[]): Partial<Record<LeadField, string>> {
  const errors: Partial<Record<LeadField, string>> = {};
  const tooLong = (field: LeadField) => lead[field].length > leadLimits[field];

  if (!lead.name) errors.name = "Escribe tu nombre.";
  else if (tooLong("name")) errors.name = `Usa como máximo ${leadLimits.name} caracteres.`;

  if (tooLong("company")) errors.company = `Usa como máximo ${leadLimits.company} caracteres.`;

  if (!lead.email) errors.email = "Escribe tu correo electrónico.";
  else if (tooLong("email") || !EMAIL_PATTERN.test(lead.email)) errors.email = "Revisa el formato del correo electrónico.";

  if (lead.phone && (tooLong("phone") || !/^[\d\s()+.-]{6,}$/.test(lead.phone))) {
    errors.phone = "Revisa el número de teléfono.";
  }

  if (!lead.interest || !allowedInterests.includes(lead.interest)) errors.interest = "Selecciona qué necesitas.";

  if (!lead.message) errors.message = "Cuéntanos brevemente tu necesidad.";
  else if (tooLong("message")) errors.message = `Usa como máximo ${leadLimits.message} caracteres.`;

  return errors;
}
