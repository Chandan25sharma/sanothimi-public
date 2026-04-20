'use client';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.09 });
    ref.current?.querySelectorAll('.rs').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── Counter hook ─── */
function useCounter(target: number, delay = 800) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 2000; const step = target / (dur / 16);
        let v = 0;
        setTimeout(() => {
          const id = setInterval(() => { v = Math.min(v + step, target); setVal(Math.floor(v)); if (v >= target) clearInterval(id); }, 16);
        }, delay);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, delay]);
  return { ref, val };
}

const SERVICES = [
  { 
    num: '01', 
    title: 'School Management (ERP)', 
    desc: 'The all-in-one system for admissions, exams, and billing.', 
    modules: ['Student Information System', 'Admission Workflow', 'Exam & Result Mgmt', 'Digital Fee Collection']
  },
  { 
    num: '02', 
    title: 'Financial Management', 
    desc: 'Secure, cloud-based accounting solutions for high-growth firms.', 
    modules: ['Unified Ledger', 'Tax & Compliance', 'Automated Payroll', 'Asset Lifecycle tracking']
  },
  { 
    num: '03', 
    title: 'Business Intelligence', 
    desc: 'Insightful real-time dashboards that monitor performance.', 
    modules: ['KPI Visualization', 'Predictive Modeling', 'Sales Forecasting', 'Resource Optimization']
  },
  { 
    num: '04', 
    title: 'Inventory & Tracking', 
    desc: 'Precise management of logistics and inventory across locations.', 
    modules: ['Stock Synchronization', 'Warehouse Management', 'Supply Chain Visibility', 'Barcode Integration']
  },
  { 
    num: '05', 
    title: 'Custom SaaS Solutions', 
    desc: 'Bespoke software development for unique digital challenges.', 
    modules: ['Agile Development', 'Cloud Architecture', 'API Integrations', 'Legacy Migration']
  },
  { 
    num: '06', 
    title: 'Enterprise Data Security', 
    desc: 'Next-gen encryption ensuring organizational data remains safe.', 
    modules: ['Vulnerability Scanning', 'Endpoint Protection', 'Zero-Trust Framework', 'Audit Trail Monitoring']
  },
];

const LOGOS = ['AWS', 'Stripe', 'Google Cloud', 'ISO Certified', 'CloudSec'];

const STATS = [
  { target: 99, suf: '%', label: 'Uptime Reliability' },
  { target: 10, suf: 'K+', label: 'Active Daily Users' },
  { target: 50, suf: '+', label: 'Schools Digitized' },
  { target: 500, suf: '+', label: 'Business Solutions' },
];

