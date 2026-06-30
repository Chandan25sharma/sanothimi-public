'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface MegaItem {
  label: string;
  href: string;
  desc?: string;
}

export interface MegaColumn {
  title: string;
  items: MegaItem[];
  portalLabel?: string;
  portalHref?: string;
}

interface Props {
  columns: MegaColumn[];
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function MegaMenu({ columns, ctaLabel, ctaHref, secondaryLabel, secondaryHref }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#F8FAFC] rounded-2xl shadow-2xl shadow-black/12 border border-gray-100 overflow-hidden min-w-[560px]"
    >
      <div className="flex gap-12 px-8 py-8">
        {columns.map((col) => (
          <div key={col.title} className="min-w-[180px]">
            <h4 className="text-[.85rem] font-bold text-[#0D47A1] pb-3 mb-4 border-b border-gray-200">
              {col.title}
            </h4>
            <ul className="space-y-3.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="group block">
                    <div className="text-[.83rem] font-medium text-gray-600 group-hover:text-[#D32F2F] transition-colors">
                      {item.label}
                    </div>
                    {item.desc && (
                      <div className="text-[.7rem] text-gray-400 mt-0.5 leading-snug">{item.desc}</div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            {col.portalLabel && col.portalHref && (
              <Link
                href={col.portalHref}
                className="mt-5 inline-flex items-center gap-1.5 bg-[#D32F2F]/10 text-[#D32F2F] px-4 py-2 rounded-full text-[.78rem] font-bold hover:bg-[#D32F2F] hover:text-white transition-colors"
              >
                {col.portalLabel}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            )}
          </div>
        ))}
      </div>

      {(ctaLabel || secondaryLabel) && (
        <div className="flex items-center justify-between px-8 py-4 bg-white border-t border-gray-100">
          {ctaLabel && ctaHref && (
            <Link href={ctaHref} className="text-[.8rem] font-bold text-[#0D47A1] hover:text-[#D32F2F] transition-colors flex items-center gap-1.5">
              {ctaLabel}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
            </Link>
          )}
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="text-[.8rem] font-bold bg-[#D32F2F] text-white px-4 py-2 rounded-lg hover:bg-[#B71C1C] transition-colors">
              {secondaryLabel}
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}
