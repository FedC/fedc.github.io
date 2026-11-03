/**
 * OKCoded service architecture (Phase 2B).
 * Five primary capabilities — page copy should stay aligned with this plan.
 * Dedicated /services/<slug>/ routes can be added later using these slugs.
 */
export const SERVICES_PLAN = {
  tagline: 'Web, Mobile & Digital Solutions',
  positioning:
    'We design, build, and improve digital products — from high-performance websites to custom applications, integrations, and automation.',
  capabilities: [
    {
      id: 'web-development',
      title: 'Web Development',
      benefit: 'A web presence that loads clean, reads clearly, and is easy to evolve.',
      summary:
        'Marketing sites, product interfaces, and custom web apps built for performance, clarity, and long-term maintenance.',
      examples: [
        'Marketing websites',
        'Custom web applications',
        'Dashboards and internal portals',
        'E-commerce solutions',
        'Responsive interfaces',
        'Website redesigns and modernization',
      ],
      value:
        'Ship a web presence that loads cleanly, is easy to evolve, and supports real business needs.',
    },
    {
      id: 'mobile-applications',
      title: 'Mobile Applications',
      benefit: 'Meet people on the devices they already live in.',
      summary:
        'Cross-platform mobile product work with native iOS/Android, progressive web apps, and API-connected experiences.',
      examples: [
        'Native iOS and Android development',
        'Progressive Web Apps (PWAs)',
        'Mobile-first product experiences',
        'API-connected mobile applications (REST, GraphQL, etc.)',
      ],
      value:
        'Extend a product beyond the browser when the workflow needs native reach — presented as a real capability, not a padded client portfolio.',
      note: 'capability',
    },
    {
      id: 'backend-integrations',
      title: 'Backend & Integrations',
      benefit: 'Make the interface real — with systems that hold up in production.',
      summary:
        'APIs, data models, auth, and third-party connections that make frontends useful in production.',
      examples: [
        'REST APIs',
        'Backend services',
        'Database design',
        'Authentication and authorization',
        'Third-party integrations',
        'Payment and scheduling integrations',
        'Custom business logic',
      ],
      value:
        'End-to-end delivery: the interface and the systems behind it, owned together so features actually ship.',
    },
    {
      id: 'growth-analytics',
      title: 'Growth & Analytics',
      benefit: 'Get found, measure what matters, and trust the numbers.',
      summary:
        'Engineering-led SEO foundations, measurement, and performance work that supports discovery and conversion.',
      examples: [
        'Technical SEO',
        'Local search optimization',
        'Conversion tracking',
        'GA4 and analytics implementations',
        'Custom analytics dashboards',
        'Performance optimization',
        'Marketing technology integrations',
      ],
      value:
        'Growth support as a technical layer — search readiness, trustworthy tracking, and faster pages.',
    },
    {
      id: 'automation',
      title: 'Automation',
      benefit: 'Replace repetitive busywork with durable workflows.',
      summary:
        'Practical workflow automation, internal tools, and system-to-system connections that reduce manual work.',
      examples: [
        'Business workflow automation',
        'AI-powered integrations',
        'Internal tools',
        'Data processing',
        'Document processing',
        'System-to-system integrations',
        'Operational efficiency solutions',
      ],
      value:
        'Solve operational bottlenecks with durable tools and integrations — useful automation, not AI theater.',
    },
  ],
}
