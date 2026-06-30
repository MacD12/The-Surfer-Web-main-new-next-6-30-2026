'use client';
import React from 'react';
import { motion as Motion } from 'framer-motion';
import RoomImageSlider from './RoomImageSlider';
import { useTranslation } from '@/lib/i18n-compat';

const ComfortableStayss = () => {
  const { t } = useTranslation();

  // Define image arrays for each room type
  const roomImages = {
    dormitory: [
      "/ts2_camp/dorm.jpg",
      "/ts2_camp/bathroom.jpg",
      "/ts2_camp/bathroom2.jpg",
      "/ts2_camp/livingroom.jpg"
    ],
    singleRoom: [
      "/ts2_camp/room_3.jpg",
      "/ts2_camp/bathroom.jpg",
      "/ts2_camp/bathroom2.jpg",
      "/ts2_camp/livingroom.jpg"
    ],
    doubleRoom: [
      "/ts2_camp/doubleroom.jpg",
      "/ts2_camp/bathroom.jpg",
      "/ts2_camp/bathroom2.jpg",
      "/ts2_camp/livingroom.jpg"
    ],
    tripleRoom: [
      "/ts2_camp/tripleroom.jpg",
      "/ts2_camp/bathroom.jpg",
      "/ts2_camp/bathroom2.jpg",
      "/ts2_camp/livingroom.jpg"
    ]
  };

  const cardData = [
    { images: roomImages.dormitory, alt: t('comfortableStays1.alt.mixedDorm'),  title: t('comfortableStays1.cards.mixed.title'),  body: t('comfortableStays1.cards.mixed.body') },
    { images: roomImages.singleRoom, alt: t('comfortableStays1.alt.single'),    title: t('comfortableStays1.cards.single.title'), body: t('comfortableStays1.cards.single.body') },
    { images: roomImages.doubleRoom, alt: t('comfortableStays1.alt.double'),    title: t('comfortableStays1.cards.double.title'), body: t('comfortableStays1.cards.double.body') },
    { images: roomImages.tripleRoom, alt: t('comfortableStays1.alt.triple'),    title: t('comfortableStays1.cards.triple.title'), body: t('comfortableStays1.cards.triple.body') },
  ];

  return (
    <Motion.div
      className="flex flex-col items-center justify-center container mx-auto w-full overflow-hidden mt-8 mb-12 sm:mt-12 sm:mb-16 px-4 sm:px-6"
      id="ComfortableStays1"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Motion.h2
        className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {t('comfortableStays1.title')}
      </Motion.h2>

      <Motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
        className="mt-4 sm:mt-5 mb-6 flex justify-center"
      >
        <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
      </Motion.div>

      <Motion.p
        className="text-sm sm:text-base text-gray-500 leading-relaxed text-center max-w-3xl px-1 mb-10 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t('comfortableStays1.description')}
      </Motion.p>

      <div className="w-full max-w-8xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cardData.map((card, idx) => (
            <Motion.div
              key={idx}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 shadow-md hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + idx * 0.08, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <Motion.div
                className="w-full overflow-hidden"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <RoomImageSlider
                  images={card.images}
                  altText={card.alt}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Motion.div>

              <Motion.div
                className="p-5"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="text-sm sm:text-base font-bold text-gray-800 tracking-tight text-center mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-center">
                  {card.body}
                </p>
              </Motion.div>
            </Motion.div>
          ))}
        </div>
      </div>
    </Motion.div>
  );
};

export default ComfortableStayss;