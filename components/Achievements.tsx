'use client';
import { achievements } from '@/data/portfolio';
import { useEffect, useRef } from 'react';

export default function Achievements() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="achievements" className="py-28 bg-white" ref={ref} aria-label="Achievements section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <div className="badge-label center mb-4">Recognition</div>
          <h2 className="font-display text-4xl xl:text-5xl text-[#050d1a] mb-4">
            Awards &amp; <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">A career built on excellence, recognised by industry peers and professional bodies.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => (
            <div key={a.id} className={`reveal d${i % 4 + 1} ach-card group cursor-default`}>
              {/* Number deco */}
              <span className="absolute top-5 right-6 font-display text-6xl font-bold text-slate-50 group-hover:text-[#c9a84c]/08 transition-colors select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#050d1a] group-hover:bg-[#0a1628] flex items-center justify-center text-2xl transition-colors shadow-lg">
                    {a.icon}
                  </div>
                  <div className="text-[0.72rem] font-bold text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/20 px-3 py-1 rounded-full tracking-widest">{a.year}</div>
                </div>
                <h3 className="font-semibold text-[#050d1a] text-[0.97rem] leading-snug mb-3">{a.title}</h3>
                <p className="text-slate-400 text-[0.83rem] leading-relaxed mb-5">{a.description}</p>
                <div className="flex items-center gap-2 text-[0.78rem] font-semibold text-[#0d9488] bg-[#0d9488]/08 border border-[#0d9488]/15 rounded-xl px-3 py-2 w-fit">
                  {a.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
