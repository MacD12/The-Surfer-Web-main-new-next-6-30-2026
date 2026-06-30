import { getMessages, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { CAMPS_DATA, campSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data';
import BeachCampClient from './BeachCampClient';

type FaqItem = { question: string; answer: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    en: 'Beach Surf Camp Weligama - Beachfront Sri Lanka · 4.9★',
    de: 'Beach Surfcamp Weligama - direkt am Strand Sri Lanka · 4,9★',
  };
  const descByLocale: Record<string, string> = {
    en:
      "The Surfer Beach Camp Weligama - beachfront surf camp Sri Lanka with on-site pool, restaurant, yoga area. ISA-certified surf lessons for all levels. Peak European season Nov–Apr. 4.9★ 1600+ reviews, 6× Tripadvisor Travellers' Choice.",
    de:
      'The Surfer Beach Camp Weligama - Surfcamp Sri Lanka direkt am Strand mit Pool, Restaurant und Yoga-Bereich. ISA-zertifizierte Surfkurse für alle Levels. EU-Hauptsaison Nov–Apr. 4,9★ 1600+ Bewertungen, 6× Tripadvisor.',
  };
  return buildPageMetadata({
    slug: '/beach-camp',
    title: titleByLocale[locale] || titleByLocale.en,
    description: descByLocale[locale] || descByLocale.en,
    image: '/beachcamp.jpg',
    locale,
  });
}

export default async function BeachCampPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const camp = CAMPS_DATA.find((c) => c.id === 'beach')!;
  const messages = (await getMessages()) as Record<string, unknown>;
  const faqItems =
    ((messages.campFaq as { beach?: { items?: FaqItem[] } } | undefined)?.beach?.items) || [];

  const schemas: StructuredData[] = [
    campSchema(camp, locale),
    breadcrumbSchema(locale, [
      { name: 'Sri Lanka', slug: '/srilanka' },
      { name: camp.name, slug: camp.slug },
    ]),
    ...(faqItems.length ? [faqSchema(faqItems)] : []),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <BeachCampClient />
    </>
  );
}
