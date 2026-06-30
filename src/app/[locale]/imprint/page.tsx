import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import ImprintClient from './ImprintClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/imprint',
    title: locale === 'de' ? 'Impressum' : 'Imprint',
    description:
      locale === 'de'
        ? 'Impressum und Unternehmensangaben von The Surfer Surfcamp.'
        : 'Legal imprint and company information for The Surfer surf camp business.',
    image: '/terms.jpg',
    locale,
  });
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ImprintClient />;
}
