import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["es", "en"]) {
  test(`hero presents four reference-based slides with working media and accessible controls (${locale})`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/${locale}`);
    const hero = page.locator(".home-slider");
    const motto = page.locator(".topline-motto");
    await expect(motto).toHaveText(locale === "es" ? "Sirviendo al mercado asegurador" : "Serving the insurance market");
    expect(await motto.evaluate((element) => getComputedStyle(element).fontFamily)).not.toBe(await page.locator("body").evaluate((element) => getComputedStyle(element).fontFamily));
    const next = hero.getByRole("button", { name: locale === "es" ? "Diapositiva siguiente" : "Next slide" });
    const seal = hero.getByRole("img", { name: locale === "es" ? "Confianza mutua" : "Mutual trust", exact: true });
    await expect(seal).toBeVisible();
    await expect(hero.locator("h1")).toHaveCount(1);
    await expect(hero.locator(".hero-slide")).toHaveCount(4);
    await expect(hero.locator(".hero-slide-tab")).toHaveCount(4);
    const controlsBox = (await hero.locator(".hero-slider-controls").boundingBox())!;
    const slidesBox = (await hero.locator(".hero-slides").boundingBox())!;
    const mobileControls = page.viewportSize()!.width <= 760;
    if (mobileControls) {
      await expect(hero.getByRole("button")).toHaveCount(2);
      expect(controlsBox.y).toBeGreaterThanOrEqual(slidesBox.y);
      expect(controlsBox.y - slidesBox.y).toBeLessThanOrEqual(24);
    } else {
      expect(controlsBox.y + controlsBox.height).toBeLessThanOrEqual(slidesBox.y + 1);
    }
    const heights: number[] = [];

    for (let index = 0; index < 4; index++) {
      const active = hero.locator('.hero-slide[aria-hidden="false"]');
      await expect(active).toHaveAttribute("id", `hero-slide-${index}`);
      await expect(hero.locator(".hero-slide[inert]")).toHaveCount(3);
      const actions = active.locator(".hero-actions");
      const links = actions.getByRole("link");
      await expect(links).toHaveCount(index === 0 ? 0 : 1);
      await expect(active.getByRole("link", { name: locale === "es" ? /Agendar reunión/ : /Schedule a meeting/ })).toHaveCount(0);
      if (index > 0) {
        await expect(links.first()).toHaveAttribute("href", locale === "es" ? "/es/contacto#consulta" : "/en/contact#consulta");
        await expect(links.first()).toHaveText(locale === "es" ? "Solicitar consulta profesional" : "Request a professional consultation");
      }
      const summary = active.locator(index === 0 || index >= 3 ? ".hero-settlement" : ".hero-message-panel");
      const summaryBox = (await summary.boundingBox())!;
      if (index > 0) {
        const actionsBox = (await actions.boundingBox())!;
        expect(actionsBox.x + actionsBox.width).toBeLessThanOrEqual(summaryBox.x + 1);
      } else {
        await expect(actions).toHaveCount(0);
      }
      if (index === 0 || index >= 3) {
        await expect(active.locator(".hero-settlement-amount strong")).toHaveText(locale === "es" ? "13,8" : "13.8");
        await expect(active.locator(".hero-settlement")).toHaveAttribute("href", locale === "es" ? "/es/experiencia" : "/en/experience");
      } else {
        await expect(active.locator(".hero-settlement")).toHaveCount(0);
        await expect(active.locator(".hero-message-panel")).toBeVisible();
      }
      if (index === 0) {
        await expect(active.locator(".trust-scene-statistics dd")).toHaveCount(3);
        await expect(active.locator(".trust-scene-statistics dd").nth(1)).toHaveText("16");
      }
      if (index === 1) {
        await expect(active.locator(".hero-slide-title")).toHaveText(locale === "es" ? "Servicios relevantes" : "Key services");
        await expect(active.locator(".hero-service-list > li")).toHaveCount(4);
        await expect(active.locator(".turbine-pillar")).toHaveCount(4);
      }
      if (index === 2) {
        const classes = active.locator(".hero-coverage-classes > li");
        await expect(classes).toHaveCount(18);
        await expect(active.locator(".hero-coverage-authority")).toHaveCount(0);
        await expect(classes.nth(4)).toHaveText(locale === "es" ? "Marítimo: casco & maquinaria" : "Marine: hull & machinery");
        await expect(classes.nth(5)).toHaveText(locale === "es" ? "Transporte marítimo y terrestre" : "Sea and land transport");
        await expect(classes.nth(15)).toHaveText(locale === "es" ? "Casco aéreo" : "Aircraft hull");
        await expect(classes.nth(16)).toHaveText(locale === "es" ? "Robo" : "Theft");
        await expect(classes.nth(17)).toHaveText(locale === "es" ? "Vehículos" : "Motor vehicles");
        await expect(active.locator("img")).toHaveCount(8);
      }
      if (index >= 3) {
        await expect(active.locator(".hero-slide-title")).toHaveText(locale === "es" ? "Intervención en siniestros complejos" : "Intervention in complex losses");
        await expect(active.locator("img")).toHaveCount(5);
        await expect(active.locator(".intervention-case-row")).toHaveCount(4);
        await expect(active.locator(".intervention-case-amount")).toHaveText(locale === "es" ? ["8.253.493,28", "1.947.668,80", "1.624.063,03", "2.000.000,00"] : ["8,253,493.28", "1,947,668.80", "1,624,063.03", "2,000,000.00"]);
        const tableRegion = active.locator(".hero-intervention-table-scroll");
        await tableRegion.focus();
        await page.keyboard.press("ArrowLeft");
        await expect(hero.locator(".hero-slide.is-active")).toHaveAttribute("id", `hero-slide-${index}`);
        await tableRegion.evaluate((element) => {
          const start = new Touch({ identifier: 1, target: element, clientX: 300, clientY: 300 });
          const end = new Touch({ identifier: 1, target: element, clientX: 100, clientY: 310 });
          element.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
          element.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
        });
        await expect(hero.locator(".hero-slide.is-active")).toHaveAttribute("id", `hero-slide-${index}`);
      }
      if (index > 0) {
        await expect(active.locator(".hero-consultation-note h3")).toHaveText(locale === "es" ? "Conversemos sobre el alcance de su consulta" : "Let’s discuss the scope of your enquiry");
        await expect(active.locator(".hero-consultation-note p")).toHaveCount(2);
        await expect(active.locator(".hero-consultation-note p").first()).toContainText(locale === "es" ? "la documentación técnica necesaria para un análisis preliminar" : "the technical documentation needed for a preliminary assessment");
        await expect(active.locator(".hero-consultation-note p").last()).toContainText(locale === "es" ? "coordinaremos una reunión profesional" : "we will arrange a professional meeting");
        const note = (await active.locator(".hero-consultation-note").boundingBox())!;
        const visual = (await active.locator(".hero-visual").boundingBox())!;
        const copy = (await active.locator(".hero-copy").boundingBox())!;
        const noteGap = note.y - Math.max(visual.y + visual.height, copy.y + copy.height);
        expect(noteGap).toBeGreaterThanOrEqual(0);
        expect(noteGap).toBeLessThanOrEqual(32);
      }
      for (const image of await active.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        expect(await image.evaluate(async (element: HTMLImageElement) => {
          await element.decode();
          return element.naturalWidth > 0;
        })).toBe(true);
      }
      await page.evaluate(() => { window.scrollTo({ top: 0, behavior: "instant" }); });
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      const slide = (await active.boundingBox())!;
      const frame = (await hero.locator(".hero-slides").boundingBox())!;
      const copy = (await active.locator(".hero-copy").boundingBox())!;
      const visual = (await active.locator(".hero-visual").boundingBox())!;
      expect(Math.abs(frame.height - slide.height)).toBeLessThanOrEqual(1);
      expect(copy.y - frame.y).toBeLessThanOrEqual(mobileControls ? 80 : 40);
      if (!mobileControls) expect(Math.abs(copy.y - visual.y)).toBeLessThanOrEqual(1);
      const lastBlock = index > 0 ? (await active.locator(".hero-consultation-note").boundingBox())! : [copy, visual].reduce((last, block) => block.y + block.height > last.y + last.height ? block : last);
      const bottomSpace = slide.y + slide.height - lastBlock.y - lastBlock.height;
      expect(bottomSpace).toBeGreaterThanOrEqual(0);
      expect(bottomSpace).toBeLessThanOrEqual(40);
      heights.push((await hero.boundingBox())!.height);
      const results = await new AxeBuilder({ page }).include(".home-slider").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations).toEqual([]);
      await hero.screenshot({ path: testInfo.outputPath(`${locale}-hero-${index + 1}.png`), style: ".site-header, .skip-link { visibility: hidden !important; }" });
      await next.click();
    }

    await expect(hero.locator(".hero-slide.is-active")).toHaveAttribute("id", "hero-slide-0");
    expect(Math.max(...heights) - Math.min(...heights)).toBeGreaterThan(100);
    expect((await hero.boundingBox())!.height).toBeCloseTo(heights[0], 0);
    await next.focus();
    await page.keyboard.press("ArrowLeft");
    await expect(hero.locator(".hero-slide.is-active")).toHaveAttribute("id", "hero-slide-3");
    if (mobileControls) {
      await next.click();
      await next.click();
    } else {
      await hero.locator(".hero-slide-tab").nth(1).click();
    }
    await expect(hero.locator(".hero-slide.is-active")).toHaveAttribute("id", "hero-slide-1");
    await hero.locator(".hero-slide.is-active .hero-actions").getByRole("link", { name: locale === "es" ? /Solicitar consulta profesional/i : /Request a professional consultation/i }).click();
    await expect(page).toHaveURL(new RegExp(locale === "es" ? "/es/contacto#consulta$" : "/en/contact#consulta$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("tab", { name: locale === "es" ? "Consulta profesional" : "Professional consultation" })).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".consultation-form")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("autoplay keeps running on hover and respects pause, keyboard focus and reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Mouse hover and keyboard focus are checked on desktop.");
  await page.clock.install();
  await page.goto("/es");
  const hero = page.locator(".home-slider");
  const active = hero.locator(".hero-slide.is-active");
  await expect(hero.locator(".hero-tab-progress")).toHaveClass(/is-running/);
  await hero.hover();
  await expect(hero.locator(".hero-tab-progress")).toHaveClass(/is-running/);
  await page.clock.fastForward(8100);
  await expect(active).toHaveAttribute("id", "hero-slide-1");
  await page.clock.fastForward(8100);
  await expect(active).toHaveAttribute("id", "hero-slide-2");
  await hero.getByRole("button", { name: "Pausar carrusel" }).click();
  await page.mouse.move(0, 0);
  await page.clock.fastForward(16000);
  await expect(active).toHaveAttribute("id", "hero-slide-2");
  await hero.getByRole("button", { name: "Reanudar carrusel" }).click();
  await page.mouse.move(0, 0);
  await page.clock.fastForward(8100);
  await expect(active).toHaveAttribute("id", "hero-slide-3");
  await page.clock.fastForward(8100);
  await expect(active).toHaveAttribute("id", "hero-slide-0");
  await hero.getByRole("button", { name: "Diapositiva siguiente" }).focus();
  await page.clock.fastForward(16000);
  await expect(active).toHaveAttribute("id", "hero-slide-0");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es");
  await page.clock.fastForward(24000);
  await expect(active).toHaveAttribute("id", "hero-slide-0");
  await expect(hero.locator("[data-rotation]")).toHaveCount(0);
});

test("slides two through four consultation actions reach the matching contact forms at narrow widths", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: testInfo.project.name === "mobile" ? 320 : 768, height: 1000 });
  for (const locale of ["es", "en"]) {
    const es = locale === "es";
    for (const index of [1, 2, 3]) {
      await page.goto(`/${locale}`);
      const hero = page.locator(".home-slider");
      for (let step = 0; step < index; step++) await hero.getByRole("button", { name: es ? "Diapositiva siguiente" : "Next slide", exact: true }).click();
      const slide = hero.locator(".hero-slide.is-active");
      await expect(slide).toHaveAttribute("id", `hero-slide-${index}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      await expect(slide.locator(".hero-consultation-note p")).toHaveCount(2);
      await expect(slide.getByRole("link", { name: es ? "Agendar reunión" : "Schedule a meeting" })).toHaveCount(0);
      await slide.getByRole("link", { name: es ? "Solicitar consulta profesional" : "Request a professional consultation", exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/${es ? "contacto" : "contact"}#consulta$`));
      await expect(page.getByRole("tab", { name: es ? "Consulta profesional" : "Professional consultation", exact: true })).toHaveAttribute("aria-selected", "true");
      await expect(page.locator(".consultation-form")).toBeVisible();
    }
  }
});

test("touch swipes change slides without treating vertical scrolling as navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Touch interaction is checked on mobile.");
  await page.goto("/es");
  const hero = page.locator(".home-slider");
  const active = hero.locator(".hero-slide.is-active");
  await hero.evaluate((element) => {
    const start = new Touch({ identifier: 1, target: element, clientX: 300, clientY: 300 });
    const end = new Touch({ identifier: 1, target: element, clientX: 100, clientY: 310 });
    element.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
    element.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
  });
  await expect(active).toHaveAttribute("id", "hero-slide-1");
  await hero.evaluate((element) => {
    const start = new Touch({ identifier: 2, target: element, clientX: 200, clientY: 400 });
    const end = new Touch({ identifier: 2, target: element, clientX: 120, clientY: 100 });
    element.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
    element.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
  });
  await expect(active).toHaveAttribute("id", "hero-slide-1");
});
