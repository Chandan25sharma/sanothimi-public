'use client';

import { Himalaya } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import { sendContactForm } from '@/lib/sendContactForm';
import { useState } from 'react';

const CHANNELS = [
  {
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    label: 'Email Support',
    val: 'support@sanothimi.com',
    href: 'mailto:support@sanothimi.com',
    sub: 'Response within 4 business hours',
  },
  {
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    label: 'Phone Support',
    val: '+977 9704714934',
    href: 'tel:+9779704714934',
    sub: 'Sun–Fri, 9 AM – 6 PM NPT',
  },
  {
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    label: 'Live Chat',
    val: 'Available in-app',
    href: '/contact',
    sub: 'For logged-in customers',
  },
];

const FAQS = [
  {
    q: 'How fast will I get a response to a support ticket?',
    a: 'Standard tickets are answered within 4 business hours. Critical or production-down issues are triaged immediately by our on-call engineer.',
  },
  {
    q: 'Do you offer onboarding and training?',
    a: 'Yes — every new client gets a guided onboarding session and staff training included with their plan, at no extra cost.',
  },
  {
    q: 'What happens if I find a bug?',
    a: 'Report it through this page or email support directly. We track and prioritize bugs by severity, with critical issues patched within 24 hours.',
  },
  {
    q: 'Is support included in my subscription?',
    a: 'Yes, all plans include email and phone support. Priority and dedicated support are available on Premium and custom enterprise plans.',
  },
];

const PRIORITIES = [
  'Low — General question',
  'Medium — Feature not working as expected',
  'High — Affecting daily operations',
  'Critical — System down',
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  priority: string;
  desc: string;
}

