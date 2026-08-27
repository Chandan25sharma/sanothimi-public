'use client';
import { Himalaya, Lattice, Mandala, NepalSun } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.09 }
    );
    ref.current?.querySelectorAll('.rs').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const SVC_ICONS = [
  // School ERP
  <svg key="school" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>,
  // Finance
  <svg key="finance" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>,
  // Inventory
  <svg key="inventory" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>,
  // BI
  <svg key="bi" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
  // HR
  <svg key="hr" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Custom
  <svg key="custom" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
];

const SVC_STATUS: Array<'live' | 'soon' | null> = ['live', 'soon', 'soon', null, null, null];

const SVC_SLUGS = [
  'nuvora',
  'finance-accounting',
  'business-management',
  'business-intelligence',
  'enterprise-security',
  'custom-software',
];

const SVC_CATEGORY = [
  'School ERP',
  'Finance & Operations',
  'Finance & Operations',
  'Intelligence & Security',
  'Intelligence & Security',
  'Custom Engineering',
];

const PROCESS_ICONS = [
  <svg key="p1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  <svg key="p2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  <svg key="p3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
];

export default function ServicesPage() {
  const { t } = useLanguage();
  const s1 = useReveal();
  const s2 = useReveal();

  return (
    <main>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01. CINEMATIC HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative pt-24 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        
          <Mandala className="absolute -top-24 -right-24 w-[540px] h-[540px] text-[#0B1F3A] opacity-[0.09]" />
          <NepalSun className="absolute top-1/2 -translate-y-1/2 -left-20 w-[320px] h-[320px] text-[#155EEF] opacity-[0.09]" />
          <Lattice className="absolute inset-0 w-full h-full text-[#0B1F3A] opacity-[0.018]" size={48} />
          <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full border border-[#0B1F3A]/[0.09]" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#0B1F3A]/[0.03] blur-[120px]" />
          <Himalaya className="absolute bottom-0 left-0 w-full text-[#0B1F3A] opacity-[0.14]" />
          
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-black text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
            {t('services_pg.hero.kicker')}
          </div>

          <h1 className="font-serif text-[2.2rem] sm:text-5xl md:text-7xl text-[#0B1F3A] leading-[1.1] tracking-tight">
            
            <span className="relative inline-block">
              {t('services_pg.hero.title2')}
              <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#D4AF37] rounded-full" />
            </span>
          </h1>

          <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed mt-10">
            Enterprise-grade software solutions designed for the unique institutional landscape of Nepal and beyond.
          </p>
        </div>
      </div>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02. DISCOVERY BAR
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white border-b border-gray-100 relative z-5 -mt-5">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-between items-center gap-12">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl text-[#0B1F3A] leading-tight">
              {t('services_pg.disco.title')}
            </h2>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            {([1, 2, 3] as const).map((id) => (
              <div key={id} className="group">
                <div className="text-[9px] uppercase tracking-[0.3em] text-green-500 font-black mb-2 underline decoration-green-500 decoration-2 underline-offset-4 group-hover:text-black transition-colors">
                  {t(`services_pg.disco.${id}.label` as 'services_pg.disco.1.label')}
                </div>
                <div className="text-xl font-serif text-[#0B1F3A] group-hover:text-green-500 transition-colors">
                  {t(`services_pg.disco.${id}.desc` as 'services_pg.disco.1.desc')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03. SERVICE GALLERY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
     <section
  ref={s1 as React.RefObject<HTMLDivElement>}
  className="relative bg-[#F9FAFB] overflow-hidden"
>
  {/* =========================================================
      SECTION BACKGROUND
      ========================================================= */}

  <div
    className="absolute inset-0 pointer-events-none"
    aria-hidden="true"
  >
    {/* Very subtle architectural grid */}
    <div
      className="absolute inset-0 opacity-[0.018]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #14532D 1px, transparent 1px),
          linear-gradient(to bottom, #14532D 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />

    {/* Green atmosphere */}
    <div className="
      absolute
      -top-20
      right-[-200px]
      w-[600px]
      h-[600px]
      rounded-full
      bg-green-900/[0.025]
      blur-[140px]
    " />

    {/* Gold atmosphere */}
    <div className="
      absolute
      bottom-0
      left-[-200px]
      w-[500px]
      h-[500px]
      rounded-full
      bg-[#D4AF37]/[0.025]
      blur-[130px]
    " />
  </div>


  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* =======================================================
        HEADER
        ======================================================= */}

    <div className="pt-14 md:pt-12 pb-10 md:pb-18">

      <div className="max-w-4xl">

        <div className="rs section-kicker mb-7">

          <span className="section-kicker-line bg-[#D4AF37]" />

          <span className="text-green-900">
            {t('services_pg.portfolio.kicker')}
          </span>

        </div>


        <h2 className="
          rs
          d1
          font-serif
          text-3xl
          md:text-4xl
          lg:text-[3.2rem]
          text-green-950
          leading-[1.02]
          tracking-tight
        ">
          {t('services_pg.portfolio.title1')}

          <br />

          <span className="
            italic
            text-[#D4AF37]
          ">
            {t('services_pg.portfolio.title2')}
          </span>
        </h2>


        <p className="
          rs
          d2
          mt-8
          text-[#6B7280]
          text-base
          md:text-lg
          leading-relaxed
          max-w-3xl
        ">
          We design and engineer digital systems that turn complex
          operations into simpler, smarter and more connected experiences.
        </p>

      </div>

    </div>


    {/* =======================================================
        SERVICES
        ======================================================= */}

    <div>

      {([1, 2, 3, 4, 5, 6] as const).map((id, i) => {

        const isReverse = i % 2 !== 0;

        return (

          <div
            key={id}
            className={`
              relative
              py-20
              md:py-18
              lg:py-12
              ${i !== 0 ? 'border-t border-green-900/[0.07]' : ''}
            `}
          >

            {/* =================================================
                SECTION NUMBER
                ================================================= */}

            <div className="
              absolute
              left-0
              top-10
              md:top-16
              font-serif
              text-[7rem]
              md:text-[10rem]
              font-bold
              leading-none
              text-green-900/[0.025]
              pointer-events-none
              select-none
            ">
              {String(id).padStart(2, '0')}
            </div>


            {/* =================================================
                MAIN ROW
                ================================================= */}

            <div
              className={`
                relative
                grid
                lg:grid-cols-2
                gap-14
                lg:gap-24
                items-center
                ${isReverse ? 'lg:[&>*:first-child]:order-2' : ''}
              `}
            >

              {/* =================================================
                  TEXT
                  ================================================= */}

              <div className="relative">

                {/* Chapter indicator */}

                <div className="
                  flex
                  items-center
                  gap-4
                  mb-8
                ">

                  <span className="
                    text-[#D4AF37]
                    text-[.58rem]
                    font-black
                    uppercase
                    tracking-[.35em]
                  ">
                    Service {String(id).padStart(2, '0')}
                  </span>

                  <span className="
                    w-10
                    h-px
                    bg-[#D4AF37]
                  " />

                  <span className="
                    text-green-900/40
                    text-[.58rem]
                    font-black
                    uppercase
                    tracking-[.25em]
                  ">
                    {SVC_CATEGORY[i]}
                  </span>

                </div>


                {/* Title */}

                <h3 className="
                  rs
                  font-serif
                  text-3xl
                  md:text-4xl
                  lg:text-[3.1rem]
                  text-green-950
                  leading-[1.05]
                  tracking-tight
                  mb-7
                ">
                  {t(`svc.${id}.title` as 'svc.1.title')}
                </h3>


                {/* Description */}

                <p className="
                  rs
                  text-[#6B7280]
                  text-base
                  md:text-[1.05rem]
                  leading-[1.8]
                  max-w-xl
                  mb-9
                ">
                  {t(`svc.${id}.desc` as 'svc.1.desc')}
                </p>


                {/* Status */}

                <div className="
                  flex
                  items-center
                  gap-5
                  mb-10
                ">

                  {SVC_STATUS[i] === 'live' && (

                    <div className="
                      flex
                      items-center
                      gap-2
                      text-green-800
                      text-[.58rem]
                      font-black
                      uppercase
                      tracking-[.25em]
                    ">

                      <span className="
                        relative
                        flex
                        w-2
                        h-2
                      ">
                        <span className="
                          absolute
                          inset-0
                          rounded-full
                          bg-green-500
                          opacity-40
                          animate-ping
                        " />

                        <span className="
                          relative
                          w-2
                          h-2
                          rounded-full
                          bg-green-600
                        " />
                      </span>

                      {t('services_pg.badge.live')}

                    </div>

                  )}


                  {SVC_STATUS[i] === 'soon' && (

                    <div className="
                      text-gray-400
                      text-[.58rem]
                      font-black
                      uppercase
                      tracking-[.25em]
                    ">
                      {t('services_pg.badge.soon')}
                    </div>

                  )}

                </div>


                {/* CTA */}

                <Link
                  href={`/services/${SVC_SLUGS[i]}`}
                  className="
                    inline-flex
                    items-center
                    gap-4
                    group/link
                    text-green-950
                    text-[.72rem]
                    font-black
                    uppercase
                    tracking-[.2em]
                  "
                >

                  <span>
                    {t('services_pg.portfolio.viewDetails')}
                  </span>

                  <span className="
                    relative
                    flex
                    items-center
                    justify-center
                    w-11
                    h-11
                    rounded-full
                    border
                    border-green-900/15
                    transition-all
                    duration-500
                    group-hover/link:bg-[#D4AF37]
                    group-hover/link:border-[#D4AF37]
                    group-hover/link:translate-x-1
                  ">

                    <svg
                      className="
                        w-4
                        h-4
                        transition-transform
                        duration-500
                        group-hover/link:translate-x-0.5
                      "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>

                  </span>

                </Link>

              </div>


              {/* =================================================
                  VISUAL
                  ================================================= */}

              <Link
                href={`/services/${SVC_SLUGS[i]}`}
                className="
                  group
                  relative
                  block
                  min-h-[360px]
                  md:min-h-[440px]
                  lg:min-h-[500px]
                "
              >

                {/* Decorative gold orbit */}

                <div className="
                  absolute
                  -top-8
                  -right-8
                  w-28
                  h-28
                  rounded-full
                  border
                  border-[#D4AF37]/30
                  z-20
                  transition-transform
                  duration-700
                  group-hover:rotate-45
                ">

                  <span className="
                    absolute
                    left-1/2
                    -bottom-1
                    -translate-x-1/2
                    w-2
                    h-2
                    rounded-full
                    bg-[#D4AF37]
                  " />

                </div>


                {/* Image container */}

                <div className="
                  absolute
                  inset-0
                  overflow-hidden
                  bg-green-900/[0.04]
                "
                  style={{
                    clipPath:
                      i % 3 === 0
                        ? 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)'
                        : i % 3 === 1
                          ? 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)'
                          : 'polygon(0 0, 98% 2%, 100% 100%, 2% 98%)',
                  }}
                >

                  {/* =================================================
                      SERVICE IMAGE
                      Replace the paths below with your actual images
                      ================================================= */}

                  <img
                    src={`/services/service-${String(id).padStart(2, '0')}.png`}
                    alt={t(`svc.${id}.title` as 'svc.1.title')}
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-1000
                      group-hover:scale-105
                    "
                  />


                  {/* Dark green overlay */}

                  <div className="
                    absolute
                    inset-0
                    bg-green-950/[0.12]
                    transition-opacity
                    duration-700
                    group-hover:bg-green-950/[0.03]
                  " />


                  {/* Gold light */}

                  <div className="
                    absolute
                    -bottom-20
                    -right-20
                    w-72
                    h-72
                    rounded-full
                    bg-[#D4AF37]/10
                    blur-[70px]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-700
                  " />


                  {/* Image number */}

                  <div className="
                    absolute
                    bottom-8
                    left-8
                    font-serif
                    text-6xl
                    font-bold
                    text-white/90
                    leading-none
                    drop-shadow-lg
                  ">
                    {String(id).padStart(2, '0')}
                  </div>


                  {/* Explore */}

                  <div className="
                    absolute
                    bottom-8
                    right-8
                    w-12
                    h-12
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-green-950
                    opacity-0
                    translate-y-3
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition-all
                    duration-500
                  ">

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        d="M7 17L17 7M8 7h9v9"
                      />
                    </svg>

                  </div>

                </div>


                {/* Outer frame */}

                <div
                  className="
                    absolute
                    inset-0
                    border
                    border-[#D4AF37]/30
                    pointer-events-none
                  "
                  style={{
                    clipPath:
                      i % 3 === 0
                        ? 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)'
                        : i % 3 === 1
                          ? 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)'
                          : 'polygon(0 0, 98% 2%, 100% 100%, 2% 98%)',
                  }}
                />

              </Link>

            </div>


            {/* =====================================================
                CONNECTOR
                ===================================================== */}

            {i !== 5 && (
              <div className="
                hidden
                md:flex
                absolute
                left-1/2
                bottom-[-1px]
                -translate-x-1/2
                translate-y-1/2
                items-center
                justify-center
                w-8
                h-8
                bg-[#F9FAFB]
                z-20
              ">

                <div className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-[#D4AF37]
                " />

              </div>
            )}

          </div>

        );
      })}

    </div>


    {/* =======================================================
        CLOSING STATEMENT
        ======================================================= */}

    <div className="
      py-24
      md:py-32
      text-center
    ">

      <div className="
        flex
        items-center
        justify-center
        gap-4
        mb-6
      ">

        <span className="w-12 h-px bg-[#D4AF37]" />

        <span className="
          text-[.58rem]
          font-black
          uppercase
          tracking-[.35em]
          text-green-900/50
        ">
          One ecosystem
        </span>

        <span className="w-12 h-px bg-[#D4AF37]" />

      </div>


      <p className="
        font-serif
        text-2xl
        md:text-3xl
        text-green-950
      ">
        Technology designed around the way you work.
      </p>

    </div>

  </div>
</section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04. DEPLOYMENT LIFECYCLE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
  ref={s2 as React.RefObject<HTMLDivElement>}
  className="relative py-18 md:py-16 bg-[#0B1F3A] overflow-hidden"
>
  {/* =========================================================
      BACKGROUND
      ========================================================= */}

  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

    {/* Subtle technical grid */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,.15) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />

    {/* Green atmosphere */}
    <div className="
      absolute
      -top-28
      -right-48
      w-[650px]
      h-[650px]
      rounded-full
      bg-green-600/[0.07]
      blur-[140px]
    " />

    {/* Gold atmosphere */}
    <div className="
      absolute
      -bottom-48
      -left-48
      w-[600px]
      h-[600px]
      rounded-full
      bg-[#D4AF37]/[0.045]
      blur-[140px]
    " />

    {/* Large orbital ring */}
    <div className="
      absolute
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-[900px]
      h-[900px]
      rounded-full
      border
      border-[#D4AF37]/[0.05]
    " />

  </div>


  <div className="max-w-7xl mx-auto px-6 relative z-10">


    {/* =======================================================
        HEADER
        ======================================================= */}

    <div className="
      grid
      lg:grid-cols-[1fr_380px]
      gap-12
      items-end
      mb-24
      md:mb-32
    ">

      <div>

        <div className="rs section-kicker mb-7">

          <span className="section-kicker-line bg-[#D4AF37]" />

          <span className="text-white">
            {t('services_pg.process.kicker')}
          </span>

        </div>


        <h2 className="
          rs
          d1
          font-serif
          text-4xl
          md:text-5xl
          lg:text-[4.2rem]
          text-white
          leading-[1.02]
          tracking-tight
        ">

          {t('services_pg.process.title1')}

          <br />

          <span className="
            italic
            text-[#D4AF37]
          ">
            {t('services_pg.process.title2')}
          </span>

        </h2>

      </div>


      {/* Header description */}

      <div className="
        lg:border-l
        lg:border-[#D4AF37]/30
        lg:pl-7
      ">

        <div className="
          text-[#D4AF37]
          text-[.58rem]
          uppercase
          tracking-[.35em]
          font-black
          mb-4
        ">
          Our approach
        </div>

        <p className="
          rs
          d2
          text-white/45
          text-sm
          md:text-base
          leading-[1.8]
        ">
          From the first conversation to a system ready for
          real-world use, every stage is designed around clarity,
          collaboration and measurable results.
        </p>

      </div>

    </div>


    {/* =======================================================
        PROCESS JOURNEY
        ======================================================= */}

    <div className="relative">


      {/* =====================================================
          FLOWING CONNECTOR
          ===================================================== */}

      <div
        className="
          hidden
          md:block
          absolute
          top-[82px]
          left-[16.666%]
          right-[16.666%]
          h-px
          overflow-hidden
        "
      >

        {/* Base line */}

        <div className="
          absolute
          inset-0
          bg-white/10
        " />

        {/* Gold progress line */}

        <div className="
          absolute
          inset-y-0
          left-0
          w-full
          bg-gradient-to-r
          from-[#D4AF37]/20
          via-[#D4AF37]
          to-[#D4AF37]/20
          origin-left
          animate-[pulse_4s_ease-in-out_infinite]
        " />

      </div>


      {/* =====================================================
          STEPS
          ===================================================== */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-16
        md:gap-8
      ">

        {([1, 2, 3] as const).map((id, i) => (

          <div
            key={id}
            className={`
              rs
              d${i + 2}
              group
              relative
              text-center
              ${i === 1 ? 'md:translate-y-8' : ''}
            `}
          >

            {/* =================================================
                NUMBER / ICON
                ================================================= */}

            <div className="
              relative
              flex
              justify-center
              mb-12
            ">

              {/* Outer orbit */}

              <div className="
                absolute
                -inset-4
                rounded-full
                border
                border-[#D4AF37]/10
                transition-all
                duration-700
                group-hover:border-[#D4AF37]/35
                group-hover:scale-110
              " />

              {/* Main node */}

              <div className="
                relative
                w-[92px]
                h-[92px]
                rounded-full
                bg-[#102A4A]
                border
                border-white/10
                flex
                items-center
                justify-center
                transition-all
                duration-700
                group-hover:bg-[#D4AF37]
                group-hover:border-[#D4AF37]
                group-hover:scale-105
                shadow-[0_0_0_8px_rgba(255,255,255,0.015)]
              ">

                <div className="
                  text-white
                  group-hover:text-[#0B1F3A]
                  transition-colors
                  duration-500
                ">
                  {PROCESS_ICONS[i]}
                </div>


                {/* Number */}

                <div className="
                  absolute
                  -top-3
                  -right-3
                  w-7
                  h-7
                  rounded-full
                  bg-[#D4AF37]
                  text-[#0B1F3A]
                  text-[.58rem]
                  font-black
                  flex
                  items-center
                  justify-center
                  shadow-lg
                ">
                  0{id}
                </div>

              </div>

            </div>


            {/* =================================================
                STEP LABEL
                ================================================= */}

            <div className="
              flex
              items-center
              justify-center
              gap-3
              mb-5
            ">

              <span className="
                w-5
                h-px
                bg-[#D4AF37]/60
              " />

              <span className="
                text-[#D4AF37]
                text-[.56rem]
                uppercase
                tracking-[.35em]
                font-black
              ">
                Phase 0{id}
              </span>

              <span className="
                w-5
                h-px
                bg-[#D4AF37]/60
              " />

            </div>


            {/* =================================================
                TITLE
                ================================================= */}

            <h3 className="
              font-serif
              text-2xl
              md:text-[1.7rem]
              text-white
              mb-5
              leading-tight
              transition-colors
              duration-500
              group-hover:text-[#D4AF37]
            ">
              {t(`services_pg.process.${id}.t` as 'services_pg.process.1.t')}
            </h3>


            {/* =================================================
                DESCRIPTION
                ================================================= */}

            <p className="
              text-white/40
              text-[.85rem]
              leading-[1.8]
              max-w-[270px]
              mx-auto
              transition-colors
              duration-500
              group-hover:text-white/60
            ">
              {t(`services_pg.process.${id}.d` as 'services_pg.process.1.d')}
            </p>


            {/* =================================================
                MICRO DETAIL
                ================================================= */}

            <div className="
              mt-8
              flex
              justify-center
              items-center
              gap-2
              opacity-40
              group-hover:opacity-100
              transition-opacity
              duration-500
            ">

              <span className="
                w-1
                h-1
                rounded-full
                bg-[#D4AF37]
              " />

              <span className="
                text-[.52rem]
                uppercase
                tracking-[.3em]
                font-black
                text-white/50
              ">
                Sanothimi Technology
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>


    {/* =======================================================
        TRUST STRIP
        ======================================================= */}

    <div className="
      rs
      d5
      mt-28
      md:mt-36
      pt-8
      border-t
      border-white/10
    ">

      <div className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-8
      ">


        {/* Label */}

        <div>

          <div className="
            text-[.55rem]
            uppercase
            tracking-[.35em]
            font-black
            text-[#D4AF37]
            mb-2
          ">
            Built for confidence
          </div>

          <p className="
            text-white/35
            text-xs
          ">
            Reliable systems from planning to production.
          </p>

        </div>


        {/* Indicators */}

        <div className="
          flex
          flex-wrap
          gap-x-8
          gap-y-4
        ">

          {[
            'Zero Data Loss',
            '99.9% Uptime SLA',
            '24/7 Support',
            'Free Migration',
          ].map((item) => (

            <div
              key={item}
              className="
                flex
                items-center
                gap-2.5
                text-white/45
                text-[.65rem]
                font-bold
              "
            >

              <span className="
                w-5
                h-5
                rounded-full
                border
                border-[#D4AF37]/30
                flex
                items-center
                justify-center
              ">

                <svg
                  className="w-2.5 h-2.5 text-[#D4AF37]"
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

              {item}

            </div>

          ))}

        </div>

      </div>

    </div>


    {/* =======================================================
        BOTTOM GOLD DETAIL
        ======================================================= */}

    <div className="
      mt-16
      flex
      items-center
      justify-center
      gap-4
      opacity-40
    ">

      <span className="
        w-16
        h-px
        bg-gradient-to-r
        from-transparent
        to-[#D4AF37]
      " />

      <span className="
        w-1.5
        h-1.5
        rotate-45
        bg-[#D4AF37]
      " />

      <span className="
        w-16
        h-px
        bg-gradient-to-l
        from-transparent
        to-[#D4AF37]
      " />

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
