import Link from 'next/link';

const SERVICES = ['Tax Planning & Compliance', 'Financial Statement Preparation', 'Financial Analysis & Reporting', 'Consulting and Advisory', 'Accounting Services'];
const QUICK = [{ label:'Home', href:'/' }, { label:'About', href:'/about' }, { label:'Services', href:'/services' }, { label:'Contact', href:'/contact' }];

export default function Footer() {
  return (
    <footer className="relative bg-[#000E22] text-white pt-24 pb-12 overflow-hidden border-t border-white/05">
      {/* Dynamic 'Singing' Background Identity */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Neon Plasma */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#EE2B47]/10 blur-[120px] animate-pulse-slow rounded-full opacity-60" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#EE2B47]/05 blur-[120px] animate-pulse-slow rounded-full opacity-40 delay-1000" />
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle, #EE2B47 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Scanning Light Streak */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/05 to-transparent -translate-x-full animate-shimmer" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
          {/* Brand & Narrative */}
          <div className="space-y-8">
            <div className="group cursor-default">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-2xl bg-white p-3 shadow-[0_0_40px_rgba(238,43,71,0.15)] transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(238,43,71,0.3)] group-hover:scale-105">
                  <img src="/logo-no-background.png" alt="Sanothimi" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-white/40 blur-lg rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-2xl tracking-tighter leading-none">Sanothimi</h3>
                  <p className="text-[.6rem] text-[#EE2B47] tracking-[.4em] uppercase font-black mt-2 flex items-center gap-2">
                    <span className="w-8 h-px bg-[#EE2B47]/30" />
                    Elite SaaS
                  </p>
                </div>
              </div>
              <p className="text-white/30 text-sm leading-relaxed max-w-xs font-medium">
                Pioneering the digital frontier of Nepal. Building the infrastructure that powers tomorrow&apos;s educational and enterprise success.
              </p>
            </div>

            {/* Premium Social Links */}
            <div className="flex gap-4">
              {[
                { label: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
                { label: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 016 11.37zm1.5-4.87h.01M7.5 21h10a2.5 2.5 0 002.5-2.5V7.5A2.5 2.5 0 0017.5 5h-10A2.5 2.5 0 005 7.5v11A2.5 2.5 0 007.5 21z' },
                { label: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' }
              ].map((s, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-xl bg-white/03 border border-white/05 flex items-center justify-center text-white/20 hover:text-white hover:bg-[#EE2B47] hover:border-[#EE2B47] transition-all duration-500 shadow-xl" aria-label={s.label}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={s.icon} />
                    {s.label === 'LinkedIn' && <circle cx="4" cy="4" r="2" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Service Gallery */}
          <div className="space-y-8">
            <h4 className="text-[.7rem] font-black uppercase tracking-[.35em] text-[#EE2B47]/60">Solution Stack</h4>
            <ul className="grid gap-4">
              {SERVICES.map((s) => (
                <li key={s} className="group/item">
                  <Link href="/services" className="text-white/30 hover:text-white text-[0.9rem] font-bold tracking-tight transition-all duration-300 flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-white/10 group-hover/item:w-4 group-hover/item:bg-[#EE2B47] transition-all" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Hub */}
          <div className="space-y-8">
            <h4 className="text-[.7rem] font-black uppercase tracking-[.35em] text-[#EE2B47]/60">Platform Map</h4>
            <ul className="grid gap-4">
              {QUICK.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/30 hover:text-white text-[0.9rem] font-bold tracking-tight transition-all duration-300 hover:translate-x-1 inline-block">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Node */}
          <div className="space-y-8">
            <h4 className="text-[.7rem] font-black uppercase tracking-[.35em] text-[#EE2B47]/60">Operational Nodes</h4>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Connect Hub</p>
                <a href="tel:+9779806391489" className="text-white/60 hover:text-[#EE2B47] text-lg font-black transition-colors block leading-none tracking-tighter">+977 980-6391489</a>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Digital Terminal</p>
                <a href="mailto:info@sanothimi.com.np" className="text-white/60 hover:text-[#EE2B47] text-md font-bold transition-colors block truncate">info@sanothimi.com.np</a>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Global Base</p>
                <p className="text-white/40 text-[0.9rem] font-medium leading-relaxed">Sanothimi, Bhaktapur, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glassmorphic Footer Bar */}
      <div className="relative z-10 border-t border-white/05 bg-black/40 backdrop-blur-3xl py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-white/20 text-[.65rem] font-black uppercase tracking-[.4em] text-center md:text-left">
            &copy; {new Date().getFullYear()} Sanothimi Private Limited. <span className="text-white/05 mx-3">|</span> Engineered with Precision
          </p>

          <div className="flex gap-10 text-[.7rem] font-black uppercase tracking-[.3em]">
            <Link href="/privacy" className="group relative text-white/20 hover:text-[#EE2B47] transition-all">
              Privacy Identity
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#EE2B47] group-hover:w-full transition-all duration-500" />
            </Link>
            <Link href="/terms" className="group relative text-white/20 hover:text-[#EE2B47] transition-all">
              Platform Terms
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#EE2B47] group-hover:w-full transition-all duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
