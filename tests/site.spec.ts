import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all bilingual pages, original media and corporate brochure resolve", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "HTTP content verification is independent of viewport.");
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(307);
  expect(root.headers().location).toBe("/es");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  expect(urls).toHaveLength(58);
  for (const url of urls) {
    const response = await request.get(url);
    expect(response.status(), url).toBe(200);
    const html = await response.text();
    expect(html, url).toMatch(new RegExp(`<html[^>]*lang="${url.startsWith("/en") ? "en" : "es"}"`));
    expect(html, url).toContain('rel="canonical"');
    expect(html, url).toMatch(/hreflang="es"/i);
    expect(html, url).toMatch(/hreflang="en"/i);
    expect(html, url).toContain("0991501487001");
    expect(html, url).toMatch(/<h1[ >]/);
  }
  const manifest = await (await request.get("/images/brochure-assets.json")).json() as { file: string }[];
  expect(manifest).toHaveLength(148);
  for (const asset of manifest) expect((await request.head(asset.file)).status(), asset.file).toBe(200);
  const brochure = await request.head("/documents/seajuste-brochure.pdf");
  expect(brochure.status()).toBe(200);
  expect(brochure.headers()["content-type"]).toContain("application/pdf");
  expect((await request.get("/es/servicios/no-existe")).status()).toBe(404);
  expect((await request.get("/fr")).status()).toBe(404);
  expect((await request.get("/es/opengraph-image")).status()).toBe(200);
  expect((await request.get("/en/opengraph-image")).status()).toBe(200);
});

test("language selection preserves the service and the case being viewed", async ({ page }) => {
  await page.goto("/es/servicios/energia-y-generacion");
  await page.getByRole("link", { name: "View this page in English" }).click();
  await expect(page).toHaveURL(/\/en\/services\/energy-and-power$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Energy & power loss adjusting");
  await page.goto("/es/experiencia/autotransformador-pauwels");
  await page.getByRole("link", { name: "View this page in English" }).click();
  await expect(page).toHaveURL(/\/en\/experience\/pauwels-autotransformer$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pauwels power autotransformer");
  await page.getByRole("link", { name: "Ver esta página en español" }).click();
  await expect(page).toHaveURL(/\/es\/experiencia\/autotransformador-pauwels$/);
});

test("experience can be filtered and searched without losing accented names", async ({ page }) => {
  await page.goto("/es/experiencia");
  await expect(page.locator(".case-browser .case-card")).toHaveCount(12);
  await page.getByRole("button", { name: "Energía", exact: true }).click();
  await expect(page.locator(".case-browser .case-card")).toHaveCount(3);
  await page.getByRole("searchbox").fill("trinitária");
  await expect(page.locator(".case-browser .case-card")).toHaveCount(1);
  await expect(page.locator(".case-browser .case-card h3")).toHaveText("Turbina a vapor TV-1");
  await page.getByRole("button", { name: "Limpiar búsqueda", exact: true }).click();
  await page.getByRole("button", { name: "Marítimo", exact: true }).click();
  await expect(page.locator(".case-browser .case-card")).toHaveCount(3);
});

test("original photographs open in a keyboard-accessible gallery", async ({ page }) => {
  await page.goto("/es/experiencia/autotransformador-pauwels");
  const firstPhoto = page.getByRole("button", { name: /^Ampliar fotografía/ }).first();
  await firstPhoto.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".dialog-navigation > span")).toHaveText("2 / 14");
  await page.keyboard.press("Escape");
  await expect(page.locator(".photo-dialog")).not.toBeVisible();
  await expect(firstPhoto).toBeFocused();
  await page.getByRole("button", { name: /Ver todas las fotografías/ }).click();
  await expect(page.locator(".gallery-photo")).toHaveCount(14);
});

test("contact validates details and prepares an actual WhatsApp enquiry", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url) => {
      (window as unknown as { enquiryUrl: string }).enquiryUrl = String(url);
      return null;
    };
  });
  await page.goto("/es/contacto");
  const form = page.getByRole("tabpanel");
  await page.getByRole("button", { name: "Continuar por WhatsApp" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await form.getByLabel(/Nombre y apellido/).fill("María Torres");
  await form.getByRole("textbox", { name: "Empresa", exact: true }).fill("Prueba técnica");
  await form.getByLabel(/Correo electrónico/).fill("maria@example.com");
  await form.getByRole("radio", { name: "Aseguradora", exact: true }).check();
  await form.getByLabel("Teléfono / WhatsApp", { exact: false }).fill("999666167");
  await form.getByRole("radio", { name: /^Siniestro reciente/ }).check();
  await form.getByLabel(/Ubicación del reclamo \/ siniestro/).fill("Guayaquil, Ecuador");
  await form.getByRole("textbox", { name: "Descripción de la consulta", exact: true }).fill("Inspección de un transformador en Guayaquil.");
  await form.getByRole("checkbox", { name: /Estoy de acuerdo con la política de privacidad/ }).check();
  await expect(page.getByRole("button", { name: /correo|email/i })).toHaveCount(0);
  await page.getByRole("button", { name: "Continuar por WhatsApp" }).click();
  await expect(page.getByRole("status")).toContainText("La consulta está preparada");
  const url = new URL(await page.evaluate(() => (window as unknown as { enquiryUrl: string }).enquiryUrl));
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/593999666167");
  expect(url.searchParams.get("text")).toContain("Solicitud de consulta profesional");
  expect(url.searchParams.get("text")).toContain("María Torres");
  expect(url.searchParams.get("text")).toContain("maria@example.com");
  expect(url.searchParams.get("text")).toContain("Guayaquil, Ecuador");
  expect(url.searchParams.get("text")).toContain("Inspección de un transformador en Guayaquil.");
});

test("registered activities can be located by code", async ({ page }) => {
  await page.goto("/es/acreditaciones");
  await page.getByRole("searchbox").fill("K66210001");
  await expect(page.getByRole("rowheader", { name: "K66210001", exact: true })).toBeVisible();
  await expect(page.locator(".register-browser .results-count")).toHaveText("1 registro");
  await page.getByRole("searchbox").fill("46121");
  await expect(page.getByRole("cell", { name: "Transformadores eléctricos", exact: true })).toBeVisible();
  await expect(page.locator(".authorization-grid > li")).toHaveCount(16);
});

test("mobile navigation closes with Escape and after choosing a page", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "The desktop navigation is always visible.");
  await page.goto("/es");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.locator(".primary-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".primary-nav")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.locator(".primary-nav").getByRole("link", { name: "Nosotros", exact: true }).click();
  await expect(page).toHaveURL(/\/es\/nosotros$/);
  await expect(page.locator(".primary-nav")).not.toBeVisible();
});

test("page templates fit the viewport and have no accessibility violations", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const paths = ["/es", "/es/nosotros", "/es/servicios", "/es/servicios/energia-y-generacion", "/es/experiencia", "/es/experiencia/autotransformador-pauwels", "/es/equipo", "/es/acreditaciones", "/es/contacto"];
  for (const [index, path] of paths.entries()) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(1);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })), path).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`template-${index}.png`), fullPage: false });
    if (index === 0) {
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = "auto";
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        for (let y = 0; y < document.body.scrollHeight; y += 650) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        await Promise.all(Array.from(document.images).filter((image) => !image.closest("[inert]")).map((image) => image.decode().catch(() => undefined)));
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await expect(page.locator(".hero-copy h1")).toBeInViewport();
      const brokenImages = await page.evaluate(() => Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
      expect(brokenImages).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath("home-full.png"), fullPage: true });
    }
  }
  expect(errors).toEqual([]);
});
