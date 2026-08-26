'use client';

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()} 
      className="bg-[#0B1F3A] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#155EEF] transition-all shadow-xl"
    >
      Generate PDF
    </button>
  );
}
