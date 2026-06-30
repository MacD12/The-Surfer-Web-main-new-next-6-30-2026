'use client';
import React from 'react';
import { Award, Users, Home, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n-compat';

const PillarCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
      <Icon className="w-10 h-10 text-white" strokeWidth={1.5} aria-hidden="true" focusable="false" />
    </div>
    <h3 className="text-gray-800 font-semibold text-sm mb-3 leading-tight">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{description}</p>
  </div>
);

export default function SurfurWay() {
  const { t, i18n } = useTranslation();
  const pillars = t('surferWay.pillars', { returnObjects: true });

  // Keep your icons in order matching the translation array
  const icons = [Award, Users, Home, Globe];

  return (
    <motion.div
      className="bg-blue-400/50 py-10 mt-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
      aria-label={t('surferWay.aria.section')}
      dir={i18n.dir()}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {t('surferWay.heading')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('surferWay.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="transform transition-transform duration-300 hover:scale-105">
              <PillarCard
                icon={icons[idx]}
                title={pillar.title}
                description={pillar.description}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
