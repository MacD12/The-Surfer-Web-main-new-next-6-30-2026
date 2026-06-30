'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Home, Globe } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

type Pillar = { title: string; description: string };

type PillarCardProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
  title: string;
  description: string;
  index: number;
};

const PillarCard = ({ icon: Icon, title, description, index }: PillarCardProps) => (
  <motion.article
    className="group relative flex flex-col items-center text-center h-full p-7 sm:p-8 rounded-2xl bg-white ring-1 ring-black/5 shadow-md transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:ring-[#0a67b3]/25"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    aria-label={title}
  >
    {/* Icon with soft brand glow */}
    <div className="relative mb-5">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0a67b3] to-cyan-400 opacity-25 blur-xl scale-110 group-hover:opacity-50 transition-opacity duration-500" />
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] flex items-center justify-center shadow-lg shadow-[#0a67b3]/25 group-hover:scale-110 transition-transform duration-300 ease-out">
        <Icon className="w-8 h-8 text-white" strokeWidth={1.75} aria-hidden={true} />
      </div>
    </div>

    <h3 className="text-gray-800 font-bold text-base md:text-[17px] mb-3 leading-tight">
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      {description}
    </p>
  </motion.article>
);

export default function ChooseSurfCamp() {
  const { t } = useTranslation();

  const eyebrow = t('chooseSurfCamp1.eyebrow');
  const heading = t('chooseSurfCamp1.heading');
  const subheading = t('chooseSurfCamp1.subheading');
  const pillars = (t('chooseSurfCamp1.pillars', { returnObjects: true }) as Pillar[]) || [];
  const aria = t('chooseSurfCamp1.aria', { returnObjects: true }) as { section?: string };

  // Icon ordering is meaningful - keep aligned with the i18n pillars array
  const icons = [Award, Users, Home, Globe];

  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden"
      aria-label={aria?.section}
    >
      {/* Soft brand glow accents */}
      <div
        className="absolute -top-32 right-1/4 w-96 h-96 bg-cyan-300/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#0a67b3]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center mb-12 sm:mb-14 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            {heading}
          </h2>
          <motion.div
            className="mt-4 mb-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {subheading}
          </p>
        </motion.div>

        {/* Pillar grid */}
        <ul
          role="list"
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {pillars.map((p, idx) => {
            const Icon = icons[idx] || Award;
            return (
              <li key={idx} className="h-full">
                <PillarCard
                  icon={Icon}
                  title={p.title}
                  description={p.description}
                  index={idx}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
