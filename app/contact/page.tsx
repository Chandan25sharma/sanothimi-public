'use client';
import CTABanner from '@/components/CTABanner';
import { Himalaya, Mandala, NepalMoon, NetworkGraph } from '@/components/BgDecorations';
import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.09 }
    );
    ref.current?.querySelectorAll('.rs').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email Correspondence',
    val: 'info@sanothimi.com',
    href: 'mailto:info@sanothimi.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Direct Line',
    val: '+977 9704714937',
    href: 'tel:+9779704714937',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Innovation Center',
    val: 'Sanothimi, Bhaktapur, Nepal',
    href: '#',
  },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const s1 = useReveal();
  const s4 = useReveal();
  const [form, setForm] = useState({ fname: '', lname: '', email: '', msg: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [k]: e.target.value });
      setErrors({ ...errors, [k]: false });
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, boolean> = {};
    if (!form.fname) err.fname = true;
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = true;
    if (!form.msg) err.msg = true;
    if (Object.keys(err).length) { setErrors(err); return; }

    setStatus('sending');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: `${form.fname} ${form.lname}`,
          from_email: form.email,
          subject: `New Message from ${form.fname}`,
          message: form.msg,
          current_date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      setStatus('sent');
      setForm({ fname: '', lname: '', email: '', msg: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <main>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01. CINEMATIC HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative pt-24 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <NetworkGraph className="absolute inset-0 w-full h-full" />
          <Mandala className="absolute -top-20 -right-20 w-[500px] h-[500px] text-[#0D47A1] opacity-[0.06]" />
          <NepalMoon className="absolute bottom-10 -left-16 w-[300px] h-[300px] text-[#D32F2F] opacity-[0.05]" />
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full border border-[#0D47A1]/[0.04]" />
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#0D47A1]/[0.025] blur-[100px]" />
          <Himalaya className="absolute bottom-0 left-0 w-full text-[#0D47A1] opacity-[0.04]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-[#D32F2F] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
            {t('contact_pg.hero.kicker')}
          </div>

          <h1 className="font-serif text-[2.2rem] sm:text-5xl md:text-7xl text-[#0D47A1] leading-[1.1] tracking-tight">
            {t('contact_pg.hero.title1')}<br />
            <span className="relative inline-block">
              {t('contact_pg.hero.title2')}
              <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#D32F2F] rounded-full" />
            </span>
          </h1>

          <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed mt-10">
            Reach out and our team will respond within 24 hours — typically much faster.
          </p>

          {/* Response time badge */}
          <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 bg-[#F8FAFC] border border-gray-100 rounded-full">
            <div className="live-dot" />
            <span className="text-gray-500 text-[.7rem] font-bold">Average response time: <span className="text-[#0D47A1] font-black">&lt; 2 hours</span></span>
          </div>
        </div>
      </div>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02. CONTACT ARCHITECTURE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-32 bg-white relative z-10 -mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

            {/* LEFT: Contact info */}
            <div className="rs">
              <div className="section-kicker mb-8">
                <span className="section-kicker-line" />
                {t('contact_pg.info.kicker')}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#0D47A1] leading-[1.2] mb-10">
                {t('contact_pg.info.title1')}{' '}
                <span className="italic text-[#D32F2F]">{t('contact_pg.info.title2')}</span>
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed max-w-xl mb-12">
                {t('contact_pg.info.desc')}
              </p>

              {/* Contact cards */}
              <div className="flex flex-col gap-4">
                {INFO.map((c, i) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className={`rs d${i + 1} info-card group`}
                  >
                    <div className="info-card-icon">
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[.62rem] font-black uppercase tracking-[.22em] text-[#D32F2F] group-hover:text-[#D32F2F]/60 mb-1.5 transition-colors">
                        {t(`contact_pg.info.${i + 1}.label` as 'contact_pg.info.1.label')}
                      </div>
                      <div className="text-base font-serif font-bold text-[#0D47A1] group-hover:text-white transition-colors truncate">
                        {i === 2 ? t('contact_pg.info.3.val') : c.val}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white/40 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </a>
                ))}
              </div>

              {/* Business hours */}
              <div className="rs d4 mt-10 p-7 rounded-2xl bg-[#F9FAFB] border border-gray-100">
                <div className="text-[.62rem] font-black uppercase tracking-[.25em] text-[#D32F2F] mb-4">Business Hours</div>
                <div className="space-y-2.5">
                  {[
                    { day: 'Sunday – Friday', time: '9:00 AM – 6:00 PM NPT' },
                    { day: 'Saturday', time: '10:00 AM – 2:00 PM NPT' },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[#64748B]">{h.day}</span>
                      <span className="text-sm font-bold text-[#0D47A1]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Contact form */}
            <div className="rs d2 relative">
              <form
                onSubmit={submit}
                className="bg-[#0D47A1] rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-[#0D47A1]/20 relative overflow-hidden"
                noValidate
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#D32F2F]/8 blur-[100px] -mr-40 -mt-40 pointer-events-none" />
                <div className="absolute inset-0 bg-pattern-dark opacity-50 pointer-events-none" />

                {status === 'sent' ? (
                  /* Success state */
                  <div className="text-center py-20 relative z-10">
                    <div className="w-24 h-24 bg-[#D32F2F] text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#D32F2F]/40 animate-bounce">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-4xl text-white mb-4">{t('contact_pg.form.sent')}</h3>
                    <p className="text-white/40 text-lg">{t('contact_pg.form.sent_desc')}</p>
                  </div>
                ) : (
                  <div className="relative z-10 space-y-6">
                    {/* Form header */}
                    <div className="mb-10">
                      <div className="text-[.65rem] font-black uppercase tracking-[.3em] text-[#D32F2F] mb-2">Get in Touch</div>
                      <h3 className="font-serif text-2xl text-white leading-tight">Send us a message</h3>
                    </div>

                    {/* Name row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* First name */}
                      <div className="relative">
                        <input
                          type="text"
                          value={form.fname}
                          onChange={set('fname')}
                          placeholder={t('contact_pg.form.fname') as string}
                          className={`w-full bg-white/5 border ${errors.fname ? 'border-red-400/60' : 'border-white/10'} rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4 focus:shadow-[0_0_0_4px_rgba(211,47,47,0.08)]`}
                        />
                        {errors.fname && (
                          <p className="mt-1.5 text-[.7rem] text-red-400 font-medium">Required field</p>
                        )}
                      </div>
                      {/* Last name */}
                      <div className="relative">
                        <input
                          type="text"
                          value={form.lname}
                          onChange={set('lname')}
                          placeholder={t('contact_pg.form.lname') as string}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4 focus:shadow-[0_0_0_4px_rgba(211,47,47,0.08)]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder={t('contact_pg.form.email') as string}
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-400/60' : 'border-white/10'} rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4 focus:shadow-[0_0_0_4px_rgba(211,47,47,0.08)]`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-[.7rem] text-red-400 font-medium">Valid email required</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea
                        rows={5}
                        value={form.msg}
                        onChange={set('msg')}
                        placeholder={t('contact_pg.form.needs') as string}
                        className={`w-full bg-white/5 border ${errors.msg ? 'border-red-400/60' : 'border-white/10'} rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4 focus:shadow-[0_0_0_4px_rgba(211,47,47,0.08)] resize-none`}
                      />
                      {errors.msg && (
                        <p className="mt-1.5 text-[.7rem] text-red-400 font-medium">Message is required</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group relative w-full overflow-hidden bg-[#D32F2F] text-white py-5 rounded-2xl font-black uppercase tracking-[.2em] text-sm hover:bg-white hover:text-[#0D47A1] transition-all duration-500 shadow-2xl shadow-[#D32F2F]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {status === 'sending' ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {t('contact_pg.form.sending')}
                          </>
                        ) : (
                          <>
                            {t('contact_pg.form.cta')}
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                          </>
                        )}
                      </span>
                    </button>

                    {/* Privacy note */}
                    <p className="text-center text-white/25 text-[.7rem] font-medium">
                      Your data is encrypted and never shared. See our{' '}
                      <a href="/privacy" className="underline hover:text-white/50 transition-colors">Privacy Policy</a>.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03. FAQ
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={s4 as React.RefObject<HTMLDivElement>} className="py-32 bg-[#F9FAFB] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="rs section-kicker justify-center mb-8">
              <span className="section-kicker-line" />
              {t('contact_pg.faq.kicker')}
              <span className="section-kicker-line" />
            </div>
            <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#0D47A1] leading-[1.2]">
              {t('contact_pg.faq.title1')}{' '}
              <span className="italic text-[#D32F2F]">{t('contact_pg.faq.title2')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {([1, 2, 3, 4] as const).map((id, i) => (
              <div
                key={i}
                className={`rs d${(i % 2) + 1} group bg-white border border-gray-100 rounded-[2rem] overflow-hidden transition-all duration-400 ${openFaq === i ? 'border-[#D32F2F]/20 shadow-xl shadow-[#D32F2F]/5' : 'hover:border-gray-200 hover:shadow-md'}`}
              >
                <button
                  className="w-full text-left p-8 md:p-10 flex items-center justify-between gap-6"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className={`font-serif text-xl md:text-2xl leading-snug transition-colors ${openFaq === i ? 'text-[#D32F2F]' : 'text-[#0D47A1] group-hover:text-[#D32F2F]'}`}>
                    {t(`contact_pg.faq.${id}.q` as 'contact_pg.faq.1.q')}
                  </span>
                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xl font-thin flex-shrink-0 transition-all duration-500 ${openFaq === i ? 'rotate-45 bg-[#D32F2F] border-[#D32F2F] text-white' : 'border-gray-200 text-[#64748B]'}`}>
                    +
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-10 md:px-12 pb-10">
                    <div className="border-l-2 border-[#D32F2F] pl-6">
                      <p className="text-[#6B7280] text-[.9rem] leading-relaxed italic">
                        {t(`contact_pg.faq.${id}.a` as 'contact_pg.faq.1.a')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="rs d4 mt-20 text-center">
            <p className="text-[#64748B] text-lg mb-6">Still have questions?</p>
            <a
              href="mailto:info@sanothimi.com"
              className="inline-flex items-center gap-3 bg-[#0D47A1] text-white px-10 py-4 rounded-full font-bold hover:bg-[#D32F2F] transition-all duration-500 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email Us Directly
            </a>
          </div>
        </div>
      </section>

      <CTABanner
        title={'Ready for Global\nExpansion?'}
        sub="Connect with Nepal's leading SaaS architecture team today."
        cta="Initiate Demo"
        ctaHref="/demo"
      />
    </main>
  );
}
