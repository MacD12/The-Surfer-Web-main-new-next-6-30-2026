'use client';
import React from 'react';
import { useLocale } from 'next-intl';
import { useTranslation } from '@/lib/i18n-compat';
import CampSection from './CampSection';

const TS2Camp = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  // i18n alts are stored as a flat array under ts2Camp.hero.slider.alts
  const rawAlts = t('ts2Camp.hero.slider.alts', { returnObjects: true });
  const alts = Array.isArray(rawAlts) ? rawAlts : [];
  const altFallback = t('ts2Camp.hero.slider.altFallback', 'TS2 Camp image');

  const slideImages = [
    '/ts2_camp/restaurant.jpg',
    '/ts2_camp/carrom.jpg',
    '/ts2_camp/building.jpg',
    '/country/I3.jpg',
  ];

  const slides = slideImages.map((image, i) => ({
    image,
    alt: alts[i] || altFallback,
  }));

  return (
    <CampSection
      id="ts2-camp"
      variant="gray"
      title={t('ts2Camp.hero.title', 'TS2 Camp – Sri Lanka')}
      description={t(
        'ts2Camp.hero.description',
        'A quieter, budget-friendly version of our main camp, just a few minutes from the surf. Great for solo travelers and those wanting a relaxed atmosphere.',
      )}
      cta={t('ts2Camp.hero.cta', 'Book Now')}
      ctaHref={`/${locale}/ts2-camp`}
      ctaTarget="_self"
      slides={slides}
      ariaPrev={t('common.prev', 'Previous slide')}
      ariaNext={t('common.next', 'Next slide')}
      altFallback={altFallback}
    />
  );
};

export default TS2Camp;