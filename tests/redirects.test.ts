import { describe, it, expect } from 'vitest';
import { projectRedirectTarget } from '../src/lib/redirects';

describe('projectRedirectTarget', () => {
  it('maps snpmb-utbk-snbt-2023 to /cv#peran-snpmb', () => {
    expect(projectRedirectTarget('snpmb-utbk-snbt-2023')).toBe('/cv#peran-snpmb');
  });
  it('maps optika-id to /cv (project removed from CV)', () => {
    expect(projectRedirectTarget('optika-id')).toBe('/cv');
  });
  it('maps the snpmb slug to the Indonesian CV anchor for lang=id', () => {
    expect(projectRedirectTarget('snpmb-utbk-snbt-2023', 'id')).toBe('/id/cv#peran-snpmb');
  });
  it('maps optika-id to the Indonesian CV page for lang=id', () => {
    expect(projectRedirectTarget('optika-id', 'id')).toBe('/id/cv');
  });
});
