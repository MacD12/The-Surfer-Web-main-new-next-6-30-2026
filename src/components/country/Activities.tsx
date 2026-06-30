'use client';
import React from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
import { useTranslation } from '@/lib/i18n-compat';

const Activities = () => {
  const { t, i18n } = useTranslation();

  // Map images to the translation keys you already have
  const items = [
    { pic: "act1.jpg", titleKey: "activities.surfHoliday.title" },
    { pic: "friends.jpg", titleKey: "activities.meetPeople.title" },
    { pic: "act3.jpg", titleKey: "activities.friendsForLife.title" },
    { pic: "boat.jpg", titleKey: "activities.boatParty.title" },
  ];

  return (
    <div className="py-14 sm:py-16 px-4 sm:px-6 bg-gray-50" dir={i18n.dir()}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2
            className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t('activities.header')}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {items.map((it, index) => (
            <ActivityCard
              key={index}
              pic={it.pic}
              title={t(it.titleKey)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ActivityCard = ({ pic, title, index }) => {
  return (
    <motion.a
      href="/activities"
      className="group relative block h-[360px] sm:h-[400px] overflow-hidden rounded-2xl shadow-md ring-1 ring-gray-100 hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-300"
      aria-label={title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Image
        src={`/${pic}`}
        alt={title}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Bottom gradient overlay for text legibility */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {/* Title at bottom with reveal arrow on hover */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
        <h3 className="font-[montserrat] text-lg md:text-xl font-bold tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-cyan-200 text-xs font-semibold tracking-[0.18em] uppercase opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span>Explore</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
      </div>
    </motion.a>
  );
};

export default Activities;
