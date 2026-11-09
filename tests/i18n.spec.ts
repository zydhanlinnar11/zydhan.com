import { test, expect } from './test-fixture';
import { uiCopy } from '../src/lib/ui-copy';

const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 390, height: 844 };

test.describe('top-bar nav is language-aware', () => {
	for (const [from, target, expected] of [
		['/', 'Home', /\/$/],
		['/', 'CV', /\/cv$/],
		['/id', 'Home', /\/id$/],
		['/id', 'CV', /\/id\/cv$/]
	] as Array<[string, string, RegExp]>) {
		test(`${from} → nav "${target}" → ${expected}`, async ({ page }) => {
			await page.setViewportSize(DESKTOP);
			await page.goto(from);
			await page.getByRole('navigation').getByRole('link', { name: target, exact: true }).click();
			await page.waitForURL(expected);
		});
	}
});

test.describe('mobile menu nav is language-aware', () => {
	test('/id → menu "Home" stays on /id, "CV" goes to /id/cv', async ({ page }) => {
		await page.setViewportSize(MOBILE);
		await page.goto('/id');
		await page.getByRole('button', { name: uiCopy.id.topBar.openMenuAria }).click();
		const menu = page.getByRole('dialog', { name: uiCopy.id.mobileMenu.dialogAria });
		await expect(menu).toBeVisible();
		await menu.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
		await expect(page).toHaveURL(/\/id$/);
		await page.getByRole('button', { name: uiCopy.id.topBar.openMenuAria }).click();
		const menu2 = page.getByRole('dialog', { name: uiCopy.id.mobileMenu.dialogAria });
		await expect(menu2).toBeVisible();
		await menu2.getByRole('navigation').getByRole('link', { name: 'CV' }).click();
		await expect(page).toHaveURL(/\/id\/cv$/);
	});

	test('/ → menu "Home" stays on /, "CV" goes to /cv', async ({ page }) => {
		await page.setViewportSize(MOBILE);
		await page.goto('/');
		await page.getByRole('button', { name: uiCopy.en.topBar.openMenuAria }).click();
		const menu = page.getByRole('dialog', { name: uiCopy.en.mobileMenu.dialogAria });
		await expect(menu).toBeVisible();
		await menu.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
		await expect(page).toHaveURL(/\/$/);
		await page.getByRole('button', { name: uiCopy.en.topBar.openMenuAria }).click();
		const menu2 = page.getByRole('dialog', { name: uiCopy.en.mobileMenu.dialogAria });
		await expect(menu2).toBeVisible();
		await menu2.getByRole('navigation').getByRole('link', { name: 'CV' }).click();
		await expect(page).toHaveURL(/\/cv$/);
	});
});

test.describe('top-bar language toggle', () => {
	test('/id → EN → /', async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto('/id');
		await page.getByRole('link', { name: uiCopy.en.topBar.switchLangAria }).click();
		await page.waitForURL(/\/$/);
		await expect(page).toHaveURL(/\/$/);
	});

	test('/ → ID → /id', async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto('/');
		await page.getByRole('link', { name: uiCopy.id.topBar.switchLangAria }).click();
		await page.waitForURL(/\/id$/);
	});

	test('/cv → ID → /id/cv', async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto('/cv');
		await page.getByRole('link', { name: uiCopy.id.topBar.switchLangAria }).click();
		await page.waitForURL(/\/id\/cv$/);
	});

	test('/id/cv → EN → /cv', async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto('/id/cv');
		await page.getByRole('link', { name: uiCopy.en.topBar.switchLangAria }).click();
		await page.waitForURL(/\/cv$/);
	});
});

