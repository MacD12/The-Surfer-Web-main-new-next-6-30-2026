import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { CAMPS_DATA, campSchema, breadcrumbSchema } from '@/lib/structured-data';
import StyleCampClient from './StyleCampClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titleByLocale: Record<string, string> = {
    en: 'SurfStyle Surf Camp Tamraght Morocco · The Surfer 4.9★',
    de: 'SurfStyle Surfcamp Tamraght Marokko · The Surfer 4,9★',
  };
  const descByLocale: Record<string, string> = {
    en:
      "SurfStyle surf camp Tamraght Morocco - 4-hour direct flight from Europe. Anchor Point and Killer Point on your doorstep, beginner-to-advanced coaching, optional yoga, rooftop Atlantic views. Year-round waves, EU peak Oct–Apr. 4.9★ 1600+ reviews.",
    de:
      'SurfStyle Surfcamp Tamraght Marokko - 4-Stunden-Direktflug aus Europa. Anchor Point und Killer Point direkt vor der Haustür, Anfänger- bis Fortgeschrittenen-Coaching, optionales Yoga, Atlantik-Dachterrasse. Ganzjährig Wellen, EU-Hauptsaison Okt–Apr. 4,9★ 1600+ Bewertungen.',
  };
  return buildPageMetadata({
    slug: '/style-camp',
    title: titleByLocale[locale] || titleByLocale.en,
    description: descByLocale[locale] || descByLocale.en,
    image: '/surfstyle.jpg',
    locale,
  });
}

export default async function StyleCampPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const camp = CAMPS_DATA.find((c) => c.id === 'style')!;
  const schemas: StructuredData[] = [
    campSchema(camp, locale),
    breadcrumbSchema(locale, [
      { name: 'Morocco', slug: '/morocco' },
      { name: camp.name, slug: camp.slug },
    ]),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <StyleCampClient />
    </>
  );
}
