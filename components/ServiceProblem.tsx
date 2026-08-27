'use client';
import { useEffect, useRef } from 'react';

export interface ServiceProblemData {
  kicker: string;
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

export default function ServiceProblem({ data }: { data: ServiceProblemData }) {
  const ref = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="py-14 md:py-18 bg-white border-y border-gray-100">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="rs section-kicker justify-center mb-8">
          <span className="section-kicker-line" />
          {data.kicker}
          <span className="section-kicker-line" />
        </div>
        <h2 className="rs d1 font-serif text-3xl md:text-[2.6rem] text-green-800 leading-[1.25] mb-6">
          &ldquo;{data.title}&rdquo;
        </h2>
        <p className="rs d2 text-[#6B7280] text-base md:text-lg leading-relaxed">
          {data.desc}
        </p>
      </div>
    </section>
  );
}
