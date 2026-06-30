'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';
import { useLocale } from 'next-intl';

type BlogItem = {
  img: string;
  title: string;
  href: string;
  ariaLabel?: string;
  alt?: string;
};

// Locale-prefix internal hrefs. The i18n stores canonical `/blog/<slug>`;
// rendered as `/<locale>/blog/<slug>` so the browser hits SSG directly.
function resolveHref(href: string | undefined, locale: string): string {
  if (!href) return '#';
  if (!href.startsWith('/')) return href;
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;
  return `/${locale}${href}`;
}

type BlogCardProps = {
  item: BlogItem;
  index: number;
  locale: string;
  category: string;
  readMore: string;
};

const BlogCard = ({ item, index, locale, category, readMore }: BlogCardProps) => {
  const href = resolveHref(item.href, locale);
  const isExternal = !href.startsWith('/');
  return (
    <motion.article
      className="group relative h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={item.ariaLabel}
        className="relative flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl"
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={item.img}
            alt={item.alt || item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
          <span className="absolute top-3 left-3 inline-flex items-center text-[10px] uppercase tracking-[0.18em] font-semibold rounded-full px-3 py-1 bg-white/95 text-[#0a67b3] shadow-sm">
            {category}
          </span>
        </div>
        <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
          <h3 className="font-bold text-base md:text-lg leading-snug text-gray-800 line-clamp-2 group-hover:text-[#0a67b3] transition-colors">
            {item.title}
          </h3>
          <span className="mt-auto pt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#0a67b3]">
            <span className="relative">
              {readMore}
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 group-hover:w-full bg-[#0a67b3] transition-all duration-500 ease-out" />
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
          </span>
        </div>
      </a>
    </motion.article>
  );
};

type ViewAllCardProps = {
  locale: string;
  viewAll: string;
  eyebrow: string;
};

// Brand-blue CTA card that completes the 6-cell grid in place of a standalone button.
const ViewAllCard = ({ locale, viewAll, eyebrow }: ViewAllCardProps) => (
  <motion.article
    className="group relative h-full min-h-[320px] sm:min-h-0"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: 0.24, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.25 }}
  >
    <a
      href={`/${locale}/blogs`}
      className="relative flex flex-col items-center justify-center text-center h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a67b3] via-[#0c75c9] to-[#072f56] text-white p-8 shadow-md ring-1 ring-black/5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl"
    >
      {/* Soft cyan glow accent */}
      <div
        className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      {/* Decorative wave silhouette */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-1/2 opacity-[0.12] pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 200 100"
        aria-hidden="true"
      >
        <path
          d="M0 55 C 50 85, 100 25, 200 55 L200 100 L0 100 Z"
          fill="white"
        />
        <path
          d="M0 70 C 50 95, 100 40, 200 70 L200 100 L0 100 Z"
          fill="white"
          opacity="0.5"
        />
      </svg>

      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-500">
          <ArrowRight className="w-7 h-7 transition-transform duration-500 group-hover:translate-x-1" />
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-cyan-200 mb-3">
          {eyebrow}
        </p>
        <h3 className="font-bold text-xl md:text-2xl leading-tight max-w-[14ch]">
          {viewAll}
        </h3>
      </div>
    </a>
  </motion.article>
);

const Blogs = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const items = (t('blogs.items', { returnObjects: true }) as BlogItem[]) || [];
  const heading = t('blogs.heading');
  const eyebrow = t('blogs.eyebrow');
  const viewAll = t('blogs.viewAll');
  const readMore = t('blogs.readMore');
  const category = t('blogs.category');

  // 5 blog cards + 1 View-All CTA card = uniform 3x2 grid at lg
  const visibleItems = items.slice(0, 5);

  return (
    <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center leading-tight">
            {heading}
          </h2>
          <motion.div
            className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </motion.div>

        {/* Uniform 3-col grid: 5 blog cards + 1 View-All card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 max-w-6xl mx-auto">
          {visibleItems.map((item, idx) => (
            <BlogCard
              key={idx}
              item={item}
              index={idx}
              locale={locale}
              category={category}
              readMore={readMore}
            />
          ))}
          <ViewAllCard locale={locale} viewAll={viewAll} eyebrow={eyebrow} />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
