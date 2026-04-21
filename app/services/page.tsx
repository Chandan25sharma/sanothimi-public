'use client';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

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

const SERVICES = [
  {
    num: '01', 
    title: 'School Management (ERP)',
    desc: "Our flagship SchoolSathi platform digitizes entire educational institutions, from admissions to graduation.",
    bullets: ['Automated Fee Collection', 'Exam & Result Management', 'Parent Portal', 'Digital Attendance'],
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
    demo: '/demo/schoolsathi'
  },
  {
    num: '02', 
    title: 'Financial Management Suite',
    desc: 'Secure, cloud-based accounting solutions designed specifically for localized VAT compliance in Nepal.',
    bullets: ['Localized VAT Reporting', 'Cloud Ledger Sync', 'Multi-User Control', 'Financial Statements'],
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    demo: '/demo/finance'
  },
  {
    num: '03', 
    title: 'Inventory & Supply Chain',
    desc: 'Real-time tracking of stock levels across multiple locations with automated low-stock alerts.',
    bullets: ['Multi-Warehouse Sync', 'Automated Reordering', 'Barcode System', 'Stock Analytics'],
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    demo: '/demo/inventory'
  },
  {
    num: '04', 
    title: 'Business Intelligence',
    desc: 'Bespoke dashboards and advanced analytics tools to help business owners monitor performance.',
    bullets: ['Real-time KPI Dashboards', 'Trend Analysis', 'Custom Reports', 'Market Insights'],
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    demo: '/demo/bi'
  },
  {
    num: '05', 
    title: 'Payroll & HR Management',
    desc: 'Simplify employee management with automated payroll and attendance tracking systems.',
    bullets: ['Automated Salary', 'Attendance Tracking', 'Performance Reviews', 'Digital Vault'],
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    demo: '/demo/hr'
  },
  {
    num: '06', 
    title: 'Custom Software Dev',
    desc: 'Specific business challenges require specific solutions built from the ground up.',
    bullets: ['Custom API Integration', 'Web Applications', 'System Migration', '24/7 Support'],
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    demo: '/demo/custom'
  },
];

const PROCESS = [
  { step: '01', title: 'Consultation', desc: 'Identify your operational bottlenecks.' },
  { step: '02', title: 'Live Demonstration', desc: 'Experience the tools tailored to your needs.' },
  { step: '03', title: 'Deployment', desc: 'Full migration and staff education cycle.' },
];

export default function ServicesPage() {
  const s1 = useReveal();
  const s2 = useReveal();

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
              Technology Suite
           </div>
           <h1 className="font-serif text-6xl md:text-8xl text-white leading-[1.1] tracking-tighter">
             Advanced<br /><span className="italic text-[#EE2B47]">SaaS Systems.</span>
           </h1>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#001C44] to-transparent" />
      </div>

      {/* ── Discovery Bar ── */}
      <section className="bg-white border-b border-gray-100 relative z-10 -mt-10 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-wrap justify-between items-center gap-12">
           <div className="max-w-xs">
              <h2 className="font-serif text-3xl text-[#001C44] leading-tight">Guiding Your <br />Digital Evolution.</h2>
           </div>
           <div className="flex flex-wrap gap-x-12 gap-y-6">
              {[
                { label:'Transformation', desc:'Complete Digitization' },
                { label:'Scalability', desc:'Enterprise Growth' },
                { label:'Reliability', desc:'99.9% Uptime' },
              ].map((f) => (
                <div key={f.label} className="group">
                  <div className="text-[9px] uppercase tracking-[0.3em] text-[#EE2B47] font-black mb-1">{f.label}</div>
                  <div className="text-xl font-serif font-bold text-[#001C44] group-hover:text-[#EE2B47] transition-colors">{f.desc}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── Service Showcase: The Gallery ── */}
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-32 bg-[#F9FAF9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
             <div className="rs inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
                Solution Portfolio
             </div>
             <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15] mb-8">
                Elevate Your Success with<br /><span className="text-[#EE2B47] italic">Sanothimi Enterprise.</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((s, i) => (
              <div key={s.num} className={`rs d${(i % 2) + 2} group p-10 md:p-14 rounded-[3.5rem] bg-white border border-gray-100 flex flex-col items-start h-full hover:shadow-2xl hover:shadow-[#EE2B47]/5 transition-all duration-700`}>
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[#001C44] group-hover:bg-[#EE2B47] group-hover:text-white mb-10 transition-all duration-500">
                   {s.icon}
                </div>
                
                <h3 className="font-serif text-3xl text-[#001C44] mb-6 leading-tight">{s.title}</h3>
                <p className="text-[#6B7280] text-[1.05rem] leading-relaxed mb-10">{s.desc}</p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-[#6B7280] text-[.85rem] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47]" /> {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8 flex flex-wrap gap-4 w-full">
                   <Link href="/contact" className="flex-1 min-w-[140px] text-center bg-[#001C44] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#EE2B47] transition-all duration-500 whitespace-nowrap overflow-hidden">
                      Consult Now
                   </Link>
                   <Link href={s.demo} className="flex-1 min-w-[140px] text-center border border-gray-100 text-[#001C44] px-8 py-4 rounded-full font-bold text-sm hover:border-[#EE2B47] hover:text-[#EE2B47] transition-all duration-500 whitespace-nowrap overflow-hidden">
                      View Demo
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deployment Lifecycle: The Roadmap ── */}
      <section ref={s2 as React.RefObject<HTMLDivElement>} className="py-32 bg-[#001C44] relative overflow-hidden">
        {/* Decorative S Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.02] text-white text-[30rem] font-serif leading-none select-none">S</div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="max-w-2xl mx-auto mb-20">
             <div className="rs inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
                Implementation Logic
             </div>
             <h2 className="rs d1 font-serif text-4xl text-white leading-[1.2] mb-10">Focused, Professional & <br /><span className="italic">Results-Driven.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PROCESS.map((p, i) => (
              <div key={p.step} className={`rs d${i+2} bg-white/5 border border-white/10 rounded-[3rem] p-10 text-center hover:border-[#EE2B47]/40 hover:bg-white/10 transition-all duration-500 group`}>
                <div className="w-16 h-16 rounded-2xl bg-[#001C44] border border-white/10 flex items-center justify-center text-[#EE2B47] font-serif text-2xl mx-auto mb-8 group-hover:bg-[#EE2B47] group-hover:text-white transition-all duration-500 shadow-xl shadow-black/20">{p.step}</div>
                <h3 className="font-serif text-2xl text-white mb-4 leading-tight">{p.title}</h3>
                <p className="text-white/40 text-[.9rem] leading-relaxed max-w-[220px] mx-auto">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={'Start Your Digital Journey\nwith Sanothimi'}
        sub="Let's transform your organizational efficiency together."
        cta="Get Started"
      />
    </main>
  );
}
