import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import TermsClient from './TermsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/terms',
    title:
      locale === 'de'
        ? 'Allgemeine Geschäftsbedingungen'
        : 'Terms & Conditions',
    description:
      locale === 'de'
        ? 'AGB für Buchungen, Stornierungen und Teilnahme bei The Surfer.'
        : "Read The Surfer's terms and conditions for bookings, cancellations, and participation.",
    image: '/terms.jpg',
    locale,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsClient />;
}
