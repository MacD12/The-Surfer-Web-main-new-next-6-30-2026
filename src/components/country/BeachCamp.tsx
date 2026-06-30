'use client';
import React from 'react';
import { useLocale } from 'next-intl';
import { useTranslation } from '@/lib/i18n-compat';
import CampSection from './CampSection';

const BeachCamp = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  // Slide images stay in code; alt text is localized
  const slides = [
    { image: '/beach_camp/image_1.jpg', alt: t('beachCamp.slides.0.alt') },
    { image: '/beach_camp/I3.jpg',       alt: t('beachCamp.slides.1.alt') },
    { image: '/beach_camp/surfcard4.jpg', alt: t('beachCamp.slides.2.alt') },
    { image: '/country/I4.jpg',           alt: t('beachCamp.slides.3.alt') },
  ];

  return (
    <CampSection
      id="beach-camp"
      variant="light"
      title={t('beachCamp.title')}
      description={t('beachCamp.desc')}
      cta={t('beachCamp.cta')}
      ctaHref={`/${locale}/beach-camp`}
      ctaTarget="_self"
      slides={slides}
      ariaPrev={t('beachCamp.aria.prev')}
      ariaNext={t('beachCamp.aria.next')}
    />
  );
};

export default BeachCamp;