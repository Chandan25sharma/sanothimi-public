'use client';

import { Lattice, Mandala, NepalSun } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import { sendContactForm } from '@/lib/sendContactForm';
import Link from 'next/link';
import { useState } from 'react';

const PARTNER_TYPES = [
  'Reseller Partner',
  'Referral Partner',
  'Technology Integration Partner',
  'Implementation Partner',
  'Other',
];

const BENEFITS = [
  {
    no: '01',
    title: 'Revenue Sharing',
    desc: 'Earn competitive commissions for every organization you bring into the Sanothimi ecosystem.',
  },
  {
    no: '02',
    title: 'Dedicated Support',
    desc: 'Get direct access to our onboarding and engineering teams when your clients need help.',
  },
  {
    no: '03',
    title: 'Co-Marketing',
    desc: 'Grow together through joint campaigns, case studies, product showcases and marketing resources.',
  },
  {
    no: '04',
    title: 'Training & Certification',
    desc: 'Equip your team with the product knowledge needed to confidently sell, implement and support.',
  },
];

const STEPS = [
  {
    no: '01',
    title: 'Tell us about you',
    desc: 'Submit a short application and tell us about your business, market and partnership goals.',
  },
  {
    no: '02',
    title: 'We connect',
    desc: 'Our partnerships team reviews your application and schedules a conversation to understand the fit.',
  },
  {
    no: '03',
    title: 'Build together',
    desc: 'Once approved, we provide onboarding, training and the resources needed to start growing.',
  },
];

interface FormState {
  name: string;
  company: string;
  license: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  consent: boolean;
}

