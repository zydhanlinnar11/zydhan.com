import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

test('mobile menu is a dialog and closes with the close control', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /Buka menu/i }).click();
  await expect(page.getByRole('dialog', { name: /Menu/i })).toBeVisible();
  await page.getByRole('button', { name: /Tutup/i }).click();
  await expect(page.getByRole('dialog', { name: /Menu/i })).toBeHidden();
});

test('Home renders hero, stats, roles, projects, writings, contact', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /memimpin tim developer/i, level: 1 })).toBeVisible();
  await expect(page.getByText('1 juta+', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Software Engineer di SEVIMA PENA/i })).toHaveAttribute('href', /#peran-pena/);
  await expect(page.getByRole('heading', { name: /Ada sistem yang perlu dibangun/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Kirim email/i })).toHaveAttribute('href', /mailto:/);
});

test('floating bar shows after scrolling past hero CTA on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: /Aksi cepat/i })).toBeHidden();
  await page.mouse.wheel(0, 1200);
  await expect(page.getByRole('navigation', { name: /Aksi cepat/i })).toBeVisible();
});

test('CV floating bar opens the section overlay', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cv');
  await page.mouse.wheel(0, 1200);
  const bar = page.getByRole('navigation', { name: /Aksi cepat/i });
  await expect(bar).toBeVisible();
  await bar.getByRole('button', { name: /Navigasi/i }).click();
  const overlay = page.getByRole('dialog', { name: /Navigasi/i });
  await expect(overlay).toBeVisible();
  await expect(overlay.getByRole('link')).toHaveCount(5);
  await expect(overlay.getByRole('link', { name: /Pengalaman/i })).toHaveAttribute('href', /#pengalaman/);
  await expect(overlay.getByRole('link', { name: /Ringkasan/i })).toHaveAttribute('aria-current', 'location');
  await expect(bar.getByRole('button', { name: /Tutup/i })).toBeVisible();
  await overlay.getByRole('link', { name: /Keahlian/i }).click();
  await expect(overlay).toBeHidden();
});

test('Home floating bar navigasi opens the shared mobile menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.mouse.wheel(0, 1200);
  const bar = page.getByRole('navigation', { name: /Aksi cepat/i });
  await expect(bar).toBeVisible();
  await bar.getByRole('button', { name: /Navigasi/i }).click();
  const menu = page.getByRole('dialog', { name: /Menu/i });
  await expect(menu).toBeVisible();
  await expect(bar.getByRole('button', { name: /Tutup/i })).toBeVisible();
  await menu.getByRole('button', { name: /Tutup/i }).click();
  await expect(menu).toBeHidden();
});

test('floating bar re-finds the trigger after client-side navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.mouse.wheel(0, 1200);
  const bar = page.getByRole('navigation', { name: /Aksi cepat/i });
  await expect(bar).toBeVisible();
  await bar.getByRole('link', { name: /Lihat CV/i }).click();
  await expect(page).toHaveURL(/\/cv$/);
  // The CV pills (its trigger) are in view at the top, so the bar hides again.
  await expect(bar).toBeHidden();
  await page.mouse.wheel(0, 1200);
  await expect(bar).toBeVisible();
});

test('Home has canonical, og tags, and description', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'id');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://zydhan.com/');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /backend engineer di Surabaya/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Memimpin tim developer/);
});

test('CV has canonical and title', async ({ page }) => {
  await page.goto('/cv');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://zydhan.com/cv');
  await expect(page).toHaveTitle(/CV — Zydhan Linnar Putra/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Software engineer dengan fokus back-end (Go, PHP, Node.js) dan arsitektur modern (DDD, CQRS, Hexagonal).'
  );
});

test('CV exposes all section and role anchors', async ({ page }) => {
  await page.goto('/cv');
  for (const id of ['ringkasan','pengalaman','keahlian','pendidikan','tulisan','peran-pena','peran-sevima','peran-dptsi','peran-snpmb','peran-intern']) {
    await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  }
  await expect(page.getByRole('button', { name: /Unduh PDF/i })).toBeVisible();
});

const widths = [390, 768, 1440, 1920];
for (const w of widths) {
	test(`no horizontal scroll at ${w}px`, async ({ page }) => {
		await page.setViewportSize({ width: w, height: 900 });
		for (const path of ['/', '/cv']) {
			await page.goto(path);
			const overflow = await page.evaluate(
				() => document.documentElement.scrollWidth - document.documentElement.clientWidth
			);
			expect(overflow, `${path}@${w}`).toBeLessThanOrEqual(0);
		}
	});
}

test('a11y: no serious or critical violations', async ({ page }) => {
	for (const path of ['/', '/cv']) {
		await page.goto(path);
		const results = await new AxeBuilder({ page }).analyze();
		const bad = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
		expect(bad, path).toEqual([]);
	}
});

test('legacy redirect pages point at their canonical destinations', async ({ request }) => {
	const checks: Array<[string, string]> = [
		['/id', 'https://zydhan.com/'],
		['/projects', 'https://zydhan.com/cv'],
		['/id/projects', 'https://zydhan.com/cv'],
		['/projects/snpmb-utbk-snbt-2023', 'https://zydhan.com/cv#peran-snpmb'],
		['/id/projects/optika-id', 'https://zydhan.com/cv']
	];

	for (const [path, target] of checks) {
		const response = await request.get(path);
		expect(response.status(), path).toBe(200);
		const body = await response.text();
		expect(body, path).toContain('http-equiv="refresh"');
		expect(body, path).toContain(target);
	}
});

test('404 page renders with a helpful message', async ({ request }) => {
	const response = await request.get('/this-does-not-exist');
	expect(response.status()).toBe(404);
	const body = await response.text();
	if (body.includes('Halaman ini tidak ada')) return;
	// `vite preview` serves SvelteKit's JS error shell for unknown paths instead of the
	// static 404.html. GitHub Pages serves the asset directly, so verify that file.
	const asset = await request.get('/404.html');
	expect(asset.status()).toBe(200);
	expect(await asset.text()).toContain('Halaman ini tidak ada');
});
