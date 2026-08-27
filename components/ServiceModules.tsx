'use client';
import { useEffect, useRef } from 'react';

export interface ServiceModule {
  number: string;
  title: string;
  desc: string;
  image?: string;
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

export default function ServiceModules({ modules }: { modules: ServiceModule[] }) {
  const ref = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="py-14 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-20 md:mb-28">
          <div className="rs section-kicker mb-8">
            <span className="section-kicker-line" />
            Core Modules
          </div>
          <h2 className="rs d1 font-serif text-3xl md:text-4xl text-green-800 leading-[1.2]">
            Everything runs from <span className="italic text-black">one connected system.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {modules.map((m, i) => {
            const reverse = i % 2 !== 0;
            return (
              <div
                key={m.number}
                className={`rs d${(i % 3) + 1} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <div>
                  <div className="font-serif text-5xl font-bold text-[#0B1F3A]/10 mb-4 leading-none">
                    {m.number}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#0B1F3A] leading-tight mb-4">
                    {m.title}
                  </h3>
                  <p className="text-[#6B7280] text-base leading-relaxed max-w-md">
                    {m.desc}
                  </p>
                </div>

                <div className="relative min-h-[240px] md:min-h-[300px] rounded-2xl overflow-hidden border border-gray-100 bg-[#F9FAFB]">
                  {m.image ? (
                    <img src={m.image} alt={m.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0B1F3A]/[0.03] to-[#155EEF]/[0.06]">
                      <span className="font-serif text-6xl font-bold text-[#0B1F3A]/[0.08]">{m.number}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
