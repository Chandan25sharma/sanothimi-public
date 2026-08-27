'use client';
import { useEffect, useRef } from 'react';

export interface ServiceAudience {
  title: string;
  desc: string;
}

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.09 }
    );
    ref.current?.querySelectorAll('.rs').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function ServiceAudiences({ audiences }: { audiences: ServiceAudience[] }) {
  const ref = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="py-14 md:py-15 bg-[#0B1F3A] relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dark opacity-40 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="rs section-kicker mb-8">
            <span className="section-kicker-line" />
            <span className="text-white">Who Uses It</span>
          </div>
          <h2 className="rs d1 font-serif text-3xl md:text-4xl text-green-800 leading-[1.2]">
            Built for <span className="italic text-white">everyone in the building.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              className={`rs d${i + 1} group p-7 bg-white/5 border hover:bg-white/[0.08]  transition-all duration-500`}
            >
              <h3 className="font-serif text-lg font-bold text-white mb-3 group-hover:text-green-600 transition-colors duration-500">
                {a.title}
              </h3>
              <p className="text-white/50 text-[.82rem] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
