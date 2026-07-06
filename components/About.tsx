'use client';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  
  const WHY = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      ),
      title: t('about.why.1.title'),
      desc: t('about.why.1.desc'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
      ),
      title: t('about.why.2.title'),
      desc: t('about.why.2.desc'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: t('about.why.3.title'),
      desc: t('about.why.3.desc'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: t('about.why.4.title'),
      desc: t('about.why.4.desc'),
    },
  ];

  const CERTS = ['SchoolSathi™', 'FinanceFlow', 'BizSuite', 'CloudSec Certified', 'SaaS Excellence'];

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); });
    }, { threshold: 0.09 });
    ref.current?.querySelectorAll('.rv').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 bg-white" ref={ref} aria-label="About section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Top: Who I am ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-24">
          {/* Visual */}
          <div className="rv relative">
            <div className="relative group perspective-1000">
              <div className="relative z-10 w-full h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#00122B]/40 backdrop-blur-3xl">
                <div className="absolute inset-0 opacity-25 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700">
                   <img src="/image-2.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-[#00122B]/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border border-white/05 rounded-full flex items-center justify-center text-white/05 text-9xl font-bold">ST</div>
                </div>
                <div className="absolute bottom-8 left-8 pb-4 border-b border-white/10 w-[70%] z-20">
                  <div className="text-[.6rem] font-bold text-[#D4AF37] uppercase tracking-[.3em] mb-1">Global Standard</div>
                  <h4 className="text-white font-serif text-2xl">Precision Engineering</h4>
                </div>
              </div>
              <div className="absolute -inset-10 opacity-20 pointer-events-none">
                 <img src="/image-2.png" alt="" className="w-full h-full object-cover blur-3xl" />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#D32F2F]/20 blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#D4AF37]/10 blur-3xl" />
            </div>

            {/* Red badge */}
            <div className="absolute -bottom-5 -right-5 w-36 h-36 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl float-y z-20"
              style={{ background:'linear-gradient(135deg,#D32F2F,#A00E2C)', boxShadow:'0 20px 40px rgba(211,47,47,.4)' }}>
              <strong className="font-display text-4xl text-white font-bold leading-none">50+</strong>
              <span className="text-white/80 text-[.65rem] font-bold uppercase tracking-wider mt-1">Institutions<br/>Digitized</span>
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="rv kicker">{t('about.kicker')}</div>
            <h2 className="rv d1 font-display text-4xl xl:text-5xl text-[#0a1628] leading-[1.1] mb-5">
              {t('about.title1')}<br/>
              <span className="text-grad">{t('about.title2')}</span>
            </h2>
            <p className="rv d2 text-slate-500 leading-relaxed text-[1rem] mb-4">
              {t('about.desc1')}
            </p>
            <p className="rv d2 text-slate-500 leading-relaxed text-[1rem] mb-7">
              {t('about.desc2')}
            </p>
            {/* Certs */}
            <div className="rv d3 flex flex-wrap gap-2 mb-8">
              {CERTS.map((c) => (
                <span key={c} className="text-[.75rem] font-bold text-[#0D47A1] bg-[#D32F2F]/10 border border-[#D32F2F]/25 px-3.5 py-1.5 rounded-full">
                  ✓ {c}
                </span>
              ))}
            </div>
            <div className="rv d4 flex flex-wrap gap-3">
              <a href="#contact" onClick={(e)=>{e.preventDefault();document.querySelector<HTMLElement>('#contact')?.scrollIntoView({behavior:'smooth'})}} className="btn-primary px-6 py-3.5 rounded-2xl flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                {t('nav.getStarted')}
              </a>
              <a href="/contact" className="btn-dark px-6 py-3.5 rounded-2xl flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
                {t('about.cta.contact')}
              </a>
            </div>
          </div>
        </div>

        <div className="rv">
          <div className="kicker center justify-center">{t('about.why.kicker')}</div>
          <h3 className="text-center font-display text-3xl xl:text-4xl text-[#0a1628] mb-10">
            {t('about.why.title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY.map((w, i) => (
              <div key={w.title} className={`rv d${i+1} why-row`}>
                <div className="w-12 h-12 rounded-2xl bg-[#D32F2F]/10 border border-[#D32F2F]/20 flex items-center justify-center text-2xl shrink-0 text-[#D32F2F]">
                  {w.icon}
                </div>
                <div>
                  <strong className="block text-[.96rem] text-[#0a1628] font-bold mb-1">{w.title}</strong>
                  <p className="text-slate-500 text-[.83rem] leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
