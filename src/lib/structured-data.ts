// src/lib/structured-data.ts
//
// Centralized JSON-LD builders. Every schema returned by this module reads
// from a single source of truth (CAMPS_DATA below) so on-page content,
// metadata and structured data stay in sync.
//
// Ranking strategy notes
//   - aggregateRating is set on EVERY camp page, not just home - Google
//     surfaces star ratings in SERPs only when the schema is on the
//     reviewed page itself.
//   - areaServed enumerates EU target markets - boosts geo-relevance for
//     European searches.
//   - knowsLanguage advertises bilingual operation - helps Google decide
//     which page to surface for German vs English queries.
//   - sameAs links boost entity authority via third-party references.
//   - BreadcrumbList renders crumb trails in SERPs (better CTR).
//   - WebSite + SearchAction unlocks the SiteLinks search box.

import { SITE_URL, SITE_NAME } from './seo';

export type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

// ---------------------------------------------------------------------------
// Single source of truth for every camp.
// ---------------------------------------------------------------------------

export type CampData = {
  id: 'beach' | 'ts2' | 'soul' | 'style' | 'wave';
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  telephone?: string;
  email?: string;
  streetAddress: string;
  locality: string;
  postalCode: string;
  countryCode: 'LK' | 'MA';
  latitude: number;
  longitude: number;
  priceRange: '$' | '$$' | '$$$';
  hasMapUrl: string;
};

export const CAMPS_DATA: CampData[] = [
  {
    id: 'beach',
    slug: '/beach-camp',
    name: 'The Surfer Beach Camp',
    shortDescription:
      'Beachfront surf camp in Weligama with swimming pool, oceanfront rooms, daily ISA-certified surf lessons and yoga.',
    longDescription:
      'Premier beachfront surf camp in Weligama, Sri Lanka. Steps from the south coast surf break with on-site pool, restaurant, dedicated yoga area, and ISA-certified instructors. Designed for European travellers escaping winter - November through April delivers consistent waves perfect for all levels.',
    image: '/beachcamp.jpg',
    telephone: '+94 76 696 6543',
    email: 'info@thesurferweligama.com',
    streetAddress: 'NO 65, Wadana Watta, Pelena',
    locality: 'Weligama',
    postalCode: '81700',
    countryCode: 'LK',
    latitude: 5.969813,
    longitude: 80.446938,
    priceRange: '$$',
    hasMapUrl: 'https://maps.app.goo.gl/bZZ3HPyEMXUor9GJA',
  },
  {
    id: 'ts2',
    slug: '/ts2-camp',
    name: 'The Surfer TS2 Camp',
    shortDescription:
      'TS2 surf camp in Weligama - simple private rooms with AC, a 5-minute ride from Beach Camp where activities and meals take place.',
    longDescription:
      'Budget-friendly companion camp in Weligama. Private air-conditioned rooms with ensuite, 5-minute transfer to The Surfer Beach Camp where all surf, yoga and dining happen. Ideal for European travellers who want to sleep cheap and socialise where the action is.',
    image: '/ts2camp.jpg',
    telephone: '+94 76 696 6543',
    email: 'info@thesurferweligama.com',
    streetAddress: 'No 176/12, 3rd Lane, Paranakade',
    locality: 'Weligama',
    postalCode: '81700',
    countryCode: 'LK',
    latitude: 5.971938,
    longitude: 80.425563,
    priceRange: '$',
    hasMapUrl: 'https://maps.app.goo.gl/r9FZ5MZQE2ki6t2J8',
  },
  {
    id: 'soul',
    slug: '/soul-surfer',
    name: 'Soul Surfer Camp',
    shortDescription:
      'Independent surf retreat in Weligama for the dedicated surfer. Rooftop infinity pool, rooftop restaurant with sea view, own schedule of sessions.',
    longDescription:
      'Independent surf retreat in Weligama, Sri Lanka, for the serious surfer. Rooftop infinity pool with panoramic sea view, rooftop restaurant, dedicated rooftop yoga area, and its own private schedule of surf sessions. Perfect for European surfers seeking focus and progression.',
    image: '/soul_surfer/hero.jpg',
    telephone: '+94 76 696 6543',
    email: 'info@thesurferweligama.com',
    streetAddress: 'No 140/13, 3rd Lane, Paranakade',
    locality: 'Weligama',
    postalCode: '81700',
    countryCode: 'LK',
    latitude: 5.97173,
    longitude: 80.425964,
    priceRange: '$$',
    hasMapUrl: 'https://maps.app.goo.gl/9zyGn3aWbNUL7ey18',
  },
  {
    id: 'style',
    slug: '/style-camp',
    name: 'The Surfer SurfStyle Surf Camp',
    shortDescription:
      'Partner surf camp in Tamraght, Morocco - consistent Atlantic waves, expert-led surf sessions, optional yoga and laid-back Moroccan hospitality.',
    longDescription:
      'European-friendly partner camp in Tamraght, Morocco - 4-hour direct flight from most European hubs. Anchor Point and Killer Point on your doorstep, expert-led surf coaching, optional yoga, rooftop terrace with Atlantic views. Year-round waves with European peak season October–April.',
    image: '/surfstyle.jpg',
    streetAddress: 'Tamraght',
    locality: 'Agadir',
    postalCode: '80023',
    countryCode: 'MA',
    latitude: 30.5097,
    longitude: -9.7193,
    priceRange: '$$',
    hasMapUrl: 'https://maps.app.goo.gl/iGKEYJzm7qrozzy68',
  },
];

