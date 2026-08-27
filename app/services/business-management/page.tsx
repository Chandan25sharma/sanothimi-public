'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Finance & Operations',
  status: 'soon',
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  titleKey: 'svc.3.title',
  descKey: 'svc.3.desc',
  highlights: ['Multi-Warehouse Ready', 'Barcode Enabled', 'Live Dashboards'],
  heroImage: '/services/service-03.png',

  problem: {
    kicker: 'The Challenge',
    title: "Inventory, sales and staff shouldn't live in three different tools.",
    desc: "When stock counts, sales records and employee data sit in separate spreadsheets, nothing adds up in real time. Business Management Suite connects them into one operational view.",
  },

  modules: [
    { number: '01', title: 'Inventory Control', desc: 'Track stock levels across every location from one dashboard, updated in real time.', image: '/services/modules/bm-01.jpg' },
    { number: '02', title: 'Sales & Orders', desc: 'Record sales, manage orders and monitor performance by product or branch.', image: '/services/modules/bm-02.jpg' },
    { number: '03', title: 'Procurement', desc: 'Set reorder thresholds and manage purchase orders before you run out.', image: '/services/modules/bm-03.jpg' },
    { number: '04', title: 'Barcode & POS', desc: 'Scan items in and out for faster, more accurate stock movements on the floor.', image: '/services/modules/bm-04.jpg' },
    { number: '05', title: 'Employee Management', desc: 'Manage staff records, shifts and attendance alongside daily operations.', image: '/services/modules/bm-05.jpg' },
    { number: '06', title: 'Reporting & Analytics', desc: "See what's moving, what's stalling, and where margin is leaking at a glance.", image: '/services/modules/bm-06.jpg' },
  ],

  capabilities: [
    { title: 'Multi-Warehouse Sync', desc: 'Track stock levels across every location from one dashboard, updated in real time.' },
    { title: 'Automated Reordering', desc: 'Set reorder thresholds and let the system flag or trigger purchase orders automatically.' },
    { title: 'Barcode System', desc: 'Scan items in and out for faster, more accurate stock movements on the floor.' },
    { title: 'Stock Analytics', desc: "See what's moving, what's stalling, and where margin is leaking at a glance." },
  ],

  workflow: [
    { number: '01', title: 'Stock In', desc: 'Receive inventory and update stock levels instantly.' },
    { number: '02', title: 'Sell', desc: 'Process sales and orders across every channel.' },
    { number: '03', title: 'Track', desc: 'Monitor stock, staff and performance in real time.' },
    { number: '04', title: 'Reorder', desc: 'Trigger purchase orders before shelves run empty.' },
    { number: '05', title: 'Analyze', desc: 'Review reports to guide pricing and purchasing decisions.' },
  ],

  audiences: [
    { title: 'Store Managers', desc: 'Get one view of stock, sales and staff across every location.' },
    { title: 'Warehouse Staff', desc: 'Scan, receive and move inventory without paper logs.' },
    { title: 'Sales Teams', desc: 'Process orders and track performance without switching systems.' },
    { title: 'Business Owners', desc: 'See margin, stock health and staff activity in real time.' },
  ],

  reliability: ['Multi-Location Sync', '99.9% Uptime SLA', 'Role-Based Access', 'Daily Backups'],

  panelKicker: 'Why It Matters',
  panelTitle: 'One system for inventory, sales, and your people.',
  panelDesc: 'Business Management Suite connects the operational side of your organization — stock, transactions, and staff — so decisions are made on live data, not guesswork.',

  implementation: [
    { title: 'Configure', desc: 'Set up locations, product catalog and staff roles.' },
    { title: 'Migrate', desc: 'Import existing stock counts, customer and employee records.' },
    { title: 'Train', desc: 'Onboard warehouse, sales and management teams.' },
    { title: 'Launch', desc: 'Go live across every location with support on standby.' },
  ],

  ctaTitle: 'Run Your Operations\non One Platform',
  ctaSub: 'See how inventory, sales, and HR come together in a single suite.',
};

export default function BusinessManagementPage() {
  return <ServicePageLayout data={DATA} />;
}
