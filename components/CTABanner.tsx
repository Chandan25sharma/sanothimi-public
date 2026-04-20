import Link from 'next/link';

interface Props {
  title?: string;
  sub?: string;
  cta?: string;
  ctaHref?: string;
}

export default function CTABanner({ title = 'Elevate Your Business\nwith Sanothimi Technologies', sub, cta = 'Get Started', ctaHref = '/contact' }: Props) {
  return (
    <section className="cta-banner py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <h2 className="font-serif text-4xl xl:text-5xl text-white leading-tight whitespace-pre-line">{title}</h2>
          <div className="flex flex-col gap-6 lg:items-start">
            {sub && <p className="text-white/40 leading-relaxed text-lg">{sub}</p>}
            <Link href={ctaHref} className="btn bg-[#EE2B47] text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-[#EE2B47] transition-all text-sm self-start shadow-xl shadow-[#EE2B47]/20">
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
