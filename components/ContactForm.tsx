"use client";

import { useActionState, useRef, useState } from "react";
import { CheckCircle2, Info, Mail } from "lucide-react";

import { submitContact, type ContactFormState } from "@/app/contacto/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { interestLabel, interestOptions } from "@/content/contact";
import { HONEYPOT_FIELD, leadLimits, readLead, SUBMISSION_ID_FIELD, type Lead, type LeadField } from "@/lib/lead-form";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

const fieldClass = "h-11 px-3 text-base sm:text-sm";

function buildMailto(contactEmail: string, lead: Lead) {
  const lines = [
    `Nombre: ${lead.name}`,
    lead.company ? `Empresa: ${lead.company}` : null,
    `Correo: ${lead.email}`,
    lead.phone ? `Teléfono: ${lead.phone}` : null,
    `Necesidad: ${interestLabel(lead.interest)}`,
    "",
    lead.message,
  ].filter((line) => line !== null);
  const subject = `Solicitud: ${interestLabel(lead.interest)}`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

/** `contactEmail` llega desde el servidor (site.email): CONTACT_EMAIL no existe en el navegador. */
export function ContactForm({ contactEmail, defaultInterest = "" }: { contactEmail: string; defaultInterest?: string }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [interest, setInterest] = useState(defaultInterest);
  const formRef = useRef<HTMLFormElement>(null);

  const values = "values" in state ? state.values : undefined;
  const errors = state.status === "invalid" ? state.fieldErrors : {};

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-xl border bg-card p-8">
        <CheckCircle2 className="size-6 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold text-foreground">Recibimos tu solicitud</h2>
        <p className="mt-2 text-muted-foreground">Te responderemos al correo que nos indicaste.</p>
      </div>
    );
  }

  const fieldProps = (name: LeadField) => ({
    id: name,
    name,
    defaultValue: values?.[name],
    maxLength: leadLimits[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const fieldError = (name: LeadField) =>
    errors[name] && (
      <p id={`${name}-error`} className="text-sm text-destructive">
        {errors[name]}
      </p>
    );

  return (
    <form ref={formRef} action={formAction} className="relative rounded-xl border bg-card p-6 sm:p-8" aria-describedby="form-nota">
      {/* Al reintentar se reenvía el mismo identificador para que el destino pueda descartar duplicados. */}
      {"submissionId" in state && state.submissionId && (
        <input type="hidden" name={SUBMISSION_ID_FIELD} value={state.submissionId} />
      )}
      {/* Campo trampa para bots: fuera de la vista y oculto para lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>No completes este campo</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input {...fieldProps("name")} className={fieldClass} autoComplete="name" required />
          {fieldError("name")}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="company">
            Empresa <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input {...fieldProps("company")} className={fieldClass} autoComplete="organization" />
          {fieldError("company")}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input {...fieldProps("email")} type="email" className={fieldClass} autoComplete="email" required />
          {fieldError("email")}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">
            Teléfono <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input {...fieldProps("phone")} type="tel" className={fieldClass} autoComplete="tel" />
          {fieldError("phone")}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="interest">¿Qué necesitas?</Label>
          <Select name="interest" value={interest} onValueChange={setInterest} required>
            <SelectTrigger
              id="interest"
              aria-invalid={errors.interest ? true : undefined}
              aria-describedby={errors.interest ? "interest-error" : undefined}
              className="w-full px-3 text-base data-[size=default]:h-11 sm:text-sm"
            >
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent position="popper">
              {interestOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="py-2">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError("interest")}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            {...fieldProps("message")}
            rows={5}
            className="min-h-32 px-3 text-base sm:text-sm"
            placeholder="Cuéntanos sobre tu empresa y el proceso que quieres mejorar."
            required
          />
          {fieldError("message")}
        </div>
      </div>

      {(state.status === "not-configured" || state.status === "failed" || state.status === "rate-limited") && values && (
        <div role="alert" className="mt-6 flex gap-3 rounded-lg border bg-muted/60 p-4">
          <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div className="text-sm leading-relaxed">
            <p className="font-medium text-foreground">
              {state.status === "not-configured"
                ? "El envío automático de este formulario aún no está habilitado."
                : state.status === "rate-limited"
                  ? "Recibimos varias solicitudes seguidas desde tu conexión. Espera unos minutos para intentarlo de nuevo."
                  : "No pudimos enviar tu solicitud en este momento."}
            </p>
            <p className="mt-1 text-muted-foreground">
              Tu solicitud no se ha enviado. Puedes enviarnos la misma información por correo:
            </p>
            <a
              href={buildMailto(contactEmail, values)}
              onClick={(event) => {
                // Usa lo que hay ahora en el formulario, por si la persona lo editó tras el error.
                if (formRef.current) {
                  event.currentTarget.href = buildMailto(contactEmail, readLead(new FormData(formRef.current)));
                }
              }}
              className="mt-3 inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
            >
              <Mail className="size-4" aria-hidden="true" />
              Enviar por correo a {contactEmail}
            </a>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-nota" className="text-xs text-muted-foreground">
          Todos los campos son obligatorios, salvo los indicados como opcionales.
        </p>
        <Button type="submit" size="xl" disabled={pending} className={cn("w-full sm:w-auto", pending && "opacity-80")}>
          {pending ? "Enviando…" : "Enviar solicitud"}
        </Button>
      </div>
    </form>
  );
}
