'use client';
import React from 'react';
import { BadgeCheck, Video, Waves, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n-compat';

type PillarCardProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  index: number;
};

const PillarCard: React.FC<PillarCardProps> = ({ icon: Icon, title, index }) => (
  <motion.div
    className="group relative flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-white ring-1 ring-gray-100 hover:ring-[#0a67b3]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-default"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Icon with soft brand glow */}
    <div className="relative mb-5">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0a67b3] to-cyan-400 opacity-25 blur-xl scale-110 group-hover:opacity-50 transition-opacity duration-500" />
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] flex items-center justify-center shadow-lg shadow-[#0a67b3]/25 group-hover:scale-110 transition-transform duration-300 ease-out">
        <Icon className="w-9 h-9 text-white" strokeWidth={1.75} />
      </div>
    </div>
    <h3 className="text-gray-800 font-semibold text-sm md:text-[15px] leading-tight">
      {title}
    </h3>
  </motion.div>
);

export default function SurfingJourneyIcons() {
  const { t } = useTranslation();

  const titles = t('surfingJourneyIcons.pillars', { returnObjects: true });
  const safeTitles = Array.isArray(titles) ? (titles as string[]) : [];

  const icons = [BadgeCheck, Video, Waves, TrendingUp];

  // Fallbacks in case translations are missing
  const fallbacks = [
    'ISA Certified Surf Instructor',
    'Video Analysis',
    'Surf Break Right in Front of the Camp',
    'For Beginners to Advanced Level',
  ];

  return (
    <div className="pt-4 pb-12 sm:pt-6 sm:pb-14 md:pt-8 md:pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {icons.map((Icon, index) => (
            <PillarCard
              key={index}
              icon={Icon}
              title={safeTitles[index] ?? fallbacks[index]}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
