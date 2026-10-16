import { expect, test } from "@playwright/test";

test("one typography scale resizes reading text, headings and navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es/servicios");
  await page.evaluate(() => document.fonts.ready);

  const selectors = ["body", ".page-hero h1", ".page-hero-content > p", ".service-card > p", ".service-card h3", ".service-card .text-link", ".nav-link", ".footer-links > a"];
  const before = await page.evaluate((items) => items.map((selector) => {
    const style = getComputedStyle(document.querySelector(selector)!);
    return { selector, size: parseFloat(style.fontSize), weight: Number(style.fontWeight) };
  }), selectors);

  expect(before[0].size).toBeGreaterThanOrEqual(18);
  expect(before.find((item) => item.selector === ".service-card > p")!.size).toBeGreaterThanOrEqual(16);
  for (const item of before) {
    expect(item.size, item.selector).toBeGreaterThanOrEqual(14);
    expect(item.weight, item.selector).toBeGreaterThanOrEqual(500);
  }
  for (const selector of [".page-hero h1", ".service-card h3"]) expect(before.find((item) => item.selector === selector)!.weight).toBeGreaterThanOrEqual(600);

  await page.evaluate(() => {
    const root = document.documentElement;
    const current = Number(getComputedStyle(root).getPropertyValue("--type-scale")) || 1;
    root.style.setProperty("--type-scale", String(current * 1.1));
  });
  const after = await page.evaluate((items) => items.map((selector) => parseFloat(getComputedStyle(document.querySelector(selector)!).fontSize)), selectors);
  for (const [index, size] of after.entries()) expect(size, selectors[index]).toBeCloseTo(before[index].size * 1.1, 1);

  await page.evaluate(() => {
    const root = document.documentElement;
    root.style.removeProperty("--type-scale");
    root.style.fontSize = `${parseFloat(getComputedStyle(root).fontSize) * 1.25}px`;
  });
  expect(await page.locator("body").evaluate((body) => parseFloat(getComputedStyle(body).fontSize))).toBeCloseTo(before[0].size * 1.25, 1);

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/es/experiencia");
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  for (const amount of await page.locator(".settlement-strip strong").all()) {
    await expect(amount).toBeVisible();
    expect(await amount.evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(32);
  }
});
