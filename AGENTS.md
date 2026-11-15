# zydhan.com — project instructions

Personal site and CV for **Zydhan Linnar Putra**. The owner delegates product,
engineering, QA, and deployment decisions to the agent acting as PM. This file is
the durable operating manual; keep it accurate when the project changes.

## Stack and hosting

- SvelteKit (Svelte 5 runes) + TypeScript, `@sveltejs/adapter-static`, every page
  prerendered (`src/routes/+layout.ts`: `prerender = true`, `trailingSlash = 'never'`).
- pnpm. No Tailwind: plain CSS with design tokens in `src/app.css`.
- No server runtime, no forms, no analytics, no client-side data fetching.
- Production: GitHub Pages at <https://zydhan.com>, deployed from `main`.
  DNS is Cloudflare; cutover/rollback runbook is `docs/CUTOVER.md`.
- Base path is empty in production. The `github.io/zydhan.com` preview build uses
  `BASE_PATH=/zydhan.com`; all internal links must keep working under both.

## Commands and gates

```sh
pnpm dev          # local dev server
pnpm check        # svelte-kit sync + svelte-check
pnpm lint         # ESLint
pnpm test         # Vitest unit tests (tests/**/*.test.ts)
pnpm test:e2e     # Playwright: builds, previews on :4173, then tests
pnpm build        # static output in build/ + scripts/fix-html-lang.mjs
pnpm preview      # serve build output
```

**Before pushing to `main`, all gates must be green, in this order:**

```sh
pnpm check && pnpm lint && pnpm test && pnpm test:e2e
```

The deploy workflow repeats these gates, so a red push is a wasted deploy, not a
safety net. For base-path-sensitive changes also run:

```sh
BASE_PATH=/zydhan.com pnpm exec playwright test tests/base-path.spec.ts
```

Local gotchas:

- Playwright `reuseExistingServer` can silently reuse a stale `vite preview` on
  port 4173. Kill it before e2e when the build changed:
  `pgrep -f "vite.js preview" | xargs -r kill`.
- Local Playwright may only have `chromium-headless-shell`; CI installs with
  `--only-shell`.
- `pnpm test:e2e` rebuilds and starts its own preview server.
- `build/`, `.svelte-kit/`, `test-results/` are gitignored build artifacts.

## Code map

| Path | Responsibility |
| --- | --- |
| `src/lib/pages/HomePage.svelte`, `CVPage.svelte` | Shared page bodies; accept `lang: Lang` |
| `src/routes/**/+page.svelte` | Thin wrappers: `/`, `/cv`, `/id`, `/id/cv` |
| `src/routes/projects/**`, `src/routes/id/projects/**` | Static meta-refresh redirect stubs |
| `src/lib/content.ts` | `Lang = 'id' \| 'en'`, Indonesian content, `Content` type, `getContent()` |
| `src/lib/content.en.ts` | English content + `enChrome` |
| `src/lib/ui-copy.ts` | Non-content UI strings: aria labels, dialogs, SEO, 404, mailto |
| `src/lib/i18n.ts` | `langFromRouteId`, `langHref`, `swapLangPath` |
| `src/lib/lang-nav.ts` | `counterpartHref` (base-path-safe language counterpart) |
| `src/lib/components/Seo.svelte` | Title, description, canonical, hreflang, OG/Twitter |
| `src/lib/components/TopBar.svelte`, `MobileMenu.svelte`, `LangToggle.svelte` | Navigation + language/theme controls |
| `src/lib/components/FloatingBar.svelte` | Mobile bottom bar; shared section overlay for Home and CV |
| `src/lib/ui.svelte.ts` | Shared UI state: `menuOpen`, `cvActive`, `homeActive` |
| `scripts/fix-html-lang.mjs` | Post-build per-route `<html lang>` rewrite |
| `scripts/generate-og.mjs`, `scripts/generate-icons.mjs` | Regenerate `static/og.png` (1200×630) and favicons with sharp |
| `tests/` | Unit + Playwright suites; `tests/test-fixture.ts` is BASE_PATH-aware |

## Product invariants

