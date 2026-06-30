'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { MapPin, Navigation, ArrowRight, Mountain } from 'lucide-react';
import Header from '@/components/morocco/Header';
import Perfect from '@/components/morocco/Perfect';
import ChooseSurfCamp from '@/components/morocco/ChooseSurf';
import SurfStyle from '@/components/morocco/SurfStyle';
import SurfPackageCard from '@/components/morocco/Packages';
import Reviews from '@/components/country/Reviews';
import Activities from '@/components/morocco/Activities';
import { Footer } from '@/components/Footer';

// Leaflet touches `window` at import time - load only on the client.
const CampsMap = dynamic(() => import('@/components/srilanka/CampsMap'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
      Loading map…
    </div>
  ),
});

const MOROCCO_CAMPS = [
  {
    id: 'surfstyle',
    name: 'The Surfer SurfStyle Surf Camp',
    blurb: 'Atlantic point breaks & cliffside Tamraght living',
    plusCode: 'G889+J8 Agadir',
    position: [30.5165125, -9.6817112] as [number, number],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=30.5165125%2C-9.6817112&destination_place_id=ChIJfYpk3UAwO9sRmceK1lKAem4',
  },
];

export default function MoroccoClient() {
  return (
    <div>
      <Header />
      <Perfect />
      <ChooseSurfCamp />
      <SurfStyle />

      {/* MOROCCO CAMP ON MAP */}
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
              Location
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
            Find us on the Tamraght coast
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
            A short ride from Agadir airport and minutes from Anchor Point and Killer Point -
            tap the pin for instant turn-by-turn directions.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* Map */}
            <motion.div
              className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-white ring-1 ring-gray-100 shadow-xl h-[360px] sm:h-[440px] lg:h-[520px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <CampsMap camps={MOROCCO_CAMPS} />
            </motion.div>

            {/* Camp pin card(s) */}
            <motion.div
              className="lg:col-span-5 flex flex-col gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.15 }}
            >
              {MOROCCO_CAMPS.map((camp, idx) => (
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
                  <span className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25 relative">
                    <Mountain className="w-5 h-5 text-white" strokeWidth={2.25} />
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
              ))}

              {/* Quick facts panel */}
              <motion.div
                className="rounded-2xl bg-gradient-to-br from-cyan-50/60 via-white to-white ring-1 ring-cyan-100/70 p-4 sm:p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700 mb-2">
                  Getting here
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                    ~30 min drive from Agadir Al Massira Airport (AGA)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                    Walking distance to Banana Beach & Devil's Rock
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                    Anchor Point & Killer Point a short ride away
                  </li>
                </ul>
              </motion.div>

              {/* Footer hint */}
              <motion.p
                className="mt-1 text-[11px] text-gray-400 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <ArrowRight className="inline-block w-3 h-3 mr-1 -mt-0.5" strokeWidth={2.5} />
                Tap the pin or card to open turn-by-turn directions in Google Maps
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <SurfPackageCard />
      <Reviews />
      <Activities />
      <Footer />
    </div>
  );
}
