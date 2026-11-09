import type { Lang } from './content';

const ID_PREFIX = /^\/id(?:\/|$)/;

// '/id' and '/id/...' are Indonesian; everything else (including routes that
// merely start with '/id', e.g. '/ideas') is English.
export function langFromRouteId(routeId: string): Lang {
	return ID_PREFIX.test(routeId) ? 'id' : 'en';
}

// '/' ↔ '/id'; '/cv' ↔ '/id/cv'; unknown EN paths gain the /id prefix and
// unknown ID paths lose it.
export function swapLangPath(path: string): string {
	return ID_PREFIX.test(path) ? path.slice(3) || '/' : `/id${path === '/' ? '' : path}`;
}

// Rewrites an internal href (which may carry an '#anchor') so it points at the
// counterpart page for `lang`; the anchor is preserved. External or unknown
// hrefs are treated as plain paths.
export function langHref(href: string, lang: Lang): string {
	const hash = href.indexOf('#');
	const path = hash === -1 ? href : href.slice(0, hash);
	const suffix = hash === -1 ? '' : href.slice(hash);
	const swapped = swapLangPath(path);
	const target = lang === 'id' ? (ID_PREFIX.test(path) ? path : swapped) : ID_PREFIX.test(path) ? swapped : path;
	return target + suffix;
}
