'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Finance & Operations',
  status: 'soon',
  icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  titleKey: 'svc.2.title',
  descKey: 'svc.2.desc',
  highlights: ['VAT Compliant', 'Real-Time Ledgers', 'Multi-User Access'],
  capabilities: [
    { title: 'Localized VAT Reporting', desc: "Generate VAT-compliant reports formatted for Nepal's regulatory requirements automatically." },
    { title: 'Cloud Ledger Sync', desc: 'Every transaction updates in real time across branches, devices, and your accounting team.' },
    { title: 'Multi-User Control', desc: 'Assign role-based permissions so staff only see and edit what their role requires.' },
    { title: 'Financial Statements', desc: 'Produce balance sheets, P&L, and cash flow statements in a few clicks, not days.' },
  ],
  panelKicker: 'Why It Matters',
  panelTitle: 'Close your books in hours, not weeks.',
  panelDesc: "Finance & Accounting gives enterprises and SMEs a single cloud ledger — no more reconciling spreadsheets across departments at month-end.",
  ctaTitle: 'Modernize Your\nFinance Operations',
  ctaSub: 'Talk to us about migrating your books to a compliant, cloud-native ledger.',
};

export default function FinanceAccountingPage() {
  return <ServicePageLayout data={DATA} />;
}
