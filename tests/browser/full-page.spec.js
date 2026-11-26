import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  ['/', /Website yang jelas\s*untuk usaha Anda\./],
  ['/karya', 'Karya kami.'],
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

test('local fonts, all FAQ items and contact form hands off to WhatsApp', async ({
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
  ).toContain('Figtree');
  expect(
    await page
      .locator('body')
      .evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain('Figtree');
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
  await expect(
    page.getByRole('link', { name: '0851-3697-1361' }),
  ).toHaveAttribute('href', 'https://wa.me/6285136971361');
  await expect(
    page.getByRole('link', { name: 'admin@flexboxstudio.site' }),
  ).toHaveAttribute('href', 'mailto:admin@flexboxstudio.site');
  await expect(
    page.getByRole('contentinfo').getByRole('link', { name: 'Instagram' }),
  ).toHaveAttribute('href', 'https://instagram.com/flexbox.dev');
  await page.evaluate(() => {
    window.open = (url) => {
      window.openedUrl = url;
      return { opener: window };
    };
  });
  const submit = page.getByRole('button', { name: 'Lanjut ke WhatsApp' });
  await submit.click();
  await expect(page.getByLabel('Nama Anda', { exact: true })).toBeFocused();
  expect(await page.evaluate(() => window.openedUrl)).toBeUndefined();
  await page.getByLabel('Nama Anda', { exact: true }).fill(' Pengunjung demo ');
  await page
    .getByLabel('Kebutuhan website Anda', { exact: true })
    .fill('Katalog usaha lokal.');
  await submit.click();
  const opened = new URL(await page.evaluate(() => window.openedUrl));
  expect(opened.origin + opened.pathname).toBe('https://wa.me/6285136971361');
  expect(opened.searchParams.get('text')).toBe(
    'Halo Flexbox, saya Pengunjung demo.\n\nKatalog usaha lokal.',
  );
  expect(externalFonts).toEqual([]);
  expect(writes).toEqual([]);
});

test('each page sets its own description, canonical URL and share tags', async ({
  page,
  request,
}) => {
  await page.goto('/karya');
  await expect(page).toHaveTitle('Karya kami — Flexbox');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /SAGARA, SMK Telkom Purwokerto/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://flexbox-portofolio.vercel.app/karya',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://flexbox-portofolio.vercel.app/og-image.jpg',
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await page.goto('/tidak-ada');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex',
  );
  for (const file of ['/favicon.svg', '/og-image.jpg', '/robots.txt']) {
    expect((await request.get(file)).ok(), file).toBe(true);
  }
  expect(await (await request.get('/sitemap.xml')).text()).toContain(
    '<loc>https://flexbox-portofolio.vercel.app/kontak</loc>',
  );
});
