import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import ContactClient from './ContactClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/contact',
    title:
      locale === 'de'
        ? 'Kontakt The Surfer - Surfcamp Sri Lanka & Marokko buchen'
        : 'Contact The Surfer - Book Surf Camp Sri Lanka & Morocco',
    description:
      locale === 'de'
        ? 'Surfcamp Sri Lanka oder Marokko buchen - schreib uns auf Deutsch oder Englisch. Schnelle Antwort per E-Mail, WhatsApp oder Telefon. Besuche uns in Weligama, Sri Lanka oder Tamraght, Marokko.'
        : 'Book your surf camp Sri Lanka or Morocco trip - reach us in English or German. Fast response by email, WhatsApp or phone. Visit us in Weligama, Sri Lanka or Tamraght, Morocco.',
    image: '/contactus.jpg',
    locale,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [{ name: 'Contact', slug: '/contact' }])}
      />
      <ContactClient />
    </>
  );
}
