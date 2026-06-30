'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sanothimi_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const id = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(id);
  }, []);

  const decide = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-[100] bg-[#082C66] border-t border-white/10 shadow-[0_-12px_40px_rgba(0,0,0,0.25)]"
        >
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-white/65 text-[.83rem] leading-relaxed flex-1">
              We use cookies to improve your browsing experience and analyze site traffic. By clicking &ldquo;Allow all&rdquo;, you consent to our use of cookies.{' '}
              <Link href="/privacy" className="text-[#D32F2F] font-semibold hover:underline">
                Privacy Policy
              </Link>
            </p>
            <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => decide('declined')}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-lg text-[.8rem] font-bold text-white/60 hover:text-white border border-white/15 hover:border-white/30 transition-all"
              >
                Decline
              </button>
              <button
                onClick={() => decide('accepted')}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-lg text-[.8rem] font-bold bg-[#D32F2F] text-white hover:bg-[#B71C1C] transition-all shadow-lg shadow-[#D32F2F]/20"
              >
                Allow all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
