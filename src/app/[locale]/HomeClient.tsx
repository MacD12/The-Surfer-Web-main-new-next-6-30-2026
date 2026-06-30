'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Award, Trophy, Star, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import SurfingJourney from '@/components/SurfingJourney';
import SurfingJourneyIcons from '@/components/SurfingJourneyIcons';
import SurfCardWithSlider from '@/components/SurfCardWithSlider';
import ChooseSurfCamp from '@/components/ChooseSurf';
import ImageCard from '@/components/ImageCard';
import Difference from '@/components/Difference';
import Activities from '@/components/Activities';
import MasonryGrid from '@/components/Follow';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import Blogs from '@/components/Blogs';
import { Footer } from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useTranslation } from '@/lib/i18n-compat';

export default function HomeClient() {
  const { t } = useTranslation();
  const locale = useLocale();
  const cards = t('home.cards', { returnObjects: true }) as any[];
  const card1 = cards?.[0];
  const card2 = cards?.[1];
  const cardSoulSurfer = cards?.[2];
  const cardMorocco = cards?.[3];

  // Defer the 6.9 MB hero MP4 until the LCP image has painted and the browser
  // is idle. Until then, only the <Image> renders - so LCP fires on the
  // optimized JPG and isn't dragged out by the video element layering on top.
  const [loadVideo, setLoadVideo] = useState(false);
  useEffect(() => {
    const trigger = () => setLoadVideo(true);
    const idle = (window as any).requestIdleCallback;
    const handle = idle ? idle(trigger, { timeout: 2500 }) : window.setTimeout(trigger, 2000);
    return () => {
      if (idle && (window as any).cancelIdleCallback) (window as any).cancelIdleCallback(handle);
      else window.clearTimeout(handle as number);
    };
  }, []);

  return (
    <div>
      {/* HERO with background video */}
      <div className="relative min-h-screen w-full overflow-hidden bg-cover bg-center flex items-center mb-4">
        <Navbar />

        {/* LCP image - Next/Image with priority so the hero shot lands fast.
            The video below mounts ONLY after the page is idle so its 6.9MB
            payload doesn't compete with the LCP image for bandwidth, and the
            video element can't be selected as the LCP candidate. */}
        <Image
          src="/surfcard1.jpg"
          alt="Surfers riding waves at The Surfer Beach Camp Weligama, Sri Lanka"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="absolute inset-0 object-cover z-0"
        />

        {loadVideo && (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/Surf.mp4" type="video/mp4" />
          </video>
        )}

        {/* Gradient overlay - guarantees text contrast on the moving video */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/55 pointer-events-none"
        />

        <div className="container relative z-10 mx-auto w-full py-4 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 text-white">
          {/* Centered wordmark — this is the LCP element, so it renders
              statically (no opacity-0 entrance animation). Gating it behind a
              framer-motion fade-in shipped it invisible in the HTML and delayed
              LCP until hydration ran (~2.5s on slow mobile). */}
          <h1
            className="font-[montserrat] text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-bold leading-[0.98] tracking-tight mt-16 sm:mt-8 md:mt-4 max-w-full sm:max-w-3xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
            style={{ whiteSpace: 'pre-line' }}
          >
            {t('home.hero.heading')}
          </h1>

          {/* Trust badges - centered row directly under the title */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          >
            <span className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/25 hover:ring-white/40 md:hover:-translate-x-1">
              <Award className="w-4 h-4 text-cyan-200" strokeWidth={2.25} />
              {t('home.hero.trust.tripadvisor')}
            </span>
            <span className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/25 hover:ring-white/40 md:hover:-translate-x-1">
              <Trophy className="w-4 h-4 text-cyan-200" strokeWidth={2.25} />
              {t('home.hero.trust.travelersChoice')}
            </span>
            <span className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/25 hover:ring-white/40 md:hover:-translate-x-1">
              <Star className="w-4 h-4 text-cyan-200 fill-cyan-200" strokeWidth={2.25} />
              {t('home.hero.trust.googleReviews')}
            </span>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.a
          href="#sri-lanka"
          aria-label="Scroll to Sri Lanka section"
          className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 items-center justify-center text-white hover:bg-white/25 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 0.9, duration: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <ChevronDown className="w-5 h-5" strokeWidth={2.25} />
        </motion.a>
      </div>

      <SurfingJourney />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <SurfingJourneyIcons />
      </motion.div>

      {/* SRI LANKA SECTION */}
      <section id="sri-lanka" className="relative scroll-mt-20 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Eyebrow above the hero image */}
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
            <ImageCard
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
                  tall
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
                  tall
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
                  tall
                  isNew
                />
              </motion.div>
            )}
          </div>

          {/* Camp comparison (Beach Camp + TS2 paired; Soul Surfer independent) */}
          <Difference />
        </div>
      </section>

      {/* MOROCCO SECTION */}
      <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Eyebrow above the hero image */}
          <motion.div
            className="flex flex-col items-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
              {t('home.sections.moroccoEyebrow')}
            </span>
            <motion.div
              className="h-1 w-20 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3] origin-center"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
            />
          </motion.div>

          {/* Big Morocco hero image */}
          <div className="mb-12 sm:mb-14">
            <ImageCard
              image="morocco.jpg"
              title={t('home.sections.moroccoCardTitle')}
              link={`/${locale}/morocco`}
              index={0}
            />
          </div>

          {/* Camp card + descriptive panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            {cardMorocco && (
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <SurfCardWithSlider
                  images={cardMorocco.images}
                  topic={cardMorocco.topic}
                  body1={cardMorocco.body1}
                  link={`/${locale}${cardMorocco.link}`}
                  index={3}
                />
              </motion.div>
            )}

            <motion.div
              className="relative h-full flex flex-col justify-center bg-white rounded-2xl shadow-md ring-1 ring-black/5 p-6 sm:p-8 md:p-10 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* Left-edge brand accent bar */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0a67b3] via-cyan-400 to-[#0a67b3]"
              />

              {/* Sparkle icon chip */}
              <div className="mb-5 inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-[#0a67b3]/25">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={1.75} />
              </div>

              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 leading-tight">
                {t('home.sections.moroccoNoteHeading')}
              </h3>
              <p className="text-sm md:text-[15px] text-gray-600 leading-[1.75]">
                {t('home.sections.styleCampNote')}
              </p>
            </motion.div>
          </div>

          {/* Book Now CTA */}
          <motion.div
            className="flex justify-center mt-12 sm:mt-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <a
              href={`/${locale}/style-camp`}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm font-semibold shadow-lg shadow-[#0a67b3]/25 hover:shadow-xl hover:shadow-[#0a67b3]/40 hover:scale-105 transition-all duration-300"
            >
              {t('home.cta.bookNow')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <ChooseSurfCamp />
      </motion.div>

      <Activities />
      <MasonryGrid />
      <Reviews />
      <FAQ />
      <Blogs />
      <Footer />
    </div>
  );
}