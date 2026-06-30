import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import WaveCampClient from './WaveCampClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/wave-camp',
    title:
      locale === 'de'
        ? 'Wave Surfcamp Weligama Bay - Sri Lanka · The Surfer 4,9★'
        : 'Wave Surf Camp Weligama Bay - Sri Lanka · The Surfer 4.9★',
    description:
      locale === 'de'
        ? 'Wave Surfcamp Sri Lanka in Weligama Bay - geführte Surfkurse, Premium-Unterkunft, beste Wellen der Südküste. ISA-zertifizierte Surflehrer. 4,9★ 1600+ Bewertungen.'
        : 'Wave Surf Camp Sri Lanka in Weligama Bay - guided lessons, premium accommodation, the best breaks on the south coast. ISA-certified instructors. 4.9★ 1600+ reviews.',
    image: '/wave.jpg',
    locale,
  });
}

export default async function WaveCampPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: 'Sri Lanka', slug: '/srilanka' },
          { name: 'Wave Surf Camp', slug: '/wave-camp' },
        ])}
      />
      <WaveCampClient />
    </>
  );
}
