# zydhan.com Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the zydhan.com portfolio site from Next.js/Vercel to a static SvelteKit site on GitHub Pages, with a concise Home and a deep CV page, driven by one structured content source.

**Architecture:** A fully prerendered SvelteKit (Svelte 5) multi-page site using `@sveltejs/adapter-static`. One typed content module (`src/lib/content.ts`) is the single source of truth for Home, CV, and the client-side "Unduh PDF" print stylesheet. Theme is applied via a no-flash inline script in `app.html` plus a small `theme.ts` module; the only complex behaviors (mobile menu, CV mobile "isi CV" overlay) use the native `<dialog>` element to keep the JS bundle under the 60 KB gzip budget.

**Tech Stack:** SvelteKit + Svelte 5 (runes), TypeScript, `@sveltejs/adapter-static`, plain CSS with custom-property tokens, self-hosted Inter, Vitest (unit), Playwright (smoke + horizontal-scroll + a11y), pnpm, GitHub Actions → GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-01-zydhan-com-rewrite-design.md`
**Design source:** `docs/design/artboards/*.dc.html` (token + content reference; `Komponen.dc.html` carries the authoritative token block). This plan is self-contained: all token values, CSS utilities, and content strings are reproduced inline so the executor need not read the artboards.

## Global Constraints

- Static hosting on GitHub Pages; no server, no server functions, no forms.
- SvelteKit (Svelte 5) + `adapter-static`, prerender every page, TypeScript.
- No Tailwind; plain CSS with tokens (CSS variables) + the utility classes reproduced in Task 2.
- **Dialog decision (owner-confirmed):** use the native `<dialog>` element for the two navigation dialogs (mobile menu, CV mobile "isi CV") — free focus containment, Esc-to-close, `::backdrop`, scroll lock. No Ark UI dependency, keeping Home JS < 60 KB gzip.
- Inter self-hosted (variable font, latin subset), no Google Fonts at runtime.
- Domain `zydhan.com` (`CNAME`, `.nojekyll`, HTTPS from GitHub Pages).
- pnpm only. **All dependencies must be installed at their latest published versions** (`pnpm add ...@latest` / `pnpm update --latest`); do not pin older majors. The scaffold's caret ranges must resolve to the newest release at install time.
- Indonesia only at `/` at launch; EN toggle hidden (no dead button); content structure locked per language (long-term: EN becomes `/`, ID moves to `/id`).
- Home JS (gzip) < 60 KB; no horizontal scroll at 390 / 768 / 1440 / 1920.
- No AI-flavored text/visuals; no inflated titles.
- **Email is `hello@zydhan.com` — LIVE since 2026-11-08; it routes to the owner's real inbox.** No replacement step is needed. It appears in `links.email`, `links.mailtoFreelance`, `links.mailtoBroken`, and the freelance-card email label.
- Content rules (verbatim): work counted from **Agustus 2021** ("5+ tahun"); official SEVIMA PENA title is **Software Engineer** — the string "tech lead" must never appear as a title, only the phrase "memimpin arsitektur inti dan tim engineering"; SNPMB counted from **2022** (part-time, parallel); "Memimpin 20 developer di ITS" is safe; SSO savings **US$60.000 per tahun ≈ Rp1 miliar (kurs 2024)**; observability is **Sentry** (SEVIMA PENA) and **OpenTelemetry** (SNPMB SSO, UTBK-SNBT); never fabricate numbers/quotes/case-study detail.

## File Structure

```
├── .github/workflows/deploy.yml          # build + deploy-pages
├── svelte.config.js                      # adapter-static, paths.base + trailingSlash
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── package.json / pnpm-lock.yaml / tsconfig.json / eslint.config.js
├── static/
│   ├── CNAME                             # "zydhan.com"
│   ├── .nojekyll
│   ├── 404.html                          # hand-authored, self-contained (GitHub Pages fallback)
│   ├── logo.webp                         # moved from public/ (1079×1079 source)
│   ├── fonts/inter-var.woff2             # Inter variable, latin subset
│   ├── fonts/source-serif-4.woff2        # Source Serif 4 variable (roman + italic), latin subset; print/PDF only
│   ├── icon-32.png  icon-192.png  icon-512.png  apple-touch-icon.png
│   ├── og.png                            # 1200×630 Open Graph card
│   ├── robots.txt                        # allow all
│   └── sitemap.xml                       # / and /cv
├── scripts/
│   ├── generate-icons.mjs                # sharp: logo.webp → icon set
│   └── og-card.html                      # reproducible OG card (screenshot source)
├── src/
│   ├── app.html                          # lang="id", no-flash theme bootstrap
│   ├── app.css                           # tokens, glass/surface/mesh/typography utilities, print
│   ├── app.d.ts
│   ├── lib/
│   │   ├── content.ts                    # single source of truth (per-language)
│   │   ├── links.ts                      # all external URLs + mailto
│   │   ├── theme.ts                      # resolveTheme + toggle + persist
│   │   ├── redirects.ts                  # legacy route → target mapping
│   │   ├── icons.ts                      # inline SVG path registry
│   │   └── components/
│   │       ├── Icon.svelte
│   │       ├── PrintCV.svelte            # A4 one-page print layout (hidden on screen), reads content.ts
│   │       ├── TopBar.svelte
│   │       ├── MobileMenu.svelte
│   │       ├── ThemeToggle.svelte
│   │       ├── FloatingBar.svelte
│   │       ├── ContactBlock.svelte
│   │       ├── Footer.svelte
│   │       ├── RoleCard.svelte
│   │       └── Redirect.svelte
│   └── routes/
│       ├── +layout.svelte / +layout.ts    # TopBar + slot + FloatingBar + Footer; prerender
│       ├── +page.svelte                   # Home (+ <svelte:head>)
│       ├── cv/+page.svelte                # CV (+ <svelte:head>)
│       ├── id/+page.svelte                # redirect → /
│       ├── projects/+page.svelte          # redirect → /cv
│       ├── id/projects/+page.svelte       # redirect → /cv
│       ├── projects/[slug]/+page.svelte / +page.ts
│       └── id/projects/[slug]/+page.svelte / +page.ts
└── tests/
    ├── content.test.ts / theme.test.ts / redirects.test.ts   # Vitest
    └── smoke.spec.ts                                            # Playwright
```

The old Next.js files (`src/app`, `src/components`, `src/config`, `src/hooks`, `src/lib`, `src/messages`, `src/projects`, `src/types`, `src/middleware.ts`, `next.config.mjs`, `mdx-components.tsx`, `next-env.d.ts`, `global.d.ts`, `.eslintrc.json`) are deleted in Task 1. Keep `docs/` and `public/logo.webp` (moved to `static/logo.webp`).

## Review Focus

The spec says what the site must do, not everything it will meet. These are the inputs/failure modes most likely to bite a real visitor, each pinned to a test in its owning task:

1. **Legacy bookmarked URLs** (`/id`, `/projects`, `/projects/<slug>`, `/id/projects/<slug>`) must land somewhere useful, not the 404. → Task 9 test asserts `snpmb-utbk-snbt-2023 → /cv#peran-snpmb`, `optika-id → /cv`, and the fixed routes.
2. **"Unduh PDF"** must produce a clean one-page A4 resume (single column, serif, light even under the dark theme) — no glass/toc/floating bar/footer in print, and no second page. → Task 6 tests assert the print stylesheet hides chrome and shows `.print-only`, and an emulated-print PDF has exactly one page at 794px width.
3. **Keyboard/AT users** opening the mobile menu must not tab into background content and must be able to close it (Esc / "Tutup"). → Task 4 test asserts the menu is a `<dialog>` (native focus containment) and the close control is a button labeled "Tutup".
4. **`prefers-reduced-transparency` / `prefers-reduced-motion` / no `backdrop-filter`** must still show every surface — glass falls back to solid, nothing hidden behind blur. → Task 2 test asserts the fallback rule sets solid backgrounds for `.glass`, `.bar-glass`, `.ov-glass`.
5. **Anti-fabrication rules** (no "tech lead" title, exact dates/savings/observability strings) must hold in the deployed data. → Task 3 tests assert the invariants over `content.id`.

## Model Assignments

Implementer = a fresh `general` subagent per task on the DeepSeek V4.1 Flash model. Reviewer = a different family (GLM-5.3-Flash). Variant `#low` is used for mechanical tasks where every value is pinned; `#high`/`#max` for tasks that wire SvelteKit APIs and are likelier to be hallucinated.

| Task | Model |
|------|-------|
| Task 1 — Scaffold SvelteKit + adapter-static, remove Next.js | `opencode-go/deepseek-v4.1-flash#high` |
| Task 2 — Design tokens, global CSS, fonts, no-flash theme | `opencode-go/deepseek-v4.1-flash#low` |
| Task 3 — Content data (single source of truth) | `opencode-go/deepseek-v4.1-flash#low` |
| Task 4 — App shell: layout, top bar, mobile `<dialog>` menu, icons | `opencode-go/deepseek-v4.1-flash#high` |
| Task 5 — Home page | `opencode-go/deepseek-v4.1-flash#high` |
| Task 6 — CV page + print ("Unduh PDF") | `opencode-go/deepseek-v4.1-flash#high` |
| Task 7 — Floating bottom bar + CV mobile overlay | `opencode-go/deepseek-v4.1-flash#high` |
| Task 8 — SEO, Open Graph, favicons, sitemap/robots | `opencode-go/deepseek-v4.1-flash#high` |
| Task 9 — Legacy redirects + 404 page | `opencode-go/deepseek-v4.1-flash#high` |
| Task 10 — Deploy workflow + acceptance (overflow/a11y/Lighthouse) | `opencode-go/deepseek-v4.1-flash#high` |

Reviewer (all tasks): `opencode-go/glm-5.3-flash#max`. Final fix wave and whole-branch review: `opencode-go/glm-5.3-flash#max`.

> **Execution note (2026-11-03):** tasks 1–3 initially ran on the free `opencode/*-free` models; the free quota was exhausted mid-run, so tasks 4–10 and all later reviews used the paid `opencode-go` equivalents. The scaffold is SvelteKit **3** (config in `vite.config.ts`, no `svelte.config.js`), imports use the `#lib` subpath scheme, and the final branch head is `089f91a` with the final review's fix wave applied. See the SDD ledger for every ruling and deferred minor.

---

### Task 1: Scaffold SvelteKit + build pipeline, remove Next.js

**Files:**
- Create: `package.json`, `pnpm-lock.yaml`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `src/app.html`, `src/app.d.ts`, `src/routes/+page.svelte` (placeholder), `src/routes/+layout.svelte` (placeholder), `vitest.config.ts`, `playwright.config.ts`
- Modify: `.gitignore` (add `.svelte-kit/`, `build/`)
- Delete: all old Next.js files listed in File Structure; move `public/logo.webp` → `static/logo.webp`

**Interfaces:**
- Produces: `BASE_PATH` env → `paths.base` in `svelte.config.js` (default `''`); scripts `pnpm dev`, `pnpm build`, `pnpm check` (svelte-check), `pnpm lint`, `pnpm test` (vitest), `pnpm test:e2e` (playwright).

- [ ] **Step 1: Scaffold SvelteKit 5 with TypeScript + pnpm**

Run: `pnpm create svelte@latest` into this directory with the minimal template (`npm create svelte@latest . -- --template minimal --types ts --no-add-ons`), then add as dev deps: `@sveltejs/adapter-static`, `vitest`, `@playwright/test`, `@axe-core/playwright`, `eslint`, `eslint-plugin-svelte`, `typescript-eslint`, `svelte-check`, `sharp`. Pin Svelte 5 (the template already resolves Svelte 5).

- [ ] **Step 2: Write `svelte.config.js`**

```js
import adapter from '@sveltejs/adapter-static';
const base = process.env.BASE_PATH || '';
export default {
  kit: {
    adapter: adapter({ pages: 'build', assets: 'build', fallback: undefined, strict: true }),
    paths: { base },
    trailingSlash: 'never',
    prerender: { handleHttpError: 'warn' }
  }
};
```

- [ ] **Step 3: Write `vitest.config.ts` and `playwright.config.ts`**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { environment: 'node', include: ['tests/**/*.test.ts'] } });
```

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests',
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'pnpm build && pnpm preview --port 4173 --strictPort',
    port: 4173,
    reuseExistingServer: !process.env.CI
  }
});
```

