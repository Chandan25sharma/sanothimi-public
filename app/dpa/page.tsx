'use client';
import { useLanguage } from '@/context/LanguageContext';
import { DPA_EN } from '@/lib/legal-content';
import { useEffect, useRef, useState } from 'react';

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return progress;
}

export default function DPAPage() {
  const { t } = useLanguage();
  const DPA_SECTIONS = DPA_EN;
  const [activeSection, setActiveSection] = useState<string>('');
  const progress = useReadingProgress();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!DPA_SECTIONS.length) return;
    const ids = DPA_SECTIONS.map((s) => s.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [DPA_SECTIONS]);

  return (
    <main className="bg-white min-h-screen">

      {/* Reading progress bar */}
      <div className="read-progress" style={{ width: `${progress}%` }} />

      {/* Page Header */}
      <div className="relative bg-white pt-44 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-[#155EEF] text-[.65rem] font-black uppercase tracking-[.3em] mb-6">
            {t('legal.dpa.hero.kicker')}
          </div>
          <h1 className="font-serif text-[2.2rem] sm:text-5xl md:text-6xl text-[#0B1F3A] leading-tight mb-8 tracking-tight">
            {t('legal.dpa.hero.title1')}{' '}
            <span className="relative inline-block">
              {t('legal.dpa.hero.title2')}
              <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#155EEF] rounded-full" />
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-2 text-[#155EEF]">
              <span className="w-1 h-1 rounded-full bg-current" />
              {t('legal.terms.hero.date')}
            </span>
            <span>{t('legal.dpa.status')}</span>
            <span>{t('legal.privacy.jurisdiction')}</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16 items-start">

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block sticky top-28 space-y-8">
            <div className="flex items-center gap-4 p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100">
              <div className="relative w-12 h-12 flex-shrink-0">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                  <circle
                    cx="24" cy="24" r="20" fill="none"
                    stroke="#155EEF" strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#0B1F3A]">{progress}%</span>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#155EEF] mb-0.5">Reading</div>
                <div className="text-xs font-bold text-[#0B1F3A]">Data Processing Agreement</div>
              </div>
            </div>

            <div>
              <div className="text-[.62rem] font-black uppercase tracking-[.4em] text-[#155EEF] mb-5 px-3">
                {t('legal.dpa.sidebar.title')}
              </div>
              <nav className="flex flex-col gap-1">
                {DPA_SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`legal-sidebar-link ${activeSection === s.id ? 'active' : ''}`}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="p-6 bg-[#0B1F3A] rounded-2xl">
              <p className="text-[10px] font-black text-[#155EEF] uppercase tracking-widest mb-3 leading-none">
                {t('legal.dpa.crd.title')}
              </p>
              <p className="text-xs text-white/50 mb-5 leading-relaxed">
                {t('legal.dpa.crd.desc')}
              </p>
              <a
                href="mailto:legal@sanothimi.com.np"
                className="text-xs font-black text-white hover:text-[#155EEF] transition-colors underline decoration-white/20"
              >
                {t('legal.dpa.crd.cta')}
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <div ref={contentRef} className="relative">
            <div className="space-y-20">
              {DPA_SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-36">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-[#155EEF]/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#155EEF]" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#0B1F3A] leading-tight tracking-tight">
                      {s.title}
                    </h2>
                  </div>
                  <div className="border-l-2 border-gray-100 pl-8 ml-4">
                    <div className="whitespace-pre-wrap text-[#6B7280] text-[.97rem] leading-[1.85]">
                      {s.content}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-24 pt-12 border-t border-gray-100">
              <div className="bg-[#0B1F3A] rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-dark pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#155EEF]/8 blur-[80px] pointer-events-none" />
                <div className="max-w-md relative z-10">
                  <h3 className="text-2xl font-serif mb-4">{t('legal.dpa.extract.title')}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{t('legal.dpa.extract.desc')}</p>
                </div>
                <a
                  href="mailto:legal@sanothimi.com.np"
                  className="relative z-10 bg-[#155EEF] text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-[#0B1F3A] transition-all duration-500 shadow-xl shadow-[#155EEF]/20 whitespace-nowrap"
                >
                  {t('legal.dpa.extract.cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
