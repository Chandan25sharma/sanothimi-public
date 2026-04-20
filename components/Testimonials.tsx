'use client';
import { testimonials } from '@/data/portfolio';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((i: number) => {
    setCur((i + testimonials.length) % testimonials.length);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setCur((c) => (c + 1) % testimonials.length), 5500);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => setCur((c) => (c + 1) % testimonials.length), 5500);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => { if (timer.current) clearInterval(timer.current); obs.disconnect(); };
  }, []);

  const COLORS = ['#c9a84c','#0d9488','#6366f1','#f59e0b','#ec4899'];

  return (
    <section id="testimonials" className="py-28 bg-white" ref={ref} aria-label="Testimonials section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal text-center mb-14">
          <div className="badge-label center mb-4">Client Reviews</div>
          <h2 className="font-display text-4xl xl:text-5xl text-[#050d1a] mb-4">
            What Clients <span className="text-gradient">Say About Me</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">Trusted by executives, entrepreneurs, and professionals across North America and Europe.</p>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sidebar nav */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => go(i)}
                className={`shrink-0 flex items-center gap-3 rounded-2xl p-3 text-left w-full transition-all duration-300 ${
                  i === cur
                    ? 'bg-[#050d1a] shadow-lg'
                    : 'bg-slate-50 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-display text-sm shrink-0"
                  style={{ background: `${COLORS[i]}20`, color: COLORS[i], border: `1.5px solid ${COLORS[i]}40` }}
                >
                  {t.initials}
                </div>
                <div className="hidden lg:block min-w-0">
                  <div className={`font-semibold text-[0.82rem] truncate transition-colors ${i === cur ? 'text-white' : 'text-[#050d1a]'}`}>{t.name}</div>
                  <div className={`text-[0.72rem] truncate transition-colors ${i === cur ? 'text-white/40' : 'text-slate-400'}`}>{t.title.split(',')[0]}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Main quote */}
          <div className="lg:col-span-9">
            <div
              className="rounded-3xl p-8 xl:p-12 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg,#050d1a,#0a1628)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 40px 100px rgba(0,0,0,0.25)' }}
            >
              {/* Big quote mark */}
              <div className="font-display text-9xl leading-none text-[#c9a84c]/08 absolute top-4 left-8 select-none" aria-hidden="true">&ldquo;</div>

              <div className="testi-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <div key={t.id} className="testi-slide">
                    <div className="text-[#c9a84c] text-xl tracking-wider mb-6">★★★★★</div>
                    <p className="text-white/80 text-lg xl:text-xl leading-relaxed font-light mb-9 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/08">
                      <div
                        className="w-14 h-14 rounded-2xl font-bold font-display flex items-center justify-center text-lg shrink-0"
                        style={{ background: `${COLORS[i]}20`, color: COLORS[i], border: `1.5px solid ${COLORS[i]}40` }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{t.name}</div>
                        <div className="text-white/35 text-sm">{t.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === cur ? 24 : 8,
                      height: 8,
                      background: i === cur ? '#c9a84c' : 'rgba(255,255,255,0.15)',
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
