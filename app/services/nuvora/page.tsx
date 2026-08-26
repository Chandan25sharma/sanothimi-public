'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'School ERP',
  status: 'live',
  icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  titleKey: 'svc.1.title',
  descKey: 'svc.1.desc',
  highlights: ['1 Month Free Trial', '5+ Schools Onboarded', 'Mobile App Included'],
  capabilities: [
    { title: 'Automated Fee Collection', desc: 'Generate invoices, track dues, and reconcile payments without manual spreadsheets.' },
    { title: 'Exam & Result Management', desc: 'Digitize grading, publish report cards, and track academic progress term over term.' },
    { title: 'Parent Portal', desc: 'Give guardians real-time visibility into attendance, fees, and results from any device.' },
    { title: 'Digital Attendance', desc: 'Replace paper registers with biometric or app-based check-ins synced instantly.' },
  ],
  panelKicker: 'Why It Matters',
  panelTitle: "Built for schools that can't afford downtime.",
  panelDesc: 'NUVORA Core replaces disconnected registers and spreadsheets with one system your administrators, teachers, and parents can trust every single day.',
  ctaTitle: 'Bring NUVORA\nto Your School',
  ctaSub: 'Join the schools already running admissions, fees, and attendance on one platform.',
};

export default function NuvoraPage() {
  return <ServicePageLayout data={DATA} />;
}
