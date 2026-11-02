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
