import Link from 'next/link';

const SERVICES = ['Tax Planning & Compliance', 'Financial Statement Preparation', 'Financial Analysis & Reporting', 'Consulting and Advisory', 'Accounting Services'];
const QUICK = [{ label:'Home', href:'/' }, { label:'About', href:'/about' }, { label:'Services', href:'/services' }, { label:'Contact', href:'/contact' }];

export default function Footer() {
  return (
    <footer className="bg-[#000E22] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="rs">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-xl border border-white/10 group-hover:scale-105 transition-all">
                <img src="/logo-no-background.png" alt="Sanothimi" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-serif font-bold text-white text-xl leading-none">Sanothimi</div>
                <div className="text-[.6rem] text-[#EE2B47] tracking-[.3em] uppercase font-black mt-1">SaaS Solutions</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">Empowering institutions with elite-grade cloud solutions, digitizing operations from core infrastructure to individual classroom success.</p>
            {/* Social */}
            <div className="flex gap-4">
              {[
                { label: 'LinkedIn', href: '#', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
                { label: 'Instagram', href: '#', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 016 11.37zm1.5-4.87h.01M7.5 21h10a2.5 2.5 0 002.5-2.5V7.5A2.5 2.5 0 0017.5 5h-10A2.5 2.5 0 005 7.5v11A2.5 2.5 0 007.5 21z' },
                { label: 'Facebook', href: '#', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' }
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-white/05 hover:bg-[#EE2B47] hover:text-white flex items-center justify-center text-white/30 transition-all duration-500 border border-white/05 shadow-lg shadow-[#000E22]/20" aria-label={s.label}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={s.icon} />
                    {s.label === 'LinkedIn' && <circle cx="4" cy="4" r="2" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="rs d1">
            <div className="text-[.72rem] font-black uppercase tracking-[.35em] text-[#EE2B47] mb-7">Service Gallery</div>
            <ul className="flex flex-col gap-3.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-white/40 hover:text-[#EE2B47] text-sm font-bold tracking-tight transition-all flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-[#EE2B47]" />
                     {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="rs d2">
            <div className="text-[.72rem] font-black uppercase tracking-[.35em] text-[#EE2B47] mb-7">Navigation</div>
            <ul className="flex flex-col gap-3.5">
              {QUICK.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/40 hover:text-white text-sm font-bold tracking-tight transition-all">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="rs d3">
            <div className="text-[.72rem] font-black uppercase tracking-[.35em] text-[#EE2B47] mb-7">Regional Hub</div>
            <ul className="flex flex-col gap-5 text-sm">
              <li className="flex flex-col gap-1">
                 <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">Connect</span>
                 <a href="tel:+9779806391489" className="text-white/60 hover:text-[#EE2B47] font-bold transition-colors">+977 980-6391489</a>
              </li>
              <li className="flex flex-col gap-1">
                 <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">Inquiry</span>
                 <a href="mailto:info@sanothimi.com.np" className="text-white/60 hover:text-[#EE2B47] font-bold transition-colors">info@sanothimi.com.np</a>
              </li>
              <li className="flex flex-col gap-1">
                 <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">Location</span>
                 <div className="text-white/40 font-medium leading-relaxed">Sanothimi, Bhaktapur<br/>Bagmati, Nepal</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/05 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/20 text-[.75rem] font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Sanothimi Private Limited. Elite SaaS Engineering.
          </p>

          <div className="flex gap-10 text-[.7rem] font-black uppercase tracking-[.25em]">
            <Link href="/privacy" className="text-white/20 hover:text-[#EE2B47] transition-all">Privacy Policy</Link>
            <Link href="/terms" className="text-white/20 hover:text-[#EE2B47] transition-all">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
