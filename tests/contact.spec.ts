import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("meeting requests validate preferences and prepare only the matching WhatsApp message", async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    const requests: string[] = [];
    (window as unknown as { whatsappRequests: string[] }).whatsappRequests = requests;
    window.open = (url) => { requests.push(String(url)); return null; };
  });

  for (const locale of ["es", "en"]) {
    const es = locale === "es";
    await page.goto(`/${locale}/${es ? "contacto" : "contact"}#reunion`);
    const tab = page.getByRole("tab", { name: es ? "Agendar reunión" : "Schedule a meeting" });
    await expect(tab).toHaveAttribute("aria-selected", "true");
    const form = page.getByRole("tabpanel");
    const submit = form.getByRole("button", { name: es ? "Continuar por WhatsApp" : "Continue via WhatsApp" });
    await submit.click();
    expect(await page.evaluate(() => (window as unknown as { whatsappRequests: string[] }).whatsappRequests)).toEqual([]);

    await form.getByLabel(es ? /Nombre y apellido/ : /Full name/).fill("José Núñez");
    await form.getByLabel(es ? /Empresa/ : /Company/).fill("Energía & Transporte");
    await form.getByLabel(es ? /Correo electrónico/ : /Email/).fill("jose@example.com");
    await form.getByLabel(es ? /Teléfono de contacto/ : /Contact phone number/).fill("+593 99 123 4567");
    await form.getByLabel(es ? /Fecha preferida/ : /Preferred date/).fill("2000-01-01");
    await form.getByLabel(es ? /Hora preferida/ : /Preferred time/).fill("09:30");
    await form.getByLabel(es ? /Modalidad/ : /Meeting format/).selectOption("virtual");
    await form.getByLabel(es ? /Motivo de la reunión/ : /Meeting topic/).fill("Revisión técnica de equipos y participantes: Ana & José.");
    await submit.click();
    expect(await page.evaluate(() => (window as unknown as { whatsappRequests: string[] }).whatsappRequests)).toEqual([]);

    await form.getByLabel(es ? /Fecha preferida/ : /Preferred date/).fill("2099-12-20");
    const consent = form.getByRole("checkbox", { name: es ? /Estoy de acuerdo con la política de privacidad/ : /I agree to the privacy policy/ });
    await expect(consent).not.toBeChecked();
    await submit.click();
    expect(await page.evaluate(() => (window as unknown as { whatsappRequests: string[] }).whatsappRequests)).toEqual([]);
    await consent.check();
    await submit.click();
    await expect(page.getByRole("status")).toContainText(es ? "La solicitud de reunión está preparada" : "Your meeting request is ready");
    const requests = await page.evaluate(() => (window as unknown as { whatsappRequests: string[] }).whatsappRequests);
    expect(requests).toHaveLength(1);
    const url = new URL(requests[0]);
    expect(url.hostname).toBe("wa.me");
    expect(url.pathname).toBe("/593999666167");
    const text = url.searchParams.get("text")!;
    for (const value of ["José Núñez", "Energía & Transporte", "jose@example.com", "+593 99 123 4567", "09:30", "UTC−5", "Virtual", "Ana & José"]) expect(text).toContain(value);
    expect(text).toContain(es ? "Solicitud de reunión" : "Meeting request");
    expect(text).toContain(es ? "20 de diciembre de 2099" : "20 December 2099");
    expect(text).toContain(es ? "Estoy de acuerdo con la política de privacidad." : "I agree to the privacy policy.");
    expect(text).not.toContain(es ? "Descripción de la consulta" : "Enquiry description");
    await expect(form.locator(".form-actions a[href^='mailto:']")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /correo|email/i })).toHaveCount(0);
    await expect(page.getByRole("status").getByRole("link")).toHaveAttribute("href", url.toString());
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const accessibility = await new AxeBuilder({ page }).include(".contact-form").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(accessibility.violations).toEqual([]);
    await page.locator(".contact-form").screenshot({ path: testInfo.outputPath(`contact-${locale}-meeting.png`), style: ".site-header, .skip-link { visibility: hidden !important; }" });
  }
});

test("hero consultation links select the right tab and tab changes preserve drafts and history", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es");
  const hero = page.locator(".home-slider");
  await hero.getByRole("button", { name: "Diapositiva siguiente" }).click();
  await hero.locator(".hero-slide.is-active").getByRole("link", { name: "Solicitar consulta profesional" }).click();
  await expect(page).toHaveURL(/\/es\/contacto#consulta$/);
  const consultation = page.getByRole("tab", { name: "Consulta profesional" });
  const meeting = page.getByRole("tab", { name: "Agendar reunión" });
  await expect(consultation).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tabpanel").getByLabel(/Nombre y apellido/).fill("María Torres");
  await page.getByRole("tabpanel").getByRole("textbox", { name: "Descripción de la consulta", exact: true }).fill("Consulta sobre daños en una turbina de generación.");

  await meeting.click();
  await expect(page).toHaveURL(/#reunion$/);
  await page.getByRole("tabpanel").getByLabel(/Nombre y apellido/).fill("Carlos Quevedo");
  await consultation.click();
  await expect(page.getByRole("tabpanel").getByLabel(/Nombre y apellido/)).toHaveValue("María Torres");
  await expect(page.getByRole("tabpanel").getByRole("textbox", { name: "Descripción de la consulta", exact: true })).toHaveValue("Consulta sobre daños en una turbina de generación.");
  await page.goBack();
  await expect(meeting).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel").getByLabel(/Nombre y apellido/)).toHaveValue("Carlos Quevedo");
  await page.goBack();
  await expect(consultation).toHaveAttribute("aria-selected", "true");
  await consultation.focus();
  await page.keyboard.press("ArrowRight");
  await expect(meeting).toBeFocused();
  await expect(meeting).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Home");
  await expect(consultation).toBeFocused();
  await expect(consultation).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".contact-form")).toBeInViewport();
});

test("Services opens the same consultation form", async ({ page }) => {
  for (const locale of ["es", "en"]) {
    const es = locale === "es";
    await page.goto(`/${locale}/${es ? "servicios" : "services"}`);
    await page.locator(".contact-band").getByRole("link", { name: es ? "Solicitar consulta profesional" : "Request a professional consultation", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/${es ? "contacto" : "contact"}#consulta$`));
    await expect(page.getByRole("tab", { name: es ? "Consulta profesional" : "Professional consultation", exact: true })).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".consultation-form")).toHaveCount(1);
    await expect(page.locator(".consultation-identity")).toBeVisible();
  }
});
