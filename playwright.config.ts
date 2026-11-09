import { defineConfig } from '@playwright/test';

// Reuses the app's BASE_PATH env: with e.g. BASE_PATH=/zydhan.com the build and
// the preview URL are base-prefixed, letting a one-off run pin base-path
// behavior:
//   BASE_PATH=/zydhan.com pnpm exec playwright test tests/base-path.spec.ts
// Bare runs (default suite) keep base ''.
const base = process.env.BASE_PATH || '';

export default defineConfig({
	testDir: 'tests',
	testMatch: '**/*.spec.ts',
	use: { baseURL: `http://localhost:4173${base}` },
	webServer: {
		command: 'pnpm build && pnpm preview --port 4173 --strictPort',
		port: 4173,
		reuseExistingServer: !process.env.CI
	}
});
