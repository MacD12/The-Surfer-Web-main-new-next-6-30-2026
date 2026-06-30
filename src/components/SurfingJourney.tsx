'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from '@/lib/i18n-compat';

const SurfingJourney = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center container mx-auto px-6 sm:px-10 md:px-14 lg:px-24 pt-10 pb-4 sm:pt-12 sm:pb-5 md:pt-14 md:pb-6 w-full overflow-hidden"
      id="Journey"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 leading-tight max-w-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t('surfingJourney.heading')}
      </motion.h2>

      {/* Animated accent bar - ocean gradient under the heading */}
      <motion.div
        className="mt-4 mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      />

      <motion.p
        className="text-sm sm:text-base md:text-lg leading-[1.7] text-center max-w-5xl text-gray-600 px-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Trans
          i18nKey="surfingJourney.body"
          components={{ br: <br /> }}
        />
      </motion.p>
    </motion.section>
  );
};

export default SurfingJourney;
