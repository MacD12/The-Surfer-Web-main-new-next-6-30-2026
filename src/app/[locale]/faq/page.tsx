import { getMessages, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import FaqClient from './FaqClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/faq',
    title:
      locale === 'de'
        ? 'Surfcamp Sri Lanka & Marokko FAQ - Buchungs-Fragen · The Surfer'
        : 'Surf Camp Sri Lanka & Morocco FAQ - Booking Questions · The Surfer',
    description:
      locale === 'de'
        ? 'Antworten zu Surfcamp Sri Lanka & Marokko - beste Reisezeit, Visa, Anfänger-Surfen, Unterkunft, Stornierung, Transfer. Alles, was du vor der Buchung wissen musst. The Surfer Weligama & Tamraght.'
        : 'Answers about surf camp Sri Lanka & Morocco - best time to visit, visas, beginner surfing, accommodation, cancellation, airport transfers. Everything you need before booking. The Surfer Weligama & Tamraght.',
    image: '/faq.jpg',
    locale,
  });
}

type FaqItem = { question: string; answer: string };

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await getMessages()) as Record<string, unknown>;
  const faq = messages.faq as { items?: FaqItem[] } | undefined;
  const items = Array.isArray(faq?.items) ? faq.items : [];

  const schemas: StructuredData[] = [
    breadcrumbSchema(locale, [{ name: 'FAQ', slug: '/faq' }]),
  ];
  if (items.length > 0) {
    schemas.unshift({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question.replace(/^\d+\)\s*/, ''),
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <FaqClient />
    </>
  );
}
