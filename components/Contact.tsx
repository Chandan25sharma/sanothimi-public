'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const INFO = [
  { icon: '📞', label: 'Phone', val: '+977 980-6391489', href: 'tel:+9779806391489' },
  { icon: '✉️', label: 'Email', val: 'info@sanothimi.com.np', href: 'mailto:info@sanothimi.com.np' },
  { icon: '📍', label: 'Office', val: 'Sanothimi, Bhaktapur', href: '#' },
  { icon: '🕐', label: 'Support', val: 'Mon – Sat: 8 AM – 8 PM', href: '#' },
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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-colors"
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
                { label: 'LinkedIn', icon: '💼' },
                { label: 'Twitter/X', icon: '𝕏' },
                { label: 'Discord', icon: '💬' },
              ].map((s) => (
                <a key={s.label} href="#"
                  className="flex items-center gap-2 text-white/40 hover:text-[#8B5CF6] border border-white/08 hover:border-[#8B5CF6]/30 text-[0.78rem] font-semibold px-3.5 py-2 rounded-xl transition-all">
                  <span>{s.icon}</span> {s.label}
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
