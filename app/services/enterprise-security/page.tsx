'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Intelligence & Security',
  status: null,
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 3.2v5.6c0 5.1-3.4 9.4-8 11-4.6-1.6-8-5.9-8-11V5.2L12 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  ),
  titleKey: 'svc.5.title',
  descKey: 'svc.5.desc',
  highlights: ['99.9% Uptime SLA', 'Daily Backups', 'Role-Based Access'],
  heroImage: '/services/service-05.png',

  problem: {
    kicker: 'The Challenge',
    title: 'One breach is worse than a hundred inefficiencies.',
    desc: "Institutional data — student records, financial ledgers, staff files — deserves more than a shared spreadsheet password. Enterprise Security is built into every layer of your Sanothimi deployment.",
  },

  modules: [
    { number: '01', title: 'Cloud Hosting', desc: 'Enterprise-grade infrastructure with monitored uptime and regional redundancy.', image: '/services/modules/sec-01.jpg' },
    { number: '02', title: 'Automated Backups', desc: 'Scheduled, encrypted backups so your data is recoverable if anything goes wrong.', image: '/services/modules/sec-02.jpg' },
    { number: '03', title: 'Role-Based Access', desc: 'Define exactly what each user can see and do, down to the record level.', image: '/services/modules/sec-03.jpg' },
    { number: '04', title: 'Data Encryption', desc: 'Data is encrypted in transit and at rest, meeting institutional compliance standards.', image: '/services/modules/sec-04.jpg' },
    { number: '05', title: 'Audit Logging', desc: 'Track every login, change and export with a complete, searchable history.', image: '/services/modules/sec-05.jpg' },
    { number: '06', title: 'Incident Response', desc: 'Round-the-clock monitoring with a defined response plan if something goes wrong.', image: '/services/modules/sec-06.jpg' },
  ],

  capabilities: [
    { title: 'Secure Cloud Hosting', desc: 'Enterprise-grade infrastructure with monitored uptime and regional redundancy.' },
    { title: 'Automated Backups', desc: 'Scheduled, encrypted backups so your data is recoverable if anything goes wrong.' },
    { title: 'Role-Based Access Control', desc: 'Define exactly what each user can see and do, down to the record level.' },
    { title: 'Data Encryption', desc: 'Data is encrypted in transit and at rest, meeting institutional compliance standards.' },
  ],

  workflow: [
    { number: '01', title: 'Assess', desc: 'Review your current data, access and compliance requirements.' },
    { number: '02', title: 'Harden', desc: 'Apply encryption, access controls and hosting safeguards.' },
    { number: '03', title: 'Monitor', desc: 'Track activity and anomalies around the clock.' },
    { number: '04', title: 'Backup', desc: 'Run scheduled, encrypted backups automatically.' },
    { number: '05', title: 'Respond', desc: 'Act immediately if an incident is detected.' },
  ],

  audiences: [
    { title: 'IT Administrators', desc: 'Manage access, monitor activity and control infrastructure from one place.' },
    { title: 'Compliance Officers', desc: 'Get a complete, exportable audit trail for every record.' },
    { title: 'Leadership', desc: 'Trust that institutional data is protected without slowing teams down.' },
    { title: 'End Users', desc: 'Work normally, with security running invisibly in the background.' },
  ],

  reliability: ['99.9% Uptime SLA', 'Daily Encrypted Backups', 'Role-Based Access', '24/7 Monitoring'],

  panelKicker: 'Why It Matters',
  panelTitle: "Security that doesn't slow you down.",
  panelDesc: 'Enterprise Security is built into every Sanothimi product from day one — not bolted on after the fact.',

  implementation: [
    { title: 'Assess', desc: 'Review your data, access patterns and compliance needs.' },
    { title: 'Harden', desc: 'Apply encryption, backups and access controls.' },
    { title: 'Train', desc: 'Educate your team on access policy and best practices.' },
    { title: 'Monitor', desc: 'Go live under continuous monitoring and support.' },
  ],

  ctaTitle: 'Protect Your\nInstitutional Data',
  ctaSub: 'Ask our team about hosting, backup, and access-control options for your organization.',
};

export default function EnterpriseSecurityPage() {
  return <ServicePageLayout data={DATA} />;
}
