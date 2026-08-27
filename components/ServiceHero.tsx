'use client';
import { Himalaya, Lattice, Mandala, NepalSun } from '@/components/BgDecorations';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/lib/translations';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  category: string;
  status: 'live' | 'soon' | null;
  icon: ReactNode;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  highlights: string[];
  heroImage?: string;
}

function StatusBadge({ status }: { status: 'live' | 'soon' | null }) {
  const { t } = useLanguage();
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-[.6rem] font-black uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        {t('services_pg.badge.live')}
      </span>
    );
  }
  if (status === 'soon') {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[.6rem] font-black uppercase tracking-widest">
        {t('services_pg.badge.soon')}
      </span>
    );
  }
  return null;
}

export default function ServiceHero({ category, status, icon, titleKey, descKey, highlights, heroImage }: Props) {
  const { t } = useLanguage();

  if (heroImage) {
    return (
      <div className="relative pt-10 pb-10 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <Mandala className="absolute -top-24 -right-24 w-[540px] h-[540px] text-[#0B1F3A] opacity-[0.16]" />
          <NepalSun className="absolute bottom-0 -left-20 w-[300px] h-[300px] text-[#155EEF] opacity-[0.15]" />
          <Lattice className="absolute inset-0 w-full h-full text-[#0B1F3A] opacity-[0.018]" size={48} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-14 lg:gap-11 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                
                <Link href="/services" className="text-Black text-[.7rem] font-black uppercase tracking-[.3em] hover:opacity-70 transition-opacity">
                  {category}
                </Link>
             
              </div>

              <h1 className="font-serif text-[2.2rem] sm:text-5xl md:text-[3.4rem] text-[#0B1F3A] leading-[1.1] tracking-tight mb-6">
                {t(titleKey)}
              </h1>

              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                {t(descKey)}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-12">
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

              <div className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t border-gray-100">
                {highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-[.72rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#155EEF]/[0.06] to-[#12B76A]/[0.06] -z-10" />
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_30px_80px_rgba(11,31,58,0.12)] bg-white">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#F9FAFB] border-b border-gray-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                </div>
                <img src={heroImage} alt={t(titleKey)} className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-28 pb-24 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <Mandala className="absolute -top-24 -right-24 w-[540px] h-[540px] text-[#0B1F3A] opacity-[0.16]" />
        <NepalSun className="absolute top-1/2 -translate-y-1/2 -left-20 w-[320px] h-[320px] text-[#155EEF] opacity-[0.15]" />
        <Lattice className="absolute inset-0 w-full h-full text-[#0B1F3A] opacity-[0.018]" size={48} />
        <Himalaya className="absolute bottom-0 left-0 w-full text-[#0B1F3A] opacity-[0.24]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center mx-auto mb-8">
          {icon}
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <Link href="/services" className="text-[#155EEF] text-[.7rem] font-black uppercase tracking-[.3em] hover:opacity-70 transition-opacity">
            {category}
          </Link>
          <StatusBadge status={status} />
        </div>

        <h1 className="font-serif text-[2.2rem] sm:text-5xl md:text-6xl text-[#0B1F3A] leading-[1.1] tracking-tight mb-8">
          {t(titleKey)}
        </h1>

        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          {t(descKey)}
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
          {highlights.map((h) => (
            <div key={h} className="flex items-center gap-2 text-[.72rem] font-bold uppercase tracking-[.15em] text-[#0B1F3A]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
              {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
