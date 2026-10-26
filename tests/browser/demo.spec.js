import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function axe(page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(
    result.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    })),
  ).toEqual([]);
}

test('project studies support keyboard activation, modal focus, locking, Escape and reopening', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: /^Lihat studi desain/ }),
  ).toHaveCount(2);
  await page.getByRole('link', { name: 'Semua studi desain' }).click();
  await expect(page).toHaveURL('/karya');
  const cards = page.getByRole('button', { name: /^Lihat studi desain/ });
  await expect(cards).toHaveCount(3);
  await cards.first().focus();
  for (let index = 0; index < 3; index++) {
    await expect(cards.nth(index)).toBeFocused();
    if (index < 2) await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', {
    name: 'Panel pengelolaan katalog',
  });
  const close = page.getByRole('button', { name: 'Tutup studi desain' });
  await expect(dialog).toBeVisible();
  await expect(close).toBeFocused();
  await expect
    .poll(() => dialog.evaluate((el) => Number(getComputedStyle(el).opacity)))
    .toBe(1);
  await expect(dialog).toContainText('Bukan proyek klien');
  await page.keyboard.press('Tab');
  // A native dialog with one focusable control may cycle through browser chrome.
  // Returning with Shift+Tab must focus the modal, never a background control.
  await page.keyboard.press('Shift+Tab');
  await expect(close).toBeFocused();
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  const scroll = await page.evaluate(() => scrollY);
  await page.mouse.move(10, 500);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(200);
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(cards.nth(2)).toBeFocused();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  await cards.nth(2).click();
  await expect(dialog).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await close.click();
  await expect(dialog).toHaveCount(0);
  await expect(cards.nth(2)).toBeFocused();
  await cards.first().click();
  await expect(
    page.getByRole('dialog', { name: 'Profil bisnis usaha lokal' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(cards.first()).toBeFocused();
  expect(errors).toEqual([]);
});

for (const name of [
  'Profil bisnis usaha lokal',
  'Katalog produk',
  'Panel pengelolaan katalog',
]) {
  test(`study dialog ${name} passes Axe`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/karya');
    await page
      .getByRole('button', { name: `Lihat studi desain ${name}`, exact: true })
      .click();
    await expect(page.getByRole('dialog', { name, exact: true })).toBeVisible();
    await axe(page);
  });
}

test('touch devices use native scrolling and accessible modal menu navigation', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await page.evaluate(() => window.scrollTo(0, 350));
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  const trigger = page.getByRole('button', { name: /^Menu/ });
  await trigger.tap();
  const menu = page.getByRole('dialog', { name: /Flexbox \/ Navigasi/i });
  await expect(menu).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: 'Tutup menu' })).toBeFocused();
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  await axe(page);
  await page.keyboard.press('Escape');
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.tap();
  await menu.getByRole('link', { name: /Karya/ }).tap();
  await expect(page).toHaveURL('/karya');
  await expect(
    page.getByRole('button', { name: /^Lihat studi desain/ }),
  ).toHaveCount(3);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  await context.close();
});
