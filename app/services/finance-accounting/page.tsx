'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Finance & Operations',
  status: 'soon',
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  titleKey: 'svc.2.title',
  descKey: 'svc.2.desc',
  highlights: ['VAT Compliant', 'Real-Time Ledgers', 'Multi-User Access'],
  heroImage: '/services/service-02.png',

  problem: {
    kicker: 'The Challenge',
    title: "Books shouldn't close a week late.",
    desc: "Reconciling ledgers across spreadsheets, paper receipts and disconnected systems slows every close. Finance & Accounting keeps every transaction, invoice and report in one compliant, real-time system.",
  },

  modules: [
    { number: '01', title: 'General Ledger', desc: 'Record and track every transaction with full audit history and multi-branch consolidation.', image: '/services/modules/finance-01.jpg' },
    { number: '02', title: 'Accounts Payable', desc: 'Manage vendor bills, approvals and payment schedules without chasing paperwork.', image: '/services/modules/finance-02.jpg' },
    { number: '03', title: 'Accounts Receivable', desc: 'Track invoices, customer balances and collections in one connected view.', image: '/services/modules/finance-03.jpg' },
    { number: '04', title: 'Bank Reconciliation', desc: 'Match transactions automatically and close your books with confidence.', image: '/services/modules/finance-04.jpg' },
    { number: '05', title: 'VAT & Compliance', desc: "Generate VAT-compliant reports formatted for Nepal's regulatory requirements.", image: '/services/modules/finance-05.jpg' },
    { number: '06', title: 'Financial Reports', desc: 'Produce balance sheets, P&L and cash flow statements in a few clicks.', image: '/services/modules/finance-06.jpg' },
  ],

  capabilities: [
    { title: 'Localized VAT Reporting', desc: "Generate VAT-compliant reports formatted for Nepal's regulatory requirements automatically." },
    { title: 'Cloud Ledger Sync', desc: 'Every transaction updates in real time across branches, devices, and your accounting team.' },
    { title: 'Multi-User Control', desc: 'Assign role-based permissions so staff only see and edit what their role requires.' },
    { title: 'Financial Statements', desc: 'Produce balance sheets, P&L, and cash flow statements in a few clicks, not days.' },
  ],

  workflow: [
    { number: '01', title: 'Record', desc: 'Log invoices, bills and transactions as they happen.' },
    { number: '02', title: 'Approve', desc: 'Route payments and journal entries through approval workflows.' },
    { number: '03', title: 'Reconcile', desc: 'Match bank statements against your ledger automatically.' },
    { number: '04', title: 'Report', desc: 'Generate compliant financial statements on demand.' },
    { number: '05', title: 'Close', desc: 'Lock the period and carry balances forward with confidence.' },
  ],

  audiences: [
    { title: 'Finance Teams', desc: 'Run day-to-day bookkeeping, invoicing and reconciliation from one system.' },
    { title: 'Business Owners', desc: 'See real-time cash position and financial health without waiting on reports.' },
    { title: 'Auditors', desc: 'Access a clean, timestamped trail for every transaction and approval.' },
    { title: 'Department Heads', desc: 'Track budgets and spending against their own cost centers.' },
  ],

  reliability: ['VAT Compliant', 'Bank-Grade Encryption', 'Full Audit Trail', 'Role-Based Access'],

  panelKicker: 'Why It Matters',
  panelTitle: 'Close your books in hours, not weeks.',
  panelDesc: "Finance & Accounting gives enterprises and SMEs a single cloud ledger — no more reconciling spreadsheets across departments at month-end.",

  implementation: [
    { title: 'Configure', desc: 'Set up your chart of accounts, tax rules and approval structure.' },
    { title: 'Migrate', desc: 'Import existing ledgers, vendors and customer records safely.' },
    { title: 'Train', desc: 'Onboard your finance team on invoicing, approvals and reporting.' },
    { title: 'Launch', desc: 'Go live with your first compliant close cycle.' },
  ],

  ctaTitle: 'Modernize Your\nFinance Operations',
  ctaSub: 'Talk to us about migrating your books to a compliant, cloud-native ledger.',
};

export default function FinanceAccountingPage() {
  return <ServicePageLayout data={DATA} />;
}
