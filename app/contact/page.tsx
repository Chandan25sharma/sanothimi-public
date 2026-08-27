'use client';

import {
  Himalaya,
  Mandala,
  NepalMoon
} from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';

import { useLanguage } from '@/context/LanguageContext';
import { sendContactForm } from '@/lib/sendContactForm';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* =========================================================
   REVEAL
========================================================= */

function useReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;

    if (!root) return;

    const elements = root.querySelectorAll('.rs');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    elements.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return ref;
}

/* =========================================================
   CONTACT INFORMATION
========================================================= */

const INFO = [
  {
    number: '01',
    label: 'Email Correspondence',
    value: 'info@sanothimi.com',
    href: 'mailto:info@sanothimi.com',
    description: 'For general enquiries and partnerships.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    number: '02',
    label: 'Direct Line',
    value: '+977 9704714937',
    href: 'tel:+9779704714937',
    description: 'Speak directly with our team.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    number: '03',
    label: 'Innovation Center',
    value: 'Sanothimi, Bhaktapur, Nepal',
    href: '#location',
    description: 'Our technology and innovation center.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ContactPage() {
  const { t } = useLanguage();

  const contactRef = useReveal();
  const faqRef = useReveal();

  const [form, setForm] = useState({
    fname: '',
    lname: '',
    email: '',
    msg: '',
    consent: false,
  });

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent'
  >('idle');

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* =========================================================
     FORM
  ========================================================= */

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    if (!form.fname.trim()) {
      err.fname = true;
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      err.email = true;
    }

    if (!form.msg.trim()) {
      err.msg = true;
    }

    if (!form.consent) {
      err.consent = true;
    }

    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    setStatus('sending');

    try {
      await sendContactForm({
        from_name: `${form.fname} ${form.lname}`.trim(),
        from_email: form.email,
        subject: `New Message from ${form.fname}`,
        message: form.msg,
        source: 'contact',
      });

      setStatus('sent');

      setForm({
        fname: '',
        lname: '',
        email: '',
        msg: '',
        consent: false,
      });

      setTimeout(() => {
        setStatus('idle');
      }, 6000);
    } catch {
      setStatus('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <main className="bg-white text-[#0B1F3A] overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[620px] flex items-end bg-white overflow-hidden">

        {/* Background architecture */}

        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
        >
        

          <div className="absolute -top-40 -right-40 w-[620px] h-[620px] rounded-full border border-[#0B1F3A]/[0.045]" />

          <div className="absolute -top-20 -right-20 w-[440px] h-[440px] rounded-full border border-green-800/[0.06]" />

          <div className="absolute top-24 right-28 w-56 h-56 rounded-full bg-green-800/[0.025] blur-3xl" />

          <Mandala
            className="absolute -right-32 top-10 w-[460px] h-[460px] text-[#0B1F3A] opacity-[0.035]"
          />

          <NepalMoon
            className="absolute -left-24 bottom-0 w-[340px] h-[340px] text-green-800 opacity-[0.035]"
          />

          <Himalaya
            className="absolute bottom-0 left-0 w-full text-[#0B1F3A] opacity-[0.15]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-32 pb-24">

          <div className="max-w-5xl">

            {/* Kicker */}

            <div className="flex items-center gap-4 mb-8">

              <span className="w-10 h-px bg-green-800" />

              <span className="text-green-800 text-[.65rem] font-black uppercase tracking-[.35em]">
                {t('contact_pg.hero.kicker')}
              </span>

            </div>

            {/* Main title */}

            <h1 className="font-serif text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.94] tracking-[-0.045em] text-[#0B1F3A]">

              {t('contact_pg.hero.title1')}

              <br />

              <span className="relative inline-block italic text-green-800">

                {t('contact_pg.hero.title2')}

                <span className="absolute left-0 right-0 -bottom-3 h-[2px] bg-green-800/30" />

              </span>

            </h1>

            <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-10">

              <p className="max-w-xl text-[#64748B] text-lg md:text-xl leading-relaxed">
                Reach out and tell us what you are building,
                what you are solving, or where you want to go next.
              </p>

            

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT AREA
      ===================================================== */}

      <section
        ref={contactRef as React.RefObject<HTMLDivElement>}
        className="relative bg-[#F8FAFC] border-y border-gray-100"
      >

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-24 items-start">


            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="rs pt-4">

              <div className="section-kicker mb-8">

                <span className="section-kicker-line" />

                {t('contact_pg.info.kicker')}

              </div>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.7rem] leading-[1.02] tracking-tight text-[#0B1F3A]">

                {t('contact_pg.info.title1')}{' '}

                <span className="italic text-green-800">
                  {t('contact_pg.info.title2')}
                </span>

              </h2>

              <p className="mt-8 max-w-md text-[#64748B] text-base md:text-lg leading-relaxed">
                {t('contact_pg.info.desc')}
              </p>


              {/* Contact index */}

              <div className="mt-14 border-t border-gray-200">

                {INFO.map((item, index) => (

                  <a
                    key={item.number}
                    href={item.href}
                    className={`rs d${index + 1} group grid grid-cols-[42px_1fr_auto] gap-5 items-center py-6 border-b border-gray-200 transition-all duration-300 hover:px-3`}
                  >

                    {/* Number */}

                    <span className="text-[.6rem] font-black tracking-[.2em] text-[#A0AEC0]">
                      {item.number}
                    </span>

                    {/* Icon + text */}

                    <div className="flex items-center gap-4 min-w-0">

                      <div className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#0B1F3A] group-hover:bg-[#0B1F3A] group-hover:text-white group-hover:border-[#0B1F3A] transition-all duration-300 shrink-0">
                        {item.icon}
                      </div>

                      <div className="min-w-0">

                        <div className="text-[.6rem] font-black uppercase tracking-[.2em] text-green-800 mb-1">
                          {item.label}
                        </div>

                        <div className="font-serif text-[1rem] md:text-[1.05rem] font-bold text-[#0B1F3A] truncate">
                          {item.value}
                        </div>

                        <div className="text-xs text-[#94A3B8] mt-1">
                          {item.description}
                        </div>

                      </div>

                    </div>

                    {/* Arrow */}

                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-green-800 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>

                  </a>

                ))}

              </div>


              {/* Hours */}

              <div className="rs d4 mt-10">

                <div className="flex items-center justify-between mb-4">

                  <span className="text-[.6rem] font-black uppercase tracking-[.25em] text-green-800">
                    Business Hours
                  </span>

                  <span className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#A0AEC0]">
                    NPT
                  </span>

                </div>

                <div className="space-y-2">

                  <div className="flex justify-between gap-6 text-sm">
                    <span className="text-[#64748B]">
                      Sunday – Friday
                    </span>
                    <span className="font-bold text-[#0B1F3A]">
                      9:00 AM – 6:00 PM
                    </span>
                  </div>

                  <div className="flex justify-between gap-6 text-sm">
                    <span className="text-[#64748B]">
                      Saturday
                    </span>
                    <span className="font-bold text-[#0B1F3A]">
                      10:00 AM – 2:00 PM
                    </span>
                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT — FORM
            ================================================= */}

           {/* =================================================
    RIGHT — MINIMAL FORM
================================================= */}

<div className="rs d2 relative">

  <form
    onSubmit={submit}
    noValidate
    className="relative bg-white border-t border-[#0B1F3A] pt-8 md:pt-10"
  >

    {status === 'sent' ? (

      /* =================================================
         SUCCESS STATE
      ================================================= */

      <div className="min-h-[560px] flex flex-col justify-center">

        <div className="flex items-center gap-4 mb-10">

          <span className="text-[.6rem] font-black tracking-[.25em] text-[#A0AEC0]">
            01
          </span>

          <span className="w-10 h-px bg-green-800" />

          <span className="text-[.6rem] font-black uppercase tracking-[.25em] text-green-800">
            Message received
          </span>

        </div>


        <div className="w-14 h-14 rounded-full bg-green-800 text-white flex items-center justify-center mb-8">

          <svg
            className="w-6 h-6"
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


        <h3 className="font-serif text-4xl md:text-5xl text-[#0B1F3A] leading-tight mb-5">
          {t('contact_pg.form.sent')}
        </h3>


        <p className="max-w-md text-[#64748B] text-base leading-relaxed">
          {t('contact_pg.form.sent_desc')}
        </p>

      </div>

    ) : (

      <div>

        {/* =================================================
            FORM HEADER
        ================================================= */}

        <div className="mb-14">

          <div className="flex items-center gap-4 mb-7">

            <span className="text-[.6rem] font-black tracking-[.25em] text-[#A0AEC0]">
              01
            </span>

            <span className="w-10 h-px bg-green-800" />

            <span className="text-[.6rem] font-black uppercase tracking-[.25em] text-green-800">
              Start a conversation
            </span>

          </div>


          <h3 className="font-serif text-4xl md:text-5xl text-[#0B1F3A] leading-[1.05] tracking-tight">
            Tell us what
            <br />
            <span className="italic text-green-800">
              you&apos;re building.
            </span>
          </h3>


          <p className="mt-6 max-w-md text-[#64748B] text-sm md:text-base leading-relaxed">
            Have a project, idea, or challenge in mind?
            Tell us a little about it and we&apos;ll get back to you.
          </p>

        </div>


        {/* =================================================
            NAME
        ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          {/* First name */}

          <div className="relative">

            <label className="block mb-3">

              <span className="text-[.58rem] font-black uppercase tracking-[.22em] text-[#64748B]">
                {t('contact_pg.form.fname') as string}
              </span>

            </label>


            <input
              type="text"
              value={form.fname}
              onChange={set('fname')}
              placeholder="First name"
              className={`
                w-full
                h-12
                bg-transparent
                border-0
                border-b
                ${errors.fname
                  ? 'border-red-400'
                  : 'border-gray-200'
                }
                px-0
                text-[#0B1F3A]
                text-sm
                font-medium
                outline-none
                placeholder:text-[#CBD5E1]
                focus:border-green-800
                transition-colors
              `}
            />


            {errors.fname && (
              <p className="mt-2 text-[.65rem] text-red-500">
                Required field
              </p>
            )}

          </div>


          {/* Last name */}

          <div className="relative">

            <label className="block mb-3">

              <span className="text-[.58rem] font-black uppercase tracking-[.22em] text-[#64748B]">
                {t('contact_pg.form.lname') as string}
              </span>

            </label>


            <input
              type="text"
              value={form.lname}
              onChange={set('lname')}
              placeholder="Last name"
              className="w-full h-12 bg-transparent border-0 border-b border-gray-200 px-0 text-[#0B1F3A] text-sm font-medium outline-none placeholder:text-[#CBD5E1] focus:border-green-800 transition-colors"
            />

          </div>

        </div>


        {/* =================================================
            EMAIL
        ================================================= */}

        <div className="mb-10">

          <label className="block mb-3">

            <span className="text-[.58rem] font-black uppercase tracking-[.22em] text-[#64748B]">
              {t('contact_pg.form.email') as string}
            </span>

          </label>


          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@company.com"
            className={`
              w-full
              h-12
              bg-transparent
              border-0
              border-b
              ${errors.email
                ? 'border-red-400'
                : 'border-gray-200'
              }
              px-0
              text-[#0B1F3A]
              text-sm
              font-medium
              outline-none
              placeholder:text-[#CBD5E1]
              focus:border-green-800
              transition-colors
            `}
          />


          {errors.email && (
            <p className="mt-2 text-[.65rem] text-red-500">
              Valid email required
            </p>
          )}

        </div>


        {/* =================================================
            MESSAGE
        ================================================= */}

        <div className="mb-10">

          <label className="block mb-3">

            <span className="text-[.58rem] font-black uppercase tracking-[.22em] text-[#64748B]">
              {t('contact_pg.form.needs') as string}
            </span>

          </label>


          <textarea
            rows={5}
            value={form.msg}
            onChange={set('msg')}
            placeholder="Tell us a little about your project..."
            className={`
              w-full
              bg-transparent
              border-0
              border-b
              ${errors.msg
                ? 'border-red-400'
                : 'border-gray-200'
              }
              px-0
              py-3
              text-[#0B1F3A]
              text-sm
              leading-relaxed
              outline-none
              placeholder:text-[#CBD5E1]
              focus:border-green-800
              transition-colors
              resize-none
            `}
          />


          {errors.msg && (
            <p className="mt-2 text-[.65rem] text-red-500">
              Message is required
            </p>
          )}

        </div>


        {/* =================================================
            SUBMIT
        ================================================= */}

        <div  className="btn-pixel-solid inline-flex items-center gap-2 bg-[#12B76A] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors">

          <button
            type="submit"
            disabled={status === 'sending'}
            className="group inline-flex items-center justify-center gap-4 h-14 px-8 bg-[#0B1F3A] text-white rounded-full font-black uppercase tracking-[.18em] text-[.65rem] hover:bg-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {status === 'sending' ? (

              <>

                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />

                </svg>

                {t('contact_pg.form.sending')}

              </>

            ) : (

              <>

                {t('contact_pg.form.cta')}

                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>

              </>

            )}

          </button>


          {/* Response */}

          <div className="flex items-center gap-3">

            <span className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full rounded-full bg-green-800 opacity-40 animate-ping" />

              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-800" />

            </span>


            <span className="text-[.62rem] font-bold uppercase tracking-[.15em] text-[#94A3B8]">
              Usually replies within 2 hours
            </span>

          </div>

        </div>


        {/* =================================================
            PRIVACY
        ================================================= */}

        <div className="mt-8 pt-6 border-t border-gray-100">

          <label className="flex items-start gap-3 text-[.8rem] text-[#64748B] cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={set('consent')}
              className={`mt-0.5 accent-green-800 ${errors.consent ? 'outline outline-2 outline-red-400 rounded' : ''}`}
            />
            <span>
              I agree to the{' '}
              <Link
                href="/terms"
                className="text-[#0B1F3A] underline underline-offset-2 hover:text-green-800 transition-colors"
              >
                Terms & Conditions
              </Link>
              {' '}and{' '}
              <Link
                href="/privacy"
                className="text-[#0B1F3A] underline underline-offset-2 hover:text-green-800 transition-colors"
              >
                Privacy Policy
              </Link>
              {' '}and consent to being contacted about my message.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-2 text-[.7rem] text-red-500 font-medium">Please accept the Privacy Policy to continue.</p>
          )}

        </div>

      </div>

    )}

  </form>

