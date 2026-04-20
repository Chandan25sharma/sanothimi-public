'use client';
import { experiences } from '@/data/portfolio';
import { useEffect, useRef, useState } from 'react';

export default function Experience() {
  const [openId, setOpenId] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="py-28" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }} ref={ref} aria-label="Experience section">
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <div className="badge-label center mb-4">Professional Journey</div>
          <h2 className="font-display text-4xl xl:text-5xl text-[#050d1a] mb-4">
            Years of <span className="text-gradient">Proven Experience</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">A track record of delivering measurable financial results across diverse industries and company sizes.</p>
        </div>

        <div className="relative" role="list">
          {/* Vertical line */}
          <div className="timeline-connector" />

          {experiences.map((exp, i) => (
            <div key={exp.id} className={`reveal d${Math.min(i+1,6)} relative pl-16 mb-6`} role="listitem">
              {/* Dot */}
              <div className="absolute left-0 top-5 w-12 h-12 rounded-2xl flex items-center justify-center text-xl z-10 shadow-lg"
                style={{ background: openId === exp.id ? 'linear-gradient(135deg,#c9a84c,#e2c47a)' : 'linear-gradient(135deg,#0a1628,#1a3255)', transition: 'background 0.3s' }}>
                {exp.icon}
              </div>

              {/* Card */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                style={{ boxShadow: openId === exp.id ? '0 20px 60px rgba(201,168,76,0.1)' : '' }}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenId(openId === exp.id ? null : exp.id)}
                  aria-expanded={openId === exp.id}
                >
                  <div>
                    <h3 className="font-semibold text-[#050d1a] text-[1.05rem] mb-1">{exp.title}</h3>
                    <p className="text-[#0d9488] text-sm font-medium">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:flex items-center gap-1.5 bg-[#050d1a] text-[#c9a84c] text-[0.72rem] font-bold px-3.5 py-1.5 rounded-full tracking-wide">
                      {exp.duration}
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${openId === exp.id ? 'bg-[#c9a84c] text-[#050d1a] rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                      ▾
                    </div>
                  </div>
                </button>

                <div className={`acc-body ${openId === exp.id ? 'open' : ''} border-t border-slate-50`}>
                  <div className="px-6 pb-6 pt-4">
                    <div className="grid gap-2.5 mb-5">
                      {exp.responsibilities.map((r, ri) => (
                        <div key={ri} className="flex gap-3 text-[0.88rem] text-slate-600 leading-relaxed">
                          <span className="text-[#c9a84c] mt-1 text-[0.55rem] shrink-0 font-bold">◆</span>
                          {r}
                        </div>
                      ))}
                    </div>
                    <div
                      className="inline-flex items-center gap-2.5 text-sm font-semibold rounded-2xl px-4 py-2.5"
                      style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.2)', color: '#a68530' }}
                    >
                      {exp.achievement}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
