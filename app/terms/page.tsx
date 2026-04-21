import { Metadata } from 'next';
import PrintButton from '@/components/PrintButton';
import { TERMS_FULL_CONTENT as TERMS_SECTIONS } from '@/lib/legal-content';

export const metadata: Metadata = {
  title: 'Terms of Service | Sanothimi Global SaaS',
  description: 'Complete contractual framework for Sanothimi platforms, covering licensing, data processing, and enterprise SLAs.',
};

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-24 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block sticky top-40 space-y-10">
            <div>
              <div className="text-[.65rem] font-black uppercase tracking-[.4em] text-[#EE2B47] mb-8">Navigation Hub</div>
              <nav className="flex flex-col gap-3">
                {TERMS_SECTIONS.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="text-sm font-bold text-[#001C44]/40 hover:text-[#EE2B47] transition-all flex items-center gap-3 group">
                    <span className="w-1 h-1 rounded-full bg-current opacity-20 group-hover:opacity-100" />
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
            <div className="p-6 bg-[#EE2B47]/03 rounded-2xl border border-[#EE2B47]/05">
               <p className="text-[10px] font-bold text-[#EE2B47] uppercase tracking-widest mb-3 leading-none">Inquiry Hub</p>
               <p className="text-xs text-[#001C44]/60 mb-5 leading-relaxed">Questions regarding our institutional framework?</p>
               <a href="mailto:legal@sanothimi.com.np" className="text-xs font-black text-[#001C44] hover:text-[#EE2B47] transition-colors underline decoration-[#EE2B47]/30">Contact Legal Core</a>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="relative">
            <header className="mb-20">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47]" />
                  <span className="text-[10px] font-black uppercase tracking-[.3em] text-[#001C44]">Institutional Contract</span>
               </div>
               <h1 className="font-serif text-5xl md:text-7xl text-[#001C44] leading-tight mb-8 tracking-tighter">
                 Terms of <span className="italic">Service.</span>
               </h1>
               <div className="flex flex-wrap items-center gap-8 text-[11px] font-black uppercase tracking-widest text-[#001C44]/40">
                  <span className="flex items-center gap-2 text-[#EE2B47]"><span className="w-1 h-1 rounded-full bg-current" /> April 21, 2026</span>
                  <span>Effective Worldwide</span>
                  <span>v2.4.0 Core</span>
               </div>
            </header>

            <div className="prose prose-slate max-w-none 
              prose-p:text-[#6B7280] prose-p:text-lg prose-p:leading-relaxed prose-p:mb-10
              prose-headings:font-serif prose-headings:text-[#001C44] prose-headings:tracking-tight
              prose-strong:text-[#001C44] prose-strong:font-bold
              prose-hr:border-gray-100 prose-hr:my-20">
              
              {TERMS_SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="mb-24 scroll-mt-40">
                  <h2 className="text-4xl md:text-5xl mb-12">{s.title}</h2>
                  <div className="whitespace-pre-wrap">
                    {s.content}
                  </div>
                </section>
              ))}

              <hr />

              <div className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
                 <div className="max-w-md">
                    <h3 className="text-2xl font-serif text-[#001C44] mb-4">Print Documentation</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">Download a physical copy of our Terms of Service for your institutional records.</p>
                 </div>
                 <PrintButton />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
