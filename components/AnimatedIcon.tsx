'use client';
import { animate, createDrawable } from 'animejs';
import { useEffect, useRef } from 'react';

interface Props {
  d: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

/** Icon whose stroke draws itself in with anime.js the first time it scrolls into view. */
export default function AnimatedIcon({ d, className, delay = 0, style }: Props) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const [drawable] = createDrawable(el);
    drawable.draw = '0 0';

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(drawable, { draw: ['0 0', '0 1'], ease: 'inOutQuad', duration: 900, delay });
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path ref={pathRef} strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}
