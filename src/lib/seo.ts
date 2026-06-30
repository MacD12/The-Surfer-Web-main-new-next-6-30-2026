// src/lib/seo.ts
// Centralized SEO metadata builder. Each page passes its slug + per-page copy
// + hero image; this returns a fully populated Next.js Metadata object with
// canonical, alternates, openGraph and twitter all set against SITE_URL.

import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thesurferweligama.com';

export const SITE_NAME = 'The Surfer';

export type PageSeoInput = {
  /** Path AFTER the locale segment, e.g. '' for home, '/beach-camp' for camp pages. */
  slug: string;
  title: string;
  description: string;
  image?: string;
  /** Active locale - used for canonical, og:locale, and og:locale:alternate. Defaults to the routing default. */
  locale?: string;
  /** Override og:type. Defaults to 'website'. */
  type?: 'website' | 'article';
};

// Map next-intl locale codes to Open Graph locale codes (BCP-47).
const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
};

/**
 * Build a complete Metadata object for a page that exists in every locale.
 * Returns absolute URLs for canonical, alternates, openGraph and twitter so
 * the metadata is correct regardless of where the page is rendered from.
 */
export function buildPageMetadata({
  slug,
  title,
  description,
  image = '/logo.png',
  locale,
  type = 'website',
}: PageSeoInput): Metadata {
  // Normalize: strip trailing slash, ensure leading slash
  const cleanSlug = ('/' + slug.replace(/^\/+|\/+$/g, '')).replace(/\/+$/, '');
  const path = cleanSlug === '/' ? '' : cleanSlug;

  const activeLocale = locale && routing.locales.includes(locale as (typeof routing.locales)[number])
    ? locale
    : routing.defaultLocale;

  const canonicalUrl = `${SITE_URL}/${activeLocale}${path}`;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${SITE_URL}/${loc}${path}`;
  }
  // Canonical alias for hreflang fallback
  languages['x-default'] = `${SITE_URL}/${routing.defaultLocale}${path}`;

  const absoluteImage = image.startsWith('http')
    ? image
    : `${SITE_URL}${image.startsWith('/') ? image : '/' + image}`;

  const fullTitle = `${title} | ${SITE_NAME}`;

  const ogActive = OG_LOCALE[activeLocale] || OG_LOCALE[routing.defaultLocale];
  const ogAlternates = routing.locales
    .filter((loc) => loc !== activeLocale)
    .map((loc) => OG_LOCALE[loc])
    .filter(Boolean);

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: title }],
      type,
      locale: ogActive,
      alternateLocale: ogAlternates,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}
