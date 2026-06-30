'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

const GALLERY = [
  { src: '/ts2_camp/restaurant.jpg', tag: 'Open-Air', altKey: 'rooftop' as const },
  { src: '/ts2_camp/carrom.jpg', tag: 'Play Area', altKey: 'playarea' as const },
  { src: '/ts2_camp/building.jpg', tag: 'Camp Building', altKey: 'building' as const },
];

const ImageCard = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative py-12 sm:py-14 md:py-16 bg-white overflow-hidden"
      aria-label={t('ts2Gallery.aria.section')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Eyebrow */}
        <motion.div
          className="flex flex-col items-center mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold text-[#0a67b3]">
            <Camera className="w-3.5 h-3.5" strokeWidth={2.5} />
            Inside The Camp
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center text-gray-900 leading-tight"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          A quieter side of Weligama
        </motion.h2>

        {/* Accent bar */}
        <motion.div
          className="mt-4 mb-10 sm:mb-12 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="block h-[3px] w-14 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
        </motion.div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {GALLERY.map((img, i) => {
            const alt = t(`ts2Gallery.alt.${img.altKey}`);
            return (
              <motion.div
                key={img.src}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-100 shadow-md hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-[0.18em] uppercase text-gray-800 ring-1 ring-black/5 shadow-sm">
                    <span className="block w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    {img.tag}
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 text-white text-sm sm:text-base font-semibold tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    {alt}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageCard;
