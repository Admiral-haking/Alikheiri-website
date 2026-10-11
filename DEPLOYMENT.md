# Deployment

The portfolio is configured for `https://teamcore.ir` and publishes the static build to the `gh-pages` branch through `.github/workflows/deploy-pages.yml`.

## GitHub Pages

1. Open **Repository Settings → Pages**.
2. Set **Source** to **Deploy from a branch**.
3. Select branch `gh-pages` and folder `/ (root)`.
4. Set the custom domain to `teamcore.ir` and enable HTTPS after GitHub verifies DNS.

The repository contains `public/CNAME`, so the generated site keeps the custom domain during each deployment.

## DNS

For the apex domain, use the four GitHub Pages A records supplied by GitHub’s Pages documentation. For `www`, add a CNAME pointing to:

```text
Admiral-haking.github.io
```

Redirect `www.teamcore.ir` to `teamcore.ir` at the DNS or hosting provider if both addresses are intended to resolve to the same canonical URL.

## Verification

After the workflow succeeds, verify:

```bash
curl -I https://teamcore.ir/
curl -I https://teamcore.ir/robots.txt
curl -I https://teamcore.ir/sitemap.xml
```

The expected result is HTTP `200` with HTTPS enabled. The canonical URL, sitemap, robots file, Open Graph image, and asset paths are already configured for the custom domain.
