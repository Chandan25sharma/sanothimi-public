'use client';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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
  { year: '2019', title: 'Company Founded', desc: 'Sanothimi Private Limited was incorporated in Bhaktapur with a mission to digitize Nepal\'s institutions through world-class SaaS.' },
  { year: '2020', title: 'SchoolSathi Launch', desc: 'Released our flagship educational ERP to 5 pioneering schools — automating admissions, fee management, and attendance.' },
  { year: '2021', title: 'Financial Suite', desc: 'Expanded into cloud-based, VAT-compliant accounting solutions purpose-built for enterprises and SMEs across Nepal.' },
  { year: '2022', title: 'Enterprise Scale', desc: 'Onboarded 25+ institutions and introduced Business Intelligence dashboards with real-time KPI monitoring.' },
  { year: '2025', title: '10K+ Daily Users', desc: 'Now serving 10,000+ active users across educational, financial, and enterprise verticals — with 99.9% uptime.' },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const sTimeline = useReveal();

  const c0 = useCounter(5, 0);
  const c1 = useCounter(10, 200);
  const c2 = useCounter(99, 400);
  const c3 = useCounter(50, 600);

  return (
    <main>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01. CINEMATIC HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative pt-48 pb-44 bg-[#000E22] overflow-hidden">

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#EE2B47]/8 rounded-full blur-[130px] glow-orb" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#001C44]/60 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-[#D4AF37]/6 rounded-full blur-[80px]" />
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0 bg-pattern-dark opacity-100 pointer-events-none" />

        {/* Watermark logo */}
        <div className="absolute inset-0 flex items-center justify-end opacity-[0.025] pointer-events-none select-none overflow-hidden">
          <img src="/logo-no-background.png" alt="" className="w-[55%] h-auto object-contain transform rotate-[-8deg]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Live kicker */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#EE2B47]/10 border border-[#EE2B47]/25 rounded-full mb-12 backdrop-blur-sm">
            <span className="live-dot live-dot-red" />
            <span className="text-[#EE2B47] text-[.65rem] font-black uppercase tracking-[.3em]">
              {t('about_pg.mission.kicker')}
            </span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-white leading-[1.0] tracking-tighter mb-8">
            {t('about_pg.mission.title1')}<br />
            <span className="italic text-grad">{t('about_pg.mission.title2')}</span>
          </h1>

          <p className="text-white/35 text-lg md:text-xl max-w-2xl leading-relaxed mt-10">
            Nepal&apos;s premier SaaS engineering hub — digitizing institutions with enterprise-grade cloud infrastructure and human-centred design.
          </p>

          {/* Quick stats ribbon */}
          <div className="mt-20 flex flex-wrap gap-x-16 gap-y-6">
            {[
              { val: '5+', label: 'Years Operating' },
              { val: '10K+', label: 'Active Users' },
              { val: '99.9%', label: 'Uptime SLA' },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-white">{s.val}</span>
                <span className="text-[.6rem] font-black uppercase tracking-[.25em] text-white/30">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave into white */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent" />
      </div>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02. MISSION & VALUES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-32 bg-white relative z-10 -mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Story */}
            <div className="rs">
              <div className="section-kicker mb-8">
                <span className="section-kicker-line" />
                {t('about_pg.values.kicker')}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.2] mb-10">
                {t('about_pg.values.title1')}{' '}
                <span className="italic text-[#EE2B47]">{t('about_pg.values.title2')}</span>
              </h2>
              <div className="space-y-5 text-[#6B7280] text-lg leading-relaxed mb-12">
                <p>{t('about_pg.values.desc1')}</p>
                <p>{t('about_pg.values.desc2')}</p>
              </div>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-3 mb-12">
                {([
                  t('about_pg.values.feat1'),
                  t('about_pg.values.feat2'),
                  t('about_pg.values.feat3'),
                  t('about_pg.values.feat4'),
                ] as string[]).map((c) => (
                  <span key={c} className="feat-tag">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47]" />
                    {c}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 bg-[#EE2B47] text-white px-10 py-4 rounded-full font-bold hover:bg-[#001C44] transition-all duration-500 shadow-xl shadow-[#EE2B47]/20"
              >
                {t('about_pg.values.cta')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {/* Visual */}
            <div className="rs d2 relative">
              <div className="aspect-square rounded-[3rem] bg-[#001C44] overflow-hidden flex items-center justify-center p-16 relative shimmer-card">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,#EE2B4712,transparent_65%)]" />
                <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
                  <img src="/logo-no-background.png" alt="" className="w-full h-full object-contain scale-150" />
                </div>
                <img
                  src="/logo-no-background.png"
                  alt="Sanothimi"
                  className="relative z-10 w-3/4 h-auto object-contain opacity-90 drop-shadow-2xl float-y"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-white border border-gray-100 rounded-full flex flex-col items-center justify-center text-center p-6 shadow-2xl shadow-[#001C44]/10">
                <div className="text-3xl font-serif font-bold text-[#EE2B47] mb-1">{t('about_pg.stats.1.val')}+</div>
                <div className="text-[8px] font-black uppercase tracking-widest text-[#001C44] leading-tight">{t('about_pg.values.exp')}</div>
              </div>
              {/* Second badge */}
              <div className="absolute -top-6 -left-6 bg-[#EE2B47] text-white p-5 rounded-2xl shadow-xl shadow-[#EE2B47]/30 flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                <div>
                  <div className="text-[8px] font-black uppercase tracking-widest opacity-80">Verified</div>
                  <div className="text-xs font-bold">ISO Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03. INNOVATION MODULES (dark)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={s4 as React.RefObject<HTMLDivElement>} className="py-40 bg-[#000E22] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#EE2B47]/7 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="rs inline-flex items-center gap-3 px-6 py-2.5 bg-[#EE2B47] rounded-full text-white text-[10px] font-black uppercase tracking-[.3em] mb-10 shadow-2xl shadow-[#EE2B47]/30">
              <span className="live-dot" style={{ background: 'rgba(255,255,255,0.8)' }} />
              {t('about_pg.innov.kicker')}
            </div>
            <h2 className="rs d1 font-serif text-5xl md:text-7xl text-white leading-[1.1] mb-8 tracking-tight">
              {t('about_pg.innov.title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">
                {t('about_pg.innov.title2')}
              </span>
            </h2>
            <p className="rs d2 text-white/40 text-xl leading-relaxed">
              {t('about_pg.innov.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {([
              { t: t('about_pg.innov.1.t') as string, d: t('about_pg.innov.1.d') as string, i: '01' },
              { t: t('about_pg.innov.2.t') as string, d: t('about_pg.innov.2.d') as string, i: '02' },
              { t: t('about_pg.innov.3.t') as string, d: t('about_pg.innov.3.d') as string, i: '03' },
            ]).map((item, i) => (
              <div
                key={i}
                className={`rs d${i + 3} group relative p-12 rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden hover:border-[#EE2B47]/40 hover:bg-white/[0.07] transition-all duration-700 cursor-default shimmer-card`}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#EE2B47]/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out" />
                <div className="relative z-10">
                  <div className="text-[10px] font-black text-[#EE2B47] uppercase tracking-[.4em] mb-10 opacity-50">
                    System Module {item.i}
                  </div>
                  <h3 className="font-serif text-3xl text-white mb-6 leading-tight group-hover:text-white transition-colors">
                    {item.t}
                  </h3>
                  <p className="text-white/40 text-[.95rem] leading-relaxed group-hover:text-white/65 transition-colors">
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04. MILESTONE TIMELINE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={sTimeline as React.RefObject<HTMLDivElement>} className="py-32 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="rs section-kicker justify-center mb-8">
              <span className="section-kicker-line" />
              Our Journey
              <span className="section-kicker-line" />
            </div>
            <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.2]">
              Built Over <span className="italic text-[#EE2B47]">5+ Years</span> of Innovation
            </h2>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="tl-line" />

            <div className="space-y-16 relative">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`rs d${(i % 4) + 1} relative flex items-start gap-10 pl-14 md:pl-0 ${
                    i % 2 === 0
                      ? 'md:flex-row'
                      : 'md:flex-row-reverse'
                  } md:gap-0`}
                >
                  {/* Content */}
                  <div className={`flex-1 md:px-10 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="text-[#EE2B47] text-[.65rem] font-black uppercase tracking-[.35em] mb-3">{m.year}</div>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#001C44] mb-3 leading-tight">{m.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed max-w-sm">{m.desc}</p>
                  </div>

                  {/* Center dot (hidden on mobile, shown on md+) */}
                  <div className="hidden md:flex flex-shrink-0 items-center justify-center w-10 relative z-10">
                    <div className="tl-dot tl-dot-large" />
                  </div>

                  {/* Mobile dot */}
                  <div className="absolute left-3 top-1 md:hidden">
                    <div className="tl-dot" />
                  </div>

                  {/* Empty column for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          05. ANIMATED STATS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={s2 as React.RefObject<HTMLDivElement>} className="bg-[#F9FAFB] py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
            {([
              { ref: c0.ref, val: c0.val, suf: '+', label: t('about_pg.stats.1.label') as string },
              { ref: c1.ref, val: c1.val, suf: 'K+', label: t('about_pg.stats.2.label') as string },
              { ref: c2.ref, val: c2.val, suf: '%', label: t('about_pg.stats.3.label') as string },
              { ref: c3.ref, val: c3.val, suf: '+', label: 'Institutions Digitized' },
            ] as const).map((s, i) => (
              <div key={i} ref={s.ref} className="group text-center md:text-left">
                <div className="text-5xl md:text-6xl font-serif font-bold text-[#001C44] mb-2 flex items-baseline justify-center md:justify-start gap-1 group-hover:text-[#EE2B47] transition-colors duration-500">
                  {s.val}
                  <span className="text-2xl text-[#EE2B47]">{s.suf}</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-[#64748B] font-black leading-tight">{s.label}</div>
                <div className="mt-4 h-0.5 w-8 bg-[#EE2B47]/20 group-hover:w-16 group-hover:bg-[#EE2B47] transition-all duration-700 mx-auto md:mx-0" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          06. WHY CHOOSE SANOTHIMI
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={s3 as React.RefObject<HTMLDivElement>} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <div className="section-kicker mb-8">
              <span className="section-kicker-line" />
              {t('about_pg.trust.kicker')}
            </div>
            <h2 className="rs font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15] mb-8">
              {t('about_pg.trust.title1')}{' '}
              <span className="text-[#EE2B47] italic">{t('about_pg.trust.title2')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {([1, 2, 3, 4] as const).map((id, i) => (
              <div
                key={id}
                className={`rs d${i + 1} group p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:bg-[#001C44] hover:border-[#001C44] transition-all duration-700 hover:-translate-y-5 shadow-sm hover:shadow-2xl hover:shadow-[#EE2B47]/15 flex flex-col items-start h-full grad-border`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F9FAFB] group-hover:bg-[#EE2B47] flex items-center justify-center text-[#001C44] group-hover:text-white mb-10 transition-all duration-500">
                  {id === 1 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4m0 4h.01" /></svg>}
                  {id === 2 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>}
                  {id === 3 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                  {id === 4 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                </div>
                <h3 className="font-serif font-bold text-[#001C44] text-[1.15rem] mb-5 leading-tight group-hover:text-white transition-colors">
                  {t(`about.why.${id}.title` as 'about.why.1.title')}
                </h3>
                <p className="text-[#6B7280] text-[.85rem] leading-relaxed group-hover:text-white/55 transition-colors">
                  {t(`about.why.${id}.desc` as 'about.why.1.desc')}
                </p>
                {/* Bottom accent line */}
                <div className="mt-auto pt-8 w-full">
                  <div className="h-px w-full bg-gray-100 group-hover:bg-white/10 transition-colors" />
                </div>
              </div>
            ))}
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
