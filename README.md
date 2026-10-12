# AliKheiri Portfolio

Bilingual personal portfolio for AliKheiri, focused on backend engineering, full-stack development, data security, defensive AI, and practical open-source work.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

The local site is available at `http://localhost:3000`.

## Validate a production build

```bash
npm run lint
npm run build
npm run preview
```

The build is static and is generated in `dist/`. The project keeps the deployable source in `/home/alikheiri/Alikheiri-website`.

## Contact form

Set `VITE_FORMSPREE_ENDPOINT` in `.env` to enable a hosted form endpoint. When it is empty or unavailable, the form opens the visitor's email client with a prepared message addressed to `alikheiri10313@gmail.com`.

## Content and languages

- Portfolio projects and profile content: `src/data/realPortfolioData.ts`, `src/data/realProfileData.ts`
- Persian and English interface copy: `src/data/translations.ts`
- Local admin editing: open the site with the `#admin` hash
- Resume and public assets: `public/`

GitHub repository statistics and activity are loaded from the public API with a short local cache and a safe fallback snapshot.

## Publish

Every push to `main` builds the site and publishes `dist/` to the `gh-pages` branch through `.github/workflows/deploy-pages.yml`. To make the public site live, enable GitHub Pages for the repository, select `gh-pages` as the branch and `/ (root)` as the folder, then set the custom domain to `teamcore.ir`.

Detailed DNS and HTTPS steps are in [DEPLOYMENT.md](DEPLOYMENT.md).
