# NUVEXA — Sitio web

Sitio oficial de NUVEXA: software empresarial, productos SaaS y desarrollo a medida.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui (Radix) · Lucide · `cn()` con clsx + tailwind-merge (`lib/utils.ts`).

## Ejecutar

```bash
npm ci
npm run dev        # desarrollo en http://localhost:3000
npm run lint
npm run typecheck  # genera los tipos de rutas de Next y ejecuta tsc (no requiere build previo)
npm test           # pruebas del formulario de contacto (runner integrado de Node)
npm run build && npm start
```

Copia `.env.example` a `.env.local` y completa:

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio público (metadata, canonical, Open Graph, sitemap, robots). **Obligatoria en producción**: `https://`, sin ruta y sin localhost. |
| `CONTACT_EMAIL` | Correo de contacto que se muestra en el sitio, del dominio. **Obligatoria en producción.** Se lee en el servidor; los componentes del cliente lo reciben como prop. |
| `RESEND_API_KEY` | Clave de Resend para enviar las solicitudes del formulario por correo. Solo del servidor. |
| `LEADS_EMAIL_TO` | Correo(s) que reciben las solicitudes, separados por comas. Obligatoria si se usa Resend. |
| `LEADS_EMAIL_FROM` | Opcional. Remitente en un dominio verificado en Resend. Vacía = `onboarding@resend.dev` (solo entrega al correo de la cuenta de Resend). |
| `LEADS_WEBHOOK_URL` | Opcional. Alternativa a Resend: destino del formulario (POST JSON). Solo se usa si no hay `RESEND_API_KEY`. |

Sin `RESEND_API_KEY` ni `LEADS_WEBHOOK_URL`, el formulario no envía nada y ofrece escribir por correo. Ninguna de estas variables lleva el prefijo `NEXT_PUBLIC_`.

`content/site.ts` es solo del servidor (`server-only`): un componente del cliente que lo importe hace fallar el build. Si necesita datos de `site`, recíbelos como prop.

`npm run build` falla con un mensaje claro si faltan las variables obligatorias o no son válidas (validación en `lib/site-config.ts`). En `npm run dev` se usan valores locales de desarrollo.

## Estructura

```text
app/
  page.tsx                  Portada (sección principal de portada, productos, problemas, servicios)
  productos/page.tsx        Listado de productos
  productos/[slug]/page.tsx Página de cada producto (generada desde content/products.ts)
  servicios/ empresa/ contacto/
  contacto/actions.ts       Server Action del formulario
  sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
components/                 Componentes reutilizables (MainCover, ProductCard, ProcessFlow, CTASection…)
components/ui/              Componentes shadcn/ui
content/                    Todo el contenido editable: site, products, services, values, navigation, contact
lib/leads.ts                Punto único de integración de leads (webhook, correo, CRM). Solo servidor
lib/lead-form.ts            Campos, límites y validación del formulario (seguro para el cliente)
lib/rate-limit.ts           Límite de envíos del formulario (en memoria)
tests/                      Pruebas del formulario (node --test)
lib/metadata.ts             Metadata SEO por página
```

## Tareas frecuentes

**Agregar un producto:** añade una entrada en `content/products.ts`.
- `status: "available"` + `detail` → se crea `/productos/<slug>` automáticamente, aparece en portada, listado, pie de página, formulario de contacto y sitemap.
- `status: "coming-soon"` → aparece como "Próximamente", sin página de detalle.

**Agregar un servicio:** añade una entrada en `content/services.ts` (se refleja en `/servicios`, portada, pie de página y formulario).

**Agregar una sección futura (`/pricing`, `/blog`, `/soporte`, `/login`):** crea la carpeta en `app/`, agrega el enlace en `content/navigation.ts` (`mainNav`) y la ruta en `staticRoutes` para el sitemap.

**Conectar el formulario:** `deliverLead()` en `lib/leads.ts` usa el primer destino configurado: correo con Resend (`RESEND_API_KEY` + `LEADS_EMAIL_TO`) o webhook (`LEADS_WEBHOOK_URL`).

Envío por correo (Resend):
- Se envía un correo de texto plano (sin HTML) con los datos del formulario. El `reply-to` es el correo del visitante, ya validado, así que basta con responder.
- Solo cuenta como enviado si Resend responde `2xx` con el `id` del correo. Cualquier otro caso (clave inválida, dominio sin verificar, límite de envíos, más de 10 s) muestra que la solicitud no se envió y ofrece escribir por correo.
- Un reintento idéntico usa la misma `Idempotency-Key`, y Resend no duplica el correo durante 24 h.
- Sin dominio verificado, el remitente es `onboarding@resend.dev` y Resend **solo entrega al correo con el que se creó la cuenta**. Para enviar a otras direcciones o usar un remitente propio, verifica el dominio en Resend (registros DNS) y define `LEADS_EMAIL_FROM`.
- Plan gratuito de Resend: 3.000 correos al mes y 100 al día.
- Si falla, en Vercel → Logs aparece `[leads] Resend respondió <estado> (<error>)`: `401` = clave inválida; `403 validation_error` = destinatario no permitido sin dominio verificado; `429` = límite.

Contrato del webhook:
- Recibe un `POST` JSON con `name`, `company`, `email`, `phone`, `interest`, `interestLabel`, `message`, `submissionId`, `source` y `createdAt`, y la cabecera `Idempotency-Key` (igual a `submissionId`).
- Solo una respuesta `2xx` cuenta como entregada. Un error, una redirección o más de 10 s sin respuesta muestran al visitante que la solicitud no se envió y le ofrecen escribir por correo.
- Si la persona reintenta tras un fallo, se reenvía el mismo `submissionId`: el destino debe usarlo para descartar duplicados (p. ej. cuando el primer intento sí llegó pero tardó más de 10 s).
- Los fallos quedan en los registros del servidor (Vercel → Logs) con el prefijo `[leads]`, sin datos personales.

Protección contra abuso: validación y normalización en el servidor, campo trampa oculto (`website`), límite de 5 envíos cada 10 minutos por IP (en memoria, por instancia) y la comprobación de origen que Next aplica a los Server Actions.

**Pruebas:** `npm test` ejecuta las pruebas de `tests/` con el runner integrado de Node (validación, envío con Resend y webhook simulados —no se envían correos reales— y límite de envíos).

## Reglas de contenido

- Todo el contenido en español.
- No publicar clientes, testimonios, cifras, precios, certificaciones ni funcionalidades que no existan.
- La primera sección de la portada es la "sección principal de portada" (`components/MainCover.tsx`).
