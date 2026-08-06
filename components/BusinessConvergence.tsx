'use client';
import { motion } from 'framer-motion';

interface Node {
  icon: string;
  label: string;
  sub: string;
  color: string;
}

interface Props {
  nodes: Node[];
  hubTitle: string;
  hubSub: string;
}

const VB_W = 1000;
const VB_H = 460;
const HUB_X = VB_W - 90;
const HUB_Y = VB_H / 2;

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const dx = (x2 - x1) * 0.55;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

export default function BusinessConvergence({ nodes, hubTitle, hubSub }: Props) {
  const n = nodes.length;
  const nodeY = (i: number) => ((i + 1) * VB_H) / (n + 1);
  const nodeX = 90;

  return (
    <div className="relative w-full">
      {/* Desktop: SVG hub-and-spoke diagram */}
      <div className="hidden md:block relative" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0D47A1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0D47A1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {nodes.map((node, i) => {
            const d = curvePath(nodeX, nodeY(i), HUB_X, HUB_Y);
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={node.color} strokeOpacity="0.18" strokeWidth="2" />
                <circle r="4" fill={node.color}>
                  <animateMotion dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
                </circle>
              </g>
            );
          })}

          <circle cx={HUB_X} cy={HUB_Y} r="130" fill="url(#hubGlow)" />
        </svg>

        {/* Source node cards */}
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="absolute left-0 flex items-center gap-3 bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-3 -translate-y-1/2 whitespace-nowrap"
            style={{ top: `${(nodeY(i) / VB_H) * 100}%` }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${node.color}14` }}>
              <svg className="w-4.5 h-4.5" style={{ color: node.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d={node.icon} />
              </svg>
            </div>
            <div>
              <div className="font-bold text-[.8rem] text-[#0D47A1] leading-tight">{node.label}</div>
              <div className="text-[.62rem] font-black uppercase tracking-widest" style={{ color: node.color }}>{node.sub}</div>
            </div>
          </motion.div>
        ))}

        {/* Hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200, damping: 18 }}
          className="absolute right-0 -translate-y-1/2 flex flex-col items-center text-center gap-2 bg-[#0D47A1] rounded-2xl shadow-2xl shadow-[#0D47A1]/30 px-7 py-6"
          style={{ top: `${(HUB_Y / VB_H) * 100}%`, width: 190 }}
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] animate-pulse" />
          </div>
          <div className="font-serif text-lg text-white font-bold leading-tight">{hubTitle}</div>
          <div className="text-[.62rem] font-black uppercase tracking-widest text-white/50">{hubSub}</div>
        </motion.div>
      </div>

      {/* Mobile: simplified vertical funnel */}
      <div className="md:hidden flex flex-col items-center gap-3">
        <div className="grid grid-cols-2 gap-3 w-full">
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl shadow-sm px-3 py-3"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${node.color}14` }}>
                <svg className="w-4 h-4" style={{ color: node.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d={node.icon} />
                </svg>
              </div>
              <div className="font-bold text-[.72rem] text-[#0D47A1] leading-tight">{node.label}</div>
            </motion.div>
          ))}
        </div>
        <svg width="2" height="32" className="text-gray-300"><line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" /></svg>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center gap-2 bg-[#0D47A1] rounded-2xl shadow-xl shadow-[#0D47A1]/30 px-7 py-6 w-full"
        >
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] animate-pulse" />
          </div>
          <div className="font-serif text-lg text-white font-bold leading-tight">{hubTitle}</div>
          <div className="text-[.62rem] font-black uppercase tracking-widest text-white/50">{hubSub}</div>
        </motion.div>
      </div>
    </div>
  );
}
