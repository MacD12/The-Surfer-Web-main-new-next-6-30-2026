import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { destinationSchema, breadcrumbSchema } from '@/lib/structured-data';
import SrilankaClient from './SrilankaClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    en: 'Surf Camp Sri Lanka - Top Rated in Weligama · The Surfer 4.9★',
    de: 'Surfcamp Sri Lanka - Top bewertet in Weligama · The Surfer 4,9★',
  };
  const descByLocale: Record<string, string> = {
    en:
      "Top-rated surf camp Sri Lanka in Weligama Bay - 28°C water, consistent waves Nov–Apr, ISA-certified instructors, beachfront stay. 3 camps for every budget. 4.9★ 1600+ reviews, 6× Tripadvisor Travellers' Choice.",
    de:
      'Top-bewertetes Surfcamp Sri Lanka in Weligama Bay - 28°C Wasser, konstante Wellen Nov–Apr, ISA-zertifizierte Surflehrer, Strandunterkunft. 3 Camps für jedes Budget. 4,9★ 1600+ Bewertungen, 6× Tripadvisor.',
  };
  return buildPageMetadata({
    slug: '/srilanka',
    title: titleByLocale[locale] || titleByLocale.en,
    description: descByLocale[locale] || descByLocale.en,
    image: '/arugambay_surf.jpg',
    locale,
  });
}

export default async function SrilankaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemas: StructuredData[] = [
    destinationSchema({
      locale,
      slug: '/srilanka',
      name: 'Surf Sri Lanka',
      description:
        'Sri Lanka south coast surf destination - Weligama Bay, consistent waves November to April, three camps run by The Surfer for European travellers.',
      countryCode: 'LK',
      image: '/arugambay_surf.jpg',
      geo: { latitude: 5.969813, longitude: 80.446938 },
    }),
    breadcrumbSchema(locale, [{ name: 'Sri Lanka', slug: '/srilanka' }]),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <SrilankaClient />
    </>
  );
}
