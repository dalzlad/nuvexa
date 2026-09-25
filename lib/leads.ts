/**
 * Punto único de integración para solicitudes de contacto (leads).
 *
 * Hoy: si existe LEADS_WEBHOOK_URL, el lead se envía como JSON (POST) a esa URL
 * — sirve para Make, n8n, Zapier, un CRM o una API propia —.
 * Si no está configurada, NO se simula un envío: se devuelve "not-configured".
 *
 * Para conectar correo (Resend/SMTP) o un CRM específico, reemplaza el cuerpo de
 * deliverLead() sin tocar el formulario.
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

export type LeadDeliveryResult =
  | { delivered: true }
  | { delivered: false; reason: "not-configured" | "failed" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const limits: Record<LeadField, number> = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  interest: 80,
  message: 4000,
};

export function readLead(formData: FormData): Lead {
  const get = (key: LeadField) => String(formData.get(key) ?? "").trim().slice(0, limits[key]);
  return {
    name: get("name"),
    company: get("company"),
    email: get("email"),
    phone: get("phone"),
    interest: get("interest"),
    message: get("message"),
  };
}

export function validateLead(lead: Lead): Partial<Record<LeadField, string>> {
  const errors: Partial<Record<LeadField, string>> = {};
  if (!lead.name) errors.name = "Escribe tu nombre.";
  if (!lead.email) errors.email = "Escribe tu correo electrónico.";
  else if (!EMAIL_PATTERN.test(lead.email)) errors.email = "Revisa el formato del correo electrónico.";
  if (lead.phone && !/^[\d\s()+.-]{6,}$/.test(lead.phone)) errors.phone = "Revisa el número de teléfono.";
  if (!lead.interest) errors.interest = "Selecciona qué necesitas.";
  if (!lead.message) errors.message = "Cuéntanos brevemente tu necesidad.";
  return errors;
}

export async function deliverLead(lead: Lead): Promise<LeadDeliveryResult> {
  const endpoint = process.env.LEADS_WEBHOOK_URL;
  if (!endpoint) return { delivered: false, reason: "not-configured" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, source: "nuvexa-web", createdAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok ? { delivered: true } : { delivered: false, reason: "failed" };
  } catch {
    return { delivered: false, reason: "failed" };
  }
}
