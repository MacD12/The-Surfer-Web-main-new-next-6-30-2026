'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Award,
  Trophy,
  Star,
  ArrowRight,
  Waves,
  MapPin,
  Heart,
  ShieldCheck,
  ThermometerSun,
  Plane,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import CampFaq from '@/components/CampFaq';

type Props = { locale: string };

/**
 * Head-term landing page for "Surf Camp Sri Lanka".
 * Standalone composition - focused on conversion + keyword density without
 * duplicating /srilanka (destination/country page).
 */
export default function LandingClient({ locale }: Props) {
  const lp = (path: string) => `/${locale}${path === '/' ? '' : path}`;

  const camps = [
    {
      id: 'beach',
      title: 'The Surfer Beach Camp Weligama',
      subtitle: 'Beachfront · Pool · Yoga · For all levels',
      link: '/beach-camp',
      image: '/beachcamp.jpg',
      icon: Waves,
    },
    {
      id: 'ts2',
      title: 'The Surfer TS2 Camp Weligama',
      subtitle: 'Budget · Private AC rooms · 5-min shuttle to Beach Camp',
      link: '/ts2-camp',
      image: '/ts2camp.jpg',
      icon: MapPin,
    },
    {
      id: 'soul',
      title: 'Soul Surfer Camp Weligama',
      subtitle: 'Premium · Rooftop infinity pool · Independent retreat',
      link: '/soul-surfer',
      image: '/soul_surfer/hero.jpg',
      icon: Heart,
    },
  ];

  const reasons = [
    {
      icon: Award,
      title: '6× Tripadvisor Travellers’ Choice',
      body: 'Awarded 2018 and consistently every year 2021–2025 - recognised by surfers worldwide as the top-rated surf camp in Sri Lanka.',
    },
    {
      icon: Star,
      title: '4.9★ from 1600+ verified reviews',
      body: 'Real feedback from over 1,600 European travellers across Google, Tripadvisor and our booking partners.',
    },
    {
      icon: ShieldCheck,
      title: 'ISA-certified surf instructors',
      body: 'Every lesson is run by an International Surfing Association-qualified coach - the global gold standard for surf instruction.',
    },
    {
      icon: ThermometerSun,
      title: '28 °C water · Nov–Apr peak season',
      body: 'Warm year-round - no wetsuit needed. November to April is the south-west coast peak season for consistent, beginner-friendly waves.',
    },
    {
      icon: Plane,
      title: 'Built for European travellers',
      body: '10-hour flight from most EU hubs, +5.5h timezone, bilingual EN/DE staff, EUR pricing, and direct booking - no third-party markups.',
    },
    {
      icon: Trophy,
      title: '3 camps · 1 community',
      body: 'Beach Camp, TS2 and Soul Surfer share the same Weligama Bay surf, the same ISA-certified coaching team, and the same legendary social scene.',
    },
  ];

  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <section
        className="relative min-h-[80vh] sm:min-h-screen w-full overflow-hidden bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/surfcard1.jpg')" }}
      >
        <Navbar />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55 pointer-events-none"
        />

        <div className="container relative z-10 mx-auto w-full py-4 px-4 sm:px-6 md:px-10 text-white">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-200/95 backdrop-blur-sm bg-white/10 ring-1 ring-white/25 rounded-full px-3 py-1.5 shadow-md shadow-black/20">
              <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
              Weligama · South Coast · Sri Lanka
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 font-[montserrat] text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-bold leading-[0.98] tracking-tight max-w-5xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Surf Camp Sri Lanka
          </motion.h1>

          <motion.p
            className="mt-5 sm:mt-6 text-center text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            The Surfer · Weligama Bay · 3 camps for every budget · ISA-certified
            instructors · 4.9★ from 1600+ European travellers.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shadow-lg shadow-black/20">
              <Award className="w-4 h-4 text-cyan-200" strokeWidth={2.25} />
              6× Tripadvisor Travellers’ Choice
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shadow-lg shadow-black/20">
              <Star className="w-4 h-4 text-cyan-200 fill-cyan-200" strokeWidth={2.25} />
              4.9★ · 1600+ reviews
            </span>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            <Link
              href={lp('/rates')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm font-semibold shadow-lg shadow-[#0a67b3]/35 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              See packages & prices
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={lp('/contact')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/30 text-white text-sm font-semibold hover:bg-white/25 transition-all duration-300"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---------------- INTRO ---------------- */}
      <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <motion.span
            className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Top rated surf camp Sri Lanka
          </motion.span>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Europe’s most-loved surf camp in Sri Lanka
          </motion.h2>
          <motion.div
            className="mt-4 mb-5 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3]"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />
          <motion.p
            className="text-base text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Looking for a surf camp in Sri Lanka? The Surfer is Weligama’s
            top-rated original surf camp - three camps in one community on Sri
            Lanka’s south coast, run by ISA-certified instructors who have hosted
            over 1,600 European guests with a consistent 4.9★ rating. Beachfront
            stay, beginner-friendly waves, daily yoga, and a thriving social scene
            that turns surf trips into surf families.
          </motion.p>
        </div>
      </section>

      {/* ---------------- WHY US ---------------- */}
      <section className="relative py-14 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="flex flex-col items-center mb-10 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
              Why The Surfer
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Why we’re Sri Lanka’s top-rated surf camp
            </h2>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3]" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={i}
                  className="relative bg-white rounded-2xl shadow-md ring-1 ring-black/5 p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:ring-[#0a67b3]/25"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0a67b3] via-cyan-400 to-[#0a67b3]"
                  />
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-[#0a67b3]/25 mb-4">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-[1.75]">{r.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- 3 CAMPS ---------------- */}
      <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/40 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="flex flex-col items-center mb-10 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
              Choose your camp
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Three Sri Lanka surf camps, one Weligama Bay community
            </h2>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3]" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {camps.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.id}
                  className="group relative rounded-2xl bg-white shadow-md ring-1 ring-black/5 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <Link href={lp(c.link)} className="block">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={70}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-[#0a67b3]/25">
                          <Icon className="w-4 h-4 text-white" strokeWidth={1.75} />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-snug">
                          {c.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-[1.65]">
                        {c.subtitle}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a67b3] group-hover:translate-x-1 transition-transform duration-300">
                        Explore camp <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- AGGREGATE FAQ ---------------- */}
      <CampFaq campKey="beach" />

      {/* ---------------- BOTTOM CTA ---------------- */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-[#0a67b3] via-[#0891b2] to-[#0e7490] text-white text-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Ready to book your surf camp Sri Lanka trip?
          </motion.h2>
          <p className="mt-4 text-sm sm:text-base text-white/90 leading-relaxed">
            EUR pricing, direct booking, no third-party markups. Bilingual
            English/German support. 4.9★ from 1600+ European travellers.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="/book-now"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#0a67b3] text-sm font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Book now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              href={lp('/contact')}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/40 text-white text-sm font-semibold hover:bg-white/25 transition-all duration-300"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
