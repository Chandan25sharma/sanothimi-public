'use client';
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
}

interface Props {
  accentColor?: string;
}

export default function DataNetworkBg({ accentColor = '#D32F2F' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // Create nodes
    const COUNT = 28;
    nodesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.02,
    }));

    // Accent RGB
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const { r: ar, g: ag, b: ab } = hexToRgb(accentColor);

    const MAX_DIST = 180;

    let frame = 0;
    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      frame++;

      ctx.clearRect(0, 0, W(), H());

      const nodes = nodesRef.current;

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            // Pulse a travelling dot along the line every ~120 frames per pair
            const phase = ((frame + i * 17 + j * 31) % 120) / 120;
            const pulseAlpha = Math.sin(phase * Math.PI) * 0.6;

            // Base line
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.4})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Travelling packet
            if (pulseAlpha > 0.05) {
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * phase;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * phase;
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${ar},${ag},${ab},${pulseAlpha})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.15 + glow * 0.25})`;
        ctx.fill();

        // Halo for a few nodes
        if (n.r > 2) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (2 + glow * 2), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ar},${ag},${ab},${glow * 0.06})`;
          ctx.fill();
        }
      });
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
