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

Production deploys automatically from `main` to GitHub Pages at
`https://zydhan.com`. Manual dispatches from other branches build the
`https://zydhanlinnar11.github.io/zydhan.com/` preview with `BASE_PATH=/zydhan.com`.

Cloudflare DNS is managed by the manual **Configure Cloudflare DNS** workflow,
which uses the `CLOUDFLARE_API_TOKEN` repository secret. See
[`docs/CUTOVER.md`](docs/CUTOVER.md) for the cutover and rollback steps.
