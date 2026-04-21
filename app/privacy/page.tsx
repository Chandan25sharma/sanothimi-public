import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sanothimi Global SaaS',
  description: 'Learn how Sanothimi protects your data and maintains institutional security and integrity across the SchoolSathi platform.',
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#F9FAF9] min-h-screen pt-32 pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 text-[#EE2B47] text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
           <span className="w-8 h-px bg-[#EE2B47]" />
           Trust & Transparency
        </div>
        <h1 className="font-serif text-[3.5rem] md:text-[4.5rem] text-[#001C44] leading-tight mb-6 tracking-tighter">
          Privacy <span className="italic">Policy.</span>
        </h1>
        <p className="text-[#6B7280] text-lg max-w-2xl mx-auto leading-relaxed">
          Your trust is our most valuable asset. This document details our commitment to protecting the security and integrity of your institutional data.
        </p>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-[#001C44]/05 border border-gray-100 relative overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none select-none">
             <img src="/logo-no-background.png" alt="" className="w-48 h-auto" />
          </div>

          <div className="prose prose-slate max-w-none prose-p:text-[#6B7280] prose-headings:text-[#001C44] prose-headings:font-serif prose-strong:text-[#001C44] prose-a:text-[#EE2B47] prose-li:text-[#6B7280]">
            <p className="text-sm font-bold text-[#EE2B47] uppercase tracking-widest mb-8">Effective Date: April 21, 2026</p>
            
            <hr className="border-gray-100 my-12" />

            <section className="mb-16">
              <h2 className="text-3xl mb-6">Preamble</h2>
              <p>
                SchoolSathi ("we," "our," "us," or "the Company") is a school management software-as-a-service (SaaS) product developed and operated by <strong>Sanothimi Private Limited</strong>, a company registered under the laws of Nepal with registration number 294812/080/081, having its registered office at Sanothimi, Bhaktapur, Nepal.
              </p>
              <p>
                We are committed to protecting the privacy and security of all personal information entrusted to us by schools, staff, students, parents, and all other users of our platform. This Privacy Policy explains in detail how we collect, use, store, protect, share, and handle personal data when you use SchoolSathi.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl mb-6">1. Data We Collect</h2>
              <h3 className="text-xl mb-4">3.1 Data Collected from Schools</h3>
              <p>When a school subscribes to SchoolSathi, we collect institutional name, registration (PAN/VAT) numbers, contact details, and brand assets including logos.</p>
              
              <h3 className="text-xl mb-4">3.2 Student Data (Institutional)</h3>
              <p>Schools enter student records including identity, academic performance, family contacts, and financial transactions. This data is owned by the School and processed by us on their behalf.</p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl mb-6">2. How We Use Data</h2>
              <p>We process data strictly to provide the SchoolSathi service, manage accounts, ensure system security, and comply with Nepal tax and education regulations. We <strong>NEVER</strong> sell personal data to third parties or use student data for marketing profiles.</p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl mb-6">3. Data Sharing</h2>
              <p>Data is strictly controlled via Role-Based Access (RBAC). We share data with carefully selected infrastructure providers (e.g., MongoDB, Cloudinary) who are bound by strict confidentiality agreements. One school can <strong>NEVER</strong> see another school's data.</p>
            </section>

            <section className="mb-16 text-center pt-12 border-t border-gray-100">
              <p className="text-sm italic mb-8">For full details or specific inquiries, please contact our Privacy Officer.</p>
              <a href="mailto:privacy@sanothimi.com.np" className="inline-flex items-center gap-3 bg-[#001C44] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#EE2B47] transition-all duration-500">
                Contact Privacy Officer
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
