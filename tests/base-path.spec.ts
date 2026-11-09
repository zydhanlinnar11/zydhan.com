import { test, expect } from './test-fixture';
import { swapLangPath } from '../src/lib/i18n';
import { uiCopy } from '../src/lib/ui-copy';

const DESKTOP = { width: 1280, height: 800 };

// Regression pin for the base-path counterpart bug (round 1 review): the
// language toggle's counterpart href must be derived from page.route.id
// (base-free), NOT page.url.pathname (base-prefixed when paths.base is set, as
// in the GitHub Pages preview builds BASE_PATH=/zydhan.com). Default suite
// runs with base '' and still pins the four nav transitions; the one-off
//   BASE_PATH=/zydhan.com pnpm exec playwright test tests/base-path.spec.ts
// runs this file against a base-prefixed build/preview.
const BASE = process.env.BASE_PATH || '';

const PAGES: Array<[string, `${'en' | 'id'}`]> = [
	['/', 'id'],
	['/cv', 'id'],
	['/id', 'en'],
	['/id/cv', 'en']
];

for (const [pagePath, targetLang] of PAGES) {
	test(`lang-toggle pill href for ${pagePath} = BASE${swapLangPath(pagePath)} and navigates`, async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto(pagePath);

		const expected = `${BASE}${swapLangPath(pagePath)}`;
		const toggle = page.locator('.lang-toggle');
		await expect(toggle).toHaveAttribute('href', expected);

		// Clicking must actually land on the counterpart page (not the
		// /id/<base>/... dead 404 href the pathname-based bug minted), with the
		// target language's chrome rendered. The layout effect must also sync
		// <html lang> on the soft navigation (final review, Important 1) —
		// chrome copy is the extra probe.
		await toggle.click();
		await page.waitForURL(new RegExp(`${expected.replace(/\//g, '\\/')}\\/?$`));
		await expect(page.locator('html')).toHaveAttribute('lang', targetLang);
		await expect(
			page.getByRole('link', { name: uiCopy[targetLang].topBar.contact })
		).toBeVisible();
	});
}
