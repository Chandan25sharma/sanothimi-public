'use client';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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

const SVC_BULLETS = [
  ['Automated Fee Collection', 'Exam & Result Management', 'Parent Portal', 'Digital Attendance'],
  ['Localized VAT Reporting', 'Cloud Ledger Sync', 'Multi-User Control', 'Financial Statements'],
  ['Multi-Warehouse Sync', 'Automated Reordering', 'Barcode System', 'Stock Analytics'],
  ['Real-time KPI Dashboards', 'Trend Analysis', 'Custom Reports', 'Market Insights'],
  ['Automated Salary', 'Attendance Tracking', 'Performance Reviews', 'Digital Vault'],
  ['Custom API Integration', 'Web Applications', 'System Migration', '24/7 Support'],
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
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01. CINEMATIC HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative pt-48 pb-44 bg-[#000E22] overflow-hidden">

        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#EE2B47]/8 rounded-full blur-[120px] glow-orb" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#001C44]/60 rounded-full blur-[100px]" />
        </div>

        <div className="absolute inset-0 bg-pattern-dark pointer-events-none" />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-end opacity-[0.025] pointer-events-none select-none overflow-hidden">
          <img src="/logo-no-background.png" alt="" className="w-[55%] h-auto object-contain transform rotate-[-6deg]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#EE2B47]/10 border border-[#EE2B47]/25 rounded-full mb-12 backdrop-blur-sm">
            <span className="live-dot live-dot-red" />
            <span className="text-[#EE2B47] text-[.65rem] font-black uppercase tracking-[.3em]">
              {t('services_pg.hero.kicker')}
            </span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-white leading-[1.0] tracking-tighter">
            {t('services_pg.hero.title1')}<br />
            <span className="italic text-grad">{t('services_pg.hero.title2')}</span>
          </h1>

          <p className="text-white/35 text-lg md:text-xl max-w-2xl leading-relaxed mt-10">
            Enterprise-grade software solutions designed for the unique institutional landscape of Nepal and beyond.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent" />
      </div>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02. DISCOVERY BAR
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white border-b border-gray-100 relative z-10 -mt-16">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-wrap justify-between items-center gap-12">
          <div className="max-w-xs">
            <h2 className="font-serif text-3xl text-[#001C44] leading-tight">
              {t('services_pg.disco.title')}
            </h2>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            {([1, 2, 3] as const).map((id) => (
              <div key={id} className="group">
                <div className="text-[9px] uppercase tracking-[0.3em] text-[#EE2B47] font-black mb-2">
                  {t(`services_pg.disco.${id}.label` as 'services_pg.disco.1.label')}
                </div>
                <div className="text-xl font-serif font-bold text-[#001C44] group-hover:text-[#EE2B47] transition-colors">
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
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-32 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <div className="rs section-kicker mb-8">
              <span className="section-kicker-line" />
              {t('services_pg.portfolio.kicker')}
            </div>
            <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15] mb-8">
              {t('services_pg.portfolio.title1')}<br />
              <span className="text-[#EE2B47] italic">{t('services_pg.portfolio.title2')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {([1, 2, 3, 4, 5, 6] as const).map((id, i) => (
              <div
                key={id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`rs d${(i % 2) + 2} group svc-premium relative flex flex-col h-full cursor-default`}
              >
                {/* Service number watermark */}
                <div className="absolute top-8 right-10 font-serif text-[5rem] font-bold text-gray-50 leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-[#EE2B47]/5">
                  0{id}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#F9FAFB] group-hover:bg-[#EE2B47] flex items-center justify-center text-[#001C44] group-hover:text-white mb-10 transition-all duration-500 relative z-10">
                  {SVC_ICONS[i]}
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-3xl text-[#001C44] mb-5 leading-tight relative z-10">
                  {t(`svc.${id}.title` as 'svc.1.title')}
                </h3>

                {/* Description */}
                <p className="text-[#6B7280] text-base leading-relaxed mb-10 relative z-10">
                  {t(`svc.${id}.desc` as 'svc.1.desc')}
                </p>

                {/* Bullets */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10 relative z-10">
                  {SVC_BULLETS[i].map((b) => (
                    <li key={b} className="flex items-center gap-3 text-[#6B7280] text-[.82rem] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA buttons */}
                <div className="mt-auto pt-8 border-t border-gray-100 flex flex-wrap gap-4 relative z-10">
                  <Link
                    href="/contact"
                    className="flex-1 min-w-[130px] text-center bg-[#001C44] text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-[#EE2B47] transition-all duration-500"
                  >
                    {t('services_pg.portfolio.cta1')}
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 min-w-[130px] text-center border-2 border-gray-100 text-[#001C44] px-6 py-3.5 rounded-full font-bold text-sm hover:border-[#EE2B47] hover:text-[#EE2B47] transition-all duration-500"
                  >
                    {t('services_pg.portfolio.cta2')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04. DEPLOYMENT LIFECYCLE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={s2 as React.RefObject<HTMLDivElement>} className="py-32 bg-[#000E22] relative overflow-hidden">
        {/* Decorative S watermark */}
        <div className="absolute top-0 right-0 opacity-[0.015] text-white text-[28rem] font-serif leading-none select-none pointer-events-none">
          S
        </div>
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="max-w-2xl mx-auto mb-20">
            <div className="rs section-kicker justify-center mb-8">
              <span className="section-kicker-line" />
              {t('services_pg.process.kicker')}
              <span className="section-kicker-line" />
            </div>
            <h2 className="rs d1 font-serif text-4xl md:text-5xl text-white leading-[1.2] mb-6">
              {t('services_pg.process.title1')}{' '}
              <br /><span className="italic text-[#EE2B47]">{t('services_pg.process.title2')}</span>
            </h2>
            <p className="rs d2 text-white/40 text-lg leading-relaxed">
              From first conversation to live deployment — we handle every detail of your digital transformation.
            </p>
          </div>

          {/* Process steps with connecting arrows */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-[#EE2B47]/50 via-[#EE2B47]/30 to-[#EE2B47]/50" />

            {([1, 2, 3] as const).map((id, i) => (
              <div
                key={id}
                className={`rs d${i + 2} group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-center hover:border-[#EE2B47]/40 hover:bg-white/[0.08] transition-all duration-500`}
              >
                {/* Step number circle */}
                <div className="relative w-16 h-16 rounded-full bg-[#001C44] border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-[#EE2B47] group-hover:border-[#EE2B47] transition-all duration-500 shadow-xl">
                  <div className="text-white group-hover:text-white transition-colors">
                    {PROCESS_ICONS[i]}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#EE2B47] text-white text-[10px] font-black flex items-center justify-center">
                    0{id}
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-white mb-4 leading-tight">
                  {t(`services_pg.process.${id}.t` as 'services_pg.process.1.t')}
                </h3>
                <p className="text-white/40 text-[.9rem] leading-relaxed max-w-[220px] mx-auto group-hover:text-white/60 transition-colors">
                  {t(`services_pg.process.${id}.d` as 'services_pg.process.1.d')}
                </p>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="rs d5 mt-20 inline-flex flex-wrap items-center justify-center gap-8 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            {['Zero Data Loss', '99.9% Uptime SLA', '24/7 Support', 'Free Migration'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-white/50 text-[.75rem] font-bold">
                <svg className="w-4 h-4 text-[#EE2B47]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                {item}
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
