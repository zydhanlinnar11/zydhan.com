import { describe, it, expect } from 'vitest';
import { getContent } from '../src/lib/content';

const id = getContent('id');
const en = getContent('en');

describe('EN/ID content parity', () => {
  it('shares the same top-level shape as the ID content', () => {
    expect(Object.keys(en).join()).toBe(Object.keys(id).join());
  });
  it('keeps role anchors identical and in the same order', () => {
    expect(en.roles.map(r => r.id)).toEqual(id.roles.map(r => r.id));
  });
  it('keeps featured project and writing links identical', () => {
    expect(en.featuredProjects.map(p => p.href)).toEqual(id.featuredProjects.map(p => p.href));
    expect(en.writings.map(w => w.href)).toEqual(id.writings.map(w => w.href));
  });
  it('claims US$60,000 savings in summary, the SNPMB role, and the PDF', () => {
    const re = /US\$60[.,]000/;
    expect(en.summary).toMatch(re);
    expect(en.roles.find(r => r.id === 'peran-snpmb')!.bullets.join()).toMatch(re);
    expect(JSON.stringify(en.pdf)).toMatch(re);
  });
  it('mentions 1 million+ users and experience since 2021', () => {
    expect(JSON.stringify([en.stats, en.hero])).toContain('1 million+');
    expect(en.experienceNote).toContain('2021');
  });
  it('never claims "tech lead"', () => {
    expect(JSON.stringify(en)).not.toContain('tech lead');
  });
  it('keeps PDF copy consistent with the web copy', () => {
    for (const r of en.roles.filter(r => r.pdfBullets)) {
      expect(r.pdfBullets!.length).toBeLessThanOrEqual(r.bullets.length);
    }
  });
});

describe('content invariants', () => {
  it('uses the official SEVIMA PENA title and never claims "tech lead"', () => {
    expect(id.roles.find(r => r.id === 'peran-pena')!.title).toBe('Software Engineer di SEVIMA PENA');
    expect(JSON.stringify(id)).not.toContain('tech lead');
  });
  it('counts experience from August 2021', () => {
    expect(id.experienceNote).toContain('Agustus 2021');
    expect(id.roles.find(r => r.id === 'peran-intern')!.period).toBe('Agu 2021 – Jun 2023');
  });
  it('states SSO savings as US$60.000/year ≈ Rp1 miliar (2024)', () => {
    expect(id.roles.find(r => r.id === 'peran-snpmb')!.bullets[0]).toContain('US$60.000');
    expect(id.summary).toContain('Rp1 miliar');
  });
  it('keeps PDF copy consistent with the web copy', () => {
    for (const r of id.roles.filter(r => r.pdfBullets)) {
      expect(r.pdfBullets!.length).toBeLessThanOrEqual(r.bullets.length);
    }
    expect(id.pdf.summary).toContain('US$60.000');
    expect(id.roles.find(r => r.id === 'peran-snpmb')!.pdfBullets!.join()).toContain('US$60.000');
    expect(id.roles.find(r => r.id === 'peran-pena')!.pdfBullets!.join()).toContain('Sentry');
    expect(JSON.stringify(id.pdf)).not.toContain('tech lead');
  });
  it('lists Sentry for PENA and OpenTelemetry for SNPMB', () => {
    expect(id.roles.find(r => r.id === 'peran-pena')!.bullets.join()).toContain('Sentry');
    expect(id.roles.find(r => r.id === 'peran-snpmb')!.bullets.join()).toContain('OpenTelemetry');
  });
  it('gives every role an anchor id and non-empty period, and adds peran-intern', () => {
    const ids = id.roles.map(r => r.id);
    expect(ids).toContain('peran-intern');
    for (const r of id.roles) { expect(r.id).toMatch(/^peran-/); expect(r.period.length).toBeGreaterThan(0); }
  });
});
