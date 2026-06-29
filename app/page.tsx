'use client';
import DataNetworkBg from '@/components/DataNetworkBg';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════════════ */
type ModuleKey = 'school' | 'finance' | 'inventory' | 'hr';
type NodeStatus = 'done' | 'active' | 'pending';
type Phase = 'boot' | 'live';

interface WorkflowNode {
  id: string;
  label: string;
  detail: string;
  sub: string;
  status: NodeStatus;
  icon: string;
}

/* ═══════════════════════════════════════════════════════════════════════
   BOOT LINES
═══════════════════════════════════════════════════════════════════════ */
const BOOT_LINES = [
  '> Sanothimi ERP v4.2.1 — Initializing system...',
  '> SchoolSathi module............... ONLINE ✓',
  '> FinanceCore module............... ONLINE ✓',
  '> Inventory (StockMate)............ ONLINE ✓',
  '> HR & Payroll (HRDesk)............ ONLINE ✓',
  '> Secure TLS connection established',
  '> 47 administrators connected',
  '> All systems operational. Welcome.',
];

/* ═══════════════════════════════════════════════════════════════════════
   MODULE DATA
═══════════════════════════════════════════════════════════════════════ */
const MODULES = {
  school: {
    name: 'SchoolSathi',
    tag: 'School ERP',
    color: '#EE2B47',
    dimColor: 'rgba(238,43,71,0.12)',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    kpis: [
      { label: 'Students', baseVal: 1247, suf: '', prefix: '', change: '+12 today', up: true },
      { label: 'Attendance', baseVal: 98, suf: '%', prefix: '', change: '+0.3%', up: true },
      { label: 'Fee Collected', baseVal: 8, suf: '.4L', prefix: 'Rs. ', change: '+5.2% MoM', up: true },
    ],
    workflow: [
      { id: 'enroll', label: 'Enrollment', status: 'done' as NodeStatus, icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', detail: 'Student admitted successfully', sub: 'Aarav Sharma • Grade 8' },
      { id: 'attend', label: 'Attendance', status: 'done' as NodeStatus, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2', detail: '98.2% present today', sub: '1,223 of 1,247 students' },
      { id: 'exam', label: 'Examination', status: 'active' as NodeStatus, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', detail: 'Grade 10 Final Term exam', sub: 'Scheduled in 3 days' },
      { id: 'result', label: 'Results', status: 'pending' as NodeStatus, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2', detail: 'Awaiting exam completion', sub: 'Auto-generated on submit' },
      { id: 'cert', label: 'Certificate', status: 'pending' as NodeStatus, icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138', detail: 'Digital certificate issuance', sub: 'PDF + Portal delivery' },
    ] as WorkflowNode[],
    activity: [
      'Fee received: Rs. 15,000 — Aarav Sharma',
      'Attendance marked: 98.2% present today',
      'Exam schedule published: Grade 10 Finals',
      'Parent portal: 23 active sessions',
      'New enrollment: Priya Thapa, Grade 6',
      'Report card generated: Term 2',
    ],
  },
  finance: {
    name: 'FinanceCore',
    tag: 'Financial Suite',
    color: '#3B82F6',
    dimColor: 'rgba(59,130,246,0.12)',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    kpis: [
      { label: 'Revenue', baseVal: 42, suf: '.1L', prefix: 'Rs. ', change: '+18.3% YoY', up: true },
      { label: 'Net Profit', baseVal: 13, suf: '.5L', prefix: 'Rs. ', change: '+22% vs Q3', up: true },
      { label: 'Tax Filed', baseVal: 100, suf: '%', prefix: '', change: 'VAT compliant', up: true },
    ],
    workflow: [
      { id: 'invoice', label: 'Invoice', status: 'done' as NodeStatus, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', detail: 'Invoice created: INV-0341', sub: 'Rs. 45,000 • Mar 2025' },
      { id: 'verify', label: 'Verify', status: 'done' as NodeStatus, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2', detail: 'GST & VAT verified', sub: 'Finance team approved' },
      { id: 'approve', label: 'Approve', status: 'active' as NodeStatus, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2', detail: 'Awaiting CFO approval', sub: 'Pending: 2h 14m' },
      { id: 'pay', label: 'Payment', status: 'pending' as NodeStatus, icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', detail: 'Bank transfer scheduled', sub: 'Rs. 45,000' },
      { id: 'receipt', label: 'Receipt', status: 'pending' as NodeStatus, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2', detail: 'Digital receipt', sub: 'PDF + Email delivery' },
    ] as WorkflowNode[],
    activity: [
      'Invoice #341 raised: Rs. 45,000',
      'VAT return filed: Q1 2025 complete',
      'Budget review: +2.1% under plan',
      'Payroll processed: March 2025',
      'Bank reconciliation: All clear',
      'Tax advisory: Meeting scheduled',
    ],
  },
  inventory: {
    name: 'StockMate',
    tag: 'Inventory Control',
    color: '#10B981',
    dimColor: 'rgba(16,185,129,0.12)',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    kpis: [
      { label: 'Total SKUs', baseVal: 3842, suf: '', prefix: '', change: '+48 this week', up: true },
      { label: 'Low Stock', baseVal: 12, suf: ' items', prefix: '', change: 'Reorder now!', up: false },
      { label: 'Stock Value', baseVal: 94, suf: '.7L', prefix: 'Rs. ', change: '+3.1% WoW', up: true },
    ],
    workflow: [
      { id: 'order', label: 'Order', status: 'done' as NodeStatus, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2', detail: 'PO-2025-891 created', sub: '200 units — Textbooks' },
      { id: 'receive', label: 'Received', status: 'done' as NodeStatus, icon: 'M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586', detail: '198 units accepted', sub: 'Warehouse A • 2 rejected' },
      { id: 'store', label: 'Stored', status: 'active' as NodeStatus, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10', detail: 'Shelving in progress', sub: 'Shelf B-14 • Barcode: active' },
      { id: 'pick', label: 'Pick', status: 'pending' as NodeStatus, icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', detail: 'Grade 10 book order', sub: 'Priority: High' },
      { id: 'dispatch', label: 'Dispatch', status: 'pending' as NodeStatus, icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586', detail: 'Classroom delivery', sub: 'Logistics team assigned' },
    ] as WorkflowNode[],
    activity: [
      'Low stock alert: Notebooks — 8 remaining',
      'PO received: 200 textbooks from supplier',
      'Barcode scan: SKU-4521 picked',
      'Stock count complete: Warehouse A',
      'Supplier added: Paper Co. Nepal',
      'Auto-reorder triggered: Pens (SKU-102)',
    ],
  },
  hr: {
    name: 'HRDesk',
    tag: 'HR & Payroll',
    color: '#F59E0B',
    dimColor: 'rgba(245,158,11,0.12)',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    kpis: [
      { label: 'Total Staff', baseVal: 148, suf: '', prefix: '', change: '+3 new joins', up: true },
      { label: 'Payroll', baseVal: 18, suf: '.2L', prefix: 'Rs. ', change: 'March done', up: true },
      { label: 'Leave Pending', baseVal: 7, suf: '', prefix: '', change: '2 approved', up: false },
    ],
    workflow: [
      { id: 'apply', label: 'Application', status: 'done' as NodeStatus, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', detail: 'Application received', sub: 'Ravi Joshi — Sr. Teacher' },
      { id: 'screen', label: 'Screening', status: 'done' as NodeStatus, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2', detail: 'CV reviewed & shortlisted', sub: '8 years experience' },
      { id: 'interview', label: 'Interview', status: 'active' as NodeStatus, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', detail: 'Panel interview in progress', sub: 'Today 3:00 PM' },
      { id: 'offer', label: 'Offer', status: 'pending' as NodeStatus, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586', detail: 'Offer letter pending', sub: 'Rs. 45,000/month' },
      { id: 'onboard', label: 'Onboard', status: 'pending' as NodeStatus, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', detail: 'IT & HR setup planned', sub: 'April 1, 2025 start' },
    ] as WorkflowNode[],
    activity: [
      'Payroll processed: 148 employees',
      'Leave approved: Sunita Thapa (2 days)',
      'Interview scheduled: Ravi Joshi 3PM',
      'New policy issued: Work from home',
      'Attendance sync: March summary',
      'Performance review cycle: Opened',
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   SYSTEM NOTIFICATIONS
═══════════════════════════════════════════════════════════════════════ */
const GLOBAL_ALERTS = [
  { module: 'school',    text: 'Fee deadline: 47 students pending',  type: 'warn' },
  { module: 'finance',   text: 'Invoice #341 awaiting CFO approval',  type: 'info' },
  { module: 'inventory', text: 'Low stock: Notebooks — 8 remaining', type: 'alert' },
  { module: 'hr',        text: 'Interview: Ravi Joshi begins in 30m',  type: 'info' },
  { module: 'school',    text: 'Parent portal traffic spike: +340%',  type: 'info' },
  { module: 'finance',   text: 'Monthly report generated: March',     type: 'ok' },
];

/* ═══════════════════════════════════════════════════════════════════════
   BOOT SEQUENCE
═══════════════════════════════════════════════════════════════════════ */
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(id);
        setTimeout(() => setFading(true), 500);
        setTimeout(() => onComplete(), 1100);
      }
    }, 270);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#000409] flex items-center justify-center overflow-hidden"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="w-full h-px bg-green-400 animate-[scanline_3s_linear_infinite]" />
      </div>
      <div className="font-mono text-[.78rem] space-y-1.5 max-w-lg w-full px-8">
        <div className="text-green-400/40 text-[.6rem] tracking-widest uppercase mb-8">
          ██ SANOTHIMI ENTERPRISE RESOURCE PLANNING ██
        </div>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
              line.includes('ONLINE') ? 'text-green-400' :
              line.includes('Initializing') ? 'text-white/70' :
              line.includes('Welcome') ? 'text-white font-bold' :
              'text-white/40'
            }`}
          >
            {line}
            {i === lines.length - 1 && !fading && (
              <span className="inline-block w-2 h-3 bg-green-400 ml-1 animate-pulse" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   WORKFLOW VISUALIZATION
═══════════════════════════════════════════════════════════════════════ */
function WorkflowViz({ nodes, color, moduleKey }: { nodes: WorkflowNode[]; color: string; moduleKey: ModuleKey }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const selectedNode = nodes.find((n) => n.id === activeNode);

  const statusStyle = (s: NodeStatus) => {
    if (s === 'done')    return { ring: 'border-green-500/60', bg: 'bg-green-500/10', dot: 'bg-green-400', text: 'text-green-400' };
    if (s === 'active')  return { ring: 'border-current',      bg: 'bg-current/10',   dot: 'bg-current',   text: 'text-current' };
    return               { ring: 'border-white/10',            bg: 'bg-white/4',       dot: 'bg-white/15',  text: 'text-white/25' };
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Node row */}
      <div className="flex items-center justify-between w-full relative">
        {/* Connector track */}
        <div className="absolute top-1/2 left-6 right-6 h-px bg-white/8 -translate-y-1/2 z-0" />

        {nodes.map((node, i) => {
          const st = statusStyle(node.status);
          const isActive = activeNode === node.id;
          return (
            <div key={node.id} className="relative z-10 flex flex-col items-center gap-2.5">
              {/* Connector fill */}
              {i > 0 && (
                <div
                  className="absolute top-4 right-full h-px z-0"
                  style={{
                    width: 'calc((100vw - 640px) / 4)',
                    background: node.status === 'done'
                      ? 'linear-gradient(90deg, rgba(74,222,128,0.4), rgba(74,222,128,0.2))'
                      : node.status === 'active'
                      ? `linear-gradient(90deg, ${color}40, ${color}15)`
                      : 'transparent',
                  }}
                />
              )}

              <motion.button
                onClick={() => setActiveNode(isActive ? null : node.id)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${st.ring} ${
                  isActive ? 'shadow-[0_0_20px_currentColor]' : ''
                }`}
                style={{ color: node.status === 'active' ? color : undefined, background: isActive ? `${color}15` : undefined }}
              >
                {node.status === 'done' ? (
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : node.status === 'active' ? (
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <div className="absolute inset-0 rounded-full animate-ping" style={{ background: color, opacity: 0.4 }} />
                  </div>
                ) : (
                  <div className={`w-2 h-2 rounded-full ${st.dot}`} />
                )}
              </motion.button>

              <div className="text-center">
                <div className={`text-[.65rem] font-black uppercase tracking-wider whitespace-nowrap ${st.text}`} style={{ color: node.status === 'active' ? color : undefined }}>
                  {node.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded node detail */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div
              className="rounded-2xl border p-5 flex items-center gap-5"
              style={{ borderColor: `${color}25`, background: `${color}08` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}20` }}
              >
                <svg className="w-5 h-5" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d={selectedNode.icon} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/70 text-[.82rem] font-semibold">{selectedNode.detail}</div>
                <div className="text-white/30 text-[.72rem] mt-0.5">{selectedNode.sub}</div>
              </div>
              <div className="flex-shrink-0">
                <span
                  className="px-3 py-1 rounded-full text-[.6rem] font-black uppercase tracking-widest"
                  style={{
                    background: selectedNode.status === 'done' ? 'rgba(74,222,128,0.1)' : selectedNode.status === 'active' ? `${color}15` : 'rgba(255,255,255,0.05)',
                    color: selectedNode.status === 'done' ? '#4ADE80' : selectedNode.status === 'active' ? color : 'rgba(255,255,255,0.2)',
                    border: `1px solid ${selectedNode.status === 'done' ? 'rgba(74,222,128,0.2)' : selectedNode.status === 'active' ? `${color}30` : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  {selectedNode.status}
                </span>
              </div>
              <button
                onClick={() => setActiveNode(null)}
                className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-white/60 hover:bg-white/10 transition-all flex-shrink-0"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   LIVE METRIC CARD
═══════════════════════════════════════════════════════════════════════ */
function MetricCard({ label, baseVal, suf, prefix, change, up, color, tick }: {
  label: string; baseVal: number; suf: string; prefix: string;
  change: string; up: boolean; color: string; tick: number;
}) {
  const [pulse, setPulse] = useState(false);
  const variance = (Math.sin(tick * 0.3 + label.length) * 0.02 + 1);
  const displayVal = typeof baseVal === 'number' && Number.isInteger(baseVal) && baseVal < 200
    ? Math.round(baseVal * variance)
    : baseVal;

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 500);
    return () => clearTimeout(t);
  }, [tick]);

  return (
    <motion.div
      animate={{ borderColor: pulse ? `${color}40` : 'rgba(255,255,255,0.06)' }}
      transition={{ duration: 0.3 }}
      className="relative rounded-xl p-4 border bg-white/3 overflow-hidden"
    >
      {pulse && (
        <motion.div
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-xl"
          style={{ background: color }}
        />
      )}
      <div className="text-[.6rem] font-black uppercase tracking-widest text-white/20 mb-2">{label}</div>
      <div className="text-xl font-serif font-bold text-white leading-none mb-2">
        {prefix}{displayVal}{suf}
      </div>
      <div className={`text-[.67rem] font-bold flex items-center gap-1 ${up ? 'text-green-400' : 'text-[#EE2B47]'}`}>
        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
          <path d={up ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
        </svg>
        {change}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   NOTIFICATION TOAST
═══════════════════════════════════════════════════════════════════════ */
function NotificationToast({ text, type, moduleColor, onDismiss }: { text: string; type: string; moduleColor: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const typeColor = type === 'alert' ? '#EE2B47' : type === 'warn' ? '#F59E0B' : type === 'ok' ? '#10B981' : moduleColor;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="w-72 rounded-xl border bg-[#040D1C]/95 backdrop-blur-xl p-4 flex items-start gap-3 shadow-2xl"
      style={{ borderColor: `${typeColor}25` }}
    >
      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 animate-pulse" style={{ background: typeColor }} />
      <div className="flex-1 min-w-0">
        <div className="text-[.7rem] font-black uppercase tracking-widest mb-1" style={{ color: typeColor }}>System Alert</div>
        <div className="text-white/60 text-[.78rem] leading-snug">{text}</div>
      </div>
      <button onClick={onDismiss} className="text-white/15 hover:text-white/40 transition-colors flex-shrink-0">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [phase, setPhase] = useState<Phase>('boot');
  const [activeModule, setActiveModule] = useState<ModuleKey>('school');
  const [metricTick, setMetricTick] = useState(0);
  const [activityIdx, setActivityIdx] = useState(0);
  const [notifications, setNotifications] = useState<{ id: number; alert: typeof GLOBAL_ALERTS[0] }[]>([]);
  const [clock, setClock] = useState('');
  const [onlineCount, setOnlineCount] = useState(47);
  const notifId = useRef(0);

  const mod = MODULES[activeModule];

  const bootComplete = useCallback(() => setPhase('live'), []);

  // Clock
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setClock(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Metric tick
  useEffect(() => {
    if (phase !== 'live') return;
    const id = setInterval(() => setMetricTick((t) => t + 1), 3500);
    return () => clearInterval(id);
  }, [phase]);

  // Activity cycle
  useEffect(() => {
    if (phase !== 'live') return;
    const id = setInterval(() => setActivityIdx((i) => i + 1), 2800);
    return () => clearInterval(id);
  }, [phase]);

  // Online count jitter
  useEffect(() => {
    if (phase !== 'live') return;
    const id = setInterval(() => {
      setOnlineCount((n) => Math.max(40, Math.min(60, n + Math.floor(Math.random() * 3) - 1)));
    }, 4000);
    return () => clearInterval(id);
  }, [phase]);

  // Random notifications
  useEffect(() => {
    if (phase !== 'live') return;
    const fire = () => {
      const alert = GLOBAL_ALERTS[Math.floor(Math.random() * GLOBAL_ALERTS.length)];
      const id = ++notifId.current;
      setNotifications((prev) => [...prev.slice(-2), { id, alert }]);
    };
    fire();
    const id = setInterval(fire, 7000);
    return () => clearInterval(id);
  }, [phase]);

  const dismissNotif = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const MODULE_KEYS = ['school', 'finance', 'inventory', 'hr'] as ModuleKey[];

  const activityItems = mod.activity;
  const currentActivity = activityItems[activityIdx % activityItems.length];
  const nextActivity = activityItems[(activityIdx + 1) % activityItems.length];

  return (
    <>
      {/* Boot screen */}
      <AnimatePresence>
        {phase === 'boot' && <BootSequence onComplete={bootComplete} />}
      </AnimatePresence>

      {/* Main experience */}
      <div
        className="relative flex flex-col overflow-hidden select-none"
        style={{ height: 'calc(100vh - 70px)', background: '#000E22' }}
      >
        {/* Animated canvas background */}
        <DataNetworkBg accentColor={mod.color} />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 60% at 70% 50%, ${mod.dimColor} 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 50%, rgba(0,28,68,0.4) 0%, transparent 50%)`,
          transition: 'background 1s ease',
        }} />

        {/* System status bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: phase === 'live' ? 1 : 0, y: phase === 'live' ? 0 : -20 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative z-20 flex items-center justify-between px-6 py-2.5 border-b border-white/5 bg-black/20 backdrop-blur-sm flex-shrink-0"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[.6rem] font-black uppercase tracking-[.4em] text-white/25">Sanothimi ERP</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {MODULE_KEYS.map((k) => (
                <div
                  key={k}
                  className="flex items-center gap-1.5 text-[.6rem] font-bold text-white/20"
                >
                  <div className="w-1 h-1 rounded-full bg-green-400" />
                  {MODULES[k].name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5 text-[.6rem] font-black uppercase tracking-widest text-white/20">
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
              {onlineCount} online
            </span>
            <span className="text-white/35">{clock}</span>
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
                window.dispatchEvent(event);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/8 rounded-lg hover:bg-white/8 hover:border-white/15 transition-all"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              Search
              <kbd className="text-[.5rem] px-1 py-0.5 bg-white/5 border border-white/10 rounded">⌘K</kbd>
            </button>
          </div>
        </motion.div>

        {/* Main layout: 3 columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'live' ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-10 flex flex-1 overflow-hidden"
        >

          {/* ── LEFT: Module Selector ─────────────────────── */}
          <div className="w-[220px] flex-shrink-0 border-r border-white/5 bg-black/10 backdrop-blur-sm flex flex-col overflow-hidden">
            <div className="px-4 pt-4 pb-2">
              <div className="text-[.55rem] font-black uppercase tracking-[.4em] text-white/15 mb-3">ERP Modules</div>
              <div className="flex flex-col gap-1.5">
                {MODULE_KEYS.map((k) => {
                  const m = MODULES[k];
                  const isActive = k === activeModule;
                  return (
                    <motion.button
                      key={k}
                      onClick={() => setActiveModule(k)}
                      whileHover={{ x: isActive ? 0 : 4 }}
                      transition={{ duration: 0.15 }}
                      className={`relative flex items-center gap-3 px-3 py-3 rounded-xl text-left overflow-hidden transition-all duration-300 ${
                        isActive ? 'shadow-lg' : 'hover:bg-white/4'
                      }`}
                      style={{
                        background: isActive ? `${m.color}15` : undefined,
                        border: `1px solid ${isActive ? `${m.color}25` : 'transparent'}`,
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="moduleIndicator"
                          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                          style={{ background: m.color }}
                        />
                      )}
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{ background: isActive ? `${m.color}20` : 'rgba(255,255,255,0.05)' }}
                      >
                        <svg className="w-3.5 h-3.5 transition-colors" style={{ color: isActive ? m.color : 'rgba(255,255,255,0.3)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[.72rem] font-black text-white/70 leading-none mb-0.5 truncate" style={{ color: isActive ? 'rgba(255,255,255,0.9)' : undefined }}>{m.name}</div>
                        <div className="text-[.58rem] font-bold text-white/20 truncate">{m.tag}</div>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: m.color }} />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-4 my-3 h-px bg-white/5" />

            {/* Quick system stats */}
            <div className="px-4 flex flex-col gap-2 flex-1 overflow-y-auto no-scrollbar pb-4">
              <div className="text-[.55rem] font-black uppercase tracking-[.4em] text-white/15 mb-1">System Health</div>
              {[
                { label: 'API Response', val: '94ms', ok: true },
                { label: 'DB Queries', val: '142/s', ok: true },
                { label: 'Memory Usage', val: '61%', ok: true },
                { label: 'Active Jobs', val: '8', ok: true },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: s.ok ? '#4ADE80' : '#EE2B47' }} />
                    <span className="text-[.65rem] text-white/25 font-medium">{s.label}</span>
                  </div>
                  <span className="text-[.65rem] font-bold text-white/40">{s.val}</span>
                </div>
              ))}

              <div className="mt-4 space-y-2">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-[.7rem] font-bold transition-all hover:opacity-90"
                  style={{ background: mod.color, color: 'white' }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
                  Request Demo
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[.68rem] font-bold text-white/30 border border-white/8 hover:border-white/15 hover:text-white/50 transition-all"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>

          {/* ── CENTER: Main workspace ─────────────────────── */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">

            {/* Module header */}
            <div className="flex-shrink-0 flex items-center justify-between px-8 pt-5 pb-4 border-b border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${mod.color}15` }}>
                    <svg className="w-4.5 h-4.5" style={{ color: mod.color, width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d={mod.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-[.92rem]">{mod.name}</div>
                    <div className="text-white/25 text-[.65rem] font-medium">{mod.tag} — Live simulation</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 bg-white/3">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: mod.color }} />
                  <span className="text-[.65rem] font-bold text-white/35">Live</span>
                </div>
                <Link href="/services" className="px-3 py-1.5 rounded-lg border border-white/8 text-white/30 text-[.65rem] font-bold hover:border-white/20 hover:text-white/60 transition-all">
                  Full Docs →
                </Link>
              </div>
            </div>

            {/* KPI strip */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule + '-kpis'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 grid grid-cols-3 gap-3 px-8 py-4 border-b border-white/5"
              >
                {mod.kpis.map((kpi) => (
                  <MetricCard
                    key={kpi.label}
                    label={kpi.label}
                    baseVal={kpi.baseVal}
                    suf={kpi.suf}
                    prefix={kpi.prefix}
                    change={kpi.change}
                    up={kpi.up}
                    color={mod.color}
                    tick={metricTick}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Workflow visualization */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="px-8 pt-5">
                <div className="text-[.58rem] font-black uppercase tracking-[.4em] text-white/15 mb-5">
                  Process Flow — Click any step to inspect
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeModule + '-workflow'}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                  >
                    <WorkflowViz nodes={mod.workflow} color={mod.color} moduleKey={activeModule} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Activity feed strip at bottom of center */}
              <div className="mt-auto border-t border-white/5 px-8 py-3 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: mod.color }} />
                <div className="flex-1 overflow-hidden h-4 relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activityIdx}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 text-white/30 text-[.72rem] font-medium whitespace-nowrap"
                    >
                      {currentActivity}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <Link href="/services" className="text-[.65rem] font-bold text-white/15 hover:text-white/40 flex-shrink-0 transition-colors">View all →</Link>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Live metrics panel ──────────────────── */}
          <div className="w-[260px] flex-shrink-0 border-l border-white/5 bg-black/10 backdrop-blur-sm flex flex-col overflow-hidden">
            <div className="flex-shrink-0 px-4 pt-4 pb-2 border-b border-white/5">
              <div className="text-[.55rem] font-black uppercase tracking-[.4em] text-white/15 mb-1">Live Activity Feed</div>
              <div className="text-[.6rem] text-white/15 font-medium">{mod.name} • Real-time</div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-1.5">
              {/* Recent activity items */}
              {mod.activity.map((item, i) => {
                const isNew = i === activityIdx % mod.activity.length;
                return (
                  <motion.div
                    key={`${activeModule}-${i}`}
                    animate={{ opacity: isNew ? 1 : 0.35, borderLeftColor: isNew ? mod.color : 'rgba(255,255,255,0.05)' }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start gap-2.5 py-2.5 border-l-2 pl-2.5 rounded-r-lg"
                    style={{ borderLeftColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[.68rem] text-white/50 leading-snug">{item}</div>
                      <div className="text-[.58rem] text-white/15 mt-0.5 font-medium">
                        {i === 0 ? 'Just now' : `${(i * 2 + 1)}m ago`}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom: Quick actions */}
            <div className="flex-shrink-0 border-t border-white/5 p-4 space-y-2">
              <div className="text-[.55rem] font-black uppercase tracking-[.4em] text-white/15 mb-3">Quick Actions</div>
              {[
                { label: 'Export Report', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
                { label: 'View Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2' },
                { label: 'Add Record', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
              ].map((a) => (
                <button
                  key={a.label}
                  className="w-full flex items-center gap-2.5 py-2 px-3 rounded-lg text-white/25 border border-white/5 hover:border-white/12 hover:text-white/50 hover:bg-white/3 transition-all text-[.68rem] font-bold"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
                  </svg>
                  {a.label}
                </button>
              ))}

              <div className="pt-2 border-t border-white/5">
                <div className="flex items-center justify-between text-[.58rem] text-white/15 font-medium">
                  <span>Data as of {clock}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    <span>Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'live' ? 1 : 0, y: phase === 'live' ? 0 : 20 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="relative z-20 flex items-center justify-between px-6 py-3 border-t border-white/5 bg-black/20 backdrop-blur-sm flex-shrink-0"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {[
                { label: '99.9%', sub: 'Uptime' },
                { label: '50+', sub: 'Institutions' },
                { label: '10K+', sub: 'Daily Users' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 text-[.6rem]">
                  <span className="font-black text-white/50">{s.label}</span>
                  <span className="text-white/15 font-medium">{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="px-4 py-1.5 rounded-lg border border-white/10 text-white/25 text-[.65rem] font-bold hover:border-white/20 hover:text-white/50 transition-all"
            >
              View Pricing
            </Link>
            <Link
              href="/contact"
              className="px-5 py-1.5 rounded-lg text-[.65rem] font-bold text-white transition-all"
              style={{ background: mod.color }}
            >
              Schedule Demo
            </Link>
          </div>
        </motion.div>

        {/* ── Notification toasts (bottom-right) ─────────── */}
        <div className="fixed bottom-20 right-6 z-[100] flex flex-col-reverse gap-2">
          <AnimatePresence>
            {notifications.map((n) => (
              <NotificationToast
                key={n.id}
                text={n.alert.text}
                type={n.alert.type}
                moduleColor={MODULES[n.alert.module as ModuleKey].color}
                onDismiss={() => dismissNotif(n.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Scanline animation */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </>
  );
}
