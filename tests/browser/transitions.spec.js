import { test, expect } from '@playwright/test';

test('study preview switches sizes and card cutout responds to hover', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/karya');
  const card = page
    .getByRole('button', { name: /^Lihat studi desain/ })
    .first();
  await card.hover();
  await expect(card.locator('.project-cutout')).toHaveCSS(
    'padding-top',
    '18px',
  );
  await card.click();
  const dialog = page.getByRole('dialog', {
    name: 'Profil bisnis usaha lokal',
  });
  const frame = dialog.locator('.responsive-preview-frame');
  await dialog.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect(
    dialog.getByRole('button', { name: 'Mobile', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect
    .poll(async () => Math.round((await frame.boundingBox()).width))
    .toBe(320);
  await expect(dialog.locator('.preview-status')).toContainText(
    'Preview mobile',
  );
  await dialog.getByRole('button', { name: 'Desktop', exact: true }).click();
  await expect
    .poll(async () => (await frame.boundingBox()).width)
    .toBeGreaterThan(800);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await dialog.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect(frame).toHaveCSS('transition-duration', '0s');
  await page.keyboard.press('Escape');
  await expect(card).toBeFocused();
});

test('navbar width interpolates instead of snapping between scroll states', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const nav = page.locator('.nav-inner');
  const initial = (await nav.boundingBox()).width;
  await page.evaluate(() => window.scrollTo(0, 180));
  await expect(page.locator('.header')).toHaveClass(/is-scrolled/);
  await page.waitForTimeout(100);
  const intermediate = (await nav.boundingBox()).width;
  expect(intermediate).toBeLessThan(initial);
  expect(intermediate).toBeGreaterThan(1000);
  await expect.poll(async () => (await nav.boundingBox()).width).toBe(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(async () => (await nav.boundingBox()).width).toBe(initial);
});

test('mobile menu animates without overriding reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: /^Menu/ }).click();
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeVisible();
  await expect
    .poll(() => menu.evaluate((el) => getComputedStyle(el).opacity))
    .toBe('1');
  await page.keyboard.press('Escape');
  await expect(menu).not.toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: /^Menu/ }).click();
  await expect(menu).toHaveCSS('transition-duration', '0s');
  await expect(menu).toHaveCSS('opacity', '1');
});
