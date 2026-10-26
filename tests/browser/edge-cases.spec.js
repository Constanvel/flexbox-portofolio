import { test, expect } from '@playwright/test';

test('wheel scrolls vertically; motion toggle preserves native showcase', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole('link', { name: 'Karya', exact: true }).click();
  await expect(page.locator('#karya')).toBeFocused();
  const initialScroll = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 900);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(initialScroll);
  await expect(page.locator('#karya')).not.toHaveClass(/is-horizontal/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  expect(
    await page
      .locator('.project-track')
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe('none');
  await page
    .getByRole('button', { name: 'Lihat konsep Produk jadi percakapan.' })
    .click();
  const before = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Lihat konsep Produk jadi percakapan.' }),
  ).toBeFocused();
});

test('320px reduced-motion layout does not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  );
  await page.getByRole('button', { name: 'Menu +' }).click();
  await page.getByRole('link', { name: 'Eksplorasi', exact: true }).click();
  await expect(page.locator('#karya')).toBeFocused();
});
