import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import CareersClient from './CareersClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/careers',
    title:
      locale === 'de'
        ? 'Karriere bei The Surfer Sri Lanka - Saison 2026/2027 · Weligama'
        : 'Careers at The Surfer Sri Lanka - 2026/2027 Season · Weligama',
    description:
      locale === 'de'
        ? 'Arbeite, surfe und lebe die Sri-Lanka-Saison bei The Surfer Weligama. Wir suchen Surflehrer:innen, Social Hosts, Yogalehrer:innen und Social Media Content Creator für Oktober 2026 bis Mai 2027.'
        : "Work, surf & live the Sri Lankan season with The Surfer in Weligama. We're hiring surf instructors, social hosts, yoga teachers, and social media content creators for October 2026 – May 2027.",
    image: '/b5.jpg',
    locale,
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [{ name: 'Careers', slug: '/careers' }])}
      />
      <CareersClient />
    </>
  );
}
