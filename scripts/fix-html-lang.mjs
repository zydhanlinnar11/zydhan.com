// Postbuild: rewrite `<html lang>` on every prerendered page. Pages under
// build/id/ are Indonesian; everything else (including build/404.html, a copy
// of static/404.html) is English. Idempotent: rerunning changes nothing.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const buildDir = fileURLToPath(new URL('../build', import.meta.url));
let changed = 0;

function walk(dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(full);
		} else if (entry.isFile() && entry.name.endsWith('.html')) {
			// trailingSlash: 'never' flattens routes, so the ID subtree spans
			// id.html (route /id) and id/… (e.g. id/cv.html once Task 4 lands).
			const rel = relative(buildDir, full);
			const lang = rel === 'id.html' || rel.startsWith(`id${sep}`) ? 'id' : 'en';
			const html = readFileSync(full, 'utf8');
			const next = html.includes('<html')
				? html.replace(/(<html\b[^>]*?\blang=")[a-z]+(")/i, `$1${lang}$2`)
				: html;
			if (next !== html) {
				writeFileSync(full, next);
				changed++;
			}
		}
	}
}

walk(buildDir);
console.log(`fix-html-lang: ${changed} file(s) updated`);
