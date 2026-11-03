/**
 * Insights / blog architecture (Phase 2A).
 * Content lives in portfolio/content/insights/*.md and is compiled
 * to static HTML by scripts/build-insights.mjs — no CMS or database.
 */
export const INSIGHTS_PLAN = {
  route: '/insights/',
  status: 'architecture',
  purpose: [
    'Practical web development advice',
    'Organic search support',
    'Demonstrate SEO, analytics, and automation expertise',
    'Support lead generation via related-services CTAs',
  ],
  articleFields: [
    'title',
    'slug',
    'description',
    'date',
    'updated',
    'category',
    'author',
    'featuredImage',
    'relatedServices',
    'draft',
  ],
  constraints: [
    'Markdown source only — no WordPress or database',
    'No filler articles; publish only reviewed drafts',
    'Include non-draft articles in sitemap',
    'Each article gets Article JSON-LD + canonical URL',
  ],
}
