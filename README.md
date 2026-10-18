# NUVEXA — Sitio web

Sitio oficial de NUVEXA, empresa de software: desarrollo de software a medida, automatización de procesos, integración de sistemas e inteligencia artificial aplicada a procesos empresariales.

NUVEXA también desarrolla productos SaaS propios. Hoy ninguno está disponible comercialmente: el catálogo los muestra como **"Próximamente"** y el sitio no les atribuye funcionalidades.

**Stack:** Next.js 16 (App Router, Server Actions) · React 19 · TypeScript · Tailwind CSS 4 (+ `tw-animate-css`) · shadcn/ui sobre Radix · `class-variance-authority` · Lucide · `cn()` con clsx + tailwind-merge (`lib/utils.ts`) · fuentes Geist y Geist Mono (`next/font/google`).

## Ejecutar

```bash
npm ci
npm run dev        # desarrollo en http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # genera los tipos de rutas de Next y ejecuta tsc (no requiere build previo)
npm test           # pruebas del formulario y de la configuración del sitio (runner integrado de Node)
npm run build && npm start
```

`npm run build` exige `SITE_URL` y `CONTACT_EMAIL` (ver abajo). Para compilar en local sin `.env.local`, pásalas solo a ese comando, por ejemplo:

```bash
SITE_URL=https://<dominio> CONTACT_EMAIL=<correo> npm run build
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

| Variable | Uso |
|---|---|
| `SITE_URL` | Dominio público (metadata, canonical, Open Graph, sitemap, robots). **Obligatoria en producción**: `https://`, sin ruta y sin localhost. |
| `CONTACT_EMAIL` | Correo de contacto que se muestra en el sitio (pie de página, `/contacto` y respaldo del formulario), del dominio. **Obligatoria en producción.** Se lee en el servidor; los componentes del cliente lo reciben como prop. Se publica en el HTML: no es un secreto. |
| `RESEND_API_KEY` | Clave de Resend para enviar las solicitudes del formulario por correo. Solo del servidor. |
| `LEADS_EMAIL_TO` | Correo(s) que reciben las solicitudes, separados por comas (máximo 5). Obligatoria si se usa Resend. |
| `LEADS_EMAIL_FROM` | Opcional. Remitente en un dominio verificado en Resend (`correo@dominio` o `Nombre <correo@dominio>`). Vacía = `onboarding@resend.dev` (solo entrega al correo de la cuenta de Resend). |
| `LEADS_WEBHOOK_URL` | Opcional. Alternativa a Resend: destino del formulario (POST JSON). Solo se usa si no hay `RESEND_API_KEY`. |