export default function SupportPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    priority: PRIORITIES[0],
    desc: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const set = (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm({ ...form, [key]: e.target.value });
      setErrors({ ...errors, [key]: false });
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err: Record<string, boolean> = {};

    if (!form.name.trim()) err.name = true;

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      err.email = true;
    }

    if (!form.desc.trim()) err.desc = true;

    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    setStatus('sending');

    try {
      await sendContactForm({
        from_name: form.name,
        from_email: form.email,
        subject: `Support Ticket [${form.priority.split(' — ')[0]}] — ${
          form.subject || 'No subject'
        }`,
        message: `Priority: ${form.priority}
Subject: ${form.subject || '—'}

Description:
${form.desc}`,
        source: 'support',
      });

      setStatus('sent');

      setForm({
        name: '',
        email: '',
        subject: '',
        priority: PRIORITIES[0],
        desc: '',
      });
    } catch {
      setStatus('idle');
      alert('Failed to submit ticket. Please try again.');
    }
  };

  return (
    <main className="bg-white">

      {/* =====================================================
          01 — HERO
      ===================================================== */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden bg-[#F8FAFC]">

        {/* Background system */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Large technical ring */}
          <div className="absolute -right-40 -top-40 w-[620px] h-[620px] rounded-full border border-[#0B1F3A]/[0.06]" />

          <div className="absolute -right-20 -top-20 w-[460px] h-[460px] rounded-full border border-[#155EEF]/[0.08]" />

          <div className="absolute right-20 top-24 w-3 h-3 rounded-full bg-[#D4AF37]" />

          {/* Soft green glow */}
          <div className="absolute -left-32 bottom-0 w-[420px] h-[420px] rounded-full bg-[#12B76A]/[0.035] blur-[100px]" />
              <Himalaya className="absolute bottom-0 left-0 w-full text-[#0B1F3A] opacity-[0.14]" />

          {/* Technical grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(#0B1F3A 1px, transparent 1px), linear-gradient(90deg, #0B1F3A 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Decorative S */}
          <div className="absolute right-10 bottom-[-100px] text-[25rem] leading-none font-serif font-bold text-[#0B1F3A]/[0.025] select-none">
            S
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-28">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3 mb-7">
              <span className="w-10 h-px bg-[#D4AF37]" />

              <span className="text-black text-[.65rem] font-black uppercase tracking-[.35em]">
                Support Center
              </span>
            </div>

            <h1 className="font-serif text-[3rem] sm:text-5xl md:text-7xl text-[#0B1F3A] leading-[1.02] tracking-tight">
              Technology should
              <br />
              <span className="italic text-green-800">
                never leave you stuck.
              </span>
            </h1>

            <p className="mt-8 text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed">
              Whether you have a question, found an issue, or need help
              getting the most from your system, our team is ready to help.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#ticket"
                style={{ '--pixel-color': '#0B1F3A', '--pixel-text-hover': '#fff' } as React.CSSProperties}
                  className="btn-pixel-solid inline-flex items-center gap-2 bg-[#12B76A] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors"
                >
                Submit a ticket

                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>

              <a
                href="#faq"
                className="text-[#0B1F3A] text-sm font-bold border-b border-[#0B1F3A]/20 pb-1 hover:text-[#155EEF] hover:border-[#155EEF] transition-colors"
              >
                Browse FAQs
              </a>
            </div>

          </div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-[-1px] left-0 right-0 h-16 bg-white [clip-path:ellipse(75%_100%_at_50%_100%)]" />
      </section>


      {/* =====================================================
          02 — SUPPORT CHANNELS
      ===================================================== */}
      <section className="py-14 md:py-18 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">

            <div>
              <div className="section-kicker mb-6">
                <span className="section-kicker-line" />
                Get in touch
              </div>

              <h2 className="font-serif text-4xl md:text-4xl text-green-800 leading-tight">
                Choose the way
                <br />
                <span className="italic text-black">
                  that works for you.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-gray-500 leading-relaxed">
              Talk to our team through the channel that best fits your
              situation. For urgent issues, call us directly.
            </p>

          </div>


          {/* Editorial channels */}
          <div className="divide-y divide-gray-100 border-y border-gray-100">

            {CHANNELS.map((c, i) => (

              <a
                key={c.label}
                href={c.href}
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-6 md:py-8 hover:px-4 transition-all duration-500"
              >

                {/* Number */}
                <div className="font-serif text-sm text-gray-300 w-8">
                  0{i + 1}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 group-hover:border-[#0B1F3A] transition-all duration-500">

                  <svg
                    className="w-9 h-9 text-[#0B1F3A] group-hover:text-gray-700 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={c.icon}
                    />
                  </svg>

                </div>

                {/* Main */}
                <div className="flex-1">

                  <div className="text-[.62rem] font-black uppercase tracking-[.25em] text-green-800 mb-2">
                    {c.label}
                  </div>

                  <div className="font-serif text-xl md:text-2xl font-bold text-[#0B1F3A] group-hover:text-green-600 transition-colors">
                    {c.val}
                  </div>

                </div>

                {/* Description */}
                <div className="text-sm text-gray-400 md:w-64">
                  {c.sub}
                </div>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all">

                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-[#0B1F3A] group-hover:translate-x-0.5 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>

                </div>

              </a>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          03 — TICKET + FAQ
      ===================================================== */}
      <section
        id="ticket"
        className="py-18 md:py-16 bg-[#F8FAFC] relative overflow-hidden"
      >

        {/* Background decoration */}
        <div className="absolute right-[-200px] top-[-150px] w-[600px] h-[600px] rounded-full border border-[#0B1F3A]/[0.04]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-20 lg:gap-28">


            {/* =================================================
                TICKET FORM
            ================================================= */}
            <div>

              <div className="section-kicker mb-6">
                <span className="section-kicker-line" />
                Submit a Ticket
              </div>

              <h2 className="font-serif text-2xl md:text-4xl text-[#0B1F3A] leading-[1.1] mb-2 underline decoration-[#D4AF37]/30 decoration-2 underline-offset-4">
                Tell us what happened.
                
              </h2>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg mb-10">
                Give us a few details about the issue. The more context you
                provide, the faster our team can diagnose and resolve it.
              </p>


              <form
                onSubmit={submit}
                className="space-y-5"
                noValidate
              >

                {status === 'sent' ? (

                  <div className="py-16 text-center border-y border-green-100">

                    <div className="w-16 h-16 text-white flex items-center justify-center mx-auto mb-6">

                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>

                    </div>

                    <h3 className="font-serif text-2xl text-[#0B1F3A] mb-3">
                      Ticket submitted.
                    </h3>

                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                      Our support team has received your request and will
                      respond according to the selected priority.
                    </p>

                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-7 text-[#155EEF] text-sm font-bold hover:underline"
                    >
                      Submit another ticket
                    </button>

                  </div>

                ) : (

                  <>
                    {/* Name + email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <div>
                        <label className="block text-[.68rem] font-black uppercase tracking-[.18em] text-[#0B1F3A] mb-2">
                          Full Name
                        </label>

                        <input
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Your name"
                          className={`w-full bg-white border ${
                            errors.name
                              ? 'border-red-400'
                              : 'border-gray-200'
                          } rounded-xl px-4 py-3.5 text-[#0B1F3A] text-sm outline-none  focus:ring-4 focus:ring-[#155EEF]/5 transition-all`}
                        />

                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500">
                            Required field
                          </p>
                        )}
                      </div>


                      <div>
                        <label className="block text-[.68rem] font-black uppercase tracking-[.18em] text-[#0B1F3A] mb-2">
                          Email
                        </label>

                        <input
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          placeholder="you@company.com"
                          className={`w-full bg-white border ${
                            errors.email
                              ? 'border-red-400'
                              : 'border-gray-200'
                          } rounded-xl px-4 py-3.5 text-[#0B1F3A] text-sm outline-none focus:ring-4 focus:ring-[#155EEF]/5 transition-all`}
                        />

                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-500">
                            Valid email required
                          </p>
                        )}
                      </div>

                    </div>


                    {/* Subject */}
                    <div>

                      <label className="block text-[.68rem] font-black uppercase tracking-[.18em] text-[#0B1F3A] mb-2">
                        Subject
                      </label>

                      <input
                        type="text"
                        value={form.subject}
                        onChange={set('subject')}
                        placeholder="What do you need help with?"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#0B1F3A] text-sm outline-none focus:ring-4 focus:ring-[#155EEF]/5 transition-all"
                      />

                    </div>


                    {/* Priority */}
                    <div>

                      <label className="block text-[.68rem] font-black uppercase tracking-[.18em] text-[#0B1F3A] mb-2">
                        Priority
                      </label>

                      <div className="relative">

                        <select
                          value={form.priority}
                          onChange={set('priority')}
                          className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3.5 pr-12 text-[#0B1F3A] text-sm outline-none focus:ring-4 focus:ring-[#155EEF]/5 transition-all"
                        >
                          {PRIORITIES.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>

                        <svg
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>

                      </div>

                    </div>


                    {/* Description */}
                    <div>

                      <label className="block text-[.68rem] font-black uppercase tracking-[.18em] text-[#0B1F3A] mb-2">
                        Description
                      </label>

                      <textarea
                        rows={6}
                        value={form.desc}
                        onChange={set('desc')}
                        placeholder="Describe the issue, what you expected to happen, and what happened instead…"
                        className={`w-full bg-white border ${
                          errors.desc
                            ? 'border-red-400'
                            : 'border-gray-200'
                        } rounded-xl px-4 py-3.5 text-[#0B1F3A] text-sm outline-none  focus:ring-4 focus:ring-[#155EEF]/5 transition-all resize-none`}
                      />

                      {errors.desc && (
                        <p className="mt-1.5 text-xs text-red-500">
                          Please describe the issue
                        </p>
                      )}

                    </div>


                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      
                style={{ '--pixel-color': '#0B1F3A', '--pixel-text-hover': '#fff' } as React.CSSProperties}
                  className="btn-pixel-solid inline-flex items-center gap-2 bg-[#12B76A] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors"
                >
                      {status === 'sending'
                        ? 'Submitting…'
                        : 'Submit Support Ticket'}

                      {status !== 'sending' && (
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      Critical production issues are triaged immediately.
                    </p>
                  </>
                )}

              </form>

            </div>


            {/* =================================================
                FAQ
            ================================================= */}
            <div id="faq" className="scroll-mt-28">

              <div className="section-kicker mb-6">
                <span className="section-kicker-line" />
                Frequently Asked
              </div>

              <h2 className="font-serif text-4xl md:text-4xl text-[#0B1F3A] leading-[1.1] mb-12 underline decoration-[#D4AF37]/30 decoration-2 underline-offset-4">
                Common questions.
              </h2>


              <div className="border-t border-gray-200">

                {FAQS.map((f, i) => {

                  const isOpen = openFaq === i;

                  return (

                    <div
                      key={f.q}
                      className="border-b border-gray-200"
                    >

                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(isOpen ? null : i)
                        }
                        className="w-full py-7 flex items-center justify-between gap-6 text-left group"
                        aria-expanded={isOpen}
                      >

                        <span
                          className={`font-serif text-lg md:text-xl leading-snug transition-colors ${
                            isOpen
                              ? 'text-[#155EEF]'
                              : 'text-[#0B1F3A]'
                          }`}
                        >
                          {f.q}
                        </span>

                        <span
                          className={`w-9 h-9 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? 'bg-[#155EEF] border-[#155EEF] text-white rotate-45'
                              : 'border-gray-200 text-gray-400 group-hover:border-[#155EEF] group-hover:text-[#155EEF]'
                          }`}
                        >
                          +

                        </span>

                      </button>


                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen
                            ? 'grid-rows-[1fr] opacity-100 pb-7'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >

                        <div className="overflow-hidden">

                          <p className="text-gray-500 text-sm leading-relaxed max-w-lg pr-10">
                            {f.a}
                          </p>

                        </div>

                      </div>

                    </div>

                  );
                })}

              </div>


              {/* Small support note */}
              <div className="mt-10 flex items-start gap-4">

                <div className="w-9 h-9 rounded-full bg-[#12B76A]/10 flex items-center justify-center flex-shrink-0">

                  <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse" />

                </div>

                <div>
                  <div className="text-sm font-bold text-[#0B1F3A]">
                    Still need help?
                  </div>

                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Submit a ticket and our team will get back to you as
                    quickly as possible.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          04 — FINAL CTA
      ===================================================== */}
      <CTABanner
        title={'Need something\nmore specific?'}
        sub="Our team can help with custom requirements, enterprise plans, and solutions tailored to your organization."
        cta="Contact Sales"
        ctaHref="/contact"
      />

    </main>
  );
}