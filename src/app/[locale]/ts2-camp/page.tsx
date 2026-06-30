import { getMessages, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { CAMPS_DATA, campSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data';
import TsCampClient from './TsCampClient';

type FaqItem = { question: string; answer: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    en: 'TS2 Surf Camp Weligama - Budget Surf Camp Sri Lanka · 4.9★',
    de: 'TS2 Surfcamp Weligama - Günstiges Surfcamp Sri Lanka · 4,9★',
  };
  const descByLocale: Record<string, string> = {
    en:
      'Budget surf camp Sri Lanka - TS2 in Weligama. Private AC rooms with ensuite, 5-min shuttle to Beach Camp where all surf lessons, yoga and dinners happen. Best-value European surf trip. 4.9★ 1600+ reviews.',
    de:
      'Günstiges Surfcamp Sri Lanka - TS2 in Weligama. Privatzimmer mit Klimaanlage und eigenem Bad, 5 Min Shuttle zum Beach Camp für alle Surfkurse, Yoga und Dinner. Beste Preis-Leistung für Europäer. 4,9★ 1600+ Bewertungen.',
  };
  return buildPageMetadata({
    slug: '/ts2-camp',
    title: titleByLocale[locale] || titleByLocale.en,
    description: descByLocale[locale] || descByLocale.en,
    image: '/ts2camp.jpg',
    locale,
  });
}

export default async function TsCampPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const camp = CAMPS_DATA.find((c) => c.id === 'ts2')!;
  const messages = (await getMessages()) as Record<string, unknown>;
  const faqItems =
    ((messages.campFaq as { ts2?: { items?: FaqItem[] } } | undefined)?.ts2?.items) || [];

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
      <TsCampClient />
    </>
  );
}
