'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import MegaMenu, { type MegaColumn } from '@/components/MegaMenu';

const ABOUT_COLUMNS: MegaColumn[] = [
  {
    title: 'Company',
    items: [
      { label: 'Our Story', href: '/about' },
      { label: 'Our Journey', href: '/about#about-journey' },
      { label: 'Our Values', href: '/about#about-values' },
    ],
  },
  {
    title: 'Why Sanothimi',
    items: [
      { label: 'Innovation', href: '/about#about-innovation' },
      { label: 'Institutional Trust', href: '/about#about-trust' },
    ],
  },
  {
    title: 'Get in Touch',
    items: [
      { label: 'Contact Sales', href: '/contact' },
      { label: 'Request a Demo', href: '/demo' },
    ],
  },
];

const SERVICES_COLUMNS: MegaColumn[] = [
  {
    title: 'School ERP',
    items: [
      { label: 'SchoolSathi Core', href: '/services#svc-1', desc: 'Admissions, attendance, exams & billing' },
    ],
  },
  {
    title: 'Finance & Operations',
    items: [
      { label: 'Finance & Accounting', href: '/services#svc-2', desc: 'VAT reports & cloud ledgers' },
      { label: 'Business Management', href: '/services#svc-3', desc: 'Inventory, sales & employees' },
    ],
  },
  {
    title: 'Intelligence & Security',
    items: [
      { label: 'Business Intelligence', href: '/services#svc-4', desc: 'Analytics & reporting' },
      { label: 'Enterprise Security', href: '/services#svc-5', desc: 'Hosting, backups & access control' },
    ],
  },
  {
    title: 'Custom Engineering',
    items: [
      { label: 'Custom Software', href: '/services#svc-6', desc: 'Bespoke development' },
    ],
  },
];

const PARTNER_COLUMNS: MegaColumn[] = [
  {
    title: 'Partner With Us',
    items: [
      { label: 'Become a Partner', href: '/partner' },
      { label: 'Partner Benefits', href: '/partner#benefits' },
    ],
    portalLabel: 'Partner Portal',
    portalHref: '/partner',
  },
];

const SUPPORT_COLUMNS: MegaColumn[] = [
  {
    title: 'Support',
    items: [
      { label: 'Submit a Ticket', href: '/support' },
      { label: 'FAQs', href: '/support#faq' },
    ],
    portalLabel: 'Support Portal',
    portalHref: '/support',
  },
];

