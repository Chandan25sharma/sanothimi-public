'use client';

import { Himalaya } from '@/components/BgDecorations';
import CTABanner from '@/components/CTABanner';
import { useState, type FormEvent } from 'react';

const CATEGORIES = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'technology',
    label: 'Technology',
  },
  {
    id: 'education',
    label: 'Education',
  },
  {
    id: 'digital-transformation',
    label: 'Digital Transformation',
  },
  {
    id: 'company',
    label: 'Company',
  },
];

const ARTICLES = [
  {
    category: 'Technology',
    categoryId: 'technology',
    date: 'Coming Soon',
    read: '5 min read',
    title: 'Building smarter digital systems for modern organizations.',
    desc: 'A look at how connected systems, automation, and better data can simplify everyday operations.',
    featured: true,
    number: '01',
    image: '/insights/story-01.jpg',
  },
  {
    category: 'Education',
    categoryId: 'education',
    date: 'Coming Soon',
    read: '6 min read',
    title: 'What modern schools need from their technology.',
    desc: 'Beyond digitization: creating systems that actually improve the experience for administrators, teachers, students, and parents.',
    featured: false,
    number: '02',
    image: '/insights/story-02.jpg',
  },
  {
    category: 'Digital Transformation',
    categoryId: 'digital-transformation',
    date: 'Coming Soon',
    read: '7 min read',
    title: 'From disconnected tools to one connected operation.',
    desc: 'Why organizations are moving toward unified platforms instead of relying on isolated spreadsheets and applications.',
    featured: false,
    number: '03',
    image: '/insights/story-03.jpg',
  },
  {
    category: 'Technology',
    categoryId: 'technology',
    date: 'Coming Soon',
    read: '5 min read',
    title: 'Why good software should feel simple.',
    desc: 'The best enterprise software does not add complexity. It removes it.',
    featured: false,
    number: '04',
    image: '/insights/story-04.jpg',
  },
  {
    category: 'Company',
    categoryId: 'company',
    date: 'Coming Soon',
    read: '4 min read',
    title: 'Building technology with a regional perspective.',
    desc: 'Our approach to creating practical technology for organizations across Nepal and beyond.',
    featured: false,
    number: '05',
    image: '/insights/story-05.jpg',
  },
  {
    category: 'Education',
    categoryId: 'education',
    date: 'Coming Soon',
    read: '6 min read',
    title: 'The next generation of digital education management.',
    desc: 'How better information flows can help institutions make faster and more informed decisions.',
    featured: false,
    number: '06',
    image: '/insights/story-06.jpg',
  },
];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();

    if (email) {
      setSubscribed(true);
    }
  };

  const filteredArticles =
    activeCategory === 'all'
      ? ARTICLES
      : ARTICLES.filter((article) => article.categoryId === activeCategory);

  const featuredArticle = ARTICLES[0];

  return (
    <main className="overflow-hidden bg-white">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-[520px] flex items-end bg-[#F8FAFC] overflow-hidden">

   

        {/* Large decorative circle */}
        <div className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full border border-[#155EEF]/10" />
        <div className="absolute -right-20 -top-20 w-[440px] h-[440px] rounded-full border border-[#155EEF]/10" />

        {/* Blue glow */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#155EEF]/5 blur-[120px] rounded-full" />
        <Himalaya className="absolute bottom-0 left-0 w-full text-[#0B1F3A] opacity-[0.14]" />
        
        <div className="max-w-7xl w-full mx-auto px-6 relative z-10 pt-20 pb-18">

          <div className="max-w-4xl">

            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-black" />

              <span className="text-black text-[.65rem] font-black uppercase tracking-[.35em]">
                Insights & Resources
              </span>
            </div>

            <h1 className="font-serif text-[3.4rem] sm:text-4xl md:text-6xl leading-[.95] tracking-[-0.04em]">
              Ideas that move
              <br />

              <span className="italic text-green-800">
                technology forward.
              </span>
            </h1>

            <div className="mt-10 max-w-2xl flex flex-col md:flex-row md:items-end gap-8">

              <p className="text-[#64748B] text-base md:text-lg leading-relaxed">
                Perspectives, stories, product thinking, and practical ideas
                about technology, education, and digital transformation.
              </p>

              <div className="hidden md:block flex-shrink-0">
                <div className="font-serif text-5xl text-[#0B1F3A]/10">
                  01
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom editorial label */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#0B1F3A]/[0.06]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <span className="text-[.58rem] font-black uppercase tracking-[.3em] text-[#64748B]">
              Sanothimi Insights
            </span>

            <span className="text-[.58rem] font-bold uppercase tracking-[.2em] text-[#64748B]">
              Ideas · Research · Stories
            </span>

          </div>
        </div>

      </section>


      {/* =========================================================
          FEATURED STORY
      ========================================================= */}
{/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    FEATURED INSIGHT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
<section
  id="featured"
  className="py-18 md:py-26 bg-white scroll-mt-28"
>
  <div className="max-w-7xl mx-auto px-6">

    {/* Section heading */}
    <div className="flex items-end justify-between mb-12 md:mb-14">

      <div>
        <div className="section-kicker mb-6">
          <span className="section-kicker-line" />
          Featured
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-[#0B1F3A] leading-[1.1] tracking-tight">
          Worth
          <span className="italic text-green-800"> reading.</span>
        </h2>
      </div>

      <div className="hidden md:flex items-center gap-3 pb-2">
        <span className="w-8 h-px bg-gray-200" />

        <span className="text-[.62rem] font-black uppercase tracking-[.25em] text-gray-300">
          Latest perspective
        </span>
      </div>

    </div>


    {/* Featured article */}
    <article
      className="group grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] min-h-[560px] overflow-hidden border border-[#0B1F3A]/[0.08] bg-white shadow-[0_20px_70px_rgba(11,31,58,0.06)] transition-shadow duration-700 hover:shadow-[0_30px_90px_rgba(11,31,58,0.10)]"
    >

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LEFT — EDITORIAL IMAGE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative min-h-[400px] lg:min-h-full overflow-hidden bg-[#DCE5EF]">

        {/* Main image */}
        <img
          src="/insights/featured-01.jpg"
          alt={featuredArticle.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
        />

        {/* Soft navy cinematic gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/15 to-transparent"
        />

        {/* Very subtle blue brand wash */}
        <div className="absolute inset-0 bg-[#155EEF]/[0.04] mix-blend-multiply" />

        {/* Subtle technical grid */}
        <div
          className="absolute inset-0 opacity-[0.055] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px',
          }}
        />

        {/* Top editorial number */}
        <div className="absolute top-8 left-8 md:top-10 md:left-10">

          <div className="flex items-center gap-3">

            <span className="font-serif text-3xl md:text-4xl text-white/85 leading-none">
              01
            </span>

            <span className="w-8 h-px bg-[#12B76A]" />

          </div>

        </div>


        {/* Bottom image information */}
        <div className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10 md:right-10">

          <div className="flex items-end justify-between gap-6">

            <div>

              <div className="text-[.58rem] font-black uppercase tracking-[.3em] text-[#12B76A] mb-2">
                Featured Insight
              </div>

              <div className="text-white/65 text-xs tracking-wide">
                {featuredArticle.category}
              </div>

            </div>


            {/* Minimal arrow */}
            <div
              className="flex-shrink-0 w-11 h-11 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:bg-black/10"
            >

              <svg
                className="w-4 h-4 text-white transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M8 7h9v9"
                />
              </svg>

            </div>

          </div>

        </div>

      </div>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RIGHT — ARTICLE CONTENT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="p-10 md:p-14 lg:p-16 xl:p-20 flex flex-col justify-center">

        {/* Category / read time */}
        <div className="flex items-center gap-4 mb-8">

          <span className="text-[.62rem] font-black uppercase tracking-[.25em] text-green-400">
            {featuredArticle.category}
          </span>

          <span className="w-1 h-1 rounded-full bg-gray-300" />

          <span className="text-[.62rem] font-bold uppercase tracking-[.2em] text-gray-400">
            {featuredArticle.read}
          </span>

        </div>


        {/* Title */}
        <h3
          className="font-serif text-3xl md:text-4xl lg:text-[3.15rem] text-[#0B1F3A] leading-[1.08] tracking-[-0.025em] max-w-[620px] mb-7 transition-colors duration-500"
        >
          {featuredArticle.title}
        </h3>


        {/* Description */}
        <p
          className="text-[#64748B] text-[.95rem] md:text-base leading-[1.8] max-w-[570px] mb-10"
        >
          {featuredArticle.desc}
        </p>


        {/* Bottom metadata */}
        <div className="flex items-center justify-between gap-6 pt-7 border-t border-gray-100">

          <div className="flex items-center gap-3">

            

            <span className="text-[.62rem] font-black uppercase tracking-[.25em] text-[#0B1F3A]">
              Coming Soon
            </span>

          </div>


          <div className="hidden sm:flex items-center gap-2 text-gray-300">

            <span className="text-[.6rem] font-bold uppercase tracking-[.2em]">
              Insight
            </span>

            <span className="w-6 h-px bg-gray-200" />

            <span className="font-serif text-sm">
              01
            </span>

          </div>

        </div>

      </div>

    </article>

  </div>
</section>

      {/* =========================================================
          CATEGORY NAVIGATION
      ========================================================= */}

      <section className="border-y border-gray-100 bg-[#F8FAFC]">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col lg:flex-row lg:items-center gap-8 py-8">

            <div className="flex-shrink-0">

              <span className="text-[.6rem] font-black uppercase tracking-[.3em] text-[#0B1F3A]">
                Explore
              </span>

            </div>

            <div className="flex flex-wrap gap-2">

              {CATEGORIES.map((category) => (

                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-5 py-2.5 rounded-full text-[.65rem] font-bold uppercase tracking-[.12em]
                    transition-all duration-300
                    ${
                      activeCategory === category.id
                        ? 'bg-[#0B1F3A] text-white shadow-lg shadow-[#0B1F3A]/10'
                        : 'bg-white text-[#64748B] border border-gray-200 hover:border-[#155EEF]/30 hover:text-[#155EEF]'
                    }
                  `}
                >
                  {category.label}
                </button>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          ARTICLE GRID
      ========================================================= */}

      <section className="py-28 md:py-36 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-end justify-between mb-14">

            <div>

              <div className="section-kicker mb-6">
                <span className="section-kicker-line" />
                Latest Thinking
              </div>

              <h2 className="font-serif text-4xl md:text-5xl text-[#0B1F3A]">
                Explore our
                <span className="italic text-green-400"> ideas.</span>
              </h2>

            </div>

            <div className="hidden md:block text-sm text-[#94A3B8]">
              {filteredArticles.length} stories
            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">

            {filteredArticles.map((article) => (

              <article
                key={article.number}
                className="group bg-white min-h-[470px] flex flex-col relative overflow-hidden hover:bg-[#F8FAFC] transition-colors duration-500"
              >

                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-[#0B1F3A]">
                  <img
                    src={article.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0B1F3A]/10 group-hover:bg-[#0B1F3A]/0 transition-colors duration-500" />
                </div>


                <div className="p-8 md:p-10 flex flex-col flex-1 relative">

                  {/* Number */}
                  <div className="absolute top-6 right-7 font-serif text-5xl text-[#0B1F3A]/[0.045] group-hover:text-[#155EEF]/10 transition-colors">
                    {article.number}
                  </div>


                  <div className="flex items-center gap-3 mb-8">

                    <span className="text-[.58rem] font-black uppercase tracking-[.25em] text-green-900">
                      {article.category}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-gray-300" />

                    <span className="text-[.58rem] font-bold uppercase tracking-[.18em] text-gray-400">
                      {article.date}
                    </span>

                  </div>


                  <div className="mt-auto">

                    <h3 className="font-serif text-2xl md:text-[1.7rem] text-[#0B1F3A] leading-[1.15] mb-5 group-hover:text-green-600 transition-colors duration-500">
                      {article.title}
                    </h3>

                    <p className="text-[#64748B] text-sm leading-relaxed mb-8">
                      {article.desc}
                    </p>

                    <div className="flex items-center justify-between">

                      <span className="text-[.58rem] font-black uppercase tracking-[.2em] text-gray-400">
                        {article.read}
                      </span>

                      <span className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#155EEF] group-hover:border-[#155EEF] transition-all duration-300">

                        <svg
                          className="w-3.5 h-3.5 text-[#0B1F3A] group-hover:text-white group-hover:translate-x-0.5 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14m-6-6l6 6-6 6"
                          />
                        </svg>

                      </span>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          RESOURCES / DOWNLOADS
      ========================================================= */}

      <section className="py-28 md:py-36 bg-[#F8FAFC] border-y border-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <div>

              <div className="section-kicker mb-7">
                <span className="section-kicker-line" />
                Resources
              </div>

              <h2 className="font-serif text-4xl md:text-4xl text-[#0B1F3A] leading-[1.1] mb-7">
                Useful information,
                <br />
                <span className="italic text-green-800">
                  when you need it.
                </span>
              </h2>

              <p className="text-[#64748B] max-w-lg leading-relaxed">
                Explore practical resources, product information, and
                materials designed to help organizations understand what
                modern technology can do for them.
              </p>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="group p-7 bg-white border border-gray-100 hover:border-[#155EEF]/20 hover:shadow-xl hover:shadow-[#155EEF]/5 transition-all duration-500">

                <div className="flex justify-between items-start mb-14">

                  <div className="w-11 h-11 rounded-xl bg-[#155EEF]/[0.07] flex items-center justify-center">

                    <svg
                      className="w-5 h-5 text-[#155EEF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>

                  </div>

                  <span className="text-[.55rem] font-black uppercase tracking-[.2em] text-gray-300">
                    Soon
                  </span>

                </div>

                <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">
                  Product Brochures
                </h3>

                <p className="text-[#64748B] text-sm leading-relaxed">
                  Product overviews and capabilities.
                </p>

              </div>


              <div className="group p-7 bg-[#0B1F3A] hover:shadow-xl hover:shadow-[#0B1F3A]/10 transition-all duration-500">

                <div className="flex justify-between items-start mb-14">

                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">

                    <svg
                      className="w-5 h-5 text-[#12B76A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>

                  </div>

                  <span className="text-[.55rem] font-black uppercase tracking-[.2em] text-white/30">
                    Soon
                  </span>

                </div>

                <h3 className="font-serif text-xl text-white mb-2">
                  Events & Webinars
                </h3>

                <p className="text-white/40 text-sm leading-relaxed">
                  Sessions, workshops, and community events.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          NEWSLETTER
      ========================================================= */}

      <section className="relative py-28 md:py-36 bg-white overflow-hidden">

        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#155EEF]/[0.06]" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">

          <div className="section-kicker justify-center mb-7">
            <span className="section-kicker-line" />
            Stay Informed
            <span className="section-kicker-line" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-[#0B1F3A] leading-[1.1] mb-6">
            Good ideas,
            <br />
            <span className="italic text-green-800">
              delivered occasionally.
            </span>
          </h2>

          <p className="text-[#64748B] max-w-md mx-auto leading-relaxed mb-10">
            Get product updates, new insights, and useful perspectives
            from Sanothimi. No unnecessary noise.
          </p>


          {subscribed ? (

            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-semibold">

              <span className="w-6 h-6 rounded-full bg-[#12B76A] text-white flex items-center justify-center">

                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>

              </span>

              You&apos;re on the list.

            </div>

          ) : (

            <form
              onSubmit={handleSubscribe}
              className="max-w-lg mx-auto"
            >

              <div className="flex flex-col sm:flex-row gap-3">

                <input
                  type="email"
                  required
                  placeholder="Your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-gray-200 rounded-full px-6 py-4 text-sm text-[#0B1F3A] placeholder:text-gray-400 outline-none focus:border-[#155EEF] transition-all"
                />

                <button
                  type="submit"
                  className="bg-[#0B1F3A] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#155EEF] transition-all duration-300"
                >
                  Subscribe
                </button>

              </div>

              <p className="text-[.65rem] text-gray-400 mt-4">
                We respect your inbox. Unsubscribe anytime.
              </p>

            </form>

          )}

        </div>

      </section>


      {/* =========================================================
          CTA
      ========================================================= */}

      <CTABanner
        title={'Want to see what\nwe are building?'}
        sub="Explore our products or talk to our team about your organization."
        cta="Explore Our Services"
        ctaHref="/services"
      />

    </main>
  );
}