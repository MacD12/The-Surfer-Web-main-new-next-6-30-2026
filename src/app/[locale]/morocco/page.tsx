import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { destinationSchema, breadcrumbSchema } from '@/lib/structured-data';
import MoroccoClient from './MoroccoClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    en: 'Surf Camp Morocco - Taghazout / Tamraght · The Surfer 4.9★',
    de: 'Surfcamp Marokko - Taghazout / Tamraght · The Surfer 4,9★',
  };
  const descByLocale: Record<string, string> = {
    en:
      'Top-rated surf camp Morocco in Tamraght - 4-hour direct flight from Europe, same timezone (UTC+1), Atlantic swell year-round. Anchor Point, Killer Point, Banana Beach. EU peak season Oct–Apr. 4.9★ 1600+ reviews.',
    de:
      'Top-bewertetes Surfcamp Marokko in Tamraght - 4-Stunden-Direktflug aus Europa, gleiche Zeitzone (UTC+1), Atlantik-Swell ganzjährig. Anchor Point, Killer Point, Banana Beach. EU-Hauptsaison Okt–Apr. 4,9★ 1600+ Bewertungen.',
  };
  return buildPageMetadata({
    slug: '/morocco',
    title: titleByLocale[locale] || titleByLocale.en,
    description: descByLocale[locale] || descByLocale.en,
    image: '/morocco.jpg',
    locale,
  });
}

export default async function MoroccoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemas: StructuredData[] = [
    destinationSchema({
      locale,
      slug: '/morocco',
      name: 'Surf Morocco',
      description:
        'Taghazout / Tamraght surf destination on the Atlantic coast - year-round swell, 4-hour flight from European hubs, world-class point breaks.',
      countryCode: 'MA',
      image: '/morocco.jpg',
      geo: { latitude: 30.5097, longitude: -9.7193 },
    }),
    breadcrumbSchema(locale, [{ name: 'Morocco', slug: '/morocco' }]),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <MoroccoClient />
    </>
  );
}
