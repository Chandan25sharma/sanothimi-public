'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'top-4 max-w-5xl mx-auto rounded-3xl glass shadow-2xl shadow-[#001C44]/10 border border-white/40' 
          : 'bg-white/60 backdrop-blur-md border-b border-gray-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center font-bold text-[#EE2B47] text-sm group-hover:scale-105 transition-all shadow-sm border border-gray-100/50">
            <span className="text-2xl font-serif">S</span>
          </div>
          <div className="leading-none">
            <div className={`font-bold text-[#001C44] text-[1.1rem] tracking-tight transition-colors ${scrolled ? 'text-[#001C44]' : ''}`}>Sanothimi</div>
            <div className="text-[.68rem] text-[#EE2B47]/80 font-bold tracking-widest uppercase mt-0.5">SaaS Solutions</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-a text-[0.92rem] ${path === l.href ? 'cur !text-[#EE2B47]' : 'hover:text-[#EE2B47]'}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Social & CTA */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-4 pr-5 border-r border-[#001C44]/10">
            {[
              { label: 'LinkedIn', href: '#', color: 'hover:text-[#EE2B47]', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
              { label: 'Instagram', href: '#', color: 'hover:text-[#EE2B47]', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 016 11.37zm1.5-4.87h.01M7.5 21h10a2.5 2.5 0 002.5-2.5V7.5A2.5 2.5 0 0017.5 5h-10A2.5 2.5 0 005 7.5v11A2.5 2.5 0 007.5 21z' },
              { label: 'Facebook', href: '#', color: 'hover:text-[#EE2B47]', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' }
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`text-[#001C44]/40 ${s.color} transition-all`} aria-label={s.label}>
                <svg className="w-5 h-5 transition-transform hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                   <path d={s.icon} />
                   {s.label === 'LinkedIn' && <circle cx="4" cy="4" r="2" />}
                </svg>
              </a>
            ))}
          </div>
          <Link href="/contact" className="btn btn-fill hidden sm:inline-flex px-6 py-2.5 text-sm rounded-xl">
            Get Started
          </Link>
          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[1.8px] bg-[#001C44] rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`w-6 h-[1.8px] bg-[#001C44] rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[1.8px] bg-[#001C44] rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 glass border-t border-[#001C44]/05 ${open ? 'max-h-[520px]' : 'max-h-0'}`}>
        <div className="px-6 py-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-3.5 border-b border-[#001C44]/05 text-sm font-bold tracking-wide transition-colors ${path === l.href ? 'text-[#EE2B47]' : 'text-[#001C44]/70 hover:text-[#EE2B47]'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 btn btn-fill justify-center rounded-xl py-3.5 shadow-lg shadow-[#EE2B47]/20">
            Get Started
          </Link>
          <div className="flex items-center justify-center gap-6 py-6 mt-4 border-t border-[#001C44]/05">
            {[
              { label: 'LinkedIn', href: '#', color: 'text-[#EE2B47]', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
              { label: 'Instagram', href: '#', color: 'text-[#EE2B47]', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 016 11.37zm1.5-4.87h.01M7.5 21h10a2.5 2.5 0 002.5-2.5V7.5A2.5 2.5 0 0017.5 5h-10A2.5 2.5 0 005 7.5v11A2.5 2.5 0 007.5 21z' },
              { label: 'Facebook', href: '#', color: 'text-[#EE2B47]', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' }
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`${s.color} transition-all hover:scale-110`} aria-label={s.label}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={s.icon} />
                  {s.label === 'LinkedIn' && <circle cx="4" cy="4" r="2" />}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
