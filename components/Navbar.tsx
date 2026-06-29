'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = path === '/';

  const LINKS = [
    { label: t('nav.home'),     href: '/' },
    { label: t('nav.about'),    href: '/about' },
    { label: t('nav.services'), href: '/services' },
    { label: 'Pricing',         href: '/pricing' },
    { label: t('nav.contact'),  href: '/contact' },
  ];

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.65);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [path]);

  const openSearch = () =>
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));

  /* ── Style tokens ── */
  // Dark mode: home page before scrolling past the hero section
  const dark = isHome && !pastHero;

  const headerBg = dark
    ? 'bg-[#000E22]/85 border-white/8'
    : scrolled
      ? 'bg-white/96 border-gray-100 shadow-sm shadow-black/6'
      : 'bg-white/80 border-gray-100';

  const linkBase = dark ? 'text-white/45 hover:text-white' : 'text-[#001C44]/55 hover:text-[#001C44]';
  const linkActive = 'text-[#EE2B47]';
  const logoMain  = dark ? 'text-white' : 'text-[#001C44]';
  const logoBg    = dark ? 'bg-white/10 border-white/10' : 'bg-[#001C44]/8 border-[#001C44]/8';
  const langBg    = dark ? 'bg-white/6 border-white/8'   : 'bg-gray-100/70 border-gray-200/60';
  const langActiveBg = dark ? 'bg-white/18 text-white'    : 'bg-white text-[#EE2B47] shadow-sm';
  const langInactive = dark ? 'text-white/30 hover:text-white/60' : 'text-[#001C44]/40 hover:text-[#001C44]/70';
  const searchBtn = dark
    ? 'text-white/25 bg-white/5 border-white/8 hover:bg-white/10 hover:text-white/50 hover:border-white/15'
    : 'text-[#001C44]/30 bg-gray-50 border-gray-200 hover:bg-gray-100 hover:text-[#001C44]/60';
  const hamLine = dark ? 'bg-white/55' : 'bg-[#001C44]/55';
  const hamBg   = dark ? 'bg-white/6 border-white/8'  : 'bg-gray-50 border-gray-200';
  const mobileMenuBg = dark
    ? 'bg-[#000E22]/98 backdrop-blur-2xl border-white/6'
    : 'bg-white/98 backdrop-blur-2xl border-gray-100';
  const mobileLinkBase   = dark ? 'text-white/45 hover:bg-white/5 hover:text-white/80'  : 'text-[#001C44]/55 hover:bg-gray-50 hover:text-[#001C44]';
  const mobileLinkActive = 'bg-[#EE2B47]/10 text-[#EE2B47] border border-[#EE2B47]/15';
  const mobileDivider    = dark ? 'border-white/8' : 'border-gray-100';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 backdrop-blur-2xl border-b ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between gap-8">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center p-1.5 transition-all duration-300 group-hover:scale-105 ${logoBg}`}>
            <img
              src="/logo-no-background.png"
              alt="Sanothimi"
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <div className="leading-tight">
            <div className={`font-serif font-bold text-[1.05rem] tracking-tight leading-none transition-colors ${logoMain}`}>
              Sanothimi
            </div>
            <div className="text-[.5rem] text-[#EE2B47] font-black tracking-[.35em] uppercase mt-0.5">
              Technologies
            </div>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center" aria-label="Main navigation">
          {LINKS.map((l) => {
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 rounded-xl text-[.83rem] font-semibold transition-all duration-200 ${
                  active ? linkActive : linkBase
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#EE2B47]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2.5 flex-shrink-0">

          {/* Language toggle */}
          <div className={`hidden sm:flex items-center rounded-lg border p-0.5 gap-0.5 ${langBg}`}>
            {(['en', 'np'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-md text-[.6rem] font-black uppercase tracking-widest transition-all ${
                  language === lang ? langActiveBg : langInactive
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* ⌘K search */}
          <button
            onClick={openSearch}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-[.65rem] font-bold transition-all ${searchBtn}`}
            aria-label="Open search"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <kbd className="text-[.52rem] opacity-60">⌘K</kbd>
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="group flex items-center gap-1.5 bg-[#EE2B47] text-white px-5 py-2.5 rounded-xl font-bold text-[.78rem] shadow-lg shadow-[#EE2B47]/25 hover:bg-[#D91E36] hover:shadow-[#EE2B47]/40 hover:-translate-y-px transition-all duration-200"
          >
            {t('nav.getStarted')}
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl border transition-all ${hamBg}`}
            aria-label="Toggle menu"
          >
            <span className={`w-[18px] h-[1.5px] rounded-full transition-all duration-300 ${hamLine} ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`w-[13px] h-[1.5px] rounded-full transition-all duration-300 ${hamLine} ${open ? 'opacity-0 w-0' : ''}`} />
            <span className={`w-[18px] h-[1.5px] rounded-full transition-all duration-300 ${hamLine} ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 border-t ${mobileMenuBg} ${mobileDivider} ${open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-5 py-5 flex flex-col gap-1">
          {LINKS.map((l) => {
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[.9rem] font-semibold transition-all ${
                  active ? mobileLinkActive : mobileLinkBase
                }`}
              >
                {l.label}
                {active && (
                  <svg className="w-3.5 h-3.5 text-[#EE2B47]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            );
          })}

          <div className={`flex items-center gap-2 mt-4 pt-4 border-t ${mobileDivider}`}>
            {(['en', 'np'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-2.5 rounded-xl text-[.72rem] font-black uppercase tracking-widest transition-all ${
                  language === lang
                    ? 'bg-[#EE2B47] text-white shadow-md shadow-[#EE2B47]/20'
                    : dark ? 'bg-white/5 text-white/30' : 'bg-gray-100 text-[#001C44]/40'
                }`}
              >
                {lang === 'en' ? 'English' : 'नेपाली'}
              </button>
            ))}
          </div>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 flex justify-center items-center gap-2 py-4 bg-[#EE2B47] text-white rounded-2xl font-bold text-[.85rem] shadow-lg shadow-[#EE2B47]/20 hover:bg-[#D91E36] transition-all"
          >
            Get Free Demo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
