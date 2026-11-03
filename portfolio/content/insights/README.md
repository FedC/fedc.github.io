# OKCoded Insights (Markdown → static HTML)

Architecture only in Phase 2A. **Do not commit filler articles.**

## Location

Place publishable posts as:

`content/insights/<slug>.md`

Files starting with `_` are ignored by the builder.

## Front matter schema

```yaml
---
title: "Clear, specific title"
slug: "url-slug"
description: "Meta description for search and social."
date: "2026-04-01"
updated: "2026-04-01"
category: "SEO"
author: "Federico Commisso"
featuredImage: ""          # optional path or absolute URL
draft: false               # true = excluded from build, sitemap, index
relatedServices:
  - label: "SEO & analytics"
    href: "/services/"
---
```

Markdown body follows the front matter.

## Output

`npm run build:insights` writes:

- `src/insights/index.html` (index of non-draft posts)
- `src/insights/<slug>/index.html` (article pages)
- `src/insights/.manifest.json` (for sitemap; gitignored)

## Routes

- `/insights/` — index
- `/insights/<slug>/` — article

## Notes

- No WordPress or database.
- Articles need human review before `draft: false`.
- Related services CTA is rendered from `relatedServices`.
