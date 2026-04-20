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
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-[.72rem] font-bold uppercase tracking-[.2em] text-[#EE2B47] mb-3">Our Mission</p>
          <h1 className="font-serif text-5xl text-white leading-tight">About<br />Sanothimi</h1>
        </div>
      </div>

      {/* ── Detailed Bio ── */}
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Big statement */}
          <h2 className="rs font-serif text-[1.75rem] md:text-[2.2rem] text-[#0A0F19] leading-snug max-w-4xl mb-16">
            A dedicated technology partner based in Bhaktapur, Nepal, empowering institutions with world-class SaaS solutions.
          </h2>

          {/* Bio grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-16">
            {/* Photo placeholder */}
            <div className="rs photo-fill h-[320px] rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-100 shadow-xl bg-gradient-to-br from-[#001C44] to-[#000E22]">
              <div className="text-white font-bold text-9xl opacity-20">S</div>
            </div>

            {/* Text */}
            <div className="rs d1 lg:col-span-2 space-y-4 text-[#6B7280] text-[.95rem] leading-relaxed">
              <p>Sanothimi Technologies is a premier SaaS provider in Nepal, focused on bridging the gap between traditional operations and modern digital efficiency. Based in Bhaktapur, we serve institutions across the nation with specialized tools that simplify complex workflows.</p>
              <p>From our flagship **SchoolSathi ERP** to our comprehensive business suites, we combine robust cloud technology with practical, localized insights. Our goal is to ensure that every organization we partner with achieves higher efficiency, data safety, and sustainable growth.</p>
              <div className="pt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-fill px-6 py-3 rounded-lg">Get Started with a Demo</Link>
              </div>
            </div>
          </div>

          {/* Certs */}
          <div className="rs d2 flex flex-wrap gap-2.5">
            {['SaaS Provider','ERP Solutions','Cloud Tech','Security First'].map((c) => (
              <span key={c} className="text-[.78rem] font-bold text-[#001C44] bg-[#EE2B47]/10 border border-[#EE2B47]/25 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <svg className="w-3 h-3 text-[#EE2B47]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Timeline ── */}
      <section className="py-24 bg-[#F9FAF9] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <p className="text-[.72rem] font-bold uppercase tracking-[.2em] text-[#EE2B47] mb-3">Professional Journey</p>
              <h2 className="font-serif text-4xl text-[#0A0F19] leading-tight mb-8">Sanothimi Journey & Milestones</h2>
              <p className="text-[#6B7280] leading-relaxed italic mb-8 border-l-2 border-[#EE2B47] pl-6">
                &ldquo;Our growth has been driven by a relentless focus on creating tools that truly matter for the local institutions we serve.&rdquo;
              </p>
            </div>
            <div className="lg:col-span-3 space-y-12 relative">
              <div className="timeline-line" />
              {EXPERIENCES.map((ex, i) => (
                <div key={i} className="rs d1 timeline-item flex gap-10 relative">
                  <div className="timeline-dot mt-1" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[.65rem] font-bold text-[#EE2B47] uppercase tracking-widest">{ex.year}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-[.75rem] font-medium text-gray-400">{ex.location}</span>
                    </div>
                    <h4 className="font-bold text-[#0A0F19] text-xl mb-1">{ex.company}</h4>
                    <p className="text-[#6B7280] text-sm font-medium">{ex.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats (dark) ── */}
      <section ref={s2 as React.RefObject<HTMLDivElement>} className="bg-[#0A0F19] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
            {/* Stats text */}
            <div>
              <p className="rs text-[.72rem] font-bold uppercase tracking-[.2em] text-[#EE2B47] mb-3">By The Numbers</p>
              <h2 className="rs d1 font-serif text-4xl text-white leading-tight mb-8">
                5+ Years of<br />Measurable Results
              </h2>
              <div className="grid grid-cols-3 gap-5 mb-8">
                { [
                   { val:'Since 2019', label:'In Enterprise' },
                   { val:'10K+', label:'Active Users' },
                   { val:'99.9%', label:'Platform Uptime' },
                 ].map((s) => (
                   <div key={s.label} className="rs d2">
                     <div className="font-serif text-2xl text-[#EE2B47] mb-1">{s.val}</div>
                    <div className="text-white/35 text-[.72rem] font-semibold uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Me ── */}
      <section ref={s3 as React.RefObject<HTMLDivElement>} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="rs text-[.72rem] font-bold uppercase tracking-[.2em] text-[#EE2B47] mb-3">Why Choose Sanothimi</p>
            <h2 className="rs d1 font-serif text-4xl text-[#0A0F19] leading-tight">Technology You Can Trust</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w, i) => (
              <div key={w.title} className={`rs d${i+1} why-card text-center`}>
                <div className="w-14 h-14 rounded-2xl bg-[#EE2B47]/10 border border-[#EE2B47]/20 flex items-center justify-center text-2xl mx-auto mb-4 text-[#EE2B47]">{w.icon}</div>
                <h3 className="font-bold text-[#0A0F19] text-[.95rem] mb-2">{w.title}</h3>
                <p className="text-[#6B7280] text-[.82rem] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title={'Scale Your Institution\nwith Sanothimi'} sub="Ready to get started?" cta="Get Started" />
    </main>
  );
}
