'use client';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { MapPin, Navigation, ArrowRight, Waves, Home, Sparkles } from 'lucide-react';
import Header from '@/components/srilanka/Header';
import Perfect from '@/components/country/Perfect';

// Leaflet touches `window` at import time - load only on the client.
const CampsMap = dynamic(() => import('@/components/srilanka/CampsMap'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
      Loading map…
    </div>
  ),
});
import ImageCardHero from '@/components/ImageCard';
import SurfCardWithSlider from '@/components/SurfCardWithSlider';
import Difference from '@/components/Difference';
import ChooseSurfCamp from '@/components/ChooseSurf';
import BeachCamp from '@/components/country/BeachCamp';
import TS2Camp from '@/components/country/TS2Camp';
import SoulSurferCamp from '@/components/country/SoulSurferCamp';
import SurfPackageCard from '@/components/country/Packages';
import Reviews from '@/components/country/Reviews';
import Activities from '@/components/country/Activities';
import Follow from '@/components/country/Follow';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/lib/i18n-compat';

const SRI_LANKA_CAMPS = [
  {
    id: 'beach',
    name: 'The Surfer Beach Camp',
    blurb: 'Beachfront flagship with rooftop & pool',
    plusCode: 'XC9W+WQ Weligama',
    position: [5.9698228, 80.4468871] as [number, number],
    Icon: Waves,
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.9698228%2C80.4468871&destination_place_id=ChIJ8T3AnVsVrjsR7EwuLk09pb8',
  },
  {
    id: 'ts2',
    name: 'TS2 Surf Camp',
    blurb: 'Quieter rooms, 5-min ride to the Beach Camp',
    plusCode: 'XCCG+Q6 Weligama',
    position: [5.9719421, 80.4256101] as [number, number],
    Icon: Home,
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.9719421%2C80.4256101&destination_place_id=ChIJeSPsQDoVrjsRMCGCUUIDNZo',
  },
  {
    id: 'soul',
    name: 'Soul Surfer Camp',
    blurb: 'Independent retreat with rooftop infinity pool',
    plusCode: 'XCCG+M9P Weligama',
    position: [5.971719, 80.425939] as [number, number],
    Icon: Sparkles,
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.971719%2C80.425939',
  },
];

export default function SrilankaClient() {
  const { t } = useTranslation();
  const locale = useLocale();
  const cards = (t('home.cards', { returnObjects: true }) as any[]) || [];
  const card1 = cards?.[0];
  const card2 = cards?.[1];
  const cardSoulSurfer = cards?.[2];

  return (
    <div>
      <Header />
      <Perfect />

      {/* SRI LANKA SECTION - mirrored from Home page */}
      <section
        id="sri-lanka"
        className="relative scroll-mt-20 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Eyebrow */}
          <motion.div
            className="flex flex-col items-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
              {t('home.sections.sriLankaEyebrow')}
            </span>
            <motion.div
              className="h-1 w-20 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
            />
          </motion.div>

          {/* Big Sri Lanka hero image */}
          <div className="mb-12 sm:mb-14">
            <ImageCardHero
              image="image.png"
              title={t('home.sections.sriLankaCardTitle')}
              link={`/${locale}/srilanka`}
              index={0}
            />
          </div>

          {/* The three Sri Lanka camps - Beach Camp + TS2 Camp + Soul Surfer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12 sm:mb-14">
            {card1 && (
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <SurfCardWithSlider
                  images={card1.images}
                  topic={card1.topic}
                  body1={card1.body1}
                  link={`/${locale}${card1.link}`}
                  index={0}
                />
              </motion.div>
            )}

            {card2 && (
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <SurfCardWithSlider
                  images={card2.images}
                  topic={card2.topic}
                  body1={card2.body1}
                  link={`/${locale}${card2.link}`}
                  index={1}
                />
              </motion.div>
            )}

            {cardSoulSurfer && (
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <SurfCardWithSlider
                  images={cardSoulSurfer.images}
                  topic={cardSoulSurfer.topic}
                  body1={cardSoulSurfer.body1}
                  link={`/${locale}${cardSoulSurfer.link}`}
                  index={2}
                />
              </motion.div>
            )}
          </div>

          {/* Camp comparison (Beach + TS2 paired; Soul Surfer independent) */}
          <Difference />
        </div>
      </section>

      <ChooseSurfCamp />
      <BeachCamp />
      <TS2Camp />
      <SoulSurferCamp />

      {/* 3 CAMPS ON MAP */}
      <section
        id="camps-on-map"
        className="relative scroll-mt-20 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-cyan-50/30 via-white to-white overflow-hidden"
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
              <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
              Locations
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
            All three camps on one map
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

          <motion.p
            className="text-center text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Beach Camp, TS2, and Soul Surfer - all in Weligama on Sri Lanka's south coast.
            Tap any camp below for instant directions.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* Map */}
            <motion.div
              className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-white ring-1 ring-gray-100 shadow-xl h-[360px] sm:h-[440px] lg:h-[560px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <CampsMap
                camps={SRI_LANKA_CAMPS.map((c) => ({
                  id: c.id,
                  name: c.name,
                  plusCode: c.plusCode,
                  position: c.position,
                  directionsUrl: c.directionsUrl,
                }))}
              />
            </motion.div>

            {/* Camp pin list */}
            <motion.div
              className="lg:col-span-5 flex flex-col gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.15 }}
            >
              {SRI_LANKA_CAMPS.map((camp, idx) => {
                const Icon = camp.Icon;
                return (
                  <motion.a
                    key={camp.id}
                    href={camp.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 rounded-2xl bg-white ring-1 ring-gray-100 shadow-md hover:shadow-xl hover:ring-cyan-200/60 transition-all duration-300 p-4 sm:p-5"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.3 + idx * 0.08,
                      ease: 'easeOut',
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ y: -3 }}
                  >
                    {/* Index badge */}
                    <span className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25 relative">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.25} />
                      <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-white ring-1 ring-cyan-200 text-[9px] font-bold tabular-nums text-cyan-700">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </span>

                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                        Camp {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-[montserrat] text-base sm:text-lg font-bold tracking-tight text-gray-900 leading-tight truncate">
                        {camp.name}
                      </h3>
                      <p className="mt-0.5 text-xs sm:text-[13px] text-gray-500 leading-snug truncate">
                        {camp.blurb}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400 tabular-nums">
                        <MapPin className="w-3 h-3" strokeWidth={2.25} />
                        {camp.plusCode}
                      </p>
                    </div>

                    <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 group-hover:bg-gradient-to-br group-hover:from-[#0a67b3] group-hover:to-[#0891b2] group-hover:text-white group-hover:ring-transparent transition-all duration-300">
                      <Navigation className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.25} />
                    </span>
                  </motion.a>
                );
              })}

              {/* Footer hint */}
              <motion.p
                className="mt-1 text-[11px] text-gray-400 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <ArrowRight className="inline-block w-3 h-3 mr-1 -mt-0.5" strokeWidth={2.5} />
                Tap a camp to open turn-by-turn directions in Google Maps
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <SurfPackageCard />
      <Reviews />
      <Activities />
      <Follow />
      <Footer />
    </div>
  );
}