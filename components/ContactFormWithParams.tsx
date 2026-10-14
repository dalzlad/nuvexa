"use client";

import { useSearchParams } from "next/navigation";

import { ContactForm } from "@/components/ContactForm";
import { resolveInterest } from "@/content/contact";

/** Preselecciona "¿Qué necesitas?" según la URL (?motivo=demo&producto=pedidoflow). */
export function ContactFormWithParams({ contactEmail }: { contactEmail: string }) {
  const params = useSearchParams();
  const interest = resolveInterest(params.get("motivo"), params.get("producto"));
  return <ContactForm key={interest} contactEmail={contactEmail} defaultInterest={interest} />;
}
