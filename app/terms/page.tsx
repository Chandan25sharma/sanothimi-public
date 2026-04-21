import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Sanothimi Global SaaS',
  description: 'Review the contractual terms governing the use of Sanothimi SchoolSathi and our institutional management services.',
};

export default function TermsPage() {
  return (
    <main className="bg-[#F9FAF9] min-h-screen pt-32 pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
           <span className="w-8 h-px bg-[#EE2B47]" />
           Legal Foundation
        </div>
        <h1 className="font-serif text-[3.5rem] md:text-[4.5rem] text-[#001C44] leading-tight mb-6 tracking-tighter">
          Terms of <span className="italic">Service.</span>
        </h1>
        <p className="text-[#6B7280] text-lg max-w-2xl mx-auto leading-relaxed">
          The legal framework that ensures a secure, reliable, and mutually beneficial partnership between Sanothimi and your institution.
        </p>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-[#001C44]/05 border border-gray-100 relative overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none select-none">
             <img src="/logo-no-background.png" alt="" className="w-48 h-auto" />
          </div>

          <div className="prose prose-slate max-w-none prose-p:text-[#6B7280] prose-headings:text-[#001C44] prose-headings:font-serif prose-headings:mb-6 prose-strong:text-[#001C44] prose-a:text-[#EE2B47] prose-li:text-[#6B7280]">
            <p className="text-sm font-bold text-[#EE2B47] uppercase tracking-widest mb-8">Effective Date: April 21, 2026</p>
            
            <hr className="border-gray-100 my-12" />

            <section className="mb-16">
              <h2 className="text-3xl">1. Preamble</h2>
              <p>
                These Terms of Service constitute a legally binding contract between <strong>Sanothimi Private Limited</strong> ("Company"), registered in Nepal (No. 294812/080/081), and the educational institution ("School") that uses the SchoolSathi platform.
              </p>
              <p>
                By using SchoolSathi, you confirm that you have read, understood, and agree to be bound by these terms. This includes compliance with all Nepal education and electronic transactions regulations.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl">2. Account Responsibility</h2>
              <p>Schools are responsible for maintaining the security of all login credentials and for all actions taken under their account. Any unauthorized access discovered must be reported immediately to <strong>support@sanothimi.com.np</strong>.</p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl">3. Subscription & Fees</h2>
              <p>Services are provided on a subscription basis. Failure to pay fees within the designated grace period may result in account restriction (read-only mode) and eventual suspension.</p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl">4. Data Ownership & Security</h2>
              <p>All <strong>School Data</strong> belongs exclusively to the School. Sanothimi acts as a Data Processor and implements enterprise-grade encryption and daily backups to ensure institutional continuity.</p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl">5. Acceptable Use</h2>
              <p>You agree to use SchoolSathi only for lawful purposes in accordance with Nepal law. Prohibited uses include reverse engineering the platform or entering fraudulent financial data.</p>
            </section>

            <section className="mb-16 text-center pt-12 border-t border-gray-100">
              <p className="text-sm italic mb-8">For questions regarding these terms or your specific subscription agreement, please contact our legal team.</p>
              <a href="mailto:legal@sanothimi.com.np" className="inline-flex items-center gap-3 bg-[#EE2B47] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#001C44] transition-all duration-500">
                Contact Legal Department
              </a>
            </section>
          </div>
        </div>
        
        {/* Back link */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-[#6B7280] font-bold text-sm hover:text-[#EE2B47] transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
