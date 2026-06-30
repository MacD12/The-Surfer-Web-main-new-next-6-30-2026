'use client';
import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line
import { useTranslation } from '@/lib/i18n-compat';

const ImageCard = ({ image, title, subtitle, index, ariaLabel }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    viewport={{ once: true, amount: 0.3 }}
    className="relative overflow-hidden shadow-2xl group cursor-pointer mb-10"
    role="img"
    aria-label={ariaLabel}
  >
    <div
      className="aspect-[4/5] bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url(/${image})` }}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-opacity-30 transition-all duration-500">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              className="text-lg md:text-xl opacity-90 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
              viewport={{ once: true }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const CountryCard = () => {
  const { t, i18n } = useTranslation();

  // Get destination objects from JSON
  const destinations = t('countryCard.destinations', { returnObjects: true }) || [];

  // Map slugs to image filenames you already serve from /public
  const imagesBySlug = {
    'sri-lanka': 'srilanka.jpg',
    'morocco': 'morocco.jpg'
  };

  return (
    <div className="max-w-6xl mx-auto" dir={i18n.dir()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {destinations.map((d, index) => {
          const image = imagesBySlug[d.slug] || `${d.slug}.jpg`;
          const ariaLabel = t('countryCard.aria.card', { title: d.title });
          return (
            <ImageCard
              key={d.slug || index}
              image={image}
              title={d.title}
              subtitle={d.subtitle}
              index={index}
              ariaLabel={ariaLabel}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CountryCard;
