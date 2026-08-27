'use client';
import AnimatedIcon from '@/components/AnimatedIcon';
import { NepalMoon } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import SpotlightCard from '@/components/SpotlightCard';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/lib/translations';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ArrowRight, Calculator, GraduationCap, Package, Users } from 'lucide-react';

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

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-[#0B1F3A]/20 border border-gray-100 bg-white">
      {/* Title bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#0B1F3A]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded bg-white/95 p-0.5 flex items-center justify-center">
            <img src="/sanothimi-logo0icon.png" alt="" className="w-full h-full object-contain" />
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
            <div className="text-[1rem] font-serif font-bold text-[#0B1F3A] leading-none mb-1.5">{k.val}</div>
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
                  background: i === 5 ? '#155EEF' : i === 4 ? '#0B1F3A' : '#0B1F3A25',
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
        <div className="w-1.5 h-1.5 rounded-full bg-[#155EEF] animate-pulse flex-shrink-0" />
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
    </div>
  );
}

/* ─── Data (text stored as translation keys — see lib/translations.ts "h2.*") ── */
const TRUST_ITEMS: TranslationKey[] = ['h2.trust.item1', 'h2.trust.item2', 'h2.trust.item3', 'h2.trust.item4', 'h2.trust.item5'];

const SOLUTIONS = [
  {
    num: '01', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    lucideIcon: GraduationCap,
    titleKey: 'h2.sol.1.title' as TranslationKey, sub: 'NUVORA', color: '#047130', status: 'live' as const,
    descKey: 'h2.sol.1.desc' as TranslationKey,
    featKeys: ['h2.sol.1.feat1', 'h2.sol.1.feat2', 'h2.sol.1.feat3', 'h2.sol.1.feat4'] as TranslationKey[],
  },
  {
    num: '02', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    lucideIcon: Calculator,
    titleKey: 'h2.sol.2.title' as TranslationKey, sub: 'FinanceCore', color: '#047130', status: 'soon' as const,
    descKey: 'h2.sol.2.desc' as TranslationKey,
    featKeys: ['h2.sol.2.feat1', 'h2.sol.2.feat2', 'h2.sol.2.feat3', 'h2.sol.2.feat4'] as TranslationKey[],
  },
  {
    num: '03', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    lucideIcon: Package,
    titleKey: 'h2.sol.3.title' as TranslationKey, sub: 'StockMate', color: '#047130', status: 'soon' as const,
    descKey: 'h2.sol.3.desc' as TranslationKey,
    featKeys: ['h2.sol.3.feat1', 'h2.sol.3.feat2', 'h2.sol.3.feat3', 'h2.sol.3.feat4'] as TranslationKey[],
  },
  {
    num: '04', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    lucideIcon: Users,
    titleKey: 'h2.sol.4.title' as TranslationKey, sub: 'HRDesk', color: '#047130', status: 'soon' as const,
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
    color: '#030403', iconBg: 'bg-red-50', cardBg: 'bg-white border-gray-100',
    itemKeys: ['h2.use.1.item1', 'h2.use.1.item2', 'h2.use.1.item3'] as TranslationKey[],
    descKey: 'h2.use.1.desc' as TranslationKey,
  },
  {
    industryKey: 'h2.use.2.industry' as TranslationKey,
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    color: '#030403', iconBg: 'bg-blue-50', cardBg: 'bg-white border-gray-100',
    itemKeys: ['h2.use.2.item1', 'h2.use.2.item2', 'h2.use.2.item3'] as TranslationKey[],
    descKey: 'h2.use.2.desc' as TranslationKey,
  },
  {
    industryKey: 'h2.use.3.industry' as TranslationKey,
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: '#030403', iconBg: 'bg-emerald-50', cardBg: 'bg-white border-gray-100',
    itemKeys: ['h2.use.3.item1', 'h2.use.3.item2', 'h2.use.3.item3'] as TranslationKey[],
    descKey: 'h2.use.3.desc' as TranslationKey,
  },
];

const STATS = [
  { target: 99, suf: '.9%', labelKey: 'h2.stat.uptime' as TranslationKey,  delay: 0,
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { target: 50, suf: '+',   labelKey: 'h2.stat.institutions' as TranslationKey, delay: 150,
    icon: 'M3 21h18M5 21V7l8-4v18m4 0V11l4 2v8M9 9h.01M9 12h.01M9 15h.01' },
  { target: 10, suf: 'K+',  labelKey: 'h2.stat.users' as TranslationKey,   delay: 300,
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { target: 5,  suf: '+',   labelKey: 'h2.stat.years' as TranslationKey,   delay: 450,
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
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
    id: 'school', labelKey: 'h2.flow.tab.school' as TranslationKey, color: '#076b23',
    steps: [
      { icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', labelKey: 'h2.flow.school.1.label' as TranslationKey, descKey: 'h2.flow.school.1.desc' as TranslationKey },
      { icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', labelKey: 'h2.flow.school.2.label' as TranslationKey, descKey: 'h2.flow.school.2.desc' as TranslationKey },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', labelKey: 'h2.flow.school.3.label' as TranslationKey, descKey: 'h2.flow.school.3.desc' as TranslationKey },
      { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', labelKey: 'h2.flow.school.4.label' as TranslationKey, descKey: 'h2.flow.school.4.desc' as TranslationKey },
      { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', labelKey: 'h2.flow.school.5.label' as TranslationKey, descKey: 'h2.flow.school.5.desc' as TranslationKey },
    ],
  },
  {
    id: 'finance', labelKey: 'h2.flow.tab.finance' as TranslationKey, color: '#076b23',
    steps: [
      { icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', labelKey: 'h2.flow.finance.1.label' as TranslationKey, descKey: 'h2.flow.finance.1.desc' as TranslationKey },
      { icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z', labelKey: 'h2.flow.finance.2.label' as TranslationKey, descKey: 'h2.flow.finance.2.desc' as TranslationKey },
      { icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', labelKey: 'h2.flow.finance.3.label' as TranslationKey, descKey: 'h2.flow.finance.3.desc' as TranslationKey },
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', labelKey: 'h2.flow.finance.4.label' as TranslationKey, descKey: 'h2.flow.finance.4.desc' as TranslationKey },
      { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', labelKey: 'h2.flow.finance.5.label' as TranslationKey, descKey: 'h2.flow.finance.5.desc' as TranslationKey },
    ],
  },
  {
    id: 'inventory', labelKey: 'h2.flow.tab.inventory' as TranslationKey, color: '#076b23',
    steps: [
      { icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', labelKey: 'h2.flow.inventory.1.label' as TranslationKey, descKey: 'h2.flow.inventory.1.desc' as TranslationKey },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', labelKey: 'h2.flow.inventory.2.label' as TranslationKey, descKey: 'h2.flow.inventory.2.desc' as TranslationKey },
      { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', labelKey: 'h2.flow.inventory.3.label' as TranslationKey, descKey: 'h2.flow.inventory.3.desc' as TranslationKey },
      { icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z', labelKey: 'h2.flow.inventory.4.label' as TranslationKey, descKey: 'h2.flow.inventory.4.desc' as TranslationKey },
      { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', labelKey: 'h2.flow.inventory.5.label' as TranslationKey, descKey: 'h2.flow.inventory.5.desc' as TranslationKey },
    ],
  },
  {
    id: 'hr', labelKey: 'h2.flow.tab.hr' as TranslationKey, color: '#076b23',
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

    const id = setInterval(
      () => setFlowStep((s) => (s + 1) % 5),
      1800
    );

    return () => clearInterval(id);
  }, [flowTab]);



  
  /* =========================================================
     HERO SLIDER STATE + DATA
  ========================================================= */


const heroSlides = [
  {
    image: '/hero-001.png',
    kicker: 'INTELLIGENT TECHNOLOGY',
    title1: 'Transform your',
    title2: 'business with',
    title3: 'intelligent technology.',
    description:
      'Purpose-built digital solutions that connect people, processes and data to help organizations operate smarter, move faster and grow with confidence.',
    badgeTitle: 'Smart Technology',
    badgeDesc: 'Built for modern businesses',
  },
  {
    image: '/hero-002.png',
    kicker: 'BUSINESS AUTOMATION',
    title1: 'Simplify your',
    title2: 'operations with',
    title3: 'powerful automation.',
    description:
      'Automate repetitive work, connect your business systems and give your teams the tools they need to focus on what really matters.',
    badgeTitle: 'Business Automation',
    badgeDesc: 'Less manual work. More efficiency.',
  },
  {
    image: '/hero-003.png',
    kicker: 'DATA & INSIGHTS',
    title1: 'Turn your data',
    title2: 'into smarter',
    title3: 'business decisions.',
    description:
      'Bring your data together, understand what is happening across your organization and make better decisions with real-time intelligence.',
    badgeTitle: 'Data Intelligence',
    badgeDesc: 'Insights that drive action.',
  },
  {
    image: '/hero-004.png',
    kicker: 'DIGITAL TRANSFORMATION',
    title1: 'Build the future',
    title2: 'of your business',
    title3: 'today.',
    description:
      'From ERP and enterprise applications to cloud and automation, we create technology that grows with your organization.',
    badgeTitle: 'Digital Transformation',
    badgeDesc: 'Technology designed to scale.',
  },
  {
    image: '/hero-005.png',
    kicker: 'CUSTOM SOFTWARE',
    title1: 'Custom software',
    title2: 'that works for',
    title3: 'your business.',
    description:
      'We build custom software solutions that are tailored to your business, helping you streamline operations, improve efficiency and drive growth.',
    badgeTitle: 'Custom Software',
    badgeDesc: 'Software built for your business.',
  }
];
const [activeSlide, setActiveSlide] = useState(0);
const currentHero = heroSlides[activeSlide];


const dragStartX = useRef<number | null>(null);
const dragStartY = useRef<number | null>(null);

const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
  dragStartX.current = e.clientX;
  dragStartY.current = e.clientY;

  e.currentTarget.setPointerCapture(e.pointerId);
};

const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
  if (dragStartX.current === null || dragStartY.current === null) {
    return;
  }

  const deltaX = e.clientX - dragStartX.current;
  const deltaY = e.clientY - dragStartY.current;

  if (
    Math.abs(deltaX) > 60 &&
    Math.abs(deltaX) > Math.abs(deltaY)
  ) {
    setActiveSlide((current) =>
      deltaX < 0
        ? (current + 1) % heroSlides.length
        : (current - 1 + heroSlides.length) % heroSlides.length
    );
  }

  dragStartX.current = null;
  dragStartY.current = null;
};

const handlePointerCancel = () => {
  dragStartX.current = null;
  dragStartY.current = null;
};

useEffect(() => {
  const interval = setInterval(() => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  }, 6500);

  return () => clearInterval(interval);
}, []);



  







  return (
    <main className="bg-white overflow-hidden">

    {/* =========================================================
    HERO SECTION — CORPORATE SPLIT / AUTO SLIDER
========================================================= */}


<section className="relative overflow-hidden bg-white">
  {/* =====================================================
      VERY LIGHT BACKGROUND DETAILS
  ====================================================== */}
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    {/* Large right circle */}
    <div className="absolute -right-[280px] top-[50px] h-[720px] w-[720px] rounded-full border border-[#0B1F3A]/[0.035]" />

    <div className="absolute -right-[190px] top-[140px] h-[540px] w-[540px] rounded-full border border-[#155EEF]/[0.035]" />

    {/* Soft blue glow */}
    <div className="absolute right-[15%] top-[10%] h-[430px] w-[430px] rounded-full bg-[#155EEF]/[0.025] blur-[100px]" />

    {/* Tiny decorative dots */}

  </div>

  <div className="relative z-10 mx-auto grid min-h-[680px] max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-0 pb-16 sm:px-8 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:pt-8 lg:pb-20">

    {/* =====================================================
        LEFT SIDE — TEXT
    ====================================================== */}
    <motion.div
      key={`text-${activeSlide}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative z-20 max-w-2xl"
    >
      {/* Kicker */}
      <div className="mb-6 flex items-center gap-3">
        <span className="h-[2px] w-9 bg-[#D4AF37]" />

        <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-gray-900">
          {currentHero.kicker}
        </span>
      </div>

      {/* Main headline */}
      <h1 className="font-serif text-[2.8rem] font-semibold leading-[1.04] tracking-[-0.025em] text-[#0B1F3A] sm:text-[2.6rem] lg:text-[2.15rem] xl:text-[2.45rem]">
        {currentHero.title1}
        <br />
        {currentHero.title2}
        <br />

        <span className="relative inline-block">
          {currentHero.title3}

          {/* Underline */}
          <span className="absolute -bottom-2 left-0 h-[3px] w-[72%] rounded-full bg-[#D4AF37]" />
        </span>
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-xl text-base leading-[1.8] text-[#64748B] sm:text-lg">
        {currentHero.description}
      </p>

      {/* CTA */}
      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">

        <Link
          href="/demo"
          style={{ '--pixel-text-hover': '#045b1b' } as React.CSSProperties}
          className="btn-pixel-solid group inline-flex items-center justify-center gap-2.5 rounded-full bg-green-800 px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(21,94,239,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(21,94,239,0.22)]"
        >
          <span className="relative z-10 inline-flex items-center gap-2.5">
            {t('h2.hero.cta1')}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </Link>

        <Link
          href="/services"
          className="group inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#0B1F3A]"
        >
          {t('h2.hero.cta2')}

          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
     
    </motion.div>


    {/* =====================================================
        RIGHT SIDE — TRANSPARENT IMAGE SLIDER
    ====================================================== */}
<div
  className="relative self-start h-[360px] sm:h-[440px] lg:h-[590px] select-none cursor-grab active:cursor-grabbing touch-pan-y"
  onPointerDown={handlePointerDown}
  onPointerUp={handlePointerUp}
  onPointerCancel={handlePointerCancel}
>
  {/* Background decoration */}
  <div
    className="pointer-events-none absolute inset-0"
    aria-hidden="true"
  >
    <div className="absolute right-[-60px] top-[7%] h-[430px] w-[430px] rounded-full border border-[#155EEF]/[0.09] lg:h-[520px] lg:w-[520px]" />

    <div className="absolute right-[-95px] top-[20%] h-[260px] w-[260px] rounded-full border-[22px] border-[#155EEF]/[0.035]" />

    <div className="absolute left-[5%] top-[25%] hidden gap-2 lg:flex">
      {[50, 72, 40, 62].map((height, index) => (
        <span
          key={index}
          className="w-[7px] rounded-full bg-[#155EEF]/[0.12]"
          style={{ height }}
        />
      ))}
    </div>

    <div className="absolute bottom-[7%] right-[15%] h-16 w-16 rotate-45 border border-[#0B1F3A]/[0.06]" />

    <div className="absolute right-[13%] top-[13%] h-4 w-4 rounded-full bg-[#155EEF]/20" />
  </div>

  {/* Hero image — fixed-size frame, image fills it edge to edge */}
  <div className="absolute inset-0 overflow-hidden, hight-full w-full">
    <AnimatePresence mode="wait">
      <motion.div
        key={currentHero.image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 z-10"
      >
        <img
  src={currentHero.image}
  alt={currentHero.title3}
  className="w-full h-auto object-contain object-top select-none pointer-events-none"
  draggable={false}
/>
      </motion.div>
    </AnimatePresence>
  </div>
</div>
  </div>
</section>




      {/* ══════════════════════════════════════════════════
          02 · TRUSTED BY
      ══════════════════════════════════════════════════ */}
      <section className="py-1 md:py-2 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-4">
          
          <span className="text-[.72rem] font-bold text-[#0B1F3A] h-[2px] w-9 bg-[#D4AF37]">{t('h2.trust.label')}</span>
        </div>
        <div className="marquee-mask">
          <div className="marquee-track items-center gap-16 pr-16">
            {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
              <span
                key={i}
                className="text-2xl md:text-xl font-serif font-bold text-gray-300 hover:text-[#0B1F3A] transition-colors whitespace-nowrap cursor-default"
              >
                {t(item)}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          03 · SOLUTIONS
      ══════════════════════════════════════════════════ */}
      <section className="py-4 md:py-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-5xl mb-14"
          >
            <motion.div variants={fadeUp} className="section-kicker mb-4">
              <span className="section-kicker-line " />{t('h2.solutions.kicker')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-xl sm:text-3xl md:text-3xl text-green-800 leading-[1.15] mb-4 whitespace-nowrap">
              {t('h2.solutions.title1')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#64748B] text-sm leading-relaxed">
              {t('h2.solutions.desc')}
            </motion.p>
          </motion.div>

          {/* Cards — plain by default, a soft white card reveals on hover */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="grid grid-cols-2 md:grid-cols-4 items-stretch gap-x-4 gap-y-10"
          >
            {SOLUTIONS.map((s) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                className="group h-full flex flex-col items-start p-5 -m-px rounded-2xl border border-transparent transition-all duration-300 hover:bg-white hover:border-gray-100 hover:shadow-[0_20px_40px_rgba(11,31,58,0.08)]"
              >
                {/* Icon */}
                <div className="mb-2 items-center ">
                  <s.lucideIcon className="w-9 h-9" strokeWidth={1.75} style={{ color: s.color }} />
                </div>
                {/* Title + status */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-[#0B1F3A] text-base">{t(s.titleKey)}</h3>
                  {s.status === 'live' ? (
                    <span className="text-[.62rem] font-bold text-green-900 uppercase tracking-wide">● Live</span>
                  ) : (
                    <span className="text-[.62rem] font-bold text-gray-400 uppercase tracking-wide">Soon</span>
                  )}
                </div>
                {/* Desc */}
                <p className="text-[#64748B] text-[.88rem] leading-relaxed mb-4">{t(s.descKey)}</p>
                {/* CTA link — plain minimal underline, no button/animation */}
                <Link
                  href="/services"
                  className="text-[.85rem] font-semibold underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity mt-auto"
                  style={{ color: s.color }}
                >
                  {t('h2.solutions.learnMore')}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>




      {/* ══════════════════════════════════════════════════
          03.5 · INTERACTIVE PROCESS FLOW
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 bg-white border-b border-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="hidden md:block absolute -top-56 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-[#0B1F3A]/[0.25]" />
          <div className="hidden md:block absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full border border-[#155EEF]/[0.05]" />
          <div className="absolute top-1/2 -translate-y-1/2 -left-24 w-40 h-40 md:w-64 md:h-64 rounded-full bg-[#155EEF]/[0.025] blur-[80px]" />
        </div>
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 1200 500"
    preserveAspectRatio="none"
  >
    <path
      d="M-50 380 C180 380 180 120 420 120 S700 380 950 200 S1100 80 1250 80"
      fill="none"
      stroke="#00730c"
      strokeWidth="1"
      opacity="0.12"
    />

    <path
      d="M-50 420 C200 420 260 180 500 180 S760 420 1000 250 S1150 150 1250 150"
      fill="none"
      stroke="#900505"
      strokeWidth="1"
      opacity="0.08"
    />
  </svg>
        </div>
        



     
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header — left-aligned, matching the Solutions section above */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-5xl mb-12"
          >
            <motion.div variants={fadeUp} className="section-kicker mb-6 ">
              <span className="section-kicker-line" />{t('h2.flow.kicker')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-xl sm:text-2xl md:text-3xl text-green-800 leading-[1.15] mb-4 whitespace-nowrap">
              {t('h2.flow.title1')} <span className="italic ">{t('h2.flow.title2')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#64748B] text-sm leading-relaxed">
              {t('h2.flow.desc')}
            </motion.p>
          </motion.div>

          {/* Tab selector — horizontal scroll on mobile, wraps centered from md up */}
          <div className="flex items-center gap-2 mb-5 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:justify-center md:overflow-visible">
            {FLOW_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFlowTab(tab.id)}
                className={`flex-shrink-0 whitespace-nowrap px-5 py-2.5  text-[.82rem] font-bold transition-all duration-300 ${
                  flowTab === tab.id
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-gray-500 text-white hover:text-gray-800'
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
                        className="flex-1 flex flex-col items-center text-center p-5 border bg-white cursor-default"
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
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
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

                {/* Mobile: vertical timeline */}
                <div className="md:hidden relative flex flex-col gap-3">
                  {/* Connecting line through the icon column */}
                  <div className="absolute left-[1.75rem] top-5 bottom-5 w-px bg-gray-200" />
                  {tab.steps.map((step, i) => {
                    const isActive = flowStep === i;
                    const isPast = flowStep > i;
                    return (
                      <div
                        key={i}
                        className="relative flex items-center gap-4 p-4 rounded-xl bg-white border transition-all duration-300"
                        style={{ borderColor: isActive ? tab.color + '50' : '#F1F5F9', boxShadow: isActive ? `0 8px 24px ${tab.color}18` : undefined }}
                      >
                        <div
                          className="relative z-10 w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300"
                          style={{ background: isActive ? tab.color : isPast ? tab.color + '30' : tab.color + '12' }}
                        >
                          <svg
                            className="w-4 h-4"
                            style={{ color: isActive || isPast ? '#fff' : tab.color }}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-[.82rem]" style={{ color: isActive ? tab.color : '#0B1F3A' }}>{t(step.labelKey)}</div>
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
          03.6 · WALKTHROUGH BANNER
      ══════════════════════════════════════════════════ */}
      <section className="bg-green-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 className="font-bold text-xl text-[#0B1F3A] mb-1.5">{t('h2.walkthrough.title')}</h3>
            <p className="text-[#0B1F3A]/70 text-[.92rem]">{t('h2.walkthrough.desc')}</p>
          </div>
          <Link
            href="/demo"
            style={{ '--pixel-text-hover': '#025b14' } as React.CSSProperties}
            className="btn-pixel-solid inline-flex items-center justify-center flex-shrink-0 bg-green-800 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors"
          >
            <span className="relative z-10">{t('h2.walkthrough.cta')}</span>
          </Link>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          04 · HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section className="py-4 md:py-4 bg-[#F8FAFC] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="text-left mb-4"
    >

      <motion.div
        variants={fadeUp}
        className="section-kicker justify-start mb-6"
      >
        <span className="section-kicker-line" />
        {t('h2.how.kicker')}
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="font-serif text-4xl md:text-4xl text-green-800 leading-[1.15]"
      >
        {t('h2.how.title1')}{' '}
        <span className="italic text-gray-900">
          {t('h2.how.title2')}
        </span>
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
                  <div className="w-full h-full rounded-full bg-white border-2 border-gray-100 shadow-md flex items-center justify-center group-hover:border-[#155EEF] transition-all">
                    <svg className="w-7 h-7 text-[#0B1F3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>
             
                </div>
                <h3 className="font-serif text-xl text-[#0B1F3A] font-bold mb-3">{t(step.titleKey)}</h3>
                <p className="text-[#64748B] text-[.85rem] leading-relaxed max-w-xs">{t(step.descKey)}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/contact"
              style={{ '--pixel-text-hover': '#016938' } as React.CSSProperties}
              className="btn-pixel-solid inline-flex items-center gap-2 bg-green-900 text-white px-7 py-4 rounded-xl font-bold text-[.88rem] hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {t('h2.how.cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          05 · STATS
      ══════════════════════════════════════════════════ */}
<section className="relative overflow-hidden bg-gradient-to-br from-[#14532D] via-[#0B3B25] to-[#06301E] py-20 md:py-28">

  {/* =========================================================
      BACKGROUND — BRAND DATA FLOW
      ========================================================= */}
  <div
    className="absolute inset-0 pointer-events-none"
    aria-hidden="true"
  >

    {/* Very subtle technical grid */}
    <div
      className="absolute inset-0 opacity-[0.045]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
      }}
    />

    {/* Gold flowing data paths */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1600 700"
      preserveAspectRatio="none"
      fill="none"
    >

      {/* Main flowing path */}
      <path
        d="M-100 520 C180 520 190 180 480 180 S760 540 1040 350 S1320 80 1700 120"
        stroke="#C9A227"
        strokeWidth="1.4"
        opacity="0.20"
      />

      {/* Secondary flowing path */}
      <path
        d="M-100 580 C220 580 270 260 510 260 S780 590 1050 430 S1340 180 1700 200"
        stroke="#D6B656"
        strokeWidth="1"
        opacity="0.12"
      />

      {/* Upper flowing path */}
      <path
        d="M-100 170 C180 170 280 420 520 420 S800 80 1080 220 S1370 470 1700 390"
        stroke="#C9A227"
        strokeWidth="1"
        opacity="0.10"
      />

      {/* Long subtle path */}
      <path
        d="M-100 650 C250 650 320 400 600 400 S900 650 1180 500 S1450 300 1700 330"
        stroke="#FFFFFF"
        strokeWidth="0.8"
        opacity="0.07"
      />

      {/* Small connection points */}
      <circle cx="480" cy="180" r="3" fill="#C9A227" opacity="0.35" />
      <circle cx="1040" cy="350" r="3" fill="#C9A227" opacity="0.35" />
      <circle cx="1080" cy="220" r="2.5" fill="#D6B656" opacity="0.30" />
      <circle cx="600" cy="400" r="2.5" fill="#C9A227" opacity="0.25" />

    </svg>

    {/* Soft gold atmospheric glow */}
    <div className="absolute -top-40 right-[-80px] w-[500px] h-[500px] rounded-full bg-[#C9A227]/[0.07] blur-[140px]" />

    <div className="absolute -bottom-48 left-[-100px] w-[450px] h-[450px] rounded-full bg-[#C9A227]/[0.05] blur-[130px]" />

    {/* Very subtle center light */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-white/[0.015] blur-[100px]" />

  </div>


  {/* =========================================================
      CONTENT
      ========================================================= */}
  <div className="max-w-6xl mx-auto px-6 relative z-10">

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.09,
          },
        },
      }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
    >

      {counters.map((c, i) => (

        <motion.div
          key={STATS[i].labelKey}
          ref={c.ref}
          variants={fadeUp}
          whileHover={{
            y: -6,
            transition: { duration: 0.25 },
          }}
          className="group relative text-center bg-white/[0.055] border border-white/[0.12] rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg p-5 md:p-8 overflow-hidden backdrop-blur-md transition-all duration-300 hover:bg-white/[0.09] hover:border-[#C9A227]/40 hover:shadow-[0_15px_50px_rgba(0,0,0,0.18)]"
        >

          {/* ---------------------------------------------
              Card decorative flow
              --------------------------------------------- */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.18]"
            viewBox="0 0 300 180"
            fill="none"
          >
            <path
              d="M-30 145 C70 145 75 45 150 45 S235 135 330 65"
              stroke="#C9A227"
              strokeWidth="1"
            />

            <path
              d="M-30 160 C70 160 90 70 160 70 S235 150 330 90"
              stroke="#D6B656"
              strokeWidth="0.7"
            />
          </svg>


          {/* ---------------------------------------------
              Hover gold glow
              --------------------------------------------- */}
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#C9A227]/20 blur-[45px] opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 pointer-events-none"
          />


          {/* ---------------------------------------------
              Icon
              --------------------------------------------- */}
          <div
            className="relative inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/[0.08] border border-white/[0.08] mb-4 transition-all duration-300 group-hover:bg-[#C9A227] group-hover:border-[#C9A227]"
          >
            <AnimatedIcon
              d={STATS[i].icon}
              className="w-5 h-5 text-white transition-colors duration-300"
              delay={i * 120}
            />
          </div>


          {/* ---------------------------------------------
              Number
              --------------------------------------------- */}
          <div className="relative flex items-baseline justify-center gap-0.5 mb-1.5">

            <span
              className="text-4xl md:text-5xl font-serif font-bold text-white leading-none"
            >
              {c.val}
            </span>

            <span
              className="text-xl font-serif font-bold text-[#D6B656]"
            >
              {STATS[i].suf}
            </span>

          </div>


          {/* ---------------------------------------------
              Label
              --------------------------------------------- */}
          <div
            className="relative text-[.62rem] font-black uppercase tracking-[.25em] text-white/45 group-hover:text-white/65 transition-colors duration-300"
          >
            {t(STATS[i].labelKey)}
          </div>

        </motion.div>

      ))}

    </motion.div>

  </div>


  {/* =========================================================
      CURVED BOTTOM TRANSITION
      ========================================================= */}
  <div
    className="absolute bottom-[-1px] left-0 w-full h-[80px] sm:h-[95px] md:h-[125px] lg:h-[145px] pointer-events-none z-[20]"
    aria-hidden="true"
  >
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1600 145"
      preserveAspectRatio="none"
      fill="none"
    >

      {/* Main architectural curve */}
      <path
        d="M0 68 C170 96 330 119 520 112 C745 104 875 63 1085 49 C1295 35 1450 50 1600 78 L1600 145 L0 145 Z"
        fill="#FFFFFF"
      />

    </svg>
  </div>

</section>
      {/* ══════════════════════════════════════════════════
          06 · INDUSTRY USE CASES
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute -bottom-48 -left-48 w-[700px] h-[700px] rounded-full border border-[#059669]/[0.17]" />
          <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full border border-[#0B1F3A]/[0.15]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#059669]/[0.025] blur-[100px]" />
        </div>
<div className="absolute inset-0 pointer-events-none overflow-hidden">
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 1200 500"
    preserveAspectRatio="none"
    fill="none"
  >
    <path
      d="M-100 420 C140 420 200 360 350 330 C520 295 600 250 730 205 C900 150 1060 125 1300 80"
      stroke="#C9A227"
      strokeWidth="1.3"
      opacity="0.15"
    />

    <path
      d="M-100 445 C140 445 200 385 350 355 C520 320 600 275 730 230 C900 175 1060 150 1300 105"
      stroke="#FFFFFF"
      strokeWidth="0.8"
      opacity="0.08"
    />

    <path
      d="M-100 470 C140 470 200 410 350 380 C520 345 600 300 730 255 C900 200 1060 175 1300 130"
      stroke="#C9A227"
      strokeWidth="0.7"
      opacity="0.07"
    />
  </svg>
</div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-left mb-4"
          >
            <motion.div variants={fadeUp} className="section-kicker justify-center mb-6">
              <span className="section-kicker-line" />{t('h2.use.kicker')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-green-800 leading-[1.15]">
              {t('h2.use.title1')} <span className="italic text-gray-900">{t('h2.use.title2')}</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 pb-2 md:pb-0"
          >
            {USE_CASES.map((u, i) => (
              <SpotlightCard
                key={u.industryKey}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(13,71,161,0.10)' }}
                transition={{ duration: 0.2 }}
                spotColor={`${u.color}18`}
                className={`group relative p-6 sm:p-8 cursor-default shadow-sm overflow-hidden snap-start shrink-0 w-[82vw] sm:w-[340px] md:w-auto`}
              >
                {/* Animated corner glow — blooms in on hover */}
             

                <motion.div
                  whileHover={{ rotate: 8, scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
             
                >
                  <AnimatedIcon d={u.icon} className="w-9 h-9" delay={i * 120} style={{ color: u.color }} />
                </motion.div>
                <h3 className="relative font-serif text-lg sm:text-xl text-[#0B1F3A] font-bold mb-2">{t(u.industryKey)}</h3>
                <p className="relative text-[#64748B] text-[.82rem] leading-relaxed mb-5">{t(u.descKey)}</p>
                <div className="relative flex flex-wrap gap-2">
                  {u.itemKeys.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                      className="text-[.72rem] font-bold px-3 py-1.5 rounded-full"
                      style={{ background: `${u.color}0F`, color: u.color }}
                    >
                      {t(item)}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          07 · WHY CHOOSE SANOTHIMI
      ══════════════════════════════════════════════════ */}
      <section className="py-14 md:py-4 bg-[#F8FAFC] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-6xl mb-4"
          >
            <motion.div variants={fadeUp} className="section-kicker mb-6">
              <span className="section-kicker-line" />{t('h2.diff.kicker')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-green-800 leading-[1.15] mb-4">
              {t('h2.diff.title1')}<span className="italic text-gray-900">{t('h2.diff.title2')}</span>
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
                whileHover={{ y: -4, }}
                transition={{ duration: 0.2 }}
                spotColor="rgba(211,47,47,0.10)"
                className="glow-border-card bg-white border border-gray-100 rounded-2xl p-7 flex flex-col overflow-hidden"
                style={{ '--card-glow': '#155EEF' } as React.CSSProperties}
              >
                <div className="w-11 h-11 rounded-xl  flex items-center justify-center mb-5">
                  <svg className="w-19 h-19 text-black"  fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={d.icon} />
                  </svg>
                </div>
                <h4 className="font-serif text-[1.05rem] font-bold text-[#0B1F3A] mb-3">{t(d.titleKey)}</h4>
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
          <NepalMoon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-[#0B1F3A] opacity-[0.06]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#0B1F3A]/[0.04]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#0B1F3A]/[0.025] blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="font-serif text-[5rem] text-[#155EEF] opacity-15 leading-none mb-2 select-none">&ldquo;</div>
            <blockquote className="font-serif text-2xl md:text-3xl text-[#0B1F3A] leading-snug italic -mt-10 mb-10">
              {t('h2.testimonial.quote')}
            </blockquote>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0B1F3A] flex items-center justify-center text-white font-bold text-base border-2 border-[#D4AF37]">
                SM
              </div>
              <div>
                <div className="font-bold text-[#0B1F3A] text-sm">Sarah Mitchell</div>
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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#14532D] via-[#0B3B25] to-[#06301E] py-20 md:py-24">

  {/* =========================================================
      BRAND BACKGROUND
      ========================================================= */}

  <div
    className="absolute inset-0 pointer-events-none"
    aria-hidden="true"
  >

    {/* Fine architectural grid */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }}
    />

    {/* Gold flowing data paths */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1600 600"
      preserveAspectRatio="none"
      fill="none"
    >

      <path
        d="M-100 430 C180 430 220 120 480 150 S760 480 1010 300 S1330 70 1700 120"
        stroke="#C9A227"
        strokeWidth="1.2"
        opacity="0.18"
      />

      <path
        d="M-100 470 C190 470 250 190 500 200 S780 510 1040 350 S1350 150 1700 180"
        stroke="#D6B656"
        strokeWidth="0.8"
        opacity="0.10"
      />

      <path
        d="M-100 160 C180 150 280 360 500 350 S820 80 1070 200 S1400 420 1700 330"
        stroke="#C9A227"
        strokeWidth="0.8"
        opacity="0.08"
      />

      {/* Small brand data points */}
      <circle
        cx="480"
        cy="150"
        r="3"
        fill="#D6B656"
        opacity="0.45"
      />

      <circle
        cx="1010"
        cy="300"
        r="2.5"
        fill="#C9A227"
        opacity="0.35"
      />

      <circle
        cx="1070"
        cy="200"
        r="2"
        fill="#D6B656"
        opacity="0.3"
      />

    </svg>

    {/* Gold atmospheric glow */}
    <div
      className="absolute -top-40 right-[-100px] w-[500px] h-[500px] rounded-full bg-[#C9A227]/[0.06] blur-[140px]"
    />

    <div
      className="absolute -bottom-40 left-[-100px] w-[450px] h-[450px] rounded-full bg-[#C9A227]/[0.05] blur-[130px]"
    />

  </div>


  {/* =========================================================
      CURVED TOP EDGE
      ========================================================= */}

  <div
    className="absolute top-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none"
  >
    <svg
      className="relative block w-full h-[55px] md:h-[75px]"
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0 0H1440V25C1200 85 960 85 720 45C480 5 240 5 0 55V0Z"
        fill="#F8FAFC"
      />

      <path
        d="M0 55C240 5 480 5 720 45C960 85 1200 85 1440 25"
        stroke="#C9A227"
        strokeWidth="1"
        opacity="0.55"
      />
    </svg>
  </div>


  {/* =========================================================
      MAIN CONTENT
      ========================================================= */}

  <div className="max-w-6xl mx-auto px-6 relative z-10 pt-10 md:pt-12">

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="relative flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-14"
    >

      {/* =====================================================
          LEFT CONTENT
          ===================================================== */}

      <div className="max-w-2xl text-center lg:text-left">

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center lg:justify-start gap-3 text-[.62rem] font-black uppercase tracking-[.4em] text-[#D6B656] mb-5"
        >
          <span className="w-10 h-px bg-[#C9A227]/70" />
          {t('h2.pricing.kicker')}
        </motion.div>


        <motion.h2
          variants={fadeUp}
          className="font-serif text-3xl md:text-4xl lg:text-[2.7rem] text-white leading-[1.12] mb-4"
        >
          {t('h2.pricing.title1')}{' '}

          <span className="italic text-[#D6B656]">
            Rs. 2,999
          </span>

          {t('h2.pricing.title2')}
        </motion.h2>


        <motion.p
          variants={fadeUp}
          className="text-white/45 text-[.92rem] leading-relaxed max-w-xl"
        >
          {t('h2.pricing.desc')}
        </motion.p>

      </div>


      {/* =====================================================
          CTA PANEL
          ===================================================== */}

      <motion.div
        variants={fadeUp}
        className="relative flex flex-wrap justify-center gap-3 p-2 rounded-2xl bg-white/[0.045] border border-white/[0.10] backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
      >

        {/* Gold accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent"
        />


        <Link
          href="/pricing"
          className="group relative flex items-center justify-center gap-2 bg-white text-[#0B3B25] px-7 py-3.5 rounded-xl font-bold text-[.84rem] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(201,162,39,0.18)]"
        >
          <span>
            {t('h2.pricing.viewFull')}
          </span>

          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>


        <Link
          href="/demo"
          className="group relative flex items-center justify-center gap-2 bg-[#C9A227] text-[#082B1A] px-7 py-3.5 rounded-xl font-bold text-[.84rem] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D6B656] hover:shadow-[0_10px_30px_rgba(201,162,39,0.25)]"
        >
          <span>
            {t('h2.pricing.bookDemo')}
          </span>

          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>

      </motion.div>

    </motion.div>

  </div>


  {/* =========================================================
      CURVED BOTTOM EDGE
      ========================================================= */}

  <div
    className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none"
  >
    <svg
      className="relative block w-full h-[55px] md:h-[80px]"
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      fill="none"
    >

      <path
        d="M0 65 C240 15 480 10 720 50 C960 90 1200 85 1440 25 V90 H0 Z"
        fill="#F8FAFC"
      />

      <path
        d="M0 65 C240 15 480 10 720 50 C960 90 1200 85 1440 25"
        stroke="#C9A227"
        strokeWidth="1"
        opacity="0.5"
      />

    </svg>
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
