import { test, expect } from '@playwright/test';

const routes = ['/', '/karya', '/layanan', '/tentang', '/kontak'];
for (const width of [320, 375, 768, 1024, 1440]) {
  test(`all routes fit a ${width}px viewport without horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        route,
      ).toBeLessThanOrEqual(width);
    }
    await page.goto('/karya');
    await page
      .getByRole('button', { name: /^Lihat studi desain/ })
      .first()
      .click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    expect(
      await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  });
}

for (const [hash, destination] of Object.entries({
  karya: '/karya',
  layanan: '/layanan',
  proses: '/layanan#proses',
  faq: '/layanan#faq',
  tim: '/tentang',
  kontak: '/kontak',
})) {
  test(`legacy #${hash} redirects to ${destination}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/#${hash}`);
    await expect(page).toHaveURL(destination);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    if (destination.includes('#')) {
      const target = page.locator(`#${hash}`);
      await expect(target).toBeInViewport();
    }
  });
}

test('direct process and FAQ deep links preserve their targets', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const id of ['proses', 'faq']) {
    await page.goto(`/layanan#${id}`);
    await expect(page).toHaveURL(`/layanan#${id}`);
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test('reduced motion, including live changes, leaves content readable without Lenis, pins or cursor effects', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of routes) {
    if (route !== '/') await page.goto(route);
    await expect(page.locator('html')).not.toHaveClass(/lenis/);
    await expect(
      page.locator('.pin-spacer, [class*="cursor"], [class*="marquee"]'),
    ).toHaveCount(0);
    const hidden = await page
      .locator(
        '[data-reveal], [data-line], [data-hero-support], [data-hero-visual]',
      )
      .evaluateAll((elements) =>
        elements
          .filter((el) => {
            const style = getComputedStyle(el);
            return (
              Number(style.opacity) !== 1 ||
              style.visibility === 'hidden' ||
              style.display === 'none' ||
              style.transform !== 'none'
            );
          })
          .map((el) => el.textContent.slice(0, 80)),
      );
    expect(hidden, route).toEqual([]);
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await page.getByRole('button', { name: 'Kembali ke atas' }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});
