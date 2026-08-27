'use client';
import { Himalaya, Lattice, Mandala, NepalSun } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import { useLanguage } from '@/context/LanguageContext';
import { sendContactForm } from '@/lib/sendContactForm';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function useReveal(selector = '.rs') {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.09 }
    );
    ref.current?.querySelectorAll(selector).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
  return ref;
}

function useCounter(target: number, delay = 0) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          const dur = 2000;
          const step = target / (dur / 16);
          let v = 0;
          const id = setInterval(() => {
            v = Math.min(v + step, target);
            setVal(Math.floor(v));
            if (v >= target) clearInterval(id);
          }, 16);
        }, delay);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, delay]);
  return { ref, val };
}

const MILESTONES = [
  { year: '2025', title: 'Sanothimi Founded', desc: 'Sanothimi was founded in Bhaktapur with a mission to digitize Nepal\'s institutions through world-class SaaS.' },
  { year: '2025', title: 'NUVORA Launch', desc: 'Released our flagship educational ERP to 5 pioneering schools — automating admissions, fee management, and attendance.' },
  { year: '2025', title: 'Financial Suite', desc: 'Expanded into cloud-based, VAT-compliant accounting solutions purpose-built for enterprises and SMEs across Nepal.' },
  { year: '2026', title: 'Enterprise Scale', desc: 'Onboarded 25+ institutions and introduced Business Intelligence dashboards with real-time KPI monitoring.' },
  { year: '2026', title: '10K+ Daily Users', desc: 'Now serving 10,000+ active users across educational, financial, and enterprise verticals — with 99.9% uptime.' },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const sTimeline = useReveal();
  const sContact = useReveal();

  const c0 = useCounter(5, 0);
  const c1 = useCounter(10, 200);
  const c2 = useCounter(99, 400);
  const c3 = useCounter(50, 600);

  const [cf, setCf] = useState({
    fname: '', lname: '', email: '', phone: '', jobTitle: '', company: '',
    country: '', enquiry: '', comments: '', subscribe: false, consent: false,
  });
  const [cfStatus, setCfStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [cfErrors, setCfErrors] = useState<Record<string, boolean>>({});

  const setCfField = (k: keyof typeof cf) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
      setCf((prev) => ({ ...prev, [k]: val }));
      setCfErrors((prev) => ({ ...prev, [k]: false }));
    };

  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, boolean> = {};
    if (!cf.fname) err.fname = true;
    if (!cf.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cf.email)) err.email = true;
    if (!cf.enquiry) err.enquiry = true;
    if (!cf.consent) err.consent = true;
    if (Object.keys(err).length) { setCfErrors(err); return; }

    setCfStatus('sending');
    try {
      await sendContactForm({
        from_name: `${cf.fname} ${cf.lname}`,
        from_email: cf.email,
        subject: `New Enquiry from ${cf.fname}${cf.company ? ` (${cf.company})` : ''}`,
        message: [
          `Enquiry type: ${cf.enquiry}`,
          cf.phone && `Phone: ${cf.phone}`,
          cf.jobTitle && `Job title: ${cf.jobTitle}`,
          cf.company && `Company: ${cf.company}`,
          cf.country && `Country: ${cf.country}`,
          cf.comments && `Comments: ${cf.comments}`,
        ].filter(Boolean).join('\n'),
        source: 'about',
      });
      setCfStatus('sent');
      setCf({ fname: '', lname: '', email: '', phone: '', jobTitle: '', company: '', country: '', enquiry: '', comments: '', subscribe: false, consent: false });
      setTimeout(() => setCfStatus('idle'), 6000);
    } catch {
      setCfStatus('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <main>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01. CINEMATIC HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    MISSION / ABOUT HERO
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
<div className="relative py-25 bg-white overflow-hidden">

  {/* Nepal-inspired background decorations */}
  <div
    className="absolute inset-0 pointer-events-none select-none"
    aria-hidden="true"
  >

    <Mandala
      className="absolute -top-20 -right-20 w-[520px] h-[520px] text-[#0B1F3A] opacity-[0.06]"
    />

    <NepalSun
      className="absolute bottom-10 -left-16 w-[300px] h-[300px] text-[#155EEF] opacity-[0.05]"
    />

    <div
      className="absolute top-1/2 -translate-y-1/2 left-1/3 w-[600px] h-[600px] rounded-full border border-[#0B1F3A]/[0.04]"
    />

    <div
      className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#0B1F3A]/[0.025] blur-[120px]"
    />

    <Himalaya
      className="absolute bottom-0 left-0 w-full text-[#0B1F3A] opacity-[0.04]"
    />

  </div>


  {/* =========================================================
      CONTENT
      ========================================================= */}
  <div className="max-w-7xl mx-auto px-6 relative z-10">

    <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-center">

      {/* =====================================================
          LEFT — TEXT CONTENT
          ===================================================== */}
      <div>

        {/* Kicker */}
        <div
          className="text-[#155EEF] text-[.7rem] font-black uppercase tracking-[.3em] mb-6"
        >
          {t('about_pg.mission.kicker')}
        </div>


        {/* Title */}
        <h1
          className="font-serif text-[2.2rem] sm:text-5xl md:text-5xl text-[#0B1F3A] leading-[1.1] tracking-tight mb-8"
        >
          {t('about_pg.mission.title1')}
          <br />

          <span className="relative inline-block">
            {t('about_pg.mission.title2')}

            <span
              className="absolute left-0 -bottom-1 w-full h-[3px] bg-green-500 rounded-full"
            />
          </span>
        </h1>


        {/* Description */}
        <p
          className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed mt-10"
        >
          Nepal&apos;s premier SaaS engineering hub — digitizing institutions
          with enterprise-grade cloud infrastructure and human-centred design.
        </p>


        {/* Quick stats ribbon */}
        <div
          className="mt-16 flex flex-wrap gap-x-16 gap-y-6 pt-10 border-t border-gray-100"
        >

          {[
            { val: '5+', label: 'Years Operating' },
            { val: '10K+', label: 'Active Users' },
            { val: '99.9%', label: 'Uptime SLA' },
          ].map((s) => (

            <div
              key={s.label}
              className="flex items-baseline gap-2"
            >
              <span
                className="font-serif text-3xl font-bold text-[#0B1F3A]"
              >
                {s.val}
              </span>

              <span
                className="text-[.6rem] font-black uppercase tracking-[.25em] text-gray-400"
              >
                {s.label}
              </span>
            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          RIGHT — TRANSPARENT IMAGE
          ===================================================== */}
      <div
        className="relative flex items-center justify-center lg:justify-end min-h-[320px] sm:min-h-[400px] lg:min-h-[520px]"
      >

        <img
          src="/hero-005.png"
          alt=""
          className="relative z-10 block w-full max-w-[560px] h-auto object-contain select-none"
          draggable="false"
        />

      </div>

    </div>

  </div>

</div>

{/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    02. OUR STRENGTHS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
<section
  id="about-strengths"
  className="relative py-15 md:py-15 bg-[#ECFFF9] overflow-hidden"
>
  {/* Subtle background details */}
  <div
    className="absolute inset-0 pointer-events-none select-none"
    aria-hidden="true"
  >
    {/* Soft radial light */}
    <div className="absolute -top-32 right-[-10%] w-[500px] h-[500px] rounded-full bg-[#20C997]/[0.06] blur-[120px]" />

    <div className="absolute bottom-[-20%] left-[-8%] w-[420px] h-[420px] rounded-full bg-[#155EEF]/[0.035] blur-[120px]" />

    {/* Very subtle contour */}
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.10]"
      viewBox="0 0 1600 700"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M-100 520 C180 520 220 180 520 180 S820 520 1080 350 S1380 120 1700 160"
        stroke="#b9f1da"
        strokeWidth="0.8"
      />

      <path
        d="M-100 570 C200 570 270 240 550 240 S850 560 1110 420 S1400 190 1700 220"
        stroke="#20C997"
        strokeWidth="0.7"
      />
    </svg>
  </div>


  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* =====================================================
        SECTION HEADER
        ===================================================== */}
    <div className="max-w-3xl mb-10 md:mb-5">

      <div className="flex items-center gap-3 text-black text-[.65rem] font-black uppercase tracking-[.3em] mb-6">
        <span className="w-8 h-px bg-black" />  
        Our Strengths
      </div>

      <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-green-800 leading-[1.08] tracking-tight">
        Why choose <span className="italic text-gray-900">Sanothimi?</span>
      </h2>

    </div>


    {/* =====================================================
        STRENGTH GRID
        ===================================================== */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-8 gap-y-6 md:gap-y-10">

      {/* =================================================
          01 — REGIONAL EXPERTISE
          ================================================ */}
      <div className="group">

        <h3 className="font-serif text-2xl md:text-[1rem] font-bold text-[#0B1F3A] mb-2">
          Regional expertise
        </h3>

        <p className="text-[#153E5C]/80 text-[0.875rem] md:text-base leading-relaxed max-w-2xl">
          We possess deep experience and insight into the unique challenges
          facing institutions across Nepal and the wider South Asian market.
          Our understanding of local business realities, regulatory
          environments, and customer needs allows us to build solutions that
          are practical, scalable, and relevant.
        </p>

      </div>


      {/* =================================================
          02 — INNOVATIVE SOLUTIONS
          ================================================ */}
      <div className="group">

       

        <h3 className="font-serif text-2xl md:text-[1rem] font-bold text-[#0B1F3A] mb-2">
          Innovative solutions
        </h3>

        <p className="text-[#153E5C]/80 text-[0.875rem] md:text-base leading-relaxed max-w-2xl">
          We build future-ready technology designed around real operational
          challenges. From intelligent workflows to powerful data tools,
          our platforms help institutions simplify processes, improve user
          experiences, and make better decisions.
        </p>

      </div>


      {/* =================================================
          03 — PROVEN RELIABILITY
          ================================================ */}
      <div className="group">

     

        <h3 className="font-serif text-2xl md:text-[1rem] font-bold text-[#0B1F3A] mb-2">
          Proven reliability
        </h3>

        <p className="text-[#153E5C]/80 text-[0.875rem] md:text-base leading-relaxed max-w-2xl">
          Our software is built for environments where reliability matters.
          Secure architecture, dependable infrastructure, and scalable
          systems help institutions operate confidently while maintaining
          consistent performance as their needs grow.
        </p>

      </div>


      {/* =================================================
          04 — LOCALIZED OFFERINGS
          ================================================ */}
      <div className="group">

       

        <h3 className="font-serif text-2xl md:text-[1rem] font-bold text-[#0B1F3A] mb-2">
          Localized offerings
        </h3>

        <p className="text-[#153E5C]/80 text-[0.875rem] md:text-base leading-relaxed max-w-2xl">
          We stay closely connected to the realities of the markets we serve.
          This enables us to adapt products, workflows, and support around
          local requirements while maintaining the standards expected from
          modern enterprise technology.
        </p>

      </div>

    </div>

  </div>

</section>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02.5 OUR VALUES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="about-values" ref={s1 as React.RefObject<HTMLDivElement>} className="py-32 bg-white relative z-10 scroll-mt-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <Lattice className="absolute inset-0 w-full h-full text-[#0B1F3A] opacity-[0.022]" size={52} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="rs max-w-2xl mb-20">
            <div className="section-kicker mb-8">
              <span className="section-kicker-line" />
              {t('about_pg.corevalues.kicker')}
            </div>
            <h2 className="font-serif text-4xl md:text-4xl text-green-900 leading-[1.2] mb-6">
              {t('about_pg.corevalues.title1')}{' '}
              <span className="italic text-black">{t('about_pg.corevalues.title2')}</span>
            </h2>
            <p className="text-[#6B7280] text-lg leading-relaxed">
              {t('about_pg.corevalues.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {([1, 2, 3, 4] as const).map((id, i) => (
              <div key={id} className={`rs d${i + 1} group`}>
                <svg className="w-16 h-16 text-gray-900 mb-7 transition-transform duration-500 item-center" viewBox="0 0 24 24" fill="currentColor">
                  {/* 01 — Collaborate: two interlocking rings */}
                  {id === 1 && <path fillRule="evenodd" clipRule="evenodd" d="M9 4a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zM15 8a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />}
                  {/* 02 — Client-first: filled heart */}
                  {id === 2 && <path d="M12 21s-7.5-4.6-10.2-9.3C.3 9.1 0 7.5 0 6a6 6 0 0112 0c0 1.5-.3 3.1-1.8 5.7C19.5 16.4 12 21 12 21z" />}
                  {/* 03 — Innovate: sparkle/star burst */}
                  {id === 3 && <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />}
                  {/* 04 — Care: filled shield-check */}
                  {id === 4 && <path fillRule="evenodd" clipRule="evenodd" d="M12 2l8 3.2v5.6c0 5.1-3.4 9.4-8 11-4.6-1.6-8-5.9-8-11V5.2L12 2zm4.3 7.3a1 1 0 00-1.4-1.4L11 11.8l-1.9-1.9a1 1 0 00-1.4 1.4l2.6 2.6c.4.4 1 .4 1.4 0l4.6-4.6z" />}
                </svg>
                <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-3">
                  {t(`about_pg.corevalues.${id}.title` as 'about_pg.corevalues.1.title')}
                </h3>
                <p className="text-[#6B7280] text-[.9rem] leading-relaxed">
                  {t(`about_pg.corevalues.${id}.desc` as 'about_pg.corevalues.1.desc')}
                </p>
              </div>
            ))}
          </div>

          {/* Connected panel — built around the people who use it */}
          <div className="rs mt-24 md:mt-28 relative bg-[#0B1F3A] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#155EEF]/10 blur-[100px]" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
              <div className="p-10 sm:p-14 lg:p-20">
                <div className="text-[#155EEF] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
                  {t('about_pg.corevalues.panel.kicker')}
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-white leading-[1.2] mb-6">
                  {t('about_pg.corevalues.panel.title')}
                </h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                  {t('about_pg.corevalues.panel.desc')}
                </p>
                <Link
                  href="/demo"
                  style={{ '--pixel-text-hover': '#038142' } as React.CSSProperties}
                  className="btn-pixel-solid inline-flex items-center gap-3 bg-orange-400 text-white px-8 py-4 rounded-full font-bold text-sm transition-colors"
                >
                  <span className="relative z-10">{t('about_pg.corevalues.panel.cta')}</span>
                </Link>
              </div>
              <div className="relative h-[320px] sm:h-[420px] lg:h-[520px]">
                <img
                  src="/team-002.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      

 


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04. MILESTONE TIMELINE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
  <section
  id="about-journey"
  ref={sTimeline as React.RefObject<HTMLDivElement>}
  className="relative py-28 md:py-36 bg-white overflow-hidden scroll-mt-28"
>
  {/* =========================================================
      BACKGROUND — VERY SUBTLE BRAND ELEMENTS
      ========================================================= */}

  <div
    className="absolute inset-0 pointer-events-none"
    aria-hidden="true"
  >
    {/* Fine grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #0B3B25 1px, transparent 1px),
          linear-gradient(to bottom, #0B3B25 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
      }}
    />

    {/* Soft gold atmosphere */}
    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#C9A227]/[0.035] blur-[120px]" />

    <div className="absolute bottom-0 -left-40 w-[450px] h-[450px] rounded-full bg-[#14532D]/[0.035] blur-[120px]" />
  </div>


  <div className="max-w-6xl mx-auto px-6 relative z-10">

    {/* =======================================================
        HEADER
        ======================================================= */}

    <div className="text-center mb-20 md:mb-28">

      <div className="rs section-kicker justify-center mb-7">
        <span className="section-kicker-line bg-[#C9A227]" />

        <span className="text-[#14532D]">
          Our Journey
        </span>

        <span className="section-kicker-line bg-[#C9A227]" />
      </div>


      <h2 className="rs d1 font-serif text-4xl md:text-5xl lg:text-[3.4rem] text-[#0B1F3A] leading-[1.15]">
        Built Over{' '}

        <span className="italic text-[#14532D]">
          5+ Years
        </span>{' '}

        of Innovation
      </h2>


      <p className="rs d2 mt-5 max-w-2xl mx-auto text-[#6B7280] text-sm md:text-base leading-relaxed">
        From a focused beginning to building technology that supports
        institutions, people and growing organizations.
      </p>

    </div>


    {/* =======================================================
        JOURNEY
        ======================================================= */}

    <div className="relative">

      {/* =====================================================
          DESKTOP FLOWING PATH
          ===================================================== */}

      <svg
        className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[180px] h-full pointer-events-none overflow-visible"
        viewBox="0 0 180 1000"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >

        {/* Soft path underneath */}
        <path
          d="M90 0 C90 90 35 120 45 210 C55 300 145 330 135 420 C125 510 35 540 45 630 C55 720 145 750 135 840 C125 910 90 950 90 1000"
          stroke="#14532D"
          strokeWidth="5"
          opacity="0.035"
        />

        {/* Main gold journey path */}
        <path
          d="M90 0 C90 90 35 120 45 210 C55 300 145 330 135 420 C125 510 35 540 45 630 C55 720 145 750 135 840 C125 910 90 950 90 1000"
          stroke="#C9A227"
          strokeWidth="1.5"
          strokeDasharray="3 8"
          opacity="0.55"
        />

      </svg>


      {/* =====================================================
          MOBILE PATH
          ===================================================== */}

      <div
        className="md:hidden absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[#C9A227]/50 to-transparent"
      />


      {/* =====================================================
          MILESTONES
          ===================================================== */}

      <div className="space-y-16 md:space-y-24 relative">

        {MILESTONES.map((m, i) => (

          <div
            key={`${m.year}-${m.title}`}
            className={`
              rs
              d${(i % 4) + 1}
              relative
              grid
              grid-cols-1
              md:grid-cols-[1fr_120px_1fr]
              items-center
            `}
          >

            {/* =================================================
                LEFT CONTENT
                ================================================= */}

            <div
              className={`
                ${i % 2 === 0
                  ? 'md:text-right md:pr-12'
                  : 'md:order-3 md:text-left md:pl-12'
                }
              `}
            >

              <div
                className="inline-flex items-center gap-2 mb-3 text-[.62rem] font-black uppercase tracking-[.35em] text-[#C9A227]"
              >
                <span className="w-5 h-px bg-[#C9A227]/60" />
                {m.year}
              </div>


              <h3
                className="font-serif text-2xl md:text-3xl text-[#0B1F3A] leading-tight mb-3"
              >
                {m.title}
              </h3>


              <p
                className={`
                  text-[#6B7280]
                  text-sm
                  leading-relaxed
                  max-w-sm
                  ${i % 2 === 0 ? 'md:ml-auto' : ''}
                `}
              >
                {m.desc}
              </p>

            </div>


            {/* =================================================
                CENTER WAYPOINT
                ================================================= */}

            <div
              className="hidden md:flex items-center justify-center relative z-20"
            >

              {/* Outer ring */}
              <div
                className="absolute w-16 h-16 rounded-full border border-[#C9A227]/20"
              />

              {/* Second ring */}
              <div
                className="absolute w-10 h-10 rounded-full border border-[#C9A227]/35"
              />

              {/* Main node */}
              <div
                className="relative w-5 h-5 rounded-full bg-[#14532D] border-[3px] border-white shadow-[0_0_0_1px_rgba(201,162,39,0.6),0_6px_20px_rgba(20,83,45,0.18)]"
              >

                {/* Gold center */}
                <div
                  className="absolute inset-[3px] rounded-full bg-[#C9A227]"
                />

              </div>

            </div>


            {/* =================================================
                MOBILE WAYPOINT
                ================================================= */}

            <div
              className="md:hidden absolute left-[10px] top-1 z-20 w-[19px] h-[19px] rounded-full bg-white border border-[#C9A227]/60 flex items-center justify-center"
            >

              <div
                className="w-2 h-2 rounded-full bg-[#C9A227]"
              />

            </div>


            {/* =================================================
                EMPTY SIDE / DECORATIVE LABEL
                ================================================= */}

            <div
              className={`
                hidden
                md:block
                ${i % 2 === 0
                  ? 'md:order-3 md:pl-12'
                  : 'md:order-1 md:pr-12'
                }
              `}
            >

              {/* Small index */}
              <div
                className={`
                  flex
                  items-center
                  gap-3
                  text-[#14532D]/20
                  ${i % 2 === 0 ? 'justify-start' : 'justify-end'}
                `}
              >

                <span className="text-[.58rem] font-black tracking-[.3em] uppercase">
                  Milestone
                </span>

                <span className="font-serif text-4xl leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>
</section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          06. WHY CHOOSE SANOTHIMI
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <section
  id="about-trust"
  ref={s3 as React.RefObject<HTMLDivElement>}
  className="relative py-28 md:py-36 bg-[#F8FAFC] overflow-hidden scroll-mt-28"
>
  {/* =========================================================
      BACKGROUND
      ========================================================= */}

  <div
    className="absolute inset-0 pointer-events-none"
    aria-hidden="true"
  >
    {/* Architectural grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #14532D 1px, transparent 1px),
          linear-gradient(to bottom, #14532D 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
      }}
    />

    {/* Large decorative rings */}
    <div className="absolute -right-32 top-20 w-[500px] h-[500px] rounded-full border border-[#C9A227]/[0.28]" />

    <div className="absolute -right-20 top-32 w-[350px] h-[350px] rounded-full border border-[#14532D]/[0.5]" />

    {/* Soft gold glow */}
    <div className="absolute left-[-180px] bottom-[-180px] w-[500px] h-[500px] rounded-full bg-[#C9A227]/[0.035] blur-[130px]" />
  </div>


  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* =======================================================
        HEADER
        ======================================================= */}

    <div className="grid lg:grid-cols-[1fr_220px] gap-10 items-end mb-20 md:mb-14">

      <div>

        <div className="section-kicker mb-7">
          <span className="section-kicker-line bg-[#C9A227]" />

          <span className="text-[#14532D]">
            {t('about_pg.trust.kicker')}
          </span>
        </div>


        <h2 className="rs font-serif text-4xl md:text-5xl lg:text-[3.4rem] text-[#0B1F3A] leading-[1.08]">
          {t('about_pg.trust.title1')}{' '}

          <span className="italic text-[#14532D]">
            {t('about_pg.trust.title2')}
          </span>
        </h2>

      </div>


      {/* Small editorial statement */}
      <div className="hidden lg:block border-l border-[#C9A227]/40 pl-6 pb-1">
        <p className="text-[#6B7280] text-sm leading-relaxed">
          Built around the principles that keep technology
          useful, dependable and human.
        </p>
      </div>

    </div>


    {/* =======================================================
        TRUST ARCHITECTURE
        ======================================================= */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

      {([1, 2, 3, 4] as const).map((id, i) => (

        <div
          key={id}
          className={`
            rs
            d${i + 1}
            group
            relative
            min-h-[290px]
            overflow-hidden
          
            bg-white
            border
            border-[#14532D]/[0.07]
            p-8
            md:p-9
            transition-all
            duration-700
          
           
            
            shadow-[0_10px_40px_rgba(11,31,58,0.035)]
            hover:shadow-[0_25px_60px_rgba(11,59,37,0.16)]
          `}
        >

          {/* =================================================
              GIANT NUMBER
              ================================================= */}

          <div className="absolute -right-4 -top-7 font-serif text-[8rem] font-bold leading-none text-[#14532D]/[0.035] transition-all duration-700 group-hover:text-[#14532D]/[0.035] group-hover:scale-110">
            {String(id).padStart(2, '0')}
          </div>


          {/* =================================================
              ORBIT DECORATION
              ================================================= */}

          <div className="absolute right-7 top-7 w-12 h-12 rounded-full border border-[#C9A227]/20 transition-all duration-700 group-hover:rotate-45 group-hover:border-[#C9A227]/50">

            <span className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A227]" />

          </div>


    

          <div className="relative">

            <div className="text-[.58rem] font-black uppercase tracking-[.35em] text-[#C9A227] mb-3">
              Principle {String(id).padStart(2, '0')}
            </div>


            <h3 className="font-serif font-bold text-[1.35rem] text-[#0B1F3A] mb-4 leading-tight group-hover:text-[#14532D] transition-colors duration-500">
              {t(`about.why.${id}.title` as 'about.why.1.title')}
            </h3>


            <p className="text-[#6B7280] text-[.84rem] leading-relaxed group-hover:text-gray-900 transition-colors duration-500">
              {t(`about.why.${id}.desc` as 'about.why.1.desc')}
            </p>

          </div>


          {/* =================================================
              BOTTOM SYSTEM LINE
              ================================================= */}

          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#14532D] via-[#C9A227] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

        </div>

      ))}

    </div>


    {/* =======================================================
        BOTTOM BRAND STATEMENT
        ======================================================= */}

    <div className="mt-10 flex items-center gap-4 text-[#14532D]/40">

      <span className="w-10 h-px bg-[#C9A227]/60" />

      <span className="text-[.58rem] font-black uppercase tracking-[.35em]">
        Technology with purpose
      </span>

    </div>

  </div>
</section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          07. CONTACT SANOTHIMI
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="about-contact" ref={sContact as React.RefObject<HTMLDivElement>} className="py-28 md:py-36 bg-white relative overflow-hidden scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-20">

            {/* LEFT — intro + mark */}
            <div className="rs">
              <div className="text-[#12B76A] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
                {t('about_pg.contact.kicker')}
              </div>
              <h2 className="font-serif text-4xl md:text-[2.6rem] text-[#0B1F3A] leading-[1.2] mb-6">
                {t('about_pg.contact.title1')}<br />
                <span className="italic text-[#12B76A]">{t('about_pg.contact.title2')}</span>
              </h2>
              <p className="text-[#6B7280] text-base md:text-lg leading-relaxed max-w-sm mb-16">
                {t('about_pg.contact.desc')}
              </p>

              {/* Minimal directional mark */}
              <svg className="w-24 h-16 text-[#0B1F3A]" viewBox="0 0 100 60" fill="none">
                <path d="M2 30h70" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M50 6l32 24-32 24" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M78 4l10 10M92 4L82 14" stroke="#12B76A" strokeWidth="5" strokeLinecap="round" />
                <path d="M78 46l10 10M92 46L82 56" stroke="#12B76A" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>

            {/* RIGHT — form */}
            <div className="rs d2">
              {cfStatus === 'sent' ? (
                <div className="text-center py-24 border border-gray-100 rounded-[2rem] bg-[#F8FAFC]">
                  <div className="w-16 h-16 bg-[#12B76A] text-white rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-[#0B1F3A] mb-3">{t('about_pg.contact.sent')}</h3>
                  <p className="text-[#6B7280]">{t('about_pg.contact.sent_desc')}</p>
                </div>
              ) : (
                <form onSubmit={submitContactForm} noValidate className="space-y-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                    <div>
                      <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">{t('about_pg.contact.form.fname')}*</label>
                      <input
                        type="text"
                        value={cf.fname}
                        onChange={setCfField('fname')}
                        className={`w-full bg-transparent border-b ${cfErrors.fname ? 'border-red-400' : 'border-gray-200'} py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF]`}
                      />
                    </div>
                    <div>
                      <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">{t('about_pg.contact.form.lname')}</label>
                      <input
                        type="text"
                        value={cf.lname}
                        onChange={setCfField('lname')}
                        className="w-full bg-transparent border-b border-gray-200 py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">{t('about_pg.contact.form.email')}*</label>
                      <input
                        type="email"
                        value={cf.email}
                        onChange={setCfField('email')}
                        className={`w-full bg-transparent border-b ${cfErrors.email ? 'border-red-400' : 'border-gray-200'} py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF]`}
                      />
                    </div>
                    <div>
                      <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">{t('about_pg.contact.form.phone')}</label>
                      <input
                        type="tel"
                        value={cf.phone}
                        onChange={setCfField('phone')}
                        className="w-full bg-transparent border-b border-gray-200 py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">{t('about_pg.contact.form.jobTitle')}</label>
                      <input
                        type="text"
                        value={cf.jobTitle}
                        onChange={setCfField('jobTitle')}
                        className="w-full bg-transparent border-b border-gray-200 py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">{t('about_pg.contact.form.company')}</label>
                      <input
                        type="text"
                        value={cf.company}
                        onChange={setCfField('company')}
                        className="w-full bg-transparent border-b border-gray-200 py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">{t('about_pg.contact.form.country')}</label>
                      <input
                        type="text"
                        value={cf.country}
                        onChange={setCfField('country')}
                        className="w-full bg-transparent border-b border-gray-200 py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">{t('about_pg.contact.form.enquiry')}*</label>
                      <select
                        value={cf.enquiry}
                        onChange={setCfField('enquiry')}
                        className={`w-full bg-transparent border-b ${cfErrors.enquiry ? 'border-red-400' : 'border-gray-200'} py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF]`}
                      >
                        <option value="">{t('about_pg.contact.form.enquiry.placeholder')}</option>
                        <option value="General Inquiry">{t('about_pg.contact.form.enquiry.general')}</option>
                        <option value="Sales">{t('about_pg.contact.form.enquiry.sales')}</option>
                        <option value="Partnership">{t('about_pg.contact.form.enquiry.partnership')}</option>
                        <option value="Support">{t('about_pg.contact.form.enquiry.support')}</option>
                        <option value="Careers">{t('about_pg.contact.form.enquiry.careers')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[.7rem] font-bold text-[#0B1F3A] mb-2">{t('about_pg.contact.form.comments')}</label>
                    <textarea
                      rows={4}
                      value={cf.comments}
                      onChange={setCfField('comments')}
                      className="w-full bg-transparent border-b border-gray-200 py-2.5 text-[#0B1F3A] text-sm outline-none transition-colors focus:border-[#155EEF] resize-none"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 text-[.82rem] text-[#6B7280] cursor-pointer">
                      <input type="checkbox" checked={cf.subscribe} onChange={setCfField('subscribe')} className="mt-0.5 accent-[#155EEF]" />
                      {t('about_pg.contact.form.subscribe')}
                    </label>
                    <label className="flex items-start gap-3 text-[.82rem] text-[#6B7280] cursor-pointer">
                      <input type="checkbox" checked={cf.consent} onChange={setCfField('consent')} className={`mt-0.5 accent-[#155EEF] ${cfErrors.consent ? 'outline outline-2 outline-red-400 rounded' : ''}`} />
                      <span>
                        I agree to the{' '}
                        <Link href="/terms" className="underline hover:text-[#155EEF] transition-colors">Terms & Conditions</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="underline hover:text-[#155EEF] transition-colors">Privacy Policy</Link>
                        {' '}and consent to being contacted about my enquiry.
                      </span>
                    </label>
                    {cfErrors.consent && (
                      <p className="text-[.7rem] text-red-500 font-medium">Please accept the Privacy Policy to continue.</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={cfStatus === 'sending'}
                    style={{ '--pixel-color': '#0B1F3A', '--pixel-text-hover': '#fff' } as React.CSSProperties}
                    className="btn-pixel-solid inline-flex items-center gap-3 bg-[#12B76A] text-white px-9 py-4 rounded-full font-bold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {cfStatus === 'sending' ? t('about_pg.contact.form.sending') : t('about_pg.contact.form.cta')}
                    </span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <CTABanner
        title={'Scale Your Institution\nwith Sanothimi'}
        sub="Ready to get started with the regional SaaS leader?"
        cta="Get Started"
      />
    </main>
  );
}
