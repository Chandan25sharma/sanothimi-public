'use client';
import ServicePageLayout, { type ServicePageData } from '@/components/ServicePageLayout';

const DATA: ServicePageData = {
  category: 'Custom Engineering',
  status: null,
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  titleKey: 'svc.6.title',
  descKey: 'svc.6.desc',
  highlights: ['API Integrations', 'Dedicated Engineers', '24/7 Support'],
  heroImage: '/services/service-06.png',

  problem: {
    kicker: 'The Challenge',
    title: "Off-the-shelf software wasn't built for your workflow.",
    desc: "When your process doesn't fit a generic template, you either bend your operations to the software or you build something that fits. Custom Software Solutions pairs our engineers directly with your team.",
  },

  modules: [
    { number: '01', title: 'Custom API Integration', desc: 'Connect Sanothimi products to the other tools your organization already relies on.', image: '/services/modules/cust-01.jpg' },
    { number: '02', title: 'Web Applications', desc: 'Bespoke internal tools and portals built around your exact workflow.', image: '/services/modules/cust-02.jpg' },
    { number: '03', title: 'System Migration', desc: 'Move off legacy systems with a managed, low-downtime migration plan.', image: '/services/modules/cust-03.jpg' },
    { number: '04', title: 'Workflow Automation', desc: "Automate the repetitive processes eating up your team's time.", image: '/services/modules/cust-04.jpg' },
    { number: '05', title: 'Dedicated Engineering', desc: 'A team assigned to your build, not a rotating support queue.', image: '/services/modules/cust-05.jpg' },
    { number: '06', title: 'Ongoing Support', desc: '24/7 support for the software built specifically for you.', image: '/services/modules/cust-06.jpg' },
  ],

  capabilities: [
    { title: 'Custom API Integration', desc: 'Connect Sanothimi products to the other tools your organization already relies on.' },
    { title: 'Web Applications', desc: 'Bespoke internal tools and portals built around your exact workflow, not a generic template.' },
    { title: 'System Migration', desc: 'Move off legacy systems with a managed, low-downtime migration plan.' },
    { title: '24/7 Support', desc: 'A dedicated engineering team on call for the software built specifically for you.' },
  ],

  workflow: [
    { number: '01', title: 'Discover', desc: 'Understand your workflow, constraints and goals.' },
    { number: '02', title: 'Design', desc: 'Architect a solution that fits how your team actually works.' },
    { number: '03', title: 'Build', desc: 'Develop and test in iterative, reviewable cycles.' },
    { number: '04', title: 'Deploy', desc: 'Launch with a managed, low-downtime rollout.' },
    { number: '05', title: 'Support', desc: 'Ongoing engineering support as your needs evolve.' },
  ],

  audiences: [
    { title: 'Operations Teams', desc: 'Get internal tools built around your actual process, not a generic template.' },
    { title: 'IT Leaders', desc: 'Integrate new systems with what you already run, without vendor lock-in.' },
    { title: 'Founders & Executives', desc: 'Turn a manual process into a scalable, automated system.' },
    { title: 'Legacy System Owners', desc: 'Migrate off outdated software with a managed, low-risk plan.' },
  ],

  reliability: ['Dedicated Engineers', '24/7 Support', 'Managed Migration', 'Source Code Ownership'],

  panelKicker: 'Why It Matters',
  panelTitle: "When off-the-shelf isn't enough.",
  panelDesc: "Custom Software Solutions pairs our engineering team directly with yours to build the exact system your workflow demands.",

  implementation: [
    { title: 'Discover', desc: 'Scope your workflow, constraints and success criteria.' },
    { title: 'Design', desc: 'Architect the system around your actual process.' },
    { title: 'Build', desc: 'Develop, test and refine in iterative cycles.' },
    { title: 'Launch', desc: 'Deploy with managed rollout and ongoing support.' },
  ],

  ctaTitle: 'Build Something\nBespoke With Us',
  ctaSub: "Tell us about your workflow — we'll scope what custom engineering looks like.",
};

export default function CustomSoftwarePage() {
  return <ServicePageLayout data={DATA} />;
}
