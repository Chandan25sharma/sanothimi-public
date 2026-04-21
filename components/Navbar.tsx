'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { label: t('nav.home'), href: '/', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: t('nav.about'), href: '/about', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: t('nav.services'), href: '/services', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
    { label: t('nav.contact'), href: '/contact', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'top-4 max-w-5xl mx-auto rounded-[2rem] glass shadow-2xl shadow-[#EE2B47]/10 border border-white/40' 
          : 'bg-white/70 backdrop-blur-xl border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[75px] flex items-center justify-between">
        {/* Logo Rebuilt with Official Asset */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-2.6 shadow-xl shadow-[#001C44]/05 border border-gray-100 group-hover:scale-105 transition-all duration-500">
             <img src="/logo-no-background.png" alt="Sanothimi" className="w-full h-full object-contain" />
          </div>
          <div className="leading-tight">
            <div className="font-serif font-bold text-[#001C44] text-[1.25rem] tracking-tight">Sanothimi</div>
            <div className="text-[.6rem] text-[#EE2B47] font-black tracking-[.25em] uppercase">{t('nav.solutions')}</div>
          </div>
        </Link>

        {/* Desktop nav with High-Fidelity Icons */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`flex items-center gap-2 text-[0.88rem] font-bold tracking-tight transition-all hover:text-[#EE2B47] group ${path === l.href ? 'text-[#EE2B47]' : 'text-[#001C44]/70'}`}>
              <span className={`transition-transform group-hover:scale-110 ${path === l.href ? 'text-[#EE2B47]' : 'text-[#EE2B47]/40 group-hover:text-[#EE2B47]'}`}>{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Action Core */}
        <div className="flex items-center gap-4 md:gap-7">
          {/* Premium Language Switcher */}
          <div className="hidden sm:flex items-center p-1 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-lg text-[0.65rem] font-black transition-all ${language === 'en' ? 'bg-white text-[#EE2B47] shadow-sm' : 'text-[#001C44]/40 hover:text-[#001C44]'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('np')}
              className={`px-3 py-1.5 rounded-lg text-[0.65rem] font-black transition-all ${language === 'np' ? 'bg-white text-[#EE2B47] shadow-sm' : 'text-[#001C44]/40 hover:text-[#001C44]'}`}
            >
              NP
            </button>
          </div>
          
          <Link href="/contact" className="group relative flex items-center gap-3 bg-[#EE2B47] text-white px-7 py-3 rounded-2xl font-black uppercase tracking-widest text-[.65rem] shadow-xl shadow-[#EE2B47]/20 hover:bg-[#001C44] transition-all duration-500 overflow-hidden">
             {t('nav.getStarted')}
             <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-gray-50 border border-gray-100"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[2px] bg-[#EE2B47] rounded-full transition-all duration-500 ${open ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`w-5 h-[2px] bg-[#001C44] rounded-full transition-all duration-500 ${open ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[2px] bg-[#EE2B47] rounded-full transition-all duration-500 ${open ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu Rebuilt */}
      <div className={`md:hidden overflow-hidden transition-all duration-700 glass border-t border-gray-100 ${open ? 'max-h-[700px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-6 flex flex-col gap-2">
          {/* Mobile Lang Switch */}
          <div className="flex items-center gap-2 mb-4 p-4 bg-[#EE2B47]/05 rounded-2xl">
            <span className="text-[0.65rem] font-black text-[#EE2B47] uppercase tracking-widest mr-auto">Select Language</span>
            <button onClick={() => setLanguage('en')} className={`px-4 py-2 rounded-xl text-xs font-bold ${language === 'en' ? 'bg-[#EE2B47] text-white' : 'text-[#001C44]/60'}`}>English</button>
            <button onClick={() => setLanguage('np')} className={`px-4 py-2 rounded-xl text-xs font-bold ${language === 'np' ? 'bg-[#EE2B47] text-white' : 'text-[#001C44]/60'}`}>नेपाली</button>
          </div>

          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 py-5 px-6 rounded-2xl border-b border-gray-50 text-[1rem] font-serif font-bold transition-all ${path === l.href ? 'bg-[#EE2B47]/05 text-[#EE2B47] border-[#EE2B47]/10 scale-[1.02]' : 'text-[#001C44]/70 hover:bg-gray-50'}`}
            >
              <span className={path === l.href ? 'text-[#EE2B47]' : 'text-gray-300'}>{l.icon}</span>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-8 flex justify-center py-5 bg-[#EE2B47] text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-[#EE2B47]/30">
            {t('nav.getStarted')}
          </Link>
        </div>
      </div>
    </header>
  );
}
