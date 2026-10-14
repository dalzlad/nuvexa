/**
 * Punto único de integración para solicitudes de contacto (leads). Solo servidor.
 *
 * Destino (se usa el primero configurado):
 * 1. Correo con Resend (RESEND_API_KEY + LEADS_EMAIL_TO, opcional LEADS_EMAIL_FROM).
 * 2. Webhook (LEADS_WEBHOOK_URL): POST JSON para Make, n8n, Zapier, un CRM o una API propia.
 * Si no hay ninguno, NO se simula un envío: se devuelve "not-configured".
 *
 * Todas las variables son solo del servidor (sin prefijo NEXT_PUBLIC_).
 * `server-only` hace fallar el build si un componente del cliente importa este archivo.
 * Los campos del formulario están en lib/lead-form.ts.
 */

import "server-only";

import { EMAIL_PATTERN, type Lead } from "@/lib/lead-form";

export type LeadDeliveryResult =
  | { delivered: true }
  | { delivered: false; reason: "not-configured" | "failed" };

export interface LeadDeliveryContext {
  submissionId: string;
  interestLabel: string;
}

export async function deliverLead(lead: Lead, context: LeadDeliveryContext): Promise<LeadDeliveryResult> {
  if (process.env.RESEND_API_KEY?.trim()) return deliverByEmail(lead, context);
  if (process.env.LEADS_WEBHOOK_URL?.trim()) return deliverByWebhook(lead, context);
  console.error("[leads] No hay destino configurado (RESEND_API_KEY o LEADS_WEBHOOK_URL): la solicitud no se entregó.");
  return { delivered: false, reason: "not-configured" };
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";
/** Remitente de pruebas de Resend: solo entrega al correo de la cuenta de Resend. */
const RESEND_TEST_SENDER = "NUVEXA <onboarding@resend.dev>";
const SENDER_PATTERN = /^(?:[^<>\r\n"]{1,80} )?<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$|^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function emailRecipients(value: string | undefined) {
  const list = (value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
  return list.length > 0 && list.length <= 5 && list.every((item) => EMAIL_PATTERN.test(item)) ? list : null;
}

/** Contenido del correo en texto plano: sin HTML, así no hay marcado del visitante que interpretar. */
export function buildLeadEmail(lead: Lead, { interestLabel, submissionId }: LeadDeliveryContext) {
  const lines = [
    `Nombre: ${lead.name}`,
    `Empresa: ${lead.company || "—"}`,
    `Correo: ${lead.email}`,
    `Teléfono: ${lead.phone || "—"}`,
    `Necesidad: ${interestLabel}`,
    "",
    "Mensaje:",
    lead.message,
    "",
    "—",
    `Enviado desde el formulario de contacto del sitio web. Referencia: ${submissionId}`,
    "Responde a este correo para contestar directamente a quien escribió.",
  ];
  // Nombre e interés ya son de una sola línea (readLead / lista cerrada).
  const subject = `Nueva solicitud: ${interestLabel} — ${lead.name}`.slice(0, 200);
  return { subject, text: lines.join("\n") };
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function deliverByEmail(lead: Lead, context: LeadDeliveryContext): Promise<LeadDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY!.trim();
  const to = emailRecipients(process.env.LEADS_EMAIL_TO);
  const from = process.env.LEADS_EMAIL_FROM?.trim() || RESEND_TEST_SENDER;

  if (!to) {
    console.error("[leads] LEADS_EMAIL_TO falta o no es válida: la solicitud no se entregó.");
    return { delivered: false, reason: "not-configured" };
  }
  if (!SENDER_PATTERN.test(from)) {
    console.error("[leads] LEADS_EMAIL_FROM no es válida: la solicitud no se entregó.");
    return { delivered: false, reason: "not-configured" };
  }

  const { subject, text } = buildLeadEmail(lead, context);
  const body = JSON.stringify({ from, to, subject, text, reply_to: lead.email });
  // Un reintento idéntico reutiliza la clave y Resend no duplica el correo (24 h).
  // Si la persona cambió los datos, la clave cambia: Resend rechaza (409) la misma clave con otro contenido.
  const idempotencyKey = `lead-${context.submissionId}-${(await sha256Hex(body)).slice(0, 32)}`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const result: unknown = await response.json().catch(() => null);
    const id = result && typeof result === "object" && "id" in result ? result.id : null;
    if (response.ok && typeof id === "string" && id) return { delivered: true };

    const name = result && typeof result === "object" && "name" in result ? String(result.name) : "sin detalle";
    console.error(`[leads] Resend respondió ${response.status} (${name}): la solicitud ${context.submissionId} no se entregó.`);
    return { delivered: false, reason: "failed" };
  } catch (error) {
    const kind = error instanceof Error ? error.name : "Error";
    console.error(`[leads] Error de red al llamar a Resend (${kind}): la solicitud ${context.submissionId} no se entregó.`);
    return { delivered: false, reason: "failed" };
  }
}

async function deliverByWebhook(lead: Lead, { submissionId, interestLabel }: LeadDeliveryContext): Promise<LeadDeliveryResult> {
  const endpoint = process.env.LEADS_WEBHOOK_URL!.trim();
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Idempotency-Key": submissionId },
      body: JSON.stringify({
        ...lead,
        interestLabel,
        submissionId,
        source: "nuvexa-web",
        createdAt: new Date().toISOString(),
      }),
      // Una redirección suele indicar una URL mal configurada (p. ej. una página de inicio de sesión):
      // no se sigue, y la entrega cuenta como fallida.
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) return { delivered: true };
    console.error(`[leads] El webhook respondió ${response.status}: la solicitud ${submissionId} no se entregó.`);
    return { delivered: false, reason: "failed" };
  } catch (error) {
    const kind = error instanceof Error ? error.name : "Error";
    console.error(`[leads] Error de red al llamar al webhook (${kind}): la solicitud ${submissionId} no se entregó.`);
    return { delivered: false, reason: "failed" };
  }
}
