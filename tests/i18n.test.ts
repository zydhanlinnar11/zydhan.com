import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { langFromRouteId, swapLangPath, langHref } from '../src/lib/i18n';
import { enChrome } from '../src/lib/content.en';

// counterpartHref() calls resolve() from $app/paths; stand it in so the unit
// test can pin that counterpart hrefs are derived from ROUTE IDs (base-free)
// and always flow through resolve() (base-aware).
vi.mock('$app/paths', () => ({
	resolve: (routeId: string) => `/RESOLVED${routeId}`
}));

const { counterpartHref } = (await import('../src/lib/lang-nav')) as typeof import('../src/lib/lang-nav');

describe('static 404 page matches enChrome.notFound', () => {
  const html = readFileSync(new URL('../static/404.html', import.meta.url), 'utf8').replace(/\s+/g, ' ');
  it('renders the approved English copy', () => {
    for (const value of Object.values(enChrome.notFound)) {
      expect(html, value).toContain(value);
    }
  });
  it('is English and uses the encoded broken-link subject', () => {
    expect(html).toContain('lang="en"');
    expect(html).toContain('subject=Broken%20link%20on%20zydhan.com');
    expect(html).not.toContain('lang="id"');
  });
});


describe('counterpartHref (route-id based, base-path safe)', () => {
	it('resolves the counterpart of the four page routes', () => {
		expect(counterpartHref('/')).toBe('/RESOLVED/id');
		expect(counterpartHref('/id')).toBe('/RESOLVED/');
		expect(counterpartHref('/cv')).toBe('/RESOLVED/id/cv');
		expect(counterpartHref('/id/cv')).toBe('/RESOLVED/cv');
	});

	it('resolves redirect-stub routes with params, never from a pathname', () => {
		expect(counterpartHref('/projects/[slug]', { slug: 'optika-id' })).toBe('/RESOLVED/id/projects/[slug]');
		expect(counterpartHref('/id/projects/[slug]', { slug: 'optika-id' })).toBe('/RESOLVED/projects/[slug]');
		expect(counterpartHref('/projects')).toBe('/RESOLVED/id/projects');
	});

	it('passes unknown routes through unresolved', () => {
		expect(counterpartHref('/ideas')).toBe('/id/ideas');
		expect(counterpartHref('/id/ideas')).toBe('/ideas');
	});
});

describe('langFromRouteId', () => {
  it('defaults EN pages to en', () => {
    expect(langFromRouteId('/')).toBe('en');
    expect(langFromRouteId('/cv')).toBe('en');
    expect(langFromRouteId('/projects')).toBe('en');
    expect(langFromRouteId('/projects/[slug]')).toBe('en');
  });
  it('maps /id and below to id', () => {
    expect(langFromRouteId('/id')).toBe('id');
    expect(langFromRouteId('/id/cv')).toBe('id');
    expect(langFromRouteId('/id/projects/[slug]')).toBe('id');
  });
  it('does not misread routes that merely start with "/id"', () => {
    expect(langFromRouteId('/ideas')).toBe('en');
  });
});

describe('swapLangPath', () => {
  it('swaps both directions on known paths', () => {
    expect(swapLangPath('/')).toBe('/id');
    expect(swapLangPath('/id')).toBe('/');
    expect(swapLangPath('/cv')).toBe('/id/cv');
    expect(swapLangPath('/id/cv')).toBe('/cv');
  });
  it('adds the /id prefix to unknown EN paths and drops it from unknown ID paths', () => {
    expect(swapLangPath('/ideas')).toBe('/id/ideas');
    expect(swapLangPath('/id/ideas')).toBe('/ideas');
  });
});

describe('langHref', () => {
  it('prepends /id to an EN path with an anchor', () => {
    expect(langHref('/cv#peran-pena', 'id')).toBe('/id/cv#peran-pena');
  });
  it('leaves an EN path untouched for en', () => {
    expect(langHref('/cv#peran-pena', 'en')).toBe('/cv#peran-pena');
  });
  it('drops the /id prefix for en and keeps the anchor', () => {
    expect(langHref('/id/cv#peran-snpmb', 'en')).toBe('/cv#peran-snpmb');
  });
  it('keeps an ID path untouched for id', () => {
    expect(langHref('/id/cv#peran-snpmb', 'id')).toBe('/id/cv#peran-snpmb');
  });
  it('handles paths without anchors', () => {
    expect(langHref('/', 'id')).toBe('/id');
    expect(langHref('/id', 'en')).toBe('/');
  });
});