// ---------------------------------------------------------------------------
// European target markets - used for areaServed on org + camp schemas.
// ---------------------------------------------------------------------------

const EU_AREAS_SERVED = [
  { '@type': 'Country', name: 'Germany' },
  { '@type': 'Country', name: 'Austria' },
  { '@type': 'Country', name: 'Switzerland' },
  { '@type': 'Country', name: 'Netherlands' },
  { '@type': 'Country', name: 'Belgium' },
  { '@type': 'Country', name: 'France' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'Ireland' },
  { '@type': 'Country', name: 'Denmark' },
  { '@type': 'Country', name: 'Sweden' },
  { '@type': 'Country', name: 'Norway' },
  { '@type': 'Country', name: 'Finland' },
  { '@type': 'Country', name: 'Poland' },
  { '@type': 'Country', name: 'Czech Republic' },
  { '@type': 'Country', name: 'Italy' },
  { '@type': 'Country', name: 'Spain' },
  { '@type': 'Country', name: 'Portugal' },
];

// Aggregate rating - keep all camps tied to the brand's headline number.
const BRAND_RATING = {
  '@type': 'AggregateRating',
  ratingValue: '4.9',
  reviewCount: '1600',
  bestRating: '5',
  worstRating: '1',
};

const SAME_AS = [
  'https://www.facebook.com/Thesurferweligama/',
  'https://www.instagram.com/thesurfer_srilanka/',
  'https://www.tripadvisor.com/Attraction_Review-g7066929-d8593826-Reviews-The_Surfer_Weligama-Weligama_Southern_Province.html',
];

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

/**
 * Organization-level schema. Always rendered on home so the brand entity is
 * tied to thesurferweligama.com#organization in Google's knowledge graph.
 */
export function organizationSchema(locale: string): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': ['SportsActivityLocation', 'Organization', 'TravelAgency'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ['The Surfer Weligama', 'The Surfer Surf Camp'],
    description:
      'Premier surf camps for European travellers in Weligama Sri Lanka and Tamraght Morocco. ISA-certified instructors, beachfront accommodation, daily yoga and surf lessons for all levels. 6-time Tripadvisor Travelers’ Choice winner.',
    url: `${SITE_URL}/${locale}`,
    inLanguage: ['en', 'de'],
    knowsLanguage: ['en', 'de'],
    telephone: '+94 76 696 6543',
    email: 'info@thesurferweligama.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'NO 65, Wadana Watta, Pelena',
      addressLocality: 'Weligama',
      postalCode: '81700',
      addressCountry: 'LK',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 5.969813, longitude: 80.446938 },
    openingHours: 'Mo-Su 07:00-21:00',
    priceRange: '$$',
    currenciesAccepted: 'EUR, USD, LKR, MAD',
    paymentAccepted: 'Credit Card, Bank Transfer',
    image: `${SITE_URL}/banner.png`,
    logo: `${SITE_URL}/logo.png`,
    sameAs: SAME_AS,
    areaServed: EU_AREAS_SERVED,
    aggregateRating: BRAND_RATING,
    award: '6-time Tripadvisor Travelers’ Choice (2018, 2021-2025)',
  };
}

/**
 * WebSite schema with SearchAction. Lets Google show a sitelinks search box
 * for the brand. Only ship this on the home page.
 */
