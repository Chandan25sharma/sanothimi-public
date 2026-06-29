'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const COMMANDS = [
  // Navigation
  { group: 'Navigate', label: 'Home',            href: '/',        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', kbd: 'G H' },
  { group: 'Navigate', label: 'About Us',         href: '/about',   icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',           kbd: 'G A' },
  { group: 'Navigate', label: 'Services & ERP',   href: '/services',icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',     kbd: 'G S' },
  { group: 'Navigate', label: 'Pricing & Plans',  href: '/pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', kbd: 'G P' },
  { group: 'Navigate', label: 'Contact Us',       href: '/contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', kbd: 'G C' },
  // Modules
  { group: 'ERP Modules', label: 'School ERP — SchoolSathi',   href: '/services', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
  { group: 'ERP Modules', label: 'Financial Management Suite', href: '/services', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { group: 'ERP Modules', label: 'Inventory & Supply Chain',   href: '/services', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { group: 'ERP Modules', label: 'Business Intelligence',      href: '/services', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { group: 'ERP Modules', label: 'Payroll & HR Management',    href: '/services', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { group: 'ERP Modules', label: 'Custom Software Development', href: '/services', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  // Actions
  { group: 'Quick Actions', label: 'Request a Free Demo', href: '/contact', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { group: 'Quick Actions', label: 'View Privacy Policy', href: '/privacy', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { group: 'Quick Actions', label: 'Terms of Service',    href: '/terms',   icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
];

export default function CommandPalette() {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);
  const router   = useRouter();

  // Filter commands
  const filtered = query.trim()
    ? COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()) || c.group.toLowerCase().includes(query.toLowerCase()))
    : COMMANDS;

  // Open / close shortcut
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setOpen((o) => !o); setQuery(''); setSelected(0); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  // Auto-focus on open
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 60); }, [open]);

  // Arrow-key + Enter navigation
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === 'Enter' && filtered[selected]) { router.push(filtered[selected].href); setOpen(false); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, selected, filtered, router]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  if (!open) return null;

  // Group filtered results
  const groups: Record<string, typeof COMMANDS> = {};
  filtered.forEach((c) => { groups[c.group] ??= []; groups[c.group].push(c); });

  let globalIdx = -1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh] px-4"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#000E22]/85 backdrop-blur-md" />

      {/* Palette panel */}
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl shadow-black/60"
        style={{ background: 'rgba(0,14,34,0.92)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(32px)' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Search header ── */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-white/8">
          <svg className="w-5 h-5 text-white/25 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search modules, pages, actions…"
            className="flex-1 bg-transparent text-white placeholder:text-white/20 text-[.95rem] outline-none font-medium"
          />
          <div className="hidden sm:flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[.6rem] font-bold text-white/25">ESC</kbd>
          </div>
        </div>

        {/* ── Results ── */}
        <div ref={listRef} className="max-h-[55vh] overflow-y-auto no-scrollbar">
          {Object.keys(groups).length === 0 ? (
            <div className="text-center py-16 text-white/20">
              <svg className="w-10 h-10 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <p className="text-sm font-medium">No results for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="p-3 space-y-1">
              {Object.entries(groups).map(([group, cmds]) => (
                <div key={group} className="mb-2">
                  <div className="text-[.58rem] font-black uppercase tracking-[.35em] text-white/20 px-4 py-2.5">{group}</div>
                  {cmds.map((cmd) => {
                    globalIdx++;
                    const idx = globalIdx;
                    const isActive = idx === selected;
                    return (
                      <Link
                        key={cmd.label}
                        href={cmd.href}
                        data-idx={idx}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() => setSelected(idx)}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-150 ${isActive ? 'bg-[#EE2B47]/12 border border-[#EE2B47]/20' : 'hover:bg-white/4'}`}
                      >
                        {/* Icon */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? 'bg-[#EE2B47]/20' : 'bg-white/5'}`}>
                          <svg className={`w-4 h-4 ${isActive ? 'text-[#EE2B47]' : 'text-white/35'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d={cmd.icon} />
                          </svg>
                        </div>
                        {/* Label */}
                        <span className={`text-[.88rem] font-semibold flex-1 transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>
                          {cmd.label}
                        </span>
                        {/* Keyboard hint */}
                        {cmd.kbd && isActive && (
                          <div className="hidden sm:flex items-center gap-1">
                            {cmd.kbd.split(' ').map((k) => (
                              <kbd key={k} className="px-2 py-0.5 bg-white/6 border border-white/10 rounded text-[.58rem] font-bold text-white/25">{k}</kbd>
                            ))}
                          </div>
                        )}
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${isActive ? 'text-[#EE2B47] translate-x-0.5' : 'text-white/10'}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-3.5 border-t border-white/6 flex items-center justify-between">
          <div className="flex items-center gap-5 text-[.6rem] font-bold text-white/18">
            <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[.58rem]">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[.58rem]">↵</kbd> open</span>
            <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[.58rem]">esc</kbd> close</span>
          </div>
          <div className="text-[.58rem] font-black text-white/12 uppercase tracking-widest">Sanothimi ERP</div>
        </div>
      </div>
    </div>
  );
}
