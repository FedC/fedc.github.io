/**
 * Insights / blog architecture.
 * Content lives in portfolio/content/insights/*.md and is compiled
 * to static HTML by scripts/build-insights.mjs — no CMS or database.
 */
export const INSIGHTS_PLAN = {
  route: '/insights/',
  status: 'architecture',
  purpose: [
    'Practical engineering and product advice',
    'Organic search support',
    'Demonstrate software, mobile, SEO, analytics, and automation expertise',
    'Support lead generation via related-services CTAs',
  ],
  categories: [
    'Web Engineering',
    'Mobile Development',
    'Software Architecture',
    'Analytics & SEO',
    'Automation & Integrations',
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
