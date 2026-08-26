'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Intelligence & Security',
  status: null,
  icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 3.2v5.6c0 5.1-3.4 9.4-8 11-4.6-1.6-8-5.9-8-11V5.2L12 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  ),
  titleKey: 'svc.5.title',
  descKey: 'svc.5.desc',
  highlights: ['99.9% Uptime SLA', 'Daily Backups', 'Role-Based Access'],
  capabilities: [
    { title: 'Secure Cloud Hosting', desc: 'Enterprise-grade infrastructure with monitored uptime and regional redundancy.' },
    { title: 'Automated Backups', desc: 'Scheduled, encrypted backups so your data is recoverable if anything goes wrong.' },
    { title: 'Role-Based Access Control', desc: 'Define exactly what each user can see and do, down to the record level.' },
    { title: 'Data Encryption', desc: 'Data is encrypted in transit and at rest, meeting institutional compliance standards.' },
  ],
  panelKicker: 'Why It Matters',
  panelTitle: "Security that doesn't slow you down.",
  panelDesc: 'Enterprise Security is built into every Sanothimi product from day one — not bolted on after the fact.',
  ctaTitle: 'Protect Your\nInstitutional Data',
  ctaSub: 'Ask our team about hosting, backup, and access-control options for your organization.',
};

export default function EnterpriseSecurityPage() {
  return <ServicePageLayout data={DATA} />;
}