- Ninguna de estas variables lleva el prefijo `NEXT_PUBLIC_`: todas se leen solo en el servidor.
- Sin `RESEND_API_KEY` ni `LEADS_WEBHOOK_URL`, el formulario no envía nada y ofrece escribir por correo.
- `npm run build` falla con un mensaje claro si faltan las variables obligatorias o no son válidas (validación en `lib/site-config.ts`). En `npm run dev` se usan valores locales: `http://localhost:3000` y `correo-no-configurado@example.invalid`.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Portada: sección principal con ilustración conceptual (`MainCover` + `HeroVisual`), capacidades en mosaico (`ServicesSection`), problema empresarial sobre fondo oscuro (`ProblemsSection`), enfoque de trabajo con etapas y principios (`ApproachSection`), franja de productos con su estado (`ProductsSection`) y llamada a la acción (`CTASection`). |
| `/servicios` | Encabezado con índice de servicios, un bloque por servicio (problema, qué construimos, ejemplos, enlace al formulario con el motivo preseleccionado; ancla `#<id>`), etapas de trabajo y llamada a la acción. |
| `/empresa` | Presentación, "Quiénes somos" (`content/company.ts`), las dos formas de trabajo (productos propios y soluciones a medida), valores (`content/values.ts`) y llamada a la acción. |
| `/productos` | Catálogo: productos disponibles (si los hay), productos en desarrollo con su estado, bloque de desarrollo a medida y una llamada a la acción que cambia según haya o no productos disponibles. |
| `/productos/<slug>` | Página de producto disponible o página "Próximamente" (ver [Productos](#productos)). |
| `/contacto` | Introducción, formulario, "Cómo seguimos" y correo de contacto. |
| `not-found.tsx` | Página 404 con accesos a las secciones principales. |

También: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (imagen Open Graph generada) e `icon.svg`. La metadata de cada página se arma con `pageMetadata()` (`lib/metadata.ts`): título, descripción, canonical, Open Graph y Twitter.

## Estructura

```text
app/
  page.tsx                   Portada
  servicios/ empresa/ productos/ contacto/
  productos/[slug]/page.tsx  Página de cada producto (generada desde content/products.ts)
  contacto/actions.ts        Server Action del formulario
  globals.css                Tokens de marca, utilidades y animaciones
  layout.tsx                 Fuentes, encabezado, pie de página y enlace "Saltar al contenido"
  sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
components/                  Componentes del sitio (ver "Sistema visual")
components/ui/               Componentes shadcn/ui (button, input, label, select, sheet, textarea)
content/
  site.ts                    Datos globales de la marca. Solo servidor
  company.ts                 Textos de /empresa
  services.ts                Servicios y etapas de trabajo (workSteps)
  products.ts                Catálogo de productos
  product-visibility.ts      Slugs de productos ocultos (sin dependencias; lo usa next.config.ts)
  contact.ts                 Opciones de "¿Qué necesitas?". Solo servidor
  navigation.ts              Navegación, columnas del pie de página y rutas del sitemap
  values.ts                  Valores de la empresa
lib/
  site-config.ts             Validación de SITE_URL y CONTACT_EMAIL
  metadata.ts                Metadata SEO por página
  lead-form.ts               Campos, límites y validación del formulario (seguro para el cliente)
  interest.ts                Lógica de preselección y etiquetas de interés, sin datos (seguro para el cliente)
  leads.ts                   Punto único de integración de leads (Resend o webhook). Solo servidor
  rate-limit.ts              Límite de envíos del formulario (en memoria)
  utils.ts                   cn()
tests/                       Pruebas con node --test (setup.mjs resuelve "@/…" y "server-only")
next.config.ts               Redirecciones temporales de productos ocultos
```

## Sistema visual

- **Tokens** en `app/globals.css` (`:root`): blanco cálido de fondo, azul NUVEXA como color de acción (`--primary`), azul tinta casi negro para títulos y superficies oscuras (`--ink`, `--ink-foreground`, `--ink-muted`, `--ink-border`), `--brand-soft`, `--brand-sky` para degradados sutiles y `--success`. El sitio usa tema claro.
- **Utilidades propias:** `eyebrow` (etiqueta de sección en mono y mayúsculas), `bg-grid`, `bg-dots`, `text-gradient-brand`, `shadow-surface` y `shadow-elevated`.
- **Animaciones** breves (`flow`, `pulse-ring`, `float`, `travel-y`, `fade-up`). Con `prefers-reduced-motion` se desactivan las animaciones, las transiciones y el desplazamiento suave.
- **Tipografía:** Geist para el texto y Geist Mono para etiquetas, numeraciones y detalles técnicos. La escala de títulos está centralizada en `SectionTitle` (`headingStyles`).
- **Componentes compartidos:**
  - Estructura: `Container` (ancho máximo común), `SectionTitle`, `PageHeader` (encabezado de páginas internas), `Backdrop` (retícula y halos de fondo).
  - Navegación: `Navbar`, `NavLinks`, `MobileMenu` (panel lateral con botón de cierre de 44 × 44 px), `Footer`, `Logo`.
  - Bloques: `CTASection`, `Badge`, `ProcessFlow`, `ProductCard`, `ServiceCard`.
  - Ilustraciones: `HeroVisual` y `ServiceVisual`, conceptuales y en SVG/CSS (no muestran productos ni datos reales).
- `components/CoverMockup.tsx` es una maqueta de PedidoFlow reservada para cuando se publique. Hoy no se importa en ninguna página.

## Productos

Se definen en `content/products.ts`:

- `status: "available"` + `detail` → se genera `/productos/<slug>` con la página completa del producto y aparece en la portada, el catálogo, el pie de página, el formulario ("Demostración de …") y el sitemap.
- `status: "coming-soon"` → aparece en el catálogo como "Próximamente" y en el formulario como "Información sobre …".
  - Con `comingSoonPage: true` se genera `/productos/<slug>` como página "Próximamente": nombre, estado, categoría y resumen si existen, y un acceso para solicitar información, sin atribuir funcionalidades. Es el caso de `/productos/cotizador`.
  - Sin `comingSoonPage`, no hay página: el enlace lleva al formulario con el producto preseleccionado.
- Cualquier otro slug de `/productos/<slug>` responde 404 (`dynamicParams = false`).

**Productos ocultos.** Los slugs de `content/product-visibility.ts` (`hiddenProductSlugs`) se excluyen del sitio público: catálogo, portada, navegación, sitemap, opciones del formulario y páginas generadas. Su contenido se conserva en `content/products.ts`. Para cada uno, `next.config.ts` define una redirección **temporal (307)** de `/productos/<slug>` a `/productos`, que conserva los parámetros de la URL, para no romper enlaces existentes. Hoy está oculto `pedidoflow`. Para publicar un producto oculto basta con quitar su slug de la lista: eso lo devuelve al sitio y elimina su redirección.

## Formulario de contacto

**Separación servidor / navegador:**

1. `app/contacto/page.tsx` (servidor) lee `interestOptions` de `content/contact.ts`. Ese módulo es solo del servidor (`server-only`), se genera a partir de los productos públicos y los servicios, e importarlo desde el cliente hace fallar el build.
2. `ContactFormWithParams` (cliente) recibe las opciones como prop y preselecciona "¿Qué necesitas?" según la URL con `resolveInterestFrom` (`lib/interest.ts`):
   - `/contacto?motivo=demo&producto=<slug>` → `demo-<slug>`
   - `/contacto?motivo=informacion&producto=<slug>` → `informacion-<slug>`
   - `/contacto?motivo=<id-de-servicio>` → ese servicio
   - Un valor que no corresponde a ninguna opción deja el campo sin preseleccionar.
3. `ContactForm` (cliente) envía a la Server Action `submitContact` (`app/contacto/actions.ts`).

Así el catálogo completo, incluidos los productos ocultos, no forma parte del JavaScript del navegador. Lo mismo aplica a `content/site.ts`: si un componente del cliente necesita datos de `site`, recíbelos como prop.

**Validación y estados.** Los campos y límites están en `lib/lead-form.ts`. El servidor valida y normaliza, y comprueba que el interés pertenezca a las opciones permitidas. Estados del formulario:

- `invalid`: errores por campo; los valores se conservan.
- `sent`: confirmación de recepción.
- `not-configured`, `failed` o `rate-limited`: aviso de que la solicitud no se envió y enlace `mailto:` con los mismos datos.

Al reintentar se reenvía el mismo `submissionId`.

**Conectar el formulario:** `deliverLead()` en `lib/leads.ts` usa el primer destino configurado: correo con Resend (`RESEND_API_KEY` + `LEADS_EMAIL_TO`) o webhook (`LEADS_WEBHOOK_URL`).

Envío por correo (Resend):
- Se envía un correo de texto plano (sin HTML) con los datos del formulario. El `reply-to` es el correo del visitante, ya validado, así que basta con responder.
- Solo cuenta como enviado si Resend responde `2xx` con el `id` del correo. Cualquier otro caso (clave inválida, dominio sin verificar, límite de envíos, más de 10 s) muestra que la solicitud no se envió y ofrece escribir por correo.
- `LEADS_EMAIL_TO` o `LEADS_EMAIL_FROM` inválidas se tratan como destino no configurado.
- Un reintento idéntico usa la misma `Idempotency-Key`, y Resend no duplica el correo durante 24 h. Si la persona cambia los datos, la clave cambia.
- Sin dominio verificado, el remitente es `onboarding@resend.dev` y Resend **solo entrega al correo con el que se creó la cuenta**. Para enviar a otras direcciones o usar un remitente propio, verifica el dominio en Resend (registros DNS) y define `LEADS_EMAIL_FROM`.
- Los límites de envío dependen del plan de Resend: consulta los vigentes en su sitio.
- Si falla, en Vercel → Logs aparece `[leads] Resend respondió <estado> (<error>)`: `401` = clave inválida; `403 validation_error` = destinatario no permitido sin dominio verificado; `429` = límite.

Contrato del webhook:
- Recibe un `POST` JSON con `name`, `company`, `email`, `phone`, `interest`, `interestLabel`, `message`, `submissionId`, `source` (`"nuvexa-web"`) y `createdAt`, y la cabecera `Idempotency-Key` (igual a `submissionId`).
- Solo una respuesta `2xx` cuenta como entregada. Un error, una redirección (no se sigue) o más de 10 s sin respuesta muestran al visitante que la solicitud no se envió y le ofrecen escribir por correo.
- Si la persona reintenta tras un fallo, se reenvía el mismo `submissionId`: el destino debe usarlo para descartar duplicados (p. ej. cuando el primer intento sí llegó pero tardó más de 10 s).
- Los fallos quedan en los registros del servidor (Vercel → Logs) con el prefijo `[leads]`, sin datos personales.

**Protección contra abuso:**
- Validación y normalización en el servidor.
- Campo trampa oculto (`website`): si viene con contenido, no se entrega y se responde como fallo.
- Límite de 5 envíos cada 10 minutos por IP, tomada de `x-forwarded-for` o `x-real-ip`. Es en memoria y por instancia, así que no es un límite global.
- La comprobación de origen que Next aplica a los Server Actions.

## Pruebas

`npm test` ejecuta `tests/*.test.mjs` con el runner integrado de Node (`node --test`, con `tests/setup.mjs`):

- `tests/leads.test.mjs`: validación y lectura del formulario, campo trampa e identificador de envío, entrega sin destino, con Resend y con webhook simulados (no se envían correos reales), contenido del correo y límite de envíos.
- `tests/site-config.test.mjs`: validación de `SITE_URL` y `CONTACT_EMAIL` y comportamiento en producción.

## Tareas frecuentes

**Agregar un producto:** añade una entrada en `content/products.ts` (ver [Productos](#productos)). Para mantenerlo fuera del sitio público, agrega su slug a `content/product-visibility.ts`.

**Agregar un servicio:** añade una entrada en `content/services.ts`. Se refleja en `/servicios`, la portada y el formulario, y en el pie de página si tiene `showInFooter: true`.

**Agregar una sección futura (`/pricing`, `/blog`, `/soporte`, `/login`):** ninguna existe hoy. Para crearla, agrega la carpeta en `app/`, el enlace en `content/navigation.ts` (`mainNav`) y la ruta en `staticRoutes` para el sitemap.

## Reglas de contenido

- Todo el contenido en español.
- No publicar clientes, testimonios, cifras, precios, certificaciones ni funcionalidades que no existan.
- No presentar como disponible un producto que no lo esté: los productos en desarrollo se muestran como "Próximamente", sin describir funcionalidades no verificadas.
- No usar imágenes ni maquetas que sugieran productos, pantallas o datos reales que no existan.
- La primera sección de la portada es la "sección principal de portada" (`components/MainCover.tsx`).
