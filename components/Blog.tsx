'use client';
import { blogPosts } from '@/data/portfolio';
import { useEffect, useRef } from 'react';

export default function Blog() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="blog" className="py-28" style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)' }} ref={ref} aria-label="Blog section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="badge-label mb-4">Insights & Knowledge</div>
            <h2 className="font-display text-4xl xl:text-5xl text-[#050d1a]">
              Latest <span className="text-gradient">Financial Insights</span>
            </h2>
          </div>
          <a href="#" className="shrink-0 text-[#050d1a] border border-slate-300 hover:border-[#050d1a] font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
            View All Articles →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <article key={post.id} className={`reveal d${i + 1} blog-card bg-white group`}>
              {/* Thumbnail */}
              <div className={`bg-gradient-to-br ${post.bgGradient} h-52 relative overflow-hidden flex items-end`}>
                <span className="absolute top-5 left-5 text-[0.72rem] font-bold text-white bg-white/12 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/15">
                  {post.tag}
                </span>
                <svg viewBox="0 0 280 120" className="w-full opacity-40 absolute inset-0" fill="none" aria-hidden="true">
                  <polyline points="20,95 60,65 100,78 140,38 180,55 240,15" stroke="#c9a84c" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="20,95 60,65 100,78 140,38 180,55 240,15 240,120 20,120" fill="url(#blg)" strokeWidth="0"/>
                  <defs>
                    <linearGradient id={`blg${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#c9a84c" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
                {/* Read time badge */}
                <div className="absolute bottom-4 right-4 bg-[#050d1a]/70 backdrop-blur-sm text-white/70 text-[0.68rem] font-semibold px-2.5 py-1 rounded-lg">
                  {post.readTime}
                </div>
              </div>
              {/* Body */}
              <div className="p-7">
                <div className="flex items-center gap-3 text-slate-400 text-[0.75rem] mb-4">
                  <span className="flex items-center gap-1.5">📅 {post.date}</span>
                </div>
                <h3 className="font-semibold text-[#050d1a] text-[0.97rem] leading-snug mb-3 group-hover:text-[#0a1628] transition-colors">{post.title}</h3>
                <p className="text-slate-400 text-[0.83rem] leading-relaxed mb-5">{post.excerpt}</p>
                <a href="#" className="flex items-center gap-2 text-[#0d9488] hover:text-[#c9a84c] text-sm font-bold transition-colors">
                  Read Article
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
