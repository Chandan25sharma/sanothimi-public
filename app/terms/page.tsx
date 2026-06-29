'use client';
import PrintButton from '@/components/PrintButton';
import { TERMS_EN, TERMS_NP } from '@/lib/legal-content';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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

export default function TermsPage() {
  const { t, language } = useLanguage();
  const TERMS_SECTIONS = language === 'np' ? TERMS_NP : TERMS_EN;
  const [activeSection, setActiveSection] = useState<string>('');
  const progress = useReadingProgress();

  useEffect(() => {
    if (!TERMS_SECTIONS.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    TERMS_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [TERMS_SECTIONS]);

  return (
    <main className="bg-white min-h-screen">

      {/* Reading progress */}
      <div className="read-progress" style={{ width: `${progress}%` }} />

      {/* ── Page Header ── */}
      <div className="relative bg-[#000E22] pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark opacity-100 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#EE2B47]/7 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#EE2B47]/10 border border-[#EE2B47]/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47]" />
            <span className="text-[10px] font-black uppercase tracking-[.3em] text-[#EE2B47]">
              {t('legal.terms.hero.kicker')}
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-8 tracking-tighter">
            {t('legal.terms.hero.title1')}{' '}
            <span className="italic text-grad">{t('legal.terms.hero.title2')}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-8 text-[11px] font-black uppercase tracking-widest text-white/30">
            <span className="flex items-center gap-2 text-[#EE2B47]">
              <span className="w-1 h-1 rounded-full bg-current" /> {t('legal.terms.hero.date')}
            </span>
            <span>{t('legal.terms.hero.status')}</span>
            <span>{t('legal.terms.hero.version')}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">

          {/* ── Sticky Sidebar ── */}
          <aside className="hidden lg:block sticky top-28 space-y-8">
            {/* Progress ring */}
            <div className="flex items-center gap-4 p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100">
              <div className="relative w-12 h-12 flex-shrink-0">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                  <circle
                    cx="24" cy="24" r="20" fill="none" stroke="#EE2B47" strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#001C44]">{progress}%</span>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#EE2B47] mb-0.5">Reading</div>
                <div className="text-xs font-bold text-[#001C44]">Terms of Service</div>
              </div>
            </div>

            {/* Section nav */}
            <div>
              <div className="text-[.62rem] font-black uppercase tracking-[.4em] text-[#EE2B47] mb-5 px-3">
                {t('legal.nav.hub')}
              </div>
              <nav className="flex flex-col gap-1">
                {TERMS_SECTIONS.map((s) => (
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

            {/* Legal inquiry */}
            <div className="p-6 bg-[#001C44] rounded-2xl">
              <p className="text-[10px] font-black text-[#EE2B47] uppercase tracking-widest mb-3 leading-none">
                {t('legal.inquiry.hub')}
              </p>
              <p className="text-xs text-white/50 mb-5 leading-relaxed">{t('legal.inquiry.desc')}</p>
              <a
                href="mailto:legal@sanothimi.com.np"
                className="text-xs font-black text-white hover:text-[#EE2B47] transition-colors underline decoration-white/20"
              >
                {t('legal.inquiry.cta')}
              </a>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="relative">
            <div className="space-y-20">
              {TERMS_SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-36">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-[#EE2B47]/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#EE2B47]" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#001C44] leading-tight tracking-tight">
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

            {/* Print section */}
            <div className="mt-24 pt-12 border-t border-gray-100">
              <div className="bg-[#F9FAFB] rounded-[2.5rem] p-10 md:p-16 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-md">
                  <h3 className="text-2xl font-serif text-[#001C44] mb-4">{t('legal.print.title')}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{t('legal.print.desc')}</p>
                </div>
                <PrintButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
