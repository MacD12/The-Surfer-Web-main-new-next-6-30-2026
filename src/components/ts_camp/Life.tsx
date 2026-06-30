'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  GitCompare,
  Waves,
  Home,
  MapPin,
  BedDouble,
  Wallet,
  Bus,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

const LifeAtSurfCamp = () => {
  const { t } = useTranslation();
  const points = t('lifeTs2.points', { returnObjects: true }) as string[];

  // points[0] - overall summary
  // points[1] - Beach Camp: location
  // points[2] - TS2 Camp: rooms
  // points[3] - Beach Camp: rooms
  // points[4] - TS2 Camp: location & shared schedule
  // points[5] - Value pitch (transport + cheaper, full experience)
  const summaryLine = points[0];
  const beachLocation = points[1];
  const ts2Rooms = points[2];
  const beachRooms = points[3];
  const ts2Location = points[4];
  const valuePitch = points[5];

  return (
    <section
      id="Journey"
      className="relative scroll-mt-20 py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden"
      aria-label={t('lifeTs2.aria.section')}
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
            Our Story
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
          {t('lifeTs2.title')}
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
          {t('lifeTs2.intro')}
        </motion.p>

        {/* Compare block */}
        <div className="mt-12 sm:mt-14 max-w-5xl mx-auto">
          {/* Question header */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25 shrink-0">
              <GitCompare className="w-5 h-5 text-white" strokeWidth={2.25} />
            </span>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700 mb-0.5">
                Compare · Beach Camp vs TS2 Camp
              </span>
              <h3 className="font-[montserrat] text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-gray-900 leading-tight">
                {t('lifeTs2.diffTitle')}
              </h3>
              {summaryLine && (
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {summaryLine}
                </p>
              )}
            </div>
          </motion.div>

          {/* Side-by-side cards */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* VS pill - desktop only */}
            <motion.span
              aria-hidden="true"
              className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white ring-2 ring-cyan-200 shadow-lg items-center justify-center font-[montserrat] text-[11px] font-bold tracking-[0.18em] uppercase text-cyan-700"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
            >
              VS
            </motion.span>

            {/* BEACH CAMP card */}
            <motion.div
              className="relative rounded-2xl bg-gradient-to-br from-sky-50/70 via-white to-white ring-1 ring-sky-100 shadow-md hover:shadow-xl hover:ring-sky-200/80 transition-all duration-300 p-5 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -3 }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 shadow-md shadow-sky-500/30">
                  <Waves className="w-5 h-5 text-white" strokeWidth={2.25} />
                </span>
                <div>
                  <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-sky-700">
                    Option A
                  </span>
                  <h4 className="font-[montserrat] text-lg sm:text-xl font-bold tracking-tight text-gray-900 leading-tight">
                    Beach Camp
                  </h4>
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold tracking-[0.18em] uppercase ring-1 ring-sky-200">
                  Flagship
                </span>
              </div>

              {/* Rows */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white ring-1 ring-sky-200 text-sky-700">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">
                      Location
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {beachLocation}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white ring-1 ring-sky-200 text-sky-700">
                    <BedDouble className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">
                      Rooms
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {beachRooms}
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* TS2 CAMP card */}
            <motion.div
              className="relative rounded-2xl bg-gradient-to-br from-cyan-50/70 via-white to-white ring-1 ring-cyan-100 shadow-md hover:shadow-xl hover:ring-cyan-200/80 transition-all duration-300 p-5 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/30">
                  <Home className="w-5 h-5 text-white" strokeWidth={2.25} />
                </span>
                <div>
                  <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                    Option B
                  </span>
                  <h4 className="font-[montserrat] text-lg sm:text-xl font-bold tracking-tight text-gray-900 leading-tight">
                    TS2 Camp
                  </h4>
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-[0.18em] uppercase ring-1 ring-emerald-200">
                  Best Value
                </span>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white ring-1 ring-cyan-200 text-cyan-700">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">
                      Location
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {ts2Location}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white ring-1 ring-cyan-200 text-cyan-700">
                    <BedDouble className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">
                      Rooms
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {ts2Rooms}
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Value pitch callout */}
          {valuePitch && (
            <motion.div
              className="mt-5 sm:mt-6 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a67b3] via-[#0a67b3] to-[#0891b2] text-white shadow-xl shadow-cyan-500/20 p-5 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.7, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Decorative blur orb */}
              <span
                aria-hidden="true"
                className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none"
              />

              <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-start">
                <span className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 shadow-md">
                  <Wallet className="w-5 h-5 text-white" strokeWidth={2.25} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-100 mb-1.5">
                    Best of both worlds
                  </span>
                  <h4 className="font-[montserrat] text-lg sm:text-xl font-bold tracking-tight leading-tight">
                    Sleep at TS2, surf at the Beach Camp - pay less, miss nothing.
                  </h4>
                  <p className="mt-2 text-sm text-cyan-50/90 leading-relaxed">
                    {valuePitch}
                  </p>

                  {/* Highlight chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 text-[11px] font-semibold">
                      <Bus className="w-3.5 h-3.5" strokeWidth={2.25} />
                      LKR 1000/day transport refund
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 text-[11px] font-semibold">
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                      Same surf, yoga & meals
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 text-[11px] font-semibold">
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
                      5-minute ride to the beach
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LifeAtSurfCamp;
