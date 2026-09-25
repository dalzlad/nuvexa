"use server";

import { deliverLead, readLead, validateLead, type Lead, type LeadField } from "@/lib/leads";

export type ContactFormState =
  | { status: "idle" }
  | { status: "invalid"; values: Lead; fieldErrors: Partial<Record<LeadField, string>> }
  | { status: "sent" }
  | { status: "not-configured" | "failed"; values: Lead };

export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const lead = readLead(formData);
  const fieldErrors = validateLead(lead);
  if (Object.keys(fieldErrors).length > 0) return { status: "invalid", values: lead, fieldErrors };

  const result = await deliverLead(lead);
  if (result.delivered) return { status: "sent" };
  return { status: result.reason, values: lead };
}
