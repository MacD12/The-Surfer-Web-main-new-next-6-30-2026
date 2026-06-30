'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  Waves,
  Compass,
  UtensilsCrossed,
  Heart,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

// The four `lifeSoulSurfer.points` map 1-to-1 to icons in display order.
const POINT_ICONS = [MapPin, Waves, UtensilsCrossed, Compass];

const LifeAtSoulSurfer = () => {
  const { t } = useTranslation();
  const points = t('lifeSoulSurfer.points', { returnObjects: true }) as string[];

  return (
    <section
      id="Journey"
      className="relative scroll-mt-20 py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden"
      aria-label={t('lifeSoulSurfer.aria.section')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Eyebrow */}
        <motion.div
          className="flex flex-col items-center mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold text-[#0a67b3]">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
            Brand new · Our story
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-[montserrat] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-gray-900 leading-[1.05]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {t('lifeSoulSurfer.title')}
        </motion.h2>

        {/* Accent bar */}
        <motion.div
          className="mt-5 mb-8 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="block h-[3px] w-16 sm:w-20 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
        </motion.div>

        {/* Intro */}
        <motion.p
          className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {t('lifeSoulSurfer.intro')}
        </motion.p>

        {/* Experience callout - built on 10+ years */}
        <motion.div
          className="mt-10 sm:mt-12 max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a67b3] via-[#0a67b3] to-[#0891b2] text-white shadow-xl shadow-cyan-500/20 p-5 sm:p-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span
            aria-hidden="true"
            className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none"
          />

          <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
            <span className="shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 shadow-md">
              <Heart className="w-6 h-6 text-white" strokeWidth={2.25} />
            </span>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-100 mb-1.5">
                Built on 10+ years of The Surfer
              </span>
              <h3 className="font-[montserrat] text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-tight">
                A brand-new camp, drawing on a decade of surf hospitality.
              </h3>
              <p className="mt-2 text-sm sm:text-[15px] text-cyan-50/90 leading-relaxed">
                Soul Surfer is The Surfer's newest opening in Weligama - designed from the ground
                up with everything we've learned across our flagship Beach Camp and TS2:
                brand-new rooms, a rooftop infinity pool, and its own quiet rhythm.
              </p>
            </div>
          </div>
        </motion.div>

        {/* What makes Soul Surfer different - 4-up icon grid */}
        <motion.div
          className="mt-12 sm:mt-14"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <span className="block w-8 h-px bg-cyan-300" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-700 text-center">
              {t('lifeSoulSurfer.diffTitle')}
            </span>
            <span className="block w-8 h-px bg-cyan-300" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {points.map((point, i) => {
              const Icon = POINT_ICONS[i] || Sparkles;
              return (
                <motion.div
                  key={i}
                  className="group relative flex flex-col rounded-2xl bg-white ring-1 ring-gray-100 shadow-md hover:shadow-xl hover:ring-cyan-200/60 transition-all duration-300 p-4 sm:p-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.45 + i * 0.08,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.25} />
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-sm sm:text-[15px] font-semibold text-gray-800 leading-snug">
                    {point}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifeAtSoulSurfer;
