'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';
import { useLocale } from 'next-intl';

type ReviewItem = {
  img?: string;
  name: string;
  date: string;
  description: string;
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatReviewDate(dateStr: string, locale: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  try {
    return new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
}

type ReviewCardProps = {
  review: ReviewItem;
  index: number;
  locale: string;
};

const ReviewCard = ({ review, index, locale }: ReviewCardProps) => (
  <motion.article
    className="group relative flex flex-col h-full bg-white rounded-2xl shadow-md ring-1 ring-black/5 p-6 sm:p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:ring-[#0a67b3]/20"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.25 }}
    role="article"
    aria-label={`Review by ${review.name}`}
  >
    {/* Decorative quote mark */}
    <Quote
      className="absolute top-5 right-5 w-10 h-10 text-[#0a67b3]/12 -scale-x-100"
      strokeWidth={1.5}
      aria-hidden="true"
    />

    {/* 5-star rating */}
    <div className="flex items-center gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 text-yellow-400 fill-yellow-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">5 out of 5 stars</span>
    </div>

    {/* Review body */}
    <p className="text-sm md:text-[15px] text-gray-700 leading-[1.7] line-clamp-6 mb-6">
      {review.description}
    </p>

    {/* Author footer */}
    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
      <div
        className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#0a67b3]/20"
        aria-hidden="true"
      >
        {getInitials(review.name)}
      </div>
      <div className="min-w-0">
        <p className="font-bold text-gray-800 text-sm md:text-base leading-tight">
          {review.name}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {formatReviewDate(review.date, locale)}
        </p>
      </div>
    </div>
  </motion.article>
);

const Reviews = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  const eyebrow = t('reviews1.eyebrow');
  const heading = t('reviews1.heading');
  const items = (t('reviews1.items', { returnObjects: true }) as ReviewItem[]) || [];
  const years = (t('reviews1.badges.years', { returnObjects: true }) as (number | string)[]) || [];
  const badgesHeading = t('reviews1.badges.heading');
  const badgeAlt = (y: number | string) => t('reviews1.badges.alt', { year: y });
  const googleKpi = t('reviews1.kpis.google');
  const taKpi = t('reviews1.kpis.tripadvisor');
  const awardNote = t('reviews1.awardNote');

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

          {/* Aggregate rating - visible social proof that mirrors the JSON-LD
              aggregateRating schema on this page (4.9 stars, 1600+ reviews).
              Rendering it in markup lets users see what crawlers see. */}
          <motion.div
            className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 rounded-2xl bg-white shadow-md ring-1 ring-black/5 px-4 sm:px-5 py-3"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <meta itemProp="ratingValue" content="4.9" />
            <meta itemProp="reviewCount" content="1600" />
            <meta itemProp="bestRating" content="5" />
            <span className="font-[montserrat] text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums leading-none">
              4.9
            </span>
            <span className="hidden sm:block h-7 w-px bg-gray-200" aria-hidden="true" />
            <div role="img" className="flex items-center gap-0.5" aria-label="4.9 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="hidden sm:block h-7 w-px bg-gray-200" aria-hidden="true" />
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              <span className="font-bold text-gray-800 tabular-nums">1,600+</span>
              <span className="ml-1">reviews · Google &amp; Tripadvisor</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Review cards - 4-up grid on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {items.map((review, idx) => (
            <ReviewCard
              key={`${review.name}-${review.date}`}
              review={review}
              index={idx}
              locale={locale}
            />
          ))}
        </div>

        {/* Awards & KPIs */}
        <div className="mt-14 sm:mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-center">
            {/* Tripadvisor badges */}
            <motion.div
              className="lg:col-span-2 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-5 tracking-tight">
                {badgesHeading}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {years.map((y) => (
                  <div
                    key={String(y)}
                    className="bg-white p-1 rounded-md shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:scale-105 hover:shadow-md hover:ring-[#0a67b3]/20"
                  >
                    <img
                      src={`/${y}.png`}
                      alt={badgeAlt(y)}
                      className="w-16 sm:w-20 md:w-24 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* KPI mini-cards */}
            <motion.div
              className="flex flex-col gap-4 max-w-sm w-full mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-white p-4 shadow-md rounded-2xl ring-1 ring-black/5 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-[#0a67b3]/20">
                <img
                  src="/google.png"
                  alt="Google"
                  className="w-10 h-10 drop-shadow-sm"
                  loading="lazy"
                  decoding="async"
                />
                <span className="font-bold text-base text-gray-800 leading-tight">
                  {googleKpi}
                </span>
              </div>
              <div className="bg-white p-4 shadow-md rounded-2xl ring-1 ring-black/5 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-[#0a67b3]/20">
                <img
                  src="/tripadvisor.png"
                  alt="Tripadvisor"
                  className="w-10 h-10 drop-shadow-sm"
                  loading="lazy"
                  decoding="async"
                />
                <span className="font-bold text-base text-gray-800 leading-tight">
                  {taKpi}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Award note */}
          <motion.p
            className="text-center text-sm md:text-base text-gray-600 mt-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {awardNote}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
