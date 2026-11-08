# Cutover runbook — zydhan.com

The site is a static SvelteKit build served by GitHub Pages at
`https://zydhan.com`. Production deploys from `main`; the `preview` branch can
still be deployed manually to `https://zydhanlinnar11.github.io/zydhan.com/`.

## Prerequisites

1. **Pages source** is **GitHub Actions** (already configured).
2. **Cloudflare API token** — create a token with `Zone:Read` and `DNS:Edit`
   for the `zydhan.com` zone, then store it as the repository secret
   `CLOUDFLARE_API_TOKEN`:

   ```sh
   gh secret set CLOUDFLARE_API_TOKEN --repo zydhanlinnar11/zydhan.com
   ```

3. `static/CNAME` contains `zydhan.com` on `main`. The `preview` branch
   intentionally omits it so the preview URL does not redirect to production.

## 1. Verify the preview

Open `https://zydhanlinnar11.github.io/zydhan.com/` and check Home, CV,
redirects, 404, fonts, and the OG image. Deploy a fresh preview with:

```sh
gh workflow run deploy.yml --ref preview
```

## 2. Deploy production

Merge the reviewed preview commits into `main`, then push. The `Deploy to
GitHub Pages` workflow runs automatically with an empty `BASE_PATH` and
publishes the `build/` directory.

## 3. Bind the custom domain

```sh
gh api --method PUT repos/zydhanlinnar11/zydhan.com/pages \
  -f cname=zydhan.com
```

GitHub will start the DNS check. The domain does not need to resolve to Pages
yet.

## 4. Point Cloudflare at GitHub Pages

Run the manual workflow first as a dry run, then apply:

```sh
gh workflow run configure-cloudflare-dns.yml -f apply=false
gh run watch

gh workflow run configure-cloudflare-dns.yml -f apply=true
gh run watch
```

It replaces the apex `A`/`AAAA` records and the `www` CNAME with the GitHub
Pages targets, leaves every other DNS record alone, and sets the records to
**DNS only** (not proxied).

Old Vercel records for rollback: `A @ 76.76.21.21` and
`CNAME www cname.vercel-dns.com`.

## 5. Wait for propagation and HTTPS

```sh
dig +short zydhan.com A
dig +short www.zydhan.com CNAME
```

Expect the four `185.199.108-111.153` addresses and
`zydhanlinnar11.github.io`. Then enable **Enforce HTTPS** in
**Settings → Pages** (or via the API) once GitHub finishes issuing the
certificate.

## 6. Verify the live site

- `/` renders Home with fonts, images, and the OG card.
- `/cv` renders the CV, anchors, and the mobile floating bar.
- Legacy redirects return a meta refresh:
  `/id`, `/projects`, `/id/projects`,
  `/projects/snpmb-utbk-snbt-2023`, `/projects/optika-id`,
  `/id/projects/snpmb-utbk-snbt-2023`, `/id/projects/optika-id`.
- An unknown path serves `404.html` with status 404.
- `https://zydhan.com/sitemap.xml` and `https://zydhan.com/robots.txt` resolve.
- OG/Twitter metadata on `/` and `/cv` points at `https://zydhan.com/...` and
  the `og.png` image loads.
- No `/zydhan.com/` prefix appears in asset URLs.
- `https://www.zydhan.com` reaches the site.

## Rollback

Restore the Vercel DNS records from step 4. The old Vercel deployment remains
available, so reverting DNS is enough to bring the previous site back.
