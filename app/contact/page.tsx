'use client';
import CTABanner from '@/components/CTABanner';
import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';

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

const INFO = [
  { 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ), 
    label:'Email', 
    val:'info@sanothimi.com', 
    href:'mailto:info@sanothimi.com' 
  },
  { 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ), 
    label:'Phone', 
    val:'+977 980-6391489', 
    href:'tel:+9779806391489' 
  },
  { 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ), 
    label:'Address', 
    val:'Sanothimi, Bhaktapur', 
    href:'#' 
  },
];

const SOCIAL = [
  { label:'Instagram', icon:'IG' }, { label:'Pinterest', icon:'PT' },
  { label:'Twitter/X', icon:'𝕏' }, { label:'YouTube', icon:'YT' },
];

const FAQS = [
  { q:'How much does the SchoolSathi ERP cost?', a:'Pricing is based on the number of students and modules required. We offer scalable packages starting from a basic tier for smaller schools to enterprise-grade solutions for large institutions. Contact us for a custom quote.' },
  { q:'Do you provide on-site training for staff?', a:'Yes. We provide comprehensive on-site training for teachers and administrative staff during the onboarding phase, along with detailed video tutorials and documentation.' },
  { q:'Is my institutional data secure on your cloud?', a:'Absolutely. We use enterprise-grade encryption, regular security audits, and redundant cloud backups to ensure your data is safe and available 99.9% of the time.' },
  { q:'Can we migrate data from our existing systems?', a:'Yes, our team handles the entire data migration process. We can import student records, billing history, and other critical data from Excel, CSV, or legacy databases.' },
  { q:'What kind of support do you offer after launch?', a:'We offer 24/7 technical support via phone, email, and Discord. Our dedicated account managers are always available to help you optimize your digital workflow.' },
  { q:'Do your solutions handle local VAT and taxation?', a:'Yes. All our financial and billing modules are built specifically to comply with Nepalese taxation laws, including automated VAT reporting and local billing formats.' },
];

export default function ContactPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const [form, setForm] = useState({ fname:'', lname:'', email:'', msg:'' });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'>('idle');
  const [errors, setErrors] = useState<Record<string,boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm({...form, [k]: e.target.value }); setErrors({...errors, [k]: false});
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
      const templateParams = {
        from_name: `${form.fname} ${form.lname}`,
        from_email: form.email,
        subject: `New Message from ${form.fname}`,
        message: form.msg,
        current_date: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );

      setStatus('sent');
      setForm({ fname: '', lname: '', email: '', msg: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('idle');
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <main>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-[.72rem] font-bold uppercase tracking-[.2em] text-[#EE2B47] mb-3">Reach Out</p>
          <h1 className="font-serif text-5xl text-white leading-tight">Connect with<br />Sanothimi</h1>
        </div>
      </div>

      {/* ── Contact main ── */}
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

            {/* Info column */}
            <div className="lg:col-span-2">
              <h2 className="rs font-serif text-3xl text-[#0A0F19] mb-3">Get in Touch</h2>
              <p className="rs d1 text-[#6B7280] text-[.92rem] leading-relaxed mb-8">
                Reach out for institutional ERP solutions, business automation suites, or custom software inquiries for your organization.
              </p>

              {INFO.map((c, i) => (
                <div key={c.label} className={`rs d${i+2} mb-5 pb-5 border-b border-gray-100`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EE2B47]/10 border border-[#EE2B47]/20 flex items-center justify-center text-[#EE2B47] shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-[.7rem] font-bold uppercase tracking-wider text-[#6B7280] mb-0.5">{c.label}</div>
                      <a href={c.href} className="text-[.9rem] font-medium text-[#001C44] hover:text-[#EE2B47] transition-colors">{c.val}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              <form onSubmit={submit} className="bg-[#0A0F19] rounded-2xl p-8 md:p-10 min-h-[500px] flex flex-col justify-center" noValidate>
                {status === 'sent' ? (
                  <div className="text-center py-10 fade-in">
                    <div className="w-20 h-20 bg-[#EE2B47]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#EE2B47]/30">
                      <span className="text-3xl text-[#EE2B47]">✓</span>
                    </div>
                    <h3 className="text-3xl font-serif text-white mb-3">Message Sent!</h3>
                    <p className="text-white/40 text-lg">Thank you for reaching out, our team will get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-[.72rem] font-bold uppercase tracking-widest text-white/40 mb-2.5">First Name</label>
                        <input
                          type="text"
                          value={form.fname}
                          onChange={set('fname')}
                          className={`w-full bg-white/5 border ${errors.fname ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EE2B47]/50 transition-all`}
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-[.72rem] font-bold uppercase tracking-widest text-white/40 mb-2.5">Last Name</label>
                        <input
                          type="text"
                          value={form.lname}
                          onChange={set('lname')}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EE2B47]/50 transition-all"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-[.72rem] font-bold uppercase tracking-widest text-white/40 mb-2.5">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EE2B47]/50 transition-all`}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="mb-8">
                      <label className="block text-[.72rem] font-bold uppercase tracking-widest text-white/40 mb-2.5">Message</label>
                      <textarea
                        rows={5}
                        value={form.msg}
                        onChange={set('msg')}
                        className={`w-full bg-white/5 border ${errors.msg ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EE2B47]/50 transition-all resize-none`}
                        placeholder="Tell us about your organizational needs..."
                      />
                    </div>
                    <button type="submit" disabled={status==='sending'}
                      className="btn bg-[#EE2B47] text-white w-full justify-center py-4.5 rounded-xl font-bold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-white hover:text-[#EE2B47] transition-all text-base shadow-xl">
                      {status==='sending' ? 'Sending Message...' : 'Send Message'}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={s2 as React.RefObject<HTMLDivElement>} className="py-24 bg-[#F9FAF9]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="rs text-[.72rem] font-bold uppercase tracking-[.2em] text-[#EE2B47] mb-3">FAQ</p>
            <h2 className="rs d1 font-serif text-4xl text-[#0A0F19]">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, i) => (
              <div key={i} className={`rs d${(i%2)+1} faq-item ${openFaq===i?'open':''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq===i ? null : i)} aria-expanded={openFaq===i}>
                  <span>{faq.q}</span>
                  <div className="faq-icon text-[#6B7280]">+</div>
                </button>
                <div className={`faq-body ${openFaq===i?'open':''}`}>
                  <div>
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={'Transform Your Institution\nwith Sanothimi'}
        sub="Connecting Nepal's educational landscape with global technological standards."
        cta="Get Started"
      />
    </main>
  );
}
