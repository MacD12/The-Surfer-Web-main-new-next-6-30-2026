import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import { blogsData, getPostSlug } from '@/data/blogs';
import BlogsClient from './BlogsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    slug: '/blogs',
    title:
      locale === 'de'
        ? 'Surf Blog Sri Lanka & Marokko - Tipps & Guides · The Surfer'
        : 'Surf Blog Sri Lanka & Morocco - Tips, Guides & Stories · The Surfer',
    description:
      locale === 'de'
        ? 'Surfcamp Sri Lanka & Marokko Blog - beste Reisezeit, Surf-Guides für Weligama & Tamraght, Anfänger-Tipps, Reisegeschichten. Von ISA-zertifizierten Surflehrern. The Surfer.'
        : 'Surf camp Sri Lanka & Morocco blog - best time to surf, Weligama & Tamraght guides, beginner tips, travel stories. Written by ISA-certified instructors. The Surfer.',
    image: '/blog.jpg',
    locale,
  });
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // ItemList of recent blog posts - helps Google understand this is a blog
  // index and surfaces individual posts via internal linking signal.
  const blogList: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/${locale}/blogs#blog`,
    url: `${SITE_URL}/${locale}/blogs`,
    inLanguage: locale,
    name: 'The Surfer Blog',
    blogPost: blogsData.slice(0, 20).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/${locale}/blog/${getPostSlug(p)}`,
      image: p.image.startsWith('http')
        ? p.image
        : `${SITE_URL}${p.image.startsWith('/') ? p.image : '/' + p.image}`,
      ...(p.date ? { datePublished: p.date } : {}),
    })),
  };

  const schemas: StructuredData[] = [
    blogList,
    breadcrumbSchema(locale, [{ name: 'Blog', slug: '/blogs' }]),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <BlogsClient />
    </>
  );
}
