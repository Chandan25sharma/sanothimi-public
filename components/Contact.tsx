'use client';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useRef, useState } from 'react';

const INFO = [
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>,
    label: 'Phone', val: '+977 9704714937', href: 'tel:+9779704714937',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    label: 'Email', val: 'info@sanothimi.com.np', href: 'mailto:info@sanothimi.com.np',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    label: 'Office', val: 'Sanothimi, Bhaktapur', href: '#',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    label: 'Support', val: 'Mon – Sat: 8 AM – 8 PM', href: '#',
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ fname: '', lname: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors({ ...errors, [k]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, boolean> = {};
    if (!form.fname) err.fname = true;
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = true;
    if (!form.message) err.message = true;
    if (Object.keys(err).length) { setErrors(err); return; }
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ fname: '', lname: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 7000);
    }, 1400);
  };

  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #050d1a 0%, #0a1628 50%, #0f2040 100%)' }}
      ref={ref}
      aria-label="Contact section"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/04 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="reveal grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          <div className="lg:col-span-2">
            <div className="badge-label text-[#8B5CF6] mb-4">{t('contact.kicker')}</div>
            <h2 className="font-display text-4xl xl:text-5xl text-white leading-tight">
              {t('contact.title',).split('Conversation')[0]} <span className="text-gradient">Conversation</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-white/35 leading-relaxed">{t('contact.desc')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info column */}
          <div className="lg:col-span-2 reveal flex flex-col gap-4">
            {INFO.map((c) => (
              <a key={c.label} href={c.href} className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors text-[#A78BFA]"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  {c.icon}
                </div>
                <div>
                  <div className="text-white/30 text-[0.68rem] font-bold uppercase tracking-wider">{c.label}</div>
                  <div className="text-white font-semibold text-sm">{c.val}</div>
                </div>
              </a>
            ))}

            <div className="mt-2 flex gap-2.5 flex-wrap">
              {[
                {
                  label: 'LinkedIn',
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                },
                {
                  label: 'Twitter / X',
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.259 5.628L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                },
                {
                  label: 'Discord',
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963a.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/></svg>,
                },
              ].map((s) => (
                <a key={s.label} href="#"
                  className="flex items-center gap-2 text-white/40 hover:text-[#8B5CF6] border border-white/08 hover:border-[#8B5CF6]/30 text-[0.78rem] font-semibold px-3.5 py-2 rounded-xl transition-all">
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 reveal d2">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 xl:p-10 flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              noValidate
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="fname">{t('contact.form.fname')} *</label>
                  <input id="fname" className={`f-ctrl ${errors.fname ? 'err' : ''}`} value={form.fname} onChange={set('fname')} placeholder=""/>
                </div>
                <div>
                  <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="lname">{t('contact.form.lname')}</label>
                  <input id="lname" className="f-ctrl" value={form.lname} onChange={set('lname')} placeholder=""/>
                </div>
              </div>

              <div>
                <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="email">{t('contact.form.email')} *</label>
                <input id="email" type="email" className={`f-ctrl ${errors.email ? 'err' : ''}`} value={form.email} onChange={set('email')} placeholder=""/>
              </div>

              <div>
                <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="subject">{t('contact.form.interest')}</label>
                <input id="subject" className="f-ctrl" value={form.subject} onChange={set('subject')} placeholder=""/>
              </div>

              <div>
                <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="message">{t('contact.form.message')} *</label>
                <textarea id="message" rows={5} className={`f-ctrl resize-none ${errors.message ? 'err' : ''}`} value={form.message} onChange={set('message')} placeholder=""/>
              </div>

              {status === 'sent' && (
                <div className="flex items-center gap-3 text-sm font-semibold rounded-2xl px-4 py-3" style={{ background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.25)', color:'#A78BFA' }}>
                  {t('contact.form.success')}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-gold py-4 rounded-2xl w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
              </button>

              <p className="text-white/20 text-[0.72rem] text-center">{t('footer.rights')}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
