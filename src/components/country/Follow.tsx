'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Instagram } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

const images = [
  "/f1.jpg",
  "/f2.jpg",
  "/f3.jpg",
  "/gallery-1.jpg",
  "/gallery-2.jpg",
  "/gallery-3.jpg",
];

const MasonryGrid = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-white to-cyan-50/30">
      <motion.div
        className="text-center mb-10 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800 uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {t('follow.title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-4 sm:mt-5 mb-6 flex justify-center"
        >
          <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <a
            href="https://www.instagram.com/thesurfer_srilanka/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white ring-1 ring-gray-200 text-gray-700 text-sm sm:text-base font-semibold shadow-sm hover:ring-cyan-300 hover:bg-cyan-50/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            aria-label={t('follow.aria.instagram')}
          >
            <Instagram className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
            <span>{t('follow.cta')}</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((src, i) => {
            const baseTile =
              "group relative overflow-hidden rounded-2xl ring-1 ring-gray-100 shadow-md hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-300";
            const square = "aspect-square";
            const wide = "col-span-2 aspect-[2/1]";
            const tileClass =
              i < 4 ? `${baseTile} ${square}` : `${baseTile} ${wide}`;

            return (
              <motion.div
                key={src}
                className={tileClass}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <Image
                  src={src}
                  alt={t('follow.galleryAlt', { num: i + 1 })}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className={`object-cover transition-transform duration-500 ${i < 4 ? 'group-hover:scale-110' : 'group-hover:scale-105'}`}
                />
                {/* Subtle hover overlay */}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default MasonryGrid;
