/**
 * INTERNAL planning baselines for a future /estimate/ builder (Phase 2B+).
 * Not rendered on public pages. Not guaranteed quotes.
 *
 * Historical UX references (Git history only, not published): geltenpro.html, nutridentist.html
 */
export const ESTIMATE_PLAN = {
  route: '/estimate/',
  status: 'planned',
  baselines: {
    startingWebsiteBuildUsd: 1500,
    maintenanceBasicMonthlyUsd: 150,
    maintenanceAdvancedMonthlyUsd: 300,
  },
  optionCategories: [
    'Additional pages',
    'Booking functionality',
    'Custom applications',
    'SEO',
    'Analytics',
    'Automation',
    'Monthly maintenance',
  ],
  constraints: [
    'Do not publish historical prospect pricing from archive HTML',
    'Present ranges as planning estimates, not fixed contracts',
    'Collect lead details before treating output as a proposal',
  ],
}
