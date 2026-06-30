import { getMessages, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { CAMPS_DATA, campSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data';
import SoulSurferClient from './SoulSurferClient';

type FaqItem = { question: string; answer: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    en: 'Soul Surfer Camp Weligama - Premium Surf Retreat Sri Lanka · 4.9★',
    de: 'Soul Surfer Camp Weligama - Premium Surf-Retreat Sri Lanka · 4,9★',
  };
  const descByLocale: Record<string, string> = {
    en:
      'Premium surf retreat in Weligama, Sri Lanka - Soul Surfer Camp. Rooftop infinity pool, sea-view restaurant, rooftop yoga, own private schedule of surf sessions. For dedicated European surfers. 4.9★ 1600+ reviews.',
    de:
      'Premium Surf-Retreat in Weligama, Sri Lanka - Soul Surfer Camp. Rooftop-Infinity-Pool, Restaurant mit Meerblick, Rooftop-Yoga, eigener privater Surf-Plan. Für engagierte europäische Surfer. 4,9★ 1600+ Bewertungen.',
  };
  return buildPageMetadata({
    slug: '/soul-surfer',
    title: titleByLocale[locale] || titleByLocale.en,
    description: descByLocale[locale] || descByLocale.en,
    image: '/soul_surfer/hero.jpg',
    locale,
  });
}

export default async function SoulSurferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const camp = CAMPS_DATA.find((c) => c.id === 'soul')!;
  const messages = (await getMessages()) as Record<string, unknown>;
  const faqItems =
    ((messages.campFaq as { soul?: { items?: FaqItem[] } } | undefined)?.soul?.items) || [];

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
      <SoulSurferClient />
    </>
  );
}
