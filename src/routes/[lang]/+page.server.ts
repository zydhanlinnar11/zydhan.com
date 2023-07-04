import type { EntryGenerator } from './$types';

export const entries = (() => {
  return [{ lang: 'id' }, { lang: 'en' }];
}) satisfies EntryGenerator;

export const prerender = true;
