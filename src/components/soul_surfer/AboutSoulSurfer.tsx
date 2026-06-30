'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

/**
 * "What is Soul Surfer Camp?" explainer section. Sits between the room
 * photos and the Location/map block on the Soul Surfer page.
 */
const AboutSoulSurfer = () => {
  const { t } = useTranslation();

  const eyebrow = t('aboutSoulSurfer.eyebrow');
  const heading = t('aboutSoulSurfer.heading');
  const paragraphs =
    (t('aboutSoulSurfer.paragraphs', { returnObjects: true }) as string[]) || [];

  if (!paragraphs.length) return null;

  return (
    <section
      aria-label={heading}
      className="relative w-full bg-gradient-to-b from-white via-cyan-50/30 to-white py-14 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          className="flex flex-col items-center mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            {heading}
          </h2>
          <motion.div
            className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </motion.div>

        <div className="space-y-4 text-center">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className={
                i === 0
                  ? 'text-base sm:text-lg font-semibold text-gray-800 leading-relaxed'
                  : 'text-sm sm:text-base text-gray-600 leading-[1.8]'
              }
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.4 }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSoulSurfer;
