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
    label:'Email Correspondence', 
    val:'info@sanothimi.com', 
    href:'mailto:info@sanothimi.com' 
  },
  { 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ), 
    label:'Direct Line', 
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
    label:'Innovation Center', 
    val:'Sanothimi, Bhaktapur, Nepal', 
    href:'#' 
  },
];

const FAQS = [
  { q:'How much does the SchoolSathi ERP cost?', a:'Pricing is based on student count and active modules. We provide custom, scalable quotes during consultation.' },
  { q:'Do you provide on-site training for staff?', a:'Yes. We offer both on-site and remote training cycles to ensure 100% platform proficiency.' },
  { q:'Is my institutional data secure on your cloud?', a:'Absolutely. Enterprise-grade encryption and 99.9% uptime are standard in our zero-trust architecture.' },
  { q:'Can we migrate data from our existing systems?', a:'Yes, our dedicated migration team handles all legacy data imports from Excel, CSV, or SQL databases.' },
];

export default function ContactPage() {
  const s1 = useReveal();
  const s4 = useReveal();
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
        current_date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
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
      alert('Failed to send message.');
    }
  };

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
              Direct Connection
           </div>
           <h1 className="font-serif text-6xl md:text-8xl text-white leading-[1.1] tracking-tighter">
             Let's<br /><span className="italic text-[#EE2B47]">Collaborate.</span>
           </h1>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#001C44] to-transparent" />
      </div>

      {/* ── Contact Architecture ── */}
      <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-32 bg-white relative z-10 -mt-10 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            
            <div className="rs">
               <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
                  Get in Touch
               </div>
               <h2 className="font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.2] mb-10">
                  Speak with Our <span className="italic">Innovation Experts.</span>
               </h2>
               <p className="text-[#6B7280] text-lg leading-relaxed max-w-xl mb-12">
                  Have a question about our SaaS ecosystem? Our team of specialists is ready to help you navigate your digital transformation.
               </p>

               <div className="grid grid-cols-1 gap-6">
                  {INFO.map((c, i) => (
                    <div key={c.label} className={`rs d${i+1} p-8 rounded-3xl bg-gray-50 border border-gray-100 group hover:bg-[#001C44] hover:border-[#001C44] transition-all duration-500`}>
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#EE2B47] shadow-sm group-hover:bg-[#EE2B47] group-hover:text-white transition-all duration-500">
                             {c.icon}
                          </div>
                          <div>
                             <div className="text-[.65rem] font-black uppercase tracking-[.2em] text-[#EE2B47] group-hover:text-white/40 mb-1">{c.label}</div>
                             <div className="text-lg font-serif font-bold text-[#001C44] group-hover:text-white transition-colors">{c.val}</div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="rs d2 relative">
               <form onSubmit={submit} className="bg-[#001C44] rounded-[3.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden" noValidate>
                  {/* Form Background Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#EE2B47]/10 blur-[100px] -mr-32 -mt-32" />
                  
                  {status === 'sent' ? (
                     <div className="text-center py-20 relative z-10">
                        <div className="w-24 h-24 bg-[#EE2B47] text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#EE2B47]/40 animate-bounce">
                           <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="font-serif text-4xl text-white mb-4">Transmission Sent.</h3>
                        <p className="text-white/40 text-lg">Our experts will prioritize your inquiry.</p>
                     </div>
                  ) : (
                     <div className="relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                           <div className="relative group">
                              <input type="text" value={form.fname} onChange={set('fname')} required
                                className={`peer w-full bg-white/5 border ${errors.fname ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 pt-8 pb-3 text-white focus:border-[#EE2B47] focus:outline-none transition-all`} placeholder=" " />
                              <label className="absolute left-6 top-5 text-[.7rem] font-black uppercase tracking-widest text-white/30 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/20 peer-focus:top-3 peer-focus:text-[.6rem] peer-focus:text-[#EE2B47] transition-all pointer-events-none">First Name</label>
                           </div>
                           <div className="relative group">
                              <input type="text" value={form.lname} onChange={set('lname')} required
                                className="peer w-full bg-white/5 border border-white/10 rounded-2xl px-6 pt-8 pb-3 text-white focus:border-[#EE2B47] focus:outline-none transition-all" placeholder=" " />
                              <label className="absolute left-6 top-5 text-[.7rem] font-black uppercase tracking-widest text-white/30 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/20 peer-focus:top-3 peer-focus:text-[.6rem] peer-focus:text-[#EE2B47] transition-all pointer-events-none">Last Name</label>
                           </div>
                        </div>

                        <div className="relative group mb-8">
                           <input type="email" value={form.email} onChange={set('email')} required
                             className={`peer w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 pt-8 pb-3 text-white focus:border-[#EE2B47] focus:outline-none transition-all`} placeholder=" " />
                           <label className="absolute left-6 top-5 text-[.7rem] font-black uppercase tracking-widest text-white/30 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/20 peer-focus:top-3 peer-focus:text-[.6rem] peer-focus:text-[#EE2B47] transition-all pointer-events-none">Corporate Email</label>
                        </div>

                        <div className="relative group mb-10">
                           <textarea rows={4} value={form.msg} onChange={set('msg')} required
                             className={`peer w-full bg-white/5 border ${errors.msg ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 pt-10 pb-3 text-white focus:border-[#EE2B47] focus:outline-none transition-all resize-none`} placeholder=" " />
                           <label className="absolute left-6 top-6 text-[.7rem] font-black uppercase tracking-widest text-white/30 peer-placeholder-shown:top-10 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/20 peer-focus:top-4 peer-focus:text-[.6rem] peer-focus:text-[#EE2B47] transition-all pointer-events-none">Organizational Needs</label>
                        </div>

                        <button type="submit" disabled={status==='sending'}
                          className="group relative w-full overflow-hidden bg-[#EE2B47] text-white py-6 rounded-2xl font-black uppercase tracking-[.2em] text-sm hover:bg-white hover:text-[#001C44] transition-all duration-500 shadow-2xl shadow-[#EE2B47]/20">
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[.8s] ease-in-out" />
                           <span className="relative z-10">{status==='sending' ? 'Transmitting...' : 'Send Transmission'}</span>
                        </button>
                     </div>
                  )}
               </form>

               {/* Decorative floating badge */}
               <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-full shadow-2xl border border-gray-100 flex items-center gap-4 rs d3">
                  <div className="w-10 h-10 rounded-full bg-[#EE2B47]/10 flex items-center justify-center text-[#EE2B47]">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div className="text-[.6rem] font-black uppercase tracking-widest text-[#001C44]">Instant Response <br />Active 24/7</div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Intelligence Hub: FAQ ── */}
      <section ref={s4 as React.RefObject<HTMLDivElement>} className="py-32 bg-[#F9FAF9] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
             <div className="rs inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-8">
                Knowledge Base
             </div>
             <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.2]">Broadening Your <span className="italic">Perspective.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
             {FAQS.map((faq, i) => (
                <div key={i} className={`rs d${(i%2)+1} group bg-white border border-gray-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#EE2B47]/30 hover:shadow-xl`}>
                   <button className="w-full text-left p-8 md:p-10 flex items-center justify-between" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                      <span className="font-serif text-xl md:text-2xl text-[#001C44] group-hover:text-[#EE2B47] transition-colors">{faq.q}</span>
                      <div className={`w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-xl transition-all duration-500 ${openFaq===i?'rotate-45 bg-[#EE2B47] text-white border-[#EE2B47]':'text-[#6B7280]'}`}>+</div>
                   </button>
                   <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openFaq===i?'max-h-96 opacity-100 pb-10 px-10 md:px-14':'max-h-0 opacity-0'}`}>
                      <p className="text-[#6B7280] leading-relaxed italic border-l-2 border-[#EE2B47] pl-8">{faq.a}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      <CTABanner title={'Ready for Global\nExpansion?'} sub="Connect with Nepal's leading SaaS architecture team today." cta="Initiate Demo" />
    </main>
  );
}
