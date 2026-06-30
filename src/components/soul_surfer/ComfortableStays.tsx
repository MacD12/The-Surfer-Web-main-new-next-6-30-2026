'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { BedDouble, Sparkles } from 'lucide-react';
import RoomImageSlider from './RoomImageSlider';
import { useTranslation } from '@/lib/i18n-compat';

type RoomKey = 'dormitory' | 'singleRoom' | 'doubleRoom';

const ROOM_IMAGES: Record<RoomKey, string[]> = {
  dormitory: [
    '/soul_camp/DORM/1.jpg',
    '/soul_camp/DORM/2.jpeg',
    '/soul_camp/DORM/3.JPG',
    '/soul_camp/DORM/4.JPG',
    '/soul_camp/DORM/5.jpeg',
  ],
  singleRoom: [
    '/soul_camp/single-room/1.JPG',
    '/soul_camp/single-room/2.jpeg',
    '/soul_camp/single-room/3.JPG',
    '/soul_camp/single-room/4.JPG',
    '/soul_camp/single-room/5.JPG',
  ],
  doubleRoom: [
    '/soul_camp/double-room/1.JPG',
    '/soul_camp/double-room/2.JPG',
    '/soul_camp/double-room/3.JPG',
    '/soul_camp/double-room/4.JPG',
    '/soul_camp/double-room/5.JPG',
  ],
};

const ROOM_CAPACITY: Record<RoomKey, string> = {
  dormitory: 'Up to 6 guests',
  singleRoom: '1 guest',
  doubleRoom: '2 guests',
};

type Room = {
  key: RoomKey;
  title: string;
  alt: string;
  desc: string;
};

const ComfortableStaysSoul = () => {
  const { t } = useTranslation();
  const rooms = t('comfortableStaysSoul.rooms', { returnObjects: true }) as Room[];

  return (
    <section
      id="ComfortableStaysSoul"
      className="relative scroll-mt-20 py-14 sm:py-16 md:py-20 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Eyebrow */}
        <motion.div
          className="flex flex-col items-center mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold text-[#0a67b3]">
            <BedDouble className="w-3.5 h-3.5" strokeWidth={2.5} />
            Brand new rooms
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-[montserrat] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-gray-900 leading-[1.05]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {t('comfortableStaysSoul.title')}
        </motion.h2>

        {/* Accent bar */}
        <motion.div
          className="mt-5 mb-5 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="block h-[3px] w-16 sm:w-20 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
        </motion.div>

        {/* Intro */}
        <motion.p
          className="text-sm sm:text-base text-gray-500 leading-relaxed text-center max-w-3xl mx-auto mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {t('comfortableStaysSoul.intro')}
        </motion.p>

        {/* Room cards - 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {rooms.map((room, idx) => (
            <motion.div
              key={room.key || idx}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 shadow-md hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-300"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + idx * 0.08, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4 }}
            >
              <div className="relative">
                <RoomImageSlider
                  images={ROOM_IMAGES[room.key] || []}
                  altText={room.alt}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Index */}
                <span className="absolute top-3 left-3 inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-[0.18em] uppercase text-gray-800 ring-1 ring-black/5 shadow-sm tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {/* New badge */}
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/95 text-white text-[10px] font-bold tracking-[0.14em] uppercase ring-1 ring-cyan-300/40 shadow-sm">
                  <Sparkles className="w-3 h-3" strokeWidth={2.5} />
                  New
                </span>
                {/* Capacity */}
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-wide text-gray-800 ring-1 ring-black/5 shadow-sm">
                  <span className="block w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  {ROOM_CAPACITY[room.key] || ''}
                </span>
              </div>

              <div className="flex-1 flex flex-col p-5">
                <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-900 text-center leading-tight">
                  {room.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed text-center">
                  {room.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComfortableStaysSoul;