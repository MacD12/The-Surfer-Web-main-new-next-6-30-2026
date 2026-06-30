'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n-compat';

const Activities = () => {
  const { t } = useTranslation();

  const activities = [
    { pic: '/morocco/morocco-1.jpg', title: t('moroccoActivities.items.camelRide') },
    { pic: '/morocco/morocco-2.jpg', title: t('moroccoActivities.items.sandboarding') },
    { pic: '/morocco/morocco-3.jpg', title: t('moroccoActivities.items.paradiseValley') },
    { pic: '/morocco/morocco-4.jpg', title: t('moroccoActivities.items.horseback') },
    { pic: '/morocco/morocco-5.jpg', title: t('moroccoActivities.items.skateboarding') },
  ];

  return (
    <section className="py-14 sm:py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2
            className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t('moroccoActivities.title')}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              pic={activity.pic}
              title={activity.title}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ActivityCard = ({
  pic,
  title,
  index,
}: {
  pic: string;
  title: string;
  index: number;
}) => {
  return (
    <motion.div
      className="group relative block h-[340px] sm:h-[380px] overflow-hidden rounded-2xl shadow-md ring-1 ring-gray-100 hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-300"
      aria-label={title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Image
        src={pic}
        alt={title}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Bottom gradient overlay for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 text-white">
        <h3 className="font-[montserrat] text-sm md:text-base lg:text-[15px] font-bold tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default Activities;
