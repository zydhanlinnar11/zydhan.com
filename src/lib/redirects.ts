export type RedirectTarget = '/' | '/cv' | '/cv#peran-snpmb';

export const projectSlugs = ['optika-id', 'snpmb-utbk-snbt-2023'] as const;

export function projectRedirectTarget(slug: string): RedirectTarget {
	return slug === 'snpmb-utbk-snbt-2023' ? '/cv#peran-snpmb' : '/cv';
}
