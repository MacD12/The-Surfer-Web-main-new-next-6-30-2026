'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';

type Stat = { value: string | number; label: string };

type PackageCardProps = {
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  features: string[];
  index: number;
  tier: string;
  stats: Stat[];
  isPopular?: boolean;
  popularLabel?: string;
};

const PackageCard = ({
  image,
  title,
  subtitle,
  description,
  features,
  index,
  tier,
  stats,
  isPopular = false,
  popularLabel = 'Most Popular',
}: PackageCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={`relative bg-white rounded-2xl ring-1 shadow-md overflow-hidden mb-4 sm:mb-6 md:mb-8 w-full mx-auto transition-all duration-500 hover:shadow-2xl ${
        isPopular
          ? 'ring-cyan-300/70 shadow-cyan-500/10 hover:ring-cyan-400'
          : 'ring-gray-100 hover:ring-cyan-200/50'
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Popular ribbon */}
      {isPopular && (
        <motion.div
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase shadow-lg shadow-amber-500/30 ring-1 ring-amber-300/50">
            <Star className="w-3 h-3 fill-white" strokeWidth={0} />
            {popularLabel}
          </span>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Image side */}
        <div className="relative w-full lg:w-2/5 overflow-hidden group/img bg-gray-100">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={800}
            className="w-full h-56 sm:h-64 md:h-72 lg:h-full object-cover transform transition-transform duration-700 group-hover/img:scale-105"
          />
          {/* Tier badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-lg ring-1 ring-black/5 text-gray-800 text-sm font-bold tabular-nums">
              {tier}
            </span>
          </div>
          {/* Subtle bottom gradient (mobile/tablet) so we have visual separation */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent lg:hidden"
          />
        </div>

        {/* Content side */}
        <div className="w-full lg:w-3/5 p-5 sm:p-6 md:p-7 bg-gradient-to-br from-gray-50/60 to-white">
          {/* Title block */}
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-[montserrat] text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight mb-2 leading-tight">
              {title}
            </h3>
            <p className="text-[11px] sm:text-xs text-cyan-700 font-bold uppercase tracking-[0.18em]">
              {subtitle}
            </p>
            {description && (
              <p className="text-xs sm:text-sm text-gray-500 italic mt-1">{description}</p>
            )}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.25, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="mt-3 origin-left"
            >
              <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300" />
            </motion.div>
          </motion.div>

          {/* Headline stats row */}
          <motion.div
            className="mb-6 grid grid-cols-3 gap-2 sm:gap-3 rounded-2xl bg-gradient-to-br from-cyan-50/50 via-white to-white ring-1 ring-cyan-100/60 p-3 sm:p-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
            viewport={{ once: true }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={`text-center px-1 ${i < stats.length - 1 ? 'border-r border-cyan-100' : ''}`}
              >
                <div className="font-[montserrat] text-lg sm:text-xl md:text-2xl font-bold text-gray-800 tabular-nums leading-none">
                  {s.value}
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-700">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Included features */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.25 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[11px] sm:text-xs font-bold text-gray-800 mb-3 uppercase tracking-[0.18em]">
              {t('countryPackages.includedHeading')}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
              {features.map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  className="text-xs sm:text-sm text-gray-600 flex items-start py-1"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.12 + 0.3 + featureIndex * 0.03,
                  }}
                  viewport={{ once: true }}
                >
                  <svg
                    className="w-4 h-4 mr-2 mt-0.5 text-cyan-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA row */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
            viewport={{ once: true }}
          >
            <a
              href="/book-now"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm font-semibold shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-105 transition-all duration-300"
            >
              {t('countryPackages.cta')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="/rates"
              className="text-xs sm:text-sm font-semibold text-cyan-700 hover:text-cyan-800 underline underline-offset-4 decoration-cyan-300/60 hover:decoration-cyan-500 transition-colors"
            >
              See full rates →
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SurfLessonPackages = () => {
  const { t } = useTranslation();

  const statLabels = {
    nights: t('countryPackages.stats.nights', 'Nights'),
    lessons: t('countryPackages.stats.lessons', 'Lessons'),
    yoga: t('countryPackages.stats.yoga', 'Yoga'),
  };

  const packages: PackageCardProps[] = [
    {
      tier: '01',
      image: '/country/pkg1.jpg',
      title: t('countryPackages.packages.moderate.title'),
      subtitle: t('countryPackages.packages.moderate.subtitle'),
      description: t('countryPackages.packages.moderate.description'),
      features: t('countryPackages.packages.moderate.features', { returnObjects: true }) || [],
      stats: [
        { value: '07', label: statLabels.nights },
        { value: '06', label: statLabels.lessons },
        { value: '02', label: statLabels.yoga },
      ],
      index: 0,
    },
    {
      tier: '02',
      image: '/country/pkg2.jpg',
      title: t('countryPackages.packages.full.title'),
      subtitle: t('countryPackages.packages.full.subtitle'),
      description: t('countryPackages.packages.full.description'),
      features: t('countryPackages.packages.full.features', { returnObjects: true }) || [],
      stats: [
        { value: '07', label: statLabels.nights },
        { value: '11', label: statLabels.lessons },
        { value: '02', label: statLabels.yoga },
      ],
      isPopular: true,
      popularLabel: t('countryPackages.popular', 'Most Popular'),
      index: 1,
    },
    {
      tier: '03',
      image: '/country/pkg3.jpg',
      title: t('countryPackages.packages.surfYoga.title'),
      subtitle: t('countryPackages.packages.surfYoga.subtitle'),
      description: t('countryPackages.packages.surfYoga.description'),
      features: t('countryPackages.packages.surfYoga.features', { returnObjects: true }) || [],
      stats: [
        { value: '07', label: statLabels.nights },
        { value: '06', label: statLabels.lessons },
        { value: '7×', label: statLabels.yoga },
      ],
      index: 2,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-cyan-50/40">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-700 mb-3">
            {t('countryPackages.eyebrow', 'Surf Packages')}
          </span>
          <h2 className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800">
            {t('countryPackages.heading', 'Choose Your Surf Lesson Package')}
          </h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-4 sm:mt-5 mb-5 flex justify-center"
          >
            <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
          </motion.div>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            {t(
              'countryPackages.intro',
              "Whether you're catching your first wave or refining your style, pick the rhythm that fits your trip.",
            )}
          </p>
        </motion.div>

        {/* Package cards */}
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.tier} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SurfLessonPackages;
