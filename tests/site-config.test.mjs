// Pruebas de la configuración pública del sitio (NEXT_PUBLIC_SITE_URL y CONTACT_EMAIL).
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { resolveSiteConfig, siteConfigErrors } from "../lib/site-config.ts";

const valid = { url: "https://nuvexa.test", email: "contacto@nuvexa.test" };

describe("siteConfigErrors", () => {
  it("acepta una configuración válida", () => {
    assert.deepEqual(siteConfigErrors(valid), []);
  });

  it("exige las dos variables y las nombra en el mensaje", () => {
    const errors = siteConfigErrors({ url: undefined, email: " " });
    assert.equal(errors.length, 2);
    assert.match(errors[0], /NEXT_PUBLIC_SITE_URL/);
    assert.match(errors[1], /^CONTACT_EMAIL /);
  });

  it("rechaza URLs sin https, locales o con ruta", () => {
    for (const url of ["http://nuvexa.test", "https://localhost:3000", "https://nuvexa.test/inicio", "nuvexa.test"]) {
      assert.equal(siteConfigErrors({ ...valid, url }).length, 1, url);
    }
  });

  it("rechaza un correo de contacto inválido sin incluir el valor en el mensaje", () => {
    const errors = siteConfigErrors({ ...valid, email: "no-es-correo" });
    assert.equal(errors.length, 1);
    assert.match(errors[0], /CONTACT_EMAIL/);
    assert.ok(!errors[0].includes("no-es-correo"));
  });
});

describe("resolveSiteConfig en producción", () => {
  const original = process.env.NODE_ENV;
  afterEach(() => {
    if (original === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = original;
  });

  it("devuelve el origen de la URL y el correo", () => {
    process.env.NODE_ENV = "production";
    assert.deepEqual(resolveSiteConfig({ url: "https://nuvexa.test/", email: " contacto@nuvexa.test " }), valid);
  });

  it("falla si falta CONTACT_EMAIL", () => {
    process.env.NODE_ENV = "production";
    assert.throws(() => resolveSiteConfig({ url: valid.url, email: undefined }), /CONTACT_EMAIL no está definida/);
  });
});
