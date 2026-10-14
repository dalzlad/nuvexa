// Pruebas del flujo de leads con el runner integrado de Node (sin dependencias).
// Node ejecuta los .ts importados eliminando los tipos; tests/setup.mjs resuelve "@/…" y "server-only".
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";

import {
  HONEYPOT_FIELD,
  isHoneypotFilled,
  leadLimits,
  readLead,
  readSubmissionId,
  SUBMISSION_ID_FIELD,
  validateLead,
} from "../lib/lead-form.ts";
import { buildLeadEmail, deliverLead } from "../lib/leads.ts";
import { createRateLimiter } from "../lib/rate-limit.ts";

const allowed = ["demo-pedidoflow", "otro"];

function form(fields) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const valid = {
  name: "Ana Pérez",
  company: "Acme",
  email: "ana@acme.co",
  phone: "+57 300 000 0000",
  interest: "demo-pedidoflow",
  message: "Queremos una demostración.",
};

describe("validateLead", () => {
  it("acepta una solicitud válida", () => {
    assert.deepEqual(validateLead(readLead(form(valid)), allowed), {});
  });

  it("exige los campos obligatorios", () => {
    const errors = validateLead(readLead(form({})), allowed);
    assert.deepEqual(Object.keys(errors).sort(), ["email", "interest", "message", "name"]);
  });

  it("acepta vacíos los campos opcionales", () => {
    assert.deepEqual(validateLead(readLead(form({ ...valid, company: "", phone: "" })), allowed), {});
  });

  it("rechaza correos que podrían convertirse en varias direcciones", () => {
    for (const email of ["a@b.co, c@d.co", "Ana <a@b.co>", "a@b.co;c@d.co", '"a"@b.co', "a@b.c"]) {
      assert.ok(validateLead(readLead(form({ ...valid, email })), allowed).email, email);
    }
  });

  it("rechaza correo y teléfono inválidos", () => {
    const errors = validateLead(readLead(form({ ...valid, email: "ana@", phone: "abc" })), allowed);
    assert.ok(errors.email);
    assert.ok(errors.phone);
  });

  it("rechaza un interés que no está en la lista", () => {
    assert.ok(validateLead(readLead(form({ ...valid, interest: "<script>" })), allowed).interest);
  });

  it("rechaza textos por encima del límite en lugar de recortarlos en silencio", () => {
    const errors = validateLead(readLead(form({ ...valid, message: "a".repeat(leadLimits.message + 50) })), allowed);
    assert.ok(errors.message);
  });

  it("rechaza campos que llegan como archivo", () => {
    const data = form(valid);
    data.set("name", new Blob(["x"]), "x.txt");
    assert.ok(validateLead(readLead(data), allowed).name);
  });
});

describe("readLead", () => {
  it("normaliza espacios, saltos de línea y caracteres de control", () => {
    const lead = readLead(
      form({ ...valid, name: "  Ana\r\nBcc: x@y.z \u0000 ", email: " ANA@Acme.CO ", message: "Hola\r\n\r\n\r\n\r\nmundo\u0007" }),
    );
    assert.equal(lead.name, "Ana Bcc: x@y.z");
    assert.equal(lead.email, "ana@acme.co");
    assert.equal(lead.message, "Hola\n\nmundo");
  });
});

describe("campo trampa e identificador", () => {
  it("detecta el campo trampa con contenido", () => {
    assert.equal(isHoneypotFilled(form({ [HONEYPOT_FIELD]: "http://spam" })), true);
    assert.equal(isHoneypotFilled(form({})), false);
  });

  it("reutiliza un identificador válido y reemplaza uno inválido", () => {
    const id = "123e4567-e89b-42d3-a456-426614174000";
    assert.equal(readSubmissionId(form({ [SUBMISSION_ID_FIELD]: id })), id);
    const generated = readSubmissionId(form({ [SUBMISSION_ID_FIELD]: "no-es-un-uuid" }));
    assert.notEqual(generated, "no-es-un-uuid");
    assert.match(generated, /^[0-9a-f-]{36}$/);
  });
});

const DELIVERY_ENV = ["LEADS_WEBHOOK_URL", "RESEND_API_KEY", "LEADS_EMAIL_TO", "LEADS_EMAIL_FROM"];
const context = { submissionId: "123e4567-e89b-42d3-a456-426614174000", interestLabel: "Demostración de PedidoFlow" };
const lead = readLead(form(valid));

/** Aísla las variables de entorno de entrega y silencia los registros en cada prueba. */
function isolateDeliveryEnv(values) {
  const original = Object.fromEntries(DELIVERY_ENV.map((key) => [key, process.env[key]]));
  beforeEach(() => {
    for (const key of DELIVERY_ENV) delete process.env[key];
    Object.assign(process.env, values);
    mock.method(console, "error", () => {});
  });
  afterEach(() => {
    mock.restoreAll();
    for (const key of DELIVERY_ENV) {
      if (original[key] === undefined) delete process.env[key];
      else process.env[key] = original[key];
    }
  });
}

