# Cutover runbook — zydhan.com

The site is a static SvelteKit build served by GitHub Pages. Until cutover it
deploys manually (`workflow_dispatch`) from the `rewrite` branch and is built
with `BASE_PATH=/zydhan.com` for the `github.io/zydhan.com` preview.

Work through these steps in order.

## 1. Email (done 2026-11-08)

`hello@zydhan.com` is live and routes to the owner's real inbox. No replacement
is needed: the site already uses it in `src/lib/links.ts` (`email`,
`mailtoFreelance`, `mailtoBroken`) and `static/404.html` (header CTA, footer
CTA, "Laporkan tautan rusak"). Verify the built output still uses it:

```sh
grep -R "hello@zydhan.com" build src static
```

## 2. Decide how to handle CNAME for the preview

`static/CNAME` contains `zydhan.com`, so a `github.io` preview deployment will
redirect to the live custom domain (or fail while DNS still points elsewhere).

Choose one:

- **Preferred for a final preview:** temporarily remove `static/CNAME`, deploy
  the preview, then restore it before the production deploy.
- **Or** point DNS for `zydhan.com` at GitHub Pages first and accept that the
  preview URL redirects to the custom domain.

Keep `static/CNAME` in the repository for the production build — it is how
GitHub Pages binds the site to `zydhan.com`.

## 3. Configure the production base path

For the custom domain the site must be served from `/`, not from
`/zydhan.com`:

1. Set the repository variable `BASE_PATH` to an empty string.
2. Remove the `|| '/zydhan.com'` fallback from the build step in
   `.github/workflows/deploy.yml` so an empty value stays empty:

   ```yaml
   - run: pnpm build
     env:
       BASE_PATH: ${{ vars.BASE_PATH }}
   ```

Without this, every asset and internal link is emitted under `/zydhan.com/`.

## 4. Enable Pages and the deployment workflow

1. In the repository settings, set **Pages → Build and deployment → Source**
   to **GitHub Actions**.
2. Run the **Deploy to GitHub Pages** workflow once via
   `workflow_dispatch` and confirm it succeeds.
3. In **Pages → Custom domain**, enter `zydhan.com` (the `CNAME` file also
   records this).
4. Wait for the DNS check, then enable **Enforce HTTPS**.

## 5. Verify the live site

Check each item in a private window and with `curl`:

- `/` renders the Home page with working fonts and images.
- `/cv` renders the CV, anchors (`#ringkasan`, `#pengalaman`, `#keahlian`,
  `#pendidikan`, `#tulisan`, `#peran-*`) and the floating bar on mobile.
- Legacy redirects return the page and a correct meta refresh:
  `/id`, `/projects`, `/id/projects`,
  `/projects/snpmb-utbk-snbt-2023`, `/projects/optika-id`,
  `/id/projects/snpmb-utbk-snbt-2023`, `/id/projects/optika-id`.
- An unknown path serves `404.html` with status 404.
- `https://zydhan.com/sitemap.xml` and `https://zydhan.com/robots.txt` resolve.
- Open Graph and Twitter metadata on `/` and `/cv` point at
  `https://zydhan.com/...` and the `og.png` image loads.
- No request 404s in the browser network panel, and no `/zydhan.com/` prefix
  appears in asset URLs.

## 6. Re-enable automatic deploys

Only after steps 1–5 are verified, re-enable the workflow trigger in
`.github/workflows/deploy.yml` for **`main`** (not `rewrite`):

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

Keep `workflow_dispatch` so hotfix deploys remain possible. Do not re-enable
pushes from `rewrite`.
