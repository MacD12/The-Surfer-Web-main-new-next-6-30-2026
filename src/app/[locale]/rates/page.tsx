import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import RatesClient from './RatesClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/rates',
    title:
      locale === 'de'
        ? 'Surfcamp Preise Sri Lanka & Marokko - EUR · The Surfer'
        : 'Surf Camp Prices Sri Lanka & Morocco - EUR · The Surfer',
    description:
      locale === 'de'
        ? 'Transparente Surfcamp-Preise in EUR für Sri Lanka (Weligama) und Marokko (Tamraght). Alle Pakete, Zimmer- und Schlafsaalkategorien. Beach Camp, TS2, Soul Surfer, SurfStyle. Direkt buchen, beste Preise.'
        : 'Transparent surf camp prices in EUR for Sri Lanka (Weligama) and Morocco (Tamraght). All packages, room and dorm categories. Beach Camp, TS2, Soul Surfer, SurfStyle. Book direct for best rates.',
    image: '/rates.jpg',
    locale,
  });
}

export default async function RatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [{ name: 'Rates', slug: '/rates' }])}
      />
      <RatesClient />
    </>
  );
}