export default function PartnerPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    license: '',
    email: '',
    phone: '',
    type: PARTNER_TYPES[0],
    message: '',
    consent: false,
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;

      setForm((prev) => ({
        ...prev,
        [key]: val,
      }));

      setErrors((prev) => ({
        ...prev,
        [key]: false,
      }));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err: Record<string, boolean> = {};

    if (!form.name.trim()) err.name = true;
    if (!form.company.trim()) err.company = true;

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      err.email = true;
    }

    if (!form.consent) err.consent = true;

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    setStatus('sending');

    try {
      await sendContactForm({
        from_name: form.name,
        from_email: form.email,
        subject: `New Partner Application — ${form.company}`,
        message: `Company / Business Name: ${form.company}
License / Registration No: ${form.license || '—'}
Phone: ${form.phone || '—'}
Partnership Type: ${form.type}

Message:
${form.message || '—'}`,
        source: 'partner',
      });

      setStatus('sent');

      setForm({
        name: '',
        company: '',
        license: '',
        email: '',
        phone: '',
        type: PARTNER_TYPES[0],
        message: '',
        consent: false,
      });
    } catch {
      setStatus('idle');
      alert('Failed to submit application. Please try again.');
    }
  };

  const inputClass = (error?: boolean) =>
    `w-full bg-transparent border-b ${
      error ? 'border-red-400' : 'border-[#0B1F3A]/15'
    } px-0 py-4 text-[#0B1F3A] text-[.92rem] font-medium outline-none transition-all placeholder:text-[#64748B]/50 focus:border-[#0B6B3A]`;

  return (
    <main className="bg-white text-[#0B1F3A]">

      {/* =====================================================
          01. HERO
      ===================================================== */}
      <section className="relative min-h-[680px] flex items-center overflow-hidden bg-[#F8FAF7]">

        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <Lattice
            className="absolute inset-0 w-full h-full text-[#0B1F3A] opacity-[0.025]"
            size={52}
          />

          <Mandala
            className="absolute -top-32 -right-32 w-[600px] h-[600px] text-[#0B1F3A] opacity-[0.07]"
          />

          <NepalSun
            className="absolute -bottom-24 -left-24 w-[360px] h-[360px] text-[#D4AF37] opacity-[0.08]"
          />

          <div className="absolute right-[15%] bottom-0 w-[420px] h-[420px] rounded-full border border-[#D4AF37]/10" />

          <div className="absolute left-0 bottom-0 w-[500px] h-[250px] bg-[#0B6B3A]/[0.025] blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

          <div className="max-w-4xl">

            {/* Kicker */}
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-[#D4AF37]" />

              <span className="text-[#0B6B3A] text-[.65rem] font-black uppercase tracking-[.35em]">
                Partner Program
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[3rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[.98] tracking-[-0.035em] text-[#0B1F3A] max-w-4xl">
              Build something
              <br />

              <span className="italic text-[#0B6B3A]">
                bigger together.
              </span>
            </h1>

            <div className="mt-10 max-w-2xl flex flex-col md:flex-row gap-8 items-start">

              <p className="text-[#64748B] text-lg leading-relaxed">
                Join the Sanothimi partner network and help institutions
                across Nepal adopt better technology — while creating a
                sustainable new opportunity for your business.
              </p>

              <a
                href="#apply"
                className="flex-shrink-0 inline-flex items-center gap-3 bg-[#0B6B3A] text-white px-7 py-4 rounded-full text-sm font-bold hover:bg-[#084F2B] transition-all hover:-translate-y-0.5"
              >
                Become a Partner

                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6 6 6-6 6"
                  />
                </svg>
              </a>

            </div>

            {/* Hero bottom information */}
            <div className="mt-20 pt-7 border-t border-[#0B1F3A]/10 flex flex-wrap gap-x-12 gap-y-5">

              {[
                'Flexible partnership models',
                'Nepal-focused technology',
                'Long-term collaboration',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-[.68rem] font-bold uppercase tracking-[.16em] text-[#0B1F3A]/60"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  {item}
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          02. WHY PARTNER
      ===================================================== */}
      <section className="py-28 md:py-36 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-20 lg:gap-28">

            {/* Left */}
            <div className="lg:sticky lg:top-32 self-start">

              <div className="section-kicker mb-7">
                <span className="section-kicker-line" />
                Why Partner With Us
              </div>

              <h2 className="font-serif text-4xl md:text-5xl leading-[1.08]">
                More than a
                <br />

                <span className="italic text-[#0B6B3A]">
                  partnership.
                </span>
              </h2>

              <p className="mt-7 text-[#64748B] leading-relaxed max-w-md">
                We believe the strongest partnerships are built around
                shared value. You bring the relationships and market
                knowledge. We bring the technology and product expertise.
              </p>

              <div className="mt-10 flex items-center gap-3">
                <div className="w-10 h-px bg-[#D4AF37]" />
                <span className="text-[.62rem] font-black uppercase tracking-[.25em] text-[#0B1F3A]/50">
                  Grow together
                </span>
              </div>

            </div>


            {/* Right — editorial list */}
            <div className="border-t border-[#0B1F3A]/10">

              {BENEFITS.map((benefit) => (

                <div
                  key={benefit.no}
                  className="group grid grid-cols-[60px_1fr] md:grid-cols-[90px_1fr] gap-6 md:gap-10 py-9 border-b border-[#0B1F3A]/10 hover:bg-[#F8FAF7] transition-colors px-3 -mx-3"
                >

                  <div className="font-serif text-[#D4AF37] text-lg">
                    {benefit.no}
                  </div>

                  <div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                      <h3 className="font-serif text-2xl md:text-3xl text-[#0B1F3A] group-hover:text-[#0B6B3A] transition-colors">
                        {benefit.title}
                      </h3>

                      <span className="hidden md:block text-[#D4AF37] text-xl transition-transform group-hover:translate-x-2">
                        →
                      </span>

                    </div>

                    <p className="mt-3 text-[#64748B] text-[.9rem] leading-relaxed max-w-xl">
                      {benefit.desc}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          03. HOW IT WORKS
      ===================================================== */}
     <section className="relative py-28 md:py-36 bg-[#F8FAFC] overflow-hidden">
  {/* Subtle background decoration */}
  <div
    className="absolute inset-0 pointer-events-none select-none"
    aria-hidden="true"
  >
    <Lattice
      className="absolute inset-0 w-full h-full text-[#0B1F3A] opacity-[0.018]"
      size={64}
    />

    {/* Large decorative circle */}
    <div className="absolute -top-64 -right-64 w-[700px] h-[700px] rounded-full border border-[#0B1F3A]/[0.15]" />

    <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-green-800/[0.05] blur-[100px]" />

    <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-[#12B76A]/[0.05] blur-[110px]" />
  </div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* Header */}
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-14 mb-14">

      <div>
        <div className="flex items-center gap-4 mb-7">
          <span className="h-px w-10 bg-[#155EEF]" />

          <span className="text-black text-[.65rem] font-black uppercase tracking-[.35em]">
            How It Works
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-3xl lg:text-4xl text-[#0B1F3A] leading-[1.05] tracking-tight">
          From introduction
         
          to{' '}
          <span className="italic text-green-800">
            collaboration.
          </span>
        </h2>
      </div>

      <div className="lg:flex lg:items-end">
        <p className="text-[#64748B] text-base md:text-lg leading-relaxed max-w-md">
          We keep the process simple. Tell us where you fit, explore the
          opportunity together, and build a partnership designed to create
          long-term value.
        </p>
      </div>
    </div>


    {/* Steps */}
    <div className="relative">

      {/* Horizontal connector */}
      <div className="hidden md:block absolute top-[34px] left-[8.33%] right-[8.33%] h-px bg-[#0B1F3A]/10" />

      <div className="grid grid-cols-1 md:grid-cols-3">

        {STEPS.map((step, i) => (
          <div
            key={step.no}
            className="group relative"
          >

            {/* Step marker */}
            <div className="relative z-10 mb-12 flex items-center">

              <div className="w-[68px] h-[68px] rounded-full bg-[#F8FAFC]  flex items-center justify-center transition-all duration-500 ">
                <span className="font-serif text-xl text-[#0B1F3A] group-hover:text-gray-800 transition-colors duration-500">
                  {step.no}
                </span>
              </div>

            </div>


            {/* Content */}
            <div className="md:pr-14 lg:pr-20">

              <h3 className="font-serif text-2xl md:text-3xl text-[#0B1F3A] mb-5 leading-tight group-hover:text-green-600 transition-colors duration-500">
                {step.title}
              </h3>

              <p className="text-[#64748B] text-[.9rem] leading-relaxed max-w-sm">
                {step.desc}
              </p>

            </div>


            {/* Arrow */}
            {i < STEPS.length - 1 && (
              <div className="hidden lg:flex absolute top-[23px] right-10 xl:right-14 w-6 h-6 items-center justify-center text-[#0B1F3A]/20 group-hover:text-[#155EEF] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6 6 6-6 6"
                  />
                </svg>
              </div>
            )}

            {/* Mobile divider */}
            {i < STEPS.length - 1 && (
              <div className="md:hidden mt-12 mb-12 h-px bg-[#0B1F3A]/10" />
            )}

          </div>
        ))}

      </div>
    </div>


    {/* Bottom statement */}
    <div className="mt-24 pt-8 border-t border-[#0B1F3A]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

      <p className="text-[#64748B] text-sm">
        A partnership should create value on both sides.
      </p>

      <div className="flex items-center gap-3 text-[#0B1F3A] text-[.68rem] font-black uppercase tracking-[.22em]">
        <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
        Built for long-term collaboration
      </div>

    </div>

  </div>
</section>


      {/* =====================================================
          04. APPLICATION
      ===================================================== */}
      <section
        id="apply"
        className="py-28 md:py-36 bg-[#F8FAF7] scroll-mt-24"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-[.75fr_1.25fr] gap-20 lg:gap-28">

            {/* Left */}
            <div className="self-start lg:sticky lg:top-28">

              <div className="section-kicker mb-7">
                <span className="section-kicker-line" />
                Become a Partner
              </div>

              <h2 className="font-serif text-4xl md:text-5xl leading-[1.08]">
                Let&apos;s build the
                <br />

                <span className="italic text-[#0B6B3A]">
                  next chapter.
                </span>
              </h2>

              <p className="mt-7 text-[#64748B] leading-relaxed max-w-md">
                Tell us a little about your business and how you would like
                to work with Sanothimi. Our partnerships team will review
                your application and get in touch.
              </p>

              <div className="mt-12 space-y-5">

                {[
                  'Application takes less than 5 minutes',
                  'Flexible partnership models',
                  'Response within 2 business days',
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#0B1F3A]/70"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0B6B3A] text-white">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>

                    {item}
                  </div>

                ))}

              </div>

            </div>


            {/* Form */}
            <div>

              {status === 'sent' ? (

                <div className="py-20 border-t border-b border-[#0B1F3A]/10">

                  <div className="w-16 h-16 rounded-full bg-[#0B6B3A] text-white flex items-center justify-center mb-8">

                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                  </div>

                  <h3 className="font-serif text-4xl text-[#0B1F3A] mb-4">
                    Application received.
                  </h3>

                  <p className="text-[#64748B] max-w-lg leading-relaxed">
                    Thank you for your interest in partnering with
                    Sanothimi. Our partnerships team will review your
                    application and contact you within 2 business days.
                  </p>

                </div>

              ) : (

                <form
                  onSubmit={submit}
                  noValidate
                  className="border-t border-[#0B1F3A]/15"
                >

                  {/* Personal */}
                  <div className="py-10">

                    <div className="text-[.62rem] font-black uppercase tracking-[.3em] text-[#0B6B3A] mb-7">
                      01 — Your Details
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                      <div>
                        <label className="block text-[.68rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/60 mb-1">
                          Full Name *
                        </label>

                        <input
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Your full name"
                          className={inputClass(errors.name)}
                        />

                        {errors.name && (
                          <p className="mt-2 text-xs text-red-500">
                            Full name is required.
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[.68rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/60 mb-1">
                          Phone
                        </label>

                        <input
                          type="tel"
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="+977 ..."
                          className={inputClass()}
                        />
                      </div>

                    </div>

                  </div>


                  {/* Business */}
                  <div className="py-10 border-t border-[#0B1F3A]/10">

                    <div className="text-[.62rem] font-black uppercase tracking-[.3em] text-[#0B6B3A] mb-7">
                      02 — Business Details
                    </div>

                    <div className="space-y-8">

                      <div>
                        <label className="block text-[.68rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/60 mb-1">
                          Company / Business Name *
                        </label>

                        <input
                          type="text"
                          value={form.company}
                          onChange={set('company')}
                          placeholder="Your company or organization"
                          className={inputClass(errors.company)}
                        />

                        {errors.company && (
                          <p className="mt-2 text-xs text-red-500">
                            Company name is required.
                          </p>
                        )}
                      </div>


                      <div className="grid md:grid-cols-2 gap-8">

                        <div>
                          <label className="block text-[.68rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/60 mb-1">
                            Work Email *
                          </label>

                          <input
                            type="email"
                            value={form.email}
                            onChange={set('email')}
                            placeholder="you@company.com"
                            className={inputClass(errors.email)}
                          />

                          {errors.email && (
                            <p className="mt-2 text-xs text-red-500">
                              Please enter a valid email.
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[.68rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/60 mb-1">
                            Registration / License No.
                          </label>

                          <input
                            type="text"
                            value={form.license}
                            onChange={set('license')}
                            placeholder="Optional"
                            className={inputClass()}
                          />
                        </div>

                      </div>

                    </div>

                  </div>


                  {/* Partnership */}
                  <div className="py-10 border-t border-[#0B1F3A]/10">

                    <div className="text-[.62rem] font-black uppercase tracking-[.3em] text-[#0B6B3A] mb-7">
                      03 — Partnership
                    </div>

                    <label className="block text-[.68rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/60 mb-1">
                      How would you like to work with us?
                    </label>

                    <select
                      value={form.type}
                      onChange={set('type')}
                      className={`${inputClass()} appearance-none cursor-pointer`}
                    >
                      {PARTNER_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    <div className="mt-8">

                      <label className="block text-[.68rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/60 mb-1">
                        Tell us about your business
                      </label>

                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="What do you do, who do you serve, and what would you like to achieve together?"
                        className={`${inputClass()} resize-none`}
                      />

                    </div>

                  </div>


                  {/* Consent */}
                  <div className="pt-8">
                    <label className="flex items-start gap-3 text-[.8rem] text-[#64748B] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={set('consent')}
                        className={`mt-0.5 accent-[#0B6B3A] ${errors.consent ? 'outline outline-2 outline-red-400 rounded' : ''}`}
                      />
                      <span>
                        I agree to the{' '}
                        <Link href="/terms" className="underline hover:text-[#0B6B3A] transition-colors">Terms & Conditions</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="underline hover:text-[#0B6B3A] transition-colors">Privacy Policy</Link>
                        {' '}and consent to being contacted about the partnership program.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-2 text-[.7rem] text-red-500 font-medium">Please accept the Privacy Policy to continue.</p>
                    )}
                  </div>


                  {/* Submit */}
                  <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-6">

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center justify-center gap-3 bg-[#0B6B3A] text-white px-9 py-4 rounded-full font-bold text-sm hover:bg-[#084F2B] transition-all hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {status === 'sending'
                        ? 'Submitting…'
                        : 'Submit Partnership Application'}

                      {status !== 'sending' && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                      )}
                    </button>

                  </div>

                </form>

              )}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          05. FINAL CTA
      ===================================================== */}
      <CTABanner
        title={'Have a bigger\naim in mind?'}
        sub="Whether you want to resell, integrate, implement or refer — let's explore what we can build together."
        cta="Talk to Our Team"
        ctaHref="/contact"
      />

    </main>
  );
}