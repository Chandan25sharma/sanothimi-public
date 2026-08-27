'use client';
import CTABanner from '@/components/CTABanner';
import ServiceAudiences, { type ServiceAudience } from '@/components/ServiceAudiences';
import ServiceHero from '@/components/ServiceHero';
import ServiceImplementation, { type ServiceImplementationStep } from '@/components/ServiceImplementation';
import ServiceModules, { type ServiceModule } from '@/components/ServiceModules';
import ServiceProblem, { type ServiceProblemData } from '@/components/ServiceProblem';
import ServiceProductShowcase from '@/components/ServiceProductShowcase';
import ServiceReliability from '@/components/ServiceReliability';
import ServiceWorkflow, { type ServiceWorkflowStep } from '@/components/ServiceWorkflow';
import type { TranslationKey } from '@/lib/translations';
import { useEffect, useRef, type ReactNode } from 'react';

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.09 }
    );
    ref.current?.querySelectorAll('.rs').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export interface ServiceCapability {
  title: string;
  desc: string;
}

export interface ServicePageData {
  category: string;
  status: 'live' | 'soon' | null;
  icon: ReactNode;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  highlights: string[];
  capabilities: ServiceCapability[];
  panelKicker: string;
  panelTitle: string;
  panelDesc: string;
  ctaTitle: string;
  ctaSub: string;

  // Optional, service-specific storytelling — supply what fits, skip what doesn't.
  heroImage?: string;
  problem?: ServiceProblemData;
  showcaseImage?: string;
  showcaseLabel?: string;
  modules?: ServiceModule[];
  workflow?: ServiceWorkflowStep[];
  audiences?: ServiceAudience[];
  reliability?: string[];
  implementation?: ServiceImplementationStep[];
}

export default function ServicePageLayout({ data }: { data: ServicePageData }) {
  const s1 = useReveal();
  const s2 = useReveal();

  return (
    <main>

      {/* 01. HERO */}
      <ServiceHero
        category={data.category}
        status={data.status}
        icon={data.icon}
        titleKey={data.titleKey}
        descKey={data.descKey}
        highlights={data.highlights}
        heroImage={data.heroImage}
      />

      {/* 02. THE PROBLEM */}
      {data.problem && <ServiceProblem data={data.problem} />}

      {/* 03. PRODUCT SHOWCASE */}
      {data.showcaseImage && <ServiceProductShowcase image={data.showcaseImage} label={data.showcaseLabel} />}

      {/* 04. CORE MODULES (editorial) — falls back to the capability grid when not supplied */}
      {data.modules ? (
        <ServiceModules modules={data.modules} />
      ) : (
        <section ref={s1 as React.RefObject<HTMLDivElement>} className="py-28 md:py-32 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <div className="rs section-kicker mb-8">
                <span className="section-kicker-line" />
                What&apos;s Included
              </div>
              <h2 className="rs d1 font-serif text-4xl md:text-5xl text-[#0B1F3A] leading-[1.2]">
                Built for how your <span className="italic text-[#155EEF]">team actually works.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.capabilities.map((c, i) => (
                <div
                  key={c.title}
                  className={`rs d${i + 1} group relative min-h-[220px] overflow-hidden bg-white border border-[#0B1F3A]/[0.07] p-8 transition-all duration-700 shadow-[0_10px_40px_rgba(11,31,58,0.035)] hover:shadow-[0_25px_60px_rgba(21,94,239,0.12)]`}
                >
                  <div className="absolute -right-3 -top-6 font-serif text-[6rem] font-bold leading-none text-[#0B1F3A]/[0.04] transition-all duration-700 group-hover:scale-110">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="relative">
                    <div className="text-[.58rem] font-black uppercase tracking-[.3em] text-[#155EEF] mb-4">
                      Capability {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-serif font-bold text-[1.15rem] text-[#0B1F3A] mb-3 leading-tight group-hover:text-[#155EEF] transition-colors duration-500">
                      {c.title}
                    </h3>
                    <p className="text-[#6B7280] text-[.82rem] leading-relaxed">{c.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#12B76A] via-[#155EEF] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 05. HOW IT CONNECTS */}
      {data.workflow && <ServiceWorkflow steps={data.workflow} />}

      {/* 06. WHO USES IT */}
      {data.audiences && <ServiceAudiences audiences={data.audiences} />}

      {/* 07. SECURITY / RELIABILITY */}
      {data.reliability && <ServiceReliability items={data.reliability} />}

      {/* 08. WHY IT MATTERS PANEL */}
      <section ref={s2 as React.RefObject<HTMLDivElement>} className="py-18 md:py-17 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rs relative rounded-[2.5rem] bg-[#0B1F3A] overflow-hidden p-12 md:p-16 lg:p-20 text-center">
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#155EEF]/10 blur-[100px]" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#12B76A]/10 blur-[100px]" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="text-white text-[.7rem] font-black uppercase tracking-[.3em] mb-6">
                {data.panelKicker}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-green-800 leading-[1.2] mb-6">
                {data.panelTitle}
              </h3>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                {data.panelDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 09. IMPLEMENTATION */}
      {data.implementation && <ServiceImplementation steps={data.implementation} />}

      {/* 10. CTA */}
      <CTABanner title={data.ctaTitle} sub={data.ctaSub} cta="Get Started" />
    </main>
  );
}
