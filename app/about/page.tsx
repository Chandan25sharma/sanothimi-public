'use client';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

function useReveal(selector = '.rs') {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.09 });
    ref.current?.querySelectorAll(selector).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
  return ref;
}

const WHY = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#EE2B47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Enterprise Security',
    desc: 'Deeply committed to data integrity and privacy, implementing end-to-end encryption for all institutional and student records.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#EE2B47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Localized Solutions',
    desc: 'Our tools are built specifically for the regional landscape in Nepal, addressing local billing, taxation, and operational workflows.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#EE2B47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Scalable Cloud Tech',
    desc: 'Leveraging modern cloud architecture to ensure your organizational systems are fast, reliable, and accessible from anywhere.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#EE2B47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Customer-First Support',
    desc: 'We provide dedicated onboarding and 24/7 technical support to ensure your digital transition is smooth and successful.'
  },
];

const EXPERIENCES = [
  { company: 'SchoolSathi Core Launch', location: 'Bhaktapur, Nepal', role: 'Flagship ERP Product', year: '2023 - Present' },
  { company: 'FinanceSuite Development', location: 'Bhaktapur, Nepal', role: 'Accounting SaaS', year: '2022' },
  { company: 'Regional SME Outreach', location: 'Province 1 & 2', role: 'Business Digitization', year: '2021' },
  { company: 'Cloud Infrastructure Setup', location: 'Nepal', role: 'Scalability Build', year: '2020' },
  { company: 'Sanothimi Founding', location: 'Bhaktapur, Nepal', role: 'Company Inception', year: '2019' },
];

