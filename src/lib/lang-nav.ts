import { resolve } from '$app/paths';
import { swapLangPath } from './i18n';

// Counterpart page href for the other language, computed from the current
// ROUTE ID (e.g. page.route.id) — route IDs are base-free and hash-free, which
// matters when paths.base is non-empty: page.url.pathname is then BASE-PREFIXED
// ('/base/cv'), and swapping it would mint '/id/base/cv' dead links in the
// GitHub Pages preview builds. Dynamic (redirect-stub) routes are resolved
// with the page's params so the swap lands on the prerendered sibling stub;
// unknown routes (fallbacks) pass through unresolved, degrading gracefully.
export function counterpartHref(routeId: string, params: Readonly<Record<string, string>> = {}): string {
	const swapped = swapLangPath(routeId);
	switch (swapped) {
		case '/':
			return resolve('/');
		case '/id':
			return resolve('/id');
		case '/cv':
			return resolve('/cv');
		case '/id/cv':
			return resolve('/id/cv');
		case '/projects':
		case '/id/projects':
			return resolve(swapped);
		case '/projects/[slug]':
		case '/id/projects/[slug]':
			return resolve(swapped, { slug: params.slug ?? '' });
		default:
			// Unknown route (not a real page): pass the swapped path through
			// unresolved rather than risk a mis-prefixed href.
			return swapped;
	}
}
