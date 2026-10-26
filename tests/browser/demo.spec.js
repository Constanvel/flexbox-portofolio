import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function ready(page, route = '/') {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(route);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.waitForTimeout(1500);
  return errors;
}

async function noOverflow(page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}

async function checkAxe(page) {
  const projectDialog = page.locator('.project-dialog[open]');
  if (await projectDialog.count()) {
    await expect
      .poll(() =>
        projectDialog.evaluate((el) => Number(getComputedStyle(el).opacity)),
      )
      .toBe(1);
    await page.waitForTimeout(650);
  }
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(
    result.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((n) => n.target),
    })),
  ).toEqual([]);
}

test('desktop: project navigation, keyboard, dialog and reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors = await ready(page);
  await expect(page.locator('#karya')).not.toHaveClass(/is-horizontal/);
  await noOverflow(page);
  await checkAxe(page);
  await page.screenshot({ path: '.playwright/desktop.png', fullPage: false });

  await expect(page.getByRole('button', { name: /^Lihat konsep/ })).toHaveCount(
    1,
  );
  await page.getByRole('link', { name: 'Semua eksplorasi' }).click();
  await expect(page).toHaveURL('/karya');
  const cards = page.getByRole('button', { name: /^Lihat konsep/ });
  await expect(cards).toHaveCount(3);
  await cards.first().focus();
  for (let i = 0; i < 3; i++) {
    const card = cards.nth(i);
    await expect(card).toBeFocused();
    const rect = await card.boundingBox();
    expect(rect.x).toBeGreaterThanOrEqual(-1);
    expect(rect.x + rect.width).toBeLessThanOrEqual(1441);
    if (i < 2) await page.keyboard.press('Tab');
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '.playwright/showcase.png' });
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('dialog', { name: 'Ide bertemu bentuk.' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Tutup detail konsep' }),
  ).toBeFocused();
  await checkAxe(page);
  const scroll = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  await page.keyboard.press('Escape');
  await expect(cards.nth(2)).toBeFocused();
  await page.getByRole('link', { name: 'Lihat layanan', exact: true }).click();
  await expect(page).toHaveURL('/layanan');
  await expect(page.locator('#layanan')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await checkAxe(page);
  await page
    .getByRole('button', { name: 'Kembali ke atas', exact: true })
    .click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#karya')).not.toHaveClass(/is-horizontal/);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await noOverflow(page);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('#karya')).not.toHaveClass(/is-horizontal/);
  expect(errors).toEqual([]);
});

test('mobile touch: vertical, native dialog lock, menu routes', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const errors = await ready(page);
  await expect(page.locator('#karya')).not.toHaveClass(/is-horizontal/);
  await noOverflow(page);
  await checkAxe(page);
  await page.screenshot({ path: '.playwright/mobile.png' });
  await page.locator('#karya').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '.playwright/mobile-showcase.png' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Menu +' }).click();
  await expect(
    page.getByRole('dialog', { name: 'FLEXBOX / NAVIGASI' }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).overflow,
    ),
  ).toBe('hidden');
  await page.getByRole('link', { name: 'Eksplorasi', exact: true }).click();
  await expect(page).toHaveURL('/karya');
  await expect(page.getByRole('button', { name: /^Lihat konsep/ })).toHaveCount(
    3,
  );
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page
    .getByRole('button', { name: 'Lihat konsep Ruang untuk cerita.' })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'Ruang untuk cerita.' }),
  ).toBeVisible();
  await checkAxe(page);
  await page.getByRole('button', { name: 'Tutup detail konsep' }).click();
  await expect
    .poll(() =>
      page.evaluate(() => getComputedStyle(document.documentElement).overflow),
    )
    .not.toBe('hidden');
  expect(errors).toEqual([]);
  await context.close();
});

test('reduced-motion and live viewport changes clean up pinning', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await ready(page, '/karya');
  await expect(page.locator('#karya')).not.toHaveClass(/is-horizontal/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.app')).toHaveClass(/motion-off/);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect(page.locator('#karya')).not.toHaveClass(/is-horizontal/);
  await checkAxe(page);
  await expect(page.locator('.marquee-track')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('#karya')).not.toHaveClass(/is-horizontal/);
  await page.setViewportSize({ width: 1280, height: 600 });
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await noOverflow(page);
});

test('narrow desktop menu navigates to services and releases scroll lock', async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 800 });
  await ready(page);
  await page.getByRole('button', { name: 'Menu +' }).click();
  await page
    .getByRole('dialog')
    .getByRole('link', { name: 'Layanan', exact: true })
    .click();
  await expect(page).toHaveURL('/layanan');
  await expect(page.locator('#layanan')).toBeVisible();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => getComputedStyle(document.documentElement).overflow),
    )
    .not.toBe('hidden');
  await noOverflow(page);
});