const INSIGHTS_COLUMNS: MegaColumn[] = [
  {
    title: 'Insights',
    items: [
      { label: 'All Insights', href: '/insights' },
      { label: 'Thought Leadership', href: '/insights#thought-leadership' },
      { label: 'Events & Webinars', href: '/insights#events' },
      { label: 'News & Announcements', href: '/insights#news' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Case Studies', href: '/insights#case-studies' },
      { label: 'Brochures', href: '/insights#brochures' },
    ],
  },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [mobileMegaOpen, setMobileMegaOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(href);
  };
  const closeMegaDelayed = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(null), 150);
  };

  const LINKS = [
    { label: t('nav.about'), href: '/about', mega: ABOUT_COLUMNS, ctaLabel: 'View Full About Page', ctaHref: '/about', secondaryLabel: 'Contact Us', secondaryHref: '/contact' },
    { label: t('nav.services'), href: '/services', mega: SERVICES_COLUMNS, ctaLabel: 'View All Services', ctaHref: '/services', secondaryLabel: 'Talk to Sales', secondaryHref: '/contact' },
    { label: 'Partner With Us', href: '/partner', mega: PARTNER_COLUMNS },
    { label: 'Support', href: '/support', mega: SUPPORT_COLUMNS },
    { label: 'Insights', href: '/insights', mega: INSIGHTS_COLUMNS, ctaLabel: 'View All Insights', ctaHref: '/insights', secondaryLabel: 'Subscribe', secondaryHref: '/insights' },
    { label: 'Pricing', href: '/pricing' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); setMobileMegaOpen(null); }, [path]);

  const openSearch = () =>
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));

  const headerBg = scrolled
    ? 'bg-white/97 border-gray-100 shadow-sm shadow-black/5'
    : 'bg-white/92 border-gray-100/70';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img src="/logo-icon-sano.png" alt="Sanothimi" className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105" />
          <div className="leading-tight">
            <div className="font-bold text-[1.05rem] tracking-tight leading-none text-[#0D47A1]">
              Sanothimi
            </div>
            <div className="text-[.5rem] text-[#D32F2F] font-black tracking-[.35em] uppercase mt-0.5">
              Technologies
            </div>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" aria-label="Main navigation">
          {LINKS.map((l) => {
            const active = path === l.href;

            if (l.mega) {
              const isOpen = megaOpen === l.href;
              return (
                <div key={l.href} className="relative" onMouseEnter={() => openMega(l.href)} onMouseLeave={closeMegaDelayed}>
                  <Link
                    href={l.href}
                    className={`relative flex items-center gap-1 px-3.5 py-2 text-[.82rem] font-medium tracking-tight transition-all duration-200 ${
                      active || isOpen ? 'text-[#D32F2F]' : 'text-gray-600 hover:text-[#0D47A1]'
                    }`}
                  >
                    {l.label}
                    <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className={`absolute -bottom-px left-3.5 right-3.5 h-[2px] bg-[#D32F2F] transition-transform duration-200 origin-left ${active || isOpen ? 'scale-x-100' : 'scale-x-0'}`} />
                  </Link>
                  <AnimatePresence>
                    {isOpen && (
                      <MegaMenu
                        columns={l.mega}
                        ctaLabel={l.ctaLabel}
                        ctaHref={l.ctaHref}
                        secondaryLabel={l.secondaryLabel}
                        secondaryHref={l.secondaryHref}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3.5 py-2 text-[.82rem] font-medium tracking-tight transition-all duration-200 ${
                  active ? 'text-[#D32F2F]' : 'text-gray-600 hover:text-[#0D47A1]'
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-px left-3.5 right-3.5 h-[2px] bg-[#D32F2F] transition-transform duration-200 origin-left ${active ? 'scale-x-100' : 'scale-x-0'}`} />
              </Link>
            );
          })}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Language toggle */}
          <div className="hidden sm:flex items-center rounded-full p-0.5 gap-0.5 bg-gray-100/70">
            {(['en', 'np'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-full text-[.6rem] font-black uppercase tracking-widest transition-all ${
                  language === lang ? 'bg-white text-[#D32F2F] shadow-sm' : 'text-[#0D47A1]/40 hover:text-[#0D47A1]/70'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Search */}
          <button
            onClick={openSearch}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#0D47A1] transition-all"
            aria-label="Open search"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Contact us — secondary */}
          <Link
            href="/contact"
            className="hidden sm:flex items-center bg-[#0D47A1] text-white px-5 py-2.5 rounded-full font-semibold text-[.78rem] hover:bg-[#082C66] transition-all duration-200"
          >
            Contact Us
          </Link>

          {/* Demo — primary */}
          <Link
            href="/demo"
            className="flex items-center bg-[#D32F2F] text-white px-5 py-2.5 rounded-full font-semibold text-[.78rem] hover:bg-[#B71C1C] transition-all duration-200"
          >
            Demo
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full transition-all hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <span className={`w-[18px] h-[1.5px] rounded-full transition-all duration-300 bg-[#0D47A1]/55 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`w-[13px] h-[1.5px] rounded-full transition-all duration-300 bg-[#0D47A1]/55 ${open ? 'opacity-0 w-0' : ''}`} />
            <span className={`w-[18px] h-[1.5px] rounded-full transition-all duration-300 bg-[#0D47A1]/55 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 border-t bg-white/98 backdrop-blur-2xl border-gray-100 ${open ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-5 py-5 flex flex-col gap-1">
          {LINKS.map((l) => {
            const active = path === l.href;

            if (l.mega) {
              const isOpen = mobileMegaOpen === l.href;
              return (
                <div key={l.href}>
                  <button
                    onClick={() => setMobileMegaOpen(isOpen ? null : l.href)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[.9rem] font-semibold transition-all ${
                      active ? 'bg-[#D32F2F]/10 text-[#D32F2F] border border-[#D32F2F]/15' : 'text-[#0D47A1]/55 hover:bg-gray-50 hover:text-[#0D47A1]'
                    }`}
                  >
                    {l.label}
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[480px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-3 flex flex-col gap-0.5 pb-1">
                      {l.mega.flatMap((c) => c.items).map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => { setOpen(false); setMobileMegaOpen(null); }}
                          className="px-4 py-2.5 rounded-xl text-[.82rem] font-medium transition-all text-[#0D47A1]/55 hover:bg-gray-50 hover:text-[#0D47A1]"
                        >
                          {item.label}
                        </Link>
                      ))}
                      {l.mega.filter((c) => c.portalLabel && c.portalHref).map((c) => (
                        <Link
                          key={c.portalLabel}
                          href={c.portalHref!}
                          onClick={() => { setOpen(false); setMobileMegaOpen(null); }}
                          className="mx-4 mt-2 inline-flex items-center gap-1.5 bg-[#D32F2F]/10 text-[#D32F2F] px-4 py-2 rounded-full text-[.78rem] font-bold w-fit"
                        >
                          {c.portalLabel}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[.9rem] font-semibold transition-all ${
                  active ? 'bg-[#D32F2F]/10 text-[#D32F2F] border border-[#D32F2F]/15' : 'text-[#0D47A1]/55 hover:bg-gray-50 hover:text-[#0D47A1]'
                }`}
              >
                {l.label}
                {active && (
                  <svg className="w-3.5 h-3.5 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            );
          })}

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            {(['en', 'np'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-2.5 rounded-xl text-[.72rem] font-black uppercase tracking-widest transition-all ${
                  language === lang ? 'bg-[#D32F2F] text-white shadow-md shadow-[#D32F2F]/20' : 'bg-gray-100 text-[#0D47A1]/40'
                }`}
              >
                {lang === 'en' ? 'English' : 'नेपाली'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex justify-center items-center gap-2 py-3.5 bg-[#0D47A1] text-white rounded-full font-semibold text-[.82rem] hover:bg-[#082C66] transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="flex justify-center items-center gap-2 py-3.5 bg-[#D32F2F] text-white rounded-full font-semibold text-[.82rem] hover:bg-[#B71C1C] transition-all"
            >
              Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
