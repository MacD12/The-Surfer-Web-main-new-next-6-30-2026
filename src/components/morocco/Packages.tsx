'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n-compat';

type Stat = { value: string | number; label: string };

type PackageCardProps = {
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  features: string[];
  stats: Stat[];
  cta: string;
};

const PackageCard = ({
  image,
  title,
  subtitle,
  description,
  features,
  stats,
  cta,
}: PackageCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="relative bg-white rounded-2xl ring-1 ring-gray-100 shadow-md overflow-hidden w-full mx-auto transition-all duration-500 hover:shadow-2xl hover:ring-cyan-200/50"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image side */}
        <div className="relative w-full lg:w-2/5 overflow-hidden group/img bg-gray-100">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-56 sm:h-64 md:h-72 lg:h-full object-cover transform transition-transform duration-700 group-hover/img:scale-105"
          />
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
            transition={{ duration: 0.5, delay: 0.1 }}
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
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="mt-3 origin-left"
            >
              <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300" />
            </motion.div>
          </motion.div>

          {/* Headline stats */}
          {stats.length > 0 && (
            <motion.div
              className="mb-6 grid grid-cols-3 gap-2 sm:gap-3 rounded-2xl bg-gradient-to-br from-cyan-50/50 via-white to-white ring-1 ring-cyan-100/60 p-3 sm:p-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
          )}

          {/* Features */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[11px] sm:text-xs font-bold text-gray-800 mb-3 uppercase tracking-[0.18em]">
              {t('moroccoPackages.includedTitle')}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
              {features.map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  className="text-xs sm:text-sm text-gray-600 flex items-start py-1"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + featureIndex * 0.03 }}
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
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a
              href="/book-now"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm font-semibold shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-105 transition-all duration-300"
            >
              {cta}
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

  const stats: Stat[] = [
    { value: '07', label: t('moroccoPackages.stats.nights', 'Nights') },
    { value: '06', label: t('moroccoPackages.stats.surfDays', 'Surf Days') },
    { value: '1×', label: t('moroccoPackages.stats.dayTrip', 'Day Trip') },
  ];

  const pkg = {
    image: '/morocco/package_1.jpg',
    title: t('moroccoPackages.package.title'),
    subtitle: t('moroccoPackages.package.subtitle'),
    description: t('moroccoPackages.package.description'),
    features: (t('moroccoPackages.package.features', { returnObjects: true }) as string[]) || [],
  };

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
            {t('moroccoPackages.eyebrow', 'Morocco Surf Package')}
          </span>
          <h2 className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800">
            {t('moroccoPackages.heading', 'Your Atlantic Coast Surf Package')}
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
              'moroccoPackages.intro',
              'Everything included - surf, meals, transport, and a slice of Moroccan culture on the wild Atlantic coast.',
            )}
          </p>
        </motion.div>

        <PackageCard
          image={pkg.image}
          title={pkg.title}
          subtitle={pkg.subtitle}
          description={pkg.description}
          features={pkg.features}
          stats={stats}
          cta={t('common2.bookNow', 'Book Now')}
        />
      </div>
    </section>
  );
};

export default SurfLessonPackages;