export function websiteSchema(locale: string): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: SITE_NAME,
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/blogs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Per-camp LocalBusiness with its own AggregateRating + areaServed.
 * Google surfaces star ratings in SERP snippets only when the rating schema
 * is on the page being ranked - so each camp page gets its own.
 */
export function campSchema(camp: CampData, locale: string): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': `${SITE_URL}/${locale}${camp.slug}#camp`,
    name: camp.name,
    description: camp.longDescription,
    url: `${SITE_URL}/${locale}${camp.slug}`,
    inLanguage: locale,
    ...(camp.telephone ? { telephone: camp.telephone } : {}),
    ...(camp.email ? { email: camp.email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: camp.streetAddress,
      addressLocality: camp.locality,
      postalCode: camp.postalCode,
      addressCountry: camp.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: camp.latitude,
      longitude: camp.longitude,
    },
    priceRange: camp.priceRange,
    currenciesAccepted: 'EUR, USD, LKR, MAD',
    image: `${SITE_URL}${camp.image}`,
    hasMap: camp.hasMapUrl,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    areaServed: EU_AREAS_SERVED,
    aggregateRating: BRAND_RATING,
    sameAs: SAME_AS,
  };
}

/**
 * Convenience for the home page - emits the org + all 4 camps + website.
 */
export function homeSchemas(locale: string): StructuredData[] {
  return [
    organizationSchema(locale),
    websiteSchema(locale),
    ...CAMPS_DATA.map((c) => campSchema(c, locale)),
  ];
}

/**
 * BreadcrumbList - render on every non-home page for crumb-trail SERP.
 *
 * @param locale active locale segment
 * @param trail  ordered array of { name, slug } from root → current
 *               (do NOT include "Home" - added automatically)
 */
export function breadcrumbSchema(
  locale: string,
  trail: { name: string; slug: string }[],
): StructuredData {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/${locale}`,
    },
    ...trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: t.name,
      item: `${SITE_URL}/${locale}${t.slug}`,
    })),
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * TouristDestination schema for country pages (Sri Lanka, Morocco).
 */
export function destinationSchema(opts: {
  locale: string;
  slug: string;
  name: string;
  description: string;
  countryCode: 'LK' | 'MA';
  image: string;
  geo: { latitude: number; longitude: number };
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}/${opts.locale}${opts.slug}`,
    inLanguage: opts.locale,
    image: `${SITE_URL}${opts.image}`,
    address: { '@type': 'PostalAddress', addressCountry: opts.countryCode },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: opts.geo.latitude,
      longitude: opts.geo.longitude,
    },
    touristType: ['Surfer', 'Adventure traveller', 'European winter traveller'],
    includesAttraction: CAMPS_DATA.filter(
      (c) => c.countryCode === opts.countryCode,
    ).map((c) => ({ '@id': `${SITE_URL}/${opts.locale}${c.slug}#camp` })),
  };
}

/**
 * FAQPage schema for a list of question/answer pairs. Use on any page that
 * visually displays an FAQ - schema must match the visible content per Google.
 */
export function faqSchema(items: { question: string; answer: string }[]): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/**
 * Article / BlogPosting schema for individual blog posts.
 * Enriched with publisher, dates, language, and word count where derivable.
 */
export function articleSchema(opts: {
  locale: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  contentText?: string;
  datePublished?: string;
  dateModified?: string;
}): StructuredData {
  const absUrl = `${SITE_URL}/${opts.locale}/blog/${opts.slug}`;
  const absImage = opts.image.startsWith('http')
    ? opts.image
    : `${SITE_URL}${opts.image.startsWith('/') ? opts.image : '/' + opts.image}`;

  const wordCount = opts.contentText
    ? opts.contentText.split(/\s+/).filter(Boolean).length
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    image: absImage,
    inLanguage: opts.locale,
    url: absUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absUrl },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo1.png`,
        width: 714,
        height: 350,
      },
    },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified
      ? { dateModified: opts.dateModified }
      : opts.datePublished
      ? { dateModified: opts.datePublished }
      : {}),
    ...(wordCount ? { wordCount } : {}),
    articleSection: 'Surfing',
    keywords: [
      'surf camp',
      'surfing',
      'Sri Lanka surf',
      'Weligama',
      'beginner surfing',
      'surf lessons',
    ].join(', '),
  };
}