test.describe('mobile menu language segmented control', () => {
	test('/ id-pages switch stays above Tema and swaps language', async ({ page }) => {
		await page.setViewportSize(MOBILE);
		await page.goto('/');

		// English is the page language, so "English" is on.
		await page.getByRole('button', { name: uiCopy.en.topBar.openMenuAria }).click();
		const menu = page.getByRole('dialog', { name: uiCopy.en.mobileMenu.dialogAria });
		await expect(menu).toBeVisible();
		const langGroup = menu.getByRole('group', { name: uiCopy.en.mobileMenu.langHeading });
		await expect(langGroup.getByRole('button', { name: uiCopy.en.mobileMenu.english })).toHaveAttribute(
			'aria-pressed',
			'true'
		);
		await langGroup.getByRole('button', { name: 'Indonesia' }).click();
		await expect(page).toHaveURL(/\/id$/);

		// /id: the Language row appears above the Theme row.
		await page.getByRole('button', { name: uiCopy.id.topBar.openMenuAria }).click();
		const menuId = page.getByRole('dialog', { name: uiCopy.id.mobileMenu.dialogAria });
		await expect(menuId).toBeVisible();
		const langRow = menuId.getByRole('group', { name: uiCopy.id.mobileMenu.langHeading });
		const themeRow = menuId.getByRole('group', { name: uiCopy.id.mobileMenu.themeAria });
		const langBox = await langRow.boundingBox();
		const themeBox = await themeRow.boundingBox();
		expect(langBox).toBeTruthy();
		expect(themeBox).toBeTruthy();
		expect(langBox!.y).toBeLessThan(themeBox!.y);

		// Switching back to English closes the menu and lands on /.
		await langRow.getByRole('button', { name: uiCopy.id.mobileMenu.english }).click();
		await page.waitForURL(/\/$/);
		await expect(menuId).toBeHidden();
	});
});

test.describe('language metadata', () => {
	const cases: Array<[string, 'en' | 'id']> = [
		['/', 'en'],
		['/cv', 'en'],
		['/id', 'id'],
		['/id/cv', 'id']
	];
	for (const [path, lang] of cases) {
		test(`${path} sets <html lang="${lang}">`, async ({ page }) => {
			await page.goto(path);
			await expect(page.locator('html')).toHaveAttribute('lang', lang);
		});
	}

	test('/ exposes three hreflang links', async ({ page }) => {
		await page.goto('/');
		const hreflangs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((links) =>
			links.map((link) => link.getAttribute('hreflang'))
		);
		expect(hreflangs).toEqual(['en', 'id', 'x-default']);
	});
});

test.describe('no leftover untranslated strings', () => {
	const idStrings = /Hubungi saya|Unduh|Keahlian|Aksi cepat|Buka menu|Ganti tema|Ringkasan|Proyek/;
	const enStrings = /Contact me|Download PDF|Quick actions|Open menu|Toggle theme|Professional Summary/;

	test('EN pages have no Indonesian chrome strings', async ({ page }) => {
		for (const path of ['/', '/cv']) {
			await page.goto(path);
			expect(await page.content(), path).not.toMatch(idStrings);
		}
	});

	test('ID pages have no English chrome strings', async ({ page }) => {
		for (const path of ['/id', '/id/cv']) {
			await page.goto(path);
			expect(await page.content(), path).not.toMatch(enStrings);
		}
	});
});

test('/id featured project navigates to the SNPMB CV anchor', async ({ page }) => {
	await page.setViewportSize(DESKTOP);
	await page.goto('/id');
	await page.getByRole('link', { name: /UTBK-SNBT dan SSO SNPMB/ }).click();
	await expect(page).toHaveURL(/\/id\/cv#peran-snpmb$/);
	await expect(page.locator('#peran-snpmb')).toBeVisible();
});

test('/id/cv Unduh PDF button still triggers window.print', async ({ page }) => {
	await page.goto('/id/cv');
	await page.evaluate(() => {
		Object.defineProperty(window, '__printCalls', { value: 0, writable: true });
		window.print = () => {
			(window as unknown as { __printCalls: number }).__printCalls++;
		};
	});
	await page.getByRole('button', { name: uiCopy.id.pages.downloadPdf }).click();
	const calls = await page.evaluate(() => (window as unknown as { __printCalls: number }).__printCalls);
	expect(calls).toBe(1);
});

test('/id/projects/snpmb-utbk-snbt-2023 redirects to /id/cv#peran-snpmb', async ({ page }) => {
	await page.goto('/id/projects/snpmb-utbk-snbt-2023');
	await expect(page).toHaveURL(/\/id\/cv(\.html)?#peran-snpmb$/);
	await page.goto('/id/projects/optika-id');
	await expect(page).toHaveURL(/\/id\/cv(\.html)?$/);
});