describe("deliverLead sin destino", () => {
  isolateDeliveryEnv({});

  it("no simula el envío", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => new Response(null, { status: 200 }));
    assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "not-configured" });
    assert.equal(fetchMock.mock.callCount(), 0);
  });
});

describe("deliverLead con Resend", () => {
  isolateDeliveryEnv({
    RESEND_API_KEY: "re_clave_de_prueba",
    LEADS_EMAIL_TO: "ventas@empresa.test",
    LEADS_WEBHOOK_URL: "https://hooks.example.test/leads",
  });

  const accepted = () => new Response(JSON.stringify({ id: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794" }), { status: 200 });

  it("envía el correo con los datos reales y confirma solo si Resend devuelve un id", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => accepted());
    assert.deepEqual(await deliverLead(lead, context), { delivered: true });
    assert.equal(fetchMock.mock.callCount(), 1, "Resend tiene prioridad: no se llama también al webhook");

    const [url, init] = fetchMock.mock.calls[0].arguments;
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(init.method, "POST");
    assert.equal(init.headers.Authorization, "Bearer re_clave_de_prueba");
    assert.match(init.headers["Idempotency-Key"], new RegExp(`^lead-${context.submissionId}-[0-9a-f]{32}$`));

    const body = JSON.parse(init.body);
    assert.equal(body.from, "NUVEXA <onboarding@resend.dev>");
    assert.deepEqual(body.to, ["ventas@empresa.test"]);
    assert.equal(body.reply_to, "ana@acme.co");
    assert.equal(body.subject, "Nueva solicitud: Demostración de PedidoFlow — Ana Pérez");
    assert.equal(body.html, undefined, "solo texto plano");
    const { interest, ...visible } = lead;
    assert.equal(interest, "demo-pedidoflow");
    for (const value of Object.values(visible)) assert.ok(body.text.includes(value), `el correo incluye "${value}"`);
    assert.ok(body.text.includes(context.interestLabel));
  });

  it("usa LEADS_EMAIL_FROM y admite varios destinatarios", async () => {
    process.env.LEADS_EMAIL_FROM = "NUVEXA <solicitudes@nuvexa.test>";
    process.env.LEADS_EMAIL_TO = "a@empresa.test, b@empresa.test";
    const fetchMock = mock.method(globalThis, "fetch", async () => accepted());
    await deliverLead(lead, context);
    const body = JSON.parse(fetchMock.mock.calls[0].arguments[1].body);
    assert.equal(body.from, "NUVEXA <solicitudes@nuvexa.test>");
    assert.deepEqual(body.to, ["a@empresa.test", "b@empresa.test"]);
  });

  it("repite la clave de idempotencia en un reintento idéntico y la cambia si cambian los datos", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => accepted());
    await deliverLead(lead, context);
    await deliverLead(lead, context);
    await deliverLead({ ...lead, message: "Otro mensaje" }, context);
    const keys = fetchMock.mock.calls.map((call) => call.arguments[1].headers["Idempotency-Key"]);
    assert.equal(keys[0], keys[1]);
    assert.notEqual(keys[0], keys[2]);
  });

  it("no envía si LEADS_EMAIL_TO falta o no es válida", async () => {
    for (const value of [undefined, "", "no-es-correo", "a@b.co, <x@y.z>"]) {
      if (value === undefined) delete process.env.LEADS_EMAIL_TO;
      else process.env.LEADS_EMAIL_TO = value;
      const fetchMock = mock.method(globalThis, "fetch", async () => accepted());
      assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "not-configured" });
      assert.equal(fetchMock.mock.callCount(), 0);
      fetchMock.mock.restore();
    }
  });

  it("no envía si LEADS_EMAIL_FROM tiene saltos de línea", async () => {
    process.env.LEADS_EMAIL_FROM = "NUVEXA <a@b.co>\r\nBcc: x@y.z";
    const fetchMock = mock.method(globalThis, "fetch", async () => accepted());
    assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "not-configured" });
    assert.equal(fetchMock.mock.callCount(), 0);
  });

  const failures = [
    ["403 dominio sin verificar", 403, { name: "validation_error", message: "You can only send testing emails to your own email address" }],
    ["401 clave inválida", 401, { name: "missing_api_key" }],
    ["409 misma clave con otro contenido", 409, { name: "invalid_idempotent_request" }],
    ["422 datos rechazados", 422, { name: "validation_error" }],
    ["429 límite de Resend", 429, { name: "rate_limit_exceeded" }],
    ["500 error de Resend", 500, { name: "application_error" }],
  ];
  for (const [label, status, payload] of failures) {
    it(`informa fallo ante ${label}`, async () => {
      mock.method(globalThis, "fetch", async () => new Response(JSON.stringify(payload), { status }));
      assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "failed" });
    });
  }

  it("informa fallo si Resend responde 200 sin id o con un cuerpo que no es JSON", async () => {
    mock.method(globalThis, "fetch", async () => new Response("{}", { status: 200 }));
    assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "failed" });
    mock.method(globalThis, "fetch", async () => new Response("<html>", { status: 200 }));
    assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "failed" });
  });

  it("informa fallo ante un error de red o de tiempo de espera", async () => {
    mock.method(globalThis, "fetch", async () => {
      throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
    });
    assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "failed" });
  });

  it("no registra la clave, los destinatarios ni datos del visitante", async () => {
    const errorMock = mock.method(console, "error", () => {});
    mock.method(globalThis, "fetch", async () =>
      new Response(JSON.stringify({ name: "validation_error", message: "ventas@empresa.test" }), { status: 403 }),
    );
    await deliverLead(lead, context);
    const logged = errorMock.mock.calls.map((call) => call.arguments.join(" ")).join("\n");
    assert.match(logged, /403 \(validation_error\)/);
    for (const secret of ["re_clave_de_prueba", "ventas@empresa.test", lead.email, lead.name]) {
      assert.ok(!logged.includes(secret), `el registro no incluye "${secret}"`);
    }
  });
});

