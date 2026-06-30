'use client';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';
import { useState } from 'react';

const FEATURES = [
  { label: 'Students / Users',       basic: 'Up to 200',       standard: 'Up to 1,000',    premium: 'Unlimited' },
  { label: 'School ERP Module',      basic: true,              standard: true,              premium: true },
  { label: 'Fee Management',         basic: true,              standard: true,              premium: true },
  { label: 'Attendance Tracking',    basic: true,              standard: true,              premium: true },
  { label: 'Financial Suite',        basic: false,             standard: true,              premium: true },
  { label: 'Inventory Management',   basic: false,             standard: true,              premium: true },
  { label: 'HR & Payroll',           basic: false,             standard: true,              premium: true },
  { label: 'Business Intelligence',  basic: false,             standard: true,              premium: true },
  { label: 'Custom Reports',         basic: false,             standard: true,              premium: true },
  { label: 'Parent Portal',          basic: true,              standard: true,              premium: true },
  { label: 'Mobile App Access',      basic: false,             standard: true,              premium: true },
  { label: 'API Access',             basic: false,             standard: false,             premium: true },
  { label: 'Custom Integrations',    basic: false,             standard: false,             premium: true },
  { label: 'On-site Training',       basic: false,             standard: false,             premium: true },
  { label: 'Dedicated Account Mgr',  basic: false,             standard: false,             premium: true },
  { label: 'SLA Guarantee',          basic: '99% uptime',      standard: '99.5% uptime',   premium: '99.9% uptime' },
  { label: 'Support',                basic: 'Email',           standard: 'Priority Email + Chat', premium: 'Phone + Dedicated' },
  { label: 'Data Backup',            basic: 'Weekly',          standard: 'Daily',           premium: 'Real-time' },
];

const PLANS = [
  {
    tier: 'Basic',
    tag: 'For small schools',
    priceMonthly: 2999,
    priceAnnual: 2399,
    highlight: false,
    color: '#64748B',
    badge: null,
    desc: 'Perfect for single-campus institutions getting started with digital management.',
    feats: ['Up to 200 students', 'Core School ERP', 'Fee Management', 'Basic Attendance', 'Email Support'],
  },
  {
    tier: 'Standard',
    tag: 'Most popular',
    priceMonthly: 5999,
    priceAnnual: 4799,
    highlight: true,
    color: '#D32F2F',
    badge: 'Most Popular',
    desc: 'The complete ERP suite for growing institutions managing multiple departments.',
    feats: ['Up to 1,000 students', 'All Core Modules', 'Financial Suite', 'HR & Payroll', 'Priority Support', 'Advanced Analytics'],
  },
  {
    tier: 'Premium',
    tag: 'For enterprises',
    priceMonthly: 9999,
    priceAnnual: 7999,
    highlight: false,
    color: '#D4AF37',
    badge: null,
    desc: 'Full-scale deployment for large institutions or multi-campus enterprise networks.',
    feats: ['Unlimited users', 'All Modules + Custom Dev', 'API Access', 'Dedicated Manager', 'On-site Training', 'SLA Guarantee'],
  },
];

