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
  { num: '01', title: 'School Management (ERP)', desc: 'Empower your institution with SchoolSathi — the all-in-one system for admissions, exams, and billing.' },
  { num: '02', title: 'Financial Management Tools', desc: 'Secure, cloud-based accounting solutions designed specifically for high-growth businesses and SMEs.' },
  { num: '03', title: 'Business Intelligence', desc: 'Insightful real-time dashboards that help you monitor performance and make data-driven decisions.' },
  { num: '04', title: 'Inventory & Asset Tracking', desc: 'Precise management of your logistics and inventory across multiple locations with automated alerts.' },
  { num: '05', title: 'Custom SaaS Solutions', desc: 'Bespoke software development to solve the unique digital challenges of your specific industry.' },
  { num: '06', title: 'Enterprise Data Security', desc: 'Next-gen encryption and cloud infrastructure to ensure your organizational data remains safe and private.' },
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

  return (
    <main className="overflow-hidden">
      {/* ═══ SPLIT HERO ═══ */}
      <section className="split-hero">
        <div className="split-hero-left flex flex-col justify-center px-6 lg:px-20 py-20 lg:py-0 relative overflow-hidden bg-gray-900">
          {/* Main Hero Background Image */}
          <div className="absolute inset-0 z-0">
             <img src="/image-1.png" alt="Hero Background" className="w-full h-full object-cover opacity-60" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#000E22] via-[#000E22]/60 to-transparent" />
          </div>
          
          <div className="relative z-10" ref={sTop as React.RefObject<HTMLDivElement>}>
            <h1 className="rs font-serif text-[3.2rem] md:text-[4.5rem] text-white leading-[1.05] mb-8">
              Empowering Your<br />
              <span className="text-grad">Digital Future</span>
            </h1>
            <p className="rs d1 text-white/60 text-lg max-w-lg mb-10 leading-relaxed">
              Leading the digital transformation of institutions with smart ERP, finance, and business management tools built for the modern era.
            </p>
            <div className="rs d2 flex flex-wrap gap-4 items-center">
              <Link href="/contact" className="btn btn-fill px-8 py-4 rounded-full">
                Explore Our Solutions
              </Link>
              <div className="flex items-center gap-3 ml-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <div className="w-full h-full bg-[#DABFFF]/20 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-white/80">
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#EE2B47]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9/5
                  </div>
                  <div className="text-white/40 font-normal">Expert Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="split-hero-right min-h-[500px] relative bg-mesh overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
             <img src="/image-1.png" alt="" className="w-full h-full object-cover opacity-10" />
             <div className="absolute inset-0 bg-[#001C44]/80" />
          </div>
          <div className="absolute inset-0 bg-pattern opacity-50 z-0" />
          {/* Main Visual: Floating Cards */}
          <div className="relative z-10 w-full max-w-sm">
             <div className="bg-glass-card p-8 rounded-2xl shadow-2xl mb-6 -rotate-2 transform hover:rotate-0 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center font-bold text-[#0A0F19]">
                      <img src="/B-dev.jpg" alt="Profile" className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <div className="text-white font-bold">Sanothimi Cloud</div>
                      <div className="text-white/40 text-xs">SaaS Provider</div>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="h-2 w-full bg-white/5 rounded" />
                   <div className="h-2 w-3/4 bg-white/5 rounded" />
                   <div className="h-2 w-5/6 bg-white/5 rounded" />
                </div>
             </div>
             <div className="bg-[#EE2B47]/10 backdrop-blur-md border border-[#EE2B47]/20 p-6 rounded-2xl shadow-2xl translate-x-12 -mt-4 rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                   <div className="text-[#EE2B47] font-bold text-sm tracking-widest uppercase">Growth</div>
                   <div className="text-[#D4AF37] text-xs">↑ 24%</div>
                </div>
                <div className="flex items-end gap-1 h-12">
                   {[40, 70, 45, 90, 65, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#EE2B47]" style={{ height: `${h}%`, opacity: 0.3 + (i * 0.1) }} />
                   ))}
                </div>
             </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[#EE2B47]/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* ═══ LOGO STRIP ═══ */}
      <div className="bg-[#F3F4F6] py-14 border-y border-gray-100 relative z-20 slant-t">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden pt-8">
          <div className="flex items-center gap-12 md:gap-24 justify-center flex-wrap opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-[#0A0F19] text-[.75rem] font-bold uppercase tracking-[.2em] whitespace-nowrap">As seen on</span>
            {LOGOS.map((l) => (
              <span key={l} className="text-[#0A0F19] text-sm font-bold tracking-widest uppercase">{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ VALUE PROP SECTION ═══ */}
      <section className="py-24 bg-white border-b border-gray-50 relative z-30 slant-t-sm bg-pattern-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div ref={sSvc as React.RefObject<HTMLDivElement>}>
              <h2 className="rs font-serif text-4xl text-[#001C44] leading-tight mb-8">
                Digitize Your Business with Sanothimi Smart Solutions
              </h2>
              <p className="rs d1 h-1 w-20 bg-[#EE2B47] mb-8" />
              <p className="rs d2 text-[#6B7280] leading-relaxed mb-10 text-lg">
                We believe in providing more than just software. We provide a platform that simplifies your operations, automates your tedious tasks, and scales with your ambition.
              </p>
              <div className="rs d3 grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Cloud-Native Tech','Scalable Infrastructure','Local Expert Support'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm font-bold text-[#001C44]">
                    <svg className="w-4 h-4 text-[#EE2B47]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block relative h-full min-h-[500px]">
              {/* Main Container */}
              <div className="w-full h-full bg-[#0A0F19] rounded-3xl overflow-hidden shadow-3xl relative border border-white/5 flex flex-col group transition-all duration-700 hover:shadow-[#DABFFF]/10">
                {/* Background Mesh & Pattern */}
                <div className="absolute inset-0 bg-mesh opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-pattern opacity-10" />
                
                {/* Header of the visual card */}
                <div className="relative z-10 p-8 flex items-center justify-between border-b border-white/5 bg-white/[0.02] backdrop-blur-sm">
                  <div className="flex items-center gap-3">
      
                    <div>
                      <div className="text-white text-sm font-bold">Platform Health</div>
                      <div className="text-white/30 text-[10px] font-bold tracking-widest uppercase">Global Availability</div>
                    </div>
                  </div>
                
                </div>

                {/* Main Visualization Area */}
                <div className="relative z-10 flex-1 p-8 flex flex-col justify-center">
                  {/* Floating Metric Chips */}
                  <div className="absolute top-12 right-12 flex flex-col gap-3">
                    {[
                      { label: 'Uptime', val: '99.99%', color: '#EE2B47' },
                      { label: 'Security', val: 'Encrypted', color: '#D4AF37' }
                    ].map((chip) => (
                      <div key={chip.label} className="bg-white/[0.03] backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl shadow-xl transform hover:scale-105 transition-transform cursor-default">
                        <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-0.5">{chip.label}</div>
                        <div className="text-white text-xs font-bold" style={{ color: chip.color }}>{chip.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Brand Image Visualization - refined as glassy overlay */}
                  <div className="mt-8 relative h-56 w-full rounded-2xl overflow-hidden border border-white/05 shadow-inner group-inner bg-[#000E22]/40 backdrop-blur-3xl">
                    <div className="absolute inset-0 opacity-20 pointer-events-none grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700">
                       <img src="/image-3.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F19] to-transparent" />
                    
                    {/* Dynamic line overlay */}
                    <div className="absolute bottom-4 right-4 text-right z-20">
                       <div className="text-[.55rem] font-bold text-[#D4AF37] uppercase tracking-[.25em]">Cloud Infrastructure</div>
                       <div className="text-white/40 text-[.5rem]">Active Across 7 Nodes</div>
                    </div>
                  </div>

                  {/* Feature Grid inside the visual */}
                  <div className="grid grid-cols-2 gap-4 mt-12">
                    {[
                      { l: 'Efficiency', v: '+45%', d: 'Avg. improvement' },
                      { l: 'Data Safety', v: 'ISO', d: 'Global Standards' }
                    ].map((f) => (
                      <div key={f.l} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-colors">
                        <div className="text-white font-bold text-lg mb-0.5">{f.v}</div>
                        <div className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-1">{f.l}</div>
                        <div className="text-white/20 text-[9px]">{f.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer text */}
                <div className="relative z-10 px-8 py-5 bg-white/[0.02] border-t border-white/5 text-center">
                   <span className="text-white/30 text-[10px] font-bold tracking-[.3em] uppercase">Enterprise SaaS Excellence</span>
                 </div>
               </div>
 
               {/* Decorative Glows */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EE2B47]/10 blur-[80px] rounded-full" />
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#001C44]/10 blur-[80px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="py-32 bg-[#F9FAF9] relative z-10 curve-b shadow-[0_10px_30px_rgba(0,0,0,0.02)] slant-t-md-rev">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-[#EE2B47] text-[.75rem] font-bold uppercase tracking-[.25em] mb-4">Our Technology Suite</p>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Comprehensive cloud-based tools designed to digitize your organizational workflow and drive sustainable growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.num} className="bg-white p-10 rounded-xl border border-gray-100 hover:border-[#EE2B47] transition-all group">
                <div className="text-[.65rem] font-bold text-[#6B7280] uppercase tracking-widest mb-6 group-hover:text-[#EE2B47] transition-colors">{s.num}</div>
                <h3 className="font-bold text-[#0A0F19] text-[1.1rem] mb-4 leading-tight">{s.title}</h3>
                <p className="text-[#6B7280] text-[.88rem] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SPLIT ABOUT SECTION ═══ */}
      <section className="split-about relative z-0 -mt-20 pt-20">
        <div className="split-about-left relative bg-[#0A0F19] flex items-center justify-center py-20 lg:py-0 overflow-hidden">
           <img src="/B-dev.jpg" alt="BrahamDev Sharma" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F19] to-transparent" />
           <div className="relative z-10 text-center">
              <div className="w-40 h-40 bg-white/5 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-8 shadow-3xl backdrop-blur-sm overflow-hidden text-white font-bold text-5xl">
                 S
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs font-bold tracking-widest uppercase mb-4">
                 SaaS Provider
              </div>
              <h3 className="text-white text-2xl font-serif">Product Excellence</h3>
           </div>
        </div>
        <div className="split-about-right flex flex-col justify-center">
            <div ref={sAbout as React.RefObject<HTMLDivElement>}>
                <h2 className="rs font-serif text-4xl md:text-5xl text-white leading-tight mb-8">
                  We are Sanothimi,<br />a SaaS Provider
                </h2>
                <p className="rs d1 text-white/40 leading-relaxed mb-10 text-lg">
                  Dedicated to providing clear, actionable digital transformation that respects the operational frameworks of your specific industry.
                </p>
                <ul className="rs d2 space-y-4 mb-12">
                  {['Enterprise Reliability','User-Centric Workflows','Scalable Architecture'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white font-bold text-sm">
                       <span className="w-5 h-5 rounded-full bg-[#EE2B47] flex items-center justify-center text-white text-[8px]">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                       </span>
                       {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="rs d3 btn bg-[#EE2B47] text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-[#EE2B47] transition-all shadow-xl shadow-[#EE2B47]/20">
                  Get Started
                </Link>

                <div className="rs d4 mt-20 pt-12 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {counters.map((c, i) => (
                    <div key={STATS[i].label} ref={c.ref}>
                     <div className="text-3xl font-bold text-white mb-2">{c.val}{STATS[i].suf}</div>
                     <div className="text-[.6rem] uppercase tracking-widest text-[#D4AF37] font-bold leading-tight">{STATS[i].label}</div>
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

      {/* ═══ WHY CHOOSE SECTION ═══ */}
      <section className="py-24 bg-white relative z-20 -mt-20" ref={sWhy as React.RefObject<HTMLDivElement>}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-20">
             <h2 className="rs font-serif text-4xl text-[#001C44] leading-tight mb-6">
                Why Choose Sanothimi for Your Digital Transformation
             </h2>
            <p className="rs d1 text-[#6B7280] leading-relaxed">
               We provide a level of expertise and personal attention that ensures your institution stays efficient and thrives in the digital age.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id:'01', t:'Proven Scale & Security', d:'Our systems are built to handle thousands of users with enterprise-grade encryption and 99.9% uptime.' },
              { id:'02', t:'Localized for Regional Needs', d:'We understand the specific regulatory and operational challenges of businesses and schools in Nepal.' },
              { id:'03', t:'Intuitive & Easy to Use', d:'Our UX is designed for simplicity, ensuring your staff can master the tools with minimal training.' },
              { id:'04', t:'Round-the-Clock Support', d:'We offer dedicated local support to ensure your operations never face downtime or confusion.' },
            ].map((w, i) => (
               <div key={w.id} className={`rs d${i+2} p-8 rounded-xl bg-[#F9FAF9] group hover:bg-[#001C44] transition-all duration-500`}>
                  <div className="w-10 h-10 rounded-lg bg-[#001C44] group-hover:bg-[#EE2B47] flex items-center justify-center font-bold text-white text-xs mb-6 transition-colors">{w.id}</div>
                 <h4 className="font-bold text-[#0A0F19] text-[.95rem] mb-4 leading-tight">{w.t}</h4>
                 <p className="text-[#6B7280] text-[.8rem] leading-relaxed group-hover:text-[#0A0F19]/60 transition-colors">{w.d}</p>
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
