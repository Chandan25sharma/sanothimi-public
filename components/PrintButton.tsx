'use client';

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()} 
      className="bg-[#0D47A1] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#D32F2F] transition-all shadow-xl"
    >
      Generate PDF
    </button>
  );
}