Add `"test": "vitest run"` and `"test:e2e": "playwright test"` to `package.json` scripts.

- [ ] **Step 4: Delete old Next.js files, move `logo.webp`, update `.gitignore`**

Remove every old Next.js file/dir from File Structure (do not touch `docs/`, `.git/`, `static/logo.webp`). Add `.svelte-kit/` and `build/` to `.gitignore`.

- [ ] **Step 5: Verify build, check, and lint are clean**

Run: `pnpm install && pnpm build && pnpm check && pnpm lint`
Expected: all exit 0; `build/` contains `index.html`.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: scaffold SvelteKit + adapter-static, remove Next.js"
```

---

### Task 2: Design tokens, global CSS, fonts, theme

**Files:**
- Create: `src/app.css`, `src/lib/theme.ts`, `static/fonts/inter-var.woff2`
- Modify: `src/app.html` (no-flash theme bootstrap + `<link>` fonts), `src/routes/+layout.svelte` (add `import '../app.css'`)
- Test: `tests/theme.test.ts`

**Interfaces:**
- Produces: `theme.ts` → `type Theme = 'light' | 'dark'`; `resolveTheme(stored: string | null, systemDark: boolean): Theme`; `toggleTheme(): Theme`; CSS token names consumed by every later task: `--bg --text --muted --accent --accenttint --onaccent --chip --surface --line --glass --glassline --glasshi --shadow --solid --glassbar --glassov --scrim --focus --m1 --m2 --m3`.

**Token values (from `Komponen.dc.html`, verbatim):**

Light: `bg #EEF3F4; text #12141C; muted #46413C; glass rgba(255,255,255,0.58); glassline rgba(255,255,255,0.85); glasshi rgba(255,255,255,0.9); shadow 0 0 0 1px rgba(18,20,28,0.08), 0 12px 40px rgba(70,65,60,0.16); solid #FFFFFF; accent #1F6F7A; accenttint rgba(31,111,122,0.12); onaccent #FFFFFF; chip rgba(18,20,28,0.07); surface rgba(255,255,255,0.72); line rgba(18,20,28,0.12); focus #1F6F7A; m1 #BFDDE1; m2 #D7AB8E; m3 #A19E9D; glassbar rgba(255,255,255,0.24); glassov rgba(255,255,255,0.44); scrim rgba(18,20,28,0.16)`

Dark: `bg #12141C; text #F1EEEA; muted #BDBAB8; glass rgba(24,27,38,0.62); glassline rgba(255,255,255,0.20); glasshi rgba(255,255,255,0.16); shadow 0 12px 40px rgba(0,0,0,0.45); solid #1E212C; accent #BFDDE1; accenttint rgba(191,221,225,0.14); onaccent #12141C; chip rgba(255,255,255,0.08); surface rgba(255,255,255,0.045); line rgba(255,255,255,0.13); focus #DAEAED; m1 #2E5560; m2 #7A5440; m3 #46413C; glassbar rgba(24,27,38,0.30); glassov rgba(24,27,38,0.48); scrim rgba(8,9,14,0.30)`

- [ ] **Step 1: Write the failing tests in `tests/theme.test.ts`**

```ts
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
});
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `pnpm test`
Expected: FAIL — `resolveTheme` not exported (and `src/app.css` absent).

- [ ] **Step 3: Implement `theme.ts` and the no-flash bootstrap**

```ts
// src/lib/theme.ts
export type Theme = 'light' | 'dark';

export function resolveTheme(stored: string | null, systemDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored;
  return systemDark ? 'dark' : 'light';
}

export function toggleTheme(): Theme {
  const d = document.documentElement;
  const next: Theme = d.dataset.theme === 'dark' ? 'light' : 'dark';
  d.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
  return next;
}
```

In `src/app.html` `<head>`, add this inline `<script>` (verbatim, before the CSS `%sveltekit.head%` injection) so `data-theme` is set before first paint:

```html
<script>
  (function () {
    var d = document.documentElement;
    var t = null;
    try { t = localStorage.getItem('theme'); } catch (e) {}
    var dark = (t === 'light' || t === 'dark') ? (t === 'dark') : window.matchMedia('(prefers-color-scheme: dark)').matches;
    d.dataset.theme = dark ? 'dark' : 'light';
  })();
