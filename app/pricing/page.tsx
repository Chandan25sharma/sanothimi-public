'use client';

import CTABanner from '@/components/CTABanner';
import Link from 'next/link';
import { useState } from 'react';

const FEATURES = [
  {
    label: 'Students / Users',
    basic: 'Up to 200',
    standard: 'Up to 1,000',
    premium: 'Unlimited',
  },
  {
    label: 'School ERP Module',
    basic: true,
    standard: true,
    premium: true,
  },
  {
    label: 'Fee Management',
    basic: true,
    standard: true,
    premium: true,
  },
  {
    label: 'Attendance Tracking',
    basic: true,
    standard: true,
    premium: true,
  },
  {
    label: 'Financial Suite',
    basic: false,
    standard: true,
    premium: true,
  },
  {
    label: 'Inventory Management',
    basic: false,
    standard: true,
    premium: true,
  },
  {
    label: 'HR & Payroll',
    basic: false,
    standard: true,
    premium: true,
  },
  {
    label: 'Business Intelligence',
    basic: false,
    standard: true,
    premium: true,
  },
  {
    label: 'Custom Reports',
    basic: false,
    standard: true,
    premium: true,
  },
  {
    label: 'Parent Portal',
    basic: true,
    standard: true,
    premium: true,
  },
  {
    label: 'Mobile App Access',
    basic: false,
    standard: true,
    premium: true,
  },
  {
    label: 'API Access',
    basic: false,
    standard: false,
    premium: true,
  },
  {
    label: 'Custom Integrations',
    basic: false,
    standard: false,
    premium: true,
  },
  {
    label: 'On-site Training',
    basic: false,
    standard: false,
    premium: true,
  },
  {
    label: 'Dedicated Account Mgr',
    basic: false,
    standard: false,
    premium: true,
  },
  {
    label: 'SLA Guarantee',
    basic: '99% uptime',
    standard: '99.5% uptime',
    premium: '99.9% uptime',
  },
  {
    label: 'Support',
    basic: 'Email',
    standard: 'Priority Email + Chat',
    premium: 'Phone + Dedicated',
  },
  {
    label: 'Data Backup',
    basic: 'Weekly',
    standard: 'Daily',
    premium: 'Real-time',
  },
];

const PLANS = [
  {
    tier: 'Basic',
    tag: 'For small schools',
    priceMonthly: 2999,
    priceAnnual: 2399,
    highlight: false,
    desc: 'A simple starting point for institutions moving their core operations online.',
    feats: [
      'Up to 200 students',
      'Core School ERP',
      'Fee Management',
      'Basic Attendance',
      'Email Support',
    ],
  },
  {
    tier: 'Standard',
    tag: 'For growing institutions',
    priceMonthly: 5999,
    priceAnnual: 4799,
    highlight: true,
    desc: 'The complete platform for schools managing multiple departments and growing teams.',
    feats: [
      'Up to 1,000 students',
      'All Core Modules',
      'Financial Suite',
      'HR & Payroll',
      'Priority Support',
      'Advanced Analytics',
    ],
  },
  {
    tier: 'Premium',
    tag: 'For enterprise networks',
    priceMonthly: 9999,
    priceAnnual: 7999,
    highlight: false,
    desc: 'Full-scale infrastructure for large institutions and multi-campus networks.',
    feats: [
      'Unlimited users',
      'All Modules + Custom Dev',
      'API Access',
      'Dedicated Manager',
      'On-site Training',
      'SLA Guarantee',
    ],
  },
];

const FAQS = [
  {
    q: 'Can I switch plans after signing up?',
    a: 'Yes. You can upgrade or downgrade your plan at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.',
  },
  {
    q: 'Is there a free trial available?',
    a: 'We offer a 30-day free demo with full access to Standard plan features for your institution. No credit card required.',
  },
  {
    q: 'What does "unlimited users" mean in Premium?',
    a: 'Premium allows you to add any number of admin, staff, teacher, and student accounts without additional per-seat charges.',
  },
  {
    q: 'Do you offer discounts for NGOs or government schools?',
    a: 'Yes. We offer special pricing for registered non-profits, government-affiliated institutions, and academic research partnerships. Contact us to discuss.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept bank transfers, eSewa, Khalti, and major credit/debit cards. Annual plans can also be paid via cheque.',
  },
  {
    q: 'What happens to our data if we cancel?',
    a: 'Your data remains accessible for 60 days after cancellation for export. After that period it is permanently deleted from our servers per our data retention policy.',
  },
];

