'use client';

import { Himalaya, Lattice, Mandala, NepalSun } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';

const PERKS = [
  {
    number: '01',
    title: '30-minute walkthrough',
    desc: 'A focused tour of the modules most relevant to your organization.',
  },
  {
    number: '02',
    title: 'Built around your workflow',
    desc: 'See how the platform can fit the way your team already works.',
  },
  {
    number: '03',
    title: 'No commitment',
    desc: 'Ask questions, explore the platform and decide when you are ready.',
  },
];

export default function DemoPage() {
  return (
    <main className="bg-white">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative pt-28 md:pt-18 pb-20 bg-[#F9FAFB] overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <Lattice
            className="absolute inset-0 w-full h-full text-[#0B1F3A] opacity-[0.025]"
            size={64}
          />
              <Himalaya className="absolute bottom-0 left-0 w-full text-[#0B1F3A] opacity-[0.14]" />

          <Mandala
            className="absolute -top-32 -right-32 w-[500px] h-[500px] text-[#0B1F3A] opacity-[0.07]"
          />

          <NepalSun
            className="absolute -bottom-28 -left-28 w-[300px] h-[300px] text-[#D4AF37] opacity-[0.08]"
          />

          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-600/[0.035] blur-[120px]"
          />
        </div>


        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="max-w-4xl">

            {/* Kicker */}

            <div className="flex items-center gap-3 mb-7">

              <span className="w-10 h-px bg-[#D4AF37]" />

              <span className="text-[#0B1F3A] text-[.62rem] font-black uppercase tracking-[.35em]">
                Book a Demo
              </span>

            </div>


            {/* Heading */}

            <h1 className="font-serif text-[2.7rem] sm:text-5xl md:text-6xl lg:text-[5rem] text-[#0B1F3A] leading-[1.03] tracking-tight max-w-4xl">

              See what your
              <br />

              <span className="italic text-[#14532D]">
                future workflow
              </span>

              <br />

              could look like.

            </h1>


            {/* Description */}

            <p className="text-[#64748B] text-base md:text-lg leading-[1.8] max-w-2xl mt-8">
              Get a personalized walkthrough of Sanothimi&apos;s
              digital solutions — focused on your organization,
              your challenges and the way your team actually works.
            </p>


            {/* Mini process */}

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-10 pt-8 border-t border-[#0B1F3A]/10 max-w-3xl">

              {[
                ['01', 'Request'],
                ['02', 'Walkthrough'],
                ['03', 'Next Step'],
              ].map(([num, label], i) => (

                <div
                  key={num}
                  className="flex items-center gap-3"
                >

                  <span className="w-7 h-7 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[.55rem] font-black text-[#14532D]">
                    {num}
                  </span>

                  <span className="text-[.62rem] font-black uppercase tracking-[.2em] text-[#0B1F3A]/55">
                    {label}
                  </span>

                  {i < 2 && (
                    <span className="hidden sm:block w-8 h-px bg-[#0B1F3A]/10" />
                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          DEMO AREA
      ========================================================= */}

      <section className="relative py-20 md:py-28 bg-white overflow-hidden">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-16 xl:gap-24 items-start">


            {/* ===================================================
                LEFT SIDE
            =================================================== */}

            <div className="lg:sticky lg:top-28">

              <div className="text-[#D4AF37] text-[.58rem] font-black uppercase tracking-[.35em] mb-5">
                What to Expect
              </div>


              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.8rem] text-[#0B1F3A] leading-[1.1] mb-7">
                A conversation
                <br />
                <span className="italic text-[#14532D]">
                  before a presentation.
                </span>
              </h2>


              <p className="text-[#64748B] text-[.92rem] leading-[1.8] max-w-md mb-12">
                Tell us what you are trying to improve. We will
                focus the walkthrough around the areas that matter
                most to your organization.
              </p>


              {/* Perks */}

              <div className="space-y-9">

                {PERKS.map((perk) => (

                  <div
                    key={perk.number}
                    className="flex gap-5 group"
                  >

                    <div className="flex-shrink-0 pt-1">

                      <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[.58rem] font-black text-[#14532D] group-hover:bg-[#14532D] group-hover:text-white group-hover:border-[#14532D] transition-all duration-500">
                        {perk.number}
                      </div>

                    </div>


                    <div>

                      <h3 className="text-[#0B1F3A] font-bold text-[.95rem] mb-1.5">
                        {perk.title}
                      </h3>

                      <p className="text-[#64748B] text-[.82rem] leading-[1.7] max-w-sm">
                        {perk.desc}
                      </p>

                    </div>

                  </div>

                ))}

              </div>


              {/* Small trust line */}

              <div className="mt-14 pt-7 border-t border-gray-100 flex items-center gap-3">

                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <span className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#64748B]">
                  Typically responds within 24 hours
                </span>

              </div>

            </div>


            {/* ===================================================
                FORM
            =================================================== */}

            <div className="py-10 border-t border-[#0B1F3A]/15">

              <p className="text-[#64748B] leading-relaxed max-w-lg mb-8">
                Reach out through our contact page with a few details about your organization, and our team will get back to you within 24 hours to arrange your personalized walkthrough.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-[#14532D] text-white px-9 py-4 rounded-full font-bold text-sm hover:bg-[#0B3B20] transition-all hover:-translate-y-0.5"
              >
                Request Your Demo

                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <CTABanner
        title={'Not ready for a demo?\nTalk to our team first.'}
        sub="We are happy to answer questions before you commit to anything."
        cta="Contact Us"
        ctaHref="/contact"
      />

    </main>
  );
}