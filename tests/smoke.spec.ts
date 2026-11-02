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