</div>
          </div>

        </div>

      </section>


      {/* =====================================================
          LOCATION / BRAND STATEMENT
      ===================================================== */}

      <section
        id="location"
        className="relative bg-white overflow-hidden"
      >

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-28">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div>

              <div className="section-kicker mb-7">

                <span className="section-kicker-line" />

                Based in Nepal

              </div>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#0B1F3A]">

                Built here.

                <br />

                <span className="italic text-green-800">
                  Connected everywhere.
                </span>

              </h2>

            </div>

            <div className="md:pl-16">

              <p className="text-[#64748B] text-lg leading-relaxed max-w-lg">
                Our innovation center is based in Sanothimi,
                Bhaktapur — where we design technology for
                organizations that want to operate smarter,
                scale confidently, and create lasting impact.
              </p>

              <div className="mt-8 flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-gray-200 flex items-center justify-center">

                  <svg
                    className="w-4 h-4 text-green-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                </div>

                <span className="text-sm font-bold text-[#0B1F3A]">
                  Sanothimi, Bhaktapur, Nepal
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section
        ref={faqRef as React.RefObject<HTMLDivElement>}
        className="bg-[#F8FAFC] border-t border-gray-100"
      >

        <div className="max-w-5xl mx-auto px-6 py-28 md:py-32">

          <div className="grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr] gap-16 md:gap-24">

            {/* FAQ intro */}

            <div className="rs">

              <div className="section-kicker mb-7">

                <span className="section-kicker-line" />

                {t('contact_pg.faq.kicker')}

              </div>

              <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-[#0B1F3A]">

                {t('contact_pg.faq.title1')}

                <br />

                <span className="italic text-green-800">
                  {t('contact_pg.faq.title2')}
                </span>

              </h2>

              <p className="mt-7 text-[#64748B] leading-relaxed max-w-sm">
                A few answers to questions we hear most often.
              </p>

            </div>


            {/* Questions */}

            <div className="rs d2 border-t border-gray-200">

              {([1, 2, 3, 4] as const).map((id, i) => {

                const isOpen = openFaq === i;

                return (

                  <div
                    key={id}
                    className="border-b border-gray-200"
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : i)
                      }
                      className="w-full py-7 flex items-start justify-between gap-8 text-left group"
                    >

                      <div className="flex gap-5">

                        <span className="text-[.58rem] font-black tracking-[.2em] text-[#A0AEC0] pt-1.5">
                          0{i + 1}
                        </span>

                        <span
                          className={`
                            font-serif
                            text-xl
                            md:text-[1.4rem]
                            leading-snug
                            transition-colors
                            ${isOpen
                              ? 'text-green-800'
                              : 'text-[#0B1F3A] group-hover:text-green-800'
                            }
                          `}
                        >
                          {t(
                            `contact_pg.faq.${id}.q` as
                              'contact_pg.faq.1.q'
                          )}
                        </span>

                      </div>

                      <span
                        className={`
                          w-8
                          h-8
                          rounded-full
                          border
                          flex
                          items-center
                          justify-center
                          shrink-0
                          transition-all
                          duration-300
                          ${isOpen
                            ? 'bg-green-800 border-green-800 text-white rotate-45'
                            : 'border-gray-200 text-[#64748B] group-hover:border-green-800 group-hover:text-green-800'
                          }
                        `}
                      >

                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="1.8"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>

                      </span>

                    </button>


                    <div
                      className={`
                        grid
                        transition-[grid-template-rows]
                        duration-400
                        ease-in-out
                        ${isOpen
                          ? 'grid-rows-[1fr]'
                          : 'grid-rows-[0fr]'
                        }
                      `}
                    >

                      <div className="overflow-hidden">

                        <div className="pb-8 pl-11 pr-10">

                          <p className="text-[#64748B] text-[.92rem] leading-relaxed max-w-xl">
                            {t(
                              `contact_pg.faq.${id}.a` as
                                'contact_pg.faq.1.a'
                            )}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                );
              })}

            </div>

          </div>


          {/* Still questions */}

          <div className="rs d4 mt-20 pt-10 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            <div>

              <div className="text-[.6rem] font-black uppercase tracking-[.25em] text-green-800 mb-2">
                Need more help?
              </div>

              <p className="text-[#64748B] text-sm">
                Our team is always happy to talk.
              </p>

            </div>

            <a
              href="mailto:info@sanothimi.com"
              className="inline-flex items-center gap-3 bg-[#0B1F3A] text-white px-7 py-3.5 rounded-full text-sm font-bold hover:bg-green-800 transition-all duration-300"
            >

              Email us directly

              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>

            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <CTABanner
        title={'Ready to build\nsomething meaningful?'}
        sub="Tell us where you want to go. We’ll help you figure out the next step."
        cta="Start a Conversation"
        ctaHref="/contact"
      />

    </main>
  );
}