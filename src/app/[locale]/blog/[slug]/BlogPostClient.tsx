'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLocale } from 'next-intl';
import { useTranslation } from '@/lib/i18n-compat';
import type { BlogPost } from '@/data/blogs';
import { slugify } from '@/data/blogs';

function parseDateCategory(raw: string | undefined): { date: string; category: string } {
  const fallback = { date: '27 June 2023', category: 'Surfing' };
  if (!raw) return fallback;
  const [date, category] = raw.split('/').map((s) => s.trim());
  return { date: date || fallback.date, category: category || fallback.category };
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

type ParsedBlock =
  | { type: 'h3'; text: string; id: string }
  | { type: 'p'; text: string };

// Parse the source content into typographic blocks. Short, single-line,
// unpunctuated blocks become section headings (with stable, unique ids
// for in-page anchor navigation); everything else is a paragraph.
function parseContent(content: string): ParsedBlock[] {
  const seenIds = new Map<string, number>();
  return content
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map<ParsedBlock>((block) => {
      const isSingleLine = !block.includes('\n');
      const last = block.slice(-1);
      const isShort = block.length <= 90;
      const looksLikeHeading = !['.', ',', ';', ':'].includes(last);
      if (isSingleLine && isShort && looksLikeHeading) {
        const base = slugify(block) || 'section';
        const seen = seenIds.get(base) ?? 0;
        seenIds.set(base, seen + 1);
        const id = seen === 0 ? base : `${base}-${seen + 1}`;
        return { type: 'h3', text: block, id };
      }
      return { type: 'p', text: block };
    });
}

// Track which heading is currently in view to highlight the matching TOC item.
function useActiveHeading(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (ids.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -65% 0px', threshold: [0, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export default function BlogPostClient({
  blog,
  allBlogs,
}: {
  blog: BlogPost;
  allBlogs: BlogPost[];
}) {
  const locale = useLocale();
  const { t } = useTranslation();
  const { date, category } = parseDateCategory(blog.date);
  const readingTime = estimateReadingTime(blog.content);
  const blocks = useMemo(() => parseContent(blog.content), [blog.content]);
  const headings = useMemo(
    () =>
      blocks.filter(
        (b): b is { type: 'h3'; text: string; id: string } => b.type === 'h3'
      ),
    [blocks]
  );
  const headingIds = useMemo(() => headings.map((h) => h.id), [headings]);
  const activeId = useActiveHeading(headingIds);

  // Three other posts to show as "Keep reading".
  const related = useMemo(
    () => allBlogs.filter((p) => p.id !== blog.id).slice(0, 3),
    [allBlogs, blog.id]
  );

  return (
    <div className="bg-gradient-to-b from-white via-cyan-50/30 to-white">
      {/* HERO - uses the blog's own image as background */}
      <div
        className="relative min-h-screen bg-cover bg-center flex items-end w-full overflow-hidden"
        style={{ backgroundImage: `url('${blog.image}')` }}
        id="Header"
      >
        <Navbar />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/40 to-black/75 pointer-events-none" />

        <div className="container relative mx-auto py-4 px-4 sm:px-6 md:px-20 lg:px-32 text-white pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <a
              href={`/${locale}/blogs`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white transition-colors mb-6 mt-20"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Blogs
            </a>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold rounded-full px-3 py-1 bg-white/95 text-[#0a67b3] shadow-sm mb-5"
          >
            <Tag className="w-3 h-3" />
            {category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-[montserrat] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-4xl leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            {blog.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/85"
          >
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readingTime} min read
            </span>
          </motion.div>
        </div>
      </div>

      {/* CONTENT - 3-column grid uses the empty side space at lg+ */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-10 md:mt-12 lg:mt-16 mb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_240px] gap-8 lg:gap-12 items-start">
          {/* LEFT - Table of Contents */}
          <aside className="hidden lg:block">
            {headings.length > 0 && (
              <div className="sticky top-24">
                <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#0a67b3] mb-4">
                  On this page
                </p>
                <nav aria-label="Table of contents">
                  <ul className="space-y-1 border-l-2 border-gray-200">
                    {headings.map((h) => {
                      const isActive = activeId === h.id;
                      return (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className={`block pl-4 -ml-[2px] py-1.5 border-l-2 text-sm transition-colors duration-200 ${
                              isActive
                                ? 'border-[#0a67b3] text-[#0a67b3] font-semibold'
                                : 'border-transparent text-gray-500 hover:text-[#0a67b3] hover:border-[#0a67b3]/40'
                            }`}
                          >
                            {h.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            )}
          </aside>

          {/* CENTER - Article */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden max-w-3xl mx-auto w-full lg:mx-0"
          >
            <div className="p-6 md:p-12 lg:p-14">
              {blocks.map((b, i) => {
                if (b.type === 'h3') {
                  return (
                    <h3
                      key={i}
                      id={b.id}
                      className="text-[#0a67b3] font-bold text-xl md:text-2xl mt-10 first:mt-0 mb-4 leading-tight scroll-mt-24"
                    >
                      {b.text}
                    </h3>
                  );
                }
                const firstPIndex = blocks.findIndex((x) => x.type === 'p');
                const isLead = i === firstPIndex;
                return (
                  <p
                    key={i}
                    className={`text-gray-700 leading-[1.85] mb-5 ${
                      isLead
                        ? 'text-lg md:text-xl text-gray-800 first-letter:text-5xl first-letter:font-bold first-letter:text-[#0a67b3] first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:mt-1'
                        : ''
                    }`}
                  >
                    {b.text}
                  </p>
                );
              })}
            </div>

            {/* Inline CTA */}
            <div className="bg-gradient-to-br from-[#0a67b3] to-[#094f86] text-white p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] font-semibold text-white/75 mb-2">
                    Ready to ride?
                  </p>
                  <h4 className="font-bold text-xl md:text-2xl leading-snug">
                    Book your surf experience with The Surfer
                  </h4>
                </div>
                <a
                  href="/book-now"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 self-start md:self-auto px-6 py-3 rounded-full bg-white text-[#0a67b3] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                >
                  {t('navbar.bookNow', 'BOOK NOW')}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.article>

          {/* RIGHT - Related posts */}
          <aside className="hidden lg:block">
            {related.length > 0 && (
              <div className="sticky top-24">
                <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#0a67b3] mb-4">
                  Keep reading
                </p>
                <ul className="space-y-5">
                  {related.map((p) => (
                    <li key={p.id}>
                      <a
                        href={`/${locale}/blog/${slugify(p.title)}`}
                        className="group block"
                      >
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2.5 ring-1 ring-black/5">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <h4 className="text-[13px] font-semibold leading-snug text-gray-800 group-hover:text-[#0a67b3] transition-colors line-clamp-2">
                          {p.title}
                        </h4>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* Bottom back link */}
        <div className="mt-10 flex justify-center">
          <a
            href={`/${locale}/blogs`}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0a67b3]/40 text-[#0a67b3] font-semibold hover:bg-[#0a67b3] hover:text-white hover:shadow-md transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all blogs
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
