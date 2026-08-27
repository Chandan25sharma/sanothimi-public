'use client';
import { useEffect, useRef } from 'react';

export default function ServiceProductShowcase({ image, label }: { image: string; label?: string }) {
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
    <section ref={ref as React.RefObject<HTMLDivElement>} className="py-24 md:py-32 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rs relative rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_40px_100px_rgba(11,31,58,0.1)] bg-white">
          <div className="flex items-center gap-1.5 px-5 py-3.5 bg-white border-b border-gray-100">
            <span className="w-2.5 h-2.5 rounded-full bg-red-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-200" />
          </div>
          <img src={image} alt={label ?? ''} className="w-full h-auto block" />
        </div>
        {label && (
          <p className="rs d1 text-center text-[#6B7280] text-sm font-medium mt-8">{label}</p>
        )}
      </div>
    </section>
  );
}
