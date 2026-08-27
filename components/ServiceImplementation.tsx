'use client';
import { useEffect, useRef } from 'react';

export interface ServiceImplementationStep {
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

export default function ServiceImplementation({ steps }: { steps: ServiceImplementationStep[] }) {
  const ref = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="py-14 md:py-16 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="rs section-kicker mb-8">
            <span className="section-kicker-line" />
            Getting Started
          </div>
          <h2 className="rs d1 font-serif text-3xl md:text-4xl text-green-800 leading-[1.2]">
            From kickoff to <span className="italic text-black">go-live.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.title} className={`rs d${i + 1} relative p-7 rounded-2xl bg-white border border-gray-100`}>
              <div className="text-green-400 font-serif text-3xl font-bold mb-4">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="font-serif text-lg font-bold text-[#0B1F3A] mb-2">{s.title}</h3>
              <p className="text-[#6B7280] text-[.82rem] leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <svg className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
