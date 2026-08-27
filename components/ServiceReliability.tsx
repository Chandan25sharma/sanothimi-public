'use client';
import { useEffect, useRef } from 'react';

export default function ServiceReliability({ items }: { items: string[] }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.09 }
    );
    ref.current?.querySelectorAll('.rs').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rs flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-[#0B1F3A] text-[.8rem] font-bold">
              <span className="w-6 h-6 rounded-full bg-[#12B76A]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-[#12B76A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
