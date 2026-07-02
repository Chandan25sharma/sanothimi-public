'use client';
import CTABanner from '@/components/CTABanner';
import emailjs from '@emailjs/browser';
import { useState } from 'react';

const CHANNELS = [
  {
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    label: 'Email Support', val: 'support@sanothimi.com.np', href: 'mailto:support@sanothimi.com.np', sub: 'Response within 4 business hours',
  },
  {
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    label: 'Phone Support', val: '+977 980-6391489', href: 'tel:+9779806391489', sub: 'Sun–Fri, 9 AM – 6 PM NPT',
  },
  {
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    label: 'Live Chat', val: 'Available in-app', href: '/contact', sub: 'For logged-in customers',
  },
];

const FAQS = [
  { q: 'How fast will I get a response to a support ticket?', a: 'Standard tickets are answered within 4 business hours. Critical/production-down issues are triaged immediately by our on-call engineer.' },
  { q: 'Do you offer onboarding and training?', a: 'Yes — every new client gets a guided onboarding session and staff training included with their plan, at no extra cost.' },
  { q: 'What happens if I find a bug?', a: 'Report it through this page or email support directly. We track and prioritize bugs by severity, with critical issues patched within 24 hours.' },
  { q: 'Is support included in my subscription?', a: 'Yes, all plans include email and phone support. Priority/dedicated support is available on Premium and custom enterprise plans.' },
];

const PRIORITIES = ['Low — General question', 'Medium — Feature not working as expected', 'High — Affecting daily operations', 'Critical — System down'];

interface FormState {
  name: string;
  email: string;
  subject: string;
  priority: string;
  desc: string;
}

export default function SupportPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', priority: PRIORITIES[0], desc: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm({ ...form, [k]: e.target.value });
      setErrors({ ...errors, [k]: false });
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, boolean> = {};
    if (!form.name) err.name = true;
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = true;
    if (!form.desc) err.desc = true;
    if (Object.keys(err).length) { setErrors(err); return; }

    setStatus('sending');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: form.name,
          from_email: form.email,
          subject: `Support Ticket [${form.priority.split(' — ')[0]}] — ${form.subject || 'No subject'}`,
          message: `Priority: ${form.priority}\nSubject: ${form.subject || '—'}\n\nDescription:\n${form.desc}`,
          current_date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', priority: PRIORITIES[0], desc: '' });
    } catch {
      setStatus('idle');
      alert('Failed to submit ticket. Please try again.');
    }
  };

  return (
    <main>
      {/* Hero */}
      <div className="relative pt-40 pb-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="text-[#D32F2F] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">Support Center</div>
          <h1 className="font-serif text-[2.2rem] sm:text-5xl md:text-6xl text-[#0D47A1] leading-[1.15] tracking-tight">
            We&rsquo;re here{' '}
            <span className="relative inline-block">
              to help.
              <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#D32F2F] rounded-full" />
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed mt-8">
            Reach our support team directly, or browse answers to common questions below.
          </p>
        </div>
      </div>

      {/* Channels */}
      <section className="py-28 bg-white relative z-10 -mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
            {CHANNELS.map((c) => (
              <a key={c.label} href={c.href} className="group p-8 rounded-2xl bg-[#F8FAFC] border border-gray-100 hover:border-[#D32F2F]/20 hover:shadow-xl hover:shadow-[#D32F2F]/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#D32F2F] transition-colors">
                  <svg className="w-5 h-5 text-[#0D47A1] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={c.icon}/></svg>
                </div>
                <div className="text-[.62rem] font-black uppercase tracking-[.2em] text-[#D32F2F] mb-2">{c.label}</div>
                <div className="font-serif text-lg text-[#0D47A1] font-bold mb-1">{c.val}</div>
                <div className="text-[.78rem] text-gray-400">{c.sub}</div>
              </a>
            ))}
          </div>

          {/* Ticket form + FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Ticket form */}
            <div>
              <div className="section-kicker mb-6"><span className="section-kicker-line" />Submit a Ticket</div>
              <h2 className="font-serif text-3xl text-[#0D47A1] leading-tight mb-8">
                Describe your <span className="italic text-[#D32F2F]">issue.</span>
              </h2>

              <form onSubmit={submit} className="space-y-5" noValidate>
                {status === 'sent' ? (
                  <div className="p-8 rounded-2xl bg-green-50 border border-green-100 text-center">
                    <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-5">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h3 className="font-serif text-xl text-[#0D47A1] mb-2">Ticket Submitted</h3>
                    <p className="text-[#64748B] text-sm">Our team will respond based on the priority you selected.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input type="text" value={form.name} onChange={set('name')} placeholder="Full Name"
                          className={`w-full bg-white border ${errors.name ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-[#0D47A1] text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-[#D32F2F]`} />
                        {errors.name && <p className="mt-1.5 text-[.7rem] text-red-500 font-medium">Required field</p>}
                      </div>
                      <div>
                        <input type="email" value={form.email} onChange={set('email')} placeholder="Email"
                          className={`w-full bg-white border ${errors.email ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-[#0D47A1] text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-[#D32F2F]`} />
                        {errors.email && <p className="mt-1.5 text-[.7rem] text-red-500 font-medium">Valid email required</p>}
                      </div>
                    </div>
                    <input type="text" value={form.subject} onChange={set('subject')} placeholder="Subject"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#0D47A1] text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-[#D32F2F]" />
                    <select value={form.priority} onChange={set('priority')}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#0D47A1] text-sm font-medium outline-none transition-all focus:border-[#D32F2F] appearance-none">
                      {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <div>
                      <textarea rows={5} value={form.desc} onChange={set('desc')} placeholder="Describe the issue in detail…"
                        className={`w-full bg-white border ${errors.desc ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-[#0D47A1] text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-[#D32F2F] resize-none`} />
                      {errors.desc && <p className="mt-1.5 text-[.7rem] text-red-500 font-medium">Please describe the issue</p>}
                    </div>
                    <button type="submit" disabled={status === 'sending'}
                      className="w-full bg-[#D32F2F] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#B71C1C] transition-all shadow-lg shadow-[#D32F2F]/20 disabled:opacity-60">
                      {status === 'sending' ? 'Submitting…' : 'Submit Ticket'}
                    </button>
                  </>
                )}
              </form>
            </div>

            {/* FAQ */}
            <div id="faq" className="scroll-mt-28">
              <div className="section-kicker mb-6"><span className="section-kicker-line" />FAQ</div>
              <h2 className="font-serif text-3xl text-[#0D47A1] leading-tight mb-8">
                Common <span className="italic text-[#D32F2F]">questions.</span>
              </h2>
              <div className="space-y-4">
                {FAQS.map((f, i) => (
                  <div key={f.q} className={`bg-white border rounded-2xl overflow-hidden transition-all ${openFaq === i ? 'border-[#D32F2F]/20 shadow-md' : 'border-gray-100'}`}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4">
                      <span className={`font-semibold text-[.92rem] leading-snug transition-colors ${openFaq === i ? 'text-[#D32F2F]' : 'text-[#0D47A1]'}`}>{f.q}</span>
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-lg font-thin flex-shrink-0 transition-all duration-300 ${openFaq === i ? 'rotate-45 bg-[#D32F2F] border-[#D32F2F] text-white' : 'border-gray-200 text-gray-400'}`}>+</div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="px-6 pb-6 text-[#64748B] text-[.85rem] leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title={'Need something\nmore specific?'}
        sub="Our sales team can help with custom requirements and enterprise plans."
        cta="Contact Sales"
        ctaHref="/contact"
      />
    </main>
  );
}
