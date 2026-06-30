'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n-compat';

const SurfingJourney = () => {
  const { t, i18n } = useTranslation();

  return (
    <motion.div
      className="hidden lg:flex xl:flex flex-col items-center justify-center container mx-20 w-full overflow-hidden mt-[-4rem]"
      id="Journey"
      dir={i18n.dir()}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1
        className="text-sm sm:text-base md:text-lg lg:text-[1.2rem] xl:text-[1.7rem] font-bold mt-5 mb-3 text-center text-neutral-400"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t('campDifference.title')}
      </motion.h1>

      <motion.p
        className="text-[8px] sm:text-[10px] md:text-xs lg:text-[12px] xl:text-[14px] leading-tight text-center max-w-2xl text-black px-1 whitespace-pre-line"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t('campDifference.body')}
      </motion.p>

      <div className="flex justify-center w-full mt-3 mb-2">
        <a
          className="px-2 py-1 text-sm font-medium border border-black rounded-full text-black hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
          href="/book-now"
          target="_blank"
          rel="noreferrer"
          aria-label={t('activities.booking.button')}
        >
          {t('activities.booking.button')}
        </a>
      </div>
    </motion.div>
  );
};

export default SurfingJourney;
