import { getMessages, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import {
  CAMPS_DATA,
  campSchema,
  breadcrumbSchema,
  faqSchema,
} from '@/lib/structured-data';
import LandingClient from './LandingClient';

type FaqItem = { question: string; answer: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    en: 'Surf Camp Sri Lanka - Top Rated Surf Camp Weligama · The Surfer 4.9★',
    de: 'Surfcamp Sri Lanka - Top-bewertetes Surfcamp Weligama · The Surfer 4,9★',
  };
  const descByLocale: Record<string, string> = {
    en:
      "Surf camp Sri Lanka - The Surfer in Weligama Bay. 3 camps for every budget, ISA-certified surf lessons, beachfront stay, all levels. Europe's favourite winter-sun surf trip. 4.9★ 1600+ reviews, 6× Tripadvisor Travellers' Choice.",
    de:
      'Surfcamp Sri Lanka - The Surfer in Weligama Bay. 3 Camps für jedes Budget, ISA-zertifizierte Surfkurse, Strandunterkunft, alle Levels. Europas beliebtester Wintersonne-Surftrip. 4,9★ 1600+ Bewertungen, 6× Tripadvisor.',
  };
  return buildPageMetadata({
    slug: '/surf-camp-sri-lanka',
    title: titleByLocale[locale] || titleByLocale.en,
    description: descByLocale[locale] || descByLocale.en,
    image: '/banner.png',
    locale,
  });
}

export default async function SurfCampSriLankaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await getMessages()) as Record<string, unknown>;
  // Aggregate FAQs from the three Sri Lanka camps - gives this landing page
  // its own rich FAQPage schema without duplicating each camp page's schema
  // verbatim. (Schema is page-scoped, so this is allowed.)
  const fc = messages.campFaq as
    | {
        beach?: { items?: FaqItem[] };
        ts2?: { items?: FaqItem[] };
        soul?: { items?: FaqItem[] };
      }
    | undefined;
  const aggregateFaq: FaqItem[] = [
    ...(fc?.beach?.items?.slice(0, 2) || []),
    ...(fc?.ts2?.items?.slice(0, 2) || []),
    ...(fc?.soul?.items?.slice(0, 2) || []),
  ];

  const lkCamps = CAMPS_DATA.filter((c) => c.countryCode === 'LK');

  const schemas: StructuredData[] = [
    breadcrumbSchema(locale, [
      { name: 'Surf Camp Sri Lanka', slug: '/surf-camp-sri-lanka' },
    ]),
    ...lkCamps.map((c) => campSchema(c, locale)),
    ...(aggregateFaq.length ? [faqSchema(aggregateFaq)] : []),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <LandingClient locale={locale} />
    </>
  );
}
