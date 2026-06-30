'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Waves, MapPin, Heart } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

type Camp = {
  name: string;
  tag: string;
  desc: string;
};

const ICONS = [Waves, MapPin, Heart];

const CampCallout = ({ camp, idx }: { camp: Camp; idx: number }) => {
  const Icon = ICONS[idx] || Waves;

  return (
    <motion.div
      className="group relative h-full flex flex-col bg-white rounded-2xl ring-1 ring-gray-100 shadow-md hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-300 p-5 sm:p-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 + idx * 0.1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Left-edge brand accent bar */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-gradient-to-b from-[#0a67b3] via-cyan-400 to-[#0a67b3]"
      />

      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-[#0a67b3]/25 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-[montserrat] text-sm sm:text-base font-bold tracking-tight text-gray-800 leading-tight">
            {camp.name}
          </h3>
          {camp.tag && (
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-700 mt-0.5">
              {camp.tag}
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed flex-1">
        {camp.desc}
      </p>
    </motion.div>
  );
};

const Perfect = () => {
  const { t } = useTranslation();
  const eyebrow = t('sriLankaLife.eyebrow');
  const title = t('sriLankaLife.title');
  const intro = t('sriLankaLife.intro');
  const closing = t('sriLankaLife.closing');
  const camps = (t('sriLankaLife.camps', { returnObjects: true }) as Camp[]) || [];

  return (
    <motion.section
      className="flex flex-col items-center justify-center container mx-auto px-6 sm:px-8 md:px-20 lg:px-32 pt-12 sm:pt-16 pb-10 sm:pb-12 w-full overflow-hidden"
      id="Journey"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.span
          className="block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-700 mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
        className="mt-4 sm:mt-5 flex justify-center"
      >
        <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
      </motion.div>

      <motion.p
        className="text-sm sm:text-base leading-relaxed text-center max-w-3xl text-gray-500 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {intro}
      </motion.p>

      {/* Three camp callouts */}
      <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-6xl w-full">
        {camps.map((camp, idx) => (
          <CampCallout key={idx} camp={camp} idx={idx} />
        ))}
      </div>

      {/* Closing line */}
      {closing && (
        <motion.p
          className="text-sm sm:text-base leading-relaxed text-center max-w-3xl text-gray-500 mt-10 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {closing}
        </motion.p>
      )}
    </motion.section>
  );
};

export default Perfect;
