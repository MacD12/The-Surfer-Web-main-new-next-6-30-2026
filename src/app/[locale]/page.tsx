// src/app/[locale]/page.tsx
import { setRequestLocale, getMessages } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { homeSchemas } from '@/lib/structured-data';
import HomeClient from './HomeClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    en: 'Surf Camp Sri Lanka & Morocco · The Surfer · 4.9★ 1600+ Reviews',
    de: 'Surfcamp Sri Lanka & Marokko · The Surfer · 4,9★ 1600+ Bewertungen',
  };
  const descByLocale: Record<string, string> = {
    en:
      "Top-rated surf camp Sri Lanka in Weligama + partner camp Tamraght Morocco. ISA-certified instructors, beachfront stay, all levels. 4.9★ 1600+ reviews, 6× Tripadvisor Travellers' Choice. Book direct from any EU hub.",
    de:
      'Top-bewertetes Surfcamp Sri Lanka in Weligama + Partnercamp Tamraght Marokko. ISA-zertifizierte Surflehrer, Strandunterkunft, alle Levels. 4,9★ 1600+ Bewertungen, 6× Tripadvisor Travellers’ Choice. Direkt aus jedem EU-Hub buchen.',
  };
  return buildPageMetadata({
    slug: '',
    title: titleByLocale[locale] || titleByLocale.en,
    description: descByLocale[locale] || descByLocale.en,
    image: '/logo.png',
    locale,
  });
}

// FAQPage schema - built from i18n messages so on-page FAQ and schema match.
type FAQItem = { question: string; answer: string };

async function buildFaqSchema(): Promise<StructuredData | null> {
  const messages = (await getMessages()) as Record<string, unknown>;
  const faq = messages.faq as { items?: FAQItem[] } | undefined;
  const items = faq?.items;
  if (!items || items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question.replace(/^\d+\)\s*/, ''),
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemas: StructuredData[] = [...homeSchemas(locale)];
  const faq = await buildFaqSchema();
  if (faq) schemas.push(faq);

  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <HomeClient />
    </>
  );
}
