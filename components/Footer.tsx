import Link from 'next/link';

const SERVICES = ['Tax Planning & Compliance', 'Financial Statement Preparation', 'Financial Analysis & Reporting', 'Consulting and Advisory', 'Accounting Services'];
const QUICK = [{ label:'Home', href:'/' }, { label:'About', href:'/about' }, { label:'Services', href:'/services' }, { label:'Contact', href:'/contact' }];

export default function Footer() {
  return (
    <footer className="bg-[#000E22] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-white flex items-center justify-center font-bold text-[#EE2B47] text-sm border border-white/10 ring-2 ring-[#D4AF37]/20">
                <span className="text-xl">S</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Sanothimi</div>
                <div className="text-[.65rem] text-[#D4AF37] tracking-widest uppercase font-bold">Smart SaaS Solutions</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5">Empowering educational institutions and businesses with next-generation cloud solutions in Nepal and beyond.</p>
            {/* Social */}
            <div className="flex gap-4">
              {[
                { label: 'LinkedIn', href: '#', color: 'hover:bg-[#EE2B47]/20 hover:text-[#EE2B47]', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
                { label: 'Instagram', href: '#', color: 'hover:bg-[#EE2B47]/20 hover:text-[#EE2B47]', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 016 11.37zm1.5-4.87h.01M7.5 21h10a2.5 2.5 0 002.5-2.5V7.5A2.5 2.5 0 0017.5 5h-10A2.5 2.5 0 005 7.5v11A2.5 2.5 0 007.5 21z' },
                { label: 'Facebook', href: '#', color: 'hover:bg-[#EE2B47]/20 hover:text-[#EE2B47]', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' }
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-xl bg-white/5 ${s.color} flex items-center justify-center text-white/40 transition-all duration-300 border border-white/05`} aria-label={s.label}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={s.icon} />
                    {s.label === 'LinkedIn' && <circle cx="4" cy="4" r="2" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-[.72rem] font-bold uppercase tracking-[.18em] text-white/30 mb-5">Services</div>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/services" className="ft-link text-sm leading-snug">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-[.72rem] font-bold uppercase tracking-[.18em] text-white/30 mb-5">Quick Links</div>
            <ul className="flex flex-col gap-2.5">
              {QUICK.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="ft-link text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[.72rem] font-bold uppercase tracking-[.18em] text-white/30 mb-5">Contact Details</div>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="tel:+18001234567" className="ft-link">+977 980-6391489</a></li>
              <li><a href="mailto:info@sanothimi.com" className="ft-link">info@sanothimi.com</a></li>
              <li className="text-white/40 leading-snug">Sanothimi, Bhaktapur<br/>Bagmati, Nepal</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/08">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-[.78rem]">
            &copy; {new Date().getFullYear()} Sanothimi Technologies - All rights reserved.
          </p>

          <div className="flex gap-6 text-[.78rem]">
            <a href="#" className="text-white/25 hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/25 hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
