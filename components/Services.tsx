'use client';
import { services } from '@/data/portfolio';
import { useEffect, useRef } from 'react';
import { useLanguage, TranslationKey } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="py-28" style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)' }} ref={ref} aria-label="Services section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="badge-label mb-4">{t('nav.services')}</div>
            <h2 className="font-display text-4xl xl:text-5xl text-[#050d1a] leading-tight">
              {t('about.title1')} <span className="text-gradient">Smart Solutions</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-slate-500 leading-relaxed">
              {t('about.desc2')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={s.id} className={`reveal d${i % 3 + 1} svc-card`}>
              <div className="svc-icon-wrap w-16 h-16 rounded-2xl bg-[#c9a84c]/10 flex items-center justify-center text-3xl mb-6 transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="svc-title font-semibold text-[#050d1a] text-[1.05rem] mb-3 transition-colors duration-300">
                {t(`svc.${s.id}.title` as TranslationKey)}
              </h3>
              <p className="svc-desc text-slate-500 text-[0.85rem] leading-relaxed mb-6 transition-colors duration-300">
                {t(`svc.${s.id}.desc` as TranslationKey)}
              </p>
              <div className="svc-link flex items-center gap-2 text-[#0d9488] text-sm font-bold tracking-wide transition-colors duration-300">
                {t('nav.about')} →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