describe("buildLeadEmail", () => {
  it("mantiene el asunto en una línea aunque el nombre intente inyectar cabeceras", () => {
    const hostile = readLead(form({ ...valid, name: "Ana\r\nBcc: victima@x.co", message: "<script>alert(1)</script>" }));
    const { subject, text } = buildLeadEmail(hostile, context);
    assert.ok(!/[\r\n]/.test(subject));
    assert.ok(text.includes("<script>alert(1)</script>"), "se envía como texto plano, sin interpretarse");
  });
});

describe("deliverLead con webhook", () => {
  isolateDeliveryEnv({ LEADS_WEBHOOK_URL: "https://hooks.example.test/leads" });

  it("no simula el envío si falta LEADS_WEBHOOK_URL", async () => {
    delete process.env.LEADS_WEBHOOK_URL;
    const fetchMock = mock.method(globalThis, "fetch", async () => new Response(null, { status: 200 }));
    assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "not-configured" });
    assert.equal(fetchMock.mock.callCount(), 0);
  });

  it("confirma la entrega solo con una respuesta 2xx y envía el identificador", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => new Response("ok", { status: 200 }));
    assert.deepEqual(await deliverLead(lead, context), { delivered: true });

    const [url, init] = fetchMock.mock.calls[0].arguments;
    assert.equal(url, "https://hooks.example.test/leads");
    assert.equal(init.method, "POST");
    assert.equal(init.redirect, "manual");
    assert.equal(init.headers["Idempotency-Key"], context.submissionId);
    const body = JSON.parse(init.body);
    assert.equal(body.email, "ana@acme.co");
    assert.equal(body.submissionId, context.submissionId);
    assert.equal(body.interestLabel, context.interestLabel);
  });

  for (const status of [400, 401, 404, 500, 503]) {
    it(`informa fallo si el webhook responde ${status}`, async () => {
      mock.method(globalThis, "fetch", async () => new Response("error", { status }));
      assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "failed" });
    });
  }

  it("informa fallo si el webhook redirige", async () => {
    mock.method(globalThis, "fetch", async () => new Response(null, { status: 302, headers: { Location: "/login" } }));
    assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "failed" });
  });

  it("informa fallo ante un error de red o de tiempo de espera", async () => {
    mock.method(globalThis, "fetch", async () => {
      throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
    });
    assert.deepEqual(await deliverLead(lead, context), { delivered: false, reason: "failed" });
  });

  it("no incluye datos personales en los registros de error", async () => {
    const errorMock = mock.method(console, "error", () => {});
    mock.method(globalThis, "fetch", async () => new Response("error", { status: 500 }));
    await deliverLead(lead, context);
    const logged = errorMock.mock.calls.map((call) => call.arguments.join(" ")).join("\n");
    assert.ok(!logged.includes(lead.email));
    assert.ok(!logged.includes(lead.name));
    assert.ok(!logged.includes("hooks.example.test"));
  });
});

describe("createRateLimiter", () => {
  it("bloquea al superar el límite y libera al terminar la ventana", () => {
    const allow = createRateLimiter({ limit: 2, windowMs: 1000 });
    assert.equal(allow("1.1.1.1", 0), true);
    assert.equal(allow("1.1.1.1", 10), true);
    assert.equal(allow("1.1.1.1", 20), false);
    assert.equal(allow("2.2.2.2", 20), true);
    assert.equal(allow("1.1.1.1", 1000), true);
  });
});
