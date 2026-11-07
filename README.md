# OKCoded website

Source for [okcd.io](https://okcd.io), built with Parcel and deployed to GitHub Pages through GitHub Actions.

## Source of truth

- `portfolio/src/` — page HTML, application JavaScript, styles, and media assets.
- `portfolio/content/insights/` — Markdown articles and their front matter. See its README for the publishing schema.
- `portfolio/scripts/` — article generation, functional checks, the Parcel entry-point wrapper, and publish assembly.
- `portfolio/publish-static/` — files copied into the published site, including `CNAME`, icons, `robots.txt`, the web manifest, the 404 page, and the legacy `about.html` redirect.
- `.github/workflows/portfolio-pages.yml` — CI validation and production deployment.

The article generator writes `portfolio/src/insights/index.html`, article pages, and a gitignored manifest. The generated HTML is currently tracked; edit the Markdown or generator instead of editing generated article HTML directly. Regenerate and include any resulting article HTML changes when changing their sources.

## Local development

Use Node.js 24, as specified in `portfolio/.nvmrc`.

```sh
cd portfolio
npm ci
npm start
```

The development command generates Insights pages and starts Parcel with the site open in a browser. Run commands from `portfolio/`; the repository root is not a built website or a static preview directory.

## Tests and production build

```sh
cd portfolio
npm test
npm run build:publish
```

`build:publish` runs the existing contact, analytics, and resilience checks; cleans the Parcel output/cache; regenerates Insights pages; builds all page entry points; and assembles the publish artifact. The optional jsdom portion of the contact check skips when jsdom is not installed.

Generated directories are local-only and gitignored:

- `portfolio/dist/` — Parcel output.
- `portfolio/build-out/` — the complete publish artifact, assembled from `dist/` and `publish-static/`, with a generated sitemap and validation checks.
- `portfolio/.parcel-cache/` — Parcel cache.

A production build from unchanged sources should leave tracked files unchanged. CI checks this after building and rejects tracked files under the generated output/cache directories. Do not commit these generated directories or copy their contents to the repository root. The old `copy-dist-to-root` command has been removed.

To preview the assembled artifact without the development server:

```sh
cd portfolio/build-out
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8080/`. Stop the server with Ctrl-C.

## Deployment and rollback

GitHub Pages is configured for workflow deployment. Pull requests build and validate `portfolio/build-out/` without deploying it. A push to `master`, including merging a PR, triggers the production deployment; obtain approval for both the merge and its resulting deployment.

Old root-level website output and unused legacy media have been removed. Required static publishing files remain in `portfolio/publish-static/`. Historical pages and assets are available in Git history rather than in a second committed copy of the website. Use a reviewed revert or build a selected historical revision for rollback; do not restore the root-copy publishing workflow.
