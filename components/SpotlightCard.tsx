'use client';
import { motion, MotionProps } from 'framer-motion';
import { useRef } from 'react';

interface Props extends MotionProps {
  className?: string;
  spotColor?: string;
  children: React.ReactNode;
}

/** Card wrapper that tracks the cursor and drives a CSS radial-gradient spotlight (.spotlight-card in globals.css). */
export default function SpotlightCard({ className = '', spotColor, children, style, ...motionProps }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`spotlight-card ${className}`}
      style={{ ...(spotColor ? { '--spot-color': spotColor } : {}), ...style } as React.CSSProperties}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
