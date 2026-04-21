'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Home', href: '/', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { label: 'About', href: '/about', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { label: 'Services', href: '/services', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
  { label: 'Contact', href: '/contact', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
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
          ? 'top-4 max-w-5xl mx-auto rounded-[2rem] glass shadow-2xl shadow-[#EE2B47]/10 border border-white/40' 
          : 'bg-white/70 backdrop-blur-xl border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[75px] flex items-center justify-between">
        {/* Logo Rebuilt with Official Asset */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-xl shadow-[#001C44]/05 border border-gray-100 group-hover:scale-105 transition-all duration-500">
             <img src="/logo-no-background.png" alt="Sanothimi" className="w-full h-full object-contain" />
          </div>
          <div className="leading-tight">
            <div className="font-serif font-bold text-[#001C44] text-[1.25rem] tracking-tight">Sanothimi</div>
            <div className="text-[.6rem] text-[#EE2B47] font-black tracking-[.25em] uppercase">SaaS Solutions</div>
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

        {/* Social & Premium CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-5 pr-6 border-r border-[#001C44]/05">
            {[
              { label: 'LinkedIn', href: '#', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
              { label: 'Instagram', href: '#', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 016 11.37zm1.5-4.87h.01M7.5 21h10a2.5 2.5 0 002.5-2.5V7.5A2.5 2.5 0 0017.5 5h-10A2.5 2.5 0 005 7.5v11A2.5 2.5 0 007.5 21z' },
              { label: 'Facebook', href: '#', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' }
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[#001C44]/30 hover:text-[#EE2B47] transition-all hover:scale-125" aria-label={s.label}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                   <path d={s.icon} />
                   {s.label === 'LinkedIn' && <circle cx="4" cy="4" r="2" />}
                </svg>
              </a>
            ))}
          </div>
          
          <Link href="/contact" className="group relative flex items-center gap-3 bg-[#EE2B47] text-white px-7 py-3 rounded-2xl font-black uppercase tracking-widest text-[.65rem] shadow-xl shadow-[#EE2B47]/20 hover:bg-[#001C44] transition-all duration-500 overflow-hidden">
             Get Started
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
      <div className={`md:hidden overflow-hidden transition-all duration-700 glass border-t border-gray-100 ${open ? 'max-h-[600px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-6 flex flex-col gap-2">
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
            Initiate Connection
          </Link>
        </div>
      </div>
    </header>
  );
}
    </header>
  );
}
