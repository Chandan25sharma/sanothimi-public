'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Intelligence & Security',
  status: null,
  icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  titleKey: 'svc.4.title',
  descKey: 'svc.4.desc',
  highlights: ['Real-Time KPIs', 'Custom Reports', 'Trend Forecasting'],
  capabilities: [
    { title: 'Real-time KPI Dashboards', desc: 'Monitor the metrics that matter to your institution as they update, not at month-end.' },
    { title: 'Trend Analysis', desc: 'Spot seasonal patterns and performance shifts before they become problems.' },
    { title: 'Custom Reports', desc: 'Build reports tailored to what your leadership and board actually need to see.' },
    { title: 'Market Insights', desc: 'Benchmark performance against sector trends to guide strategic decisions.' },
  ],
  panelKicker: 'Why It Matters',
  panelTitle: 'Turn operational data into decisions.',
  panelDesc: 'Business Intelligence surfaces the numbers buried across your systems — so leadership can act on facts, not assumptions.',
  ctaTitle: 'See Your Data\nin a New Light',
  ctaSub: 'Request a walkthrough of live dashboards built around your KPIs.',
};

export default function BusinessIntelligencePage() {
  return <ServicePageLayout data={DATA} />;
}
