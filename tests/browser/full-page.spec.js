import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('complete routes, local fonts, FAQ and honest local contact preview', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const external = [];
  const writes = [];
  page.on('request', (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url()))
      external.push(request.url());
    if (request.method() === 'POST') writes.push(request.url());
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('button', { name: /^Lihat konsep/ })).toHaveCount(
    1,
  );
  await expect(page.locator('.ps-home-preview')).toHaveCount(1);
  await expect(page.locator('.ps-preview-service')).toHaveCount(3);
  await expect(page.locator('.ps-footer')).toHaveCount(1);
  for (const id of ['layanan', 'proses', 'tim', 'faq', 'kontak']) {
    await expect(page.locator(`#${id}`)).toHaveCount(0);
  }
  expect(
    await page.locator('h1').evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain('Bricolage');
  expect(
    await page
      .locator('body')
      .evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain('Hanken');
  await expect(page.locator('[class*=marquee]')).toHaveCount(0);
  for (const [route, ids] of [
    ['/', ['karya']],
    ['/karya', ['karya']],
    ['/tentang', ['tim']],
    ['/layanan', ['layanan', 'proses', 'faq']],
  ]) {
    await page.goto(route);
    await expect(page).toHaveURL(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    for (const id of ids) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(1440);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
  await expect(page.locator('.ps-service-card')).toHaveCount(3);
  await expect(page.locator('.ps-process-row')).toHaveCount(4);
  await expect(page.locator('.ps-faq-item')).toHaveCount(3);
  const faq = page.locator('.ps-faq-item').first();
  await faq.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(faq).toHaveAttribute('open', '');
  await expect(faq.locator('p')).toBeVisible();
  await page.getByRole('link', { name: 'Bahas website bisnis' }).click();
  await expect(page).toHaveURL('/kontak');
  await expect(page.locator('#kontak')).toHaveCount(1);
  await page.getByLabel('Nama', { exact: true }).fill('Pengunjung demo');
  await page
    .getByLabel('Email atau nomor WhatsApp', { exact: true })
    .fill('demo@example.test');
  await page
    .getByLabel('Ceritakan kebutuhan Anda')
    .fill('Katalog usaha lokal.');
  await page.getByRole('button', { name: 'Pratinjau pesan' }).click();
  await expect(page.getByRole('status')).toContainText('Pesan belum dikirim');
  await expect(page.locator('.ps-message-preview')).toContainText(
    'Katalog usaha lokal.',
  );
  expect(external).toEqual([]);
  expect(writes).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    1440,
  );
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.screenshot({
    path: '.playwright/full-desktop.png',
    fullPage: true,
  });
  await page.reload();
  await expect(page.locator('.ps-message-preview')).toHaveCount(0);
});

test('mobile routes fit 320px and dialog transitions cleanly reopen', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const route of ['/', '/layanan', '/tentang', '/kontak', '/karya']) {
    await page.goto(route);
    await expect(page).toHaveURL(route);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(320);
  }
  const card = page.getByRole('button', {
    name: 'Lihat konsep Ruang untuk cerita.',
  });
  await card.click();
  const dialog = page.getByRole('dialog', { name: 'Ruang untuk cerita.' });
  await expect(dialog).toBeVisible();
  await expect
    .poll(() => dialog.evaluate((el) => Number(getComputedStyle(el).opacity)))
    .toBe(1);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(card).toBeFocused();
  await card.click();
  await expect(dialog).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Tutup detail konsep' }).click();
  await expect(dialog).not.toBeVisible();
  await page.screenshot({
    path: '.playwright/full-mobile.png',
    fullPage: true,
  });
});
