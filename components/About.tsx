'use client';
import { useEffect, useRef } from 'react';

const WHY = [
  {
    icon: '📊',
    title: "All-in-One Institutional ERP",
    desc: "SchoolSathi digitizes everything from attendance to automated billing, saving staff an average of 15 hours per week on repetitive administrative tasks.",
  },
  {
    icon: '🔐',
    title: 'Enterprise-Grade Security',
    desc: "Your data is your most valuable asset. We use end-to-end encryption and redundant cloud backups to ensure 99.9% data availability and safety.",
  },
  {
    icon: '⚙️',
    title: 'Seamless Business Integration',
    desc: "From inventory to payroll, our suites are designed to work together, providing a unified digital ecosystem for businesses of any scale.",
  },
  {
    icon: '🌍',
    title: 'Local Support, Global Tech',
    desc: "We bring world-class SaaS architecture with the benefit of local expertise and 24/7 dedicated support right here in Nepal.",
  },
];

const CERTS = ['SchoolSathi™', 'FinanceFlow', 'BizSuite', 'CloudSec Certified', 'SaaS Excellence'];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); });
    }, { threshold: 0.09 });
    ref.current?.querySelectorAll('.rv').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 bg-white" ref={ref} aria-label="About section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Top: Who I am ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-24">
          {/* Visual */}
          <div className="rv relative">
            {/* Visual Frame with Glassy Background */}
            <div className="relative group perspective-1000">
              <div className="relative z-10 w-full h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#00122B]/40 backdrop-blur-3xl">
                <div className="absolute inset-0 opacity-25 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700">
                   <img src="/image-2.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-[#00122B]/60" />
                
                {/* Internal visual elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border border-white/05 rounded-full flex items-center justify-center text-white/05 text-9xl font-bold">ST</div>
                </div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-8 left-8 pb-4 border-b border-white/10 w-[70%] z-20">
                  <div className="text-[.6rem] font-bold text-[#D4AF37] uppercase tracking-[.3em] mb-1">Global Standard</div>
                  <h4 className="text-white font-serif text-2xl">Precision Engineering</h4>
                </div>
              </div>

              {/* Glassy texture background layer */}
              <div className="absolute -inset-10 opacity-20 pointer-events-none">
                 <img src="/image-2.png" alt="" className="w-full h-full object-cover blur-3xl" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#EE2B47]/20 blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#D4AF37]/10 blur-3xl" />
            </div>

            {/* Red badge */}
            <div className="absolute -bottom-5 -right-5 w-36 h-36 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl float-y z-20"
              style={{ background:'linear-gradient(135deg,#EE2B47,#A00E2C)', boxShadow:'0 20px 40px rgba(238,43,71,.4)' }}>
              <strong className="font-display text-4xl text-white font-bold leading-none">50+</strong>
              <span className="text-white/80 text-[.65rem] font-bold uppercase tracking-wider mt-1">Institutions<br/>Digitized</span>
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="rv kicker">About Sanothimi</div>
            <h2 className="rv d1 font-display text-4xl xl:text-5xl text-[#0a1628] leading-[1.1] mb-5">
              We Build Software,<br/>
              <span className="text-grad">Not Just Tools</span>
            </h2>
            <p className="rv d2 text-slate-500 leading-relaxed text-[1rem] mb-4">
              Sanothimi Technologies is a leading SaaS provider dedicated to the digital evolution of educational institutions and SMEs. Our mission is to simplify complex administrative workflows through intuitive, secure, and scalable cloud solutions.
            </p>
            <p className="rv d2 text-slate-500 leading-relaxed text-[1rem] mb-7">
              From our flagship SchoolSathi ERP to our tailored financial suites, we bring enterprise-grade technology to organizations of all sizes. We combine international technical standards with a deep understanding of local operational needs.
            </p>
            {/* Certs */}
            <div className="rv d3 flex flex-wrap gap-2 mb-8">
              {CERTS.map((c) => (
                <span key={c} className="text-[.75rem] font-bold text-[#001C44] bg-[#EE2B47]/10 border border-[#EE2B47]/25 px-3.5 py-1.5 rounded-full">
                  ✓ {c}
                </span>
              ))}
            </div>
            <div className="rv d4 flex flex-wrap gap-3">
              <a href="#contact" onClick={(e)=>{e.preventDefault();document.querySelector<HTMLElement>('#contact')?.scrollIntoView({behavior:'smooth'})}} className="btn-primary px-6 py-3.5 rounded-2xl">
                🚀 Get Started
              </a>
              <a href="/contact" className="btn-dark px-6 py-3.5 rounded-2xl">
                📞 Contact Sales
              </a>
            </div>
          </div>
        </div>

        <div className="rv">
          <div className="kicker center justify-center">Why Choose Sanothimi</div>
          <h3 className="text-center font-display text-3xl xl:text-4xl text-[#0a1628] mb-10">
            Problems I <span className="text-grad">Actually Solve</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY.map((w, i) => (
              <div key={w.title} className={`rv d${i+1} why-row`}>
                <div className="w-12 h-12 rounded-2xl bg-[#EE2B47]/10 border border-[#EE2B47]/20 flex items-center justify-center text-2xl shrink-0 text-[#EE2B47]">
                  {w.icon}
                </div>
                <div>
                  <strong className="block text-[.96rem] text-[#0a1628] font-bold mb-1">{w.title}</strong>
                  <p className="text-slate-500 text-[.83rem] leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
