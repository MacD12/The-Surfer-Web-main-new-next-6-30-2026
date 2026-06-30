'use client';
import React from 'react';
import { useLocale } from 'next-intl';
import { useTranslation } from '@/lib/i18n-compat';
import CampSection from './CampSection';

// Using booking_engine/soulcamp*.jpg until dedicated /public/soul_surfer/ photos
// are supplied (see public/soul_surfer/README.txt).
const SoulSurferCamp = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  const rawAlts = t('soulSurferCamp.slides', { returnObjects: true });
  const alts = Array.isArray(rawAlts) ? rawAlts.map((a: any) => a?.alt) : [];

  const slideImages = [
    '/soul_camp/2.jpg',
    '/booking_engine/soulcamp2.jpg',
    '/booking_engine/soulcamp3.jpg',
    '/booking_engine/soulcamp4.jpg',
  ];

  const slides = slideImages.map((image, i) => ({
    image,
    alt: alts[i] || 'Soul Surfer Camp image',
  }));

  return (
    <CampSection
      id="soul-surfer-camp"
      variant="light"
      title={t('soulSurferCamp.title', 'Soul Surfer Camp – Sri Lanka')}
      description={t(
        'soulSurferCamp.desc',
        'An independent retreat for the dedicated surfer. Set in Weligama with its own dedicated location, rooftop infinity pool, and sea-view rooftop dining.',
      )}
      cta={t('soulSurferCamp.cta', 'Book Now')}
      ctaHref={`/${locale}/soul-surfer`}
      ctaTarget="_self"
      slides={slides}
      ariaPrev={t('soulSurferCamp.aria.prev', 'Previous slide')}
      ariaNext={t('soulSurferCamp.aria.next', 'Next slide')}
      altFallback="Soul Surfer Camp image"
    />
  );
};

export default SoulSurferCamp;