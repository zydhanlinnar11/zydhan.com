// Postbuild: rewrite `<html lang>` on every prerendered page. Pages under
// id/ are Indonesian; everything else (including 404.html, a copy of
// static/404.html) is English. Idempotent: rerunning changes nothing.
//
// Both trees are rewritten: `build/` (the deployable, served by GitHub Pages)
// and `.svelte-kit/output/prerendered/` (what `vite preview` serves, so the
// e2e suite sees production-identical markup).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const buildDir = fileURLToPath(new URL('../build', import.meta.url));
// `vite preview` (used by the e2e webServer) serves the prerendered pages from
// .svelte-kit/output — rewriting them keeps tests production-identical.
const prerenderedDir = fileURLToPath(new URL('../.svelte-kit/output/prerendered/pages', import.meta.url));
let changed = 0;

function walk(rootDir, dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(rootDir, full);
		} else if (entry.isFile() && entry.name.endsWith('.html')) {
			// trailingSlash: 'never' flattens routes, so the ID subtree spans
			// id.html (route /id) and id/… (e.g. id/cv.html).
			const rel = relative(rootDir, full);
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

walk(buildDir, buildDir);
walk(prerenderedDir, prerenderedDir);
console.log(`fix-html-lang: ${changed} file(s) updated`);
