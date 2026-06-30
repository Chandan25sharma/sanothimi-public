'use client';
import CTABanner from '@/components/CTABanner';
import { useState, type FormEvent } from 'react';

const CATEGORIES = [
  {
    id: 'thought-leadership',
    title: 'Thought Leadership',
    desc: 'Perspectives on ERP, cloud infrastructure, and digital transformation in Nepal.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    id: 'events',
    title: 'Events & Webinars',
    desc: 'Upcoming sessions, training workshops, and community meetups.',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    id: 'news',
    title: 'News & Announcements',
    desc: 'Product updates, releases, and company milestones.',
    icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
  },
  {
    id: 'brochures',
    title: 'Brochures',
    desc: 'Downloadable product overviews and technical specification sheets.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
];

export default function InsightsPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <main>
      {/* Hero */}
      <div className="relative pt-40 pb-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="text-[#D32F2F] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">Insights</div>
          <h1 className="font-serif text-5xl md:text-6xl text-[#0D47A1] leading-[1.15] tracking-tight">
            Ideas, updates &{' '}
            <span className="relative inline-block">
              resources.
              <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#D32F2F] rounded-full" />
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed mt-8">
            Everything we&rsquo;re learning and building — from product news to lessons on running modern institutions.
          </p>
        </div>
      </div>

      {/* Featured: real case study */}
      <section id="case-studies" className="py-28 bg-white relative z-10 -mt-12 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-kicker mb-6"><span className="section-kicker-line" />Featured Case Study</div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-black/5">
            <div className="lg:col-span-2 bg-[#0D47A1] p-10 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern-dark opacity-40 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[.6rem] font-black uppercase tracking-[.25em] text-[#D32F2F] mb-4">Education · Kathmandu</div>
                <div className="font-serif text-3xl text-white leading-tight mb-2">BrightPath Academy</div>
                <div className="text-white/40 text-sm">1,200+ students · SchoolSathi ERP</div>
              </div>
            </div>
            <div className="lg:col-span-3 p-10 flex flex-col justify-center">
              <div className="font-serif text-[5rem] text-[#D32F2F] opacity-15 leading-none mb-2 select-none">&ldquo;</div>
              <blockquote className="text-xl text-[#0D47A1] leading-relaxed italic -mt-8 mb-6">
                SchoolSathi transformed how we manage 1,200 students. Fee collection that used to take our staff two weeks now runs automatically. It paid for itself in the first month.
              </blockquote>
              <div>
                <div className="font-bold text-[#0D47A1] text-sm">Sarah Mitchell</div>
                <div className="text-[#64748B] text-xs">Principal, BrightPath Academy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="py-20 bg-[#F8FAFC] border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-kicker mb-6"><span className="section-kicker-line" />Browse by Category</div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0D47A1] leading-tight mb-14">
            New content added <span className="italic text-[#D32F2F]">regularly.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map((c) => (
              <div key={c.id} id={c.id} className="p-8 rounded-2xl bg-white border border-gray-100 scroll-mt-28">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#D32F2F]/8 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d={c.icon}/></svg>
                  </div>
                  <span className="text-[.6rem] font-black uppercase tracking-[.2em] text-gray-300">Coming Soon</span>
                </div>
                <div className="font-serif text-xl text-[#0D47A1] font-bold mb-2">{c.title}</div>
                <p className="text-[#64748B] text-[.85rem] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-28 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="section-kicker justify-center mb-6"><span className="section-kicker-line" />Stay Updated<span className="section-kicker-line" /></div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0D47A1] leading-tight mb-5">
            Get notified when we <span className="italic text-[#D32F2F]">publish.</span>
          </h2>
          <p className="text-[#64748B] text-base leading-relaxed mb-10">
            No spam — just product updates and the occasional useful read.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
              Thanks — you&rsquo;re on the list.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-[#0D47A1] placeholder:text-gray-400 outline-none focus:border-[#D32F2F] transition-all"
              />
              <button type="submit" className="bg-[#D32F2F] text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[#B71C1C] transition-all shadow-lg shadow-[#D32F2F]/20 flex-shrink-0">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <CTABanner
        title={'Want to see this\nin practice?'}
        sub="Talk to our team or book a live walkthrough of the platform."
        cta="Request Demo"
        ctaHref="/demo"
      />
    </main>
  );
}
