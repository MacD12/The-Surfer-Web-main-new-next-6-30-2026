'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

const images = [
  '/f1.jpg',
  '/f2.jpg',
  '/f3.jpg',
  '/gallery-1.jpg',
  '/gallery-2.jpg',
  '/gallery-3.jpg',
];

const INSTAGRAM_URL = 'https://www.instagram.com/thesurfer_srilanka/';

type TileProps = {
  src: string;
  alt: string;
  index: number;
  wide?: boolean;
};

const Tile = ({ src, alt, index, wide = false }: TileProps) => (
  <motion.a
    href={INSTAGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={alt}
    className={`${
      wide ? 'col-span-2 aspect-[2/1]' : 'aspect-square'
    } group relative overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1`}
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      sizes={wide ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    />

    {/* Brand-blue gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a67b3]/85 via-[#0a67b3]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Instagram icon revealed on hover */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/40 shadow-lg">
        <Instagram className="w-6 h-6 text-white" strokeWidth={1.75} />
      </div>
    </div>
  </motion.a>
);

const MasonryGrid = () => {
  const { t } = useTranslation();
  const eyebrow = t('social.eyebrow');
  const heading = t('social.heading');
  const linkText = t('social.linkText');
  const aria = t('social.aria', { returnObjects: true }) as { section?: string };
  const alts =
    (t('social.galleryAlts', { returnObjects: true }) as string[]) || [];
  const fallbackAlt = (i: number) => t('social.defaultAlt', { index: i + 1 });

  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden"
      role="region"
      aria-label={aria?.section || heading}
    >
      {/* Soft brand glow accents */}
      <div
        className="absolute -top-32 -left-20 w-80 h-80 bg-cyan-300/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-20 w-80 h-80 bg-[#0a67b3]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center mb-10 sm:mb-12"
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
            className="mt-4 mb-7 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />

          {/* Instagram CTA pill */}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkText}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm font-semibold shadow-lg shadow-[#0a67b3]/25 hover:shadow-xl hover:shadow-[#0a67b3]/40 hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Instagram className="w-4 h-4" strokeWidth={2} />
            <span>{linkText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        {/* Gallery grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Tile src={images[0]} alt={alts[0] || fallbackAlt(0)} index={0} />
            <Tile src={images[1]} alt={alts[1] || fallbackAlt(1)} index={1} />
            <Tile src={images[2]} alt={alts[2] || fallbackAlt(2)} index={2} />
            <Tile src={images[3]} alt={alts[3] || fallbackAlt(3)} index={3} />
            <Tile src={images[4]} alt={alts[4] || fallbackAlt(4)} index={4} wide />
            <Tile src={images[5]} alt={alts[5] || fallbackAlt(5)} index={5} wide />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasonryGrid;