function Check({
  value,
}: {
  value: boolean | string;
}) {
  if (typeof value === 'string') {
    return (
      <span className="text-[0.75rem] font-semibold text-[#334155]">
        {value}
      </span>
    );
  }

  if (value) {
    return (
      <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-[#EAF7F0]">
        <svg
          className="w-3.5 h-3.5 text-[#12B76A]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-gray-50">
      <svg
        className="w-3 h-3 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </span>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white text-[#0B1F3A] overflow-hidden">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 bg-[#FBFCFE] border-b border-gray-100">

        {/* very subtle background detail */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-green-800/[0.035] blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">

          <div className="inline-flex items-center gap-3 mb-7">
            <span className="w-8 h-px bg-green-800" />

            <span className="text-green-800 text-[0.62rem] font-black uppercase tracking-[0.3em]">
              Simple, transparent pricing
            </span>

            <span className="w-8 h-px bg-green-800" />
          </div>

          <h1 className="font-serif text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-[#0B1F3A]">
            One platform.
            <br />

            <span className="italic text-green-800">
              Every stage of growth.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-7 text-base md:text-lg text-[#64748B] leading-relaxed">
            Start with what you need today and expand as your institution grows.
            No hidden fees, no complicated contracts.
          </p>

          {/* Billing switch */}

          <div className="mt-10 inline-flex items-center rounded-full border border-gray-200 bg-white p-1.5 shadow-sm">

            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-[0.78rem] font-bold transition-all ${
                !annual
                  ? 'bg-[#0B1F3A] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0B1F3A]'
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[0.78rem] font-bold transition-all ${
                annual
                  ? 'bg-[#0B1F3A] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0B1F3A]'
              }`}
            >
              Annual

              <span
                className={`px-2 py-0.5 rounded-full text-[0.52rem] font-black uppercase tracking-wider ${
                  annual
                    ? 'bg-white/15 text-white'
                    : 'bg-[#EAF7F0] text-[#15803D]'
                }`}
              >
                Save 20%
              </span>
            </button>

          </div>

        </div>
      </section>


      {/* =========================================================
          PRICING
      ========================================================= */}

      <section className="relative py-14 md:py-20 bg-[#FBFCFE]">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">

            {PLANS.map((plan) => {

              const price = annual
                ? plan.priceAnnual
                : plan.priceMonthly;

              const savings =
                (plan.priceMonthly - plan.priceAnnual) * 12;

              return (
                <div
                  key={plan.tier}
                  className={`relative flex flex-col rounded-[2rem] transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-[#0B1F3A] text-white shadow-[0_25px_70px_rgba(11,31,58,0.16)] md:-translate-y-3'
                      : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-black/[0.04]'
                  }`}
                >

                  {/* Popular label */}

                  {plan.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="px-4 py-1.5 rounded-full bg-green-800 text-white text-[0.55rem] font-black uppercase tracking-[0.2em] shadow-lg shadow-green-800/20 whitespace-nowrap">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8 md:p-9 lg:p-10 flex flex-col flex-1">

                    {/* Plan identity */}

                    <div className="mb-8">

                      <div
                        className={`text-[0.58rem] font-black uppercase tracking-[0.25em] mb-3 ${
                          plan.highlight
                            ? 'text-white/35'
                            : 'text-[#94A3B8]'
                        }`}
                      >
                        {plan.tag}
                      </div>

                      <h2
                        className={`font-serif text-3xl ${
                          plan.highlight
                            ? 'text-white'
                            : 'text-[#0B1F3A]'
                        }`}
                      >
                        {plan.tier}
                      </h2>

                    </div>


                    {/* Price */}

                    <div className="mb-7">

                      <div className="flex items-end gap-1">

                        <span
                          className={`mb-2 text-sm font-semibold ${
                            plan.highlight
                              ? 'text-white/40'
                              : 'text-[#64748B]'
                          }`}
                        >
                          Rs.
                        </span>

                        <span
                          className={`font-serif text-5xl md:text-[3.6rem] tracking-tight leading-none ${
                            plan.highlight
                              ? 'text-white'
                              : 'text-[#0B1F3A]'
                          }`}
                        >
                          {price.toLocaleString()}
                        </span>

                        <span
                          className={`mb-2 text-xs ${
                            plan.highlight
                              ? 'text-white/35'
                              : 'text-[#94A3B8]'
                          }`}
                        >
                          /month
                        </span>

                      </div>

                      {annual ? (
                        <div
                          className={`mt-3 text-[0.68rem] leading-relaxed ${
                            plan.highlight
                              ? 'text-[#8FD8B1]'
                              : 'text-[#15803D]'
                          }`}
                        >
                          Billed Rs. {(price * 12).toLocaleString()}/year
                          <br />
                          Save Rs. {savings.toLocaleString()} annually
                        </div>
                      ) : (
                        <div
                          className={`mt-3 text-[0.68rem] ${
                            plan.highlight
                              ? 'text-white/35'
                              : 'text-[#94A3B8]'
                          }`}
                        >
                          Billed monthly · Cancel anytime
                        </div>
                      )}

                    </div>


                    {/* Description */}

                    <p
                      className={`text-[0.82rem] leading-relaxed min-h-[70px] ${
                        plan.highlight
                          ? 'text-white/45'
                          : 'text-[#64748B]'
                      }`}
                    >
                      {plan.desc}
                    </p>


                    {/* CTA */}

                    <Link
                      href="/contact"
                      className={`mt-7 w-full py-3.5 rounded-xl text-center text-[0.78rem] font-bold transition-all ${
                        plan.highlight
                          ? 'bg-green-800 text-white hover:bg-white hover:text-green-800'
                          : 'bg-[#0B1F3A] text-white hover:bg-green-800'
                      }`}
                    >
                      Start with a Free Demo
                    </Link>


                    {/* Divider */}

                    <div
                      className={`my-8 h-px ${
                        plan.highlight
                          ? 'bg-white/10'
                          : 'bg-gray-100'
                      }`}
                    />


                    {/* Features */}

                    <div
                      className={`text-[0.58rem] font-black uppercase tracking-[0.2em] mb-5 ${
                        plan.highlight
                          ? 'text-white/30'
                          : 'text-[#94A3B8]'
                      }`}
                    >
                      Includes
                    </div>

                    <ul className="space-y-3.5">

                      {plan.feats.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-center gap-3 text-[0.8rem] ${
                            plan.highlight
                              ? 'text-white/70'
                              : 'text-[#475569]'
                          }`}
                        >

                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                              plan.highlight
                                ? 'bg-green-800/20'
                                : 'bg-[#EAF7F0]'
                            }`}
                          >
                            <svg
                              className={`w-3 h-3 ${
                                plan.highlight
                                  ? 'text-[#6EA0FF]'
                                  : 'text-[#12B76A]'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>

                          {feature}

                        </li>
                      ))}

                    </ul>

                  </div>

                </div>
              );
            })}

          </div>


          {/* Enterprise */}

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-2 text-center">

            <span className="text-[0.78rem] text-[#64748B]">
              Managing 5,000+ students or multiple campuses?
            </span>

            <Link
              href="/contact"
              className="text-[0.78rem] font-bold text-green-800 hover:underline underline-offset-4"
            >
              Talk to our enterprise team →
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          COMPARISON
      ========================================================= */}

      <section className="py-24 md:py-32 bg-white border-t border-gray-100">

        <div className="max-w-6xl mx-auto px-6">

          <div className="max-w-2xl mb-14">

            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-green-800" />

              <span className="text-green-800 text-[0.6rem] font-black uppercase tracking-[0.28em]">
                Compare plans
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0B1F3A] leading-tight">
              Everything you need,
              <br />
              <span className="italic text-green-800">
                clearly defined.
              </span>
            </h2>

            <p className="mt-5 text-[#64748B] text-sm md:text-base leading-relaxed max-w-xl">
              Compare every capability across our plans before choosing
              the right fit for your institution.
            </p>

          </div>


          {/* Table */}

          <div className="rounded-[1.75rem] border border-gray-200 overflow-hidden">

            <div className="overflow-x-auto">

              <div className="min-w-[760px]">

                {/* Header */}

                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-[#F8FAFC] border-b border-gray-200">

                  <div className="px-6 py-5">
                    <span className="text-[0.58rem] font-black uppercase tracking-[0.2em] text-[#94A3B8]">
                      Feature
                    </span>
                  </div>

                  {PLANS.map((plan) => (
                    <div
                      key={plan.tier}
                      className={`px-5 py-5 text-center border-l border-gray-200 ${
                        plan.highlight
                          ? 'bg-green-800/[0.045]'
                          : ''
                      }`}
                    >
                      <div className="font-serif text-lg text-[#0B1F3A]">
                        {plan.tier}
                      </div>

                      {plan.highlight && (
                        <div className="mt-1 text-[0.52rem] font-black uppercase tracking-wider text-green-800">
                          Recommended
                        </div>
                      )}
                    </div>
                  ))}

                </div>


                {/* Rows */}

                {FEATURES.map((feature, index) => (
                  <div
                    key={feature.label}
                    className={`grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-gray-100 last:border-b-0 ${
                      index % 2 === 0
                        ? 'bg-white'
                        : 'bg-[#FCFDFE]'
                    }`}
                  >

                    <div className="px-6 py-4 text-[0.78rem] font-medium text-[#334155]">
                      {feature.label}
                    </div>

                    <div className="px-5 py-4 flex items-center justify-center border-l border-gray-100">
                      <Check value={feature.basic} />
                    </div>

                    <div className="px-5 py-4 flex items-center justify-center border-l border-gray-100 bg-green-800/[0.018]">
                      <Check value={feature.standard} />
                    </div>

                    <div className="px-5 py-4 flex items-center justify-center border-l border-gray-100">
                      <Check value={feature.premium} />
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          TRUST
      ========================================================= */}

      <section className="py-24 bg-[#F8FAFC] border-y border-gray-100">

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-14">

            <div className="text-green-800 text-[0.58rem] font-black uppercase tracking-[0.28em] mb-5">
              Built for confidence
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-[#0B1F3A]">
              More than software.
              <br />
              <span className="italic text-green-800">
                A dependable foundation.
              </span>
            </h2>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-[1.5rem] overflow-hidden border border-gray-200">

            {[
              {
                number: '99.9%',
                title: 'Uptime',
                desc: 'Reliable infrastructure built for everyday operations.',
              },
              {
                number: '24/7',
                title: 'Monitoring',
                desc: 'Your platform is continuously monitored for availability.',
              },
              {
                number: 'AES-256',
                title: 'Encryption',
                desc: 'Sensitive information protected at rest and in transit.',
              },
              {
                number: '30 Days',
                title: 'Free Demo',
                desc: 'Explore the platform before making a commitment.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-7 md:p-8"
              >

                <div className="font-serif text-2xl md:text-3xl text-[#0B1F3A] mb-2">
                  {item.number}
                </div>

                <div className="text-[0.72rem] font-black uppercase tracking-[0.15em] text-green-800 mb-3">
                  {item.title}
                </div>

                <p className="text-[0.76rem] leading-relaxed text-[#64748B]">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          FAQ
      ========================================================= */}

      <section className="py-24 md:py-32 bg-white">

        <div className="max-w-3xl mx-auto px-6">

          <div className="text-center mb-14">

            <div className="inline-flex items-center gap-3 mb-5">

              <span className="w-7 h-px bg-green-800" />

              <span className="text-green-800 text-[0.58rem] font-black uppercase tracking-[0.28em]">
                FAQ
              </span>

              <span className="w-7 h-px bg-green-800" />

            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-[#0B1F3A]">
              Questions,
              <span className="italic text-green-800">
                {' '}answered.
              </span>
            </h2>

          </div>


          <div className="border-t border-gray-200">

            {FAQS.map((faq, index) => {

              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.q}
                  className="border-b border-gray-200"
                >

                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="w-full py-6 flex items-center justify-between gap-6 text-left"
                  >

                    <span className="text-[0.9rem] md:text-base font-semibold text-[#0B1F3A]">
                      {faq.q}
                    </span>

                    <span
                      className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 transition-all ${
                        isOpen
                          ? 'bg-[#0B1F3A] border-[#0B1F3A] text-white'
                          : 'text-green-800'
                      }`}
                    >

                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5v14M5 12h14"
                        />
                      </svg>

                    </span>

                  </button>


                  <div
                    className="grid transition-all duration-300"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                    }}
                  >

                    <div className="overflow-hidden">

                      <p className="pb-6 pr-14 text-[0.85rem] leading-relaxed text-[#64748B]">
                        {faq.a}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <CTABanner
        title={'Ready to transform\nyour institution?'}
        sub="Book a free 30-minute demo — no commitment, no credit card required."
        cta="Book Free Demo"
        ctaHref="/contact"
      />

    </main>
  );
}