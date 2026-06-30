'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';
import { useLocale } from 'next-intl';

type ActivityCardProps = {
  src: string;
  title: string;
  href: string;
  index: number;
};

const ActivityCard = ({ src, title, href, index }: ActivityCardProps) => (
  <motion.a
    href={href}
    aria-label={title}
    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a67b3]/50"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <Image
      src={`/${src}`}
      alt={title}
      fill
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    />

    {/* Bottom gradient for title legibility (subtle on idle, deeper on hover) */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a67b3]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Arrow chip - top-right, only on hover */}
    <div className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/40 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
      <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2} />
    </div>

    {/* Title at the bottom-left */}
    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
      <h3 className="text-white text-lg md:text-xl font-bold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
        {title}
      </h3>
      <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] font-semibold text-white/85">
        <span className="relative">
          Explore
          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 group-hover:w-full bg-white transition-all duration-500 ease-out" />
        </span>
        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </motion.a>
);

const Activities = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  const eyebrow = t('activities1.eyebrow');
  const heading = t('activities1.heading');
  const subtitle = t('activities1.subtitle');
  const viewAll = t('activities1.viewAll');
  const titles = (t('activities1.titles', { returnObjects: true }) as string[]) || [];
  const aria = t('activities1.aria', { returnObjects: true }) as { section?: string };

  const pics = ['act1.jpg', 'activities/acti-5.jpg', 'act3.jpg', 'boat.jpg'];

  const cards = pics.map((pic, i) => ({
    pic,
    title: titles[i] || '',
  }));

  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden"
      role="region"
      aria-label={aria?.section || heading}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center mb-12 sm:mb-14 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            {heading}
          </h2>
          <motion.div
            className="mt-4 mb-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cards.map((c, idx) => (
            <ActivityCard
              key={idx}
              src={c.pic}
              title={c.title}
              href={`/${locale}/activities`}
              index={idx}
            />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          className="flex justify-center mt-12 sm:mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <a
            href={`/${locale}/activities`}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0a67b3]/40 text-[#0a67b3] font-semibold hover:bg-[#0a67b3] hover:text-white hover:shadow-md hover:shadow-[#0a67b3]/20 transition-all duration-300"
          >
            {viewAll}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;
