import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'scripts', 'og-card.html');
const output = path.join(root, 'static', 'og.png');

const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1
});

await page.goto(pathToFileURL(source).href);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: output, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

console.log('wrote static/og.png (1200x630)');
