import { describe, it, expect } from 'vitest';
import { projectRedirectTarget } from '../src/lib/redirects';

describe('projectRedirectTarget', () => {
  it('maps snpmb-utbk-snbt-2023 to /cv#peran-snpmb', () => {
    expect(projectRedirectTarget('snpmb-utbk-snbt-2023')).toBe('/cv#peran-snpmb');
  });
  it('maps optika-id to /cv (project removed from CV)', () => {
    expect(projectRedirectTarget('optika-id')).toBe('/cv');
  });
});
