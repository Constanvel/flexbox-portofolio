import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  ['/', /Website modern\s*untuk usaha\s*yang tumbuh\./],
  ['/karya', 'Eksplorasi website.'],
  ['/layanan', 'Layanan yang jelas, hasil yang terukur.'],
  ['/tentang', 'Tim kecil, kerja yang rapi.'],
  ['/kontak', 'Mari bangun website Anda.'],
  ['/tidak-ada', 'Halaman ini tidak ditemukan'],
];

for (const [route, title] of routes) {
  test(`route ${route} has its own accessible title and passes Axe`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page).toHaveTitle(/Flexbox/);
    await expect(page.getByRole('main')).toHaveCount(1);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}

test('local fonts, all FAQ items and honest local contact preview', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const externalFonts = [];
  const writes = [];
  page.on('request', (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url()))
      externalFonts.push(request.url());
    if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.url());
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.locator('h1').evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain('Geist');
  expect(
    await page
      .locator('body')
      .evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain('Geist');
  await page.goto('/layanan');
  await expect(page.locator('.service-editorial-row')).toHaveCount(3);
  await expect(page.locator('.support-stages > li')).toHaveCount(4);
  const questions = page.locator('#faq details');
  await expect(questions).toHaveCount(5);
  for (const question of await questions.all()) {
    await question.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(question).toHaveAttribute('open', '');
    await expect(question.locator('p')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(question).not.toHaveAttribute('open', '');
  }
  await page.getByRole('link', { name: 'Bahas website bisnis' }).click();
  await expect(page).toHaveURL('/kontak');
  const submit = page.getByRole('button', { name: 'Buat pratinjau pesan' });
  await submit.click();
  await expect(page.getByLabel('Nama Anda', { exact: true })).toBeFocused();
  await expect(page.getByRole('status')).toBeEmpty();
  await page.getByLabel('Nama Anda', { exact: true }).fill(' Pengunjung demo ');
  await page
    .getByLabel('Email atau nomor WhatsApp', { exact: true })
    .fill('demo@example.test');
  await page
    .getByLabel('Kebutuhan website Anda', { exact: true })
    .fill('Katalog usaha lokal.');
  await submit.click();
  const preview = page.getByRole('status');
  await expect(preview).toHaveAttribute('aria-live', 'polite');
  await expect(preview).toBeFocused();
  await expect(preview).toContainText('Pesan Anda belum dikirim.');
  await expect(preview).toContainText('Pengunjung demo');
  await expect(preview).toContainText('Katalog usaha lokal.');
  await page
    .getByLabel('Kebutuhan website Anda', { exact: true })
    .fill('Pembaruan informasi usaha.');
  await submit.click();
  await expect(preview).toContainText('Pembaruan informasi usaha.');
  await expect(preview).not.toContainText('Katalog usaha lokal.');
  expect(externalFonts).toEqual([]);
  expect(writes).toEqual([]);
  await page.reload();
  await expect(page.getByRole('status')).toBeEmpty();
});
