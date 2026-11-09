import type { Lang } from './content';

export type RedirectTarget =
	| '/'
	| '/cv'
	| '/cv#peran-snpmb'
	| '/id'
	| '/id/cv'
	| '/id/cv#peran-snpmb';

export const projectSlugs = ['optika-id', 'snpmb-utbk-snbt-2023'] as const;

// Default target equals today's behavior (EN); passing lang='id' returns the
// Indonesian counterpart page.
export function projectRedirectTarget(slug: string, lang: Lang = 'en'): RedirectTarget {
	if (slug === 'snpmb-utbk-snbt-2023') {
		return lang === 'id' ? '/id/cv#peran-snpmb' : '/cv#peran-snpmb';
	}
	return lang === 'id' ? '/id/cv' : '/cv';
}