export default function AboutPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();

  return (
    <main>
      {/* ── Cinematic Page Hero ── */}
      <div className="relative pt-44 pb-32 bg-[#001C44] overflow-hidden">
        {/* Massive Brand Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none blur-[1px]">
           <img src="/logo-no-background.png" alt="" className="w-[80%] h-auto object-contain max-h-[80%] transform rotate-[-5deg]" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
           <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
              <span className="w-8 h-px bg-[#EE2B47]" />
              Our Mission
           </div>
           <h1 className="font-serif text-6xl md:text-8xl text-white leading-[1.1] tracking-tighter">
             About<br /><span className="italic text-[#EE2B47]">Sanothimi.</span>
           </h1>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#001C44] to-transparent" />
      </div>

      {/* ── Detailed Bio: The Sanothimi Narrative ── */}
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-32 bg-white relative z-10 -mt-10 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
             <div className="rs">
                <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
                   Fundamental Values
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.2] mb-10">
                   Empowering Institutions with <span className="italic">World-Class SaaS Solutions.</span>
                </h2>
                <div className="space-y-6 text-[#6B7280] text-lg leading-relaxed max-w-xl">
                  <p>Based in Bhaktapur, Nepal, Sanothimi Technologies is a premier SaaS provider focused on bridging the gap between traditional operations and modern digital efficiency.</p>
                  <p>From our flagship SchoolSathi ERP to our comprehensive business suites, we combine robust cloud technology with practical, localized insights.</p>
                </div>
                
                <div className="pt-12 flex flex-wrap gap-4">
                   <Link href="/contact" className="group inline-flex items-center gap-4 bg-[#EE2B47] text-white px-10 py-4 rounded-full font-bold hover:bg-[#001C44] transition-all duration-500 shadow-xl shadow-[#EE2B47]/20">
                      Get Started with a Demo 
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                   </Link>
                </div>
             </div>

             <div className="rs d2 relative">
                <div className="aspect-square rounded-[3rem] bg-[#001C44] overflow-hidden flex items-center justify-center p-20">
                   <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                      <img src="/logo-no-background.png" alt="" className="w-full h-full object-contain transform scale-150" />
                   </div>
                   <img src="/logo-no-background.png" alt="Sanothimi" className="relative z-10 w-full h-auto object-contain opacity-90 drop-shadow-2xl" />
                </div>
                {/* Float Badge */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-full flex flex-col items-center justify-center text-center p-6 shadow-2xl">
                   <div className="text-3xl font-serif font-bold text-[#EE2B47] mb-1">5+</div>
                   <div className="text-[9px] font-black uppercase tracking-widest text-[#001C44]">Years Experience</div>
                </div>
             </div>
          </div>

          <div className="rs d3 flex flex-wrap gap-3">
            {['Global SaaS Standards','Localized Regional Expertise','Enterprise Data Security','99.9% Uptime Guarantee'].map((c) => (
              <span key={c} className="text-[.75rem] font-black text-[#001C44] bg-gray-50 border border-gray-100 px-6 py-2.5 rounded-full uppercase tracking-wider hover:bg-[#EE2B47] hover:text-white hover:border-[#EE2B47] transition-all cursor-default">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Strategic Journey & Milestones ── */}
      <section className="py-32 bg-[#001C44] relative overflow-hidden">
        {/* Decorative Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.02] text-white text-[30rem] font-serif leading-none select-none">S</div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
                 Corporate Heritage
              </div>
              <h2 className="font-serif text-4xl text-white leading-[1.2] mb-10">Historical Milestones & <span className="italic">Evolution.</span></h2>
              <p className="text-white/40 leading-relaxed italic mb-10 border-l-2 border-[#EE2B47] pl-8 text-lg">
                &ldquo;Our growth has been driven by a relentless focus on creating tools that truly matter for the local institutions we serve.&rdquo;
              </p>
            </div>
            <div className="lg:col-span-3 space-y-16 relative pt-4">
              <div className="absolute top-0 left-0 w-px h-full bg-white/10 ml-[11px]" />
              {EXPERIENCES.map((ex, i) => (
                <div key={i} className="rs d1 flex gap-12 relative group">
                  <div className="w-6 h-6 rounded-full bg-[#001C44] border-4 border-white/10 group-hover:border-[#EE2B47] transition-all duration-500 z-10 mt-1.5" />
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-black text-[#EE2B47] uppercase tracking-[.2em]">{ex.year}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-xs font-bold text-white/30 uppercase tracking-widest">{ex.location}</span>
                    </div>
                    <h4 className="font-serif font-bold text-white text-2xl mb-2 group-hover:text-[#EE2B47] transition-colors">{ex.company}</h4>
                    <p className="text-white/50 text-[.9rem] font-medium max-w-sm">{ex.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Discovery Bar ── */}
      <section ref={s2 as React.RefObject<HTMLDivElement>} className="bg-white py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
           {/* Ported Discovery Bar UI from Home */}
           <div className="rs d4 flex flex-wrap justify-between items-center gap-12">
              <div className="max-w-xs">
                 <h2 className="font-serif text-3xl text-[#001C44] leading-tight">Scale Verified by <br />Performance Data.</h2>
              </div>
              <div className="flex flex-wrap gap-x-16 gap-y-8">
                { [
                   { val:'Since 2019', suf:'', label:'In Enterprise' },
                   { val:'10', suf:'K+', label:'Active Users' },
                   { val:'99.9', suf:'%', label:'Platform Uptime' },
                 ].map((s) => (
                    <div key={s.label} className="group">
                      <div className="text-4xl font-serif font-bold text-[#001C44] mb-3 flex items-baseline gap-1 group-hover:text-[#EE2B47] transition-colors">
                        {s.val}<span className="text-xl text-[#EE2B47]">{s.suf}</span>
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.3em] text-[#6B7280] font-black leading-tight group-hover:text-[#001C44] transition-colors">{s.label}</div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ── Why Choose Sanothimi: Cinematic Grid ── */}
      <section ref={s3 as React.RefObject<HTMLDivElement>} className="py-32 bg-[#F9FAF9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
             <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
                <span className="w-8 h-px bg-[#EE2B47]" />
                Institutional Trust
             </div>
             <h2 className="rs font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15] mb-8">
                Technology You Can <span className="text-[#EE2B47] italic">Trust Fully.</span>
             </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY.map((w, i) => (
              <div key={w.title} className={`rs d${i+1} p-10 rounded-[2.5rem] bg-white border border-gray-100 group hover:bg-[#001C44] hover:border-[#001C44] transition-all duration-700 hover:-translate-y-4 shadow-sm hover:shadow-2xl hover:shadow-[#EE2B47]/20 flex flex-col items-start h-full`}>
                <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-[#EE2B47] flex items-center justify-center text-[#001C44] group-hover:text-white mb-10 transition-all duration-500 scale-110">
                   {w.icon}
                </div>
                <h3 className="font-serif font-bold text-[#001C44] text-[1.15rem] mb-6 leading-tight group-hover:text-white transition-colors">{w.title}</h3>
                <p className="text-[#6B7280] text-[.85rem] leading-relaxed group-hover:text-white/60 transition-colors">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title={'Scale Your Institution\nwith Sanothimi'} sub="Ready to get started with the regional SaaS leader?" cta="Get Started" />
    </main>
  );
}
