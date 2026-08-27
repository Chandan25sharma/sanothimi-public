'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Intelligence & Security',
  status: null,
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  titleKey: 'svc.4.title',
  descKey: 'svc.4.desc',
  highlights: ['Real-Time KPIs', 'Custom Reports', 'Trend Forecasting'],
  heroImage: '/services/service-04.png',

  problem: {
    kicker: 'The Challenge',
    title: "Your data already has the answer — it's just scattered.",
    desc: "KPIs live in one system, sales in another, and operations in a third. Business Intelligence pulls them together into dashboards your leadership can actually act on.",
  },

  modules: [
    { number: '01', title: 'Real-Time Dashboards', desc: 'Monitor the metrics that matter to your institution as they update, not at month-end.', image: '/services/modules/bi-01.jpg' },
    { number: '02', title: 'Trend Analysis', desc: 'Spot seasonal patterns and performance shifts before they become problems.', image: '/services/modules/bi-02.jpg' },
    { number: '03', title: 'Custom Reports', desc: 'Build reports tailored to what your leadership and board actually need to see.', image: '/services/modules/bi-03.jpg' },
    { number: '04', title: 'Market Insights', desc: 'Benchmark performance against sector trends to guide strategic decisions.', image: '/services/modules/bi-04.jpg' },
    { number: '05', title: 'Alerts & Targets', desc: 'Set thresholds and get notified when metrics move outside expected ranges.', image: '/services/modules/bi-05.jpg' },
    { number: '06', title: 'Data Connectors', desc: 'Pull data from your existing Sanothimi products into one unified view.', image: '/services/modules/bi-06.jpg' },
  ],

  capabilities: [
    { title: 'Real-time KPI Dashboards', desc: 'Monitor the metrics that matter to your institution as they update, not at month-end.' },
    { title: 'Trend Analysis', desc: 'Spot seasonal patterns and performance shifts before they become problems.' },
    { title: 'Custom Reports', desc: 'Build reports tailored to what your leadership and board actually need to see.' },
    { title: 'Market Insights', desc: 'Benchmark performance against sector trends to guide strategic decisions.' },
  ],

  workflow: [
    { number: '01', title: 'Connect', desc: 'Link your operational and financial data sources.' },
    { number: '02', title: 'Visualize', desc: 'Build dashboards around the KPIs that matter to you.' },
    { number: '03', title: 'Monitor', desc: 'Track performance in real time, not at month-end.' },
    { number: '04', title: 'Alert', desc: 'Get notified the moment a metric moves outside range.' },
    { number: '05', title: 'Decide', desc: "Act on live data instead of last quarter's report." },
  ],

  audiences: [
    { title: 'Executives', desc: 'Get one view of performance across every part of the organization.' },
    { title: 'Department Heads', desc: 'Track team and project KPIs without chasing spreadsheets.' },
    { title: 'Analysts', desc: 'Build and customize reports without waiting on engineering.' },
    { title: 'Boards & Investors', desc: 'Review benchmarked, up-to-date performance at a glance.' },
  ],

  reliability: ['Real-Time Sync', 'Role-Based Access', 'Exportable Reports', '99.9% Uptime SLA'],

  panelKicker: 'Why It Matters',
  panelTitle: 'Turn operational data into decisions.',
  panelDesc: 'Business Intelligence surfaces the numbers buried across your systems — so leadership can act on facts, not assumptions.',

  implementation: [
    { title: 'Configure', desc: 'Define the KPIs and dashboards that matter to your team.' },
    { title: 'Connect', desc: 'Link Business Intelligence to your existing Sanothimi products.' },
    { title: 'Train', desc: 'Onboard leadership and analysts on building their own views.' },
    { title: 'Launch', desc: 'Go live with dashboards refreshing in real time.' },
  ],

  ctaTitle: 'See Your Data\nin a New Light',
  ctaSub: 'Request a walkthrough of live dashboards built around your KPIs.',
};

export default function BusinessIntelligencePage() {
  return <ServicePageLayout data={DATA} />;
}
