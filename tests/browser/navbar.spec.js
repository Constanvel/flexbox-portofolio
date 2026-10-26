import { test, expect } from '@playwright/test';

test('navbar changes from open header to compact directional navigation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const header = page.locator('.header');
  await expect(header).not.toHaveClass(/is-scrolled/);
  await expect(page.locator('.motion-toggle')).toHaveCount(0);
  const initialWidth = (await header.boundingBox()).width;
  await page.evaluate(() => window.scrollTo(0, 250));
  await expect(header).toHaveClass(/is-scrolled/);
  expect((await header.boundingBox()).width).toBeLessThan(initialWidth);
  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(header).toHaveClass(/is-hidden/);
  await page.evaluate(() => window.scrollTo(0, 700));
  await expect(header).not.toHaveClass(/is-hidden/);
  await page.evaluate(() => window.scrollTo(0, 1100));
  await expect(header).toHaveClass(/is-hidden/);
  await page.getByRole('link', { name: 'Karya', exact: true }).focus();
  expect((await header.boundingBox()).y).toBeGreaterThanOrEqual(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).not.toHaveClass(/is-scrolled/);
});
