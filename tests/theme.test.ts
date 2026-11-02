import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolveTheme } from '../src/lib/theme';

const css = readFileSync(new URL('../src/app.css', import.meta.url), 'utf8');

describe('resolveTheme', () => {
  it('prefers a valid stored value', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });
  it('falls back to system when stored is invalid or absent', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
    expect(resolveTheme('bogus', true)).toBe('dark');
  });
});

describe('glass transparency fallback', () => {
  it('falls back to solid surfaces when transparency is reduced', () => {
    expect(css).toContain('prefers-reduced-transparency');
    expect(css).toContain('background: var(--solid)');
    expect(css).toContain('backdrop-filter: none');
  });
  it('guards blur behind @supports for backdrop-filter', () => {
    expect(css).toContain('@supports');
    expect(css).toContain('backdrop-filter');
  });
  it('falls back to solid surfaces when backdrop-filter is unsupported', () => {
    expect(css).toContain(
      '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))'
    );
    expect(css).toContain('.glass, .bar-glass, .ov-glass, .panel { background: var(--solid); }');
  });
});

describe('print stylesheet', () => {
  it('hides chrome and forces solid surfaces in print', () => {
    expect(css).toContain('@media print');
    for (const sel of ['.top-bar', '.floating-bar', '.toc', 'footer', '#kontak']) {
      expect(css).toContain(sel);
    }
    expect(css).toContain('display: none');
  });
});
