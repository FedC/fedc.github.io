/**
 * OKCoded public project content model.
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
 * Schema (reusable for future case studies):
 * - id, slug, title, client, summary, role, category, narrative
 * - description[] (short modal / teaser paragraphs)
 * - services[], technology[], tags[]
 * - theme, eyebrow, siteUrl, caseStudyUrl, linkLabel
 * - image { src, srcFallback, width, height, alt }
 * - media[] { id, kind: photo|placeholder, src?, alt, caption, status? }
 * - context, challenges[], architecture, deepDives[], experience[], production[], outcomes[], reflection[]
 * - results[] (verified metrics only — leave empty when unmeasured)
 * - publish: { public: boolean, featured?: boolean }
 */

export const PROJECTS = {
  reviver: {
    id: 'reviver',
    slug: 'reviver',
    title: 'Reviver',
    client: 'Reviver',
    category: 'Full-stack engineering · Headless commerce · Systems integration',
    summary:
      'A production headless storefront connecting premium RPLATE storytelling, Shopify commerce, existing platform identity, and AWS-backed integrations.',
    role: 'Selected professional engineering work on a production commerce platform.',
    narrative:
      'Engineering a headless commerce experience that connects premium product storytelling, Shopify commerce, existing customer identity, and secure cloud infrastructure.',
    description: [
      'Headless commerce storefront with interactive product storytelling, Shopify checkout, platform identity bridging, and AWS-backed integrations.',
    ],
    services: ['Headless commerce', 'Systems integration', 'Frontend architecture'],
    technology: [
      'Next.js 15',
      'React',
      'TypeScript',
      'Shopify Storefront GraphQL',
      'AWS Amplify Gen 2',
      'AppSync',
      'DynamoDB',
      'Shopify Multipass',
      'GSAP',
    ],
    tags: ['Next.js 15', 'Shopify', 'AWS Amplify Gen 2', 'TypeScript'],
    theme: 'reviver',
    eyebrow: 'Selected engineering work',
    siteUrl: 'https://reviver.com',
    caseStudyUrl: '/work/reviver/',
    linkLabel: 'Visit reviver.com',
    image: {
      src: '../assets/work/reviver/hero-poster.jpg',
      srcFallback: '../assets/work/reviver/hero-poster.jpg',
      width: 1280,
      height: 720,
      alt: 'Reviver RPLATE digital license plate displaying Hello World',
    },
    media: [
      {
        id: 'hero-video',
        kind: 'video',
        poster: '../assets/work/reviver/hero-poster.jpg',
        sources: [
          { src: '../assets/work/reviver/hero.webm', type: 'video/webm' },
          { src: '../assets/work/reviver/hero.mp4', type: 'video/mp4' },
        ],
        alt: 'Reviver RPLATE frame-sequence product hero',
        caption: 'Frame-sequence product hero',
      },
      {
        id: 'california-section',
        kind: 'photo',
        src: '../assets/work/reviver/california-section.jpg',
        alt: 'Reviver California digital license plate marketing section',
        caption: 'Product detail storytelling',
      },
      {
        id: 'geo-state',
        kind: 'photo',
        src: '../assets/work/reviver/geo-state.jpg',
        alt: 'Reviver geographic state page for California and Arizona',
        caption: 'Geographic expansion interface',
      },
      {
        id: 'cart',
        kind: 'photo',
        src: '../assets/work/reviver/cart.jpg',
        alt: 'Reviver cart with RPLATE line item',
        caption: 'Cart experience',
        note: 'Cropped to exclude personal email from source screenshot',
      },
      {
        id: 'shop-partner-ctas',
        kind: 'photo',
        src: '../assets/work/reviver/shop-partner-ctas.jpg',
        alt: 'Reviver shop and partner call-to-action cards',
        caption: 'Commerce and partner CTAs',
      },
      {
        id: 'mobile-nav',
        kind: 'photo',
        src: '../assets/work/reviver/mobile-nav.jpg',
        alt: 'Reviver mobile navigation',
        caption: 'Mobile navigation',
        note: 'Cropped to exclude account name from source screenshot',
      },
      {
        id: 'rplate-vehicle',
        kind: 'photo',
        src: '../assets/work/reviver/rplate-hero.jpg',
        alt: 'Reviver RPLATE mounted on a dark vehicle',
        caption: 'Hardware context',
      },
    ],
    context:
      "Reviver's RPLATE is a digital license plate with geographic availability constraints, service plans, and an existing customer platform. The consumer website needed to support premium storytelling, purchasing and service information, geographic eligibility, dealer discovery, existing account authentication, Shopify checkout and orders, CMS-managed marketing content, and SEO continuity.",
    challenges: [
      'Premium product storytelling for a hardware + service offering',
      'Product purchasing and service-plan information',
      'Geographic eligibility and dealer discovery',
      'Existing account authentication alongside Shopify commerce',
      'CMS-managed marketing and legal content',
      'SEO continuity with legacy URLs',
    ],
    centralChallenge:
      'Connecting multiple independent systems into one coherent customer experience.',
    architecture: {
      entry: 'Browser → Next.js App Router + server-side API routes',
      systems: [
        {
          name: 'Shopify Storefront GraphQL',
          role: 'Catalog, carts, and customer commerce',
        },
        {
          name: 'Reviver Platform API',
          role: 'Authentication and platform identity',
        },
        {
          name: 'AWS Amplify Lambda functions',
          role: 'Protected credentials and Multipass operations',
        },
        {
          name: 'AWS AppSync + DynamoDB',
          role: 'Environment-scoped token storage',
        },
      ],
    },
    deepDives: [
      {
        id: 'identity',
        headline: 'Bridging platform identity with Shopify commerce',
        body: [
          "Reviver's existing platform accounts and Shopify customer identities are separate systems. The storefront bridges them so authenticated platform customers can use Shopify commerce features without maintaining a second login mental model.",
          'Platform authentication establishes the existing customer session. Server-side Multipass token generation then connects that identity to Shopify. After token exchange, account and order surfaces can reflect Shopify customer commerce state.',
          'Credential isolation matters as much as the happy path: Multipass secrets and related credentials stay behind Amplify-managed secrets and Lambda functions, keeping sensitive material off the client. Server-side handling reduces exposure — it does not, by itself, make the full authentication architecture secure. Threat modeling, least privilege, and careful token lifecycle still apply.',
        ],
      },
      {
        id: 'content',
        headline: 'Building for markets that evolve',
        body: [
          'Shopify serves as both a commerce platform and a content source — product catalog, supported-state information, legal content, and blog posts feed the storefront.',
          'Dynamic geographic pages, reserved-slug routing, ISR-driven sitemap updates, and legacy URL redirects keep expansion and SEO continuity manageable as markets open.',
          'The product decision: marketing and operations can update supported content without requiring a new frontend deployment. Sitemap freshness follows a revalidation interval rather than instantaneous updates.',
        ],
      },
    ],
    experience: [
      {
        title: 'Discover',
        text: 'Scroll-driven homepage and RPLATE product experience that introduce the hardware and the service story.',
      },
      {
        title: 'Qualify',
        text: 'State availability, service plans, and dealer discovery so customers understand eligibility before checkout.',
      },
      {
        title: 'Convert',
        text: 'Shopify cart and checkout for purchase flows, with a separate leasing path where applicable.',
      },
      {
        title: 'Support',
        text: 'Account access, order history, and support integrations after the sale.',
      },
    ],
    production: [
      'Amplify build and deployment pipeline fixes',
      'Private credential handling',
      'Environment-specific token management',
      'Stock and catalog correctness',
      'SEO redirects and sitemap behavior',
      'Blog resilience and API error handling',
      'Intercom integration',
      'Analytics and consent integrations',
      'Performance-conscious lazy loading',
    ],
    outcomes: [
      'Delivered an integrated marketing and commerce experience.',
      'Connected existing platform authentication with Shopify customer workflows.',
      'Supported content-managed geographic and legal information.',
      'Established environment-scoped token handling.',
      'Maintained legacy URL continuity through redirects.',
      'Addressed production deployment and catalog issues.',
    ],
    reflection: [
      'Keep identity and commerce concerns separated so each system can evolve without collapsing the customer experience.',
      'Treat credential management as an architectural requirement, not an afterthought bolted onto a feature branch.',
      'Design content systems around business workflows — markets open, legal pages change, and ops should not wait on a deploy.',
      'Maintain deployment reliability; a polished storefront is only as trustworthy as the pipeline that ships it.',
      'Balance interactive design with performance so storytelling stays out of the way of conversion.',
      'Plan for post-launch maintenance: catalog correctness, redirects, and third-party integrations outlive the initial release.',
    ],
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

export function getCaseStudyPath(id) {
  const p = getProject(id)
  return p && p.caseStudyUrl ? p.caseStudyUrl : null
}