</script>
```

Set `<html lang="id">`. Add `@font-face` for Inter variable (`font-weight: 100 900`, `font-display: swap`, latin subset) pointing at `/fonts/inter-var.woff2`; obtain the woff2 from the official Inter release (rsms/inter) latin subset and place it in `static/fonts/`.

- [ ] **Step 4: Write `src/app.css`**

Define `:root` (light) and `[data-theme='dark']` blocks with the token values above, then the utility classes below (copy verbatim, they are the design system):

```css
:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }

.glass {
  background: var(--glass);
  border: 1px solid var(--glassline);
  box-shadow: var(--shadow), inset 0 1px 0 var(--glasshi);
  border-radius: 22px;
}
.bar-glass { background: var(--glassbar); }
.ov-glass { background: var(--glassov); }
@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  .glass { -webkit-backdrop-filter: blur(24px) saturate(170%); backdrop-filter: blur(24px) saturate(170%); }
  .bar-glass { -webkit-backdrop-filter: blur(10px) saturate(160%); backdrop-filter: blur(10px) saturate(160%); }
  .ov-glass { -webkit-backdrop-filter: blur(12px) saturate(160%); backdrop-filter: blur(12px) saturate(160%); }
}
@media (prefers-reduced-transparency: reduce) {
  .glass, .bar-glass, .ov-glass { background: var(--solid); -webkit-backdrop-filter: none; backdrop-filter: none; }
}

.surface { background: var(--surface); border: 1px solid var(--line); border-radius: 18px; }

.mesh { background:
  radial-gradient(circle 280px at 14% 16%, var(--m1), transparent 72%),
  radial-gradient(circle 300px at 90% 30%, var(--m2), transparent 72%),
  radial-gradient(circle 260px at 40% 62%, var(--m3), transparent 72%); }
@media (min-width: 768px) {
  .mesh { background:
    radial-gradient(circle 360px at 10% 20%, var(--m1), transparent 72%),
    radial-gradient(circle 380px at 92% 30%, var(--m2), transparent 72%),
    radial-gradient(circle 340px at 55% 98%, var(--m3), transparent 72%); }
}
@media (min-width: 1440px) {
  .mesh { background:
    radial-gradient(circle 420px at 14% 22%, var(--m1), transparent 72%),
    radial-gradient(circle 440px at 88% 30%, var(--m2), transparent 72%),
    radial-gradient(circle 380px at 52% 88%, var(--m3), transparent 72%); }
}

.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 0 20px; border-radius: 999px; font: 600 15px Inter, system-ui, sans-serif; text-decoration: none; box-sizing: border-box; }
.btn-primary { background: var(--accent); color: var(--onaccent); }
.btn-ghost { background: var(--chip); color: var(--text); border: 1px solid var(--line); }

.chip { font: 600 13px Inter, system-ui, sans-serif; padding: 4px 12px; border-radius: 999px; background: var(--accenttint); color: var(--accent); }

.nav a { text-decoration: none; color: var(--muted); font: 500 15px Inter, system-ui, sans-serif; padding: 10px 14px; border-radius: 999px; }
.nav a:hover { color: var(--text); background: var(--chip); }

.row { padding: 20px 0; border-bottom: 1px solid var(--line); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; align-items: center; text-decoration: none; }
.date { color: var(--muted); font: 500 14px Inter, system-ui, sans-serif; font-variant-numeric: tabular-nums; }

.toc a { display: block; text-decoration: none; color: var(--muted); font: 500 15px Inter, system-ui, sans-serif; padding: 11px 14px; border-radius: 12px; }
.toc a:hover { background: var(--chip); color: var(--text); }

.item { display: flex; align-items: center; justify-content: space-between; min-height: 48px; padding: 0 14px; border-radius: 16px; text-decoration: none; font: 600 18px Inter, system-ui, sans-serif; letter-spacing: -0.01em; }

.seg { display: flex; gap: 4px; padding: 4px; background: var(--chip); border: 1px solid var(--line); border-radius: 16px; }
.seg button { flex: 1; min-height: 44px; border: 0; border-radius: 12px; font: 600 15px Inter, system-ui, sans-serif; cursor: pointer; background: transparent; color: var(--text); }

.bar a { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex: 1 1 0; height: 60px; padding: 0 4px; border-radius: 999px; text-decoration: none; font: 600 13px Inter, system-ui, sans-serif; color: var(--text); box-sizing: border-box; }
.bar a.on { background: var(--accent); color: var(--onaccent); }
.bar a.tint { background: var(--accenttint); color: var(--accent); }

