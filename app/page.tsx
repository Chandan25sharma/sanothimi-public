'use client';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Scroll-reveal ─── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll('.rs').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── Animated counter ─── */
function useCounter(target: number, delay = 0) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          const step = target / (2000 / 16);
          let v = 0;
          const id = setInterval(() => { v = Math.min(v + step, target); setVal(Math.floor(v)); if (v >= target) clearInterval(id); }, 16);
        }, delay);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, delay]);
  return { ref, val };
}

/* ─── Live Dashboard Preview ─── */
const ACTIVITY_FEED = [
  'New student enrolled: Aarav Sharma • Grade 8',
  'Fee payment received: Rs. 15,000 • Ram Academy',
  'Exam schedule updated: Grade 10 • Final Term',
  'Staff payroll processed: March 2025 • 48 employees',
  'Low stock alert: Notebooks • Inventory Module',
  'Monthly report generated: Financial Summary',
  'Parent portal login: Sunita Thapa • 2:34 PM',
  'Attendance marked: 98.2% present today',
];

type ModuleKey = 'school' | 'finance' | 'inventory' | 'hr';

function LiveDashboard({ activeModule }: { activeModule: ModuleKey }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2800);
    return () => clearInterval(id);
  }, []);

  const activity = ACTIVITY_FEED[tick % ACTIVITY_FEED.length];

  const KPI: Record<ModuleKey, { label: string; val: string; change: string; up: boolean }[]> = {
    school:    [{ label: 'Total Students', val: '1,247', change: '+12 this week', up: true }, { label: 'Fee Collected', val: 'Rs. 8.4L', change: '+5.2% MoM', up: true }, { label: 'Pending Dues', val: 'Rs. 1.2L', change: '-8% cleared', up: false }],
    finance:   [{ label: 'Total Revenue', val: 'Rs. 42.1L', change: '+18.3% YoY', up: true }, { label: 'Expenses', val: 'Rs. 28.6L', change: 'Within budget', up: true }, { label: 'Net Profit', val: 'Rs. 13.5L', change: '+22% vs Q3', up: true }],
    inventory: [{ label: 'Total SKUs', val: '3,842', change: '48 added today', up: true }, { label: 'Low Stock', val: '12 items', change: 'Reorder now', up: false }, { label: 'Warehouse Value', val: 'Rs. 94.7L', change: '+3.1% this wk', up: true }],
    hr:        [{ label: 'Total Staff', val: '148', change: '3 new joins', up: true }, { label: 'Payroll Cost', val: 'Rs. 18.2L', change: 'March processed', up: true }, { label: 'Leave Requests', val: '7 pending', change: '2 approved today', up: false }],
  };

  const BAR_DATA: Record<ModuleKey, number[]> = {
    school:    [60, 72, 55, 80, 74, 92],
    finance:   [50, 63, 78, 60, 85, 91],
    inventory: [82, 67, 74, 56, 88, 79],
    hr:        [45, 58, 72, 65, 80, 76],
  };

  const BAR_LABELS: Record<ModuleKey, string[]> = {
    school:    ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    finance:   ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    inventory: ['W40', 'W42', 'W44', 'W46', 'W48', 'W50'],
    hr:        ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  };

  const CHART_LABEL: Record<ModuleKey, string> = {
    school: 'Fee Collection Trend', finance: 'Revenue vs Target', inventory: 'Stock Movement', hr: 'Headcount Growth',
  };

  return (
    <div className="bg-[#040D1C] rounded-2xl border border-white/8 overflow-hidden shadow-2xl shadow-black/50 text-left select-none">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-[#050E1E]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#EE2B47]/15 flex items-center justify-center">
            <img src="/logo-no-background.png" alt="" className="w-4 h-4 object-contain brightness-0 invert opacity-60" />
          </div>
          <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Sanothimi ERP</span>
          <span className="px-2 py-0.5 bg-[#EE2B47]/10 border border-[#EE2B47]/20 rounded-full text-[9px] font-black uppercase tracking-widest text-[#EE2B47]">
            {activeModule === 'school' ? 'SchoolSathi' : activeModule === 'finance' ? 'FinanceCore' : activeModule === 'inventory' ? 'StockMate' : 'HRDesk'}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-bold text-green-400">Live</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#EE2B47]/15 flex items-center justify-center text-white/35 text-[9px] font-bold">AS</div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-px bg-white/4 border-b border-white/6">
        {KPI[activeModule].map((k) => (
          <div key={k.label} className="bg-[#040D1C] px-4 py-4">
            <div className="text-[8px] font-black uppercase tracking-widest text-white/25 mb-2">{k.label}</div>
            <div className="text-base font-serif font-bold text-white mb-1.5 leading-none">{k.val}</div>
            <div className={`text-[9px] font-bold ${k.up ? 'text-green-400' : 'text-[#EE2B47]'}`}>{k.change}</div>
          </div>
        ))}
      </div>

      {/* Chart + side panel */}
      <div className="grid grid-cols-[1fr_auto] gap-px bg-white/4">
        {/* Chart */}
        <div className="bg-[#040D1C] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[9px] font-black uppercase tracking-widest text-white/25">{CHART_LABEL[activeModule]}</div>
            <div className="text-[9px] font-bold text-white/15">Last 6 periods</div>
          </div>
          <div className="flex items-end gap-1.5 h-20">
            {BAR_DATA[activeModule].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm transition-all duration-700"
                  style={{
                    height: `${h}%`,
                    background: i === BAR_DATA[activeModule].length - 1
                      ? 'linear-gradient(to top, #EE2B47, #FF6B8B)'
                      : 'linear-gradient(to top, rgba(238,43,71,0.4), rgba(238,43,71,0.15))',
                  }}
                />
                <div className="text-[7px] text-white/15">{BAR_LABELS[activeModule][i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Side mini-panel */}
        <div className="bg-[#040D1C] w-24 p-4 border-l border-white/4 flex flex-col gap-3">
          <div className="text-[7.5px] font-black uppercase tracking-widest text-white/20 mb-1">Status</div>
          {[{ label: 'API', ok: true }, { label: 'DB', ok: true }, { label: 'Sync', ok: true }].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${s.ok ? 'bg-green-400' : 'bg-[#EE2B47]'} animate-pulse`} />
              <span className="text-[8px] text-white/30 font-bold">{s.label}</span>
            </div>
          ))}
          <div className="mt-auto">
            <div className="text-[7.5px] font-black uppercase tracking-widest text-white/20 mb-2">Users</div>
            <div className="text-lg font-serif font-bold text-white">47</div>
            <div className="text-[7px] text-white/20">online now</div>
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div className="px-5 py-4 border-t border-white/5 bg-[#050E1E]">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#EE2B47] animate-pulse flex-shrink-0" />
          <span className="text-white/35 text-[10px] font-medium truncate">{activity}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Module tabs ─── */
const MODULES = [
  { key: 'school' as ModuleKey,    label: 'School ERP',   icon: 'M12 14l9-5-9-5-9 5 9 5zm-4 6v-7.5l4-2.222', color: '#EE2B47' },
  { key: 'finance' as ModuleKey,   label: 'Finance',      icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', color: '#3B82F6' },
  { key: 'inventory' as ModuleKey, label: 'Inventory',    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: '#10B981' },
  { key: 'hr' as ModuleKey,        label: 'HR & Payroll', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color: '#F59E0B' },
];

const SVC_GRID = [
  { num: '01', title: 'School ERP',             icon: 'M12 14l9-5-9-5-9 5 9 5zm-4 6v-7.5l4-2.222',                                                                       feats: ['Admissions & Enrollment', 'Fee Management', 'Exam & Results', 'Parent Portal'] },
  { num: '02', title: 'Financial Suite',         icon: 'M9 7h6m0 10v-3m-3 3h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', feats: ['VAT Compliance', 'Cloud Ledger', 'Automated Reports', 'Multi-User Control'] },
  { num: '03', title: 'Inventory Control',       icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',                                               feats: ['Real-time Tracking', 'Barcode System', 'Auto Reordering', 'Stock Analytics'] },
  { num: '04', title: 'Business Intelligence',   icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',  feats: ['KPI Dashboards', 'Trend Analysis', 'Custom Reports', 'Forecasting'] },
  { num: '05', title: 'Payroll & HR',            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', feats: ['Automated Payroll', 'Attendance Tracking', 'Leave Management', 'Performance Reviews'] },
  { num: '06', title: 'Custom Development',      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',                                                                           feats: ['API Integration', 'Web Applications', 'Legacy Migration', '24/7 Support'] },
];

const LOGOS = ['AWS', 'ISO 27001', 'Google Cloud', 'SSL Verified', 'GDPR Ready'];

const STATS = [
  { target: 99, suf: '%',  label: 'Uptime SLA',           delay: 0 },
  { target: 10, suf: 'K+', label: 'Daily Active Users',    delay: 200 },
  { target: 50, suf: '+',  label: 'Institutions Served',   delay: 400 },
  { target: 5,  suf: '+',  label: 'Years of Operation',    delay: 600 },
];

const PROBLEMS = [
  { icon: '⏳', title: 'Manual & Time-Consuming',   desc: 'Hours lost every day managing fees, attendance, and reports through spreadsheets.' },
  { icon: '❌', title: 'Error-Prone Data Entry',    desc: 'Human errors in financial records, payroll, and student data cause compliance risks.' },
  { icon: '🔒', title: 'No Centralized Visibility', desc: 'Decision-makers have no real-time view of institutional performance or financial health.' },
];

export default function Home() {
  const { t } = useLanguage();
  const sHero     = useReveal();
  const sProblems = useReveal();
  const sModules  = useReveal();
  const sProcess  = useReveal();
  const sWhy      = useReveal();

  const [activeModule, setActiveModule] = useState<ModuleKey>('school');
  const c0 = useCounter(STATS[0].target, STATS[0].delay);
  const c1 = useCounter(STATS[1].target, STATS[1].delay);
  const c2 = useCounter(STATS[2].target, STATS[2].delay);
  const c3 = useCounter(STATS[3].target, STATS[3].delay);
  const counters = [c0, c1, c2, c3];

  return (
    <main className="overflow-hidden">

      {/* ═══════════════════════════════════════════════
          01. HERO — Dark cinematic with live dashboard
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-24 bg-[#000E22] overflow-hidden">

        {/* Background layer */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute inset-0 bg-[#000E22]" />
          <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px] -translate-y-1/2 bg-[#EE2B47]/6 rounded-full blur-[140px] glow-orb" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#001C44]/80 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-pattern-dark" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT: Brand story */}
          <div ref={sHero as React.RefObject<HTMLDivElement>} className="flex flex-col items-start">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#EE2B47]/10 border border-[#EE2B47]/20 rounded-full mb-10 backdrop-blur-sm">
              <span className="live-dot live-dot-red" />
              <span className="text-[#EE2B47] text-[.62rem] font-black uppercase tracking-[.3em]">
                Nepal&apos;s #1 Institutional ERP
              </span>
            </div>

            <h1 className="font-serif text-[3.5rem] md:text-[5.5rem] text-white leading-[0.95] mb-8 tracking-tighter">
              {t('home.hero.title1')}<br />
              <span className="italic text-[#EE2B47]">{t('home.hero.title2')}</span><br />
              {t('home.hero.title3')}
            </h1>

            <p className="text-white/40 text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
              {t('home.hero.desc')}
            </p>

            <div className="flex flex-wrap gap-5 items-center mb-14">
              <Link
                href="/contact"
                className="group relative overflow-hidden bg-[#EE2B47] text-white px-10 py-4 rounded-full font-bold text-base shadow-2xl shadow-[#EE2B47]/25 hover:bg-white hover:text-[#EE2B47] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {t('home.hero.cta')}
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 text-white/50 font-bold text-sm hover:text-white transition-colors"
              >
                View Pricing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            {/* Social proof avatars */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/4 border border-white/6 backdrop-blur-sm">
              <div className="flex -space-x-2.5">
                {['AS', 'RK', 'MT', 'SD'].map((init) => (
                  <div key={init} className="w-9 h-9 rounded-full border-2 border-[#000E22] bg-gradient-to-br from-[#EE2B47]/30 to-[#001C44] flex items-center justify-center text-[10px] font-bold text-white">
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white text-[.8rem] font-bold">50+ institutions trust us</div>
                <div className="text-white/30 text-[.68rem] font-medium">Across Nepal since 2019</div>
              </div>
            </div>

            {/* Cmd+K hint */}
            <div className="mt-6 flex items-center gap-2 text-white/20 text-[.68rem] font-medium">
              <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[.6rem] font-black">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[.6rem] font-black">K</kbd>
              <span>to search modules & pages</span>
            </div>
          </div>

          {/* RIGHT: Live dashboard preview */}
          <div className="hidden lg:block relative">
            {/* Module tabs */}
            <div className="flex gap-2 mb-4">
              {MODULES.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setActiveModule(m.key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[.68rem] font-black uppercase tracking-wider transition-all duration-300 ${
                    activeModule === m.key
                      ? 'bg-[#EE2B47] text-white shadow-lg shadow-[#EE2B47]/25'
                      : 'bg-white/5 text-white/35 hover:bg-white/8 hover:text-white/60'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                  </svg>
                  {m.label}
                </button>
              ))}
            </div>
            <LiveDashboard activeModule={activeModule} />
            {/* Floating glow */}
            <div className="absolute -inset-10 bg-[#EE2B47]/4 rounded-3xl blur-3xl -z-10" />
          </div>
        </div>

        {/* Enterprise logos strip */}
        <div className="absolute bottom-0 left-0 w-full z-20 py-8 border-t border-white/4 bg-gradient-to-t from-[#000E22]/80 to-transparent backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-8 md:gap-16 justify-center flex-wrap opacity-25 hover:opacity-40 transition-opacity duration-700 grayscale">
              <span className="text-white text-[.6rem] font-black uppercase tracking-[.5em] border-r border-white/20 pr-8">Enterprise Grade</span>
              {LOGOS.map((l) => (
                <span key={l} className="text-white text-[.6rem] font-black tracking-[.4em] uppercase">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          02. THE PROBLEM — Pain points (dark minimal)
      ═══════════════════════════════════════════════ */}
      <section ref={sProblems as React.RefObject<HTMLDivElement>} className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="rs section-kicker justify-center mb-8">
              <span className="section-kicker-line" />The Problem
              <span className="section-kicker-line" />
            </div>
            <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.2]">
              Why traditional management <span className="italic text-[#EE2B47]">fails institutions</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {PROBLEMS.map((p, i) => (
              <div key={p.title} className={`rs d${i + 1} group p-10 rounded-[2.5rem] border border-gray-100 bg-[#F9FAFB] hover:bg-[#001C44] hover:border-[#001C44] transition-all duration-600 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#001C44]/20`}>
                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
                <h3 className="font-serif text-xl text-[#001C44] mb-4 group-hover:text-white transition-colors">{p.title}</h3>
                <p className="text-[#64748B] text-[.9rem] leading-relaxed group-hover:text-white/55 transition-colors">{p.desc}</p>
              </div>
            ))}
          </div>
          {/* Arrow to solution */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 text-[#EE2B47]">
              <span className="text-[.7rem] font-black uppercase tracking-[.3em]">Sanothimi solves this</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          03. PRODUCT SHOWCASE — Interactive module demo
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#000E22] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EE2B47]/5 rounded-full blur-[160px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-kicker justify-center mb-8" style={{ color: '#EE2B47' }}>
              <span className="section-kicker-line" />Product Demo
              <span className="section-kicker-line" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-6 tracking-tight">
              See your ERP <span className="italic text-[#EE2B47]">in action</span>
            </h2>
            <p className="text-white/35 text-lg max-w-2xl mx-auto">
              Switch between modules to see how Sanothimi adapts to every department of your institution.
            </p>
          </div>

          {/* Module switcher tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {MODULES.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveModule(m.key)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full text-[.8rem] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeModule === m.key
                    ? 'bg-[#EE2B47] text-white shadow-xl shadow-[#EE2B47]/25'
                    : 'bg-white/5 border border-white/10 text-white/40 hover:border-white/20 hover:text-white/70'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                </svg>
                {m.label}
              </button>
            ))}
          </div>

          {/* Full-width dashboard */}
          <div className="max-w-4xl mx-auto">
            <LiveDashboard activeModule={activeModule} />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          04. MODULES GRID — 6 cards
      ═══════════════════════════════════════════════ */}
      <section ref={sModules as React.RefObject<HTMLDivElement>} className="py-32 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <div className="rs section-kicker mb-8">
              <span className="section-kicker-line" />{t('home.suite.kicker')}
            </div>
            <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15] mb-6">
              {t('home.suite.title1')}<br />
              <span className="italic text-[#EE2B47]">{t('home.suite.title2')}</span>
            </h2>
            <p className="rs d2 text-[#64748B] text-lg leading-relaxed max-w-2xl">
              {t('home.suite.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SVC_GRID.map((s, i) => (
              <div
                key={s.num}
                className={`rs d${(i % 3) + 1} group relative svc-premium flex flex-col h-full`}
              >
                {/* Number watermark */}
                <div className="absolute top-6 right-6 font-serif text-6xl font-bold text-gray-50 leading-none select-none pointer-events-none group-hover:text-[#EE2B47]/5 transition-colors">
                  {s.num}
                </div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#F9FAFB] group-hover:bg-[#EE2B47] flex items-center justify-center text-[#001C44] group-hover:text-white mb-8 transition-all duration-500 relative z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-[#001C44] mb-4 relative z-10">{s.title}</h3>
                <ul className="space-y-2.5 mb-8 relative z-10 flex-1">
                  {s.feats.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[#64748B] text-[.82rem] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47]/50 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="relative z-10 mt-auto inline-flex items-center gap-2 text-[#001C44] text-[.8rem] font-black uppercase tracking-widest hover:text-[#EE2B47] transition-colors group/link"
                >
                  Learn more
                  <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 bg-[#001C44] text-white px-10 py-4 rounded-full font-bold hover:bg-[#EE2B47] transition-all duration-500 shadow-lg"
            >
              Explore all modules
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          05. HOW IT WORKS — 3 steps
      ═══════════════════════════════════════════════ */}
      <section ref={sProcess as React.RefObject<HTMLDivElement>} className="py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="rs section-kicker justify-center mb-8">
              <span className="section-kicker-line" />How it works
              <span className="section-kicker-line" />
            </div>
            <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.2]">
              From demo to <span className="italic text-[#EE2B47]">fully live</span> in weeks
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Connector on desktop */}
            <div className="hidden md:block absolute top-16 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-[#EE2B47]/30 via-[#EE2B47]/15 to-[#EE2B47]/30" />

            {[
              { step: '01', title: 'Discovery Call',     desc: 'We map your institutional workflows, pain points, and integration requirements.', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
              { step: '02', title: 'Live Demonstration', desc: 'Experience a fully configured demo tailored to your exact institutional structure.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { step: '03', title: 'Deployment & Go-live', desc: 'Full data migration, staff training, and 24/7 support to ensure a smooth launch.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((step, i) => (
              <div key={step.step} className={`rs d${i + 1} group text-center`}>
                {/* Circle with step number */}
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="w-full h-full rounded-full bg-[#F9FAFB] border-2 border-gray-100 group-hover:bg-[#EE2B47] group-hover:border-[#EE2B47] transition-all duration-500 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-[#001C44] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#EE2B47] text-white text-[10px] font-black flex items-center justify-center shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[#001C44] mb-4">{step.title}</h3>
                <p className="text-[#64748B] text-[.9rem] leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/contact" className="btn btn-fill">Book Your Free Demo →</Link>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          06. STATS — Animated counters
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#001C44] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#EE2B47]/6 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {counters.map((c, i) => (
              <div key={STATS[i].label} ref={c.ref} className="group text-center">
                <div className="text-5xl md:text-6xl font-serif font-bold text-white mb-2 flex items-baseline justify-center gap-1 group-hover:text-[#EE2B47] transition-colors duration-500">
                  {c.val}<span className="text-2xl text-[#EE2B47]">{STATS[i].suf}</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-black">{STATS[i].label}</div>
                <div className="mt-4 h-px w-8 bg-[#EE2B47]/30 group-hover:w-16 group-hover:bg-[#EE2B47] transition-all duration-700 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          07. WHY CHOOSE — 4 value cards
      ═══════════════════════════════════════════════ */}
      <section ref={sWhy as React.RefObject<HTMLDivElement>} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <div className="section-kicker mb-8">
              <span className="section-kicker-line" />{t('home.why.kicker')}
            </div>
            <h2 className="rs font-serif text-4xl md:text-5xl text-[#001C44] leading-[1.15] mb-6">
              {t('home.why.title1')}<br /><span className="text-[#EE2B47] italic">{t('home.why.title2')}</span>
            </h2>
            <p className="rs d1 text-[#64748B] leading-relaxed text-lg max-w-2xl">{t('home.why.desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {([1, 2, 3, 4] as const).map((id, i) => (
              <div key={id} className={`rs d${i + 2} group p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:bg-[#001C44] hover:border-[#001C44] transition-all duration-700 hover:-translate-y-5 shadow-sm hover:shadow-2xl hover:shadow-[#EE2B47]/15 flex flex-col items-start h-full grad-border`}>
                <div className="w-14 h-14 rounded-2xl bg-[#F9FAFB] group-hover:bg-[#EE2B47] flex items-center justify-center text-[#001C44] group-hover:text-white mb-10 transition-all duration-500">
                  {id === 1 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
                  {id === 2 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>}
                  {id === 3 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M15 15l5 5m0 0l-5 5m5-5H3m12-9l5 5m0 0l-5 5m5-5H3" /></svg>}
                  {id === 4 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                </div>
                <h4 className="font-serif font-bold text-[#001C44] text-[1.15rem] mb-5 group-hover:text-white transition-colors">
                  {t(`about.why.${id}.title` as 'about.why.1.title')}
                </h4>
                <p className="text-[#64748B] text-[.85rem] leading-relaxed group-hover:text-white/55 transition-colors">
                  {t(`about.why.${id}.desc` as 'about.why.1.desc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          08. TESTIMONIAL
      ═══════════════════════════════════════════════ */}
      <section className="py-32 bg-[#F9FAFB] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="font-serif text-[7rem] text-[#EE2B47] opacity-10 leading-none mb-4 select-none">&ldquo;</div>
          <blockquote className="font-serif text-2xl md:text-3xl text-[#001C44] leading-snug mb-12 italic -mt-14">
            The SchoolSathi platform completely transformed our administrative workflow. We saved 15+ hours a week on fee collections alone — and our parents love the portal.
          </blockquote>
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#001C44] flex items-center justify-center text-white font-bold text-lg border-2 border-[#D4AF37]">
              SM
            </div>
            <div>
              <div className="font-bold text-[#001C44] text-sm">Sarah Mitchell</div>
              <div className="text-xs text-[#64748B]">Principal, BrightPath Academy — Kathmandu</div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          09. PRICING PREVIEW
      ═══════════════════════════════════════════════ */}
      <section className="py-32 bg-[#000E22] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#EE2B47]/5 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="section-kicker justify-center mb-8" style={{ color: '#EE2B47' }}>
              <span className="section-kicker-line" />Simple Pricing
              <span className="section-kicker-line" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.2] mb-4">
              Start free, <span className="italic text-[#EE2B47]">scale as you grow</span>
            </h2>
            <p className="text-white/35 text-lg">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { tier: 'Basic',    price: '2,999', tag: 'For small schools',   popular: false, feats: ['Up to 200 students', 'School ERP Module', 'Email Support', 'Basic Reports'] },
              { tier: 'Standard', price: '5,999', tag: 'Most popular',        popular: true,  feats: ['Up to 1,000 students', 'All Core Modules', 'Priority Support', 'Advanced Analytics', 'Custom Reports'] },
              { tier: 'Premium',  price: '9,999', tag: 'For enterprises',     popular: false, feats: ['Unlimited users', 'All Modules + Custom', 'Dedicated Manager', 'On-site Training', 'SLA Guarantee', 'API Access'] },
            ].map((plan) => (
              <div
                key={plan.tier}
                className={`relative rounded-[2rem] p-8 transition-all duration-500 ${
                  plan.popular
                    ? 'bg-[#EE2B47] shadow-2xl shadow-[#EE2B47]/30 scale-105'
                    : 'bg-white/5 border border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-[#D4AF37] rounded-full text-[10px] font-black uppercase tracking-widest text-[#001C44] shadow-lg whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className={`text-[.65rem] font-black uppercase tracking-[.3em] mb-4 ${plan.popular ? 'text-white/70' : 'text-white/30'}`}>
                  {plan.tag}
                </div>
                <div className={`font-serif text-3xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-white'}`}>
                  {plan.tier}
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`text-sm font-bold ${plan.popular ? 'text-white/70' : 'text-white/30'}`}>Rs.</span>
                  <span className={`text-4xl font-serif font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>{plan.price}</span>
                  <span className={`text-sm font-medium ${plan.popular ? 'text-white/60' : 'text-white/25'}`}>/mo</span>
                </div>
                <ul className="space-y-3 mb-10">
                  {plan.feats.map((f) => (
                    <li key={f} className={`flex items-center gap-3 text-[.82rem] font-medium ${plan.popular ? 'text-white/90' : 'text-white/45'}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-[#EE2B47]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={`block text-center py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white text-[#EE2B47] hover:bg-[#001C44] hover:text-white'
                      : 'bg-white/8 border border-white/15 text-white hover:bg-white/15'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/pricing" className="text-white/35 text-sm font-bold hover:text-white transition-colors">
              Compare all features →
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        title={'Start Your Digital Journey\nwith Sanothimi'}
        sub="Let's transform your institutional efficiency together."
        cta="Get Started"
      />
    </main>
  );
}
