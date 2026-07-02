'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useState, type FormEvent } from 'react';

const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Insights', href: '/insights' },
  { label: 'Partner With Us', href: '/partner' },
  { label: 'Support', href: '/support' },
  { label: 'Contact', href: '/contact' },
];

const SOLUTIONS = [
  { label: 'School ERP — SchoolSathi', href: '/services#svc-1' },
  { label: 'Financial Suite — FinanceCore', href: '/services#svc-2' },
  { label: 'Inventory Control — StockMate', href: '/services#svc-3' },
  { label: 'HR & Payroll — HRDesk', href: '/services#svc-4' },
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
    <footer className="bg-[#F8FAFC] border-t border-gray-200">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 md:gap-y-14">

          {/* Brand + newsletter */}
          <div className="lg:col-span-4 pb-8 border-b border-gray-200 lg:pb-0 lg:border-0">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <img src="/logo-icon-sano.png" alt="Sanothimi" className="w-8 h-8 object-contain" />
              <div className="leading-tight">
                <div className="font-bold text-[1.02rem] tracking-tight text-[#0D47A1]">Sanothimi</div>
                <div className="text-[.5rem] text-[#D32F2F] font-black tracking-[.35em] uppercase">Technologies</div>
              </div>
            </Link>

            <p className="text-gray-500 text-[.85rem] leading-relaxed max-w-xs mb-6">
              {t('footer.motto')}
            </p>

            {/* Social */}
            <div className="flex gap-2.5 mb-9">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#D32F2F] hover:border-[#D32F2F] transition-all duration-200 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={s.icon} />
                    {s.dot && <circle cx="4" cy="4" r="2" />}
                  </svg>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <p className="text-[.78rem] font-semibold text-gray-600 mb-3">Get the latest insights straight to your inbox</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-[.82rem] text-green-600 font-semibold">
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
                  className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-[.82rem] text-[#0D47A1] placeholder:text-gray-400 outline-none focus:border-[#D32F2F] transition-all shadow-sm"
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

          {/* Nav columns — 2-col on mobile, unfold at lg */}
          <div className="lg:col-span-8 lg:col-start-5 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">

            {/* Company */}
            <div>
              <h4 className="text-[.66rem] font-bold uppercase tracking-[.2em] text-gray-400 mb-4">Company</h4>
              <ul className="space-y-2.5">
                {COMPANY.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-gray-500 hover:text-[#D32F2F] text-[.83rem] font-medium transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-[.66rem] font-bold uppercase tracking-[.2em] text-gray-400 mb-4">Solutions</h4>
              <ul className="space-y-2.5">
                {SOLUTIONS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-gray-500 hover:text-[#D32F2F] text-[.83rem] font-medium transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact — full width on mobile (col-span-2), single col on md+ */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[.66rem] font-bold uppercase tracking-[.2em] text-gray-400 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+9779806391489" className="text-[#0D47A1] hover:text-[#D32F2F] text-[.88rem] font-semibold transition-colors">
                    +977 980-6391489
                  </a>
                </li>
                <li>
                  <a href="mailto:info@sanothimi.com.np" className="text-gray-500 hover:text-[#D32F2F] text-[.83rem] font-medium transition-colors break-all">
                    info@sanothimi.com.np
                  </a>
                </li>
                <li className="text-gray-500 text-[.83rem] font-medium">
                  Sanothimi, Bhaktapur, Nepal
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-[.78rem] font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} Sanothimi Private Limited. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="text-gray-400 hover:text-[#D32F2F] text-[.78rem] font-medium transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
