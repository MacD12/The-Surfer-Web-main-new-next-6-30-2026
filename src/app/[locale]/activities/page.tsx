import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import ActivitiesClient from './ActivitiesClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/activities',
    title:
      locale === 'de'
        ? 'Aktivitäten Surfcamp Sri Lanka - Yoga, Walbeobachtung · The Surfer'
        : 'Surf Camp Sri Lanka Activities - Yoga, Whale Watching · The Surfer',
    description:
      locale === 'de'
        ? 'Beyond Surfing in Weligama: tägliches Yoga, Bootstouren, Schnorcheln, Walbeobachtung in Mirissa, Kulturtouren (Galle, Tee-Plantagen). Alles vom The Surfer Beach Camp Sri Lanka buchbar.'
        : 'Beyond surfing in Weligama - daily yoga, boat trips, snorkelling, whale watching in Mirissa, cultural tours (Galle, tea plantations). All bookable from The Surfer Beach Camp Sri Lanka.',
    image: '/activities.jpg',
    locale,
  });
}

export default async function ActivitiesPage({
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
          { name: 'Activities', slug: '/activities' },
        ])}
      />
      <ActivitiesClient />
    </>
  );
}