/* typography scale */
h1 { letter-spacing: -0.035em; line-height: 1.05; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none; animation: none; } }
```

Note: the mesh radii use fixed pixels (not percentages) per the spec, responsive at 768/1440. The hero mesh instance gets an inline `mask-image: linear-gradient(#000 62%, transparent)` and `-webkit-mask-image` so it fades down; a second variant `.mesh-c` is the same without the mask (used by the contact block).

- [ ] **Step 5: Run tests, verify pass**

Run: `pnpm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app.css src/lib/theme.ts src/app.html static/fonts tests/theme.test.ts && git commit -m "feat: design tokens, fonts, and no-flash theme"
```

---

### Task 3: Content data (single source of truth)

**Files:**
- Create: `src/lib/content.ts`, `src/lib/links.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces (consumed by Tasks 5, 6, and print): `type Lang = 'id'`; `content: Record<Lang, Content>`; `getContent(lang?: Lang): Content`. Types: `Stat { value; label; labelShort; accent? }`, `Role { id; title; org; location; period; current?; summary?; bullets; chips }`, `SkillGroup { name; items }`, `Education { school; detail; period }`, `Writing { title; meta; href; cta; onCv? }`, `FeaturedProject { date; dateShort; title; description; descriptionShort; chips; href }`, plus `hero`, `freelance`, `contact`, `name`, `tagline`, `experienceNote`, `summary`, `footer`, `sectionTitles`.

**Type skeleton (write exactly this shape):**

```ts
export type Lang = 'id';
export interface Stat { value: string; label: string; labelShort: string; accent?: boolean; }
export interface Role { id: string; title: string; org: string; location: string; period: string; current?: boolean; summary?: string; bullets: string[]; pdfBullets?: string[]; chips: string[]; }
export interface PdfContent { headline: string; summary: string; projects: { text: string; href?: string }[]; }
export interface SkillGroup { name: string; items: string[]; }
export interface Education { school: string; detail: string; period: string; }
export interface Writing { title: string; meta: string; href: string; cta: string; onCv?: boolean; }
export interface FeaturedProject { date: string; dateShort: string; title: string; description: string; descriptionShort: string; chips: string[]; href: string; }
export interface Content {
  hero: { title: string; body: string; ctaPrimary: string; ctaSecondary: string };
  freelance: { title: string; body: string; bodyShort: string };
  stats: Stat[];
  featuredProjects: FeaturedProject[];
  roles: Role[];
  skills: SkillGroup[];
  education: Education;
  writings: Writing[];
  summary: string;
  pdf: PdfContent;
  tagline: string;
  experienceNote: string;
  name: string;
  contact: { title: string; body: string; bodyShort: string; ctaEmail: string; ctaLinkedIn: string };
  footer: { copyright: string; github: string; linkedin: string };
  sectionTitles: { recentRoles: string; allRoles: string; featured: string; writings: string; summary: string; experience: string; skills: string; education: string };
}
export const content: Record<Lang, Content> = { id: { /* data below */ } };
export function getContent(lang: Lang = 'id'): Content { return content[lang]; }
```

**Content (verbatim from artboards; the data *is* the deliverable — copy these exact strings):**

- `links`: `email = 'hello@zydhan.com'` (live); `linkedinHandle = 'linkedin.com/in/zydhanlinnar11'`; `mailtoFreelance = 'mailto:hello@zydhan.com?subject=Proyek%20freelance'`; `mailtoBroken = 'mailto:hello@zydhan.com?subject=Tautan%20rusak%20di%20zydhan.com'`; `linkedin = 'https://www.linkedin.com/in/zydhanlinnar11/'`; `github = 'https://github.com/zydhanlinnar11'`; `devto = 'https://dev.to/zydhanlinnar11/simple-and-easy-rest-api-implementation-with-laravel-4je7'`; `linkedinDebug = 'https://www.linkedin.com/posts/zydhanlinnar11_better-way-to-debug-gogolang-code-in-visual-activity-7341781881425752064-jUwY'`; `domain = 'https://zydhan.com'`.
- `hero = { title: "Aku memimpin tim developer dan mendampingi klien sampai sistemnya dipakai.", body: "Zydhan Linnar Putra, backend engineer di Surabaya. Aku memimpin 20 developer di ITS dan mendampingi go-live SEVIMA PENA langsung di lokasi klien.", ctaPrimary: "Lihat CV lengkap", ctaSecondary: "Ajak kerja sama" }`
- `freelance = { title: "Menerima proyek freelance", body: "Proyek apa pun boleh dibicarakan. Yang paling sering kukerjakan: backend dan API, modernisasi sistem lama, dan arsitektur untuk beban besar.", bodyShort: "Proyek apa pun boleh dibicarakan. Paling sering: backend dan API, modernisasi sistem lama, arsitektur beban besar." }` — the card renders two buttons: `links.email` and `links.linkedinHandle`.
- `stats` (4): `{value:"1 juta+", label:"pengguna pendaftaran UTBK-SNBT", labelShort:"pengguna UTBK-SNBT", accent:true}`, `{value:"~US$60 ribu", label:"penghematan per tahun dari optimasi SSO SNPMB, sekitar Rp1 miliar pada kurs 2024", labelShort:"hemat per tahun, sekitar Rp1 miliar (kurs 2024)"}`, `{value:"140+", label:"aplikasi tetap kompatibel saat migrasi SSO ke Azure AD", labelShort:"aplikasi tetap kompatibel"}`, `{value:"15+", label:"mahasiswa magang dibimbing dalam DDD dan Clean Architecture", labelShort:"magang dibimbing"}`.
- `roles` (5, in CV order) with `id / title / org / location / period / current / summary / bullets / chips`:
  1. `peran-pena` — "Software Engineer di SEVIMA PENA" / "SEVIMA (PT Sentra Vidya Utama)" / "Surabaya, on-site" / "Jan 2026 – sekarang" / current / summary "Memimpin arsitektur dan tim engineering produk K-12" / bullets: ["Memimpin arsitektur inti (Go dan React) dan tim engineering produk K-12, dari setup awal sampai launch untuk ~3.500 siswa dan guru.", "Code review, kolaborasi dengan PM dan klien, serta komunikasi infrastruktur dengan OpSec (database, monitoring, server). Menerapkan alur kerja agentic coding untuk menaikkan throughput tim.", "Integrasi dengan CBT dan SSO dalam 2 minggu, dukungan on-site saat go-live untuk ~2.000 pengguna awal.", "Integrasi dengan platform Sentra Finansial Teknologi (FinanceCloud dan Edufin) untuk pengelolaan keuangan dan agregator pembayaran.", "Mengoperasikan tracing, logging, dan performance monitoring dengan Sentry."] / chips ["Go","React","SSO","Sentry"]
  2. `peran-sevima` — "Full-stack Developer di SEVIMA" / "SEVIMA (PT Sentra Vidya Utama)" / "" / "Sep 2025 – Jan 2026" / bullets: ["Memimpin migrasi data asinkron pada siAkadCloud (monolit PHP) dengan RabbitMQ.", "Mengganti UI/UX alur penilaian di Edlink (Laravel dan Nuxt 2) dengan menjaga kompatibilitas API untuk aplikasi mobile dan PWA.", "Menulis dokumentasi setup Edlink untuk mempercepat onboarding."] / chips ["Laravel","Nuxt","RabbitMQ"]
  3. `peran-dptsi` — "Full-stack Developer di DPTSI ITS" / "Direktorat Pengembangan Teknologi dan Sistem Informasi" / "" / "Sep 2023 – Agu 2025" / summary "Sistem enrollment mahasiswa, SSO proxy, myITS Portal Mobile" / bullets: ["Membangun Student Enrollment System (Go, PostgreSQL, Next.js, Kafka) yang menggantikan sistem PHP 5 berumur 17 tahun.", "Membuat SSO proxy untuk Microsoft Entra ID OIDC dengan dukungan MFA, menjaga kompatibilitas 140+ aplikasi.", "Membimbing 15+ mahasiswa magang dalam DDD dan Clean Architecture, memimpin 20 developer, dan membuat framework Go internal bergaya Laravel (18 modul).", "Memulai aplikasi myITS Portal Mobile (Expo React Native) untuk 30 ribu+ pengguna."] / chips ["Go","Next.js","Kafka","OIDC","React Native"]
  4. `peran-snpmb` — "Full-stack Engineer di SNPMB" / "BPPP Kemdiktisaintek, part-time dan berjalan paralel dengan peran lain" / "" / "2022 – sekarang" / current / summary "UTBK-SNBT dan SSO nasional, part-time paralel" / bullets: ["Mengoptimalkan SSO berbasis PHP dengan Cloud Run, menghemat sekitar US$60.000 per tahun (sekitar Rp1 miliar pada kurs 2024).", "Merancang sistem registrasi UTBK-SNBT (Go, Next.js, Firestore, Google Cloud Storage) yang dipakai 1 juta+ pengguna.", "Berkoordinasi dengan 10+ developer untuk integrasi data, dan membangun CI/CD dengan Cloud Build.", "Mengoperasikan tracing, logging, dan performance monitoring SSO dan UTBK-SNBT dengan OpenTelemetry."] / chips ["Go","Firestore","Cloud Run","OpenTelemetry"]
  5. `peran-intern` — "Web Developer Intern di DPTSI ITS" / "" / "" / "Agu 2021 – Jun 2023" / summary "Laravel dan PHP; riset micro-frontend sebagai skripsi" / bullets [] / chips [] — render as a plain row (no card), but give it `id="peran-intern"` (the artboard omits this anchor; the spec requires it).
- `skills` (4): `{name:"Backend", items:["Go","PHP / Laravel","Node.js","Python","OIDC / OAuth2"]}`, `{name:"Frontend", items:["React","Next.js","Vue / Nuxt","React Native"]}`, `{name:"Arsitektur", items:["DDD","CQRS","Hexagonal","Modular monolith"]}`, `{name:"Data, cloud, dan observability", items:["PostgreSQL","Firestore","Kafka","RabbitMQ","GCP","Docker","Sentry","OpenTelemetry"]}`.
- `education = { school:"Institut Teknologi Sepuluh Nopember", detail:"S1 Teknik Informatika, Surabaya", period:"Agu 2019 – Sep 2023" }`.
- `writings` (2): `{title:"Simple and Easy REST API Implementation with Laravel", meta:"Dev.to", cta:"Baca di Dev.to", href: links.devto, onCv:true}`, `{title:"Better way to debug Go code in Visual Studio Code", meta:"LinkedIn · 4.432 tayangan", cta:"Baca di LinkedIn", href: links.linkedinDebug, onCv:false}`. (Home renders both; CV renders only `onCv`.)
- **PDF copy (one source, condensed for A4).** `roles[].pdfBullets` is optional: the print layout uses it when present and falls back to `bullets`; the web CV always uses `bullets`. It is role-level (not per bullet) because the condensed copy merges bullets. Set it for the four roles with bullets, taken from `docs/design/artboards/CV-PDF.dc.html` (the artboard is the reference for wording, keep every figure identical to `bullets`):
  - `peran-pena` (3): "Memimpin arsitektur inti (Go, React) dan tim engineering produk K-12, dari setup awal sampai launch untuk ~3.500 siswa dan guru." / "Mengintegrasikan CBT dan SSO dalam 2 minggu dan mendampingi go-live on-site untuk ~2.000 pengguna awal; berkoordinasi dengan PM, klien, dan OpSec soal infrastruktur." / "Mengintegrasikan platform FinanceCloud dan Edufin untuk pengelolaan keuangan dan agregator pembayaran; mengoperasikan tracing, logging, dan monitoring dengan Sentry."
  - `peran-sevima` (2): "Memimpin migrasi data asinkron pada siAkadCloud (monolit PHP) dengan RabbitMQ." / "Mengganti UI/UX alur penilaian Edlink (Laravel, Nuxt 2) dengan menjaga kompatibilitas API untuk aplikasi mobile dan PWA; menulis dokumentasi setup untuk mempercepat onboarding."
  - `peran-dptsi` (4): the artboard's four lines (enrollment system, SSO proxy, "Memimpin 20 developer, membimbing 15+ mahasiswa magang …", myITS Portal Mobile).
  - `peran-snpmb` (3): the artboard's three lines (SSO US$60.000, UTBK-SNBT 1 juta+, 10+ developer + OpenTelemetry).
  - `pdf = { headline: "Backend-Focused Full-Stack Developer | 5+ Tahun Pengalaman | Arsitek, Modernisasi Sistem, & Mentor", summary: <the artboard's Ringkasan Profesional paragraph, which keeps "US$60.000">, projects: [{text:"Situs portofolio pribadi: https://zydhan.com", href: links.site}, {text:'Artikel di Dev.to: "Simple and Easy REST API Implementation with Laravel"', href: links.devto}] }`.
  - The PDF shows `chips` as a "stack" line only if there is room; it is optional in the artboard (not shown there). PDF periods use `Role.period` as written in the data, so the artboard's `01/2026` style is not required.
- `featuredProjects` (4) with `date / dateShort / title / description / descriptionShort / chips / href`:
  1. "2026, memimpin arsitektur" / "2026" / "SEVIMA PENA" / "Platform K-12 dari nol sampai launch, terintegrasi dengan CBT, SSO, FinanceCloud, dan Edufin." / "Platform K-12 dari nol sampai launch." / ["Go","React"] / "/cv#peran-pena"
  2. "2022 – sekarang, full-stack" / "2022 – sekarang" / "UTBK-SNBT dan SSO SNPMB" / "Registrasi seleksi nasional untuk 1 juta+ pengguna, ditambah SSO yang menghemat sekitar Rp1 miliar per tahun." / "Registrasi nasional untuk 1 juta+ pengguna." / ["Go","Firestore","Cloud Run"] / "/cv#peran-snpmb"
  3. "2023 – 2025, arsitek" / "2023 – 2025" / "Sistem Enrollment Mahasiswa ITS" / "Menggantikan sistem PHP 5 berumur 17 tahun dengan Go, PostgreSQL, Next.js, dan Kafka." / "Menggantikan sistem PHP 5 berumur 17 tahun." / ["Go","PostgreSQL","Kafka"] / "/cv#peran-dptsi"
  4. "2023 – 2025, inisiator" / "2023 – 2025" / "myITS Portal Mobile" / "Aplikasi lintas platform untuk mahasiswa, staf, dan dosen, target 30 ribu+ pengguna." / "Aplikasi lintas platform, target 30 ribu+ pengguna." / ["Expo","React Native"] / "/cv#peran-dptsi"
- `summary = "Software engineer dengan fokus back-end (Go, PHP, Node.js) dan arsitektur modern (DDD, CQRS, Hexagonal). Memimpin modernisasi sistem lama ke Go dan Next.js, serta optimasi performa yang menghemat sekitar US$60.000 per tahun (sekitar Rp1 miliar pada kurs 2024). Terbiasa membimbing developer junior, berkolaborasi lintas tim, dan mengoperasikan tracing, logging, serta performance monitoring: Sentry di SEVIMA PENA, OpenTelemetry di SNPMB SSO dan UTBK-SNBT."`
- `tagline = "Software Engineer di SEVIMA PENA, memimpin arsitektur inti dan tim engineering. Sebelumnya memimpin 20 developer di DPTSI ITS dan membimbing 15+ mahasiswa magang."`
- `experienceNote = "Pengalaman profesional sejak Agustus 2021 (5+ tahun)"`
- `name = "Zydhan Linnar Putra"`
- `contact = { title:"Ada sistem yang perlu dibangun atau dirombak?", body:"Tulis apa yang ingin dibangun, kapan harus selesai, dan batasannya. Aku balas lewat email atau LinkedIn.", bodyShort:"Tulis apa yang ingin dibangun dan kapan harus selesai, lewat email atau LinkedIn.", ctaEmail:"Kirim email", ctaLinkedIn:"Hubungi di LinkedIn" }`
- `footer = { copyright:"© 2026 Zydhan Linnar Putra", github:"GitHub", linkedin:"LinkedIn" }`
- `sectionTitles = { recentRoles:"Tiga peran terakhir", allRoles:"Lihat semua peran di CV", featured:"Proyek unggulan", writings:"Tulisan", summary:"Ringkasan", experience:"Pengalaman", skills:"Keahlian", education:"Pendidikan" }`

- [ ] **Step 1: Write the failing tests in `tests/content.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { getContent } from '../src/lib/content';

const id = getContent('id');

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
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `pnpm test`
Expected: FAIL — `getContent` not exported.

- [ ] **Step 3: Implement `content.ts` and `links.ts`**

Write the type skeleton and the `Record<'id', Content>` object with the verbatim strings above; `getContent` returns `content[lang]`.

- [ ] **Step 4: Run tests, verify they pass**

Run: `pnpm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content.ts src/lib/links.ts tests/content.test.ts && git commit -m "feat: single-source content data"
```

---

### Task 4: App shell — layout, top bar, mobile menu, icons

**Files:**
- Create: `src/lib/icons.ts`, `src/lib/components/Icon.svelte`, `TopBar.svelte`, `MobileMenu.svelte`, `ThemeToggle.svelte`, `Footer.svelte`
- Modify: `src/routes/+layout.svelte`, `src/routes/+layout.ts`, `src/routes/+page.svelte` (temporary stub replaced in Task 5)
- Test: `tests/smoke.spec.ts` (initial — menu behavior)

**Interfaces:**
- Consumes: `content` (Task 3), `toggleTheme` (Task 2), CSS utilities (Task 2).
- Produces: `Icon.svelte` with prop `name: IconName`; `TopBar.svelte`; `MobileMenu.svelte` (a `<dialog>` with a bound `open` prop); `ThemeToggle.svelte`; layout renders `<TopBar/>`, `<main>{@render children()}</main>`, `<Footer/>`, `<FloatingBar/>` (FloatingBar lands in Task 7; render it here as a no-op import if not yet present).

**Svelte 5 conventions (use these idioms throughout):**

```svelte
<script lang="ts">
  // props
  let { name, size = 18 }: { name: IconName; size?: number } = $props();
  // state
  let open = $state(false);
  // page info (SvelteKit ≥2.12)
  import { page } from '$app/state';
  import { base } from '$app/paths';
  // children in a layout
  let { children } = $props();   // then {@render children()}
</script>
```

**Icon paths (24×24, stroke 2 round, `aria-hidden`):**

```ts
// src/lib/icons.ts
export type IconName = 'menu' | 'close' | 'chevron-right' | 'arrow-right' | 'download' | 'mail' | 'moon' | 'check' | 'file';
export const icons: Record<IconName, string> = {
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  'chevron-right': '<path d="M9 6l6 6-6 6"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  file: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
};
```

```svelte
<!-- src/lib/components/Icon.svelte -->
<script lang="ts">
  import { icons } from '$lib/icons';
  import type { IconName } from '$lib/icons';
  let { name, size = 18 }: { name: IconName; size?: number } = $props();
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{@html icons[name]}</svg>
```

- [ ] **Step 1: Write the failing smoke test for the mobile menu**

```ts
import { test, expect } from '@playwright/test';

test('mobile menu is a dialog and closes with the close control', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /Buka menu/i }).click();
  await expect(page.getByRole('dialog', { name: /Menu/i })).toBeVisible();
  await page.getByRole('button', { name: /Tutup/i }).click();
  await expect(page.getByRole('dialog', { name: /Menu/i })).toBeHidden();
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `pnpm test:e2e`
Expected: FAIL — no menu button / dialog found.

- [ ] **Step 3: Implement `+layout.ts`, `+layout.svelte`, `icons.ts`, and the components**

`src/routes/+layout.ts`:

```ts
export const prerender = true;
```

`src/routes/+layout.svelte`:

```svelte
<script lang="ts">
  import '../app.css';
  import TopBar from '$lib/components/TopBar.svelte';
  import FloatingBar from '$lib/components/FloatingBar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  let { children } = $props();
</script>

<TopBar />
<main>{@render children()}</main>
<Footer />
<FloatingBar />
```

`ThemeToggle.svelte`: a `<button type="button" aria-label="Ganti tema" onclick={() => toggleTheme()}>` wrapping `<Icon name="moon"/>`.

`TopBar.svelte`: root `<header class="top-bar glass bar-glass">` (the `top-bar` class is targeted by the print stylesheet). Contains: logo (`<a href={base + '/'} aria-label="Zydhan, ke Home"><img src={base + '/logo.webp'} alt="Zydhan" width="40" height="40"/></a>` with `border-radius:50%`), a `<nav class="nav" aria-label="Utama">` with Home/CV links — the active one gets `class="active"` (styled `color: var(--onaccent); background: var(--accent)`) and `aria-current="page"`, decided by `page.url.pathname`; then `<ThemeToggle/>` and `<a class="btn btn-primary" href={links.mailtoFreelance}>Hubungi saya</a>`. The EN button is **not** rendered. On <768px (via `@media` in a scoped `<style>` or a `matchMedia` rune), hide the nav/theme/contact and show a `<button class="menu-btn" aria-label="Buka menu">` (44×44) with `<Icon name="menu"/>` that sets `open = true`. (Note: the spec's "Perilaku" pins the top-bar "Hubungi saya" as the `mailto:` link; the artboard's `href="#kontak"` is superseded by the spec.)

`MobileMenu.svelte`: a `<dialog bind:this={dialog} aria-label="Menu">` where `let { open = $bindable() }: { open: boolean } = $props()`; a `$effect` calls `dialog.showModal()`/`dialog.close()` as `open` changes. Contents: Home/CV links (active = accenttint + `aria-current="page"`), the "Bahasa" segmented control (hidden at launch), the "Tema" segmented control (two `<button aria-pressed>` calling `toggleTheme`), and a bottom `<button aria-label="Tutup">Tutup</button>` that sets `open = false`. Scrim via `dialog::backdrop { background: var(--scrim) }` in `app.css`.

`Footer.svelte`: a native `<footer>` (targeted by the print stylesheet) with `© 2026 Zydhan Linnar Putra` and GitHub/LinkedIn links.

- [ ] **Step 4: Run smoke test, verify it passes**

Run: `pnpm test:e2e`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/icons.ts src/lib/components src/routes/+layout.svelte src/routes/+layout.ts tests/smoke.spec.ts && git commit -m "feat: app shell with top bar and mobile menu"
```

---

### Task 5: Home page

**Files:**
- Create: `src/lib/components/ContactBlock.svelte`
- Modify: `src/routes/+page.svelte`

**Interfaces:**
- Consumes: `getContent('id')`, `links` (Task 3), `base` from `$app/paths`.
- Produces: `/` renders hero, freelance card, four stats, "Tiga peran terakhir" (3 rows → `/cv#peran-*`), "Proyek unggulan" (4 cards), "Tulisan" (2 rows), contact block, footer. SEO meta lands in Task 8 (a placeholder `<svelte:head>` can be added now with an empty title).

- [ ] **Step 1: Write the failing smoke assertions for Home**

Add to `tests/smoke.spec.ts`:

```ts
test('Home renders hero, stats, roles, projects, writings, contact', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /memimpin tim developer/i, level: 1 })).toBeVisible();
  await expect(page.getByText('1 juta+')).toBeVisible();
  await expect(page.getByRole('link', { name: /Software Engineer di SEVIMA PENA/i })).toHaveAttribute('href', /#peran-pena/);
  await expect(page.getByRole('heading', { name: /Ada sistem yang perlu dibangun/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Kirim email/i })).toHaveAttribute('href', /mailto:/);
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `pnpm test:e2e`
Expected: FAIL (placeholder page).

- [ ] **Step 3: Implement Home in `+page.svelte`**

Structure (driven by `const c = getContent('id')`), matching `Main.dc.html` / `Mobile.dc.html`:

1. A `<div class="mesh" aria-hidden="true">` positioned at the top with `mask-image: linear-gradient(#000 62%, transparent)`.
2. Hero: `<h1>` (38px mobile / 50px ≥768 / 60px ≥1440 / 68px ≥1920 via `clamp` or media queries) + `<p>` body + primary `<a class="btn btn-primary" href={base + '/cv'}>Lihat CV lengkap <Icon name="arrow-right"/></a>` + ghost `<a class="btn btn-ghost" href="#kontak">Ajak kerja sama</a>`.
3. Freelance card `<aside class="glass">`: title, `body` (desktop) / `bodyShort` (mobile), then two `.btn-ghost` buttons `links.email` and `links.linkedinHandle`.
4. Stats: `<section aria-label="Dampak">` grid 4-col desktop / 2-col mobile; first card `.surface` with inline `background: var(--accent); border-color: var(--accent); color: var(--onaccent)`; value + `label` (desktop) / `labelShort` (mobile).
5. "Tiga peran terakhir": heading + `.surface` containing three `.row` links → `base + role.href` (`/cv#peran-pena` etc.) with title / `summary` / `.date` period (current roles get `color: var(--accent); font-weight: 700`), plus a trailing `a.btn-ghost` "Lihat semua peran di CV".
6. "Proyek unggulan": 2-col grid of `.surface` cards (4), each with `.date` (short on mobile), title, description (short on mobile), and `.chip` list, linking to `base + href`.
7. "Tulisan": heading + `.surface` with two `.row` links (title / meta / trailing `.btn-ghost` cta) to `writings[].href` (external, `target="_blank" rel="noopener"`).
8. `<ContactBlock id="kontak"/>` then nothing else (footer comes from the layout).

`ContactBlock.svelte`: a mesh-backed section (`<section id="kontak">` with `.mesh-c` overlay + inner `.glass` panel) rendering `c.contact.title`, `body`/`bodyShort`, and two buttons — "Kirim email" (`links.mailtoFreelance`) and "Hubungi di LinkedIn" (`links.linkedin`).

- [ ] **Step 4: Run smoke test, verify it passes**

Run: `pnpm test:e2e`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/routes/+page.svelte src/lib/components/ContactBlock.svelte && git commit -m "feat: home page"
```

---

### Task 6: CV page + print ("Unduh PDF")

**Files:**
- Create: `src/lib/components/RoleCard.svelte`, `src/lib/components/PrintCV.svelte`, `static/fonts/source-serif-4.woff2`
- Modify: `src/routes/cv/+page.svelte`, `src/app.css` (print stylesheet)

**Interfaces:**
- Consumes: `getContent('id')` (roles, skills, education, writings, summary, tagline, contact), `links`.
- Produces: `/cv` with sticky left TOC (`aria-current="location"` on active section via IntersectionObserver), sections `#ringkasan #pengalaman #keahlian #pendidikan #tulisan` and role anchors `#peran-pena #peran-sevima #peran-dptsi #peran-snpmb #peran-intern`; mobile horizontal-scrollable section pills; "Unduh PDF" button calling `window.print()`.

- [ ] **Step 1: Write the failing print + anchors tests**

Add to `tests/theme.test.ts` (it already reads `app.css` into `css`):

```ts
describe('print stylesheet', () => {
  it('hides chrome and forces solid surfaces in print', () => {
    expect(css).toContain('@media print');
    for (const sel of ['.top-bar', '.floating-bar', '.toc', 'footer', '#kontak', '.print-only']) {
      expect(css).toContain(sel);
    }
    expect(css).toContain('display: none');
    expect(css).toContain('size: A4');
  });
});
```

Add to `tests/smoke.spec.ts`:

```ts
test('CV exposes all section and role anchors', async ({ page }) => {
  await page.goto('/cv');
  for (const id of ['ringkasan','pengalaman','keahlian','pendidikan','tulisan','peran-pena','peran-sevima','peran-dptsi','peran-snpmb','peran-intern']) {
    await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  }
  await expect(page.getByRole('button', { name: /Unduh PDF/i })).toBeVisible();
});

test('print layout is one A4 page, one column, light', async ({ page }) => {
  await page.goto('/cv');
  await page.emulateMedia({ media: 'print', colorScheme: 'dark' });
  const sheet = page.locator('.print-only');
  await expect(sheet).toBeVisible();
  await expect(page.locator('.top-bar, .toc, footer, #kontak')).toBeHidden();
  const box = await sheet.boundingBox();
  expect(Math.round(box!.width)).toBe(794);
  expect(box!.height).toBeLessThanOrEqual(1123); // content must not spill to a second page
  expect(await sheet.evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(255, 255, 255)');
  const pdf = await page.pdf({ preferCSSPageSize: true });
  expect((pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length).toBe(1);
});
```

- [ ] **Step 2: Run them, verify they fail**

Run: `pnpm test && pnpm test:e2e`
Expected: FAIL (`/cv` not implemented; `@media print` absent).

- [ ] **Step 3: Implement `RoleCard.svelte` and the CV page**

`RoleCard.svelte` takes `role: Role` and renders `<article id={role.id} class="surface role">` with title / org + location / `.date` period (current in accent+bold) / `<ul>` bullets / `.chip` list. For the intern role, render a plain `.surface` row (`id="peran-intern"`) with title + `summary` + period, no bullets/chips.

CV `+page.svelte` structure (driven by `const c = getContent('id')`):

1. Top mesh (`mask-image` fade).
2. Header: `<h1>{c.name}</h1>`, `c.tagline` (18px), `c.experienceNote` (15px muted), and two buttons: "Unduh PDF" (`<button class="btn btn-primary" onclick={() => window.print()}>` with `<Icon name="download"/>`) and "Ajak kerja sama" (`#kontak`).
3. Two-column body: left `<aside class="surface toc">` (220px, `position: sticky; top: 24px`) with the 5 section links; active section via an IntersectionObserver toggling `background: var(--accent); color: var(--onaccent)` + `aria-current="location"`. Right column: `#ringkasan` (summary paragraph in a `.surface`), `#pengalaman` (the four `RoleCard`s + the intern row), `#keahlian` (2-col grid of `.surface` cards, each a group name + `.chip` items), `#pendidikan` (one `.surface` row), `#tulisan` (only `writings` with `onCv` — one `.surface` row). On mobile, replace the sticky TOC with a horizontally-scrollable pill row of the 5 anchors.
4. `<ContactBlock id="kontak"/>` (compact variant with "LinkedIn" as the secondary label).

`PrintCV.svelte` renders `<div class="print-only">` (a sibling of the page content, rendered from `getContent('id')`) and matches artboard `docs/design/artboards/CV-PDF.dc.html`: 794px wide, single column, padding 40px 44px 36px, Source Serif 4 (`@font-face` in `app.css`, `/fonts/source-serif-4.woff2`, `font-display: swap`) with Georgia/Times fallback, text `#000` on `#fff`, accent links `#0B4F8A`. Header: name (uppercase, centered), `pdf.headline`, one contact line (location, email, LinkedIn, site). Sections with an uppercase heading and 1.5px rule: Ringkasan Profesional (`pdf.summary`), Keahlian (the four `skills` groups as `Nama: item, item`), Pengalaman Kerja (per role: bold `org`, italic `title`, `period` right-aligned, then `pdfBullets ?? bullets`; the intern role is one row), Proyek & Tulisan (`pdf.projects`), Pendidikan. Body text 11.5px, row text 12px. Use `<a>` for links so the PDF keeps them clickable.

Add to `app.css`:

```css
.print-only { display: none; }
@page { size: A4; margin: 0; }
@media print {
  body > * { display: none !important; }
  body > .print-only, .print-only { display: block !important; }
  .top-bar, .floating-bar, .toc, footer, #kontak, .no-print { display: none !important; }
  html, body { background: #fff !important; color: #000; }
  .print-only { width: 794px; min-height: 1123px; box-sizing: border-box; background: #fff; }
}
```

If `body > * { display: none }` also hides the SvelteKit wrapper that contains `.print-only`, instead hide siblings with `:not(:has(.print-only))` or render `PrintCV` in `+layout.svelte` as a direct child of `body`'s wrapper; the Task 6 print test is the check. Print must stay one page: if the test fails after a copy change, shorten `pdfBullets`, not the font size below 11px.

- [ ] **Step 4: Run smoke test, verify it passes**

Run: `pnpm test && pnpm test:e2e`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/RoleCard.svelte src/lib/components/PrintCV.svelte src/routes/cv/+page.svelte src/app.css static/fonts/source-serif-4.woff2 && git commit -m "feat: CV page with one-page A4 print layout"
```

---

### Task 7: Floating bottom bar + CV mobile overlay

**Files:**
- Create: `src/lib/components/FloatingBar.svelte`
- Modify: `src/routes/+layout.svelte` (already imports it; now it renders content), `src/app.css` (add `dialog::backdrop` scrim)

**Interfaces:**
- Consumes: `$app/state` (`page.url.pathname`), `links`.
- Produces: `FloatingBar` shown only under 768px; appears after the page's trigger element scrolls out of view (Home: the hero "Lihat CV lengkap" primary button; CV: the mobile section pills) and hides when scrolled back up. Items — Home: Navigasi (opens the mobile menu), Hubungi (`mailto`), Lihat CV (`/cv`, accent). CV: Navigasi (opens the CV "isi CV" overlay `<dialog>` listing the 5 sections with a check on the active one), Unduh PDF (`window.print()`), Hubungi (accent). Open state turns the first item into "Tutup" (accenttint). Panel-to-bar gap 12px, edge margin 16px.

- [ ] **Step 1: Write the failing smoke test**

```ts
test('floating bar shows after scrolling past hero CTA on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: /Aksi cepat/i })).toBeHidden();
  await page.mouse.wheel(0, 1200);
  await expect(page.getByRole('navigation', { name: /Aksi cepat/i })).toBeVisible();
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `pnpm test:e2e`
Expected: FAIL (no floating bar).

- [ ] **Step 3: Implement `FloatingBar.svelte`**

```svelte
<script lang="ts">
  import { page } from '$app/state';
  import { links } from '$lib/links';
  import Icon from './Icon.svelte';
  import { onMount } from 'svelte';
  let visible = $state(false);
  let overlayOpen = $state(false);
  onMount(() => {
    const trigger = document.querySelector('[data-floating-trigger]');
    if (!trigger) return;
    const io = new IntersectionObserver(([e]) => { visible = !e.isIntersecting; }, { rootMargin: '0px' });
    io.observe(trigger);
    return () => io.disconnect();
  });
</script>

<nav class="floating-bar glass bar-glass bar" aria-label="Aksi cepat">
  <!-- three items; active/accent per page; first item toggles overlayOpen -->
</nav>
```

The bar's root `<nav class="floating-bar …">` carries the `floating-bar` class (targeted by the print stylesheet). Each page marks its trigger element with `data-floating-trigger` (Home: the hero primary button; CV: the mobile pills). The bar is `position: fixed; left: 16px; right: 16px; bottom: 16px` (rendered only under 768px via `@media`), and shows the three items per the Interfaces above; the accent item gets `.on`. The CV overlay is a `<dialog aria-label="Navigasi">` with the five section `.item` links, a `.check` on the active one, and `aria-current="location"`; gap to bar 12px. Add `dialog::backdrop { background: var(--scrim); }` to `app.css`.

- [ ] **Step 4: Run smoke test, verify it passes**

Run: `pnpm test:e2e`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/FloatingBar.svelte src/routes/+layout.svelte src/app.css && git commit -m "feat: floating bottom bar and CV overlay"
```

---

### Task 8: SEO, Open Graph image, favicons, sitemap/robots

**Files:**
- Create: `scripts/og-card.html`, `scripts/generate-icons.mjs`, `static/robots.txt`, `static/sitemap.xml`, `static/og.png`, `static/icon-32.png`, `static/icon-192.png`, `static/icon-512.png`, `static/apple-touch-icon.png`
- Modify: `src/routes/+page.svelte`, `src/routes/cv/+page.svelte` (add `<svelte:head>`), `src/app.html` (favicon links)

**Interfaces:**
- Consumes: `links.domain`.
- Produces: per-page `<title>`, `<meta name="description">`, canonical `https://zydhan.com<path>`, OG/Twitter tags with the 1200×630 `og.png`; favicon links; `robots.txt` and `sitemap.xml`.

**Exact SEO values:** Home `title = "Zydhan Linnar Putra, backend engineer di Surabaya"`, `description = "Memimpin tim developer dan mendampingi klien sampai sistemnya dipakai."`; CV `title = "CV — Zydhan Linnar Putra"`, `description` = `summary` (Task 3) first sentence.

- [ ] **Step 1: Write the failing smoke assertion for SEO**

```ts
test('Home has canonical, og tags, and description', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'id');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://zydhan.com/');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /backend engineer di Surabaya/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Memimpin tim developer/);
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `pnpm test:e2e`
Expected: FAIL.

- [ ] **Step 3: Add `<svelte:head>` to Home and CV pages**

Home `+page.svelte`:

```svelte
<svelte:head>
  <title>Zydhan Linnar Putra, backend engineer di Surabaya</title>
  <meta name="description" content="Memimpin tim developer dan mendampingi klien sampai sistemnya dipakai." />
  <link rel="canonical" href="https://zydhan.com/" />
  <meta property="og:title" content="Zydhan Linnar Putra, backend engineer di Surabaya" />
  <meta property="og:description" content="Memimpin tim developer dan mendampingi klien sampai sistemnya dipakai." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://zydhan.com/" />
  <meta property="og:image" content="https://zydhan.com/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Zydhan Linnar Putra, backend engineer di Surabaya" />
  <meta name="twitter:description" content="Memimpin tim developer dan mendampingi klien sampai sistemnya dipakai." />
  <meta name="twitter:image" content="https://zydhan.com/og.png" />
</svelte:head>
```

CV `+page.svelte` gets the analogous block with `title = "CV — Zydhan Linnar Putra"`, canonical `https://zydhan.com/cv`, and `og:title`/description to match. Add to `app.html`: `<link rel="icon" href="/icon-32.png" sizes="32x32">`, `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`, `<link rel="manifest" href="/manifest.webmanifest">` (or the 192/512 direct links).

- [ ] **Step 4: Produce `og.png` and favicons**

Write `scripts/og-card.html` reproducing the `Open-graph.dc.html` card (mesh + glass panel + 168px logo + "Zydhan Linnar Putra" / "Backend engineer di Surabaya" + the description line + "zydhan.com" accent label) at 1200×630, then screenshot once with Playwright: `npx playwright screenshot --viewport-size=1200,630 scripts/og-card.html static/og.png`. Write `scripts/generate-icons.mjs` using `sharp` to resize `static/logo.webp` into `icon-32.png` (32), `icon-192.png` (192), `icon-512.png` (512), `apple-touch-icon.png` (180). Commit all outputs. Write `static/robots.txt` (`User-agent: *\nAllow: /`) and `static/sitemap.xml` (two `<url>` entries: `/`, `/cv`, with `https://zydhan.com` loc).

- [ ] **Step 5: Run smoke test, verify it passes**

Run: `pnpm test:e2e`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add scripts static/og.png static/icon-* static/apple-touch-icon.png static/robots.txt static/sitemap.xml src/routes/+page.svelte src/routes/cv/+page.svelte src/app.html && git commit -m "feat: SEO, Open Graph, favicons, sitemap"
```

---

### Task 9: Legacy redirects + 404 page

**Files:**
- Create: `src/lib/redirects.ts`, `src/lib/components/Redirect.svelte`, `src/routes/id/+page.svelte`, `src/routes/projects/+page.svelte`, `src/routes/id/projects/+page.svelte`, `src/routes/projects/[slug]/+page.svelte`, `src/routes/projects/[slug]/+page.ts`, `src/routes/id/projects/[slug]/+page.svelte`, `src/routes/id/projects/[slug]/+page.ts`, `static/404.html`, `static/CNAME`, `static/.nojekyll`
- Test: `tests/redirects.test.ts`

**Interfaces:**
- Consumes: `links.domain`.
- Produces: `redirects.ts` → `projectRedirectTarget(slug: string): string`; `Redirect.svelte` renders `<meta http-equiv="refresh" content="0; url={to}">` + `<link rel="canonical" href="https://zydhan.com{to}">` + a fallback `<a>`.

**Redirect map:** `/id` → `/`; `/projects` → `/cv`; `/id/projects` → `/cv`; `snpmb-utbk-snbt-2023` → `/cv#peran-snpmb`; `optika-id` → `/cv`.

- [ ] **Step 1: Write the failing tests in `tests/redirects.test.ts`**

```ts
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
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `pnpm test`
Expected: FAIL — `projectRedirectTarget` not exported.

- [ ] **Step 3: Implement `redirects.ts`, `Redirect.svelte`, and the redirect routes**

```ts
// src/lib/redirects.ts
export const projectSlugs = ['optika-id', 'snpmb-utbk-snbt-2023'];
export function projectRedirectTarget(slug: string): string {
  return slug === 'snpmb-utbk-snbt-2023' ? '/cv#peran-snpmb' : '/cv';
}
```

```svelte
<!-- src/lib/components/Redirect.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  let { to }: { to: string } = $props();
</script>
<svelte:head>
  <meta http-equiv="refresh" content={`0; url=${base}${to}`} />
  <link rel="canonical" href={`https://zydhan.com${base}${to}`} />
</svelte:head>
<p>Memindahkan ke <a href={base + to}>{to}</a>…</p>
```

The three fixed routes render `<Redirect to="/">` / `<Redirect to="/cv">`. The two `[slug]` routes' `+page.ts`:

```ts
import type { EntryGenerator } from './$types';
import { projectRedirectTarget, projectSlugs } from '$lib/redirects';
export const entries: EntryGenerator = () => projectSlugs.map(slug => ({ slug }));
export function load({ params }) { return { to: projectRedirectTarget(params.slug) }; }
```

and their `+page.svelte` does `<script>let { data } = $props();</script><Redirect to={data.to} />`.

- [ ] **Step 4: Author `static/404.html` + `static/CNAME` + `static/.nojekyll`**

Write `static/CNAME` containing `zydhan.com` and an empty `static/.nojekyll`. Author `static/404.html` as a self-contained page matching `Halaman-404.dc.html`: inline `<style>` with the same `:root`/`[data-theme='dark']` tokens, the no-flash theme bootstrap `<script>` (from Task 2), the `.mesh`/`.glass`/`.btn` utility CSS (copied from `app.css`), and markup: a glass top bar (logo + "Hubungi saya" `mailto`), and a glass card with `<h1>Halaman ini tidak ada</h1>`, body "Alamatnya mungkin salah ketik, atau halamannya sudah dipindah. Dari sini kamu bisa lanjut ke bagian lain.", Home/CV `.item` links, "Kembali ke Home" (`.btn-primary`) and "Laporkan tautan rusak" (`mailto:hello@zydhan.com?subject=Tautan%20rusak%20di%20zydhan.com`). Use root-relative asset paths (production base `/`).

- [ ] **Step 5: Run tests + build, verify pass**

Run: `pnpm test && pnpm build`
Expected: PASS; `build/` contains `id/index.html`, `projects/index.html`, `projects/snpmb-utbk-snbt-2023/index.html`, `projects/optika-id/index.html`, `id/projects/...`, `404.html`, `CNAME`, `.nojekyll`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/redirects.ts src/lib/components/Redirect.svelte src/routes/id src/routes/projects static/404.html static/CNAME static/.nojekyll tests/redirects.test.ts && git commit -m "feat: legacy redirects and 404 page"
```

---

### Task 10: Deploy workflow + acceptance verification

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `tests/smoke.spec.ts` (add horizontal-scroll + a11y checks), `playwright.config.ts` (already set up in Task 1)

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Write the failing acceptance smoke test (horizontal scroll + a11y)**

```ts
const widths = [390, 768, 1440, 1920];
for (const w of widths) {
  test(`no horizontal scroll at ${w}px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    for (const path of ['/', '/cv']) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${path}@${w}`).toBeLessThanOrEqual(0);
    }
  });
}
```

```ts
import AxeBuilder from '@axe-core/playwright';
test('a11y: no serious or critical violations', async ({ page }) => {
  for (const path of ['/', '/cv']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const bad = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    expect(bad, path).toEqual([]);
  }
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `pnpm test:e2e`
Expected: FAIL (an overflow or axe violation, if any exists; if none, the test passes and this becomes the regression guard).

- [ ] **Step 3: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [rewrite]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm test
      - run: pnpm build
        env: { BASE_PATH: "${{ vars.BASE_PATH || '/zydhan.com' }}" }
      - uses: actions/upload-pages-artifact@v3
        with: { path: build }
      - uses: actions/deploy-pages@v4
```

(At cutover the owner sets the repo variable `BASE_PATH` to empty for the custom domain.)

- [ ] **Step 4: Verify build, check, lint, and tests are green; measure JS budget**

Run: `pnpm build && pnpm check && pnpm lint && pnpm test && pnpm test:e2e`
Expected: all pass. Measure gzipped Home JS (sum of the page's `.js` chunks in `build/`) and record it; it must be < 60 KB (expected comfortably under with no Ark UI).

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/deploy.yml tests/smoke.spec.ts && git commit -m "ci: deploy workflow and acceptance tests"
```

---

## Final verification (after all tasks, before handoff)

Run once more and record: `pnpm build` (clean), `pnpm check` (clean), `pnpm lint` (clean), `pnpm test` (pass), `pnpm test:e2e` (pass). Run Lighthouse (mobile) for `/` and `/cv` and confirm performance/accessibility/best-practices/SEO ≥ 95 each. Do a visual pass against the artboards at 390 / 768 / 1440 / 1920. Confirm legacy routes serve redirects and `404.html` renders. Confirm the live email `hello@zydhan.com` is used everywhere (no replacement needed).
