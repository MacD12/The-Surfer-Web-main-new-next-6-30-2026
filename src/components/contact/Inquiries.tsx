'use client';
import React from 'react';
import { motion } from 'framer-motion';  // eslint-disable-line no-unused-vars
import { useTranslation } from '@/lib/i18n-compat';

const Inquiries = () => {
  const { t, i18n } = useTranslation();
  const items = t('inquiries.items', { returnObjects: true }) || [];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 md:py-14" dir={i18n.dir()}>
      <motion.h2
        className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {t('inquiries.title')}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="mt-4 sm:mt-5 mb-10 md:mb-12 flex justify-center"
      >
        <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
      </motion.div>

      <motion.div
        className="relative max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Vertical spine connecting the badges */}
        <span
          aria-hidden="true"
          className="absolute left-[18px] sm:left-5 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-200 via-cyan-100 to-transparent"
        />

        <ul className="space-y-5 sm:space-y-6">
          {items.map((it, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <motion.li
                key={idx}
                className="relative flex items-start gap-4 sm:gap-5 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                viewport={{ once: true }}
              >
                <span className="relative z-10 shrink-0 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-700 text-xs sm:text-sm font-bold tabular-nums tracking-[0.05em] ring-1 ring-cyan-200/60 shadow-sm">
                  {num}
                </span>
                <div className="flex-1 pt-1.5 sm:pt-2">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {it.text}
                  </p>
                  {it.second && (
                    <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {it.second}
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
};

export default Inquiries;
