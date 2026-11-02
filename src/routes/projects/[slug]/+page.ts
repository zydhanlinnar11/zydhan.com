import type { EntryGenerator, PageLoad } from './$types';
import { projectRedirectTarget, projectSlugs } from '#lib/redirects';

export const entries: EntryGenerator = () => projectSlugs.map((slug) => ({ slug }));

export const load: PageLoad = ({ params }) => ({ to: projectRedirectTarget(params.slug) });
