'use client';

import { Himalaya, Lattice, Mandala, NepalSun } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import emailjs from '@emailjs/browser';
import { useState } from 'react';

const INSTITUTION_TYPES = [
  'School / College',
  'Business / Enterprise',
  'NGO / Non-profit',
  'Government Body',
  'Other',
];

const PERKS = [
  {
    number: '01',
    title: '30-minute walkthrough',
    desc: 'A focused tour of the modules most relevant to your organization.',
  },
  {
    number: '02',
    title: 'Built around your workflow',
    desc: 'See how the platform can fit the way your team already works.',
  },
  {
    number: '03',
    title: 'No commitment',
    desc: 'Ask questions, explore the platform and decide when you are ready.',
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  org: string;
  type: string;
  notes: string;
}

export default function DemoPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    org: '',
    type: INSTITUTION_TYPES[0],
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm({ ...form, [k]: e.target.value });
      setErrors({ ...errors, [k]: false });
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err: Record<string, boolean> = {};

    if (!form.name.trim()) err.name = true;

    if (
      !form.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      err.email = true;
    }

    if (!form.org.trim()) err.org = true;

    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: form.name,
          from_email: form.email,
          subject: `New Demo Request — ${form.org}`,
          message: `Phone: ${form.phone}
Organization: ${form.org}
Type: ${form.type}

Notes:
${form.notes || '—'}`,
          current_date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );

      setStatus('sent');

      setForm({
        name: '',
        email: '',
        phone: '',
        org: '',
        type: INSTITUTION_TYPES[0],
        notes: '',
      });
    } catch {
      setStatus('idle');
      alert('Failed to send request. Please try again.');
    }
  };

  return (
    <main className="bg-white">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative pt-28 md:pt-18 pb-20 bg-[#F9FAFB] overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <Lattice
            className="absolute inset-0 w-full h-full text-[#0B1F3A] opacity-[0.025]"
            size={64}
          />
              <Himalaya className="absolute bottom-0 left-0 w-full text-[#0B1F3A] opacity-[0.14]" />

          <Mandala
            className="
              absolute
              -top-32
              -right-32
              w-[500px]
              h-[500px]
              text-[#0B1F3A]
              opacity-[0.07]
            "
          />

          <NepalSun
            className="
              absolute
              -bottom-28
              -left-28
              w-[300px]
              h-[300px]
              text-[#D4AF37]
              opacity-[0.08]
            "
          />

          <div
            className="
              absolute
              top-0
              right-0
              w-[500px]
              h-[500px]
              rounded-full
              bg-green-600/[0.035]
              blur-[120px]
            "
          />
        </div>


        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="max-w-4xl">

            {/* Kicker */}

            <div className="
              flex
              items-center
              gap-3
              mb-7
            ">

              <span className="
                w-10
                h-px
                bg-[#D4AF37]
              " />

              <span className="
                text-[#0B1F3A]
                text-[.62rem]
                font-black
                uppercase
                tracking-[.35em]
              ">
                Book a Demo
              </span>

            </div>


            {/* Heading */}

            <h1 className="
              font-serif
              text-[2.7rem]
              sm:text-5xl
              md:text-6xl
              lg:text-[5rem]
              text-[#0B1F3A]
              leading-[1.03]
              tracking-tight
              max-w-4xl
            ">

              See what your
              <br />

              <span className="
                italic
                text-[#14532D]
              ">
                future workflow
              </span>

              <br />

              could look like.

            </h1>


            {/* Description */}

            <p className="
              text-[#64748B]
              text-base
              md:text-lg
              leading-[1.8]
              max-w-2xl
              mt-8
            ">
              Get a personalized walkthrough of Sanothimi&apos;s
              digital solutions — focused on your organization,
              your challenges and the way your team actually works.
            </p>


            {/* Mini process */}

            <div className="
              flex
              flex-wrap
              items-center
              gap-x-8
              gap-y-4
              mt-10
              pt-8
              border-t
              border-[#0B1F3A]/10
              max-w-3xl
            ">

              {[
                ['01', 'Request'],
                ['02', 'Walkthrough'],
                ['03', 'Next Step'],
              ].map(([num, label], i) => (

                <div
                  key={num}
                  className="flex items-center gap-3"
                >

                  <span className="
                    w-7
                    h-7
                    rounded-full
                    border
                    border-[#D4AF37]/50
                    flex
                    items-center
                    justify-center
                    text-[.55rem]
                    font-black
                    text-[#14532D]
                  ">
                    {num}
                  </span>

                  <span className="
                    text-[.62rem]
                    font-black
                    uppercase
                    tracking-[.2em]
                    text-[#0B1F3A]/55
                  ">
                    {label}
                  </span>

                  {i < 2 && (
                    <span className="
                      hidden
                      sm:block
                      w-8
                      h-px
                      bg-[#0B1F3A]/10
                    " />
                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          DEMO AREA
      ========================================================= */}

      <section className="relative py-20 md:py-28 bg-white overflow-hidden">

        <div className="max-w-7xl mx-auto px-6">

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-[.85fr_1.15fr]
            gap-16
            xl:gap-24
            items-start
          ">


            {/* ===================================================
                LEFT SIDE
            =================================================== */}

            <div className="lg:sticky lg:top-28">

              <div className="
                text-[#D4AF37]
                text-[.58rem]
                font-black
                uppercase
                tracking-[.35em]
                mb-5
              ">
                What to Expect
              </div>


              <h2 className="
                font-serif
                text-3xl
                md:text-4xl
                lg:text-[2.8rem]
                text-[#0B1F3A]
                leading-[1.1]
                mb-7
              ">
                A conversation
                <br />
                <span className="italic text-[#14532D]">
                  before a presentation.
                </span>
              </h2>


              <p className="
                text-[#64748B]
                text-[.92rem]
                leading-[1.8]
                max-w-md
                mb-12
              ">
                Tell us what you are trying to improve. We will
                focus the walkthrough around the areas that matter
                most to your organization.
              </p>


              {/* Perks */}

              <div className="space-y-9">

                {PERKS.map((perk) => (

                  <div
                    key={perk.number}
                    className="
                      flex
                      gap-5
                      group
                    "
                  >

                    <div className="
                      flex-shrink-0
                      pt-1
                    ">

                      <div className="
                        w-10
                        h-10
                        rounded-full
                        border
                        border-[#D4AF37]/30
                        flex
                        items-center
                        justify-center
                        text-[.58rem]
                        font-black
                        text-[#14532D]
                        group-hover:bg-[#14532D]
                        group-hover:text-white
                        group-hover:border-[#14532D]
                        transition-all
                        duration-500
                      ">
                        {perk.number}
                      </div>

                    </div>


                    <div>

                      <h3 className="
                        text-[#0B1F3A]
                        font-bold
                        text-[.95rem]
                        mb-1.5
                      ">
                        {perk.title}
                      </h3>

                      <p className="
                        text-[#64748B]
                        text-[.82rem]
                        leading-[1.7]
                        max-w-sm
                      ">
                        {perk.desc}
                      </p>

                    </div>

                  </div>

                ))}

              </div>


              {/* Small trust line */}

              <div className="
                mt-14
                pt-7
                border-t
                border-gray-100
                flex
                items-center
                gap-3
              ">

                <span className="
                  w-2
                  h-2
                  rounded-full
                  bg-green-500
                  animate-pulse
                " />

                <span className="
                  text-[.62rem]
                  font-bold
                  uppercase
                  tracking-[.18em]
                  text-[#64748B]
                ">
                  Typically responds within 24 hours
                </span>

              </div>

            </div>


            {/* ===================================================
                FORM
            =================================================== */}

          <div>
  {status === 'sent' ? (
    <div className="text-center py-24 border border-gray-100 rounded-[2rem] bg-[#F8FAFC]">
      <div className="w-16 h-16 bg-[#12B76A] text-white rounded-full flex items-center justify-center mx-auto mb-8">
        <svg
          className="w-8 h-8"
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
      </div>

      <div className="text-[#14532D] text-[.58rem] font-black uppercase tracking-[.3em] mb-4">
        Request Received
      </div>

      <h3 className="font-serif text-2xl md:text-3xl text-[#0B1F3A] mb-3">
        We&apos;ll take it from here.
      </h3>

      <p className="text-[#6B7280] max-w-sm mx-auto leading-relaxed">
        Our team will reach out within 24 hours to arrange your personalized
        walkthrough.
      </p>
    </div>
  ) : (
    <form onSubmit={submit} noValidate className="space-y-7">

      {/* Name + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
        <div>
          <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">
            Full Name*
          </label>

          <input
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder="Your name"
            className={`w-full bg-transparent border-b ${
              errors.name ? 'border-red-400' : 'border-gray-200'
            } py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#155EEF]`}
          />

          {errors.name && (
            <p className="mt-1.5 text-[.7rem] text-red-500 font-medium">
              Please enter your name.
            </p>
          )}
        </div>

        <div>
          <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">
            Phone
          </label>

          <input
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            placeholder="+977 ..."
            className="w-full bg-transparent border-b border-gray-200 py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#155EEF]"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">
          Work Email*
        </label>

        <input
          type="email"
          value={form.email}
          onChange={set('email')}
          placeholder="you@organization.com"
          className={`w-full bg-transparent border-b ${
            errors.email ? 'border-red-400' : 'border-gray-200'
          } py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#155EEF]`}
        />

        {errors.email && (
          <p className="mt-1.5 text-[.7rem] text-red-500 font-medium">
            Please enter a valid email.
          </p>
        )}
      </div>

      {/* Organization */}
      <div>
        <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">
          Organization*
        </label>

        <input
          type="text"
          value={form.org}
          onChange={set('org')}
          placeholder="Institution or company name"
          className={`w-full bg-transparent border-b ${
            errors.org ? 'border-red-400' : 'border-gray-200'
          } py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#155EEF]`}
        />

        {errors.org && (
          <p className="mt-1.5 text-[.7rem] text-red-500 font-medium">
            Please enter your organization.
          </p>
        )}
      </div>

      {/* Organization Type */}
      <div>
        <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">
          Organization Type
        </label>

        <select
          value={form.type}
          onChange={set('type')}
          className="w-full bg-transparent border-b border-gray-200 py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF] appearance-none"
        >
          {INSTITUTION_TYPES.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">
          What should we cover?
        </label>

        <textarea
          rows={5}
          value={form.notes}
          onChange={set('notes')}
          placeholder="Tell us what you would like to see..."
          className="w-full bg-transparent border-b border-gray-200 py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#155EEF] resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        style={
          {
            '--pixel-color': '#0B1F3A',
            '--pixel-text-hover': '#fff',
          } as React.CSSProperties
        }
        className="btn-pixel-solid inline-flex items-center gap-3 bg-[#12B76A] text-white px-9 py-4 rounded-full font-bold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span className="relative z-10">
          {status === 'sending' ? 'Sending…' : 'Request Your Demo'}
        </span>

        {status !== 'sending' && (
          <svg
            className="w-4 h-4 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        )}
      </button>

      {/* Privacy */}
      <p className="text-[#6B7280] text-[.75rem] leading-relaxed max-w-lg">
        Your information stays private and is only used to respond to your
        request.{' '}
        <a
          href="/privacy"
          className="underline hover:text-[#0B1F3A] transition-colors"
        >
          Privacy Policy
        </a>
      </p>
    </form>
  )}
</div>
          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <CTABanner
        title={'Not ready for a demo?\nTalk to our team first.'}
        sub="We are happy to answer questions before you commit to anything."
        cta="Contact Us"
        ctaHref="/contact"
      />

    </main>
  );
}