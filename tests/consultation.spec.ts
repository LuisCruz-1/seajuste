import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["es", "en"] as const) {
  test(`consultation follows the JPEG reference and sends only its fields (${locale})`, async ({ page }, testInfo) => {
    const es = locale === "es";
    if (testInfo.project.name === "mobile") await page.setViewportSize({ width: 320, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => {
      (window as unknown as { consultationUrls: string[] }).consultationUrls = [];
      window.open = (url) => { (window as unknown as { consultationUrls: string[] }).consultationUrls.push(String(url)); return null; };
    });
    await page.goto(`/${locale}/${es ? "contacto" : "contact"}#consulta`);
    await page.evaluate(() => document.fonts.ready);
    const form = page.locator(".consultation-form");
    const expectedFields = ["requester", "company", "name", "position", "phone", "email", "cityCountry", "address", "eventLocation", "situation", "message", "consent"].sort();
    const fields = () => form.locator("input, textarea, select").evaluateAll((elements) => [...new Set(elements.map((element) => (element as HTMLInputElement).name))].sort());
    expect(await fields()).toEqual(expectedFields);
    await expect(form.locator("details, input[type='radio'], input[type='date'], input[type='time'], input[type='file']")).toHaveCount(0);
    const requester = form.getByRole("combobox", { name: es ? "Seleccione quién solicita la consulta" : "Select who is requesting the consultation", exact: true });
    await expect(requester.locator("option").allTextContents()).resolves.toEqual([
      es ? "Seleccione una opción" : "Select an option",
      ...(es ? ["Aseguradora", "Reaseguradora", "Empresa / asegurado", "Ajustadora", "Corredor de seguros", "Abogado / asesor", "Otro"] : ["Insurer", "Reinsurer", "Company / insured", "Loss adjuster", "Insurance broker", "Lawyer / adviser", "Other"]),
    ]);
    const situation = form.getByRole("combobox", { name: es ? "Seleccione el motivo de consulta" : "Select the reason for your enquiry", exact: true });
    await expect(form.locator("select")).toHaveCount(2);
    expect(await form.locator(".consultation-contact input").evaluateAll((inputs) => inputs.map((input) => (input as HTMLInputElement).name))).toEqual(["company", "name", "position", "phone", "email", "cityCountry", "address", "eventLocation"]);

    const submit = form.getByRole("button", { name: es ? "Continuar por WhatsApp" : "Continue via WhatsApp" });
    const calls = () => page.evaluate(() => (window as unknown as { consultationUrls: string[] }).consultationUrls);
    await submit.click();
    expect(await calls()).toEqual([]);
    await requester.selectOption("other");
    expect(await fields()).toEqual(expectedFields);
    await form.locator('[name="company"]').fill("Energía & Seguros");
    await form.locator('[name="name"]').fill("María Núñez");
    await form.locator('[name="position"]').fill("Ingeniera");
    await form.locator('[name="phone"]').fill("no-es-un-telefono");
    await form.locator('[name="email"]').fill("maria@example.com");
    await form.locator('[name="cityCountry"]').fill("Quito, Ecuador");
    await form.locator('[name="address"]').fill("Av. Principal 123");
    await form.locator('[name="eventLocation"]').fill("Guayaquil, Guayas, Ecuador");
    await situation.selectOption("recent");
    await form.locator('[name="message"]').fill("Evaluación técnica de daños en una turbina y sus equipos auxiliares.");
    const consent = form.getByRole("checkbox", { name: es ? /Estoy de acuerdo/ : /I agree/ });
    await consent.check();
    await submit.click();
    expect(await calls()).toEqual([]);
    await form.locator('[name="phone"]').fill("+593 99 912 3456");
    await form.locator('[name="company"]').fill("   ");
    await submit.click();
    expect(await calls()).toEqual([]);
    await form.locator('[name="company"]').fill("Energía & Seguros");
    await consent.uncheck();
    await submit.click();
    expect(await calls()).toEqual([]);
    await consent.check();

    const reasons = ["recent", "ongoing", "technical"];
    for (const [index, reason] of reasons.entries()) {
      await situation.selectOption(reason);
      expect(await fields()).toEqual(expectedFields);
      await submit.click();
      expect(await calls()).toHaveLength(index + 1);
      const url = new URL((await calls())[index]);
      expect(url.hostname).toBe("wa.me");
      expect(url.pathname).toBe("/593999666167");
      const message = url.searchParams.get("text")!;
      const labels: Record<string, { es: string; en: string }> = { recent: { es: "Siniestro reciente", en: "Recent loss" }, ongoing: { es: "Reclamo en curso", en: "Ongoing claim" }, technical: { es: "Asistencia técnica-legal", en: "Technical and legal assistance" } };
      for (const value of ["María Núñez", "Energía & Seguros", "Ingeniera", "+593 99 912 3456", "maria@example.com", "Quito, Ecuador", "Av. Principal 123", "Guayaquil, Guayas, Ecuador", "Evaluación técnica de daños", labels[reason][locale]]) expect(message).toContain(value);
      for (const other of reasons.filter((item) => item !== reason)) expect(message).not.toContain(labels[other][locale]);
      expect(message).toContain(es ? "Estoy de acuerdo con la política de privacidad." : "I agree to the privacy policy.");
      await expect(page.getByRole("status")).toContainText(es ? "La consulta está preparada" : "Your consultation is ready");
      await expect(page.getByRole("status").getByRole("link")).toHaveAttribute("href", url.toString());
    }

    const results = await new AxeBuilder({ page }).include(".contact-form").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map((item) => ({ id: item.id, targets: item.nodes.map((node) => node.target) }))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await form.screenshot({ path: testInfo.outputPath(`consultation-${locale}.png`), style: ".site-header, .skip-link { visibility: hidden !important; }" });
  });
}
