#!/usr/bin/env node
/**
 * Compile content/insights/*.md → static HTML under src/insights/.
 * Phase 2A: safe with zero articles (empty intentional index).
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { marked } from 'marked'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'content/insights')
const outDir = join(root, 'src/insights')

const SITE = 'https://okcd.io'

function fail(msg) {
  console.error(`build-insights: ${msg}`)
  process.exit(1)
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function chrome(activePath) {
  const link = (href, label) => {
    const current = href === activePath
    return `<a href="${href}" data-nav${current ? ' aria-current="page" class="is-active"' : ''}>${label}</a>`
  }
  return `<header class="frame">
		<div class="frame__title-wrap">
			<p class="frame__title"><a href="/" data-nav>Okcd.io</a></p>
		</div>
		<nav class="frame__links site-nav" aria-label="Primary">
			${link('/services/', 'Services')}
			${link('/work/', 'Work')}
			${link('/insights/', 'Insights')}
			${link('/about/', 'About')}
			${link('/contact/', 'Contact')}
		</nav>
	</header>`
}

function footer(assetPrefix) {
  return `<footer class="site-footer">
		<p class="site-footer__meta">
			<a class="site-footer__link" href="https://fedc.github.io/"><span id="footer-year">2026</span> &copy; Federico Commisso</a>
			<span class="site-footer__sep" aria-hidden="true">·</span>
			<a class="site-footer__gem" href="/playground/">Playground</a>
		</p>
	</footer>
	<script type="module" src="${assetPrefix}app/sitePage.js"></script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-KZHL6J943T"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){ dataLayer.push(arguments); }
		gtag('js', new Date());
		gtag('config', 'G-KZHL6J943T');
	</script>`
}

function head({ title, description, canonical, jsonLd, type = 'website', assetPrefix }) {
  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>${escapeHtml(title)}</title>
	<meta name="description" content="${escapeHtml(description)}" />
	<link rel="canonical" href="${canonical}" />
	<meta property="og:type" content="${type}" />
	<meta property="og:site_name" content="OKCoded" />
	<meta property="og:url" content="${canonical}" />
	<meta property="og:title" content="${escapeHtml(title)}" />
	<meta property="og:description" content="${escapeHtml(description)}" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="${escapeHtml(title)}" />
	<meta name="twitter:description" content="${escapeHtml(description)}" />
	<meta name="theme-color" content="#000000" />
	<link rel="manifest" href="https://okcd.io/site.webmanifest" />
	<link rel="shortcut icon" href="https://okcd.io/favicon.ico">
	<link rel="stylesheet" type="text/css" href="${assetPrefix}styles/base.css" />
	<link rel="stylesheet" type="text/css" href="${assetPrefix}styles/shaders-on-scroll.sass" />
	${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ''}
</head>`
}

function relatedCta(services = []) {
  const items = Array.isArray(services) ? services : []
  if (!items.length) {
    return `<section class="contact-cta" aria-labelledby="insights-cta-title">
			<h2 class="contact-cta__title" id="insights-cta-title">Need this done on your site?</h2>
			<p class="contact-cta__text">OKCoded helps with websites, SEO foundations, analytics, automation, and ongoing care.</p>
			<a class="btn btn--primary" href="/contact/">Discuss your project</a>
		</section>`
  }
  const links = items
    .map((item) => {
      const href = typeof item === 'string' ? item : item.href
      const label = typeof item === 'string' ? item : item.label || item.href
      return `<a class="btn btn--ghost" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`
    })
    .join('\n\t\t\t')
  return `<section class="contact-cta insights-related" aria-labelledby="insights-cta-title">
			<h2 class="contact-cta__title" id="insights-cta-title">Related services</h2>
			<p class="contact-cta__text">If this topic matches what you are trying to improve, these are practical next steps.</p>
			<div class="insights-related__actions">
			${links}
			<a class="btn btn--primary" href="/contact/">Contact OKCoded</a>
			</div>
		</section>`
}

function readArticles() {
  if (!existsSync(contentDir)) return []
  const files = readdirSync(contentDir).filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md')
  const articles = []
  for (const file of files) {
    const raw = readFileSync(join(contentDir, file), 'utf8')
    const { data, content } = matter(raw)
    if (data.draft === true) continue
    const slug = String(data.slug || file.replace(/\.md$/, '')).replace(/^\/+|\/+$/g, '')
    if (!data.title || !data.description || !data.date) {
      fail(`${file} requires title, description, and date`)
    }
    articles.push({
      title: data.title,
      slug,
      description: data.description,
      date: String(data.date),
      updated: String(data.updated || data.date),
      category: data.category || 'Insights',
      author: data.author || 'Federico Commisso',
      featuredImage: data.featuredImage || '',
      relatedServices: data.relatedServices || [],
      body: content.trim(),
    })
  }
  articles.sort((a, b) => (a.date < b.date ? 1 : -1))
  return articles
}

function writeIndex(articles) {
  const list =
    articles.length === 0
      ? `<p class="insights-empty js-reveal">Practical articles on web engineering, mobile, software architecture, analytics, and automation will appear here after editorial review. Nothing is published yet.</p>`
      : `<ul class="insights-list">
${articles
  .map(
    (a) => `\t\t\t<li class="insights-list__item js-reveal">
				<p class="insights-list__meta"><span>${escapeHtml(a.category)}</span> · <time datetime="${escapeHtml(a.date)}">${escapeHtml(a.date)}</time></p>
				<h2 class="insights-list__title"><a href="/insights/${escapeHtml(a.slug)}/">${escapeHtml(a.title)}</a></h2>
				<p class="insights-list__desc">${escapeHtml(a.description)}</p>
			</li>`
  )
  .join('\n')}
		</ul>`

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'OKCoded Insights',
    url: `${SITE}/insights/`,
    description:
      'Practical notes on web engineering, mobile, software architecture, analytics, and automation from OKCoded.',
    isPartOf: { '@type': 'WebSite', name: 'OKCoded', url: `${SITE}/` },
  })

  const assetPrefix = '../'
  const html = `${head({
    title: 'Insights | OKCoded',
    description:
      'Practical notes on web engineering, mobile, software architecture, analytics, and automation from OKCoded.',
    canonical: `${SITE}/insights/`,
    jsonLd,
    assetPrefix,
  })}
<body class="site-page">
	${chrome('/insights/')}
	<main class="site-main">
		<header class="page-hero js-reveal">
			<span class="page-hero__label">Insights</span>
			<h1 class="page-hero__title">Notes on building digital products</h1>
			<p class="page-hero__lede">Short, practical writing on web engineering, mobile, software architecture, measurement, and automation.</p>
		</header>
		${list}
		${relatedCta([{ label: 'Services', href: '/services/' }])}
	</main>
	${footer(assetPrefix)}
</body>
</html>
`
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
}

function writeArticle(article) {
  const canonical = `${SITE}/insights/${article.slug}/`
  const bodyHtml = marked.parse(article.body || '')
  const image = article.featuredImage
    ? `<figure class="insights-article__figure"><img src="${escapeHtml(article.featuredImage)}" alt=""></figure>`
    : ''

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated,
    author: { '@type': 'Person', name: article.author, url: SITE },
    mainEntityOfPage: canonical,
    image: article.featuredImage || undefined,
  })

  const assetPrefix = '../../'
  const html = `${head({
    title: `${article.title} | OKCoded Insights`,
    description: article.description,
    canonical,
    jsonLd,
    type: 'article',
    assetPrefix,
  })}
<body class="site-page">
	${chrome('/insights/')}
	<main class="site-main insights-article">
		<article class="js-reveal">
			<header class="page-hero">
				<span class="page-hero__label">${escapeHtml(article.category)}</span>
				<h1 class="page-hero__title">${escapeHtml(article.title)}</h1>
				<p class="page-hero__lede">${escapeHtml(article.description)}</p>
				<p class="insights-article__meta"><time datetime="${escapeHtml(article.date)}">${escapeHtml(article.date)}</time>
					${article.updated !== article.date ? ` · Updated <time datetime="${escapeHtml(article.updated)}">${escapeHtml(article.updated)}</time>` : ''}
					 · ${escapeHtml(article.author)}</p>
			</header>
			${image}
			<div class="insights-article__body">
				${bodyHtml}
			</div>
		</article>
		${relatedCta(article.relatedServices)}
	</main>
	${footer(assetPrefix)}
</body>
</html>
`
  const dir = join(outDir, article.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

function cleanGeneratedArticles(keepSlugs) {
  if (!existsSync(outDir)) return
  for (const name of readdirSync(outDir)) {
    if (name === 'index.html' || name.startsWith('.')) continue
    if (!keepSlugs.has(name)) {
      rmSync(join(outDir, name), { recursive: true, force: true })
    }
  }
}

const articles = readArticles()
writeIndex(articles)
cleanGeneratedArticles(new Set(articles.map((a) => a.slug)))
for (const article of articles) writeArticle(article)

const manifest = {
  generatedAt: new Date().toISOString(),
  articles: articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    date: a.date,
    updated: a.updated,
    path: `/insights/${a.slug}/`,
  })),
}
writeFileSync(join(outDir, '.manifest.json'), JSON.stringify(manifest, null, 2))

console.log(
  `build-insights: index ready (${articles.length} published article${articles.length === 1 ? '' : 's'})`
)