const FAQS = [
  { q: 'Can I switch plans after signing up?', a: 'Yes. You can upgrade or downgrade your plan at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
  { q: 'Is there a free trial available?', a: 'We offer a 30-day free demo with full access to Standard plan features for your institution. No credit card required.' },
  { q: 'What does "unlimited users" mean in Premium?', a: 'Premium allows you to add any number of admin, staff, teacher, and student accounts without additional per-seat charges.' },
  { q: 'Do you offer discounts for NGOs or government schools?', a: 'Yes. We offer special pricing for registered non-profits, government-affiliated institutions, and academic research partnerships. Contact us to discuss.' },
  { q: 'What payment methods do you accept?', a: 'We accept bank transfers, eSewa, Khalti, and major credit/debit cards. Annual plans can also be paid via cheque.' },
  { q: 'What happens to our data if we cancel?', a: 'Your data remains accessible for 60 days after cancellation for export. After that period it is permanently deleted from our servers per our data retention policy.' },
];

function Check({ on, text }: { on: boolean | string; text?: string }) {
  if (typeof on === 'string') {
    return <span className="text-[#0D47A1] text-[.82rem] font-semibold">{on}</span>;
  }
  if (on) {
    return (
      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-gray-200 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-hidden bg-white">

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-white pt-44 pb-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="text-[#D32F2F] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">Simple, Transparent Pricing</div>

          <h1 className="font-serif text-5xl md:text-6xl text-[#0D47A1] leading-[1.1] mb-8 tracking-tight">
            Start free,<br />
            <span className="relative inline-block">
              scale as you grow
              <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#D32F2F] rounded-full" />
            </span>
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto mb-14 leading-relaxed">
            No hidden fees, no long-term lock-in. Choose the plan that fits your institution and upgrade at any time.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-2 p-2 bg-gray-100 rounded-2xl">
            <button
              onClick={() => setAnnual(false)}
              className={`px-7 py-3 rounded-xl text-sm font-bold transition-all ${!annual ? 'bg-white text-[#0D47A1] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-3 px-7 py-3 rounded-xl text-sm font-bold transition-all ${annual ? 'bg-white text-[#0D47A1] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Annual
              <span className="px-2 py-0.5 bg-green-100 rounded-full text-[9px] font-black text-green-700 uppercase tracking-widest">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          PRICING CARDS
      ═══════════════════════════════════════════════ */}
      <section className="pt-4 pb-24 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan) => {
              const price = annual ? plan.priceAnnual : plan.priceMonthly;
              return (
                <div
                  key={plan.tier}
                  className={`relative rounded-[2.5rem] p-10 flex flex-col transition-all duration-500 ${
                    plan.highlight
                      ? 'bg-[#0D47A1] shadow-2xl shadow-[#0D47A1]/20 scale-105 z-10'
                      : 'bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-[#D32F2F] rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg whitespace-nowrap shadow-[#D32F2F]/30">
                      {plan.badge}
                    </div>
                  )}

                  {/* Tag */}
                  <div className={`text-[.62rem] font-black uppercase tracking-[.35em] mb-5 ${plan.highlight ? 'text-white/40' : 'text-[#64748B]'}`}>
                    {plan.tag}
                  </div>

                  {/* Tier name */}
                  <div className={`font-serif text-3xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-[#0D47A1]'}`}>
                    {plan.tier}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className={`text-sm font-bold ${plan.highlight ? 'text-white/40' : 'text-[#64748B]'}`}>Rs.</span>
                    <span className={`text-5xl font-serif font-bold tracking-tighter transition-all duration-500 ${plan.highlight ? 'text-white' : 'text-[#0D47A1]'}`}>
                      {price.toLocaleString()}
                    </span>
                    <span className={`text-sm font-medium ${plan.highlight ? 'text-white/35' : 'text-[#94A3B8]'}`}>/mo</span>
                  </div>
                  {annual && (
                    <div className={`text-[.72rem] font-medium mb-2 ${plan.highlight ? 'text-green-400' : 'text-green-600'}`}>
                      Billed Rs. {(price * 12).toLocaleString()}/yr — you save Rs. {((plan.priceMonthly - price) * 12).toLocaleString()}
                    </div>
                  )}

                  {/* Desc */}
                  <p className={`text-[.82rem] leading-relaxed mb-8 ${plan.highlight ? 'text-white/40' : 'text-[#64748B]'}`}>
                    {plan.desc}
                  </p>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={`block text-center py-4 rounded-2xl font-bold text-sm transition-all duration-300 mb-10 ${
                      plan.highlight
                        ? 'bg-[#D32F2F] text-white hover:bg-white hover:text-[#D32F2F] shadow-xl shadow-[#D32F2F]/20'
                        : 'bg-[#0D47A1] text-white hover:bg-[#D32F2F] shadow-lg'
                    }`}
                  >
                    Get Started — Free Demo
                  </Link>

                  {/* Features */}
                  <div className={`w-full h-px mb-8 ${plan.highlight ? 'bg-white/8' : 'bg-gray-100'}`} />
                  <ul className="space-y-3 flex-1">
                    {plan.feats.map((f) => (
                      <li key={f} className={`flex items-center gap-3 text-[.82rem] font-medium ${plan.highlight ? 'text-white/70' : 'text-[#374151]'}`}>
                        <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-[#D32F2F]' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Enterprise note */}
          <div className="mt-12 text-center">
            <p className="text-[#64748B] text-sm">
              Need a custom quote for 5,000+ students or multi-campus networks?{' '}
              <Link href="/contact" className="text-[#D32F2F] font-bold hover:underline">Talk to our enterprise team →</Link>
            </p>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          FEATURE COMPARISON TABLE
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-kicker justify-center mb-8">
              <span className="section-kicker-line" />Full Comparison
              <span className="section-kicker-line" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0D47A1]">
              Everything in one <span className="italic text-[#D32F2F]">clear view</span>
            </h2>
          </div>

          <div className="rounded-[2.5rem] border border-gray-100 bg-white overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] bg-[#0D47A1]">
              <div className="p-6 text-[.65rem] font-black uppercase tracking-widest text-white/30">Feature</div>
              {PLANS.map((p) => (
                <div key={p.tier} className={`p-6 text-center border-l border-white/5 ${p.highlight ? 'bg-[#D32F2F]/15' : ''}`}>
                  <div className="font-serif text-base font-bold text-white">{p.tier}</div>
                  <div className="text-[.62rem] font-bold text-white/30 mt-0.5">{p.tag}</div>
                </div>
              ))}
            </div>

            {/* Rows */}
            {FEATURES.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-[1fr_1fr_1fr_1fr] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} border-t border-gray-50`}>
                <div className="p-4 pl-6 text-[.82rem] text-[#374151] font-medium flex items-center">{row.label}</div>
                <div className="p-4 text-center flex items-center justify-center border-l border-gray-50">
                  <Check on={row.basic} />
                </div>
                <div className="p-4 text-center flex items-center justify-center border-l border-gray-50 bg-[#D32F2F]/2">
                  <Check on={row.standard} />
                </div>
                <div className="p-4 text-center flex items-center justify-center border-l border-gray-50">
                  <Check on={row.premium} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          TRUST BADGES
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-[#0D47A1] mb-14">
            Trusted by institutions across Nepal
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🔒', title: 'Data Security', desc: 'AES-256 encrypted at rest and in transit' },
              { icon: '⚡', title: '99.9% Uptime', desc: 'Enterprise SLA with monitoring 24/7' },
              { icon: '🌏', title: 'Nepal Hosted', desc: 'Servers in-country for low latency' },
              { icon: '🎓', title: 'Training Included', desc: 'Staff onboarding and certification' },
            ].map((b) => (
              <div key={b.title} className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-[#F9FAFB] border border-gray-100 hover:border-[#D32F2F]/20 hover:bg-[#D32F2F]/3 transition-all duration-300 group">
                <div className="text-4xl group-hover:scale-110 transition-transform">{b.icon}</div>
                <div className="font-bold text-[#0D47A1] text-sm">{b.title}</div>
                <div className="text-[#94A3B8] text-[.75rem] text-center leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-kicker justify-center mb-8">
              <span className="section-kicker-line" />FAQ
              <span className="section-kicker-line" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0D47A1]">
              Common <span className="italic text-[#D32F2F]">questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-7 text-left"
                >
                  <span className="font-bold text-[#0D47A1] text-[.92rem] pr-6">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-[#D32F2F] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: openFaq === i ? '200px' : '0px', opacity: openFaq === i ? 1 : 0 }}
                >
                  <div className="px-7 pb-7 text-[.88rem] text-[#64748B] leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={"Ready to transform\nyour institution?"}
        sub="Book a free 30-minute demo — no commitment, no credit card required."
        cta="Book Free Demo"
        ctaHref="/contact"
      />
    </main>
  );
}
