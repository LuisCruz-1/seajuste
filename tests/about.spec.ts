import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("about history preserves bilingual context and opens the supporting PDF pages", async ({ page, request }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  if (testInfo.project.name === "mobile") await page.setViewportSize({ width: 320, height: 900 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const pdf = "/documents/seajuste-historia-documental.pdf";
  const response = await request.head(pdf);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");

  for (const locale of ["es", "en"] as const) {
    await page.goto(locale === "es" ? "/es/nosotros" : "/en/about");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: locale === "es" ? "Identidad" : "Identity", exact: true })).toBeVisible();
    const sectionTitles = await page.locator("main > section").evaluateAll((sections) => sections.map((section) => section.querySelector("h1, h2")?.textContent?.replace(/\s+/g, " ").trim()));
    expect(sectionTitles).toEqual(locale === "es"
      ? ["Nuestra empresa", "Nuestra historia", "Breve reseña histórica documental", "Gestión de reclamos", "Mercado de reaseguros"]
      : ["Our company", "Our history", "A brief documentary history", "Claims management", "Reinsurance market"]);
    const history = page.locator(".history-origins-copy");
    await expect(history).toContainText("1987");
    await expect(history).toContainText("1992");
    await expect(history).toContainText("1999");
    const paragraphs = history.locator(":scope > p");
    await expect(paragraphs).toHaveCount(7);
    await expect(paragraphs.nth(2)).toHaveText(locale === "es" ? /^Con una trayectoria profesional iniciada en 1987,/ : /^With a professional career that began in 1987/);
    await expect(paragraphs.nth(3)).toContainText(locale === "es" ? "al amparo de la cláusula Cut Through" : "under the Cut Through clause");
    await expect(paragraphs.nth(4)).toHaveText(locale === "es" ? /^Esta etapa consolidó/ : /^This stage consolidated/);
    await expect(paragraphs.nth(5)).toHaveText(locale === "es" ? /^A lo largo de esta trayectoria/ : /^Throughout this history/);
    await expect(page.locator(".company-mission")).toContainText(locale === "es" ? "legalmente sustentados" : "legally substantiated");
    await expect(page.locator("#transelectric-2000")).toContainText("AON Group Ltd.");
    await expect(page.locator("#transelectric-2000")).toContainText(locale === "es" ? "28 de marzo de 2000" : "28 March 2000");
    await expect(page.locator(".history-document-settlement dd")).toHaveText(locale === "es" ? "USD 1.294.981,00" : "USD 1,294,981.00");

    const actions = page.locator(".history-document-action");
    await expect(actions).toHaveCount(4);
    for (const [index, number] of [4, 1, 2, 3].entries()) {
      await expect(actions.nth(index)).toHaveAttribute("href", `${pdf}#page=${number}`);
      await expect(actions.nth(index)).toHaveAttribute("target", "_blank");
      await expect(actions.nth(index)).toHaveAttribute("rel", "noopener noreferrer");
    }
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute("alt", /.+/);
      expect(await image.evaluate(async (element: HTMLImageElement) => {
        await element.decode();
        return element.naturalWidth > 0;
      })).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) }))).toEqual([]);
    if (locale === "es") {
      const popupPromise = page.waitForEvent("popup");
      await actions.nth(1).click();
      const documentPage = await popupPromise;
      await expect(documentPage).toHaveURL(new RegExp(`${pdf.replaceAll(".", "\\.")}#page=1$`));
      await documentPage.close();
      for (const section of [".company-profile", ".company-origins", "#paute-1990", "#transelectric-2000", "#settlement-2000", ".about-contact-closing"]) {
        await page.locator(section).screenshot({ path: testInfo.outputPath(`${section.slice(1)}.png`), style: ".site-header, .skip-link { visibility: hidden !important; }" });
      }
    }
  }
  expect(errors).toEqual([]);
});

test("about contact actions open the correct consultation or meeting form", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  if (testInfo.project.name === "mobile") await page.setViewportSize({ width: 320, height: 900 });
  for (const locale of ["es", "en"] as const) {
    const es = locale === "es";
    const about = es ? "/es/nosotros" : "/en/about";
    const contact = es ? "/es/contacto" : "/en/contact";
    const choices = [
      { label: es ? "Solicitar consulta profesional" : "Request a professional consultation", tab: es ? "Consulta profesional" : "Professional consultation", hash: "consulta" },
      { label: es ? "Agendar reunión" : "Schedule a meeting", tab: es ? "Agendar reunión" : "Schedule a meeting", hash: "reunion" },
    ];
    for (const placement of [".company-profile", ".about-contact-closing"]) {
      for (const choice of choices) {
        await page.goto(about);
        const link = page.locator(placement).getByRole("link", { name: choice.label, exact: true });
        await expect(link).toHaveAttribute("href", `${contact}#${choice.hash}`);
        await link.click();
        await expect(page).toHaveURL(new RegExp(`${contact}#${choice.hash}$`));
        await expect(page.getByRole("tab", { name: choice.tab, exact: true })).toHaveAttribute("aria-selected", "true");
        await expect(page.getByRole("tabpanel", { name: choice.tab, exact: true })).toBeVisible();
        await expect(page.getByRole("tablist")).toBeInViewport();
      }
    }
  }
});
