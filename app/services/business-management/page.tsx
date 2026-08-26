'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Finance & Operations',
  status: 'soon',
  icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  titleKey: 'svc.3.title',
  descKey: 'svc.3.desc',
  highlights: ['Multi-Warehouse Ready', 'Barcode Enabled', 'Live Dashboards'],
  capabilities: [
    { title: 'Multi-Warehouse Sync', desc: 'Track stock levels across every location from one dashboard, updated in real time.' },
    { title: 'Automated Reordering', desc: 'Set reorder thresholds and let the system flag or trigger purchase orders automatically.' },
    { title: 'Barcode System', desc: 'Scan items in and out for faster, more accurate stock movements on the floor.' },
    { title: 'Stock Analytics', desc: "See what's moving, what's stalling, and where margin is leaking at a glance." },
  ],
  panelKicker: 'Why It Matters',
  panelTitle: 'One system for inventory, sales, and your people.',
  panelDesc: 'Business Management Suite connects the operational side of your organization — stock, transactions, and staff — so decisions are made on live data, not guesswork.',
  ctaTitle: 'Run Your Operations\non One Platform',
  ctaSub: 'See how inventory, sales, and HR come together in a single suite.',
};

export default function BusinessManagementPage() {
  return <ServicePageLayout data={DATA} />;
}
