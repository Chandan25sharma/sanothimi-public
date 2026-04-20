'use client';
import { softSkills, technicalSkills } from '@/data/portfolio';
import { useEffect, useRef, useState } from 'react';

export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); setAnimated(true); }
      });
    }, { threshold: 0.15 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #050d1a 0%, #0a1628 50%, #0f2040 100%)' }}
      ref={ref}
      aria-label="Skills section"
    >
      {/* Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#c9a84c]/05 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#0d9488]/05 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <div className="badge-label center text-[#c9a84c] mb-4">Core Competencies</div>
          <h2 className="font-display text-4xl xl:text-5xl text-white mb-4">
            Technical &amp; <span className="text-gradient">Professional Skills</span>
          </h2>
          <p className="text-white/35 max-w-lg mx-auto">A blend of deep technical mastery and refined professional competencies developed over 15+ years.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Technical */}
          <div className="reveal d1">
            <div className="text-[0.72rem] font-bold text-white/30 uppercase tracking-[0.25em] mb-7">Technical Expertise</div>
            <div className="flex flex-col gap-6">
              {technicalSkills.map((s, i) => (
                <div key={s.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/75 text-sm font-medium">{s.name}</span>
                    <span className="font-display text-[#c9a84c] font-bold text-sm">{animated ? s.level : 0}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: animated ? `${s.level}%` : '0%',
                        transitionDelay: `${i * 0.08}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional */}
          <div className="reveal d2">
            <div className="text-[0.72rem] font-bold text-white/30 uppercase tracking-[0.25em] mb-7">Professional Competencies</div>
            <div className="grid grid-cols-2 gap-3">
              {softSkills.map((s) => (
                <div key={s.name} className="soft-chip">
                  <span className="text-xl">{s.icon}</span>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>

            {/* CTA inside skills */}
            <div className="mt-8 p-6 rounded-2xl"
              style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="font-display text-white text-lg font-semibold mb-2">Ready to work together?</div>
              <p className="text-white/40 text-sm mb-4 leading-relaxed">Let&#39;s discuss how my expertise can help achieve your financial goals.</p>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector<HTMLElement>('#contact')?.scrollIntoView({ behavior:'smooth' }); }}
                className="inline-flex items-center gap-2 text-[#c9a84c] font-bold text-sm border border-[#c9a84c]/30 hover:bg-[#c9a84c]/10 px-4 py-2.5 rounded-xl transition-colors">
                Schedule a Free Call →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
