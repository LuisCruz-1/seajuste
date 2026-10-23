import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("both forms link to a separate privacy page and preserve their drafts", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  if (testInfo.project.name === "mobile") await page.setViewportSize({ width: 320, height: 900 });
  for (const locale of ["es", "en"] as const) {
    const es = locale === "es";
    const policy = es ? "/es/politica-de-privacidad" : "/en/privacy-policy";
    for (const hash of ["consulta", "reunion"]) {
      await page.goto(`/${locale}/${es ? "contacto" : "contact"}#${hash}`);
      const panel = page.getByRole("tabpanel");
      const name = panel.getByRole("textbox", { name: es ? /Nombre y apellido/ : /Full name/ });
      await name.fill("María Torres");
      const consent = panel.getByRole("checkbox", { name: es ? /Estoy de acuerdo con la política de privacidad/ : /I agree to the privacy policy/ });
      await expect(consent).toHaveCount(1);
      await expect(consent).toHaveJSProperty("required", true);
      await expect(consent).not.toBeChecked();
      const link = panel.getByRole("link", { name: es ? "política de privacidad" : "privacy policy", exact: true });
      await expect(link).toHaveAttribute("href", policy);
      await expect(link).toHaveAttribute("target", "_blank");
      const newPage = page.waitForEvent("popup");
      await link.click();
      const privacy = await newPage;
      await expect(privacy).toHaveURL(new RegExp(`${policy}$`));
      await expect(privacy.getByRole("heading", { level: 1 })).toHaveText(es ? "Política de privacidad" : "Privacy policy");
      await expect(privacy.locator("main")).toContainText("SEAJUSTE S.A. Ajustadores de Siniestros");
      await expect(privacy.locator("main")).toContainText("seajuste@gmail.com");
      await expect(privacy.locator("main")).toContainText("WhatsApp");
      await privacy.close();
      await expect(name).toHaveValue("María Torres");
      await expect(consent).not.toBeChecked();
      await expect(page).toHaveURL(new RegExp(`#${hash}$`));
      await consent.check();
      expect(await panel.locator("form").evaluate((form) => {
        const checkbox = form.querySelector('[name="consent"]')!;
        const submit = form.querySelector('[type="submit"]')!;
        return !!(checkbox.compareDocumentPosition(submit) & Node.DOCUMENT_POSITION_FOLLOWING);
      })).toBe(true);
      if (es) await panel.locator(".consultation-consent").screenshot({ path: testInfo.outputPath(`consent-${hash}.png`) });
    }
  }
});

test("privacy pages are accessible and language selection keeps the policy open", async ({ page }, testInfo) => {
  if (testInfo.project.name === "mobile") await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/es/politica-de-privacidad");
  await expect(page).toHaveTitle(/Política de privacidad/);
  await page.getByRole("link", { name: "View this page in English" }).click();
  await expect(page).toHaveURL(/\/en\/privacy-policy$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy policy");
  await page.getByRole("link", { name: "Ver esta página en español" }).click();
  await expect(page).toHaveURL(/\/es\/politica-de-privacidad$/);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("privacy-page.png"), fullPage: true });
  await page.getByRole("link", { name: "Volver a Contacto", exact: true }).click();
  await expect(page).toHaveURL(/\/es\/contacto$/);
});
