'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Award, MapPin, Waves, ChevronDown } from 'lucide-react';
import Navbar from '../Navbar';
import { useTranslation } from '@/lib/i18n-compat';

const Header = () => {
  const { t } = useTranslation();

  const title = t('headers.beach.title');
  const subtitle = t('headers.beach.subtitle');
  const bgImage = t('headers.beach.bgImage');

  return (
    <div
      id="Header"
      className="relative min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden"
      style={{ backgroundImage: `url('${bgImage}')` }}
      aria-label={title}
    >
      {/* Brand-standard gradient overlay for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/60 pointer-events-none"
      />

      <Navbar />

      <div className="container relative z-10 text-center mx-auto py-4 px-4 sm:px-6 md:px-20 lg:px-32 text-white">
        {/* Eyebrow */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-200/95 backdrop-blur-sm bg-white/10 ring-1 ring-white/25 rounded-full px-3 py-1.5 shadow-md shadow-black/20">
            <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
            Sri Lanka · Weligama
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-[montserrat] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] inline-block max-w-full sm:max-w-4xl font-bold tracking-tight leading-[1.02] mt-5 sm:mt-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>

        {/* Accent bar */}
        <motion.div
          className="mt-6 sm:mt-8 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <span className="block h-[3px] w-14 sm:w-20 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>

        {/* Trust pills */}
        <motion.div
          className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shadow-lg shadow-black/20">
            <Award className="w-4 h-4 text-cyan-200" strokeWidth={2.25} />
            6× Tripadvisor Travellers' Choice
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shadow-lg shadow-black/20">
            <Waves className="w-4 h-4 text-cyan-200" strokeWidth={2.25} />
            ISA Certified Instructors
          </span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#Journey"
        aria-label="Scroll to camp story"
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 items-center justify-center text-white hover:bg-white/25 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 0.9, duration: 0.6 },
          y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <ChevronDown className="w-5 h-5" strokeWidth={2.25} />
      </motion.a>
    </div>
  );
};

export default Header;
