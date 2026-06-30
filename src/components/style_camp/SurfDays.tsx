'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sun, Waves, Coffee, Sparkles, Moon, Clock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

type Section = {
  image: string;
  titleKey: string;
  bodyKey: string;
  activitiesLabelKey?: string;
  activitiesKey?: string;
  meta: { time: string; tag: string; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }> };
};

const SECTIONS: Section[] = [
  {
    image: '/morocco/moro-1.jpg',
    titleKey: 'surfDays1.sections.morning.title',
    bodyKey: 'surfDays1.sections.morning.body',
    meta: { time: '07:00 · Sunrise', tag: 'Morning', Icon: Sun },
  },
  {
    image: '/morocco/moro-2.jpg',
    titleKey: 'surfDays1.sections.lesson.title',
    bodyKey: 'surfDays1.sections.lesson.body',
    meta: { time: '09:30 · Mid-Morning', tag: 'Surf Time', Icon: Waves },
  },
  {
    image: '/morocco/moro-3.jpg',
    titleKey: 'surfDays1.sections.freeTime.title',
    bodyKey: 'surfDays1.sections.freeTime.body',
    activitiesLabelKey: 'surfDays1.sections.freeTime.activitiesLabel',
    activitiesKey: 'surfDays1.sections.freeTime.activities',
    meta: { time: '13:00 · Afternoon', tag: 'Explore', Icon: Coffee },
  },
  {
    image: '/morocco/morocco2.jpg',
    titleKey: 'surfDays1.sections.evening.title',
    bodyKey: 'surfDays1.sections.evening.body',
    meta: { time: '19:00 · Evening', tag: 'Sundown', Icon: Sparkles },
  },
  {
    image: '/morocco/morocco5.jpg',
    titleKey: 'surfDays1.sections.sleep.title',
    bodyKey: 'surfDays1.sections.sleep.body',
    meta: { time: '22:00 · Night', tag: 'Rest', Icon: Moon },
  },
];

const SurfDays = () => {
  const { t } = useTranslation();

  return (
    <section
      id="SurfDays1"
      className="relative scroll-mt-20 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/20 to-white overflow-hidden"
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
            <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
            A day at the camp
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-[montserrat] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-gray-900 leading-[1.05]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {t('surfDays1.title')}
        </motion.h2>

        {/* Accent bar */}
        <motion.div
          className="mt-5 mb-12 sm:mb-14 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="block h-[3px] w-16 sm:w-20 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-px bg-gradient-to-b from-cyan-200 via-cyan-100 to-transparent"
          />

          <div className="space-y-12 sm:space-y-14 md:space-y-20">
            {SECTIONS.map((sec, idx) => {
              const reverse = idx % 2 === 1;
              const Icon = sec.meta.Icon;
              const activities = sec.activitiesKey
                ? (t(sec.activitiesKey, { returnObjects: true }) as string[] | undefined)
                : undefined;

              return (
                <motion.div
                  key={idx}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center ${
                    reverse ? 'md:[&>*:first-child]:md:order-2' : ''
                  }`}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <span
                    aria-hidden="true"
                    className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white ring-2 ring-cyan-200 shadow-md items-center justify-center"
                  >
                    <Icon className="w-4 h-4 text-cyan-600" strokeWidth={2.25} />
                  </span>

                  {/* Image */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-100 shadow-md hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-500 group aspect-[4/3]"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <Image
                      src={sec.image}
                      alt={t(sec.titleKey)}
                      fill
                      sizes="(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-[0.18em] uppercase text-gray-800 ring-1 ring-black/5 shadow-sm">
                      <span className="block w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {sec.meta.time}
                    </span>
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: reverse ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <span className="md:hidden inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200 text-[10px] font-bold tracking-[0.18em] uppercase">
                      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                      {sec.meta.tag}
                    </span>

                    <span className="hidden md:inline-flex items-center gap-2 mb-3 text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-700">
                      <span className="block w-6 h-px bg-cyan-500" />
                      {sec.meta.tag}
                    </span>

                    <h3 className="font-[montserrat] text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-gray-900 leading-tight">
                      {t(sec.titleKey)}
                    </h3>

                    <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {t(sec.bodyKey)}
                    </p>

                    {/* Optional activities list */}
                    {activities && activities.length > 0 && (
                      <>
                        {sec.activitiesLabelKey && (
                          <p className="mt-4 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                            {t(sec.activitiesLabelKey)}
                          </p>
                        )}
                        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activities.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                            >
                              <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurfDays;
