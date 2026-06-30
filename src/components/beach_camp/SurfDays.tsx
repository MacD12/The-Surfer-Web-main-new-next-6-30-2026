'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sun, Waves, Coffee, Sparkles, Moon, Clock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

type Section = {
  alt: string;
  heading: string;
  body: string[];
  list?: string[];
};

const TIMELINE_META = [
  { time: '06:30 · Sunrise', tag: 'Morning', Icon: Sun },
  { time: '09:00 · Mid-Morning', tag: 'Surf Time', Icon: Waves },
  { time: '13:00 · Afternoon', tag: 'Free Time', Icon: Coffee },
  { time: '18:30 · Evening', tag: 'Sundown', Icon: Sparkles },
  { time: '22:00 · Night', tag: 'Rest', Icon: Moon },
];

const IMAGES = [
  '/beach_camp/sunrise.jpg',
  '/beach_camp/surf_lesson.jpg',
  '/beach_camp/free_time.jpg',
  '/beach_camp/food_friends.jpg',
  '/beach_camp/DSC_5817.jpg',
];

const SurfDays = () => {
  const { t } = useTranslation();
  const title = t('surfDays.title');
  const sections = t('surfDays.sections', { returnObjects: true }) as Section[];

  return (
    <section
      id="SurfDays"
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
          {title}
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
          {/* Vertical spine - hidden on small */}
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-px bg-gradient-to-b from-cyan-200 via-cyan-100 to-transparent"
          />

          <div className="space-y-12 sm:space-y-14 md:space-y-20">
            {sections.map((sec, idx) => {
              const meta = TIMELINE_META[idx] || TIMELINE_META[TIMELINE_META.length - 1];
              const Icon = meta.Icon;
              const reverse = idx % 2 === 1;

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
                  {/* Spine bullet */}
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
                      src={IMAGES[idx]}
                      alt={sec.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"
                    />
                    {/* Index ribbon */}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-[0.18em] uppercase text-gray-800 ring-1 ring-black/5 shadow-sm">
                      <span className="block w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {meta.time}
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
                    {/* Mobile inline icon */}
                    <span className="md:hidden inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200 text-[10px] font-bold tracking-[0.18em] uppercase">
                      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                      {meta.tag}
                    </span>

                    <span className="hidden md:inline-flex items-center gap-2 mb-3 text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-700">
                      <span className="block w-6 h-px bg-cyan-500" />
                      {meta.tag}
                    </span>

                    <h3 className="font-[montserrat] text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-gray-900 leading-tight">
                      {sec.heading}
                    </h3>

                    <div className="mt-4 space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {sec.body?.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    {/* Optional bullets */}
                    {sec.list && sec.list.length > 0 && (
                      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sec.list.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                          >
                            <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
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
