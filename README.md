# zydhan.com

Personal site and CV for Zydhan Linnar Putra. Built with SvelteKit (Svelte 5,
static adapter) and deployed to GitHub Pages.

## Development

```sh
pnpm install
pnpm dev          # local dev server
pnpm check        # svelte-check + type sync
pnpm lint         # ESLint
pnpm test         # Vitest unit tests
pnpm test:e2e     # Playwright (builds and previews the site)
pnpm build        # static output in build/
pnpm preview      # serve the production build
```

Set `BASE_PATH` when building for the `github.io/zydhan.com` preview
(`BASE_PATH=/zydhan.com pnpm build`). Production uses an empty base path.

## Deployment

Deployment is manual (`workflow_dispatch`) until the custom-domain cutover is
complete. Follow [`docs/CUTOVER.md`](docs/CUTOVER.md) for the email replacement,
CNAME handling, `BASE_PATH`, Pages settings, verification, and re-enabling
automatic deploys from `main`.
