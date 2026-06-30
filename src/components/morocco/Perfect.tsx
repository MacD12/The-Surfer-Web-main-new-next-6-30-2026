'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n-compat';

const Perfect = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      className="flex flex-col items-center justify-center container mx-auto px-6 sm:px-8 md:px-20 lg:px-32 pt-12 sm:pt-16 pb-10 sm:pb-12 w-full overflow-hidden"
      id="Journey"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t('perfect.title')}
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
        className="text-sm sm:text-base leading-relaxed text-center max-w-3xl text-gray-500 space-y-5 px-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p>{t('perfect.body.p1')}</p>
        <p>{t('perfect.body.p2')}</p>
        <p>{t('perfect.body.p3')}</p>
      </motion.div>
    </motion.section>
  );
};

export default Perfect;
