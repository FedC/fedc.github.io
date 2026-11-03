/**
 * OKCoded project content model (Phase 2A).
 *
 * Schema fields (use null / omit when unknown — never invent metrics):
 * - id            string   stable slug (URL + modal key)
 * - title         string   public title
 * - client        string?  client or product name
 * - summary       string   short card blurb
 * - description   string[] longer paragraphs for modal / case study
 * - services      string[] services provided
 * - technology    string[] stack notes
 * - tags          string[] UI chips (may overlap services)
 * - theme         string   modal art theme key
 * - eyebrow       string   modal eyebrow
 * - siteUrl       string?  live project URL
 * - caseStudyUrl  string?  future /work/<id>/ URL
 * - image         string?  primary still (path under publish assets)
 * - results       string[] optional verified outcomes only
 */

export const PROJECTS = {
  reviver: {
    id: 'reviver',
    title: 'Reviver.com',
    client: 'Reviver',
    summary:
      'Storefront with a tactile, interactive frontend with a motion layer that stays out of the way.',
    description: [
      'Headless, route-level splitting, layout primitives tied to the CMS shape. Platform auth integration with commerce.',
    ],
    services: ['Website development', 'Interaction design'],
    technology: ['Headless commerce', 'CMS-driven layouts'],
    tags: ['Integration', 'Animation'],
    theme: 'reviver',
    eyebrow: 'Headless commerce',
    siteUrl: 'https://reviver.com',
    caseStudyUrl: null,
    image: null,
    results: [],
  },
  futiki: {
    id: 'futiki',
    title: 'Futiki.app',
    client: 'Futiki',
    summary: 'Optimistic client state, server reconciliation, and explicit handling.',
    description: [
      'Optimistic client state, server reconciliation, and explicit handling.',
    ],
    services: ['Custom web application', 'Product UI'],
    technology: ['Maps', 'Client/server state'],
    tags: ['Product UI', 'Maps & state'],
    theme: 'futiki',
    eyebrow: 'Consumer product',
    siteUrl: 'https://futiki.app',
    caseStudyUrl: null,
    image: null,
    results: [],
  },
  squeeze: {
    id: 'squeeze',
    title: 'Squeeze.com',
    client: 'Squeeze',
    summary:
      'Automation and orchestration between systems and dense UIX with layout discipline for multi-step work.',
    description: [
      'Integrations sit between vendors, internal services, and third parties — Narrow HTTP contracts and defensive logic with partial responses.',
      'Recovery, validation, and layout discipline for multi-step work.',
    ],
    services: ['Custom web application', 'Business process automation'],
    technology: ['Embedded UI', 'HTTP integrations'],
    tags: ['Embedded UX', 'Automation'],
    theme: 'squeeze',
    eyebrow: 'Insurance software',
    siteUrl: 'https://squeeze.com',
    caseStudyUrl: null,
    image: null,
    results: [],
  },
  myyellow: {
    id: 'myyellow',
    title: 'MyYellow.ai',
    client: 'MyYellow',
    summary:
      'Multi-step status-heavy UIX keeping server truth, optimistic edits, and document state aligned across sessions.',
    description: [
      'Optimistic edits, idempotent handlers, retry-safe UI, clear copy, and document state aligned across sessions with realtime updates.',
    ],
    services: ['Custom web application', 'Product platforms'],
    technology: ['Realtime updates', 'Document workflows'],
    tags: ['Document', 'Realtime'],
    theme: 'myyellow',
    eyebrow: 'Mortgage platform',
    siteUrl: 'https://myyellow.ai',
    caseStudyUrl: null,
    image: null,
    results: [],
  },
}

/** @returns {typeof PROJECTS[keyof typeof PROJECTS][]} */
export function listProjects() {
  return Object.values(PROJECTS)
}

export function getProject(id) {
  return PROJECTS[id] || null
}
