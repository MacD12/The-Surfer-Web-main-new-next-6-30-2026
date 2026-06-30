import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import PolicyClient from './PolicyClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/policy',
    title: locale === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy',
    description:
      locale === 'de'
        ? 'Wie The Surfer Ihre persönlichen Daten erhebt, verwendet und schützt. DSGVO-konform.'
        : 'How The Surfer collects, uses, and protects your personal data. GDPR compliant.',
    image: '/terms.jpg',
    locale,
  });
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PolicyClient />;
}
