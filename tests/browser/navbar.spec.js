import { test, expect } from '@playwright/test';

async function scroll(page, y) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(y);
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
}

test('navbar compacts after 120px and hides after 400px with a 10px directional threshold', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const header = page.locator('.header');
  const inner = page.locator('.nav-inner');
  const initialWidth = (await inner.boundingBox()).width;
  await expect(header).not.toHaveClass(/is-scrolled/);
  await expect(page.locator('.motion-toggle')).toHaveCount(0);
  await scroll(page, 120);
  await expect(header).not.toHaveClass(/is-scrolled/);
  await scroll(page, 121);
  await expect(header).toHaveClass(/is-scrolled/);
  expect((await inner.boundingBox()).width).toBeLessThan(initialWidth);
  await scroll(page, 399);
  await expect(header).not.toHaveClass(/is-hidden/);
  await scroll(page, 400);
  await expect(header).not.toHaveClass(/is-hidden/);
  await scroll(page, 411);
  await expect(header).toHaveClass(/is-hidden/);
  await scroll(page, 405);
  await expect(header).toHaveClass(/is-hidden/);
  await scroll(page, 400);
  await expect(header).not.toHaveClass(/is-hidden/);
  await scroll(page, 411);
  await expect(header).toHaveClass(/is-hidden/);
  const link = header.getByRole('link', { name: 'Karya', exact: true });
  await page.keyboard.press('Tab');
  await link.focus();
  await expect(link).toBeFocused();
  expect((await header.boundingBox()).y).toBeGreaterThanOrEqual(0);
  expect(await link.evaluate((el) => el.matches(':focus-visible'))).toBe(true);
  expect(
    await link.evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe('none');
  await link.blur();
  await scroll(page, 0);
  await expect(header).not.toHaveClass(/is-scrolled|is-hidden/);
});

for (const width of [768, 1023, 1024]) {
  test(`navigation uses the appropriate layout at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const trigger = page.getByRole('button', { name: /^Menu/ });
    const navigation = page.getByRole('navigation', {
      name: 'Navigasi utama',
      exact: true,
    });
    if (width < 1024) {
      await expect(trigger).toBeVisible();
      await expect(navigation).not.toBeVisible();
      await trigger.click();
      await page
        .getByRole('dialog')
        .getByRole('link', { name: /Layanan/ })
        .click();
      await expect(page).toHaveURL('/layanan');
      await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
    } else {
      await expect(trigger).not.toBeVisible();
      await expect(navigation).toBeVisible();
      await navigation
        .getByRole('link', { name: 'Karya', exact: true })
        .click();
      await expect(page).toHaveURL('/karya');
      await expect(
        page
          .getByRole('navigation', { name: 'Navigasi utama', exact: true })
          .getByRole('link', { name: 'Karya', exact: true }),
      ).toHaveAttribute('aria-current', 'page');
    }
  });
}
