'use client';
import CTABanner from '@/components/CTABanner';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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
const ACTIVITIES = [
  'Fee received: Rs. 15,000 — Aarav Sharma',
  'Attendance: 98.2% marked for Grade 10',
  'Exam schedule published — Final Term',
];

function DashboardPreview() {
  const [actIdx, setActIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActIdx((i) => (i + 1) % ACTIVITIES.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-[#001C44]/20 border border-gray-100 bg-white">
      {/* Title bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#001C44]">
        <div className="flex items-center gap-2.5">
          <img src="/logo-no-background.png" alt="" className="w-5 h-5 object-contain brightness-0 invert opacity-70" />
          <span className="text-white/60 text-[.62rem] font-black uppercase tracking-widest">Sanothimi ERP — SchoolSathi</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-[.58rem] font-black uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-[#F8FAFC] border-b border-gray-100">
        {[
          { label: 'Students',     val: '1,247',   change: '↑ +12 today',  up: true },
          { label: 'Fee Collected', val: 'Rs. 8.4L', change: '↑ +5.2% MoM', up: true },
          { label: 'Attendance',   val: '98.2%',   change: '↑ +0.3%',      up: true },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
            <div className="text-[.55rem] font-black text-gray-400 uppercase tracking-wider mb-1.5">{k.label}</div>
            <div className="text-[1rem] font-serif font-bold text-[#001C44] leading-none mb-1.5">{k.val}</div>
            <div className={`text-[.6rem] font-bold ${k.up ? 'text-green-600' : 'text-red-500'}`}>{k.change}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[.6rem] font-black text-gray-400 uppercase tracking-wider">Fee Collection Trend</span>
          <span className="text-[.58rem] text-gray-300 font-medium">Last 6 months</span>
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
                  background: i === 5 ? '#EE2B47' : i === 4 ? '#001C44' : '#001C4425',
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
        <div className="w-1.5 h-1.5 rounded-full bg-[#EE2B47] animate-pulse flex-shrink-0" />
        <div className="overflow-hidden h-4 flex-1 relative">
          <motion.span
            key={actIdx}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute text-[.65rem] text-gray-400 font-medium whitespace-nowrap"
          >
            {ACTIVITIES[actIdx]}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const SOLUTIONS = [
  {
    num: '01', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    title: 'School ERP',      sub: 'SchoolSathi',         color: '#EE2B47',
    desc: 'End-to-end institution management from admissions to graduation.',
    feats: ['Student admissions & profiles', 'Automated fee collection', 'Attendance & exam management', 'Parent portal & communication'],
  },
  {
    num: '02', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    title: 'Financial Suite',  sub: 'FinanceCore',         color: '#2563EB',
    desc: 'Nepal-compliant accounting, VAT filing, and real-time financial visibility.',
    feats: ['Cloud-based ledger & accounts', 'VAT/GST auto-compliance', 'Multi-user access controls', 'Automated financial reports'],
  },
  {
    num: '03', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    title: 'Inventory Control', sub: 'StockMate',           color: '#059669',
    desc: 'Real-time stock visibility with barcode scanning and smart reordering.',
    feats: ['Real-time stock tracking', 'Barcode & QR scanning', 'Automated reorder alerts', 'Supplier & PO management'],
  },
  {
    num: '04', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'HR & Payroll',      sub: 'HRDesk',              color: '#D97706',
    desc: 'Complete workforce management from hiring to payroll processing.',
    feats: ['Automated payroll processing', 'Attendance & leave tracking', 'Recruitment pipeline', 'Performance management'],
  },
];

const STEPS = [
  { n: '01', title: 'Discovery Call',        icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',   desc: 'We map your workflows, integration needs, and institutional structure in a 30-minute consultation.' },
  { n: '02', title: 'Tailored Configuration', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', desc: 'Our engineers configure the system to your exact specifications — no generic templates.' },
  { n: '03', title: 'Go-Live & Support',     icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',                  desc: 'Staff training, data migration, and 24/7 support from day one. We stay until you\'re confident.' },
];

const USE_CASES = [
  { industry: 'Educational Institutions', icon: '🎓', color: '#EE2B47', bg: 'bg-red-50 border-red-100',
    items: ['Schools & colleges', 'Training academies', 'Coaching centres'], desc: 'SchoolSathi powers end-to-end administration for campuses of any size.' },
  { industry: 'Business Enterprises',     icon: '🏢', color: '#2563EB', bg: 'bg-blue-50 border-blue-100',
    items: ['Retail & distribution', 'Manufacturing', 'Service companies'],  desc: 'FinanceCore and StockMate bring real-time financial control to growing businesses.' },
  { industry: 'NGOs & Government',        icon: '🌏', color: '#059669', bg: 'bg-emerald-50 border-emerald-100',
    items: ['Non-profit organizations', 'Development agencies', 'Public institutions'], desc: 'Transparent reporting and compliance tools built for accountability.' },
];

const STATS = [
  { target: 99, suf: '.9%', label: 'Uptime SLA',          delay: 0 },
  { target: 50, suf: '+',   label: 'Institutions served',  delay: 150 },
  { target: 10, suf: 'K+',  label: 'Daily active users',   delay: 300 },
  { target: 5,  suf: '+',   label: 'Years of operation',   delay: 450 },
];

const DIFFERENTIATORS = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Nepal-Based & Compliant',  desc: 'Built specifically for Nepal\'s regulatory environment — VAT, NRB standards, and local workflows.' },
  { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', title: '24/7 Dedicated Support',     desc: 'A local team that answers within hours — not a global ticket queue. We know your name.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',                                                title: 'Custom Integration Ready', desc: 'Open API architecture connects with banking systems, government portals, and third-party tools.' },
  { icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', title: 'Cloud-Native & Secure',    desc: 'AES-256 encryption, daily backups, and 99.9% uptime. Your data never leaves Nepal.' },
];

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function Home() {
  const { t } = useLanguage();
  const counters = [
    useCounter(STATS[0].target, STATS[0].delay),
    useCounter(STATS[1].target, STATS[1].delay),
    useCounter(STATS[2].target, STATS[2].delay),
    useCounter(STATS[3].target, STATS[3].delay),
  ];

  return (
    <main className="bg-white overflow-hidden">

      {/* ══════════════════════════════════════════════════
          01 · HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative bg-[#001C44] overflow-hidden pt-28 pb-20 lg:pb-0 lg:pt-32 min-h-[90vh] flex items-center">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none opacity-60" />
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EE2B47]/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0A2ADB]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left: Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="pb-20 lg:pb-32"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/8 border border-white/12 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47] animate-pulse" />
              <span className="text-white/70 text-[.65rem] font-black uppercase tracking-[.3em]">Nepal's #1 Institutional ERP Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="font-serif text-[2.8rem] md:text-[3.8rem] lg:text-[4.2rem] text-white leading-[1.08] tracking-tight mb-6">
              Modernize Your<br />
              Institution.<br />
              <span className="italic text-[#EE2B47]">Command with Clarity.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              Sanothimi delivers enterprise-grade ERP for schools, businesses, and organizations across Nepal — from finance to HR to inventory, on a single cloud platform.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
              <Link
                href="/contact"
                className="group flex items-center gap-2.5 bg-[#EE2B47] text-white px-8 py-4 rounded-xl font-bold text-[.88rem] shadow-xl shadow-[#EE2B47]/25 hover:bg-white hover:text-[#EE2B47] transition-all duration-300"
              >
                Request Free Demo
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 text-white/50 font-semibold text-[.88rem] hover:text-white transition-colors"
              >
                Explore Solutions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/8">
              {[
                { val: '50+',   label: 'Institutions' },
                { val: '10K+',  label: 'Daily users' },
                { val: '99.9%', label: 'Uptime SLA' },
              ].map((s, i) => (
                <div key={s.label} className={`flex items-center gap-3 ${i > 0 ? 'pl-6 border-l border-white/10' : ''}`}>
                  <div className="text-[1.6rem] font-serif font-bold text-white leading-none">{s.val}</div>
                  <div className="text-white/30 text-[.72rem] font-medium leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="hidden lg:block relative"
          >
            {/* Floating "certified" badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute -top-4 -right-4 z-20 px-4 py-2.5 bg-[#D4AF37] rounded-2xl shadow-xl"
            >
              <div className="text-[.55rem] font-black uppercase tracking-widest text-[#001C44]">ISO 27001</div>
              <div className="text-[.58rem] font-bold text-[#001C44]/70">Certified Secure</div>
            </motion.div>

            <DashboardPreview />

            {/* Bottom floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute -bottom-5 -left-5 z-20 flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center border border-green-100">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <div className="text-[.72rem] font-bold text-[#001C44]">Data migrated successfully</div>
                <div className="text-[.6rem] text-gray-400">2 min ago · Auto-synced</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          02 · TRUST BAR
      ══════════════════════════════════════════════════ */}
      <section className="py-10 bg-[#F8FAFC] border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="text-[.65rem] font-black uppercase tracking-[.35em] text-gray-400 whitespace-nowrap flex-shrink-0">
              Trusted by
            </div>
            <div className="w-px h-6 bg-gray-200 hidden md:block" />
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 md:gap-10">
              {['Educational Institutions', 'Business Enterprises', 'NGOs & Non-profits', 'Government Bodies', 'Healthcare Organizations'].map((t) => (
                <span key={t} className="text-[.72rem] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{t}</span>
              ))}
            </div>
            <div className="md:ml-auto flex-shrink-0">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-[.62rem] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Nepal-based since 2019
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          03 · SOLUTIONS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl mb-16"
          >
            <motion.div variants={fadeUp} className="section-kicker mb-6">
              <span className="section-kicker-line" />Solutions
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15] mb-4">
              One platform.<br /><span className="italic text-[#EE2B47]">Every department covered.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#64748B] text-lg leading-relaxed">
              Modular ERP suites that connect — not siloed tools that create more work.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {SOLUTIONS.map((s) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,28,68,0.10)' }}
                transition={{ duration: 0.2 }}
                className="group bg-white border border-gray-100 rounded-2xl p-7 flex flex-col cursor-pointer"
                style={{ borderTopColor: s.color, borderTopWidth: 3 }}
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
                <div className="font-serif text-xl text-[#001C44] font-bold mb-1">{s.title}</div>
                <div className="text-[.62rem] font-black uppercase tracking-widest mb-4" style={{ color: s.color }}>{s.sub}</div>
                {/* Desc */}
                <p className="text-[#64748B] text-[.82rem] leading-relaxed mb-6">{s.desc}</p>
                {/* Feature list */}
                <ul className="space-y-2 mb-7 flex-1">
                  {s.feats.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[.78rem] text-[#374151]">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: s.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {/* CTA link */}
                <Link href="/services" className="flex items-center gap-1.5 text-[.75rem] font-bold transition-colors mt-auto"
                      style={{ color: s.color }}>
                  Learn more
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          04 · HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFC] border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="section-kicker justify-center mb-6">
              <span className="section-kicker-line" />Implementation Process<span className="section-kicker-line" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15]">
              Live in weeks, <span className="italic text-[#EE2B47]">not months</span>
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
                  <div className="w-full h-full rounded-full bg-white border-2 border-gray-100 shadow-md flex items-center justify-center group-hover:border-[#EE2B47] transition-all">
                    <svg className="w-7 h-7 text-[#001C44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#EE2B47] text-white text-[.6rem] font-black flex items-center justify-center shadow-md">
                    {step.n}
                  </div>
                </div>
                <h3 className="font-serif text-xl text-[#001C44] font-bold mb-3">{step.title}</h3>
                <p className="text-[#64748B] text-[.85rem] leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#001C44] text-white px-8 py-4 rounded-xl font-bold text-[.88rem] hover:bg-[#EE2B47] transition-all duration-300 shadow-lg">
              Book Your Free Consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          05 · STATS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#001C44] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none opacity-40" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#EE2B47]/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {counters.map((c, i) => (
              <div key={STATS[i].label} ref={c.ref} className="text-center group">
                <div className="flex items-baseline justify-center gap-0.5 mb-2">
                  <span className="text-5xl md:text-6xl font-serif font-bold text-white group-hover:text-[#EE2B47] transition-colors duration-400">
                    {c.val}
                  </span>
                  <span className="text-2xl font-serif text-[#EE2B47] font-bold">{STATS[i].suf}</span>
                </div>
                <div className="text-[.65rem] font-black uppercase tracking-[.3em] text-white/30">{STATS[i].label}</div>
                <div className="mt-4 mx-auto h-px w-6 bg-[#EE2B47]/30 group-hover:w-14 group-hover:bg-[#EE2B47] transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          06 · INDUSTRY USE CASES
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="section-kicker justify-center mb-6">
              <span className="section-kicker-line" />Who We Serve<span className="section-kicker-line" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15]">
              Built for your <span className="italic text-[#EE2B47]">industry</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {USE_CASES.map((u) => (
              <motion.div
                key={u.industry}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className={`p-8 rounded-2xl border ${u.bg} cursor-default`}
              >
                <div className="text-4xl mb-5">{u.icon}</div>
                <h3 className="font-serif text-xl text-[#001C44] font-bold mb-3">{u.industry}</h3>
                <p className="text-[#64748B] text-[.85rem] leading-relaxed mb-5">{u.desc}</p>
                <ul className="space-y-2">
                  {u.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[.8rem] font-medium text-[#374151]">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: u.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          07 · WHY CHOOSE SANOTHIMI
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFC] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl mb-16"
          >
            <motion.div variants={fadeUp} className="section-kicker mb-6">
              <span className="section-kicker-line" />Why Sanothimi
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15] mb-4">
              The enterprise standard,<br /><span className="italic text-[#EE2B47]">built for Nepal.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#64748B] text-lg leading-relaxed">
              Global ERP expertise. Local knowledge. Personal service.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {DIFFERENTIATORS.map((d) => (
              <motion.div
                key={d.title}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: '#EE2B47' }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-gray-100 rounded-2xl p-7 flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-[#001C44] flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={d.icon} />
                  </svg>
                </div>
                <h4 className="font-serif text-[1.05rem] font-bold text-[#001C44] mb-3">{d.title}</h4>
                <p className="text-[#64748B] text-[.82rem] leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          08 · TESTIMONIAL
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="font-serif text-[5rem] text-[#EE2B47] opacity-15 leading-none mb-2 select-none">&ldquo;</div>
            <blockquote className="font-serif text-2xl md:text-3xl text-[#001C44] leading-snug italic -mt-10 mb-10">
              SchoolSathi transformed how we manage 1,200 students. Fee collection that used to take our staff two weeks now runs automatically. It paid for itself in the first month.
            </blockquote>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#001C44] flex items-center justify-center text-white font-bold text-base border-2 border-[#D4AF37]">
                SM
              </div>
              <div>
                <div className="font-bold text-[#001C44] text-sm">Sarah Mitchell</div>
                <div className="text-xs text-[#64748B]">Principal · BrightPath Academy, Kathmandu</div>
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
      <section className="py-20 bg-[#001C44] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none opacity-40" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#EE2B47]/7 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            <div>
              <motion.div variants={fadeUp} className="text-[.62rem] font-black uppercase tracking-[.4em] text-[#EE2B47] mb-4">Transparent Pricing</motion.div>
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-white leading-tight mb-3">
                Starts at <span className="text-[#EE2B47]">Rs. 2,999</span>/month
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/40 text-[.92rem]">
                No hidden fees. Cancel anytime. Free 30-day demo included.
              </motion.p>
            </div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 flex-shrink-0">
              <Link href="/pricing" className="flex items-center gap-2 bg-white text-[#001C44] px-8 py-4 rounded-xl font-bold text-[.88rem] hover:bg-[#F1F5F9] transition-all shadow-lg">
                View Full Pricing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/contact" className="flex items-center gap-2 bg-[#EE2B47] text-white px-8 py-4 rounded-xl font-bold text-[.88rem] hover:bg-white hover:text-[#EE2B47] transition-all shadow-lg shadow-[#EE2B47]/20">
                Book Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title={'Ready to modernize\nyour institution?'}
        sub="Join 50+ institutions across Nepal running on Sanothimi ERP."
        cta="Get Started Today"
        ctaHref="/contact"
      />
    </main>
  );
}
