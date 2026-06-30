'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import { useTranslation } from '@/lib/i18n-compat';

const Header = () => {
  const { t } = useTranslation();

  return (
    <div
      className="relative min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden bg-gray-900"
      style={{ backgroundImage: "url('/image.png')" }}
      id="Header"
      aria-label={t('header.aria.section')}
    >
      <Navbar />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55 pointer-events-none" />
      <div className="container relative z-10 text-center mx-auto py-4 px-4 sm:px-6 md:px-20 lg:px-32 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-[montserrat] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] inline-block max-w-full sm:max-w-3xl font-bold tracking-tight leading-[1.02] pt-18 mt-16 sm:mt-8 md:-mt-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          {t('header.title')}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="mt-6 sm:mt-8 flex justify-center"
        >
          <span className="block h-[3px] w-14 sm:w-20 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
