import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// The app's BASE_PATH (reuses the build-stripping env; see playwright.config.ts).
// '' in the default suite, e.g. '/zydhan.com' for the GH Pages preview one-off.
export const BASE_PATH = process.env.BASE_PATH || '';

// page.goto('/id') with a base-prefixed baseURL would resolve as
// new URL('/id', 'http://host/base') → 'http://host/id', DROPPING the base
// (and the preview then answers with the "public base URL" notice page).
// Wrap goto() so relative paths always hit <BASE_PATH><path>.
export const test = base.extend<{ page: Page }>({
	page: async ({ page }, use) => {
		const goto = page.goto.bind(page);
		// Cast keeps Playwright's overloaded goto signature untouched.
		page.goto = ((url, options) =>
			goto(/^\w+:\/\//.test(url) ? url : `${BASE_PATH}${url}`, options)) as typeof page.goto;
		await use(page);
	}
});

export { expect };
