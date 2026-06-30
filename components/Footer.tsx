'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useState, type FormEvent } from 'react';

const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const SOLUTIONS = [
  { label: 'School ERP — SchoolSathi', href: '/services' },
  { label: 'Financial Suite — FinanceCore', href: '/services' },
  { label: 'Inventory Control — StockMate', href: '/services' },
  { label: 'HR & Payroll — HRDesk', href: '/services' },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const SOCIALS = [
  { label: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z', dot: true },
  { label: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 016 11.37zm1.5-4.87h.01M7.5 21h10a2.5 2.5 0 002.5-2.5V7.5A2.5 2.5 0 0017.5 5h-10A2.5 2.5 0 005 7.5v11A2.5 2.5 0 007.5 21z' },
];

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-[#082C66] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">

          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white p-2 flex items-center justify-center flex-shrink-0">
                <img src="/logo-icon-sano.png" alt="Sanothimi" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-xl tracking-tight">Sanothimi</span>
            </Link>
            <p className="text-white/45 text-[.85rem] leading-relaxed max-w-xs mb-7">
              {t('footer.motto')}
            </p>

            {/* Social */}
            <div className="flex gap-2.5 mb-10">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#D32F2F] hover:border-[#D32F2F] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={s.icon} />
                    {s.dot && <circle cx="4" cy="4" r="2" />}
                  </svg>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <p className="text-[.78rem] font-bold text-white/70 mb-3">Get the latest insights straight to your inbox</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-[.82rem] text-green-400 font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                Thanks — you&rsquo;re subscribed.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-white/8 border border-white/15 rounded-lg px-3.5 py-2.5 text-[.82rem] text-white placeholder:text-white/35 outline-none focus:border-[#D32F2F] focus:bg-white/12 transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-[.8rem] font-bold transition-all flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Company */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-[.72rem] font-bold uppercase tracking-[.2em] text-white/35 mb-5">Company</h4>
            <ul className="space-y-3.5">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/55 hover:text-white text-[.88rem] font-medium transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-3">
            <h4 className="text-[.72rem] font-bold uppercase tracking-[.2em] text-white/35 mb-5">Solutions</h4>
            <ul className="space-y-3.5">
              {SOLUTIONS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/55 hover:text-white text-[.88rem] font-medium transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[.72rem] font-bold uppercase tracking-[.2em] text-white/35 mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+9779806391489" className="text-white/80 hover:text-white text-[.92rem] font-semibold transition-colors">
                  +977 980-6391489
                </a>
              </li>
              <li>
                <a href="mailto:info@sanothimi.com.np" className="text-white/55 hover:text-white text-[.88rem] font-medium transition-colors break-all">
                  info@sanothimi.com.np
                </a>
              </li>
              <li className="text-white/55 text-[.88rem] font-medium leading-relaxed">
                Sanothimi, Bhaktapur, Nepal
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-[.78rem] font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} Sanothimi Private Limited. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="text-white/35 hover:text-white text-[.78rem] font-medium transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
