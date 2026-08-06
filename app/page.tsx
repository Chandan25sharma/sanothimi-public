'use client';
import { Himalaya, Lattice, Mandala, NepalMoon, NepalSun } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import SpotlightCard from '@/components/SpotlightCard';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/lib/translations';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* ─── Animation helpers ──────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease, delay: i * 0.08 } }),
};

/* ─── Animated counter ───────────────────────────────────────────────── */
function useCounter(target: number, delay = 0) {
  const [val, setVal] = useState(0);
  const triggered = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true;
        setTimeout(() => {
          const step = target / (1800 / 16);
          let v = 0;
          const id = setInterval(() => {
            v = Math.min(v + step, target);
            setVal(Math.floor(v));
            if (v >= target) clearInterval(id);
          }, 16);
        }, delay);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, delay]);
  return { ref, val };
}

/* ─── Dashboard preview component ───────────────────────────────────── */
const CHART_BARS = [52, 68, 44, 76, 60, 88];
const CHART_MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const ACTIVITY_KEYS: TranslationKey[] = ['h2.dash.activity1', 'h2.dash.activity2', 'h2.dash.activity3'];

function DashboardPreview() {
  const { t } = useLanguage();
  const [actIdx, setActIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActIdx((i) => (i + 1) % ACTIVITY_KEYS.length), 2500);
    return () => clearInterval(id);
  }, []);

  /* Subtle 3D tilt-on-hover, hover.dev-style */
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 20 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${sRotX}deg) rotateY(${sRotY}deg)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 8);
    rotX.set(py * -8);
  };
  const onMouseLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transform }}
      className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-[#0D47A1]/20 border border-gray-100 bg-white"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#0D47A1]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded bg-white/95 p-0.5 flex items-center justify-center">
            <img src="/logo-icon-sano.png" alt="" className="w-full h-full object-contain" />
          </div>
          <span className="text-white/60 text-[.62rem] font-black uppercase tracking-widest">{t('h2.dash.title')}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-[.58rem] font-black uppercase tracking-widest">{t('h2.dash.live')}</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-[#F8FAFC] border-b border-gray-100">
        {[
          { labelKey: 'h2.dash.kpi.students' as TranslationKey, val: '1,247',   change: '↑ +12 today',  up: true },
          { labelKey: 'h2.dash.kpi.fee' as TranslationKey, val: 'Rs. 8.4L', change: '↑ +5.2% MoM', up: true },
          { labelKey: 'h2.dash.kpi.attendance' as TranslationKey, val: '98.2%',   change: '↑ +0.3%',      up: true },
        ].map((k) => (
          <div key={k.labelKey} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
            <div className="text-[.55rem] font-black text-gray-400 uppercase tracking-wider mb-1.5">{t(k.labelKey)}</div>
            <div className="text-[1rem] font-serif font-bold text-[#0D47A1] leading-none mb-1.5">{k.val}</div>
            <div className={`text-[.6rem] font-bold ${k.up ? 'text-green-600' : 'text-red-500'}`}>{k.change}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[.6rem] font-black text-gray-400 uppercase tracking-wider">{t('h2.dash.chartTitle')}</span>
          <span className="text-[.58rem] text-gray-300 font-medium">{t('h2.dash.chartPeriod')}</span>
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {CHART_BARS.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-t"
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease }}
                style={{
                  height: `${h}%`,
                  background: i === 5 ? '#D32F2F' : i === 4 ? '#0D47A1' : '#0D47A125',
                  borderRadius: '3px 3px 0 0',
                }}
              />
              <span className="text-[.5rem] text-gray-300 font-medium">{CHART_MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live activity ticker */}
      <div className="px-4 py-3 flex items-center gap-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-pulse flex-shrink-0" />
        <div className="overflow-hidden h-4 flex-1 relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={actIdx}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute text-[.65rem] text-gray-400 font-medium whitespace-nowrap"
            >
              {t(ACTIVITY_KEYS[actIdx])}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Data (text stored as translation keys — see lib/translations.ts "h2.*") ── */
const TRUST_ITEMS: TranslationKey[] = ['h2.trust.item1', 'h2.trust.item2', 'h2.trust.item3', 'h2.trust.item4', 'h2.trust.item5'];

const SOLUTIONS = [
  {
    num: '01', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    titleKey: 'h2.sol.1.title' as TranslationKey, sub: 'SchoolSathi', color: '#D32F2F',
    descKey: 'h2.sol.1.desc' as TranslationKey,
    featKeys: ['h2.sol.1.feat1', 'h2.sol.1.feat2', 'h2.sol.1.feat3', 'h2.sol.1.feat4'] as TranslationKey[],
  },
  {
    num: '02', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    titleKey: 'h2.sol.2.title' as TranslationKey, sub: 'FinanceCore', color: '#2563EB',
    descKey: 'h2.sol.2.desc' as TranslationKey,
    featKeys: ['h2.sol.2.feat1', 'h2.sol.2.feat2', 'h2.sol.2.feat3', 'h2.sol.2.feat4'] as TranslationKey[],
  },
  {
    num: '03', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    titleKey: 'h2.sol.3.title' as TranslationKey, sub: 'StockMate', color: '#059669',
    descKey: 'h2.sol.3.desc' as TranslationKey,
    featKeys: ['h2.sol.3.feat1', 'h2.sol.3.feat2', 'h2.sol.3.feat3', 'h2.sol.3.feat4'] as TranslationKey[],
  },
  {
    num: '04', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    titleKey: 'h2.sol.4.title' as TranslationKey, sub: 'HRDesk', color: '#D97706',
    descKey: 'h2.sol.4.desc' as TranslationKey,
    featKeys: ['h2.sol.4.feat1', 'h2.sol.4.feat2', 'h2.sol.4.feat3', 'h2.sol.4.feat4'] as TranslationKey[],
  },
];

const STEPS = [
  { n: '01', titleKey: 'h2.step.1.title' as TranslationKey, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', descKey: 'h2.step.1.desc' as TranslationKey },
  { n: '02', titleKey: 'h2.step.2.title' as TranslationKey, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', descKey: 'h2.step.2.desc' as TranslationKey },
  { n: '03', titleKey: 'h2.step.3.title' as TranslationKey, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', descKey: 'h2.step.3.desc' as TranslationKey },
];

const USE_CASES = [
  {
    industryKey: 'h2.use.1.industry' as TranslationKey,
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    color: '#D32F2F', iconBg: 'bg-red-50', cardBg: 'bg-white border-gray-100',
    itemKeys: ['h2.use.1.item1', 'h2.use.1.item2', 'h2.use.1.item3'] as TranslationKey[],
    descKey: 'h2.use.1.desc' as TranslationKey,
  },
  {
    industryKey: 'h2.use.2.industry' as TranslationKey,
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    color: '#2563EB', iconBg: 'bg-blue-50', cardBg: 'bg-white border-gray-100',
    itemKeys: ['h2.use.2.item1', 'h2.use.2.item2', 'h2.use.2.item3'] as TranslationKey[],
    descKey: 'h2.use.2.desc' as TranslationKey,
  },
  {
    industryKey: 'h2.use.3.industry' as TranslationKey,
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: '#059669', iconBg: 'bg-emerald-50', cardBg: 'bg-white border-gray-100',
    itemKeys: ['h2.use.3.item1', 'h2.use.3.item2', 'h2.use.3.item3'] as TranslationKey[],
    descKey: 'h2.use.3.desc' as TranslationKey,
  },
];

const STATS = [
  { target: 99, suf: '.9%', labelKey: 'h2.stat.uptime' as TranslationKey,  delay: 0 },
  { target: 50, suf: '+',   labelKey: 'h2.stat.institutions' as TranslationKey, delay: 150 },
  { target: 10, suf: 'K+',  labelKey: 'h2.stat.users' as TranslationKey,   delay: 300 },
  { target: 5,  suf: '+',   labelKey: 'h2.stat.years' as TranslationKey,   delay: 450 },
];

const DIFFERENTIATORS = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', titleKey: 'h2.diff.1.title' as TranslationKey, descKey: 'h2.diff.1.desc' as TranslationKey },
  { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', titleKey: 'h2.diff.2.title' as TranslationKey, descKey: 'h2.diff.2.desc' as TranslationKey },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', titleKey: 'h2.diff.3.title' as TranslationKey, descKey: 'h2.diff.3.desc' as TranslationKey },
  { icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', titleKey: 'h2.diff.4.title' as TranslationKey, descKey: 'h2.diff.4.desc' as TranslationKey },
];

/* ─── Process flow data ─────────────────────────────────────────────── */
const FLOW_TABS = [
  {
    id: 'school', labelKey: 'h2.flow.tab.school' as TranslationKey, color: '#D32F2F',
    steps: [
      { icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', labelKey: 'h2.flow.school.1.label' as TranslationKey, descKey: 'h2.flow.school.1.desc' as TranslationKey },
      { icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', labelKey: 'h2.flow.school.2.label' as TranslationKey, descKey: 'h2.flow.school.2.desc' as TranslationKey },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', labelKey: 'h2.flow.school.3.label' as TranslationKey, descKey: 'h2.flow.school.3.desc' as TranslationKey },
      { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', labelKey: 'h2.flow.school.4.label' as TranslationKey, descKey: 'h2.flow.school.4.desc' as TranslationKey },
      { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', labelKey: 'h2.flow.school.5.label' as TranslationKey, descKey: 'h2.flow.school.5.desc' as TranslationKey },
    ],
  },
  {
    id: 'finance', labelKey: 'h2.flow.tab.finance' as TranslationKey, color: '#2563EB',
    steps: [
      { icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', labelKey: 'h2.flow.finance.1.label' as TranslationKey, descKey: 'h2.flow.finance.1.desc' as TranslationKey },
      { icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z', labelKey: 'h2.flow.finance.2.label' as TranslationKey, descKey: 'h2.flow.finance.2.desc' as TranslationKey },
      { icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', labelKey: 'h2.flow.finance.3.label' as TranslationKey, descKey: 'h2.flow.finance.3.desc' as TranslationKey },
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', labelKey: 'h2.flow.finance.4.label' as TranslationKey, descKey: 'h2.flow.finance.4.desc' as TranslationKey },
      { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', labelKey: 'h2.flow.finance.5.label' as TranslationKey, descKey: 'h2.flow.finance.5.desc' as TranslationKey },
    ],
  },
  {
    id: 'inventory', labelKey: 'h2.flow.tab.inventory' as TranslationKey, color: '#059669',
    steps: [
      { icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', labelKey: 'h2.flow.inventory.1.label' as TranslationKey, descKey: 'h2.flow.inventory.1.desc' as TranslationKey },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', labelKey: 'h2.flow.inventory.2.label' as TranslationKey, descKey: 'h2.flow.inventory.2.desc' as TranslationKey },
      { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', labelKey: 'h2.flow.inventory.3.label' as TranslationKey, descKey: 'h2.flow.inventory.3.desc' as TranslationKey },
      { icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z', labelKey: 'h2.flow.inventory.4.label' as TranslationKey, descKey: 'h2.flow.inventory.4.desc' as TranslationKey },
      { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', labelKey: 'h2.flow.inventory.5.label' as TranslationKey, descKey: 'h2.flow.inventory.5.desc' as TranslationKey },
    ],
  },
  {
    id: 'hr', labelKey: 'h2.flow.tab.hr' as TranslationKey, color: '#D97706',
    steps: [
      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', labelKey: 'h2.flow.hr.1.label' as TranslationKey, descKey: 'h2.flow.hr.1.desc' as TranslationKey },
      { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', labelKey: 'h2.flow.hr.2.label' as TranslationKey, descKey: 'h2.flow.hr.2.desc' as TranslationKey },
      { icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', labelKey: 'h2.flow.hr.3.label' as TranslationKey, descKey: 'h2.flow.hr.3.desc' as TranslationKey },
      { icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', labelKey: 'h2.flow.hr.4.label' as TranslationKey, descKey: 'h2.flow.hr.4.desc' as TranslationKey },
      { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', labelKey: 'h2.flow.hr.5.label' as TranslationKey, descKey: 'h2.flow.hr.5.desc' as TranslationKey },
    ],
  },
];

const FLOW_STATS = {
  school:    [{ val: '1,247', labelKey: 'h2.flowstat.school.1' as TranslationKey }, { val: '98.2%', labelKey: 'h2.flowstat.school.2' as TranslationKey }, { val: '<5 min', labelKey: 'h2.flowstat.school.3' as TranslationKey }, { val: '100%', labelKey: 'h2.flowstat.school.4' as TranslationKey }],
  finance:   [{ val: '2,400+', labelKey: 'h2.flowstat.finance.1' as TranslationKey }, { val: '100%', labelKey: 'h2.flowstat.finance.2' as TranslationKey }, { val: '<1 hr', labelKey: 'h2.flowstat.finance.3' as TranslationKey }, { val: '0', labelKey: 'h2.flowstat.finance.4' as TranslationKey }],
  inventory: [{ val: '12,500', labelKey: 'h2.flowstat.inventory.1' as TranslationKey }, { val: '99.8%', labelKey: 'h2.flowstat.inventory.2' as TranslationKey }, { val: '2 min', labelKey: 'h2.flowstat.inventory.3' as TranslationKey }, { val: '40%', labelKey: 'h2.flowstat.inventory.4' as TranslationKey }],
  hr:        [{ val: '500+', labelKey: 'h2.flowstat.hr.1' as TranslationKey }, { val: '100%', labelKey: 'h2.flowstat.hr.2' as TranslationKey }, { val: '0', labelKey: 'h2.flowstat.hr.3' as TranslationKey }, { val: '4 hrs', labelKey: 'h2.flowstat.hr.4' as TranslationKey }],
};

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function Home() {
  const { t } = useLanguage();
  const counters = [
    useCounter(STATS[0].target, STATS[0].delay),
    useCounter(STATS[1].target, STATS[1].delay),
    useCounter(STATS[2].target, STATS[2].delay),
    useCounter(STATS[3].target, STATS[3].delay),
  ];

  const [flowTab, setFlowTab] = useState('school');
  const [flowStep, setFlowStep] = useState(0);
  useEffect(() => {
    setFlowStep(0);
    const id = setInterval(() => setFlowStep((s) => (s + 1) % 5), 1800);
    return () => clearInterval(id);
  }, [flowTab]);

  return (
    <main className="bg-white overflow-hidden">

      {/* ══════════════════════════════════════════════════
          01 · HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden pt-16 pb-16 lg:pt-24 lg:pb-24">
        {/* ── Hero background decorations ── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          {/* Mandala — top right, behind dashboard */}
          <Mandala className="absolute -top-24 -right-24 w-[560px] h-[560px] text-[#0D47A1] opacity-[0.10]" />
          {/* Nepal sun — top left accent */}
          <NepalSun className="absolute -top-16 -left-16 w-[320px] h-[320px] text-[#D32F2F] opacity-[0.10]" />
          {/* Large plain rings for depth */}
          <div className="absolute top-1/3 -right-60 w-[900px] h-[900px] rounded-full border border-[#0D47A1]/[0.04]" />
          <div className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full border border-[#D32F2F]/[0.04]" />
          {/* Soft glow orb */}
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#0D47A1]/[0.08] blur-[120px]" />
          {/* Himalaya ridge at bottom */}
          <Himalaya className="absolute bottom-0 left-0 w-full text-[#0D47A1] opacity-[0.04]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left: Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Kicker */}
            <motion.div variants={fadeUp} className="text-[#D32F2F] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
              {t('h2.hero.kicker')}
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="font-serif text-[2.6rem] md:text-[3.4rem] lg:text-[3.8rem] text-[#0D47A1] leading-[1.1] tracking-tight mb-6">
              {t('h2.hero.title1')}<br />
              {t('h2.hero.title2')}<br />
              <span className="relative inline-block">
                {t('h2.hero.title3')}
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#D32F2F] rounded-full" />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-[#64748B] text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              {t('h2.hero.desc')}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-12">
              <Link
                href="/demo"
                className="btn-shine inline-flex items-center justify-center gap-2.5 bg-[#D32F2F] text-white px-7 py-3.5 rounded-full font-semibold text-[.88rem] hover:bg-[#B71C1C] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D32F2F]/30 transition-all duration-200 w-full sm:w-auto"
              >
                {t('h2.hero.cta1')}
              </Link>
              <Link
                href="/services"
                className="flex items-center justify-center sm:justify-start gap-2 text-[#0D47A1] font-semibold text-[.88rem] hover:text-[#D32F2F] transition-colors"
              >
                {t('h2.hero.cta2')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 pt-8 border-t border-gray-100">
              {[
                { val: '50+',   labelKey: 'h2.hero.trust.institutions' as TranslationKey },
                { val: '10K+',  labelKey: 'h2.hero.trust.users' as TranslationKey },
                { val: '99.9%', labelKey: 'h2.hero.trust.uptime' as TranslationKey },
              ].map((s, i) => (
                <div key={s.labelKey} className={`flex flex-col gap-1 ${i === 0 ? 'pr-4' : i === 1 ? 'px-4 border-l border-r border-gray-200' : 'pl-4'}`}>
                  <div className="text-[1.2rem] sm:text-[1.5rem] font-serif font-bold text-[#0D47A1] leading-none">{s.val}</div>
                  <div className="text-gray-400 text-[.6rem] sm:text-[.7rem] font-medium leading-tight">{t(s.labelKey)}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Dashboard preview with geometric accent shapes */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="hidden lg:block relative"
          >
            {/* Geometric accent shapes */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-[16px] border-[#0D47A1]/8" />
              <div className="absolute -bottom-14 -right-6 w-28 h-28 rounded-full bg-[#D32F2F]/8" />
              <div className="absolute top-1/3 -left-8 flex gap-2">
                {[40, 60, 30, 50].map((h, i) => (
                  <div key={i} className="w-2.5 rounded-full bg-[#0D47A1]/12" style={{ height: h }} />
                ))}
              </div>
            </div>

            <div className="relative z-10 pb-16">
              <DashboardPreview />
            </div>

            {/* Floating badge — Azentio-style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute left-6 top-full -mt-10 z-20 flex items-center gap-3.5 bg-[#0D47A1] px-5 py-4 rounded-2xl shadow-2xl shadow-[#0D47A1]/30 max-w-[230px]"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
              </div>
              <div>
                <div className="text-[.78rem] font-bold text-[#D32F2F] leading-tight">{t('h2.hero.badgeTitle')}</div>
                <div className="text-[.72rem] text-white/70 leading-snug">{t('h2.hero.badgeDesc')}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          02 · TRUST BAR
      ══════════════════════════════════════════════════ */}
      <section className="py-10 bg-[#F8FAFC] border-y border-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between gap-6 mb-6">
            <div className="text-[.65rem] font-black uppercase tracking-[.35em] text-gray-400 whitespace-nowrap flex-shrink-0">
              {t('h2.trust.label')}
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-[.62rem] font-black uppercase tracking-widest flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {t('h2.trust.badge')}
            </span>
          </div>
        </div>
        <div className="marquee-mask">
          <div className="marquee-track gap-16 pr-16">
            {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
              <span key={i} className="text-[.72rem] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{t(item)}</span>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          03 · SOLUTIONS
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          {/* Lattice pattern — full cover, very faint */}
          <Lattice className="absolute inset-0 w-full h-full text-[#0D47A1] opacity-[0.125]" size={48} />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full border border-[#0D47A1]/[0.06]" />
          <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full border border-[#D32F2F]/[0.05]" />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-72 h-72 rounded-full bg-[#0D47A1]/[0.025] blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl mb-16"
          >
            <motion.div variants={fadeUp} className="section-kicker mb-6">
              <span className="section-kicker-line" />{t('h2.solutions.kicker')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#0D47A1] leading-[1.15] mb-4">
              {t('h2.solutions.title1')}<br /><span className="italic text-[#D32F2F]">{t('h2.solutions.title2')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#64748B] text-lg leading-relaxed">
              {t('h2.solutions.desc')}
            </motion.p>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {SOLUTIONS.map((s) => (
              <SpotlightCard
                key={s.num}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(13,71,161,0.10)' }}
                transition={{ duration: 0.2 }}
                spotColor={`${s.color}18`}
                className="glow-border-card group bg-white border border-gray-100 rounded-2xl p-7 flex flex-col cursor-pointer overflow-hidden"
                style={{ borderTopColor: s.color, borderTopWidth: 3, '--card-glow': s.color } as React.CSSProperties}
              >
                {/* Number */}
                <div className="text-[.58rem] font-black uppercase tracking-[.4em] text-gray-300 mb-5">{s.num}</div>
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                     style={{ background: `${s.color}12` }}>
                  <svg className="w-5 h-5" style={{ color: s.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                {/* Title */}
                <div className="font-serif text-xl text-[#0D47A1] font-bold mb-1">{t(s.titleKey)}</div>
                <div className="text-[.62rem] font-black uppercase tracking-widest mb-4" style={{ color: s.color }}>{s.sub}</div>
                {/* Desc */}
                <p className="text-[#64748B] text-[.82rem] leading-relaxed mb-6">{t(s.descKey)}</p>
                {/* Feature list */}
                <ul className="space-y-2 mb-7 flex-1">
                  {s.featKeys.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[.78rem] text-[#374151]">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: s.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                      {t(f)}
                    </li>
                  ))}
                </ul>
                {/* CTA link */}
                <Link href="/services" className="flex items-center gap-1.5 text-[.75rem] font-bold transition-colors mt-auto"
                      style={{ color: s.color }}>
                  {t('h2.solutions.learnMore')}
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
                </Link>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          03.5 · INTERACTIVE PROCESS FLOW
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-[#0D47A1]/[0.05]" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full border border-[#D32F2F]/[0.05]" />
          <div className="absolute top-1/2 -translate-y-1/2 -left-24 w-64 h-64 rounded-full bg-[#D32F2F]/[0.025] blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="section-kicker justify-center mb-6">
              <span className="section-kicker-line" />{t('h2.flow.kicker')}<span className="section-kicker-line" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#0D47A1] leading-[1.15]">
              {t('h2.flow.title1')} <span className="italic text-[#D32F2F]">{t('h2.flow.title2')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#64748B] text-lg leading-relaxed mt-4 max-w-xl mx-auto">
              {t('h2.flow.desc')}
            </motion.p>
          </motion.div>

          {/* Tab selector */}
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {FLOW_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFlowTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-[.82rem] font-bold transition-all duration-300 ${
                  flowTab === tab.id
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-[#F1F5F9] text-gray-500 hover:text-gray-800'
                }`}
                style={flowTab === tab.id ? { background: tab.color } : {}}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          {/* Flow diagram */}
          <AnimatePresence mode="wait">
            {FLOW_TABS.filter((ft) => ft.id === flowTab).map((tab) => (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                {/* Desktop: horizontal flow */}
                <div className="hidden md:flex items-start gap-0">
                  {tab.steps.flatMap((step, i) => {
                    const isActive = flowStep === i;
                    const isPast = flowStep > i;
                    const nodes = [
                      <motion.div
                        key={`s${i}`}
                        animate={{ scale: isActive ? 1.04 : 1, y: isActive ? -4 : 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex-1 flex flex-col items-center text-center p-5 rounded-2xl border bg-white cursor-default"
                        style={{
                          borderColor: isActive ? tab.color + '40' : isPast ? tab.color + '15' : '#F1F5F9',
                          boxShadow: isActive ? `0 8px 32px ${tab.color}20` : undefined,
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-500"
                          style={{ background: isActive ? tab.color : isPast ? tab.color + '15' : '#F1F5F9' }}
                        >
                          <svg
                            className="w-5 h-5"
                            style={{ color: isActive ? '#fff' : isPast ? tab.color : '#94A3B8' }}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                          </svg>
                        </div>
                        <div
                          className="font-bold text-[.78rem] mb-1 leading-tight transition-colors duration-300"
                          style={{ color: isActive ? tab.color : isPast ? '#64748B' : '#94A3B8' }}
                        >
                          {t(step.labelKey)}
                        </div>
                        <div className="text-[.66rem] text-gray-400 leading-relaxed hidden lg:block">{t(step.descKey)}</div>
                        {isActive && (
                          <div
                            className="mt-2.5 px-2.5 py-0.5 rounded-full text-white text-[.56rem] font-black uppercase tracking-widest animate-pulse"
                            style={{ background: tab.color }}
                          >
                            {t('h2.flow.live')}
                          </div>
                        )}
                      </motion.div>,
                    ];
                    if (i < tab.steps.length - 1) {
                      nodes.push(
                        <div
                          key={`a${i}`}
                          className="flex-shrink-0 w-8 flex items-start justify-center pt-[1.6rem]"
                        >
                          <svg
                            className="w-4 h-4 transition-colors duration-500"
                            style={{ color: isPast || isActive ? tab.color : '#E2E8F0' }}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      );
                    }
                    return nodes;
                  })}
                </div>

                {/* Mobile: vertical stack */}
                <div className="md:hidden flex flex-col gap-3">
                  {tab.steps.map((step, i) => {
                    const isActive = flowStep === i;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white border transition-all duration-300"
                        style={{ borderColor: isActive ? tab.color + '50' : '#F1F5F9' }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300"
                          style={{ background: isActive ? tab.color : tab.color + '12' }}
                        >
                          <svg
                            className="w-4 h-4"
                            style={{ color: isActive ? '#fff' : tab.color }}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-[.82rem]" style={{ color: isActive ? tab.color : '#0D47A1' }}>{t(step.labelKey)}</div>
                          <div className="text-[.72rem] text-gray-400">{t(step.descKey)}</div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: tab.color }} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Step progress dots */}
                <div className="flex items-center justify-center gap-2.5 mt-8">
                  {tab.steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFlowStep(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: flowStep === i ? '1.75rem' : '0.375rem',
                        height: '0.375rem',
                        background: flowStep === i ? tab.color : '#E2E8F0',
                      }}
                    />
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                  {FLOW_STATS[tab.id as keyof typeof FLOW_STATS].map((stat) => (
                    <div
                      key={stat.labelKey}
                      className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 text-center hover:border-gray-200 transition-colors"
                    >
                      <div
                        className="font-serif text-[1.6rem] font-bold leading-none mb-2"
                        style={{ color: tab.color }}
                      >
                        {stat.val}
                      </div>
                      <div className="text-[.68rem] text-gray-400 font-medium uppercase tracking-wide leading-tight">
                        {t(stat.labelKey)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          04 · HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 bg-[#F8FAFC] border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="section-kicker justify-center mb-6">
              <span className="section-kicker-line" />{t('h2.how.kicker')}<span className="section-kicker-line" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#0D47A1] leading-[1.15]">
              {t('h2.how.title1')} <span className="italic text-[#D32F2F]">{t('h2.how.title2')}</span>
            </motion.h2>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.7%+2rem)] right-[calc(16.7%+2rem)] h-px bg-gray-200 z-0" />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.12, ease }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div className="relative w-20 h-20 mb-7">
                  <div className="w-full h-full rounded-full bg-white border-2 border-gray-100 shadow-md flex items-center justify-center group-hover:border-[#D32F2F] transition-all">
                    <svg className="w-7 h-7 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#D32F2F] text-white text-[.6rem] font-black flex items-center justify-center shadow-md">
                    {step.n}
                  </div>
                </div>
                <h3 className="font-serif text-xl text-[#0D47A1] font-bold mb-3">{t(step.titleKey)}</h3>
                <p className="text-[#64748B] text-[.85rem] leading-relaxed max-w-xs">{t(step.descKey)}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/contact" className="btn-shine inline-flex items-center gap-2 bg-[#0D47A1] text-white px-8 py-4 rounded-xl font-bold text-[.88rem] hover:bg-[#D32F2F] hover:-translate-y-0.5 transition-all duration-300 shadow-lg">
              {t('h2.how.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          05 · STATS
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#0D47A1] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none opacity-40" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#D32F2F]/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {counters.map((c, i) => (
              <div key={STATS[i].labelKey} ref={c.ref} className="text-center group">
                <div className="flex items-baseline justify-center gap-0.5 mb-2">
                  <span className="text-5xl md:text-6xl font-serif font-bold text-white group-hover:text-[#D32F2F] transition-colors duration-400">
                    {c.val}
                  </span>
                  <span className="text-2xl font-serif text-[#D32F2F] font-bold">{STATS[i].suf}</span>
                </div>
                <div className="text-[.65rem] font-black uppercase tracking-[.3em] text-white/30">{t(STATS[i].labelKey)}</div>
                <div className="mt-4 mx-auto h-px w-6 bg-[#D32F2F]/30 group-hover:w-14 group-hover:bg-[#D32F2F] transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          06 · INDUSTRY USE CASES
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute -bottom-48 -left-48 w-[700px] h-[700px] rounded-full border border-[#059669]/[0.07]" />
          <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full border border-[#0D47A1]/[0.05]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#059669]/[0.025] blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="section-kicker justify-center mb-6">
              <span className="section-kicker-line" />{t('h2.use.kicker')}<span className="section-kicker-line" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#0D47A1] leading-[1.15]">
              {t('h2.use.title1')} <span className="italic text-[#D32F2F]">{t('h2.use.title2')}</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {USE_CASES.map((u) => (
              <SpotlightCard
                key={u.industryKey}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                spotColor={`${u.color}18`}
                className={`p-6 sm:p-8 rounded-2xl border ${u.cardBg} cursor-default shadow-sm overflow-hidden`}
              >
                <div className={`w-12 h-12 rounded-xl ${u.iconBg} flex items-center justify-center mb-5`}>
                  <svg className="w-6 h-6" style={{ color: u.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={u.icon} />
                  </svg>
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#0D47A1] font-bold mb-2">{t(u.industryKey)}</h3>
                <p className="text-[#64748B] text-[.82rem] leading-relaxed mb-4">{t(u.descKey)}</p>
                <ul className="space-y-2">
                  {u.itemKeys.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[.78rem] font-medium text-[#374151]">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: u.color }} />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          07 · WHY CHOOSE SANOTHIMI
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 bg-[#F8FAFC] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl mb-16"
          >
            <motion.div variants={fadeUp} className="section-kicker mb-6">
              <span className="section-kicker-line" />{t('h2.diff.kicker')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#0D47A1] leading-[1.15] mb-4">
              {t('h2.diff.title1')}<br /><span className="italic text-[#D32F2F]">{t('h2.diff.title2')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#64748B] text-lg leading-relaxed">
              {t('h2.diff.desc')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {DIFFERENTIATORS.map((d) => (
              <SpotlightCard
                key={d.titleKey}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: '#D32F2F' }}
                transition={{ duration: 0.2 }}
                spotColor="rgba(211,47,47,0.10)"
                className="glow-border-card bg-white border border-gray-100 rounded-2xl p-7 flex flex-col overflow-hidden"
                style={{ '--card-glow': '#D32F2F' } as React.CSSProperties}
              >
                <div className="w-11 h-11 rounded-xl bg-[#0D47A1] flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={d.icon} />
                  </svg>
                </div>
                <h4 className="font-serif text-[1.05rem] font-bold text-[#0D47A1] mb-3">{t(d.titleKey)}</h4>
                <p className="text-[#64748B] text-[.82rem] leading-relaxed">{t(d.descKey)}</p>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          08 · TESTIMONIAL
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          {/* Nepal moon centred behind the quote */}
          <NepalMoon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-[#0D47A1] opacity-[0.06]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#0D47A1]/[0.04]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#0D47A1]/[0.025] blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="font-serif text-[5rem] text-[#D32F2F] opacity-15 leading-none mb-2 select-none">&ldquo;</div>
            <blockquote className="font-serif text-2xl md:text-3xl text-[#0D47A1] leading-snug italic -mt-10 mb-10">
              {t('h2.testimonial.quote')}
            </blockquote>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0D47A1] flex items-center justify-center text-white font-bold text-base border-2 border-[#D4AF37]">
                SM
              </div>
              <div>
                <div className="font-bold text-[#0D47A1] text-sm">Sarah Mitchell</div>
                <div className="text-xs text-[#64748B]">{t('h2.testimonial.role')}</div>
              </div>
              {/* Stars */}
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          09 · PRICING CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#0D47A1] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none opacity-40" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#D32F2F]/7 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            <div>
              <motion.div variants={fadeUp} className="text-[.62rem] font-black uppercase tracking-[.4em] text-[#D32F2F] mb-4">{t('h2.pricing.kicker')}</motion.div>
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-white leading-tight mb-3">
                {t('h2.pricing.title1')} <span className="text-[#D32F2F]">Rs. 2,999</span>{t('h2.pricing.title2')}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/40 text-[.92rem]">
                {t('h2.pricing.desc')}
              </motion.p>
            </div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 flex-shrink-0">
              <Link href="/pricing" className="btn-shine flex items-center gap-2 bg-white text-[#0D47A1] px-8 py-4 rounded-xl font-bold text-[.88rem] hover:bg-[#F1F5F9] hover:-translate-y-0.5 transition-all shadow-lg">
                {t('h2.pricing.viewFull')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/demo" className="btn-shine flex items-center gap-2 bg-[#D32F2F] text-white px-8 py-4 rounded-xl font-bold text-[.88rem] hover:bg-white hover:text-[#D32F2F] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#D32F2F]/20">
                {t('h2.pricing.bookDemo')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title={t('h2.banner.title')}
        sub={t('h2.banner.sub')}
        cta={t('h2.banner.cta')}
        ctaHref="/contact"
      />
    </main>
  );
}
