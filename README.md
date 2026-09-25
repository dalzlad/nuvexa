# NUVEXA — Sitio web

Sitio oficial de NUVEXA: software empresarial, productos SaaS y desarrollo a medida.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui (Radix) · Lucide · `cn()` con clsx + tailwind-merge (`lib/utils.ts`).

## Ejecutar

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run lint
npm run build && npm start
```

Copia `.env.example` a `.env.local` y completa:

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio público (metadata, Open Graph, sitemap, robots). **Obligatoria en producción.** |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo público de contacto. Usar un correo del dominio (p. ej. `contacto@nuvexa.co`). |
| `LEADS_WEBHOOK_URL` | Opcional. Destino del formulario de contacto (POST JSON). Sin ella, el formulario no envía y ofrece escribir por correo. |

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
lib/leads.ts                Punto único de integración de leads (webhook, correo, CRM)
lib/metadata.ts             Metadata SEO por página
```

## Tareas frecuentes

**Agregar un producto:** añade una entrada en `content/products.ts`.
- `status: "available"` + `detail` → se crea `/productos/<slug>` automáticamente, aparece en portada, listado, pie de página, formulario de contacto y sitemap.
- `status: "coming-soon"` → aparece como "Próximamente", sin página de detalle.

**Agregar un servicio:** añade una entrada en `content/services.ts` (se refleja en `/servicios`, portada, pie de página y formulario).

**Agregar una sección futura (`/pricing`, `/blog`, `/soporte`, `/login`):** crea la carpeta en `app/`, agrega el enlace en `content/navigation.ts` (`mainNav`) y la ruta en `staticRoutes` para el sitemap.

**Conectar el formulario:** define `LEADS_WEBHOOK_URL`, o reemplaza el cuerpo de `deliverLead()` en `lib/leads.ts` (correo, CRM, base de datos).

## Reglas de contenido

- Todo el contenido en español.
- No publicar clientes, testimonios, cifras, precios, certificaciones ni funcionalidades que no existan.
- La primera sección de la portada es la "sección principal de portada" (`components/MainCover.tsx`).
