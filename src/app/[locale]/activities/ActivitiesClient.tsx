'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import LiteYouTube from '@/components/LiteYouTube';
import { useTranslation } from '@/lib/i18n-compat';

/** Reusable section heading with cyan accent bar */
const SectionHeader = ({
  title,
  desc,
  className = '',
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  className?: string;
}) => (
  <div className={`text-center ${className}`}>
    <motion.h2
      className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
      className="mt-4 sm:mt-5 mb-6 flex justify-center"
    >
      <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
    </motion.div>
    {desc && (
      <motion.p
        className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {desc}
      </motion.p>
    )}
  </div>
);

/** Image card with hover zoom + soft surface */
const ImageCard = ({
  src,
  alt = '',
  idx = 0,
  heightCls = 'h-64 sm:h-72 lg:h-80',
}: {
  src: string;
  alt?: string;
  idx?: number;
  heightCls?: string;
}) => (
  <motion.div
    className={`group relative overflow-hidden rounded-2xl ring-1 ring-gray-100 shadow-md hover:shadow-2xl hover:ring-cyan-200/50 transition-all duration-300 ${heightCls}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <Image
      src={src}
      alt={alt || ''}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </motion.div>
);

export default function ActivitiesClient() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <div
        className="relative min-h-screen mb-4 flex items-center w-full overflow-hidden bg-gray-900"
        id="Header"
      >
        <Image
          src="/activities.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        <Navbar />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55 pointer-events-none" />
        <div className="container relative z-10 text-center mx-auto py-4 px-4 sm:px-6 md:px-20 lg:px-32 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-[montserrat] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] inline-block max-w-full sm:max-w-3xl font-bold tracking-tight leading-[1.02] pt-18 mt-16 sm:mt-8 md:-mt-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          >
            {t('activities.header')}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            className="mt-6 sm:mt-8 flex justify-center"
          >
            <span className="block h-[3px] w-14 sm:w-20 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
          </motion.div>
        </div>
      </div>

      {/* Boat Party */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-6">
        <SectionHeader
          title={t('activities.boatParty.title')}
          desc={t('activities.boatParty.desc')}
          className="mb-8 sm:mb-10"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <ImageCard src="/activities/acti-1.jpg" alt={t('activities.boatParty.title')} idx={0} />
          <ImageCard src="/activities/acti-2.jpg" alt={t('activities.boatParty.title')} idx={1} />
          <ImageCard src="/activities/acti-3.jpg" alt={t('activities.boatParty.title')} idx={2} />
        </div>
      </section>

      {/* Boat Party Video */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <motion.div
          className="rounded-2xl ring-1 ring-gray-100 shadow-xl overflow-hidden bg-black"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative w-full aspect-video">
            <LiteYouTube videoId="AcTKzSIc9T0" title="Boat Party Video" />
          </div>
        </motion.div>
      </section>

      {/* Booking CTA */}
      <motion.section
        className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-14 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-white ring-1 ring-cyan-100/60 shadow-md p-8 sm:p-10"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="font-[montserrat] text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-800 mb-6">
            {t('activities.booking.title')}
          </h3>
          <a
            href="/book-now"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm sm:text-base font-semibold shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-105 transition-all duration-300"
          >
            {t('activities.booking.button')}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.section>

      {/* Meet People */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeader
          title={t('activities.meetPeople.title')}
          desc={t('activities.meetPeople.desc')}
          className="mb-8 sm:mb-10"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <ImageCard src="/activities/friends1.jpg" alt={t('activities.meetPeople.title')} idx={0} />
          <ImageCard src="/activities/acti-5.jpg" alt={t('activities.meetPeople.title')} idx={1} />
          <ImageCard src="/activities/people2.jpg" alt={t('activities.meetPeople.title')} idx={2} />
        </div>
      </section>

      {/* Surf Holiday */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeader
          title={t('activities.surfHoliday.title')}
          desc={t('activities.surfHoliday.desc')}
          className="mb-10 sm:mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <ImageCard src="/activities/main1.jpg" alt={t('activities.surfHoliday.title')} idx={0} heightCls="h-72 sm:h-80 lg:h-[26rem]" />
          <ImageCard src="/activities/main3.jpg" alt={t('activities.surfHoliday.title')} idx={1} heightCls="h-72 sm:h-80 lg:h-[26rem]" />
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-14">
        <motion.div
          className="group relative overflow-hidden rounded-2xl ring-1 ring-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-64 sm:h-80 md:h-96"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image
            src="/activities/main2.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>
      </section>

      {/* Friends for Life */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeader
          title={t('activities.friendsForLife.title')}
          desc={t('activities.friendsForLife.desc')}
          className="mb-8 sm:mb-10"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <ImageCard src="/activities/info_4.jpg" alt={t('activities.friendsForLife.title')} idx={0} />
          <ImageCard src="/activities/info_5.jpg" alt={t('activities.friendsForLife.title')} idx={1} />
          <ImageCard src="/activities/info_6.jpg" alt={t('activities.friendsForLife.title')} idx={2} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
