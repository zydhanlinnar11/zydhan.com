import { resolve } from '$app/paths';
import { swapLangPath } from './i18n';

// Normalize a URL pathname (strip trailing slashes, '' -> '/') before swapping.
function purePath(pathname: string): string {
	return pathname.replace(/\/+$/, '') || '/';
}

// resolve() only accepts known route ids; unknown paths (404 shell, deep
// redirect stubs) pass through unresolved, which is still correct for the
// default site base.
function resolvePure(path: string): string {
	switch (path) {
		case '/':
			return resolve('/');
		case '/cv':
			return resolve('/cv');
		case '/id':
			return resolve('/id');
		case '/id/cv':
			return resolve('/id/cv');
		default:
			return path;
	}
}

// Counterpart page href for the other language, computed from the current
// URL pathname (works for real pages; stub/error pages degrade gracefully).
export function counterpartHref(pathname: string): string {
	return resolvePure(swapLangPath(purePath(pathname)));
}
