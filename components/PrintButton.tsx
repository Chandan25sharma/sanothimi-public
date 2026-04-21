'use client';

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()} 
      className="bg-[#001C44] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#EE2B47] transition-all shadow-xl"
    >
      Generate PDF
    </button>
  );
}
