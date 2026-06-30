'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Waves, Mountain, Coffee } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

const STATS = [
  { value: 'Atlantic', label: 'Consistent point breaks', Icon: Waves },
  { value: 'Tamraght', label: 'Cliffside Moroccan village', Icon: Mountain },
  { value: 'Daily', label: 'Mint tea & rooftop sunsets', Icon: Coffee },
];

const LifeAtSurfCamp = () => {
  const { t } = useTranslation();
  const paragraphs = [
    t('lifeAtSurfStyle.body.p1'),
    t('lifeAtSurfStyle.body.p2'),
    t('lifeAtSurfStyle.body.p3'),
  ];

  return (
    <section
      id="Journey"
      className="relative scroll-mt-20 py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden"
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
          {t('lifeAtSurfStyle.title')}
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

        {/* Paragraphs */}
        <motion.div
          className="max-w-3xl mx-auto space-y-5 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
            >
              {p}
            </p>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-center gap-3 sm:gap-4 rounded-2xl bg-white ring-1 ring-gray-100 shadow-md hover:shadow-xl hover:ring-cyan-200/60 transition-all duration-300 p-4 sm:p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.08, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -3 }}
            >
              <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25">
                <s.Icon className="w-5 h-5 text-white" strokeWidth={2.25} />
              </span>
              <div className="min-w-0">
                <span className="block font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-900 leading-tight">
                  {s.value}
                </span>
                <span className="block text-[11px] sm:text-xs text-gray-500 leading-snug">
                  {s.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LifeAtSurfCamp;
