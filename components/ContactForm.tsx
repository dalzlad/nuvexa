"use client";

import { useActionState, useRef, useState } from "react";
import { AlertCircle, ArrowRight, Check, Info, Loader2, Mail } from "lucide-react";
import Link from "next/link";

import { submitContact, type ContactFormState } from "@/app/contacto/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { interestLabelFrom, type InterestOption } from "@/lib/interest";
import { HONEYPOT_FIELD, leadLimits, readLead, SUBMISSION_ID_FIELD, type Lead, type LeadField } from "@/lib/lead-form";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

// Campos: 48px de alto en móvil (área táctil cómoda) y 44px desde sm.
const controlClass =
  "bg-background shadow-xs transition-[border-color,box-shadow] hover:border-foreground/25 focus-visible:border-primary focus-visible:ring-primary/15";
const fieldClass = cn("h-12 px-3.5 text-base sm:h-11 sm:text-sm", controlClass);

function buildMailto(contactEmail: string, interestOptions: InterestOption[], lead: Lead) {
  const interestLabel = (value: string) => interestLabelFrom(interestOptions, value);
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

/**
 * `contactEmail` llega desde el servidor (site.email): CONTACT_EMAIL no existe en el navegador.
 * `interestOptions` también llega desde el servidor (content/contact.ts), para no incluir el
 * catálogo de productos en el JavaScript del navegador.
 */
export function ContactForm({
  contactEmail,
  interestOptions,
  defaultInterest = "",
}: {
  contactEmail: string;
  interestOptions: InterestOption[];
  defaultInterest?: string;
}) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [interest, setInterest] = useState(defaultInterest);
  const formRef = useRef<HTMLFormElement>(null);

  const values = "values" in state ? state.values : undefined;
  const errors = state.status === "invalid" ? state.fieldErrors : {};

  if (state.status === "sent") {
    return (
      <div role="status" className="relative isolate overflow-hidden rounded-3xl border bg-card p-8 shadow-elevated sm:p-10">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 -z-10 size-64 rounded-full bg-[radial-gradient(closest-side,oklch(0.52_0.13_155/0.16),transparent)]"
        />
        <span className="flex size-12 items-center justify-center rounded-2xl bg-success text-white shadow-surface">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">Recibimos tu solicitud</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">Te responderemos al correo que nos indicaste.</p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          Volver al inicio
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
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
      <p id={`${name}-error`} className="flex items-start gap-1.5 text-sm text-destructive">
        <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        {errors[name]}
      </p>
    );

  return (
    <form ref={formRef} action={formAction} className="relative rounded-3xl border bg-card p-5 shadow-elevated sm:p-8 lg:p-10" aria-describedby="form-nota">
      {/* Al reintentar se reenvía el mismo identificador para que el destino pueda descartar duplicados. */}
      {"submissionId" in state && state.submissionId && (
        <input type="hidden" name={SUBMISSION_ID_FIELD} value={state.submissionId} />
      )}
      {/* Campo trampa para bots: fuera de la vista y oculto para lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>No completes este campo</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 flex w-full items-center gap-3 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          <span className="text-primary">01</span> Tus datos
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </legend>
        <div className="grid content-start gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input {...fieldProps("name")} className={fieldClass} autoComplete="name" required />
          {fieldError("name")}
        </div>

        <div className="grid content-start gap-2">
          <Label htmlFor="company">
            Empresa <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input {...fieldProps("company")} className={fieldClass} autoComplete="organization" />
          {fieldError("company")}
        </div>

        <div className="grid content-start gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input {...fieldProps("email")} type="email" className={fieldClass} autoComplete="email" required />
          {fieldError("email")}
        </div>

        <div className="grid content-start gap-2">
          <Label htmlFor="phone">
            Teléfono <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input {...fieldProps("phone")} type="tel" className={fieldClass} autoComplete="tel" />
          {fieldError("phone")}
        </div>
      </fieldset>

      <fieldset className="mt-9 grid gap-5">
        <legend className="mb-5 flex w-full items-center gap-3 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          <span className="text-primary">02</span> Tu solicitud
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </legend>
        <div className="grid content-start gap-2">
          <Label htmlFor="interest">¿Qué necesitas?</Label>
          <Select name="interest" value={interest} onValueChange={setInterest} required>
            <SelectTrigger
              id="interest"
              aria-invalid={errors.interest ? true : undefined}
              aria-describedby={errors.interest ? "interest-error" : undefined}
              className={cn("w-full px-3.5 text-base data-[size=default]:h-12 sm:text-sm sm:data-[size=default]:h-11", controlClass)}
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

        <div className="grid content-start gap-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            {...fieldProps("message")}
            rows={5}
            className={cn("min-h-36 px-3.5 py-3 text-base sm:text-sm", controlClass)}
            placeholder="Cuéntanos sobre tu empresa y el proceso que quieres mejorar."
            required
          />
          {fieldError("message")}
        </div>
      </fieldset>

      {(state.status === "not-configured" || state.status === "failed" || state.status === "rate-limited") && values && (
        <div role="alert" className="mt-6 flex gap-3 rounded-2xl border border-amber-600/20 bg-amber-50 p-4 sm:p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
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
              href={buildMailto(contactEmail, interestOptions, values)}
              onClick={(event) => {
                // Usa lo que hay ahora en el formulario, por si la persona lo editó tras el error.
                if (formRef.current) {
                  event.currentTarget.href = buildMailto(contactEmail, interestOptions, readLead(new FormData(formRef.current)));
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

      <div className="mt-8 flex flex-col-reverse gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-nota" className="text-xs leading-relaxed text-muted-foreground">
          Todos los campos son obligatorios, salvo los indicados como opcionales.
        </p>
        <Button type="submit" size="xl" disabled={pending} className={cn("w-full sm:w-auto", pending && "opacity-80")}>
          {pending ? (
            <>
              <Loader2 data-icon="inline-start" className="animate-spin" aria-hidden="true" />
              Enviando…
            </>
          ) : (
            <>
              Enviar solicitud
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
