'use client';
import { useEffect, useRef, useState } from 'react';

const INFO = [
  { icon: '📞', label: 'Phone', val: '+977 980-6391489', href: 'tel:+9779806391489' },
  { icon: '✉️', label: 'Email', val: 'info@sanothimi.com', href: 'mailto:info@sanothimi.com' },
  { icon: '📍', label: 'Office', val: 'Sanothimi, Bhaktapur', href: '#' },
  { icon: '🕐', label: 'Support', val: 'Mon – Sat: 8 AM – 8 PM', href: '#' },
];

export default function Contact() {
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
      {/* Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/04 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="reveal grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          <div className="lg:col-span-2">
            <div className="badge-label text-[#8B5CF6] mb-4">Get In Touch</div>
            <h2 className="font-display text-4xl xl:text-5xl text-white leading-tight">
              Let&apos;s Start a <span className="text-gradient">Conversation</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-white/35 leading-relaxed">Ready to digitize your organizational workflow? Reach out for a complimentary demo and consultation — we are here to help.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info column */}
          <div className="lg:col-span-2 reveal flex flex-col gap-4">
            {INFO.map((c) => (
              <a key={c.label} href={c.href} className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
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

            {/* Social */}
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
                  <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="fname">First Name *</label>
                  <input id="fname" className={`f-ctrl ${errors.fname ? 'err' : ''}`} value={form.fname} onChange={set('fname')} placeholder="John"/>
                </div>
                <div>
                  <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="lname">Last Name</label>
                  <input id="lname" className="f-ctrl" value={form.lname} onChange={set('lname')} placeholder="Smith"/>
                </div>
              </div>

              <div>
                <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="email">Email Address *</label>
                <input id="email" type="email" className={`f-ctrl ${errors.email ? 'err' : ''}`} value={form.email} onChange={set('email')} placeholder="you@company.com"/>
              </div>

              <div>
                <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="subject">Product Interest</label>
                <input id="subject" className="f-ctrl" value={form.subject} onChange={set('subject')} placeholder="School ERP, Finance Suite, Custom SaaS..."/>
              </div>

              <div>
                <label className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider block mb-1.5" htmlFor="message">Message *</label>
                <textarea id="message" rows={5} className={`f-ctrl resize-none ${errors.message ? 'err' : ''}`} value={form.message} onChange={set('message')} placeholder="Tell us about your organization and digital needs..."/>
              </div>

              {status === 'sent' && (
                <div className="flex items-center gap-3 text-sm font-semibold rounded-2xl px-4 py-3" style={{ background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.25)', color:'#A78BFA' }}>
                  ✅ Message sent! Our team will respond within 24 hours.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-gold py-4 rounded-2xl w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? '⏳ Sending…' : '📨 Send Message'}
              </button>

              <p className="text-white/20 text-[0.72rem] text-center">Your information is completely confidential and will never be shared.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
