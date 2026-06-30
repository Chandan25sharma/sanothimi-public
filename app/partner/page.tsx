'use client';
import CTABanner from '@/components/CTABanner';
import emailjs from '@emailjs/browser';
import { useState } from 'react';

const PARTNER_TYPES = ['Reseller Partner', 'Referral Partner', 'Technology Integration Partner', 'Implementation Partner', 'Other'];

const BENEFITS = [
  { title: 'Revenue Sharing', desc: 'Competitive commission structure on every client you bring onboard.' },
  { title: 'Dedicated Support', desc: 'A direct line to our engineering and onboarding teams for your clients.' },
  { title: 'Co-Marketing', desc: 'Joint case studies, listings, and marketing material to grow together.' },
  { title: 'Training & Certification', desc: 'Full product training so your team can demo and support confidently.' },
];

interface FormState {
  name: string;
  company: string;
  license: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

export default function PartnerPage() {
  const [form, setForm] = useState<FormState>({ name: '', company: '', license: '', email: '', phone: '', type: PARTNER_TYPES[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm({ ...form, [k]: e.target.value });
      setErrors({ ...errors, [k]: false });
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, boolean> = {};
    if (!form.name) err.name = true;
    if (!form.company) err.company = true;
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = true;
    if (Object.keys(err).length) { setErrors(err); return; }

    setStatus('sending');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: form.name,
          from_email: form.email,
          subject: `New Partner Application — ${form.company}`,
          message: `Company / Business Name: ${form.company}\nLicense / Registration No: ${form.license || '—'}\nPhone: ${form.phone || '—'}\nPartnership Type: ${form.type}\n\nMessage:\n${form.message || '—'}`,
          current_date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      setStatus('sent');
      setForm({ name: '', company: '', license: '', email: '', phone: '', type: PARTNER_TYPES[0], message: '' });
    } catch {
      setStatus('idle');
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <main>
      {/* Hero */}
      <div className="relative pt-40 pb-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-[#D32F2F] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">Partner Program</div>
          <h1 className="font-serif text-5xl md:text-6xl text-[#0D47A1] leading-[1.15] tracking-tight max-w-3xl">
            Grow with{' '}
            <span className="relative inline-block">
              Sanothimi.
              <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#D32F2F] rounded-full" />
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mt-8">
            Join our partner network and help institutions across Nepal modernize — while building a new revenue stream for your business.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-28 bg-white relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Left: benefits */}
            <div id="benefits" className="scroll-mt-28">
              <div className="section-kicker mb-6"><span className="section-kicker-line" />Why Partner With Us</div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0D47A1] leading-tight mb-10">
                Built for mutual <span className="italic text-[#D32F2F]">growth.</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-[#D32F2F]/8 flex items-center justify-center mb-4">
                      <svg className="w-4.5 h-4.5 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div className="font-bold text-[#0D47A1] text-[.92rem] mb-2">{b.title}</div>
                    <div className="text-[#64748B] text-[.82rem] leading-relaxed">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div>
              <form onSubmit={submit} className="bg-[#0D47A1] rounded-[2.5rem] p-9 md:p-11 shadow-2xl shadow-[#0D47A1]/20 relative overflow-hidden" noValidate>
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#D32F2F]/8 blur-[100px] -mr-36 -mt-36 pointer-events-none" />
                <div className="absolute inset-0 bg-pattern-dark opacity-50 pointer-events-none" />

                {status === 'sent' ? (
                  <div className="text-center py-16 relative z-10">
                    <div className="w-20 h-20 bg-[#D32F2F] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#D32F2F]/40">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h3 className="font-serif text-3xl text-white mb-4">Application Received</h3>
                    <p className="text-white/40 text-base">Our partnerships team will review your application and respond within 2 business days.</p>
                  </div>
                ) : (
                  <div className="relative z-10 space-y-5">
                    <div className="mb-8">
                      <div className="text-[.62rem] font-black uppercase tracking-[.3em] text-[#D32F2F] mb-2">Become a Partner</div>
                      <h3 className="font-serif text-2xl text-white leading-tight">Apply for partnership</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <input type="text" value={form.name} onChange={set('name')} placeholder="Full Name"
                          className={`w-full bg-white/5 border ${errors.name ? 'border-red-400/60' : 'border-white/10'} rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4`} />
                        {errors.name && <p className="mt-1.5 text-[.7rem] text-red-400 font-medium">Required field</p>}
                      </div>
                      <div>
                        <input type="tel" value={form.phone} onChange={set('phone')} placeholder="Phone Number"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4" />
                      </div>
                    </div>

                    <div>
                      <input type="text" value={form.company} onChange={set('company')} placeholder="Company / Business Name"
                        className={`w-full bg-white/5 border ${errors.company ? 'border-red-400/60' : 'border-white/10'} rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4`} />
                      {errors.company && <p className="mt-1.5 text-[.7rem] text-red-400 font-medium">Required field</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <input type="text" value={form.license} onChange={set('license')} placeholder="Business License / Reg. No."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4" />
                      </div>
                      <div>
                        <input type="email" value={form.email} onChange={set('email')} placeholder="Work Email"
                          className={`w-full bg-white/5 border ${errors.email ? 'border-red-400/60' : 'border-white/10'} rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4`} />
                        {errors.email && <p className="mt-1.5 text-[.7rem] text-red-400 font-medium">Valid email required</p>}
                      </div>
                    </div>

                    <div>
                      <select value={form.type} onChange={set('type')}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all focus:border-[#D32F2F] focus:bg-[#D32F2F]/4 appearance-none">
                        {PARTNER_TYPES.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0D47A1] text-white">{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <textarea rows={3} value={form.message} onChange={set('message')} placeholder="Tell us about your business (optional)"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-medium outline-none transition-all placeholder:text-white/25 focus:border-[#D32F2F] focus:bg-[#D32F2F]/4 resize-none" />
                    </div>

                    <button type="submit" disabled={status === 'sending'}
                      className="group relative w-full overflow-hidden bg-[#D32F2F] text-white py-5 rounded-2xl font-black uppercase tracking-[.2em] text-sm hover:bg-white hover:text-[#0D47A1] transition-all duration-500 shadow-2xl shadow-[#D32F2F]/20 disabled:opacity-60 disabled:cursor-not-allowed">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {status === 'sending' ? 'Submitting…' : 'Submit Application'}
                        {status !== 'sending' && (
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                        )}
                      </span>
                    </button>

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

      <CTABanner
        title={'Have questions before\napplying?'}
        sub="Reach out to our partnerships team directly."
        cta="Contact Us"
        ctaHref="/contact"
      />
    </main>
  );
}
