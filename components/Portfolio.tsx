'use client';
import { projects } from '@/data/portfolio';
import { useEffect, useRef } from 'react';

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="portfolio" className="py-28 bg-white" ref={ref} aria-label="Portfolio section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="badge-label mb-4">Case Studies</div>
            <h2 className="font-display text-4xl xl:text-5xl text-[#050d1a]">
              Client <span className="text-gradient">Success Stories</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm leading-relaxed">Anonymised case studies demonstrating measurable outcomes and the impact of strategic financial advisory.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={p.id} className={`reveal d${i % 3 + 1} port-card bg-white group`}>
              {/* Visual header */}
              <div className={`bg-gradient-to-br ${p.bgGradient} h-52 relative overflow-hidden flex items-center justify-center`}>
                <span className="absolute top-5 left-5 text-xs font-bold text-white/80 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/15">
                  {p.tagIcon} {p.tag}
                </span>
                {/* SVG chart */}
                <svg viewBox="0 0 240 120" className="port-img w-52 opacity-50" fill="none" aria-hidden="true">
                  <polyline points="15,95 55,70 95,83 135,42 175,62 225,18" stroke="#c9a84c" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  {[{cx:15,cy:95},{cx:55,cy:70},{cx:95,cy:83},{cx:135,cy:42},{cx:175,cy:62},{cx:225,cy:18}].map((c,i)=>
                    <circle key={i} cx={c.cx} cy={c.cy} r={i===5?8:5} fill="#c9a84c" opacity={i===5?1:0.7}/>
                  )}
                  <line x1="15" y1="108" x2="235" y2="108" stroke="white" strokeOpacity="0.1"/>
                </svg>
                {/* Metric overlay */}
                <div className="absolute bottom-0 right-0 p-4">
                  <div className="font-display text-3xl font-bold text-[#c9a84c]">{p.metrics[0].value}</div>
                  <div className="text-white/50 text-[0.65rem] uppercase tracking-wider">{p.metrics[0].label}</div>
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                <h3 className="font-semibold text-[#050d1a] text-[1.05rem] mb-2">{p.title}</h3>
                <p className="text-slate-500 text-[0.85rem] leading-relaxed mb-6">{p.description}</p>
                <div className="flex gap-0 divide-x divide-slate-100">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="flex-1 pl-4 first:pl-0">
                      <strong className="block font-display text-xl text-[#050d1a]">{m.value}</strong>
                      <span className="text-[0.7rem] text-slate-400 uppercase tracking-wider font-medium">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
