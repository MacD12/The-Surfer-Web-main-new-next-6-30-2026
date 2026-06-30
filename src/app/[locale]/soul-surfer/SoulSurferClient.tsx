'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { MapPin, ArrowRight, Navigation } from 'lucide-react';
import Header from '@/components/soul_surfer/Header';
import LifeAtSoulSurfer from '@/components/soul_surfer/Life';
import ImageCard from '@/components/soul_surfer/ImageCard';
import Package from '@/components/soul_surfer/Package';
import ComfortableStaysSoul from '@/components/soul_surfer/ComfortableStays';
import AboutSoulSurfer from '@/components/soul_surfer/AboutSoulSurfer';
import CampLocationCard from '@/components/CampLocationCard';
import CampFaq from '@/components/CampFaq';
import { Footer } from '@/components/Footer';

const CampsMap = dynamic(() => import('@/components/srilanka/CampsMap'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
      Loading map…
    </div>
  ),
});

const SOUL_CAMP_PIN = [
  {
    id: 'soul',
    name: 'Soul Surfer Camp',
    plusCode: 'XCCG+M9P Weligama',
    position: [5.971719, 80.425939] as [number, number],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=5.971719%2C80.425939',
  },
];

export default function SoulSurferClient() {
  return (
    <div>
      <Header />
      <LifeAtSoulSurfer />
      <ImageCard />
      <Package />
      <ComfortableStaysSoul />

      <AboutSoulSurfer />

      {/* LOCATION */}
      <section
        id="Location"
        className="relative scroll-mt-20 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-cyan-50/30 via-white to-white overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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

          <motion.h2
            className="font-[montserrat] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-gray-900 leading-[1.05]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
          >
            Soul Surfer's own corner of Weligama
          </motion.h2>

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
            An independent retreat in Weligama with its own dedicated location, a quiet street
            address, and a rhythm of its own - minutes from the bay and the surf.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
            <motion.div
              className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-white ring-1 ring-gray-100 shadow-xl h-[360px] sm:h-[420px] md:h-[480px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <CampsMap camps={SOUL_CAMP_PIN} />

              <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5 z-[400] flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/95 backdrop-blur-md ring-1 ring-black/5 shadow-lg p-3 sm:p-4 pointer-events-none">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-cyan-500/25 shrink-0">
                    <Navigation className="w-4 h-4 text-white" strokeWidth={2.25} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-700">
                      Soul Surfer Camp
                    </span>
                    <span className="block font-[montserrat] text-sm sm:text-base font-bold tracking-tight text-gray-900 leading-tight truncate">
                      Weligama · South Coast, Sri Lanka
                    </span>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=5.971719%2C80.425939"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-xs sm:text-sm font-semibold shadow-md shadow-cyan-500/25 hover:shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-200 pointer-events-auto"
                >
                  Get directions
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </a>
              </div>
            </motion.div>

            <CampLocationCard
              campName="Soul Surfer Camp"
              streetAddress="No 140/13, 3rd Lane, Paranakade"
              locality="Weligama"
              postalCode="81700"
              country="Sri Lanka"
              plusCode="XCCG+M9P Weligama"
              email="info@thesurferweligama.com"
              googleMapsUrl="https://www.google.com/maps/place/Soul+Surfer+Camp/@5.971719,80.425939,17z"
            />
          </div>
        </div>
      </section>

      <CampFaq campKey="soul" />

      <Footer />
    </div>
  );
}
