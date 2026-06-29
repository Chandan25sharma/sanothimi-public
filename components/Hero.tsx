'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const started = useRef(false);

  const COUNTERS = [
    { label: t('hero.stat.uptime'), val: 99, suf: '%' },
    { label: t('hero.stat.institutions'), val: 50, suf: '+' },
    { label: t('hero.stat.efficiency'), val: 45, suf: '%' },
    { label: t('hero.stat.users'), val: 10, suf: 'K+', pre: '' },
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      COUNTERS.forEach(({ val }, i) => {
        const dur = 2200;
        const step = val / (dur / 16);
        let cur = 0;
        const id = setInterval(() => {
          cur = Math.min(cur + step, val);
          setCounts((prev) => { const n = [...prev]; n[i] = Math.floor(cur); return n; });
          if (cur >= val) clearInterval(id);
        }, 16);
      });
    }, 800);
    return () => clearTimeout(t);
  }, [t]); // Added t to dependencies as it may change on lang switch

  const goto = (id: string) => {
    const el = document.querySelector<HTMLElement>(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section id="hero" aria-label="Hero" className="hero-section min-h-screen flex items-center">
      <div className="hero-grid-bg" aria-hidden="true" />

      {/* Glow orbs & Glassy Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-[800px] h-[600px] opacity-10 blur-[100px] pointer-events-none">
          <img src="/image-1.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="hero-glow w-[600px] h-[600px] -top-60 -left-60 bg-[#EE2B47]/07" />
        <div className="hero-glow w-[500px] h-[500px] top-1/4 right-[-10%] bg-[#001C44]/20" />
        <div className="hero-glow w-[400px] h-[400px] bottom-0 left-[30%] bg-[#EE2B47]/05" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-28 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── LEFT ── */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="ha1 inline-flex items-center gap-2.5 mb-8 bg-[#EE2B47]/12 border border-[#EE2B47]/25 text-[#EE2B47] text-[.72rem] font-bold tracking-[.18em] uppercase px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47] animate-pulse" />
              {t('hero.badge')}
            </div>

            {/* Headline */}
            <h1 className="ha2 font-display leading-[1.07]">
              <span className="block text-white text-5xl xl:text-[3.6rem] font-bold xl:font-extrabold">{t('hero.title1')}</span>
              <span className="block text-5xl xl:text-[3.6rem] font-bold xl:font-extrabold text-white mt-1">
                <span className="text-grad">Sanothimi</span> <span className="text-grad-gold">{t('hero.title2')}</span>
              </span>
            </h1>

            <p className="ha3 text-white/50 text-lg leading-relaxed mt-6 mb-4">
              {t('hero.desc1')}
            </p>
            <p className="ha3 text-white/40 text-base leading-relaxed mb-10">
              {t('hero.desc2')}
            </p>

            {/* CTAs */}
            <div className="ha4 flex flex-wrap gap-4 mb-12">
              <button onClick={() => goto('#contact')} className="btn-primary px-7 py-4 rounded-2xl text-base shadow-2xl">
                🚀 {t('hero.cta.trial')}
              </button>
              <button onClick={() => goto('#services')} className="btn-ghost px-7 py-4 rounded-2xl text-base">
                {t('hero.cta.solutions')}
              </button>
            </div>

            {/* Counter row */}
            <div className="ha5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COUNTERS.map(({ label, suf, pre = '' }, i) => (
                <div key={label} className="stat-chip">
                  <div className="font-display font-bold text-[1.7rem] leading-none text-grad mb-1">
                    {pre}{counts[i]}{suf}
                  </div>
                  <div className="text-white/35 text-[.65rem] font-semibold uppercase tracking-wider leading-tight">{label}</div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="ha6 flex items-center gap-4 mt-8 pt-7 border-t border-white/07">
              <div className="flex -space-x-2.5">
                {['SM','RK','LP','DW','AB'].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#001C44] bg-gradient-to-br from-[#001C44] to-[#000E22] flex items-center justify-center text-[.6rem] font-bold text-[#D4AF37]">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[#EE2B47] text-sm tracking-wide">★★★★★</div>
                <div className="text-white/35 text-xs mt-0.5">{t('hero.socialProof')}</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Brand Image visual ── */}
          <div className="hidden xl:flex justify-center items-center">
            <div className="relative group">
              {/* Decorative rings */}
              <div className="absolute -inset-4 border border-[#D4AF37]/20 rounded-[2.5rem] animate-spin-slow opacity-20" />
              <div className="absolute -inset-8 border border-[#EE2B47]/10 rounded-[3rem] animate-reverse-spin opacity-10" />

              {/* Main brand card */}
              <div className="relative z-10 w-[420px] h-[520px] rounded-[2rem] overflow-hidden bg-[#001C44]/20 backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-[#EE2B47]/10">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                   <img src="/image-1.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-[#001C44]/40 mix-blend-overlay" />
                
                <div className="h-full flex flex-col justify-center items-center p-12 text-center relative z-20">
                  <div className="text-white/10 text-[12rem] font-bold absolute pointer-events-none">S</div>
                </div>
                
                {/* Bottom label Overlay */}
                <div className="w-full bg-gradient-to-t from-[#000E22] via-[#000E22]/80 to-transparent px-8 py-7 absolute bottom-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-10 bg-[#EE2B47] rounded-full" />
                    <div>
                      <div className="font-bold text-white text-xl tracking-tight">Sanothimi Technologies</div>
                      <div className="text-[#D4AF37] text-xs font-bold tracking-[.15em] uppercase">Enterprise SaaS · Nepal</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="float-badge -top-8 -left-12 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl" style={{ animationDelay: '0s' }}>
                <div className="w-10 h-10 rounded-xl bg-[#EE2B47]/20 flex items-center justify-center text-xl">🏆</div>
                <div className="pr-2">
                  <div className="text-[.6rem] text-[#D4AF37] font-bold uppercase tracking-widest">Excellence</div>
                  <div className="text-sm font-bold text-white">#1 in Nepal</div>
                </div>
              </div>

              <div className="float-badge -bottom-8 -right-8 bg-[#000E22]/80 backdrop-blur-xl border border-white/10 shadow-2xl" style={{ animationDelay: '1.5s' }}>
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-xl">⚡</div>
                <div className="pr-2">
                  <div className="text-[.6rem] text-[#EE2B47] font-bold uppercase tracking-widest">Speed</div>
                  <div className="text-sm font-bold text-white">45% Faster</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <button onClick={() => goto('#about')} className="flex flex-col items-center gap-2 text-white/25 hover:text-[#EE2B47]/60 transition-colors scroll-bounce" aria-label="Scroll down">
          <span className="text-[.6rem] tracking-[.3em] uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
