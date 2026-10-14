"use client";

import { useSearchParams } from "next/navigation";

import { ContactForm } from "@/components/ContactForm";
import { resolveInterestFrom, type InterestOption } from "@/lib/interest";

/** Preselecciona "¿Qué necesitas?" según la URL (?motivo=demo&producto=<slug>). */
export function ContactFormWithParams({
  contactEmail,
  interestOptions,
}: {
  contactEmail: string;
  interestOptions: InterestOption[];
}) {
  const params = useSearchParams();
  const interest = resolveInterestFrom(interestOptions, params.get("motivo"), params.get("producto"));
  return (
    <ContactForm
      key={interest}
      contactEmail={contactEmail}
      interestOptions={interestOptions}
      defaultInterest={interest}
    />
  );
}