- **Bilingual routing is real navigation, not client state.** EN is default at
  `/` and `/cv`; ID lives at `/id` and `/id/cv`. Never store language in
  localStorage or redirect by `Accept-Language`.
- **One content source.** Text lives in `content.ts` / `content.en.ts`; chrome
  strings in `ui-copy.ts`. Do not hardcode user-visible copy in components.
- **Anchors and slugs are stable and identical across languages** (`#ringkasan`,
  `#pengalaman`, `#peran-pena`, …). Old links such as `/cv#peran-pena` must keep
  working.
- **No mixed-language pages.** Tests enforce this; add tests when adding copy.
- `404.html` is English-only (one static file cannot vary by language); `og.png`
  uses English text because EN is the default. `og:image:alt` still localizes.
- `<html lang>` is correct in the prerendered HTML (post-build script) and synced
  on client-side navigation (`$effect` in `src/routes/+layout.svelte`).
- **Content integrity.** Never inflate titles, claims, or metrics beyond the CV /
  LinkedIn version. All numbers and claims must match across Home, CV, and print.
- **Design source of truth:** `docs/design/artboards/*.dc.html` and the specs in
  `docs/superpowers/specs/`. Tokens and visual direction are defined there.
- **Visual anti-goals:** generic AI-portfolio output, pastel blue-purple
  gradients, status dots, mono labels with middle dots, vague claims, closing
  aphorisms. Keep the selective glass + teal accent language.
- Accessibility and mobile parity are part of "done": keyboard, focus states,
  `aria-current`, reduced motion, no horizontal scroll at 390px.
- Print CV is one A4 page, one column, always light, language follows the page.

## Change workflow

- **Small fix:** reproduce → fix root cause → gates → visual check at 390px and
  desktop → commit → push `main` → watch deploy → verify live.
- **Non-trivial feature or redesign:** write a short spec in
  `docs/superpowers/specs/` and a plan in `docs/superpowers/plans/` before code;
  get owner approval on direction. Use the `brainstorming` skill for new work and
  `systematic-debugging` for bugs.
- **Review:** for risky or multi-file changes, get an independent review (fresh
  subagent or code-review skill) before merging. Verify findings instead of
  applying them blindly.
- **Commits:** one logical change per commit. Indonesian messages with a
  conventional prefix (`fix:`, `feat:`, `docs:`, `chore:`), matching existing
  history. Never rewrite history on `main`; roll back with `git revert`.
- **Visual QA:** use Playwright screenshots for both languages and both themes
  when UI changes. Compare against the artboards, not just "it renders".

## Deployment protocol

Production deploys automatically on push to `main` (`.github/workflows/deploy.yml`).
The owner explicitly chose direct-to-`main` delivery after review.

1. Gates green locally.
2. Commit on `main`.
3. `git push origin main`.
4. `gh run list --workflow=deploy.yml --limit 1`, then
   `gh run watch <id> --exit-status`.
5. Verify the live site:
   - `curl -s -o /dev/null -w '%{http_code}' https://zydhan.com/` → `200`
   - key strings/anchors present on `/` and `/id`
   - mobile interaction check with Playwright when UI changed
6. Report commit hash, workflow run ID/status, and live verification.

Preview deploy (non-`main` branch, `BASE_PATH=/zydhan.com`):

```sh
gh workflow run deploy.yml --ref preview
```

Never force-push `main`. Do not deploy with red gates. Do not touch DNS,
Cloudflare, domain, or Pages settings without explicit owner approval.

## Known deferred minors

Do not fix opportunistically; fold them into a related change only if asked:

- Deduplicate the `link()` wrapper across HomePage/CVPage/FloatingBar.
- Remove unused `uiCopy.floatingBar.closeAria`.
- Assert the 404 heading instead of only the title in tests.
- Escape the `.` in the `tests/base-path.spec.ts` `waitForURL` regex.
- Fix indentation in `tests/content.test.ts`.

## Reporting to the owner

Reply in Indonesian, concise and concrete. State what changed, how it was
verified, and the deploy/live status. No praise, no hedging, no filler.
