/**
 * OKCoded public project content model (Phase 2A).
 *
 * Only projects with publish.public === true may appear on:
 * homepage teasers, /work/ cards, case studies, JSON-LD, or sitemaps.
 *
 * Curated public set (approved):
 * - reviver
 *
 * Future candidate (do not publish without explicit approval):
 * - martypaysthemost.com
 *
 * Explicitly excluded from all public surfaces (keep historical modal art
 * CSS / assets in repo; do not re-add to PROJECTS without approval):
 * - squeeze
 * - myyellow
 * - futiki
 *
 * Schema:
 * - id, title, client, summary, description[], services[], technology[],
 *   tags[], theme, eyebrow, siteUrl, caseStudyUrl, image, results[],
 *   publish: { public: boolean, featured?: boolean }
 */

export const PROJECTS = {
  reviver: {
    id: 'reviver',
    title: 'Reviver.com',
    client: 'Reviver',
    summary:
      'Storefront with a tactile, interactive frontend and a motion layer that stays out of the way.',
    description: [
      'Headless, route-level splitting, layout primitives tied to the CMS shape. Platform auth integration with commerce.',
    ],
    services: ['Website development', 'Interaction design'],
    technology: ['Headless commerce', 'CMS-driven layouts'],
    tags: ['Integration', 'Animation'],
    theme: 'reviver',
    eyebrow: 'Featured work',
    siteUrl: 'https://reviver.com',
    caseStudyUrl: null,
    image: null,
    results: [],
    publish: {
      public: true,
      featured: true,
    },
  },
}

/** Public projects only — safe for UI, SEO, and sitemaps. */
export function listPublicProjects() {
  return Object.values(PROJECTS).filter(function (p) {
    return p.publish && p.publish.public
  })
}

export function listFeaturedProjects() {
  return listPublicProjects().filter(function (p) {
    return p.publish.featured
  })
}

export function getProject(id) {
  const p = PROJECTS[id]
  if (!p || !p.publish || !p.publish.public) return null
  return p
}
