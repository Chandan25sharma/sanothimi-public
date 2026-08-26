'use client';
import { Himalaya, Lattice, Mandala, NepalSun, NetworkGraph } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/lib/translations';
import Link from 'next/link';
import { useEffect, useRef, type ReactNode } from 'react';

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

export interface ServiceCapability {
  title: string;
  desc: string;
}

export interface ServicePageData {
  category: string;
  status: 'live' | 'soon' | null;
  icon: ReactNode;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  highlights: [string, string, string];
  capabilities: ServiceCapability[];
  panelKicker: string;
  panelTitle: string;
  panelDesc: string;
  ctaTitle: string;
  ctaSub: string;
}

export default function ServicePageLayout({ data }: { data: ServicePageData }) {
  const { t } = useLanguage();
  const s1 = useReveal();
  const s2 = useReveal();

  return (
    <main>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01. HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative pt-28 pb-24 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <NetworkGraph className="absolute inset-0 w-full h-full" />
          <Mandala className="absolute -top-24 -right-24 w-[540px] h-[540px] text-[#0B1F3A] opacity-[0.06]" />
          <NepalSun className="absolute top-1/2 -translate-y-1/2 -left-20 w-[320px] h-[320px] text-[#155EEF] opacity-[0.05]" />
          <Lattice className="absolute inset-0 w-full h-full text-[#0B1F3A] opacity-[0.018]" size={48} />
          <Himalaya className="absolute bottom-0 left-0 w-full text-[#0B1F3A] opacity-[0.04]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center mx-auto mb-8">
            {data.icon}
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Link href="/services" className="text-[#155EEF] text-[.7rem] font-black uppercase tracking-[.3em] hover:opacity-70 transition-opacity">
              {data.category}
            </Link>
            {data.status === 'live' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-[.6rem] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {t('services_pg.badge.live')}
              </span>
            )}
            {data.status === 'soon' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[.6rem] font-black uppercase tracking-widest">
                {t('services_pg.badge.soon')}
              </span>
            )}
          </div>

          <h1 className="font-serif text-[2.2rem] sm:text-5xl md:text-6xl text-[#0B1F3A] leading-[1.1] tracking-tight mb-8">
            {t(data.titleKey)}
          </h1>

          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            {t(data.descKey)}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/contact"
              style={{ '--pixel-color': '#0B1F3A', '--pixel-text-hover': '#fff' } as React.CSSProperties}
              className="btn-pixel-solid inline-flex items-center gap-2 bg-[#12B76A] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors"
            >
              <span className="relative z-10">{t('services_pg.portfolio.cta1')}</span>
            </Link>
            <Link
              href="/demo"
              style={{ '--pixel-color': '#155EEF' } as React.CSSProperties}
              className="btn-pixel-outline inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm !border-gray-200 transition-colors"
            >
              <span className="relative z-10">{t('services_pg.portfolio.cta2')}</span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-14 gap-y-4 pt-10 border-t border-gray-100 max-w-2xl mx-auto">
            {data.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-[.72rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02. CAPABILITIES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-28 md:py-32 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="rs section-kicker mb-8">
              <span className="section-kicker-line" />
              What&apos;s Included
            </div>
            <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#0B1F3A] leading-[1.2]">
              Built for how your <span className="italic text-[#155EEF]">team actually works.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.capabilities.map((c, i) => (
              <div
                key={c.title}
                className={`rs d${i + 1} group p-7 rounded-2xl bg-white border border-gray-100 hover:border-[#155EEF]/20 hover:shadow-[0_20px_40px_rgba(11,31,58,0.06)] transition-all duration-300`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B1F3A]/5 group-hover:bg-[#12B76A] flex items-center justify-center text-[#0B1F3A] group-hover:text-white mb-6 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0B1F3A] mb-3">{c.title}</h3>
                <p className="text-[#6B7280] text-[.85rem] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03. PANEL
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={s2 as React.RefObject<HTMLDivElement>} className="py-28 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rs relative rounded-[2.5rem] bg-[#0B1F3A] overflow-hidden p-12 md:p-16 lg:p-20 text-center">
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#155EEF]/10 blur-[100px]" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#12B76A]/10 blur-[100px]" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="text-[#155EEF] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
                {data.panelKicker}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-white leading-[1.2] mb-6">
                {data.panelTitle}
              </h3>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                {data.panelDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner title={data.ctaTitle} sub={data.ctaSub} cta="Get Started" />
    </main>
  );
}
