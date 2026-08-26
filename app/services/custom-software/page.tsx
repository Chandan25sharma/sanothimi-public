'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Custom Engineering',
  status: null,
  icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  titleKey: 'svc.6.title',
  descKey: 'svc.6.desc',
  highlights: ['API Integrations', 'Dedicated Engineers', '24/7 Support'],
  capabilities: [
    { title: 'Custom API Integration', desc: 'Connect Sanothimi products to the other tools your organization already relies on.' },
    { title: 'Web Applications', desc: 'Bespoke internal tools and portals built around your exact workflow, not a generic template.' },
    { title: 'System Migration', desc: 'Move off legacy systems with a managed, low-downtime migration plan.' },
    { title: '24/7 Support', desc: 'A dedicated engineering team on call for the software built specifically for you.' },
  ],
  panelKicker: 'Why It Matters',
  panelTitle: "When off-the-shelf isn't enough.",
  panelDesc: "Custom Software Solutions pairs our engineering team directly with yours to build the exact system your workflow demands.",
  ctaTitle: 'Build Something\nBespoke With Us',
  ctaSub: "Tell us about your workflow — we'll scope what custom engineering looks like.",
};

export default function CustomSoftwarePage() {
  return <ServicePageLayout data={DATA} />;
}
