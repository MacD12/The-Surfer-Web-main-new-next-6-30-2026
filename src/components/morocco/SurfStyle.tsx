'use client';
import React from 'react';
import { useLocale } from 'next-intl';
import { useTranslation } from '@/lib/i18n-compat';
import CampSection from '@/components/country/CampSection';

const SurfStyle = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  const rawAlts = t('surfStyle.hero.slider.alts', { returnObjects: true });
  const alts = Array.isArray(rawAlts) ? rawAlts : [];

  const slideImages = [
    '/morocco/moro-1.jpg',
    '/morocco/moro-2.jpg',
    '/morocco/moro-3.jpg',
    '/morocco/morocco4.jpg',
  ];

  const fallbacks = ['Surfers on beach', 'Surf training', 'Beach activities', 'Surf lesson'];

  const slides = slideImages.map((image, i) => ({
    image,
    alt: alts[i] || fallbacks[i],
  }));

  return (
    <CampSection
      id="surfstyle-camp"
      variant="light"
      title={t('surfStyle.hero.title')}
      description={t('surfStyle.hero.description')}
      cta={t('common1.bookNow', 'Book Now')}
      ctaHref={`/${locale}/style-camp`}
      ctaTarget="_self"
      slides={slides}
      ariaPrev={t('common.prev', 'Previous slide')}
      ariaNext={t('common.next', 'Next slide')}
      altFallback="The Surfer SurfStyle Surf Camp Morocco image"
    />
  );
};

export default SurfStyle;