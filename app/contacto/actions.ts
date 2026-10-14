"use server";

import { headers } from "next/headers";

import { interestLabel, interestOptions } from "@/content/contact";
import { isHoneypotFilled, readLead, readSubmissionId, validateLead, type Lead, type LeadField } from "@/lib/lead-form";
import { deliverLead } from "@/lib/leads";
import { createRateLimiter } from "@/lib/rate-limit";

export type ContactFormState =
  | { status: "idle" }
  | { status: "invalid"; values: Lead; fieldErrors: Partial<Record<LeadField, string>>; submissionId?: string }
  | { status: "sent" }
  | { status: "not-configured" | "failed" | "rate-limited"; values: Lead; submissionId: string };

const allowedInterests = interestOptions.map((option) => option.value);

// 5 envíos válidos cada 10 minutos por IP (por instancia del servidor).
const allowSubmission = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

async function clientIp() {
  const list = await headers();
  return list.get("x-forwarded-for")?.split(",")[0]?.trim() || list.get("x-real-ip")?.trim() || null;
}

export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const lead = readLead(formData);
  const submissionId = readSubmissionId(formData);

  const fieldErrors = validateLead(lead, allowedInterests);
  if (Object.keys(fieldErrors).length > 0) return { status: "invalid", values: lead, fieldErrors, submissionId };

  // Bot: no se entrega. Se responde como un fallo (no como éxito) por si una persona
  // lo activara con el autocompletado: así aún ve la opción de escribir por correo.
  if (isHoneypotFilled(formData)) {
    console.warn("[leads] Solicitud descartada: campo trampa con contenido.");
    return { status: "failed", values: lead, submissionId };
  }

  const ip = await clientIp();
  if (ip && !allowSubmission(ip)) {
    console.warn("[leads] Solicitud rechazada por límite de envíos.");
    return { status: "rate-limited", values: lead, submissionId };
  }

  const result = await deliverLead(lead, { submissionId, interestLabel: interestLabel(lead.interest) });
  if (result.delivered) return { status: "sent" };
  return { status: result.reason, values: lead, submissionId };
}
