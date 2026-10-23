import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("about submenu reaches each anchor from another page and within About", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const mobile = testInfo.project.name === "mobile";
  if (mobile) await page.setViewportSize({ width: 320, height: 900 });

  for (const locale of ["es", "en"] as const) {
    const es = locale === "es";
    if (!mobile && !es) await page.setViewportSize({ width: 1281, height: 1000 });
    const about = es ? "/es/nosotros" : "/en/about";
    const openMenu = es ? "Abrir menú" : "Open menu";
    const submenuLabel = es ? "Secciones de Nosotros" : "About us sections";
    const choices = [
      { label: es ? "Nuestra empresa" : "Our company", anchor: "nuestra-empresa" },
      { label: es ? "Nuestra historia" : "Our history", anchor: "nuestra-historia" },
      { label: "Marine cargo", anchor: "marine-cargo" },
      { label: es ? "Londres" : "London", anchor: "londres" },
      { label: es ? "Reaseguradores" : "Reinsurers", anchor: "reaseguradores" },
    ];
    await page.goto(es ? "/es/servicios" : "/en/services");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);

    for (const [index, choice] of choices.entries()) {
      if (mobile) await page.getByRole("button", { name: openMenu, exact: true }).click();
      const toggle = page.getByRole("button", { name: submenuLabel, exact: true });
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      const submenu = page.locator("#about-navigation");
      await expect(submenu.getByRole("link")).toHaveText(choices.map((item) => item.label));
      if (es && index === 0) await page.screenshot({ path: testInfo.outputPath("about-menu.png") });
      const link = submenu.getByRole("link", { name: choice.label, exact: true });
      await expect(link).toHaveAttribute("href", `${about}#${choice.anchor}`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${about}#${choice.anchor}$`));
      await expect(submenu).toBeHidden();
      if (mobile) await expect(page.locator(".primary-nav")).toBeHidden();
      const target = page.locator(`#${choice.anchor}`);
      await expect(target).toBeInViewport();
      await expect.poll(() => target.evaluate((element) => element.getBoundingClientRect().top - document.querySelector(".site-header")!.getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(-1);
    }
    await page.reload();
    await expect(page.locator("#reaseguradores")).toBeInViewport();
  }
});

test("about dropdown supports keyboard, hover, Escape and outside dismissal", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const mobile = testInfo.project.name === "mobile";
  if (mobile) await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/es/nosotros");
  const submenu = page.locator("#about-navigation");
  const toggle = page.locator(".nav-submenu-toggle");
  const mainToggle = page.getByRole("button", { name: "Abrir menú", exact: true });

  if (!mobile) {
    await page.locator(".nav-dropdown-row > .nav-link").hover();
    await expect(submenu).toBeVisible();
    await page.mouse.move(5, 5);
    await expect(submenu).toBeHidden();
  } else {
    await mainToggle.click();
  }

  await toggle.focus();
  await toggle.press("Enter");
  await expect(submenu).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations.map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) }))).toEqual([]);
  await toggle.focus();
  await page.keyboard.press("ArrowDown");
  await expect(submenu.getByRole("link", { name: "Nuestra empresa", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(submenu.getByRole("link", { name: "Nuestra historia", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(submenu.getByRole("link", { name: "Nuestra empresa", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(submenu.getByRole("link", { name: "Nuestra historia", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(submenu).toBeHidden();
  await expect(toggle).toBeFocused();

  if (mobile) {
    await expect(page.locator(".primary-nav")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".primary-nav")).toBeHidden();
    await expect(mainToggle).toBeFocused();
    await mainToggle.click();
  }
  await toggle.click();
  await expect(submenu).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(submenu).toBeHidden();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
