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
        'Ship a web presence that loads cleanly, is easy to evolve, and supports real business outcomes — not just a launch day screenshot.',
    },
    {
      id: 'mobile-applications',
      title: 'Mobile Applications',
      summary:
        'Cross-platform mobile product work with Flutter, progressive web apps, and API-connected experiences.',
      examples: [
        'Flutter applications',
        'Cross-platform iOS and Android development',
        'Progressive Web Apps (PWAs)',
        'Mobile-first product experiences',
        'API-connected mobile applications',
      ],
      value:
        'Extend a product beyond the browser when the workflow needs native reach — presented as a real capability, not a padded client portfolio.',
      note: 'capability',
    },
    {
      id: 'backend-integrations',
      title: 'Backend & Integrations',
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
        'Growth support as a technical layer — search readiness, trustworthy tracking, and faster pages — not the whole identity of the studio.',
    },
    {
      id: 'automation',
      title: 'Automation',
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
