import Link from 'next/link';

interface Props {
  title?: string;
  sub?: string;
  cta?: string;
  ctaHref?: string;
}

export default function CTABanner({
  title = 'Elevate Your Business\nwith Sanothimi Technologies',
  sub,
  cta = 'Get Started',
  ctaHref = '/contact',
}: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#14532D] via-[#0B3B25] to-[#06301E] py-24 md:py-32">

      {/* =====================================================
          BRAND BACKGROUND
          ===================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />

        {/* Flowing gold brand lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1600 700"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-100 500 C180 500 200 120 480 170 S760 560 1030 350 S1350 80 1700 130"
            stroke="#C9A227"
            strokeWidth="1.2"
            opacity="0.18"
          />

          <path
            d="M-100 560 C200 560 260 220 510 230 S800 600 1060 410 S1370 160 1700 200"
            stroke="#D6B656"
            strokeWidth="0.8"
            opacity="0.10"
          />

          <path
            d="M-100 180 C180 150 280 400 510 380 S820 80 1090 230 S1400 450 1700 350"
            stroke="#C9A227"
            strokeWidth="0.8"
            opacity="0.08"
          />

          {/* Brand points */}
          <circle
            cx="480"
            cy="170"
            r="3"
            fill="#D6B656"
            opacity="0.45"
          />

          <circle
            cx="1030"
            cy="350"
            r="2.5"
            fill="#C9A227"
            opacity="0.35"
          />

          <circle
            cx="1090"
            cy="230"
            r="2"
            fill="#D6B656"
            opacity="0.30"
          />
        </svg>

        {/* Soft gold glow */}
        <div className="absolute -top-48 right-[-100px] w-[550px] h-[550px] rounded-full bg-[#C9A227]/[0.06] blur-[150px]" />

        <div className="absolute -bottom-48 left-[-100px] w-[500px] h-[500px] rounded-full bg-[#C9A227]/[0.05] blur-[140px]" />

      </div>


      {/* =====================================================
          CURVED TOP
          ===================================================== */}

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
        <svg
          className="relative block w-full h-[55px] md:h-[75px]"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 0 H1440 V25 C1200 85 960 85 720 45 C480 5 240 5 0 55 V0 Z"
            fill="#F8FAFC"
          />

          <path
            d="M0 55 C240 5 480 5 720 45 C960 85 1200 85 1440 25"
            stroke="#C9A227"
            strokeWidth="1"
            opacity="0.45"
          />
        </svg>
      </div>


      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10 md:pt-14">

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div>

            <div className="flex items-center gap-3 text-[.62rem] font-black uppercase tracking-[.4em] text-[#D6B656] mb-6">
              <span className="w-12 h-px bg-[#C9A227]/70" />
              Let's build something better
            </div>


            <h2 className="font-serif text-4xl md:text-5xl xl:text-[3.5rem] text-white leading-[1.08] whitespace-pre-line">
              {title}
            </h2>

          </div>


          {/* RIGHT */}
          <div className="relative">

            {/* Small decorative gold line */}
            <div className="absolute -top-6 left-0 w-20 h-px bg-gradient-to-r from-[#C9A227] to-transparent" />

            {sub && (
              <p className="text-white/50 leading-relaxed text-base md:text-lg max-w-xl mb-8">
                {sub}
              </p>
            )}


            <Link
              href={ctaHref}
              className="
                group
                inline-flex
                items-center
                gap-3
                bg-[#C9A227]
                text-[#082B1A]
                px-8
                py-4
                rounded-xl
                font-bold
                text-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D6B656]
                hover:shadow-[0_15px_40px_rgba(201,162,39,0.25)]
              "
            >
              <span>{cta}</span>

              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          CURVED BOTTOM
          ===================================================== */}

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">

        <svg
          className="relative block w-full h-[55px] md:h-[80px]"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          fill="none"
        >

          <path
            d="M0 65 C240 15 480 10 720 50 C960 90 1200 85 1440 25 V90 H0 Z"
            fill="#F8FAFC"
          />

          <path
            d="M0 65 C240 15 480 10 720 50 C960 90 1200 85 1440 25"
            stroke="#C9A227"
            strokeWidth="1"
            opacity="0.45"
          />

        </svg>

      </div>

    </section>
  );
}