export default function Home() {
  const sTop = useReveal();
  const sSvc = useReveal();
  const sAbout = useReveal();
  const sTest = useReveal();
  const sWhy = useReveal();

  const c0 = useCounter(98, 100);
  const c1 = useCounter(5, 200);
  const c2 = useCounter(150, 300);
  const c3 = useCounter(300, 400);
  const counters = [c0, c1, c2, c3];

  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'l' | 'r') => {
    if (carouselRef.current) {
      const amt = carouselRef.current.clientWidth * 0.6;
      carouselRef.current.scrollBy({ left: dir === 'l' ? -amt : amt, behavior: 'smooth' });
    }
  };

  return (
    <main className="overflow-hidden">
      {/* ═══ UNIFIED GLASS DASHBOARD HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-[#000E22]">
        {/* Unified Full-Width Background */}
        <div className="absolute inset-0 z-0">
           <img src="/image-1.png" alt="" className="w-full h-full object-cover opacity-60 shadow-inner" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#000E22] via-[#000E22]/85 to-[#000E22]/40" />
           <div className="absolute inset-0 bg-pattern opacity-30" />
        </div>

        {/* Content Content - Responsive Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left Side: Brand Story - Immediate Visibility */}
          <div ref={sTop as React.RefObject<HTMLDivElement>} className="flex flex-col items-start text-left z-10">
            <h1 className="font-serif text-[4rem] md:text-[6rem] text-white leading-[0.95] mb-8 tracking-tighter shadow-sm">
              Empowering Your<br />
              <span className="text-grad">Digital Future</span>
            </h1>
            
            <p className="text-white/60 text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
              Leading the digital transformation of institutions with smart ERP, finance, and business management tools built for the modern era.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <Link href="/contact" className="btn btn-fill px-10 py-5 rounded-full text-lg shadow-[0_10px_40px_rgba(238,43,71,0.4)]">
                Explore Our Solutions
              </Link>
              <div className="flex items-center gap-4 py-2 px-6 rounded-full bg-white/05 border border-white/10 backdrop-blur-md">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-[#000E22] bg-gray-600 overflow-hidden">
                      <div className="w-full h-full bg-[#EE2B47]/30 flex items-center justify-center text-[11px] font-bold text-white">U{i}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-white/70">
                  <div className="flex items-center gap-1 font-bold text-white">
                    <svg className="w-3.5 h-3.5 text-[#EE2B47]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9/5
                  </div>
                  <div className="text-white/30 font-normal">Expert Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Minimalist Typography & Brand Mission - Explicitly Visible */}
          <div className="relative flex flex-col items-center lg:items-end text-center lg:text-right space-y-16 pr-4 md:pr-10 z-10">
             {/* Glow Overlay to make text pop */}
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#EE2B47]/10 blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none" />

             {/* Supporting Brand Pillar 1 */}
             <div className="flex flex-col items-center lg:items-end">
                <div className="text-[#D4AF37] text-[.65rem] font-bold uppercase tracking-[.6em] mb-4">Evolution</div>
                <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight">
                   Modernizing Industry<br />Standards.
                </h3>
             </div>

             {/* Supporting Brand Pillar 2 */}
             <div className="flex flex-col items-center lg:items-end">
                <div className="text-[#EE2B47] text-[.65rem] font-bold uppercase tracking-[.6em] mb-4">Security</div>
                <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight">
                   Integrity at Every<br />Digital Layer.
                </h3>
             </div>

             {/* Supporting Brand Pillar 3 */}
             <div className="flex flex-col items-center lg:items-end">
                <div className="text-white/40 text-[.65rem] font-bold uppercase tracking-[.6em] mb-4">Foundation</div>
                <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight">
                   Built to Scale for<br />the Next Century.
                </h3>
             </div>

             {/* Minimalist divider element */}
             <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-transparent via-[#EE2B47]/20 to-transparent" />
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[#EE2B47]/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        {/* Integrated Logo Strip - Seamlessly blended into the Hero visual bottom */}
        <div className="absolute bottom-0 left-0 w-full z-20 py-12 border-t border-white/05 bg-gradient-to-t from-[#000E22] to-transparent backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-10 md:gap-20 justify-center flex-wrap opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
               <span className="text-white text-[.65rem] font-bold uppercase tracking-[.4em] whitespace-nowrap border-r border-white/20 pr-10 mr-[-10px]">As seen on</span>
               {LOGOS.map((l) => (
                 <span key={l} className="text-white/70 text-[.6rem] font-bold tracking-[.45em] uppercase hover:text-white transition-colors">{l}</span>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INSTITUTIONAL EVOLUTION SHOWCASE ═══ */}
      <section className="py-32 bg-white border-b border-gray-50 relative z-30 slant-t-sm bg-pattern-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Left Side: Strategic Narrative */}
            <div ref={sSvc as React.RefObject<HTMLDivElement>} className="relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#EE2B47]/05 border border-[#EE2B47]/10 mb-8">
                 <span className="w-2 h-2 rounded-full bg-[#EE2B47] animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[.3em] text-[#EE2B47]">Standard of Excellence</span>
              </div>

              <h2 className="rs font-serif text-[3.5rem] md:text-[4.5rem] text-[#000E22] leading-[1.1] mb-10 tracking-tight">
                Modernizing<br />
                <span className="text-[#EE2B47]">Institutional Reality</span>
              </h2>
              
              <p className="rs d1 text-[#6B7280] leading-relaxed mb-14 text-xl max-w-xl">
                We bridge the gap between traditional operations and the high-speed digital economy. Sanothimi isn't just software—it's a transformation partner for the modern era.
              </p>

              {/* Strategic Ribbon instead of bullets */}
              <div className="rs d2 flex flex-col gap-10">
                 {[
                   { label: 'Intelligence', desc: 'Predictive analytics for informed decisioning' },
                   { label: 'Security', desc: 'Enterprise-grade encryption and protocol compliance' },
                   { label: 'Logistics', desc: 'Unified flow management for global operations' }
                 ].map((pill, idx) => (
                    <div key={idx} className="group flex items-start gap-8">
                       <div className="flex flex-col items-center">
                          <div className="text-[10px] font-black text-[#000E22]/20 group-hover:text-[#EE2B47] transition-colors">0{idx + 1}</div>
                          <div className="w-px h-12 bg-gray-100 group-hover:bg-[#EE2B47]/30 mt-2 transition-colors" />
                       </div>
                       <div>
                          <div className="text-xs font-black uppercase tracking-[.45em] text-[#000E22] mb-2 group-hover:translate-x-2 transition-transform duration-500">{pill.label}</div>
                          <div className="text-[#6B7280] text-sm font-medium">{pill.desc}</div>
                       </div>
                    </div>
                 ))}
              </div>
            </div>

            {/* Right Side: 3D Layered Glass Ecosystem */}
            <div className="relative perspective-2000">
              {/* Atmospheric Background Layer */}
              <div className="absolute -inset-10 z-0 opacity-10 blur-2xl">
                 <img src="/image-2.png" alt="" className="w-full h-full object-cover rounded-full" />
              </div>

              {/* Layered Glass Stack */}
              <div className="relative z-10 space-y-[-120px] lg:space-y-[-180px]">
                 
                 {/* Top Case: UI Layer */}
                 <div className="rs d3 relative ml-auto w-full max-w-sm aspect-video bg-white/40 backdrop-blur-3xl border border-white/60 rounded-3xl shadow-2xl p-6 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-1000 z-30">
                    <div className="flex items-center justify-between mb-8">
                       <div className="w-10 h-10 rounded-xl bg-[#000E22] flex items-center justify-center p-2">
                          <img src="/logo-no-background.png" alt="" className="w-full h-full object-contain brightness-0 invert" />
                       </div>
                       <div className="h-5 w-20 bg-[#EE2B47]/10 rounded-full" />
                    </div>
                    <div className="space-y-3">
                       <div className="h-2 w-3/4 bg-[#000E22]/05 rounded-full" />
                       <div className="h-2 w-1/2 bg-[#000E22]/05 rounded-full" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-[#D4AF37] text-white text-[9px] font-black tracking-widest rounded-lg shadow-xl uppercase">Live Dashboard</div>
                 </div>

                 {/* Middle Case: Security Layer */}
                 <div className="rs d4 relative mx-auto w-full max-w-md aspect-video bg-[#000E22] rounded-3xl shadow-3xl overflow-hidden border border-white/10 z-20 group">
                    <img src="/image-2.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#000E22] via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                       <div className="text-[10px] font-black text-[#EE2B47] uppercase tracking-[.3em] mb-1">Security Node</div>
                       <div className="text-white font-bold text-sm tracking-wide">AES-256 Protocol Active</div>
                    </div>
                 </div>

                 {/* Bottom Case: Infra Layer */}
                 <div className="rs d5 relative mr-auto w-full max-w-sm aspect-video bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl p-8 transform rotate-[3deg] hover:rotate-0 transition-transform duration-1000 z-10">
                    <div className="flex flex-col justify-end h-full">
                       <div className="text-[10px] font-black text-[#000E22]/30 uppercase tracking-[.4em] mb-4">Infrastructure</div>
                       <div className="flex gap-2">
                          {[1,2,3,4].map(i => (
                             <div key={i} className="flex-1 h-1 bg-[#000E22]/10 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-[#D4AF37]" style={{ animationDelay: `${i*0.2}s` }} />
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
      {/* Decorative brand ornament */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#EE2B47]/05 blur-3xl rounded-full -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* ═══ TECHNOLOGY SUITE CAROUSEL ═══ */}
      <section className="py-32 bg-[#F9FAF9] relative z-20 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:sticky lg:top-40 z-20">
             <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
                <span className="w-8 h-px bg-[#EE2B47]" />
                Our Technology Suite
             </div>
             <h2 className="font-serif text-[3rem] md:text-[4rem] text-[#000E22] leading-tight mb-8 tracking-tighter">
                Solutions Designed<br />for the <span className="italic">Future.</span>
             </h2>
             <p className="text-[#6B7280] text-lg leading-relaxed max-w-sm">
                Comprehensive, modular cloud-based tools designed to digitize every layer of your organizational workflow.
             </p>
          </div>

          {/* Right Column: Horizontal Scroll Gallery with Top Control Bar */}
          <div className="relative group/gallery">
             
             <div 
               ref={carouselRef}
               className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-8 pb-10 scroll-smooth scroll-pl-6 md:scroll-pl-0 pr-[50vw]"
             >
                {SERVICES.map((s, i) => (
                  <div key={s.num} className="flex-shrink-0 w-[85vw] md:w-[60%] lg:w-[50%] snap-start">
                    <div className="bg-white p-10 md:p-14 lg:p-16 rounded-[4rem] border border-gray-100 hover:border-[#EE2B47]/20 transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-[#000E22]/05 flex flex-col h-full bg-pattern-light overflow-hidden group/card relative">
                       {/* Subtle Background Accent */}
                       <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[4rem] -z-10 group-hover/card:bg-[#EE2B47]/05 transition-colors" />

                       <h3 className="font-serif font-bold text-[#000E22] text-2xl md:text-3xl mb-8 leading-tight max-w-[200px]">
                          {s.title}
                       </h3>
                       
                       <p className="text-[#6B7280] text-[.95rem] leading-relaxed mb-12 flex-grow">
                          {s.desc}
                       </p>

                       {/* Module Detail Grid */}
                       <div className="pt-10 border-t border-gray-100 mt-auto">
                          <div className="text-[10px] font-black text-[#EE2B47] uppercase tracking-[.4em] mb-8">Service Ecosystem</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
                             {s.modules.map((m) => (
                               <div key={m} className="flex items-center gap-4 group/m">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#EE2B47]/40 group-hover/m:bg-[#EE2B47] transition-colors" />
                                  <span className="text-[#000E22] text-[11px] font-bold tracking-wide whitespace-nowrap">{m}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
                {/* Massive Spacer to allow the final card to snap-start perfectly */}
                <div className="flex-shrink-0 w-full" />
             </div>

             {/* GROUPED HIGH-VISIBILITY CONTROLS - Repositioned to Bottom */}
             <div className="flex items-center gap-12 mt-10 pt-6 border-t border-gray-100 hidden lg:flex">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#EE2B47] animate-pulse" />
                   <span className="text-[#000E22] text-[10px] font-black uppercase tracking-[.4em]">Discovery Platform</span>
                </div>
                
                <div className="flex items-center gap-4">
                   <button 
                     onClick={() => scroll('l')}
                     className="w-11 h-11 rounded-full bg-white border border-gray-100 text-[#000E22] flex items-center justify-center hover:bg-gray-50 transition-all shadow-md group/btn-l"
                     aria-label="Previous"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                   </button>
                   <button 
                     onClick={() => scroll('r')}
                     className="w-11 h-11 rounded-full bg-[#EE2B47] text-white flex items-center justify-center hover:bg-[#D91E36] transition-all shadow-xl shadow-[#EE2B47]/20 group/btn-r"
                     aria-label="Next"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                   </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ═══ SPLIT ABOUT SECTION - Premium Aesthetic Overhaul ═══ */}
      <section className="split-about relative z-0 -mt-20 pt-20">
        <div className="split-about-left relative bg-[#001C44] flex items-center justify-center py-32 lg:py-0 overflow-hidden">
           {/* High-Impact Brand Background - Official Asset - Enhanced Visibility */}
           <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none select-none">
              <img 
                src="/logo-no-background.png" 
                alt="" 
                className="w-[85%] h-full object-contain transform scale-110 lg:scale-[1.8] opacity-70" 
              />
           </div>
           
           {/* Focused Central Brand Element */}
           <div className="relative z-10 text-center px-10">
              <div className="mb-12 flex justify-center">
                 <img src="/logo-no-background.png" alt="Sanothimi" className="w-48 h-auto object-contain opacity-90 drop-shadow-2xl" />
              </div>
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-[10px] font-black tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47]" />
                 Global SaaS Standards
              </div>
              <h3 className="text-white text-4xl md:text-5xl font-serif tracking-tight leading-tight">Product Excellence.</h3>
           </div>
        </div>

        <div className="split-about-right flex flex-col justify-center bg-[#001C44] lg:bg-transparent">
            <div ref={sAbout as React.RefObject<HTMLDivElement>} className="py-20 lg:py-0">
                <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
                   <span className="w-8 h-px bg-[#EE2B47]" />
                   The Sanothimi Identity
                </div>
                <h2 className="rs font-serif text-5xl md:text-6xl text-white leading-[1.1] mb-10 tracking-tight">
                  We are Sanothimi,<br /><span className="italic text-[#EE2B47]">a SaaS Provider.</span>
                </h2>
                <p className="rs d1 text-white/50 leading-relaxed mb-12 text-lg max-w-xl">
                  Dedicated to providing clear, actionable digital transformation that respects the operational frameworks of your specific industry while scaling globally.
                </p>
                
                <ul className="rs d2 space-y-5 mb-16">
                  {['Enterprise Scalability & Security','Intuitive User-Centric Workflows','Cloud-Native Scalable Architecture'].map(item => (
                    <li key={item} className="flex items-center gap-4 text-white/80 font-bold text-sm tracking-wide">
                       <span className="w-6 h-6 rounded-full bg-[#EE2B47]/10 border border-[#EE2B47]/30 flex items-center justify-center text-[#EE2B47]">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                       </span>
                       {item}
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="rs d3 group inline-flex items-center gap-4 bg-[#EE2B47] text-white px-12 py-5 rounded-full font-bold hover:bg-white hover:text-[#EE2B47] transition-all duration-500 shadow-2xl shadow-[#EE2B47]/20">
                  Get Started 
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>

                {/* MODERNISED STATS DISCOVERY BAR */}
                <div className="rs d4 mt-24 pt-12 border-t border-white/10 flex flex-wrap gap-x-16 gap-y-10">
                  {counters.map((c, i) => (
                    <div key={STATS[i].label} ref={c.ref} className="group">
                      <div className="text-4xl font-serif font-bold text-white mb-3 flex items-baseline gap-1 group-hover:text-[#EE2B47] transition-colors">
                        {c.val}<span className="text-xl text-[#EE2B47]">{STATS[i].suf}</span>
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-black leading-tight group-hover:text-white transition-colors">{STATS[i].label}</div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="py-40 bg-white relative z-20 slant-t-md">
        <div className="max-w-4xl mx-auto px-6 text-center" ref={sTest as React.RefObject<HTMLDivElement>}>
          <div className="rs text-[#DABFFF] text-6xl font-serif mb-6 leading-none">&ldquo;</div>
           <blockquote className="rs d1 font-serif text-2xl md:text-3xl text-[#001C44] leading-snug mb-12 italic">
             Working with Sanothimi has been a game-changer for our institution. Their SchoolSathi platform simplified our complex billing and saved us countless hours of administrative work.
           </blockquote>
           <div className="rs d2 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 p-1 border-2 border-[#D4AF37]">
                 <div className="w-full h-full rounded-full bg-[#001C44] flex items-center justify-center text-white font-bold underline decoration-[#D4AF37]">JC</div>
              </div>
             <div>
                <div className="font-bold text-[#0A0F19] text-sm">James Craig</div>
                <div className="text-xs text-[#6B7280]">Principal, City Academy</div>
             </div>
          </div>
        </div>
      </section>

       {/* ═══ CALL TO ACTION IMAGE - Enhanced with image-3 glassy background ═══ */}
       <section className="relative h-[400px] overflow-hidden slant-t-xl-rev z-10 flex items-center justify-center bg-[#001C44]">
          <div className="absolute inset-0 opacity-[.08] pointer-events-none">
             <img src="/image-3.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#000E22] via-[#000E22]/60 to-[#000E22]/10" />
          
          <div className="relative z-20 text-center">
             <div className="text-[#D4AF37] text-7xl font-serif opacity-10 mb-[-2rem]">&ldquo;</div>
             <p className="text-white/50 text-xl font-serif italic max-w-lg mb-8">Excellence in every institutional detail.</p>
             <div className="h-0.5 w-12 bg-[#EE2B47] mx-auto opacity-50" />
          </div>
       </section>

    {/* ═══ WHY CHOOSE SECTION - Cinematic Value Grid ═══ */}
    <section className="py-32 bg-white relative z-20 -mt-20" ref={sWhy as React.RefObject<HTMLDivElement>}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24">
           <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
              <span className="w-8 h-px bg-[#EE2B47]" />
              Strategic Advantage
           </div>
           <h2 className="rs font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15] mb-8">
              Why Leaders Choose Sanothimi for <br /><span className="text-[#EE2B47] italic">Digital Transformation.</span>
           </h2>
           <p className="rs d1 text-[#6B7280] leading-relaxed text-lg max-w-2xl">
              We provide a level of expertise and personal attention that ensures your institution stays efficient, secure, and thrives in the digital age.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
               id:'01', 
               t:'Proven Scale & Security', 
               d:'Our systems are built to handle thousands of users with enterprise-grade encryption and 99.9% uptime.',
               icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4m0 4h.01" /></svg>
            },
            { 
               id:'02', 
               t:'Localized for Regional Needs', 
               d:'We understand the specific regulatory and operational challenges of businesses and schools in Nepal.',
               icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>
            },
            { 
               id:'03', 
               t:'Intuitive & Easy to Use', 
               d:'Our UX is designed for simplicity, ensuring your staff can master the tools with minimal training.',
               icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M15 15l5 5m0 0l-5 5m5-5H3m12-9l5 5m0 0l-5 5m5-5H3" /></svg>
            },
            { 
               id:'04', 
               t:'Round-the-Clock Support', 
               d:'We offer dedicated local support to ensure your operations never face downtime or confusion.',
               icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            },
          ].map((w, i) => (
             <div key={w.id} className={`rs d${i+2} p-10 rounded-[2.5rem] bg-white border border-gray-100 group hover:bg-[#001C44] hover:border-[#001C44] transition-all duration-700 hover:-translate-y-4 shadow-sm hover:shadow-2xl hover:shadow-[#EE2B47]/20 flex flex-col items-start h-full`}>
                <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-[#EE2B47] flex items-center justify-center text-[#001C44] group-hover:text-white mb-10 transition-all duration-500 scale-110">
                   {w.icon}
                </div>
                <h4 className="font-serif font-bold text-[#001C44] text-[1.25rem] mb-6 leading-tight group-hover:text-white transition-colors">{w.t}</h4>
                <p className="text-[#6B7280] text-[.9rem] leading-relaxed group-hover:text-white/60 transition-colors">{w.d}</p>
             </div>
          ))}
        </div>
      </div>
    </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <CTABanner
        title={'Start Your Digital Journey\nwith Sanothimi'}
        sub="Let's transform your organizational efficiency together."
        cta="Get Started"
      />
    </main>
  );
}

