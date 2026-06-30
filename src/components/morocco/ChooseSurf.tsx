'use client';
import React from 'react';
import { Award, Users, Home, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n-compat';

type Pillar = { title: string; description: string };
type Stat = { value: string; label: string };

type PillarCardProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
  title: string;
  description: string;
  index: number;
};

const PillarCard = ({ icon: Icon, title, description, index }: PillarCardProps) => {
  const tier = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className="group relative flex flex-col items-center text-center h-full p-6 sm:p-7 pt-9 sm:pt-10 rounded-2xl bg-white ring-1 ring-gray-100 shadow-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:ring-cyan-300/50 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      aria-label={title}
    >
      {/* Top cyan accent strip */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
      />

      {/* Number badge */}
      <span className="absolute top-3 right-3 text-[10px] sm:text-[11px] font-bold tabular-nums tracking-[0.18em] text-gray-300 group-hover:text-cyan-500 transition-colors duration-300">
        {tier}
      </span>

      {/* Icon with soft brand glow */}
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0a67b3] to-cyan-400 opacity-25 blur-xl scale-125 group-hover:opacity-60 group-hover:scale-150 transition-all duration-500" />
        <div className="relative w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] flex items-center justify-center shadow-lg shadow-[#0a67b3]/30 ring-1 ring-white/40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-out">
          <Icon className="w-8 h-8 text-white" strokeWidth={1.75} aria-hidden={true} />
        </div>
      </div>

      <h3 className="font-[montserrat] text-gray-800 font-bold text-base md:text-[17px] mb-3 leading-snug tracking-tight">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">
        {description}
      </p>
    </motion.article>
  );
};

const StatChip = ({ stat, index }: { stat: Stat; index: number }) => (
  <motion.div
    className="flex flex-col items-center text-center px-2"
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.4 + index * 0.06, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <div className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums leading-none bg-gradient-to-br from-[#0a67b3] to-cyan-500 bg-clip-text text-transparent">
      {stat.value}
    </div>
    <div className="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-gray-500">
      {stat.label}
    </div>
  </motion.div>
);

export default function ChooseSurfCamp() {
  const { t } = useTranslation();

  const eyebrow = t('chooseSurfCamp2.eyebrow', 'Why The Surfer');
  const heading = t('chooseSurfCamp2.heading');
  const subheading = t('chooseSurfCamp2.subheading', '');

  const pillars: Pillar[] = [
    { title: t('chooseSurfCamp2.pillars.0.title'), description: t('chooseSurfCamp2.pillars.0.description') },
    { title: t('chooseSurfCamp2.pillars.1.title'), description: t('chooseSurfCamp2.pillars.1.description') },
    { title: t('chooseSurfCamp2.pillars.2.title'), description: t('chooseSurfCamp2.pillars.2.description') },
    { title: t('chooseSurfCamp2.pillars.3.title'), description: t('chooseSurfCamp2.pillars.3.description') },
  ];

  const rawStats = t('chooseSurfCamp2.stats', { returnObjects: true });
  const stats: Stat[] = Array.isArray(rawStats) ? (rawStats as Stat[]) : [];

  const icons = [Award, Users, Home, Globe];

  return (
    <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden">
      {/* Soft brand glow accents */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-cyan-300/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#0a67b3]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center mb-10 sm:mb-12 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {eyebrow && (
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-[#0a67b3] mb-3">
              {eyebrow}
            </span>
          )}
          <h2 className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800 leading-tight">
            {heading}
          </h2>
          <motion.div
            className="mt-4 mb-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />
          {subheading && (
            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              {subheading}
            </p>
          )}
        </motion.div>

        {/* Stats strip */}
        {stats.length > 0 && (
          <motion.div
            className="max-w-4xl mx-auto mb-12 sm:mb-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 px-2 py-5 sm:py-6 rounded-2xl bg-white/70 backdrop-blur-sm ring-1 ring-cyan-100/60 shadow-md"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {stats.map((s, idx) => (
              <div
                key={idx}
                className={
                  idx > 0
                    ? 'sm:border-l sm:border-cyan-100/80 sm:pl-4 md:pl-6'
                    : ''
                }
              >
                <StatChip stat={s} index={idx} />
              </div>
            ))}
          </motion.div>
        )}

        {/* Pillar grid */}
        <ul
          role="list"
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {pillars.map((p, idx) => {
            const Icon = icons[idx] || Award;
            return (
              <li key={idx} className="h-full">
                <PillarCard icon={Icon} title={p.title} description={p.description} index={idx} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
