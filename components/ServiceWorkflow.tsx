'use client';
import { useEffect, useRef } from 'react';

export interface ServiceWorkflowStep {
  number: string;
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

export default function ServiceWorkflow({ steps }: { steps: ServiceWorkflowStep[] }) {
  const ref = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="py-14 md:py-12 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="rs section-kicker mb-8">
            <span className="section-kicker-line" />
            How It Connects
          </div>
          <h2 className="rs d1 font-serif text-3xl md:text-4xl text-green-800 leading-[1.2]">
            One flow, <span className="italic text-black">start to finish.</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gray-200" />
          {steps.map((s, i) => (
            <div key={s.number} className={`rs d${(i % 4) + 1} relative flex flex-col items-start lg:items-center lg:text-center`}>
              <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-[#0B1F3A]/10 flex items-center justify-center font-serif text-lg font-bold text-[#0B1F3A] mb-5">
                {s.number}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0B1F3A] mb-2">{s.title}</h3>
              <p className="text-[#6B7280] text-[.82rem] leading-relaxed lg:max-w-[180px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
