import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("hero presents all four bilingual slides with working media and accessible controls", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  for (const locale of ["es", "en"]) {
    await page.goto(`/${locale}`);
    const hero = page.locator(".home-slider");
    const next = hero.getByRole("button", { name: locale === "es" ? "Diapositiva siguiente" : "Next slide" });
    const seal = hero.getByRole("img", { name: locale === "es" ? "38 años · Confianza mutua" : "38 years · Mutual trust" });
    await expect(seal).toBeVisible();
    await expect(hero.locator("h1")).toHaveCount(1);
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
    let height = 0;

    for (let index = 0; index < 4; index++) {
      const active = hero.locator('.hero-slide[aria-hidden="false"]');
      await expect(active).toHaveAttribute("id", `hero-slide-${index}`);
      await expect(hero.locator(".hero-slide[inert]")).toHaveCount(3);
      await expect(active.getByRole("link").first()).toHaveAttribute("href", "https://wa.me/593999666167");
      await expect(active.getByRole("link").last()).toHaveAttribute("href", locale === "es" ? "/es/servicios" : "/en/services");
      if (index === 1) await expect(active.getByRole("listitem")).toHaveCount(8);
      await active.locator("img").evaluateAll(async (images) => {
        await Promise.all(images.map((image) => (image as HTMLImageElement).decode()));
      });
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      const currentHeight = (await hero.boundingBox())!.height;
      if (index === 0) height = currentHeight;
      expect(Math.abs(currentHeight - height)).toBeLessThanOrEqual(1);
      const results = await new AxeBuilder({ page }).include(".home-slider").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations).toEqual([]);
      await hero.screenshot({ path: testInfo.outputPath(`${locale}-hero-${index + 1}.png`), style: ".site-header, .skip-link { visibility: hidden !important; }" });
      await next.click();
    }

    await expect(hero.locator(".hero-slide.is-active")).toHaveAttribute("id", "hero-slide-0");
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
  }
  expect(errors).toEqual([]);
});

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
  await hero.getByRole("button", { name: "Diapositiva siguiente" }).focus();
  await page.clock.fastForward(16000);
  await expect(active).toHaveAttribute("id", "hero-slide-3");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es");
  await page.clock.fastForward(24000);
  await expect(active).toHaveAttribute("id", "hero-slide-0");
  await expect(hero.locator("[data-rotation]")).toHaveCount(0);
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
