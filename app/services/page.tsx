'use client';
import CTABanner from '@/components/CTABanner';
import { useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.09 });
    ref.current?.querySelectorAll('.rs').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const SERVICES = [
  {
    num: '01', title: 'School Management (ERP)',
    desc: "Our flagship SchoolSathi platform digitizes entire educational institutions, from admissions and attendance to automated billing and exam grading. We ensure your school operates with 100% digital efficiency.",
    bullets: ['Automated Fee Collection', 'Exam & Result Management', 'Parent-Teacher Communication', 'Digital Attendance Sync'],
  },
  {
    num: '02', title: 'Financial Management Suite',
    desc: 'Secure, cloud-based accounting solutions designed specifically for businesses in Nepal. Handle VAT compliance, automated ledgers, and real-time financial reporting from any device.',
    bullets: ['Localized VAT Reporting', 'Cloud Ledger Sync', 'Multi-User Access Control', 'Automated Financial Statements'],
  },
  {
    num: '03', title: 'Inventory & Supply Chain',
    desc: 'Real-time tracking of stock levels across multiple locations. Integrated sales and purchase management with automated low-stock alerts and advanced logistical analytics.',
    bullets: ['Multi-Warehouse Sync', 'Automated Reordering', 'Sales & Purchase Tracking', 'Barcode System Integration'],
  },
  {
    num: '04', title: 'Business Intelligence',
    desc: 'Bespoke dashboards and advanced analytics tools to help business owners monitor performance, identify growth trends, and make data-driven decisions with confidence.',
    bullets: ['Real-time KPI Dashboards', 'Operational Trend Analysis', 'Custom Report Generation', 'Market Insight Integration'],
  },
  {
    num: '05', title: 'Payroll & HR Management',
    desc: 'Simplify employee management with automated payroll, attendance tracking, and performance reviews. Ensure timely salary disbursements and compliance with local labor norms.',
    bullets: ['Automated Salary Processing', 'Leave & Attendance Mgmt', 'Employee Performance Tracking', 'Digital Document Vault'],
  },
  {
    num: '06', title: 'Custom Software Development',
    desc: 'Specific business challenges require specific solutions. We build tailored software from the ground up to fit your organization\'s unique workflows and scalability needs.',
    bullets: ['Custom API Integrations', 'Bespoke Web Applications', 'Legacy System Migration', 'Dedicated Support Team'],
  },
];

const PROCESS = [
  { step: '01', title: 'Discovery & Demo', desc: 'We start with a detailed consultation and a live demo of our solutions tailored to your organization.' },
  { step: '02', title: 'Custom Onboarding', desc: 'Our team handle the entire setup, data migration, and staff training to ensure a smooth transition.' },
  { step: '03', title: 'Continuous Growth', desc: 'Once live, we provide 24/7 technical support and regular updates to help your institution scale.' },
];

export default function ServicesPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();

  return (
    <main>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-[.72rem] font-bold uppercase tracking-[.2em] text-[#EE2B47] mb-3">Our Technology Suite</p>
          <h1 className="font-serif text-5xl text-white leading-tight">Advanced SaaS<br />Solutions</h1>
        </div>
      </div>

      {/* ── Value prop strip ── */}
      <section className="bg-white border-b border-gray-100 bg-pattern-light">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon:'✔', label:'Digital Transformation', desc:'Guiding institutions through the complex journey of complete digitization.' },
            { icon:'✔', label:'Scalable Architecture', desc:'Our cloud systems grow with your organization, handling any scale of data.' },
            { icon:'✔', label:'Local Reliability', desc:'Bespoke solutions built specifically for the regional operational needs in Nepal.' },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <span className="text-[#EE2B47] text-lg font-bold mt-0.5">{f.icon}</span>
              <div>
                <strong className="block text-sm font-bold text-[#0A0F19] mb-1">{f.label}</strong>
                <p className="text-[#6B7280] text-[.82rem] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Service cards ── */}
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-24 bg-[#F9FAF9]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="rs text-[.72rem] font-bold uppercase tracking-[.2em] text-[#EE2B47] mb-3">Comprehensive Solutions</p>
            <h2 className="rs d1 font-serif text-4xl text-[#0A0F19]">Elevate Your Success with<br />Sanothimi Enterprise</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.num} className={`rs d${(i % 2) + 1} bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 hover:border-[#EE2B47]/25 transition-all duration-300`}>
                <div className="text-[.72rem] font-bold uppercase tracking-[.18em] text-[#EE2B47] mb-3">{s.num}</div>
                <h3 className="font-bold text-[#0A0F19] text-[1.08rem] mb-3">{s.title}</h3>
                <p className="text-[#6B7280] text-[.85rem] leading-relaxed mb-5">{s.desc}</p>
                <ul className="grid grid-cols-2 gap-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-[#6B7280] text-[.78rem]">
                      <span className="text-[#EE2B47] mt-0.5 text-[.7rem]">✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process (dark) ── */}
      <section ref={s2 as React.RefObject<HTMLDivElement>} className="bg-[#0A0F19] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="rs text-[.72rem] font-bold uppercase tracking-[.2em] text-[#EE2B47] mb-3">Simple Process</p>
            <h2 className="rs d1 font-serif text-4xl text-white">Focused, Professional &amp;<br />Results-Driven</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PROCESS.map((p, i) => (
              <div key={p.step} className={`rs d${i+1} bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:border-[#EE2B47]/25 hover:bg-white/10 transition-all`}>
                <div className="w-12 h-12 rounded-xl bg-[#EE2B47]/15 border border-[#EE2B47]/25 flex items-center justify-center text-[#EE2B47] font-bold mx-auto mb-4">{p.step}</div>
                <h3 className="font-bold text-white text-[1rem] mb-3">{p.title}</h3>
                <p className="text-white/40 text-[.85rem] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={'Start Your Digital Journey\nwith Sanothimi'}
        sub="Let's transform your organizational efficiency together."
        cta="Get Started"
      />
    </main>
  );
}
