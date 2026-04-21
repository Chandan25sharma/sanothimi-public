import { Metadata } from 'next';
import { PRIVACY_FULL_CONTENT as PRIVACY_SECTIONS } from '@/lib/legal-content';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sanothimi Global SaaS',
  description: 'Detailed framework on how Sanothimi protects, processes, and secures institutional data across the SchoolSathi ecosystem.',
};

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-24 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block sticky top-40 space-y-10">
            <div>
              <div className="text-[.65rem] font-black uppercase tracking-[.4em] text-[#EE2B47] mb-8">Part Index</div>
              <nav className="flex flex-col gap-3">
                {PRIVACY_SECTIONS.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="text-sm font-bold text-[#001C44]/40 hover:text-[#EE2B47] transition-all flex items-center gap-3 group">
                    <span className="w-1 h-1 rounded-full bg-current opacity-20 group-hover:opacity-100" />
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
            <div className="p-6 bg-[#001C44]/02 rounded-2xl border border-gray-100">
               <p className="text-[10px] font-bold text-[#001C44]/60 uppercase tracking-widest mb-3 leading-none">Data Security</p>
               <p className="text-xs text-[#001C44]/60 mb-5 leading-relaxed">Encrypted. Secure. Institutional Grade.</p>
               <a href="mailto:privacy@sanothimi.com.np" className="text-xs font-black text-[#001C44] hover:text-[#EE2B47] transition-colors underline">Privacy Officer</a>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="relative">
            <header className="mb-20">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE2B47]" />
                  <span className="text-[10px] font-black uppercase tracking-[.3em] text-[#001C44]">Transparency Framework</span>
               </div>
               <h1 className="font-serif text-5xl md:text-7xl text-[#001C44] leading-tight mb-8 tracking-tighter">
                 Privacy <span className="italic">Policy.</span>
               </h1>
               <div className="flex flex-wrap items-center gap-8 text-[11px] font-black uppercase tracking-widest text-[#001C44]/40">
                  <span className="flex items-center gap-2 text-[#EE2B47]"><span className="w-1 h-1 rounded-full bg-current" /> April 21, 2026</span>
                  <span>Data Protection Compliant</span>
                  <span>Nepal Jurisdiction</span>
               </div>
            </header>

            <div className="prose prose-slate max-w-none 
              prose-p:text-[#6B7280] prose-p:text-lg prose-p:leading-relaxed prose-p:mb-10
              prose-headings:font-serif prose-headings:text-[#001C44] prose-headings:tracking-tight
              prose-strong:text-[#001C44] prose-strong:font-bold
              prose-hr:border-gray-100 prose-hr:my-20">
              
              {PRIVACY_SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="mb-24 scroll-mt-40">
                  <h2 className="text-4xl md:text-5xl mb-12">{s.title}</h2>
                  <div className="whitespace-pre-wrap">
                    {s.content}
                  </div>
                </section>
              ))}

              <hr />

              <div className="bg-[#001C44] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 text-white">
                 <div className="max-w-md">
                    <h3 className="text-2xl font-serif mb-4">Request Data Extract</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">As an institutional client, you have the right to request a full encrypted copy of your data at any time.</p>
                 </div>
                 <button className="bg-[#EE2B47] text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-[#001C44] transition-all shadow-xl">
                    Request Archive
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
